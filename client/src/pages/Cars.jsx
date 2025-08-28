import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

export default function Cars() {
  const [input, setInput] = useState("");

  return (
    <div className="">
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />
        <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img
            src={assets.search_icon}
            alt="search-icon"
            className="w-4.5 h-4.5 mr-2 cursor-pointer"
            title="Search"
          />
          <input
            value={input}
            onClick={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search by make, model or features"
            className="w-full h-full outline-none text-gray-500"
          />
          <img
            src={assets.filter_icon}
            alt="filter-icon"
            className="w-4.5 h-4.5 ml-2 cursor-pointer"
            title="Filter"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}
