import React, { useState } from "react";
import searchIcon from "../../assets/icons/search.svg";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(true)}
        className="bg-[#234230] box-content px-2 h-10 rounded-md border border-transparent transition cursor-pointer hover:shadow-[0_0_15px_rgba(74,222,128,0.3),0_0_30px_rgba(74,222,128,0.1)] hover:border-primary-300"
      >
        <img src={searchIcon} alt="" className="w-10 h-10 " />
      </div>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 left-0 z-20 bg-[#234230] border border-primary-800 rounded-lg p-4 w-72 animate-[fadeIn_0.2s_ease-out] shadow-[4px_4px_15px_rgba(74,222,128,0.3),-4px_4px_15px_rgba(74,222,128,0.3)]">
            <input
              type="text"
              placeholder="جستجو..."
              autoFocus
              className="w-full bg-surface-925 text-white px-3 py-2 rounded-md outline-none border border-surface-700 focus:border-primary-400"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
