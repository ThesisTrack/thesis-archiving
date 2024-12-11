// Import necessary libraries
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Define the component
export const FileTable = () => {
  const [files, setFiles] = useState([]);
  const bucketName = 'upload'; // Replace with your bucket name

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase.storage.from(bucketName).list('', { limit: 10 });
      if (error) {
        console.error('Error fetching files:', error);
        return;
      }

      const fileDetails = data.map((file) => ({
        name: file.name,
        folder: file.id.split('/')[0], // Assuming folders are part of the file path
      }));

      setFiles(fileDetails);
    };

    fetchFiles();
  }, []);

  const handleAccept = async (fileName) => {
    try {
      // Download the file from the current bucket
      const { data: fileData, error: downloadError } = await supabase.storage
        .from(bucketName)
        .download(fileName);

      if (downloadError) {
        console.error('Error downloading file:', downloadError);
        return;
      }

      // Upload the file to the approvedtheses folder
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(`approvedtheses/${fileName}`, fileData);

      if (uploadError) {
        console.error('Error uploading file to approvedtheses:', uploadError);
        return;
      }

      alert(`File ${fileName} approved and moved to approvedtheses.`);
    } catch (err) {
      console.error('Error handling accept action:', err);
    }
  };

  const handleReject = async (fileName) => {
    try {
      const { error } = await supabase.storage.from(bucketName).remove([fileName]);

      if (error) {
        console.error('Error deleting file:', error);
        return;
      }

      alert(`File ${fileName} rejected and deleted.`);
      setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    } catch (err) {
      console.error('Error handling reject action:', err);
    }
  };

  const handleDownload = async (fileName) => {
    try {
      const { data, error } = await supabase.storage.from(bucketName).download(fileName);

      if (error) {
        console.error('Error downloading file:', error);
        return;
      }

      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error handling download action:', err);
    }
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Filename</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Folder Name</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{file.name}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{file.folder}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <button
                onClick={() => handleAccept(file.name)}
                style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                Accept
              </button>
              <button
                onClick={() => handleReject(file.name)}
                style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                Reject
              </button>
              <button
                onClick={() => handleDownload(file.name)}
                style={{ padding: '5px 10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                Download
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


