import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import AddButton from "../../../components/AddButton";
import SearchButton from "../../../components/SearchButton";
import SwapCard from "../../../components/SwapCard";
import axios from "axios";
import "../../../index.css";
import { toast } from "react-toastify";

const Swaps = () => {
  const { query } = useParams();
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSwaps = async () => {
      try {
        const response = await axios.get(
          `https://lucky-red-robe.cyclic.app/swap/search/${query}`
        );

        setSwaps(response.data);
      } catch (error) {
        console.error("Error fetching swaps:", error);
        setError("Error fetching swaps");
        toast("Error fetching swaps", { type: "error" });
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchSwaps();
    const toastMessage = localStorage.getItem("toast");

    if (toastMessage) {
      toast(toastMessage, {
        type: localStorage.getItem("toastType"),
      });
      localStorage.removeItem("toast");
      localStorage.removeItem("toastType");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>StaffSwap | Results</title>
        <meta name="description" content="StaffSwap" />
        <meta name="keywords" content="StaffSwap" />
        <meta name="author" content="StaffSwap" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Helmet>
        <title>StaffSwap</title>
        <meta name="description" content="StaffSwap" />
        <meta name="keywords" content="StaffSwap" />
        <meta name="author" content="StaffSwap" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header />
      <AddButton />
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://source.unsplash.com/1600x900/?aviation")',
        }}
      >
        <SearchButton />
        {loading ? (
          <p>Loading swaps...</p>
        ) : error ? (
          <p className="bg-white p-8 rounded-lg shadow-lg m-4 max-w-md">
            {error}
          </p>
        ) : (
          <div className="flex flex-wrap justify-center">
            {Array.isArray(swaps) && swaps.length > 0 ? (
              swaps.map((swap, index) => (
                <SwapCard key={index} swap={swap} index={index} />
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
