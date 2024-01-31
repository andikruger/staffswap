import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteChat } from "../../../actions/chats";
import { SocketContext } from "../../../context/Socket";
import { HiDotsVertical, HiTrash } from "react-icons/hi";

function PrivateMenu({ otherUser, chat }) {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = () => {
    dispatch(deleteChat(chat.id, socket));
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
          <div className="bg-white p-4 rounded w-80">
            <h2 className="text-xl font-bold mb-4">
              Do you want to delete this chat?
            </h2>
            <p className="text-sm mb-4">
              Notice: This action is irreversible and will result in permanent
              deletion of the chat for both users.
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-700"
                onClick={closeDeleteDialog}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrivateMenu;
