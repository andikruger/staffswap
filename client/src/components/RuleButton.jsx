import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoHelpCircleOutline } from "react-icons/io5";

const RuleButton = () => {
  const navigateTo = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Delete Button */}
      <div className="mb-4 md:mb-0 md:mr-4">
        <div className="rule-button-container" onClick={openModal}>
          <IoHelpCircleOutline className="rule-icon" />
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="z-50 bg-white p-8 rounded-lg shadow-lg max-w-md">
            <p className="text-lg font-semibold mb-4">
              Rules for swaping shifts
            </p>
            <p className="mb-4">
              <ul className="list-disc">
                <li>You must have a minimum of 11 hours off between shifts.</li>
                <li>You must have a minimum of 36 hours off a week. .</li>
                <li>You may only work a maximum of 56 hours in a week. </li>
                <li> You may only have 10 plus or minus hours in a month. </li>
                <li> You may only have 5 plus or minus hours in a quater. </li>
              </ul>
            </p>

            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-[#e0211a] text-white px-4 py-2 rounded-full hover:bg-[#b41813]"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RuleButton;
