import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function UploadPdf() {
  const [userId, setUserId] = useState('');
  const [file, setFile] = useState('');
  const [messageSuccess, setMessageSuccess] = useState ('')
  const [errorMessage, setErrorMessage] = useState('');

  const selectingFile = (e) => {
    setFile(e.target.files[0]);
  };

  const getUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(data.user.id);
      } else {
        setUserId('');
        setErrorMessage('User not authenticated');
      }
    } catch (e) {
      console.error(e);
      setErrorMessage('Error retrieving user');
    }
  };

  async function getUploadFile() {
    const { data, error } = await supabase
    .storage
    .from('samples')
    .list(userId + "/" , {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' 
      },
    })

    if (error) {
      setErrorMessage("Error retrieving files: " + error.message);
      console.log(error);
    } else if (data) {
      console.log("Uploaded files:", data);  
    }
  }
  const handleFileUpload = async () => {
    if (!file) {
      setErrorMessage('Please select a PDF file.');
      return;
    }

    if (file.type !== 'application/pdf') {
      setErrorMessage('Only PDF files are allowed.');
      return;
    }

    const { data, error } = await supabase
      .storage
      .from('samples')
      .upload(userId + "/" + uuidv4(), file)

      if (data) {
        setMessageSuccess("File uploaded successfully:", data);
        getUploadFile();
      } else {
        setErrorMessage(`Error uploading file: ${error.message}`);
        console.error(error);
      }
    };

  useEffect(() => {
    getUser();
  }, [userId])

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl mb-4">Upload PDF</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={selectingFile}
        className="mb-4"
      />
      <button
        onClick={handleFileUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Upload
      </button>

      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      {messageSuccess && <p className="text-green-500 mt-4">{messageSuccess}</p>}
    </div>
  );
}
