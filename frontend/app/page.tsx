'use client'

// Components
import Dropdown from '@/components/Dropdown'
import Uploadfile from '../components/Uploadfile'
import { useState, ChangeEvent } from "react";



export default  function Home() {
  const [file, setFile] = useState<File | null>(null);

  const formData = new FormData();
  if (file!=null){
    formData.append('file',file);
  }
  // formData.append('option', selectedOption); // Include the selected option

  const handleFileUpload = async () => {
    if (file==null) {
      alert('Please upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    // formData.append('option', selectedOption); // Include the selected option

    try {
      const response = await fetch('http://127.0.0.1:8000/run/', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('File uploaded successfully!');
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className='flex flex-col justify-center items-center h-[580px] mt-6'>
      <Uploadfile file={file} setFile={setFile}  />
      <div className='flex justify-between mt-10'>
        <Dropdown />
        <button className='bg-blue-300 btn ml-5 min-h-min h-[41px] rounded-lg' onClick={handleFileUpload}>Run</button>
      </div>
    </main>
  )
}
