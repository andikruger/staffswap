import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Loading = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg m-4 max-w-md">
      <AiOutlineLoading3Quarters className="animate-spin h-10 w-10 text-[#e0211a]" />
    </div>
  );
};

export default Loading;
