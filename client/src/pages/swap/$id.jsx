import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DeleteSwapButton from "../../components/DeleteButton";
import ChatButton from "../../components/ChatButton";
import EditSwapButton from "../../components/EditButton";
import MatchButton from "../../components/MatchButton";
import axios from "axios";
import "../../index.css";
import * as CryptoJS from "crypto-js";
import qualificationData from "../../data/qualifications.json";
import shiftTypeData from "../../data/shifttypes.json";
import { toast } from "react-toastify";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
const formatPriority = (priority) => {
  switch (priority) {
    case 1:
      return "Low";
    case 2:
      return "Medium";
    case 3:
      return "High";
    default:
      return "Low";
  }
};

const QualificationButton = ({ label, isChecked, onChange }) => {
  const buttonStyle = {
    backgroundColor: isChecked ? "#e0211a" : "transparent",
    borderRadius: "20px",
    padding: "10px 20px",
    margin: "8px",
    color: isChecked ? "white" : "black",
    border: isChecked ? "none" : "1px solid #ccc", // Add border for unchecked items
    cursor: "not-allowed",
  };

  const handleClick = (event) => {
    event.preventDefault(); // Prevent the default form submission
    onChange(label);
  };

  return (
    <button
      className="checkbox-button"
      style={buttonStyle}
      onClick={handleClick}
      disabled
    >
      {label}
    </button>
  );
};

