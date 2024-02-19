import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex items-center">
        <div className="mr-4">
          <AiOutlineLoading3Quarters className="animate-spin h-10 w-10 text-red-500" />
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-900">Loading...</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
