'use client'

// Components
import Dropdown from '@/components/Dropdown'
import Uploadfile from '@/components/Uploadfile'
import { useState, ChangeEvent } from "react";
import { useSearchParams,useRouter } from 'next/navigation';

export default function DetectPage() {
  const [file, setFile] = useState<File | null>(null);
  const [selected, setSelected] = useState("");

  const router = useRouter();

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

    console.log(selected)

    const formData = new FormData();
    formData.append('file', file);
    formData.append('option', selected); // Include the selected option

    try {
      const response = await fetch('http://127.0.0.1:8000/run/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully!');

        const result = await response.json();

        const resultsPageURL = `/results?confidence=${result.confidence}&result=${result.result}`;

        router.push(resultsPageURL);

      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Uploadfile file={file} setFile={setFile}  />
      <div className='flex justify-between mt-10'>
        <Dropdown selected={selected} setSelected={setSelected}/>
        <button className='bg-blue-300 btn ml-5 min-h-min h-[41px] rounded-lg' onClick={handleFileUpload}>Run</button>
      </div>
    </>
  )
}
