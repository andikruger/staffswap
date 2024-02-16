import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import AddButton from "../../../components/AddButton";
import SearchButton from "../../../components/SearchButton";
import axios from "axios";
import "../../../index.css";
import { toast } from "react-toastify";

function removeElementsWithMatchingThreeLetterCode(arr, targetThreeLetterCode) {
  return arr.filter(
    (element) => element.threeLetterCode !== targetThreeLetterCode
  );
}

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

function formatTime(time) {
  const [hours, minutes] = time.split(":");
  const result = new Date();
  result.setHours(hours, minutes, 0, 0);
  return result;
}

function findMatches(obj, arr) {
  const matches = new Set();

  // Helper function to check if qualifications match
  const qualificationsMatch = (qualificationArray1, qualificationArray2) => {
    return qualificationArray1.some((qualification) =>
      qualificationArray2.includes(qualification)
    );
  };

  // Check if the shiftWish is "Selber Dienst, anderer Tag"
  if (obj.shiftWish === "Selber Dienst, anderer Tag") {
    // Iterate through the array of potential matches
    for (const swap of arr) {
      // Check if the dates are different and threeLetterCode values are different
      if (
        obj.date !== swap.date &&
        obj.threeLetterCode !== swap.threeLetterCode
      ) {
        // Check if startTime, endTime, and qualifications match
        if (
          obj.startTime === swap.startTime &&
          obj.endTime === swap.endTime &&
          qualificationsMatch(obj.qualifications, swap.qualifications)
        ) {
          // Create a match object with quality and verdict
          const match = {
            swap: swap,
            quality: 1, // Since it's an exact match
            verdict: {
              hours: "Exact duration",
              leewayConsidered: false, // Leeway is not considered for this case
            },
          };

          // Add the match to the Set
          matches.add(JSON.stringify(match));
        }
      }
    }
  } else {
    // Iterate through the exchanges of the object
    for (const exchange of obj.exchanges) {
      // Iterate through the array of potential matches
      for (const swap of arr) {
        // Check if the dates are not the same and threeLetterCode values are different
        if (
          obj.date !== swap.date &&
          exchange.threeLetterCode !== swap.threeLetterCode
        ) {
          // Convert exchange and swap start/end times to Date objects using formatTime
          const exchangeStartTime = formatTime(exchange.startTime);
          const exchangeEndTime = formatTime(exchange.endTime);
          const swapStartTime = formatTime(swap.startTime);
          const swapEndTime = formatTime(swap.endTime);

          // Calculate the start time with leeway
          const startTimeWithLeeway = new Date(exchangeStartTime);
          startTimeWithLeeway.setHours(startTimeWithLeeway.getHours() - 1);

          // Calculate the end time with leeway
          const endTimeWithLeeway = new Date(exchangeEndTime);
          endTimeWithLeeway.setHours(endTimeWithLeeway.getHours() + 1);

          // Check if the potential match's start time falls within the exchange's time range with leeway
          if (
            startTimeWithLeeway <= swapStartTime &&
            swapStartTime <= exchangeEndTime
          ) {
            // Check if the potential match's end time falls within the exchange's time range with leeway
            if (
              startTimeWithLeeway <= swapEndTime &&
              swapEndTime <= endTimeWithLeeway
            ) {
              // Check if qualifications match
              const qualificationsMatched = qualificationsMatch(
                obj.qualifications,
                swap.qualifications
              );

              if (qualificationsMatched) {
                // Calculate the quality of the match
                let quality = 0;

                // Check if the start time matches exactly
                if (+exchangeStartTime === +swapStartTime) {
                  quality += 1;
                } else {
                  quality -= 0.5; // Starts an hour earlier
                }

                // Check if the end time matches exactly
                if (+exchangeEndTime === +swapEndTime) {
                  quality += 1;
                } else {
                  quality -= 0.5; // Ends an hour later
                }

                // Check if the duration matches exactly
                if (+exchange.duration === +swap.duration) {
                  quality += 1;
                } else {
                  quality -= 0.5; // Duration mismatch
                }

                // Calculate the difference in hours between the swap and the exchange
                const hoursDifference = Math.abs(
                  (swapEndTime - swapStartTime) / (60 * 60 * 1000) -
                    (exchangeEndTime - exchangeStartTime) / (60 * 60 * 1000)
                );

                // Determine if the swap has more or fewer hours
                const hoursVerdict =
                  hoursDifference === 0
                    ? "Exact duration"
                    : swapEndTime - swapStartTime >
                      exchangeEndTime - exchangeStartTime
                    ? "More hours"
                    : "Fewer hours";

                // Determine if leeway was considered
                const leewayConsidered =
                  swapStartTime >= startTimeWithLeeway &&
                  swapEndTime <= endTimeWithLeeway;

                // Check if threeLetterCode values are different
                if (exchange.threeLetterCode !== swap.threeLetterCode) {
                  // Create a match object with quality and verdict

                  console.log("houresdiffernce", hoursDifference);
                  const match = {
                    swap: swap,
                    quality: quality,
                    verdict: {
                      hours: hoursVerdict,
                      leewayConsidered: leewayConsidered,
                    },
                  };

                  // Add the match to the Set
                  matches.add(JSON.stringify(match));
                }
              }
            }
          }
        }
      }
    }
  }

  // Convert Set to array and sort matches by quality in descending order
  const uniqueMatches = Array.from(matches).map((match) => JSON.parse(match));
  uniqueMatches.sort((a, b) => b.quality - a.quality);

  // Return unique matches
  return uniqueMatches.map((match) => ({
    swap: match.swap,
    quality: match.quality,
    verdict: match.verdict,
  }));
}

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

