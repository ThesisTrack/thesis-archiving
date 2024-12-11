"use client";

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

export default function BrowseTheses() {
  const { data: session } = useSession();
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

  useEffect(() => {
    if (session) {
      getAllFiles();
    }
  }, [session, userInfo]);

  if (!session) {
    return <div>User not authenticated</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="w-full max-w-7xl mx-auto px-4 py-6 bg-white rounded-lg shadow-md mt-6">
        <h1 className="text-3xl font-bold mb-4">Browse Theses</h1>
        <nav className="text-sm text-gray-600 mb-6">
          <a href="#" className="hover:underline">
            Browse
          </a>{" "}
          /{" "}
          <a href="#" className="hover:underline">
            College of Informatics and Computing Studies
          </a>{" "}
          / Thesis Archive
        </nav>

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
                    No actions available
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {errorMessage && (
          <div className="mt-4 text-red-500">{errorMessage}</div>
        )}
      </main>
    </div>
  );
}
