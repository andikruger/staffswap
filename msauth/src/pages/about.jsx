import React from "react";
import Header from "../components/Header";

const HelloWorld = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="text-4xl font-bold text-blue-500">About</div>
      </div>
    </>
  );
};

export default HelloWorld;