function getStyle(verdict) {
  let style = "";

  // Add styles based on match.verdict.hours
  switch (verdict.hours) {
    case "Exact duration":
      style += "exact-duration ";
      break;
    case "Fewer hours":
      style += "fewer-hours ";
      break;
    case "More hours":
      style += "more-hours ";
      break;
    default:
      break;
  }

  // Add styles based on match.verdict.leewayConsidered
  if (verdict.leewayConsidered) {
    style += "leeway-considered";
  }

  return style.trim(); // Trim any extra spaces
}

const Swaps = () => {
  const { id } = useParams();
  const [swaps, setSwaps] = useState([]);
  const [individualSwap, setIndividualSwap] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSwaps = async () => {
      try {
        const response = await axios.get("http://localhost:8000/swap");
        setSwaps(response.data.data);
        console.log("Swaps:", response.data.data);

        // Fetch individual swap if ID is provided
        if (id) {
          const individualSwapResponse = await axios.get(
            `http://localhost:8000/swap/${id}`
          );
          setIndividualSwap(individualSwapResponse.data.data);
          console.log("Individual swap:", individualSwapResponse.data.data);

          let filteredSwaps = removeElementsWithMatchingThreeLetterCode(
            response.data.data,
            individualSwapResponse.data.data.threeLetterCode
          );
          // find matches
          const matches = findMatches(
            individualSwapResponse.data.data,
            filteredSwaps
          );
          console.log("Matches:", matches);
          setMatches(matches);
        }
      } catch (error) {
        console.error("Error fetching swaps:", error);
        setError("Error fetching swaps");
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchSwaps();
    localStorage.clear();
    const toastMessage = sessionStorage.getItem("toast");

    if (toastMessage) {
      toast(toastMessage, {
        type: sessionStorage.getItem("toastType"),
      });
      sessionStorage.removeItem("toast");
      sessionStorage.removeItem("toastType");
    }
  }, [id, findMatches, setSwaps, setIndividualSwap, setLoading, setMatches]);

  console.log("Individual swap:", individualSwap);

  return (
    <>
      <Helmet>
        <title>StaffSwap | All Swaps</title>
        <meta name="description" content="StaffSwap" />
        <meta name="keywords" content="StaffSwap" />
        <meta name="author" content="StaffSwap" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header />
      <AddButton />
      <SearchButton />
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://source.unsplash.com/1600x900/?aviation")',
        }}
      >
        {loading ? (
          <p className="bg-white p-8 rounded-lg shadow-lg m-4 max-w-md">
            Loading swaps...
          </p>
        ) : error ? (
          <p className="bg-white p-8 rounded-lg shadow-lg m-4 max-w-md">
            {error}
          </p>
        ) : (
          <div className="flex flex-wrap justify-center">
            {Array.isArray(matches) && matches.length > 0 ? (
              matches.map((match, index) => (
                <Link
                  to={`/swap/${match.swap.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                  key={index}
                  className=""
                >
                  <div
                    key={index}
                    className="bg-white p-8 rounded-lg shadow-lg m-4 max-w-md transition duration-300 ease-in-out hover:bg-gray-200"
                    style={{
                      flexBasis: "100%",
                      borderColor: getPriorityColor(match.swap.priority),
                      borderWidth: "0 0 4px 0",
                    }}
                  >
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">
                      {formatDate(match.swap.date)}
                    </h2>
                    {/* Render swap details here */}
                    <div>
                      <strong>{`${match.swap.startTime} - ${match.swap.endTime}`}</strong>
                    </div>
                    <div>
                      <strong>Name:</strong> {match.swap.name}
                    </div>
                    <div>
                      <strong>Three Letter Code:</strong>{" "}
                      {match.swap.threeLetterCode}
                    </div>
                    <div>
                      <strong>Note:</strong> {match.swap.note}
                    </div>

                    <div className="flex flex-wrap mt-4 items-center justify-center content-center">
                      {/* Display qualifications as tags */}
                      {Array.isArray(match.swap.qualifications) &&
                        match.swap.qualifications.map((qualification, i) => (
                          <span
                            key={i}
                            className="bg-[#e0211a] text-white rounded-full px-3 py-1 text-sm font-semibold m-1"
                          >
                            {qualification}
                          </span>
                        ))}
                    </div>
                    {/* ... other swap details ... */}

                    <p className={getStyle(match.verdict)}>
                      {match.verdict.hours}{" "}
                      {match.verdict.leewayConsidered
                        ? "(Leeway Considered)"
                        : ""}
                    </p>
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
