import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../index.css";
import { toast } from "react-toastify";
const NewSwap = () => {
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    console.log(value);
    toast.success("Swap Submitted Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  return (
    <>
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
          <h2 className="text-2xl font-bold mb-4 text-gray-800">New Swap</h2>
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
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
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
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
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
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              </div>
            </div>
            {/* Type */}
            <div className="mb-4">
              <label className="block text-sm mb-2">Type</label>
              <div>{/* ... Radio buttons ... */}</div>
            </div>

            {/* Exchange */}
            <div className="mb-4">
              <label htmlFor="exchange" className="block text-sm mb-2">
                Exchange
              </label>
              <input
                type="text"
                id="exchange"
                name="exchange"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Notes */}
            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm mb-2">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 overflow-y-auto"
                rows="4"
              ></textarea>
            </div>
            {/* Qualifications Required */}
            <div className="mb-4">
              <label className="block text-sm mb-2">
                Qualifications Required
              </label>
              <div>{/* ... Checkboxes ... */}</div>
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
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-[#e0211a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#b41813]"
            >
              Submit Swap
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default NewSwap;
