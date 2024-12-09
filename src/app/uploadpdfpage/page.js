'use client';

import { useSession } from "next-auth/react";
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UploadPdf from '@/components/uploadpdf/uploadPdf';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function UploadPage() {
  const { data: session, status } = useSession(); // Fetch session from next-auth
  const [userId, setUserId] = useState('');
  const [file, setFile] = useState('');
  const [messageSuccess, setMessageSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fileList, setFileList] = useState('');

  const selectingFile = (e) => {
    setFile(e.target.files[0]);
  };

  const getUserAndFiles = useCallback(async () => {

    if (!session || !session.user) {
      console.error("No session or user available:", session); // Log the session
      setErrorMessage('User not authenticated');
      return;
    }

    try {
      setUserId(session.user.id);
      setErrorMessage('');

      console.log("Session loaded:", session);  // Log session to check its structure

      // Fetch files from Supabase
      const { data: filesData, error: filesError } = await supabase.storage
        .from('samples')
        .list(session.user.id + '/', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (filesError) {
        setErrorMessage('Error retrieving files: ' + filesError.message);
        console.error(filesError);
      } else if (filesData) {
        const files = await Promise.all(
          filesData.map(async (file) => {
            const { data: fileUrl } = supabase.storage
              .from('samples')
              .getPublicUrl(session.user.id + '/' + file.name);
            return { name: file.name, url: fileUrl.publicUrl };
          })
        );
        setFileList(files);
      }
    } catch (e) {
      console.error(e);
      setErrorMessage('Error retrieving user or files');
    }
  }, [session]);

  const handleFileUpload = async () => {
    if (!file) {
      setErrorMessage('Please select a PDF file.');
      return;
    } 

    if (file.type !== 'application/pdf') {
      setErrorMessage('Only PDF files are allowed.');
      return;
    }

    if (!userId) {
      setErrorMessage('User ID is not available at the moment.');
      return;
    }

    try {
      const { data, error } = await supabase
        .storage
        .from('samples')
        .upload(userId + '/' + uuidv4(), file);

      if (data) {
        setMessageSuccess('File uploaded successfully.');
        setErrorMessage('');
        getUserAndFiles(); // Re-fetch user and files after successful upload
      } else {
        setErrorMessage(`Error uploading file: ${error.message}`);
        console.error(error);
      }
    } catch (error) {
      setErrorMessage('An error occurred during the upload process.');
      console.error(error);
    }
  };

  useEffect(() => {
    getUserAndFiles();  // Run the combined logic to fetch user and files
  }, [getUserAndFiles]);

  if (status === "loading") {
    return <div>Loading...</div>;  // Handle loading state if necessary
  }

  if (!session) {
    return <div>User not authenticated</div>;  // Handle unauthenticated user state
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <UploadPdf
        selectingFile={selectingFile}
        handleFileUpload={handleFileUpload}
        errorMessage={errorMessage}
        messageSuccess={messageSuccess}
        fileList={fileList}
      />
    </div>
  );
}
