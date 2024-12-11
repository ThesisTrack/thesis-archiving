'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const FilePreview = () => {
    const [files, setFiles] = useState([]);
    const bucketName = 'upload'; 
  
    useEffect(() => {
      const fetchFiles = async () => {
        const { data, error } = await supabase.storage.from(bucketName).list('keanupaul.bangahon@neu.edu.ph/', { limit: 4 });

        console.log(data);
        if (error) {
          console.error('Error fetching files:', error);
          return;
        }
  
        const previews = data.map((file) => {
          const { data: publicUrlData, error: urlError } = supabase.storage.from(bucketName).getPublicUrl('keanupaul.bangahon@neu.edu.ph/' + file.name); 
          if (urlError) {
            console.error(`Error generating public URL for ${file.name}:`, urlError);
            return null;
          }
          console.log(file.name + " " + publicUrlData.publicUrl);
          return {
            name: file.name,
            url: publicUrlData.publicUrl,
          };
        }).filter(Boolean); 
  console.log(previews);
        setFiles(previews);
      };
  
      fetchFiles();
    }, []);
  
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        {files.map((file, index) => (
          <div
            key={index}
            style={{
              width: '300px',
              height: '400px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <iframe
              src={file.url}
              title={file.name}
              style={{ width: '100%', height: '100%' }}
            ></iframe>
          </div>
        ))}
      </div>
    );
  };

