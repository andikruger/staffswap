import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteChat } from "../../../actions/chats";
import { useParams } from "react-router";
import { SocketContext } from "../../../context/Socket";
import { HiDotsVertical, HiTrash } from "react-icons/hi";
import { toast } from "react-toastify";
function PrivateMenu() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = () => {
    const userId = sessionStorage.getItem("user");
    dispatch(deleteChat(userId, chatId, socket));
    navigate("/chat");
    toast.success("Chat deleted successfully");
    closeDeleteDialog();
  };

  const openChatMenu = () => {
    setMenuOpen(true);
  };

  const closeChatMenu = () => {
    setMenuOpen(false);
  };

  const openDeleteDialog = () => {
    setOpenDelete(true);
    closeChatMenu();
  };

  const closeDeleteDialog = () => {
    setOpenDelete(false);
    closeChatMenu();
  };

  return (
    <div className="flex">
      <button className="p-2 focus:outline-none" onClick={openChatMenu}>
        <HiDotsVertical className="h-6 w-6" />
      </button>
      {menuOpen && (
        <div className="ml-2">
          <button
            className="flex items-center p-2 focus:outline-none hover:bg-gray-100"
            onClick={openDeleteDialog}
          >
            <HiTrash className="h-6 w-6" />
            <span className="ml-2">Delete</span>
          </button>
        </div>
      )}

      {openDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="z-50 bg-white p-8 rounded-lg shadow-lg max-w-md">
            <p className="text-lg font-semibold mb-4">Confirm Deletion</p>
            <p className="mb-4">Are you sure you want to delete this chat?</p>
            <p className="mb-4">
              This action <strong>cannot</strong> be undone.
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeDeleteDialog}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-[#e0211a] text-white px-4 py-2 rounded-full hover:bg-[#b41813]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrivateMenu;
