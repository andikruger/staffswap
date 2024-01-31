import React from "react";
import { useSelector } from "react-redux";

import { getInitials, getOtherMember } from "../../../utils/functions";
import PrivateMenu from "./PrivateMenu";

function ChatPanel({ chat }) {
  const user = useSelector((state) => state.auth);
  const otherUser = getOtherMember(chat.members, user.id);

  return (
    <div className="flex justify-between p-2 border-b border-divider">
      <div className="flex items-center">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${getInitials(
            chat.type === "private" ? otherUser.name : chat.name
          )}`}
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
        <h6 className="text-xl ml-1">
          {chat.type === "private" ? otherUser.name : chat.name}
        </h6>
      </div>

      <PrivateMenu otherUser={otherUser} chat={chat} />
    </div>
  );
}

export default ChatPanel;
