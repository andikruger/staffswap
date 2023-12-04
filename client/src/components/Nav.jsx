import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import linkData from "../data/links.json";

const NavLinks = () => {
  return (
    <>
      {linkData.links.map((link) => {
        return (
          <NavLink
            key={link.text}
            to={link.link}
            className="text-[#e0211a]  hover:text-[#b41813] no-underline text-xl font-bold p-2"
          >
            {link.text}
          </NavLink>
        );
      })}
    </>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className="w-1/2 flex justify-end pr-4">
        <div className="hidden w-full justify-between md:flex">
          <NavLinks />
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavbar}>
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex basis-full flex-col items-center mb-4">
          <NavLinks />
        </div>
      )}
    </>
  );
};

export default Nav;
