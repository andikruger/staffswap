import { React, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import axios from "axios";
import "../../../index.css";
import qualificationData from "../../../data/qualifications.json";
import shiftTypeData from "../../../data/shifttypes.json";
import shiftTimesData from "../../../data/shifttimes.json";
import { toast } from "react-toastify";

const CheckboxButton = ({ label, isChecked, onChange }) => {
  const buttonStyle = {
    backgroundColor: isChecked ? "#e0211a" : "transparent",
    borderRadius: "20px",
    padding: "10px 20px",
    margin: "8px",
    color: isChecked ? "white" : "black",
    border: isChecked ? "none" : "1px solid #ccc", // Add border for unchecked items
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
    >
      {label}
    </button>
  );
};

const CheckboxList = ({ options, selectedOptions, onChange }) => {
  return (
    <div className="checkbox-list">
      {options.map((option) => (
        <CheckboxButton
          key={option}
          label={option}
          isChecked={selectedOptions.includes(option)}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

const RadioButton = ({ label, isSelected, onChange }) => {
  const buttonStyle = {
    backgroundColor: isSelected ? "#e0211a" : "transparent",
    borderRadius: "20px",
    padding: "10px 20px",
    margin: "8px",
    color: isSelected ? "white" : "black",
    border: isSelected ? "none" : "1px solid #ccc",
  };
  const handleClick = (event) => {
    event.preventDefault(); // Prevent the default form submission
    onChange(label);
  };
  return (
    <button className="radio-button" style={buttonStyle} onClick={handleClick}>
      {label}
    </button>
  );
};

const RadioButtonList = ({ options, selectedOption, onChange }) => {
  return (
    <div className="radio-button-list">
      {options.map((option) => (
        <RadioButton
          key={option}
          label={option}
          isSelected={selectedOption === option}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

const EditSwap = () => {
  const [submitObject, setSubmitObject] = useState({});
  const [creator, setCreator] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSwapDetails = async () => {
      try {
        // Fetch swap details from the API
        const response = await axios.get(
          `https://lucky-red-robe.cyclic.app/api/v1/swap/${id}`
        );
        setSubmitObject(response.data.data);

        setSelectedOption(response.data.data.shiftType);
        setSelectedOptions(response.data.data.qualifications);
        setExchanges(response.data.data.exchanges);
        let formatedDate = response.data.data.date.split("T")[0];
        setDateFormated(formatedDate);
        setCreator(response.data.data.userID);
      } catch (error) {
        console.error("Error fetching swap details:", error);
        toast.error("Error fetching swap details", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    fetchSwapDetails(); // Fetch swap details when the component mounts
    localStorage.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate]); // Include id and navigate as dependencies to re-fetch when they change

  if (creator === sessionStorage.getItem("user")) {
    console.log(creator === sessionStorage.getItem("user"));
  } else {
    console.log(creator === sessionStorage.getItem("user"));
    console.log(
      `creator: ${creator} - sessionStorage: ${sessionStorage.getItem("user")}`
    );
    navigate("/swap");
  }

  const handleInputChange = (event) => {
    if (event.target.name === "shiftTime") {
      const newShiftTime = event.target.value;

      let startTime = newShiftTime.split("-")[0];
      let endTime = newShiftTime.split("-")[1];

      // calculate duration
      const start = new Date(`01/01/2023 ${startTime}`);
      const end = new Date(`01/01/2023 ${endTime}`);
      const duration = (end - start) / 1000 / 60 / 60;

      let tempDuration;
      if (startTime > endTime) {
        tempDuration = duration + 24;
      } else {
        tempDuration = duration;
      }

      setSubmitObject({
        ...submitObject,
        startTime,
        endTime,
        duration: tempDuration,
      });
    } else if (event.target.name === "date") {
      let formatedDate = event.target.value.split("T")[0];
      setDateFormated(formatedDate);
      setSubmitObject({ ...submitObject, date: formatedDate });
    } else {
      const { name, value } = event.target;
      setSubmitObject({ ...submitObject, [name]: value });
    }
  };
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dateFormated, setDateFormated] = useState(null);

  const handleCheckboxChange = (label) => {
    const updatedOptions = selectedOptions.includes(label)
      ? selectedOptions.filter((option) => option !== label)
      : [...selectedOptions, label];

    setSelectedOptions(updatedOptions);
  };
  const handleRadioChange = (label) => {
    setSelectedOption(label);
  };
  const qualifications = qualificationData.qualifications;

  const shiftType = shiftTypeData.shiftTypes;
  const shiftTimes = shiftTimesData.shiftTimes;

  const [exchanges, setExchanges] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("13:00");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  const handleAddExchange = () => {
    const newExchange = {
      date: selectedDate.toISOString().split("T")[0],
      startTime,
      endTime,
    };

    setExchanges([...exchanges, newExchange]);

    // Reset form values
    setSelectedDate(new Date());
    setStartTime("12:00");
    setEndTime("13:00");
  };

  const handleRemoveExchange = (index) => {
    const updatedExchanges = [...exchanges];
    updatedExchanges.splice(index, 1);
    setExchanges(updatedExchanges);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.target);
      const value = Object.fromEntries(data.entries());

      let newShiftTime = value.shiftTime;
      let startTime = newShiftTime.split("-")[0];
      let endTime = newShiftTime.split("-")[1];

      // calculate duration
      const start = new Date(`01/01/2023 ${startTime}`);
      const end = new Date(`01/01/2023 ${endTime}`);
      const duration = (end - start) / 1000 / 60 / 60;

      let tempDuration;
      if (startTime > endTime) {
        tempDuration = duration + 24;
      } else {
        tempDuration = duration;
      }
      const tempObj = {
        ...value,
        qualifications: selectedOptions,
        shiftType: selectedOption,
        exchanges: exchanges,
        startTime,
        endTime,
        duration: tempDuration,
      };

      setSubmitObject(tempObj);

      const response = await axios.put(
        `https://lucky-red-robe.cyclic.app/api/v1/swap/${id}`,
        tempObj
      );

      toast.success("Swap updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setSubmitObject(tempObj); // Add this line

      // Rest of your code...
    } catch (error) {
      console.log(error);
      toast.error("Swap update failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>StaffSwap | Edit Swap</title>
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
        <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-screen-md overflow-y-auto">
          {/* Your content goes here */}
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Swap</h2>
          <form onSubmit={handleSubmit}>
            {/* Add your form fields here */}
            {/* Name and Three Letter Code in the same line for larger screens */}
            <div className="flex mb-4">
              {/* Name */}
              <div className="w-full sm:w-1/2 mb-2 sm:mb-0 sm:mr-2">
                <label htmlFor="name" className="block text-sm mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={submitObject.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  readOnly
                />
              </div>

              {/* Three Letter Code */}
              <div className="w-full sm:w-1/2 ml-0 sm:ml-2">
                <label htmlFor="threeLetterCode" className="block text-sm mb-2">
                  Three Letter Code
                </label>
                <input
                  type="text"
                  id="threeLetterCode"
                  name="threeLetterCode"
                  value={submitObject.threeLetterCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  readOnly
                />
              </div>
            </div>

            {/* Date and time */}
            <div className="flex mb-4">
              {/* Date */}
              <div className="w-full sm:w-1/2 mb-2 sm:mb-0 sm:mr-2">
                <label htmlFor="date" className="block text-sm mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={dateFormated}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Shift time */}
              <div className="w-full sm:w-1/2 ml-0 sm:ml-2">
                <label htmlFor="shiftTime" className="block text-sm mb-2">
                  Shift Time
                </label>
                <select
                  id="shiftTime"
                  name="shiftTime"
                  value={`${submitObject.startTime}-${submitObject.endTime}`}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Shift Time</option>
                  {shiftTimes.map((shiftTime) => (
                    <option key={shiftTime} value={shiftTime}>
                      {shiftTime}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Priority */}
            <div className="mb-4">
              <label htmlFor="priority" className="block text-sm mb-2">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={submitObject.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="1">1 - Low</option>
                <option value="2">2 - Medium</option>
                <option value="3">3 - High</option>
              </select>
            </div>
            {/* Type */}
            <div className="mb-4">
              <label className="block text-sm mb-2">Shift Type</label>
              <div>
                {/* ... Radio buttons ... */}
                <RadioButtonList
                  options={shiftType}
                  selectedOption={selectedOption}
                  onChange={handleRadioChange}
                />
              </div>
            </div>

            {/* Exchange */}
            <div className="mb-4">
              <label htmlFor="exchange" className="block text-sm mb-2">
                Exchange
              </label>
              <div className="mb-4">
                <label className="block text-sm mb-2">Select Date</label>
                <input
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  type="date"
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={(e) => handleDateChange(new Date(e.target.value))}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Select Start Time</label>
                <input
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  type="time"
                  value={startTime}
                  onChange={(e) => handleStartTimeChange(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Select End Time</label>
                <input
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  type="time"
                  value={endTime}
                  onChange={(e) => handleEndTimeChange(e.target.value)}
                />
              </div>

              <button
                type="button"
                onClick={handleAddExchange}
                className="bg-[#e0211a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#b41813]"
              >
                Add Exchange
              </button>

              <ul>
                {exchanges.map((exchange, index) => (
                  <li key={index}>
                    {`Date: ${exchange.date}, Start Time: ${exchange.startTime}, End Time: ${exchange.endTime}`}
                    <button
                      type="button"
                      onClick={() => handleRemoveExchange(index)}
                      className="text-red-500 ml-2"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Notes */}
            <div className="mb-4">
              <label htmlFor="note" className="block text-sm mb-2">
                Note
              </label>
              <textarea
                id="note"
                name="note"
                value={submitObject.note}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 overflow-y-auto"
                rows="4"
              ></textarea>
            </div>
            {/* Qualifications Required */}
            <div className="mb-4">
              <label className="block text-sm mb-2">
                Qualifications Required
              </label>
              <CheckboxList
                options={qualifications}
                selectedOptions={selectedOptions}
                onChange={handleCheckboxChange}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={submitObject.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={submitObject.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-[#e0211a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#b41813]"
            >
              Update Swap
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditSwap;
