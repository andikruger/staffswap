import React from "react";
import { FaList } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";

const ChangeViewButton = ({ toggleView, isListView, icon }) => {
  function displayIcon(icon) {
    if (icon === "grid") {
      return <BsGridFill className="add-icon" onClick={toggleView} />;
    } else {
      return <FaList className="add-icon" onClick={toggleView} />;
    }
  }
  return <div className="add-button-container">{displayIcon(icon)}</div>;
};

export default ChangeViewButton;
