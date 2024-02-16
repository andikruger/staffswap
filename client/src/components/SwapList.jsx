import React from "react";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 3:
      return "#e0211a"; // Highest priority
    case 2:
      return "#ffae42"; // Medium priority
    case 1:
      return "#50c878"; // Lowest priority
    default:
      return "#e0211a"; // Default to highest priority
  }
};

const SwapList = ({ swap }) => {
  return (
    <Link
      to={`/swap/${swap._id}`}
      style={{ color: "inherit", textDecoration: "none" }}
      className=""
    >
      <div
        className="bg-white p-8 w-full rounded-lg shadow-lg mb-4 transition duration-300 ease-in-out hover:bg-gray-200 relative"
        style={{
          borderColor: getPriorityColor(swap.priority),
          borderWidth: "0 0 4px 0",
        }}
      >
        {/* Content */}

        <div className="flex flex-col md:flex-row">
          {/* Date */}
          <div className="flex items-center mb-2 md:mb-0 md:mr-8">
            <p className="text-sm text-black font-bold">
              {formatDate(swap.date)}
            </p>
          </div>

          {/* Time */}
          <div className="flex items-center mb-2 md:mb-0 md:mr-8">
            <p className="text-sm text-black">
              {swap.startTime} - {swap.endTime}
            </p>
          </div>

          {/* Name */}
          <div className="flex items-center mb-2 md:mb-0 md:mr-8">
            <p className="text-sm text-black">
              {swap.name}({swap.threeLetterCode})
            </p>
          </div>

          {/* Shift Wish */}
          <div className="flex items-center mb-2 md:mb-0 md:mr-8">
            <p className="text-sm text-black mr-2">Shift Wish:</p>
            <p className="bg-[#e0211a] text-white rounded-full px-3 py-1 text-sm font-semibold m-1">
              {swap.shiftWish}
            </p>
          </div>

          {/* Qualifications */}
          <div className="flex flex-wrap items-center mb-2 md:mb-0 md:mr-8">
            {Array.isArray(swap.qualifications) &&
              swap.qualifications.map((qualification, i) => (
                <span
                  key={i}
                  className="bg-[#e0211a] text-white rounded-full px-3 py-1 text-sm font-semibold m-1"
                >
                  {qualification}
                </span>
              ))}
          </div>

          {/* Note */}
          <div className="flex items-center">
            <p className="text-sm text-black mr-2">Note:</p>
            <p className="text-sm text-black">{swap.note}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SwapList;
