import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import the plus icon from react-icons
import "../index.css";

const SearchButton = () => {
  return (
    <Link to="/swap/search">
      <div className="search-button-container">
        <FaSearch className="search-icon" />
      </div>
    </Link>
  );
};

export default SearchButton;
