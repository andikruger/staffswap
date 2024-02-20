import React from "react";
import { v4 as uuidv4 } from "uuid";

function Messages({ chat }) {
  const user = sessionStorage.getItem("user");

  const messageBoxes = chat.messages
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((message) => {
      const isOwnMessage = message.sender.id === user;
      const isSwapBot = message.sender.id === "1";

      return (
        <div
          key={uuidv4()}
          className={`message ${
            isOwnMessage ? "own-message" : ""
          } p-3 mb-2 max-w-md ${
            isSwapBot ? "swapbot-message" : "" // Apply different style for SwapBot messages
          } ${
            isOwnMessage ? "self-end bg-blue-500 text-white" : "bg-gray-200"
          } rounded-md`}
        >
          <p className={`message-author text-xs mb-1`}>
            {isOwnMessage ? "You" : message.sender.name}
          </p>
          <p className="whitespace-pre-line">{message.text}</p>
        </div>
      );
    });

  return (
    <div className={`flex flex-col-reverse overflow-auto flex-1 p-3`}>
      {messageBoxes}
    </div>
  );
}

export default Messages;
