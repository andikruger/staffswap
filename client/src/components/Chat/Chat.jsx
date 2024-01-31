import React, { useEffect, useRef, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchChat } from "../../actions/chats";
import { SocketContext } from "../../context/Socket";
import ChatPanel from "./ChatPanel";
import Messages from "./Messages";
import SendBox from "./SendBox";

function Chat() {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const chats = useSelector((state) => state.chats);
  const prevChatId = useRef("");
  const { chatId } = useParams();
  const [chat, setChat] = useState(null);

  useEffect(() => {
    setChat(chats.find((chat) => chat.id === chatId));
  }, [chats, chatId]);

  useEffect(() => {
    if (prevChatId.current === chatId) return;
    if (!chats.find((chat) => chat.id === chatId)) return;

    socket.unsubscribeChatMessages(prevChatId.current);
    prevChatId.current = chatId;
    socket.subscribeChatMessages(chatId);
    dispatch(fetchChat(chatId));
  }, [chatId, chats, dispatch, socket]);

  if (!chat) return null;

  return (
    <div className="flex flex-col flex-1 border-r border-divider">
      <ChatPanel chat={chat} />
      <Messages chat={chat} />
      <SendBox chat={chat} />
    </div>
  );
}

export default Chat;
