import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import the plus icon from react-icons
import "../index.css";

const SearchButton = () => {
  return (
    <div className="search-button-container">
      <Link to="/swap/search">
        <FaSearch className="search-icon" />
      </Link>
    </div>
  );
};

export default SearchButton;
