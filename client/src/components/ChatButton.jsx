import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/Socket";
import { useDispatch, useSelector } from "react-redux";
import { createPrivateChat } from "../actions/chats";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ChatButton = ({ id, swapDetails, creatorId, partnerId }) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const socket = useContext(SocketContext);
  const handleClick = () => {
    // Perform delete action or API call if needed

    dispatch(createPrivateChat(creatorId, partnerId, swapDetails, socket));
    // open /chat in new tab
    navigateTo(`/chat`);
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
