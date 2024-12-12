'use client'
import { useSession } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import UploadPdf from "@/components/uploadpdf/uploadPdf";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function UploadPage() {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState("");
  const [file, setFile] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileList, setFileList] = useState([]);

  const selectingFile = (e) => {
    setFile(e.target.files[0]);
  };

  const getUserAndFiles = useCallback(async () => {
    if (!session || !session.user) {
      console.error("No session or user available:", session);
      setErrorMessage("User not authenticated");
      return;
    }

    try {
      setUserId(session.user.email);
      setErrorMessage("");

      const { data: filesData, error: filesError } = await supabase.storage
        .from("upload")
        .list(`uploads/${session.user.email}`, { // Updated path to include 'uploads'
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      if (filesError) {
        setErrorMessage("Error retrieving files: " + filesError.message);
        console.error(filesError);
      } else if (filesData) {
        const files = await Promise.all(
          filesData.map(async (file) => {
            const { data: fileUrl } = supabase.storage
              .from("upload")
              .getPublicUrl(`uploads/${session.user.email}/${file.name}`); // Updated path to include 'uploads'
            return { name: file.name, url: fileUrl.publicUrl };
          })
        );
        setFileList(files);
      }
    } catch (e) {
      console.error(e);
      setErrorMessage("Error retrieving user or files");
    }
  }, [session]);

  const handleFileUpload = async () => {
    if (!file) {
      setErrorMessage("Please select a PDF file.");
      return;
    }

    if (file.type !== "application/pdf") {
      setErrorMessage("Only PDF files are allowed.");
      return;
    }

    if (!userId) {
      setErrorMessage("Email is not available at the moment.");
      return;
    }

    try {
      const fileName = `${file.name}`;
      const { data, error } = await supabase.storage
        .from("upload")
        .upload(`uploads/${userId}/${fileName}`, file); // Updated path to include 'uploads'

      if (data) {
        setMessageSuccess("File uploaded successfully.");
        setErrorMessage("");
        getUserAndFiles();
      } else {
        setErrorMessage(`Error uploading file: ${error.message}`);
        console.error(error);
      }
    } catch (error) {
      setErrorMessage("An error occurred during the upload process.");
      console.error(error);
    }
  };

  const handleFileDelete = async (fileName) => {
    try {
      const { error } = await supabase.storage
        .from("upload")
        .remove([`uploads/${userId}/${fileName}`]); // Updated path to include 'uploads'

      if (error) {
        setErrorMessage(`Error deleting file: ${error.message}`);
        console.error(error);
      } else {
        setMessageSuccess("File deleted successfully.");
        setErrorMessage("");
        getUserAndFiles();
      }
    } catch (error) {
      setErrorMessage("An error occurred during the file deletion process.");
      console.error(error);
    }
  };

  useEffect(() => {
    getUserAndFiles();
  }, [getUserAndFiles]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>User not authenticated</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-300 space-y-8">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <UploadPdf
          selectingFile={selectingFile}
          handleFileUpload={handleFileUpload}
          errorMessage={errorMessage}
          messageSuccess={messageSuccess}
          fileList={fileList}
          handleFileDelete={handleFileDelete}
        />
      </div>

      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <table className="table-auto w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Uploader</th>
              <th className="border border-gray-300 px-4 py-2">File Name</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fileList.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No files uploaded yet.
                </td>
              </tr>
            ) : (
              fileList.map((file) => (
                <tr key={file.name}>
                  <td className="border border-gray-300 px-4 py-2">{userId}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {file.name}
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex justify-center space-x-4">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleFileDelete(file.name)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
