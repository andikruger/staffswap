import React from "react";
import { useMediaQuery } from "react-responsive";
import Chat from "../Chat";
import Sidebar from "../Sidebar";
import MobileModal from "../Sidebar/MobileModal";

function ChatWrapper() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="flex h-screen">
      {isMobile ? <MobileModal /> : <Sidebar />}
      <Chat />
    </div>
  );
}

export default ChatWrapper;
