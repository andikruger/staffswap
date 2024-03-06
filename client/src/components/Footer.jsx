import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  // get the current year
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {year} StaffSwap. All rights reserved.{" "}
          <Link to="/privacy" className="text-blue-300">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
