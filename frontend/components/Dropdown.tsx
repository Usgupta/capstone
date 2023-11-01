'use client'

import React, { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const Selector = () => {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(!open)
      }
    };
    if (open) {
      // Attach the event listener when the dropdown is open.
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      // Clean up the event listener when the component unmounts.
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="w-72 font-medium h-80">
      <div
        ref={dropdownRef}
        onClick={() => setOpen(!open)}
        className={`bg-gray-200 w-full p-2 flex items-center justify-between rounded-lg ${!selected && "text-gray-700"}`}>
        {selected
          ? selected?.length > 26
            ? selected?.substring(0, 26) + "..."
            : selected
          : "Select Model"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul className={`bg-gray-200 mt-1 overflow-y-auto ${open ? "max-h-60" : "max-h-0"}`}>
        <div className=" bg-gray-200 flex items-center px-2 sticky top-0">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter model name"
            className="placeholder:text-gray-700 p-2 outline-none bg-gray-200"
          />
        </div>
        {countries?.map((country: any) => (
          <li
            key={country?.name}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              country?.name?.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              country?.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (country?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(country?.name);
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {country?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;