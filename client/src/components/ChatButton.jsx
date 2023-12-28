import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ChatButton = ({ id, swapDetails }) => {
  const navigateTo = useNavigate();

  const handleClick = () => {
    // Perform delete action or API call if needed
    console.log("Chat button clicked");
    console.log("id", id);
    console.log("swapDetails", swapDetails);
    // Redirect to "/swap"
    navigateTo("/chat");
    // use the link https://lucky-red-robe.cyclic.app/swap/${id} to delete the swap with axios.delete method handle the error and success with toast
  };

  return (
    <>
      <div className="mb-4 md:mb-0 md:mr-4">
        <button
          onClick={handleClick}
          className="bg-[#e0211a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#b41813]"
        >
          Chat
        </button>
      </div>
    </>
  );
};

export default ChatButton;
