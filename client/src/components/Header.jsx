import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import { ToastContainer } from "react-toastify";
import ConnectionMessage from "./ConnectionMessage";
import "react-toastify/dist/ReactToastify.css";
const Header = () => {
  return (
    <header className=" sticky top-0 flex-wrap z-20  mx-auto flex w-full items-center justify-between ease-in duration-300 glass-nav">
      <Logo />
      <Nav />
      <ToastContainer draggable closeOnClick />
      <ConnectionMessage />
    </header>
  );
};

export default Header;
