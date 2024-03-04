import React from "react";
import { FaList } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";

const ChangeViewButton = ({ toggleView, icon }) => {
  function displayIcon(icon) {
    if (icon === "grid") {
      return <BsGridFill className="add-icon" onClick={toggleView} />;
    } else {
      return <FaList className="add-icon" onClick={toggleView} />;
    }
  }
  return (
    <div className="change-view-button-container hidden md:block">
      {displayIcon(icon)}
    </div>
  );
};

export default ChangeViewButton;
