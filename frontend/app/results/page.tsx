"use client";
import Dropdown from "@/components/Dropdown";
import Link from "next/link";

export default function Results() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <p className="text-2xl">89% confidence level</p>
        <div className="flex justify-center mt-6">
          <Link href="/">
            <button className="bg-blue-300 btn ml-5 min-h-min h-[41px] rounded-lg">
              Upload another file
            </button>
          </Link>
          <div className="flex justify-center mr-6"></div>
          <Dropdown />
        </div>
      </div>
    </div>
  );
}
