import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MatchButton = (id) => {
  const navigateTo = useNavigate();

  const handleClick = () => {
    navigateTo(`match`);
  };

  return (
    <>
      {/* Edit Button */}
      <div className="mb-4 md:mb-0 md:mr-4">
        <button
          onClick={handleClick}
          className="bg-[#e0211a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#b41813]"
        >
          Find Matches
        </button>
      </div>
    </>
  );
};

export default MatchButton;
