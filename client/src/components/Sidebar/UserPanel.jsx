import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../actions/auth";
import { createPrivateChat } from "../../actions/chats";
import { SocketContext } from "../../context/Socket";
import { getInitials } from "../../utils/functions";
import { AiOutlinePlus, AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { useMsal, MsalProvider } from "@azure/msal-react";
function UserPanel() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const { instance, accounts } = useMsal();
  const socket = useContext(SocketContext);
  const userName = accounts[0].name;
  const [menuOpen, setMenuOpen] = useState(false);
  const [openAddPrivate, setOpenAddPrivate] = useState(false);
  const [newPrivateEmail, setNewPrivateEmail] = useState("");

  const logOut = () => {
    dispatch(signOut());
  };

  const openAddMenu = () => {
    setMenuOpen(true);
  };

  const closeAddMenu = () => {
    setMenuOpen(false);
  };

  const openAddPrivateDialog = () => {
    setOpenAddPrivate(true);
    setNewPrivateEmail("");
    closeAddMenu();
  };

  const closeAddPrivateDialog = () => {
    setOpenAddPrivate(false);
    setNewPrivateEmail("");
  };

  const handleAddPrivate = () => {
    if (!newPrivateEmail) return;
    dispatch(createPrivateChat(newPrivateEmail, socket));
    closeAddPrivateDialog();
  };

  return (
    <div className="flex justify-between p-2 border-b border-divider">
      <div className="flex items-center">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${getInitials(
            userName
          )}`}
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
        <h5 className="text-xl font-bold ml-2">Chats</h5>
      </div>

      {openAddPrivate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-80">
            <h2 className="text-xl font-bold mb-4">Create new private chat</h2>
            <p className="text-sm mb-4">Enter user's email address.</p>
            <input
              type="email"
              className="border p-2 w-full mb-4"
              placeholder="Email Address"
              value={newPrivateEmail}
              onChange={(e) => setNewPrivateEmail(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-700"
                onClick={closeAddPrivateDialog}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={handleAddPrivate}
              >
                Add chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPanel;
