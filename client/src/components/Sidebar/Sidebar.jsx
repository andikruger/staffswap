import React, { useEffect, useState } from "react";
import UserChats from "./UserChats";
import UserPanel from "./UserPanel";
import { ToastContainer } from "react-toastify";

function Sidebar() {
  const [firstVisit, setFirstVisit] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = sessionStorage.getItem("hasVisitedSidebar");
    if (!hasVisitedBefore) {
      setFirstVisit(true);
      sessionStorage.setItem("hasVisitedSidebar", "true");
    }
  }, []);

  useEffect(() => {
    if (firstVisit) {
      window.location.reload();
    }
  }, [firstVisit]);

  return (
    <div className="flex flex-col w-80 border-r border-divider h-screen">
      <ToastContainer draggable closeOnClick />
      <UserPanel />
      <UserChats />
    </div>
  );
}

export default Sidebar;
