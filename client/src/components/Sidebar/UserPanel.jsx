import React from "react";
import { useNavigate } from "react-router-dom";

import { getInitials } from "../../utils/functions";
import { FaHome } from "react-icons/fa";
import { useMsal } from "@azure/msal-react";
function UserPanel() {
  const { accounts } = useMsal();

  let user = accounts[0];

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-between p-2 border-b border-divider">
      <div className="flex items-center">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${getInitials(
            user.name
          )}`}
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
        <h5 className="text-xl font-bold ml-2">Chats</h5>
      </div>
      <div className="flex items-center">
        <button
          className="p-2 focus:outline-none hover:bg-gray-100"
          onClick={handleHomeClick}
        >
          <FaHome className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default UserPanel;
