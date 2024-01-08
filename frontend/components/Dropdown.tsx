import React, { useRef, useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

type Props = {
  selected: string,
  setSelected: Function,
}

const Selector = ({ selected, setSelected }: Props) => {
  const [models, setModels] = useState(["aasist", "RAWGAT", "LCNN"]);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleModelSelect = (model: string) => {
    setSelected(model);
    setOpen(false);
    setInputValue("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Closes only if not clicking on the same div (div already has an onClick event) or an input tag.  
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && !((event.target as HTMLElement).tagName === 'INPUT')) {
        setOpen(false);
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
    <div className="w-2/3 font-medium relative select-none cursor-default">
      <div
        ref={dropdownRef}
        onClick={() => setOpen(!open)}
        className={`bg-gray-200 w-full p-2 flex items-center justify-between rounded-lg ${!selected && "text-gray-700"}`}
      >
        {selected ? (
          selected?.length > 26 ? selected?.substring(0, 26) + "..." : selected
        ) : (
          "Select Model"
        )}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} /> 
      </div>
      <ul className={`bg-gray-200 overflow-y-auto rounded-lg ${open ? "absolute mt-1 w-full" : "max-h-0"}`}>
        <search className="bg-gray-200 flex items-center px-2 sticky top-0">
          <AiOutlineSearch size={18} className="text-gray-700 shrink-0" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter model name"
            className="placeholder:text-gray-700 p-2 outline-none bg-gray-200"
          />
        </search>
        {models.map((model: string) => (
          <li
            key={model}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${
              model.toLowerCase() === selected?.toLowerCase() ? "bg-sky-600 text-white" : ""
            } ${
              model.toLowerCase().startsWith(inputValue) ? "block" : "hidden"
            }`}
            onClick={() => handleModelSelect(model)}
          >
            {model}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
