import React from "react";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const EditSwapButton = (id) => {
  const navigateTo = useNavigate();

  const handleClick = () => {
    navigateTo(`edit`);
  };

  return (
    <>
      {/* Edit Button */}
      <div className="mb-4 md:mb-0 md:mr-4">
        <button
          onClick={handleClick}
          className="bg-[#e0211a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#b41813]"
        >
          Edit Swap
        </button>
      </div>
    </>
  );
};

export default EditSwapButton;
