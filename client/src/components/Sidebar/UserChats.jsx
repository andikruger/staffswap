import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { getInitials, getOtherMember } from "../../utils/functions";

function UserChats() {
  const user = useSelector((state) => state.auth);
  const chats = useSelector((state) => state.chats);
  const { chatId } = useParams();

  const chatBoxes = chats.map((chat) => {
    const otherUser = getOtherMember(chat.members, user.id);

    function trunctuate(str, n) {
      return str.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
      <Link
        to={`/${chat.id}`}
        key={chat.id}
        className="text-black no-underline focus:outline-none"
      >
        <button
          className={`w-full text-left p-2 transition duration-300 ${
            chat.id === chatId
              ? "bg-gray-200 hover:bg-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${getInitials(
                chat.type === "private" ? otherUser.name : chat.name
              )}`}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col items-start ml-2">
              <span className="text-base">
                {chat.type === "private" ? otherUser.name : chat.name}
              </span>

              <span className="text-xs">
                {chat.messages.length > 0
                  ? trunctuate(chat.messages[chat.messages.length - 1].text, 30)
                  : "No messages yet"}
              </span>
            </div>
          </div>
        </button>
      </Link>
    );
  });

  return <div className="flex-1 p-2">{chatBoxes}</div>;
}

export default UserChats;