const QualificationsList = ({ options, selectedOptions, onChange }) => {
  return (
    <div className="checkbox-list">
      {options.map((option) => (
        <QualificationButton
          key={option}
          label={option}
          isChecked={selectedOptions.includes(option)}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

const ShiftType = ({ label, isSelected }) => {
  const buttonStyle = {
    backgroundColor: isSelected ? "#e0211a" : "transparent",
    borderRadius: "20px",
    padding: "10px 20px",
    margin: "8px",
    color: isSelected ? "white" : "black",
    border: isSelected ? "none" : "1px solid #ccc",
    cursor: "not-allowed",
  };
  const handleClick = (event) => {
    event.preventDefault(); // Prevent the default form submission
  };
  return (
    <button className="radio-button" style={buttonStyle} onClick={handleClick}>
      {label}
    </button>
  );
};

const ShiftTypeList = ({ options, selectedOption }) => {
  return (
    <div className="radio-button-list">
      {options.map((option) => (
        <ShiftType
          key={option}
          label={option}
          isSelected={selectedOption === option}
        />
      ))}
    </div>
  );
};

const SwapDetails = () => {
  let userID = sessionStorage.getItem("user");
  const { id } = useParams();
  const [swapDetails, setSwapDetails] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchSwapDetails = async () => {
      try {
        // Fetch swap details from the API
        const response = await axios.get(
          `https://lucky-red-robe.cyclic.app/api/v1/swap/${id}`
        );
        setSwapDetails(response.data.data);
        setSelectedOption(response.data.data.shiftType);
        setSelectedOptions(response.data.data.qualifications);
        if (response.data.data.email && response.data.data.displayEmail) {
          let email = CryptoJS.AES.decrypt(
            response.data.data.email,
            "5LBMOi7Lf1G/yF+VnMbk24PPRgGPE6jzFYNhKeq95ko="
          );
          setEmail(email.toString(CryptoJS.enc.Utf8));
        }

        if (
          response.data.data.phoneNumber &&
          response.data.data.displayPhoneNumber
        ) {
          console.log("condition met");
          let phone = CryptoJS.AES.decrypt(
            response.data.data.phoneNumber,
            "5LBMOi7Lf1G/yF+VnMbk24PPRgGPE6jzFYNhKeq95ko="
          );
          console.log("phone", phone);
          setPhone(phone.toString(CryptoJS.enc.Utf8));
        } else {
          console.log("condition not met");
        }
      } catch (error) {
        console.error("Error fetching swap details:", error);
        toast.error("Error fetching swap details", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    fetchSwapDetails(); // Fetch swap details when the component mounts
    setUser(sessionStorage.getItem("user"));
    console.log("user", user);
    localStorage.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Include id as a dependency to re-fetch when id changes

  const qualifications = qualificationData.qualifications;

  const shiftType = shiftTypeData.shiftTypes;

  const [exchanges, setExchanges] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("13:00");

  return (
    <>
      <Helmet>
        <title>StaffSwap | View Swap</title>
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

      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://source.unsplash.com/1600x900/?aviation")',
        }}
      >
        {/* White rounded box */}
        <div className="bg-white p-8 my-4 rounded-lg shadow-lg w-11/12 max-w-screen-md overflow-y-auto">
          {/* Your content goes here */}
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Swap Details
          </h2>
          {/* Name and Three Letter Code in a column for smaller screens */}
          <div className="flex flex-col sm:flex-row mb-4">
            {/* Name */}
            <div className="w-full sm:w-1/2 mb-2 sm:mb-0 sm:mr-2">
              <label htmlFor="name" className="block text-sm mb-2">
                Name
              </label>
              <p
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                id="name"
              >
                {swapDetails.name}
              </p>
            </div>

            {/* Three Letter Code */}
            <div className="w-full sm:w-1/2 ml-0 sm:ml-2">
              <label htmlFor="threeLetterCode" className="block text-sm mb-2">
                Three Letter Code
              </label>
              <p
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                id="threeLetterCode"
              >
                {swapDetails.threeLetterCode}
              </p>
            </div>
          </div>

          {/* Date and Shift Time in a column for smaller screens */}
          <div className="flex flex-col sm:flex-row mb-4">
            {/* Date */}
            <div className="w-full sm:w-1/2 mb-2 sm:mb-0 sm:mr-2">
              <label htmlFor="date" className="block text-sm mb-2">
                Date
              </label>
              <p
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                id="date"
              >
                {formatDate(swapDetails.date)}
              </p>
            </div>

            {/* Shift Time */}
            <div className="w-full sm:w-1/2 ml-0 sm:ml-2">
              <label htmlFor="shiftTime" className="block text-sm mb-2">
                Shift Time
              </label>
              <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
                {swapDetails.startTime} - {swapDetails.endTime} (
                {swapDetails.duration} hours)
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="priority" className="block text-sm mb-2">
              Priority
            </label>
            <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
              {formatPriority(swapDetails.priority)}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Type</label>
            <div>
              {/* ... Radio buttons ... */}
              <ShiftTypeList
                options={shiftType}
                selectedOption={selectedOption}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="note" className="block text-sm mb-2">
              Note
            </label>
            <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
              {swapDetails.note || "No note provided"}
            </p>
          </div>

          {/* Exchanges */}

          <div className="mb-4">
            <label className="block text-sm mb-2">Exchanges</label>
            <ul>
              {Array.isArray(swapDetails.exchanges) &&
                swapDetails.exchanges.map((exchange, index) => (
                  <li
                    key={index}
                    style={{
                      backgroundColor: "#e0211a",
                      borderRadius: "20px",
                      padding: "10px 20px",
                      margin: "8px",
                      color: "white",
                      border: "none", // Add border for unchecked items
                    }}
                  >
                    {`Date: ${formatDate(exchange.date)}, ${
                      exchange.startTime
                    } - ${exchange.endTime}`}
                  </li>
                ))}
            </ul>
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">
              Qualifications Required
            </label>
            <QualificationsList
              options={qualifications}
              selectedOptions={selectedOptions}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="note" className="block text-sm mb-2">
              Email
            </label>
            <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
              {email || "No email provided"}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="note" className="block text-sm mb-2">
              Phone Number
            </label>
            <p className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
              {phone || "No Phone Number provided"}
            </p>
          </div>

          {/* Display buttons if userID = swap.userID */}
          {userID === swapDetails.userID && (
            <div className="flex flex-col sm:flex-row justify-between">
              <DeleteSwapButton id={id} />
              <MatchButton id={id} swapDetails={swapDetails} />
              <EditSwapButton id={id} />
            </div>
          )}

          {/* Display match button if userID != swap.userID */}
          {userID !== swapDetails.userID && (
            <div className="flex flex-col sm:flex-row justify-between">
              <ChatButton id={id} swapDetails={swapDetails} />
              <MatchButton id={id} swapDetails={swapDetails} />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SwapDetails;
