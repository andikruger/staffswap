import React, { useState, useEffect } from "react";
import { BsGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import "../index.css";

const ChangeViewButton = () => {
  const [isGrid, setIsGrid] = useState(false);

  useEffect(() => {
    // Retrieve the view state from local storage on component mount
    const storedView = localStorage.getItem("view");
    setIsGrid(storedView === "grid");
  }, []);

  const toggleView = () => {
    const newView = !isGrid ? "grid" : "list";
    setIsGrid(!isGrid);
    // Store the updated view state in local storage
    localStorage.setItem("view", newView);
  };

  return (
    <div className="add-button-container">
      {isGrid ? (
        <BsGridFill className="add-icon" onClick={toggleView} />
      ) : (
        <FaList className="add-icon" onClick={toggleView} />
      )}
    </div>
  );
};

export default ChangeViewButton;
