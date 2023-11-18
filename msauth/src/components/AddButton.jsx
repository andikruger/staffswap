import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa"; // Import the plus icon from react-icons
import "../index.css";

const AddButton = () => {
  return (
    <div className="add-button-container">
      <Link to="/swap/new">
        <FaPlus className="add-icon" />
      </Link>
    </div>
  );
};

export default AddButton;
