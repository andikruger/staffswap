import React from "react";

import UserChats from "./UserChats";
import UserPanel from "./UserPanel";
import { ToastContainer } from "react-toastify";
function Sidebar() {
  return (
    <div className="flex flex-col w-80 border-r border-divider h-screen">
      <ToastContainer draggable closeOnClick />
      <UserPanel />
      <UserChats />
    </div>
  );
}

export default Sidebar;
