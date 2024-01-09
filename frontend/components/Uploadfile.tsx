'use client'

import { useState, ChangeEvent } from "react";
import Dropzone from "react-dropzone";

// Components
import Audioplayer from "./Audioplayer";

export default function Uploadfile({ file, setFile }: { file: File | null; setFile: (file: File | null) => void }) {

    // const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (acceptedFiles: File[]) => {
        setFile(acceptedFiles[0])
    }

    const handleResetBtn = () => {
        setFile(null)
    }

    // Function to get the selected file
  const getFile = () => {
    return file;

    
  };

    return (
        <div className="w-full h-44">
            {file ?
                <Audioplayer audioFile={file} resetBtn={handleResetBtn} /> :
                (<Dropzone onDropAccepted={handleFileChange} accept={{ 'audio/wav': [], 'audio/flac': [] }}>
                    {({ getRootProps, getInputProps }) => (
                        <div className="flex w-full h-full bg-white dark:bg-coldHeights-900 border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none transition-colors duration-300">
                            <div className="flex justify-center items-center space-x-2 w-full h-full px-3" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 dark:text-white" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="font-medium text-gray-600 dark:text-white">Click to upload or drag and drop</span>
                            </div>
                        </div>
                    )}
                </Dropzone>)}
        </div>
    )
}


