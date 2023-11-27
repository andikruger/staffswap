import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa"; // Import the plus icon from react-icons
import "../index.css";

const AddButton = () => {
  return (
    <Link to="/swap/new">
      <div className="add-button-container">
        <FaPlus className="add-icon" />
      </div>
    </Link>
  );
};

export default AddButton;
