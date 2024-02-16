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
const SwapCard = ({ swap, index }) => {
  return (
    <Link
      to={`/swap/${swap._id}`}
      style={{ color: "inherit", textDecoration: "none" }}
      key={index}
      className=""
    >
      <div
        key={index}
        className="bg-white p-8 rounded-lg shadow-lg m-4 max-w-md transition duration-300 ease-in-out hover:bg-gray-200"
        style={{
          flexBasis: "100%",
          borderColor: getPriorityColor(swap.priority),
          borderWidth: "0 0 4px 0",
        }}
      >
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {formatDate(swap.date)}
        </h2>
        {/* Render swap details here */}
        <div>
          <strong>{`${swap.startTime} - ${swap.endTime}`}</strong>
        </div>
        <div>
          <strong>Name:</strong> {swap.name}
        </div>
        <div>
          <strong>Three Letter Code:</strong> {swap.threeLetterCode}
        </div>

        <div>
          <strong>Wish:</strong>{" "}
          <p className="bg-[#e0211a] text-white rounded-full px-3 py-1 text-sm font-semibold m-1">
            {swap.shiftWish}
          </p>
        </div>

        <div>
          <strong>Note:</strong> {swap.note}
        </div>

        <div className="flex flex-wrap mt-4 items-center justify-center content-center">
          {/* Display qualifications as tags */}
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
        {/* ... other swap details ... */}
      </div>
    </Link>
  );
};

export default SwapCard;
