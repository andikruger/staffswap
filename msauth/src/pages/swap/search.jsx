import React, { useState, useMemo, useCallback, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SearchInputField from "../../components/SearchInputField";
import axios from "axios";
import "../../index.css";
import qualificationData from "../../data/qualifications.json";
import shiftTypeData from "../../data/shifttypes.json";
import searchCriteria from "../../data/searchCriteria.json";
import shiftTimesData from "../../data/shifttimes.json";
import { toast } from "react-toastify";

const getType = (input) => {
  //find the name of the type in the searchCriteria.json file and return the type
  const type = searchCriteria.find((item) => item.displayName === input);
  return type.type;
};

const shiftType = shiftTypeData.shiftTypes;
const qualifications = qualificationData.qualifications;

const SearchSwap = React.memo(() => {
  const [searchValues, setSearchValues] = useState([{ field: "", value: "" }]);
  const [selectedTypes, setSelectedTypes] = useState(
    Array(searchValues.length).fill("")
  );

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    console.log("SearchSwap rendered");
  }, [searchValues, selectedOption, selectedOptions]);
  const CheckboxButton = useMemo(
    () =>
      ({ label, isChecked, onChange }) => {
        const buttonStyle = {
          backgroundColor: isChecked ? "#e0211a" : "transparent",
          borderRadius: "20px",
          padding: "10px 20px",
          margin: "8px",
          color: isChecked ? "white" : "black",
          border: isChecked ? "none" : "1px solid #ccc",
        };

        const handleClick = (event) => {
          event.preventDefault();
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
      },
    []
  );

  const CheckboxList = useMemo(
    () =>
      ({ options, selectedOptions, onChange }) => {
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
      },
    [CheckboxButton]
  );

  const RadioButton = useMemo(
    () =>
      ({ label, isSelected, onChange }) => {
        const buttonStyle = {
          backgroundColor: isSelected ? "#e0211a" : "transparent",
          borderRadius: "20px",
          padding: "10px 20px",
          margin: "8px",
          color: isSelected ? "white" : "black",
          border: isSelected ? "none" : "1px solid #ccc",
        };
        const handleClick = (event) => {
          event.preventDefault();
          onChange(label);
        };
        return (
          <button
            className="radio-button"
            style={buttonStyle}
            onClick={handleClick}
          >
            {label}
          </button>
        );
      },
    []
  );

  const RadioButtonList = useMemo(
    () =>
      ({ options, selectedOption, onChange }) => {
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
      },
    [RadioButton]
  );

  const handleCheckboxChange = useCallback(
    (label) => {
      const updatedOptions = selectedOptions.includes(label)
        ? selectedOptions.filter((option) => option !== label)
        : [...selectedOptions, label];
      setSelectedOptions(updatedOptions);
    },
    [selectedOptions]
  );

  const handleRadioChange = useCallback((label) => {
    setSelectedOption(label);
  }, []);

  const handleInputChange = useCallback(
    (e, index) => {
      const { name, value } = e.target;
      const list = [...searchValues];
      list[index][name] = value;
      setSearchValues(list);

      // Set the selectedType based on the selected object's type
      const selectedType =
        searchCriteria.find((item) => item.value === value)?.type || "";
      const types = [...selectedTypes];
      types[index] = selectedType;
      setSelectedTypes(types);
    },
    [searchValues, selectedTypes, searchCriteria]
  );

  const handleAddClick = useCallback(() => {
    setSearchValues([...searchValues, { field: "", value: "" }]);
  }, [searchValues]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    // Add your form submission logic here
  }, []);

  const handleRemoveClick = useCallback(
    (index) => {
      const list = [...searchValues];
      list.splice(index, 1);
      setSearchValues(list);
    },
    [searchValues]
  );
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
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Search Swaps
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Add your form fields here */}

            {/* Global Join */}
            <div className="mb-4">
              <label htmlFor="join" className="block text-sm mb-2">
                Global Join
              </label>
              <select
                id="join"
                name="join"
                //onChange={handleSearchInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="and">AND</option>
                <option value="or">OR</option>
              </select>
            </div>

            {/* START */}
            {searchValues.map((x, i) => {
              return (
                <div className="box" key={i}>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full  px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="field"
                      >
                        Field
                      </label>
                      <select
                        name="field"
                        id="field"
                        onChange={(e) => handleInputChange(e, i)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      >
                        <option>Enter the field you want to search in</option>
                        {searchCriteria.map((item, index) => {
                          return (
                            <option key={index} value={item.value}>
                              {item.displayName}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="w-full  px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="field"
                      >
                        Search Value
                      </label>

                      {/* Pass the selectedType to the SearchInputField */}
                      <SearchInputField type={selectedTypes[i]} />
                    </div>
                  </div>

                  {/* Add/remove search criterias */}
                  <div className="btn-box">
                    {searchValues.length - 1 === i && (
                      <button
                        className="bg-[#e0211a] text-white rounded-full px-3 py-1 text-sm font-semibold m-1 hover:bg-[#b41813]"
                        onClick={handleAddClick}
                      >
                        Add Search Criteria
                      </button>
                    )}
                    <br />
                    {searchValues.length !== 1 && (
                      <button
                        className="bg-[#e0211a] text-white rounded-full px-3 py-1 text-sm font-semibold m-1 hover:bg-[#b41813]"
                        onClick={() => handleRemoveClick(i)}
                      >
                        Remove Search Criteria
                      </button>
                    )}
                    <br />
                  </div>
                </div>
              );
            })}

            {/* END */}

            {/* Type */}
            {/* <div className="mb-4">
              <label className="block text-sm mb-2">Shift Type</label>
              <div>
                
                <RadioButtonList
                  options={shiftType}
                  selectedOption={selectedOption}
                  onChange={handleRadioChange}
                />
              </div>
            </div> */}

            {/* Exchange */}
            {/* <div className="mb-4">
              <label htmlFor="exchange" className="block text-sm mb-2">
                Exchange
              </label>
              <div className="mb-4">
                <label className="block text-sm mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={(e) => handleDateChange(new Date(e.target.value))}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Select Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => handleStartTimeChange(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Select End Time</label>
                <input
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
            </div> */}
            {/* Notes */}

            {/* Qualifications Required */}
            {/* <div className="mb-4">
              <label className="block text-sm mb-2">
                Qualifications Required
              </label>
              <CheckboxList
                options={qualifications}
                selectedOptions={selectedOptions}
                onChange={handleCheckboxChange}
              />
            </div> */}

            <button
              type="submit"
              className="bg-[#e0211a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#b41813]"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
});

export default SearchSwap;
