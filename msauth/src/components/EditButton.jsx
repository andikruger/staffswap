import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditSwapButton = (id) => {
  const navigateTo = useNavigate();

  const handleClick = () => {
    navigateTo(`edit`);
  };

  return (
    <>
      {/* Delete Button */}
      <button
        onClick={handleClick}
        className="bg-[#e0211a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#b41813]"
      >
        Edit Swap
      </button>
    </>
  );
};

export default EditSwapButton;
