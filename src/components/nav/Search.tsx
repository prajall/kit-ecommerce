"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchComponent = () => {
  const [showInput, setShowInput] = useState(false);
  const handleSearch = () => {
    if (showInput) {
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  };

  return (
    <>
      <div className="mx-auto flex items-center w-full">
        <form className="flex items-center relative w-full">
          <input
            type="text"
            placeholder="Search"
            className=" bg-zinc-200 duration-300 w-[300px] focus:outline-none bg-opacity-80  mx-auto px-4 py-2  rounded-full"
          />
          <button
            type="submit"
            className="ml-1 px-1 py-1"
            onClick={handleSearch}
          >
            {<Search />}
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchComponent;
