import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/PublicHeader";

const HelloWorld = () => {
  return (
    <>
      <Helmet>
        <title>StaffSwap | Contact</title>
        <meta name="description" content="StaffSwap" />
        <meta name="keywords" content="StaffSwap" />
        <meta name="author" content="StaffSwap" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="text-4xl font-bold text-[#e0211a]">Contact</div>
      </div>
    </>
  );
};

export default HelloWorld;
