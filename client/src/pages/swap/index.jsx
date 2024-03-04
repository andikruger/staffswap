import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AddButton from "../../components/AddButton";
import ChangeViewButton from "../../components/ChangeViewButton";
import SearchButton from "../../components/SearchButton";
import RuleButton from "../../components/RuleButton";
import SwapList from "../../components/SwapList";
import SwapCard from "../../components/SwapCard";
import Loading from "../../components/Loading";
import axios from "axios";
import "../../index.css";
import { toast } from "react-toastify";

const Swaps = () => {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState(localStorage.getItem("view") || "grid");

  useEffect(() => {
    const fetchSwaps = async () => {
      try {
        const response = await axios.get("http://localhost:8000/swap");
        setSwaps(response.data.data);
      } catch (error) {
        console.error("Error fetching swaps:", error);
        setError("Error fetching swaps");
      } finally {
        setLoading(false);
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

  useEffect(() => {
    localStorage.setItem("view", view);
  }, [view]);

  const toggleView = () => {
    setView((prevView) => (prevView === "grid" ? "list" : "grid"));
  };

  function displaySwaps() {
    if (view === "list") {
      return (
        <div className="pt-4">
          <ul>
            {Array.isArray(swaps) && swaps.length > 0 ? (
              swaps.map((swap, index) => (
                <li key={index}>
                  <SwapList swap={swap} />
                </li>
              ))
            ) : (
              <p>No swaps available.</p>
            )}
          </ul>
        </div>
      );
    } else {
      return (
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
      );
    }
  }

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
      <div className="flex flex-col items-center">
        <ChangeViewButton
          toggleView={toggleView}
          icon={view === "grid" ? "list" : "grid"}
        />
        <AddButton />
      </div>
      <RuleButton />
      <SearchButton />
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(/assets/hero_${
            Math.floor(Math.random() * 6) + 1
          }.jpg)`,
        }}
      >
        {loading ? (
          <Loading />
        ) : error ? (
          <p className="bg-white p-8 rounded-lg shadow-lg m-4 max-w-md">
            {error}
          </p>
        ) : (
          <div className="">{displaySwaps()}</div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Swaps;
