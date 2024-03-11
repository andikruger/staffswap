import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import sha256 from "crypto-js/sha256";
import { toast } from "react-toastify";
import { useMsal } from "@azure/msal-react";

const QuickSubmit = () => {
  const { accounts } = useMsal();
  const [userID, setUserID] = useState("");
  const [userData, setUserData] = useState({});
  const [threeLetterCode, setThreeLetterCode] = useState("");
  const [textAreaValue, setTextAreaValue] = useState(""); // Added state for textarea content

  useEffect(() => {
    // Assuming accounts[0].username is available
    const newUserID = sha256(accounts[0].username).toString();
    setUserID(newUserID);

    // get data from the database using axios with catch
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user/username/${newUserID}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        let data = res.data.data;

        setUserData(data);
        setThreeLetterCode(data.threeLetterCode); // Set the threeLetterCode state
      })
      .catch((err) => {
        console.log("err", err);
      });
    localStorage.clear();
  }, [accounts]);

  function parseText(text) {
    const lines = text.split("\n").filter((line) => line.trim() !== ""); // Filter out empty lines

    // Check if there are any lines remaining
    if (!lines.length) {
      throw new Error("Empty text provided. No data to parse.");
    }

    let lineOffset = 0;
    let qualifications = "";
    let firstLine = lines[0].trim();
    console.log(firstLine);
    let regex = /^\s*-\s*\d{2}\.\d{2}$/;
    let firstLineResult = regex.test(firstLine);
    console.log(firstLineResult);
    if (firstLineResult) {
      qualifications = "PS B2"; // Set qualifications for "dd.mm" format
      lineOffset = 1;
    } else {
      qualifications = firstLine.substring(2).trim();
      // Remove everything after the space including the space
      qualifications = qualifications.replace(/ .*/, "");
    }

    // Access lines starting from index 1 to avoid empty line issues
    const [day, month, year] = lines[1 - lineOffset].substring(2).split(".");
    const date = `${year || new Date().getFullYear()}-${month}-${day}`;
    const [startTime, endTime] = lines[2 - lineOffset]
      .substring(2)
      .split(" - ")
      .map((time) => {
        const [hours, minutes] = time.replace(/\s/g, "").match(/.{1,2}/g); // Splitting the time into hours and minutes
        return `${hours.padStart(2, "0")}:${minutes.padEnd(2, "0")}`; // Padding hours and minutes with leading zeros if needed
      });
    const exchangeLine = lines.find((line) => line.startsWith("- rt"));
    const exchanges = exchangeLine
      ? exchangeLine
          .substring(5)
          .split("/")
          .map((exchangeDate) => ({
            date: `${
              year || new Date().getFullYear()
            }-${month}-${exchangeDate}`,
            startTime,
            endTime,
          }))
      : [];
    const note = lines
      .slice(3, exchangeLine ? -1 : undefined)
      .map((line) => line.replace(/^[\s-]*/, ""))
      .join("\n")
      .trim();

    return {
      lineOffset,
      date,
      startTime,
      endTime,
      exchanges,
      note,
      qualifications,
    };
  }

  function submitSwap() {
    const parsedObject = parseText(textAreaValue);
    console.log(parsedObject);
  }

  return (
    <>
      <Helmet>
        <title>StaffSwap | New Swap</title>
        <meta name="description" content="StaffSwap" />
        <meta name="keywords" content="StaffSwap" />
        <meta name="author" content="StaffSwap" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header />

      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(/assets/hero_${
            sessionStorage.getItem("randomImage") || 1
          }.jpg)`,
        }}
      >
        {/* White rounded box */}
        <div className="bg-white my-4 p-8 rounded-lg shadow-lg w-11/12 max-w-screen-md overflow-y-auto">
          {/* Your content goes here */}
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            New Swap
          </h2>
          {/* Textarea */}
          <form onSubmit={submitSwap}>
            <textarea
              className="w-full h-40 p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your text here"
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
            ></textarea>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
              onClick={(e) => {
                e.preventDefault();
                submitSwap();
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default QuickSubmit;
