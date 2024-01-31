import React from "react";

import UserChats from "./UserChats";
import UserPanel from "./UserPanel";

function Sidebar() {
  return (
    <div className="flex flex-col w-80 border-r border-divider">
      <UserPanel />
      <UserChats />
    </div>
  );
}

export default Sidebar;
