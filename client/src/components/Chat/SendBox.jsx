import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdSend } from "react-icons/io";

import { sendMessage } from "../../actions/chats";
import { SocketContext } from "../../context/Socket";

function SendBox({ chat }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;

    dispatch(sendMessage(chat.id, message, socket));
    setMessage("");
  };

  return (
    <div className={`p-2 border-t border-divider`}>
      <form onSubmit={handleSendMessage} className="flex">
        <input
          className={`input w-full border-none outline-none px-2`}
          placeholder="Aa"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="text-slate-700 hover:text-slate-500 focus:outline-none"
        >
          <IoMdSend className="h-6 w-6" />
        </button>
      </form>
    </div>
  );
}

export default SendBox;
