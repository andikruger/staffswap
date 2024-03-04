import Chat from "../Chat";
import Sidebar from "../Sidebar";

function ChatWrapper() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default ChatWrapper;
