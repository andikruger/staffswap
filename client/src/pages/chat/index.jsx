import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
//import Chat from "../components/Chat";

function ChatPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
    </div>
  );
}

export default ChatPage;
