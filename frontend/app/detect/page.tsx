'use client'

// Components
import Dropdown from '@/components/Dropdown'
import Uploadfile from '@/components/Uploadfile'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DetectPage() {
  const [file, setFile] = useState<File | null>(null);
  const [selected, setSelected] = useState("");

  const router = useRouter();

  const handleFileUpload = async () => {
    if (file == null) {
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
      <div className='flex flex-wrap justify-between w-4/5'>
        <section className='w-[45%] max-md:w-full mb-10 md'>
          <h1 className='xl:text-4xl text-3xl font-semibold dark:text-white'>Deepfake Detection</h1>
          <div>
            <div className='xl:text-xl text-lg font-medium dark:text-white'>
              <br />
              Check out the full description on the model at the <u><Link href='/about'>About Page</Link></u>.
            </div>
            <br />
            <ol className='list-decimal px-4 dark:text-white xl:text-lg text-base'>
              <li>AASIST: model1</li>
              <li>LCNN: model2</li>
              <li>RawNet: model3</li>
              <li>RawNet2: model4</li>
            </ol>
          </div>
        </section>
        <section className='w-1/2 max-md:w-full mb-10 bg-whitehue-600 rounded-2xl dark:bg-[#565A73] p-8 shadow-2xl shadow-whitehue-800 dark:shadow-coldHeights-700 transition-colors duration-300'>
          <h3 className='text-lg dark:text-white'>Is this audio generated by AI? Check with our model.</h3>
          <p className='text-xs font-light dark:text-white'>Please upload an audio file in .wav/.flac format and choose a model for detection.</p>
          <div className='mt-5'>
            <Uploadfile file={file} setFile={setFile} />
            <div className='flex justify-between mt-5'>
              <Dropdown selected={selected} setSelected={setSelected} />
              <button className='bg-bluehue-300 text-white w-1/3 rounded-lg ml-2' onClick={handleFileUpload}>Run</button>
            </div>
            <p className='text-xs mt-3 dark:text-white'>By continuing, you agree to our <u>Terms and Conditons</u></p>
          </div>
        </section>
      </div>
    </>
  )
}
