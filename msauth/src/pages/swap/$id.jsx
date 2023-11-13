import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
// use useParams to get the id from the url

const Greeting = () => {
  let { id } = useParams();
  console.log(id);
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="text-4xl font-bold text-blue-500">Hello, {id}!</div>
      </div>
    </>
  );
};

export default Greeting;
