'use client'

// Import necessary libraries
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl,supabaseKey);

// Define the component
export const FileCount = () => {
  const [fileCount, setFileCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const bucketName = 'upload'; // Replace with your bucket name

  useEffect(() => {
    const fetchFileCount = async () => {
      try {
        // Fetch all objects in the bucket
        const { data, error } = await supabase.storage.from(bucketName).list('', { limit: 100 });

        if (error) {
          console.error('Error fetching files:', error);
          return;
        }

        
        let totalFiles = 0;

        // Iterate through folders and count files
        for (const folder of data) {
          if (folder.name) {
            const { data: folderFiles, error: folderError } = await supabase
              .storage
              .from(bucketName)
              .list(folder.name, { limit: 100 });


            if (folderError) {
              console.error(`Error fetching files for folder ${folder.name}:`, folderError);
              continue;
            }



            totalFiles += folderFiles.length;
          }
        }

        setFileCount(totalFiles);
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFileCount();
  }, []);

  return (
    <div> Total number of Theses: {fileCount} </div>
  )
};

