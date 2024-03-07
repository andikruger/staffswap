import React, { useState } from "react";
import UserPanel from "./UserPanel";
import UserChats from "./UserChats";
import { RiContactsFill } from "react-icons/ri";

function MobileModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="chat-modal-container">
        <button onClick={openModal} className="chat-modal-icon">
          <RiContactsFill className="chat-modal-icon" />
        </button>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <UserPanel />
            <UserChats />
            <button
              className="mt-4 bg-[#e0211a] text-white px-4 py-2 rounded-md"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileModal;
