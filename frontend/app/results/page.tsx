"use client";
import Dropdown from "@/components/Dropdown";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


export default function Results() {

  const [selected, setSelected] = useState("");

  const searchParams = useSearchParams()

  const confidence = searchParams.get('confidence')
  const result = searchParams.get('result')

  console.log(confidence)


  // useEffect(() => {
  //   // Fetch data from the backend
    // fetch("/")
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log("Data from backend:", data);
    //     })})

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <p className="text-2xl">The audio is {result} by {confidence}% confidence level</p>
        <div className="flex justify-center mt-6">
          <Link href="/">
            <button className="bg-blue-300 btn ml-5 min-h-min h-[41px] rounded-lg">
              Upload another file
            </button>
          </Link>
          <div className="flex justify-center mr-6"></div>
          <Dropdown selected={selected} setSelected={setSelected}/>
        </div>
      </div>
    </div>
  );
}
