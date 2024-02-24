import { React, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import sha256 from "crypto-js/sha256";
import "../index.css";
import roleData from "../data/roles.json";
import { useMsal } from "@azure/msal-react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const roles = roleData.roles;

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
const Profile = () => {
  const navigate = useNavigate();

  const [threeLetterCode, setThreeLetterCode] = useState("");
  const [user, setUser] = useState(null);
  const [userExists, setUserExists] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { accounts } = useMsal();

  // get the user data from the database

  useEffect(() => {
    let uuid = sha256(accounts[0].username).toString();
    axios.get(`http://localhost:8000/user/username/${uuid}`).then((res) => {
      let data = res.data.data;

      setThreeLetterCode(data.threeLetterCode);
      setSelectedOption(data.role);
      setUser(data);
      setUserExists(true);
    });
    localStorage.clear();
  }, []);

  const handleRadioChange = (label) => {
    setSelectedOption(label);
  };

  // if newUser is false, then we are updating the user
  // create a function to handle the input change and save it to submitObject
  const handleInputChange = (event) => {
    const { value } = event.target;
    setThreeLetterCode(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let userID = sha256(accounts[0].username).toString();
      let name = accounts[0].name;

      let submitObject = {
        name: name,
        threeLetterCode: threeLetterCode,
        role: selectedOption,
        userID: userID,
      };

      if (!userExists) {
        console.log("new user");
        axios
          .post("http://localhost:8000/user/register", submitObject)
          .then((res) => {
            toast.success("Profile updated successfully");
            sessionStorage.role = selectedOption;
          })
          .catch((err) => {
            console.log("err", err);
            toast.error("Profile update failed");
          });
      } else {
        // remove the threeLetterCode from the submitObject if it is the same as the user's threeLetterCode;
        if (submitObject.threeLetterCode === user.threeLetterCode) {
          delete submitObject.threeLetterCode;
        }
        axios
          .put(`http://localhost:8000/user/update/${user._id}`, submitObject)
          .then((res) => {
            toast.success("Profile updated successfully");
            sessionStorage.role = selectedOption;
          })
          .catch((err) => {
            console.log("err", err);
            toast.error("Profile update failed");
          });
      }
    } catch (error) {
      console.log(error);
      toast.error("Profile update did not work");
    }
  };

  return (
    <>
      <Helmet>
        <title>StaffSwap | Profile</title>
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
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Profile
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm mb-2 text-center">
                Name
              </label>
              <input
                type="text"
                id="text"
                name="name"
                value={accounts[0].name}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-center"
              />
            </div>

            {/* ThreeLetterCode */}
            <div className="mb-4">
              <label
                htmlFor="threeLetterCode"
                className="block text-sm mb-2 text-center"
              >
                Three Letter code
              </label>
              <input
                type="text"
                id="threeLetterCode"
                name="threeLetterCode"
                onChange={handleInputChange}
                maxLength={4} // Set maximum length to 4
                value={threeLetterCode.toUpperCase()}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-center"
              />
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="block text-sm mb-2 text-center">Role</label>
              <div className="flex justify-center items-center">
                {/* ... Radio buttons ... */}
                <div className="flex justify-center">
                  <RadioButtonList
                    options={roles}
                    selectedOption={selectedOption}
                    onChange={handleRadioChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-[#e0211a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#b41813] justify-center mt-4"
              >
                Update Profile
              </button>
            </div>
          </form>
          <div className="mt-4 flex justify-center items-center">
            <button
              onClick={() => navigate("/swap/my")} // Use navigate to redirect to "/my"
              className="bg-[#e0211a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#b41813] mt-4"
            >
              Go to My Swaps
            </button>
          </div>
          <div className="mt-4 flex justify-center items-center">
            <p className="text-sm text-gray-500">
              <strong>Note:</strong> You can only swap with other users with the
              same role as you.
            </p>
          </div>

          {/* Add a chat button navigate to /chat */}
          <div className="mt-4 flex justify-center items-center">
            <button
              onClick={() => navigate("/chat")} // Use navigate to redirect to "/chat"
              className="bg-[#e0211a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#b41813] mt-4"
            >
              Go to Chat
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
