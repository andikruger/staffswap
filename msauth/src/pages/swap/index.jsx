import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AddButton from "../../components/AddButton";
import axios from "axios";
import "../../index.css";
import { toast } from "react-toastify";

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

const Swaps = () => {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSwaps = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/swap");
        setSwaps(response.data.data);
        console.log("Swaps:", response.data.data);
      } catch (error) {
        console.error("Error fetching swaps:", error);
        setError("Error fetching swaps");
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchSwaps();
    const toastMessage = sessionStorage.getItem("toast");

    if (toastMessage) {
      toast(toastMessage, {
        type: sessionStorage.getItem("toastType"),
      });
      sessionStorage.removeItem("toast");
      sessionStorage.removeItem("toastType");
    }
  }, []);

  return (
    <>
      <Header />
      <AddButton />
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://source.unsplash.com/1600x900/?aviation")',
        }}
      >
        {loading ? (
          <p>Loading swaps...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="flex flex-wrap justify-center">
            {Array.isArray(swaps) && swaps.length > 0 ? (
              swaps.map((swap, index) => (
                <Link
                  to={`/swap/${swap._id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                  key={index}
                >
                  <div
                    key={index}
                    className="bg-white p-8 rounded-lg shadow-lg m-4 max-w-md"
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
              ))
            ) : (
              <p className="bg-white p-8 rounded-lg shadow-lg m-4 max-w-md">
                No swaps available.
              </p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Swaps;
