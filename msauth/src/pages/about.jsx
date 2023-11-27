import React from "react";
import Header from "../components/Header";

const HelloWorld = () => {
  return (
    <>
      <Helmet>
        <title>StaffSwap | About</title>
        <meta name="description" content="StaffSwap" />
        <meta name="keywords" content="StaffSwap" />
        <meta name="author" content="StaffSwap" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="text-4xl font-bold text-blue-500">About</div>
      </div>
    </>
  );
};

export default HelloWorld;
