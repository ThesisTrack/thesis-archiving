import { useSession } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: 'next_auth',
  },
});

export default function AllFilesPage() {
  const { data: session, status } = useSession();
  const [fileList, setFileList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    getName();
  }, []);
  
  async function getName() {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("email") 
        .limit(10); 

      if (error) throw error;
      if (data != null) {
        setUserInfo(data); 
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllFiles = async () => {
    if (!session || !session.user) {
      console.error("No session or user available:", session);
      setErrorMessage("User not authenticated");
      return;
    }

    try {
      const filesWithEmail = [];

      for (let i = 0; i < userInfo.length; i++) {
        const email = userInfo[i].email;
        const emailFolderPath = `uploads/${email}`;

        const { data: filesData, error: filesError } = await supabase.storage
          .from("upload")
          .list(emailFolderPath, {
            limit: 10,
            offset: 0,
            sortBy: { column: "name", order: "asc" },
          });

        if (filesError) {
          console.error("Error fetching files for email:", email, filesError);
          continue;
        }

        if (filesData) {
          const files = await Promise.all(
            filesData.map(async (file) => {
              const { data: fileUrl } = supabase.storage
                .from("upload")
                .getPublicUrl(`${emailFolderPath}/${file.name}`);

              return { name: file.name, url: fileUrl.publicUrl, email: email };
            })
          );
          filesWithEmail.push(...files);
        }
      }

      setFileList(filesWithEmail); 
    } catch (e) {
      console.error(e);
      setErrorMessage("Error retrieving files");
    }
  };

  // Handle file deletion
  const handleFileDelete = async (fileName, email) => {
    try {
      const { error } = await supabase.storage
        .from("upload")
        .remove([`uploads/${email}/${fileName}`]); 

      if (error) {
        setErrorMessage(`Error deleting file: ${error.message}`);
        console.error(error);
      } else {
        setErrorMessage("");
        getAllFiles(); 
      }
    } catch (error) {
      setErrorMessage("An error occurred during the file deletion process.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (session) {
      getAllFiles();
    }
  }, [session, userInfo]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>User not authenticated</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-300 space-y-8">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">All Uploaded Files</h2>
        <table className="table-auto w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">File Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
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
                  <td className="border border-gray-300 px-4 py-2">
                    <span className="text-black-400">{file.name.replace('.pdf', '')}</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {file.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex justify-center space-x-4">
                      <a
                        href={file.url}
                        download={file.name}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Download
                      </a>
                      <button
                        onClick={() => handleFileDelete(file.name, file.email)}
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
        {errorMessage && (
          <div className="mt-4 text-red-500">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}
