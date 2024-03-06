import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const DeleteSwapButton = ({ id }) => {
  const navigateTo = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    // Perform delete action or API call if needed

    // Redirect to "/swap"
    navigateTo("/swap");
    // use the link http://localhost:8000/swap/${id} to delete the swap with axios.delete method handle the error and success with toast
    axios

      .delete(`${process.env.REACT_APP_SERVER_URL}/swap/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })

      .then((response) => {
        toast.success("Swap deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error deleting swap");
      });

    // Close the modal
    closeModal();
  };

  return (
    <>
      {/* Delete Button */}
      <div className="mb-4 md:mb-0 md:mr-4">
        <button
          onClick={openModal}
          className="bg-[#e0211a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#b41813]"
        >
          Delete Swap
        </button>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="z-50 bg-white p-8 rounded-lg shadow-lg max-w-md">
            <p className="text-lg font-semibold mb-4">Confirm Deletion</p>
            <p className="mb-4">Are you sure you want to delete this swap?</p>
            <p className="mb-4">
              This action <strong>cannot</strong> be undone.
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
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
    </>
  );
};

export default DeleteSwapButton;
