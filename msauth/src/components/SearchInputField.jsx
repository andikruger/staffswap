import React, { useState } from "react";
import searchCriteria from "../data/searchCriteria.json";
import qualificationData from "../data/qualifications.json";
import shiftTypeData from "../data/shifttypes.json";

const SearchInputField = ({ type }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchFields, setSearchFields] = useState([{ type: type, value: "" }]);
  const handleInputChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...searchFields];
    list[i][name] = value;
    setSearchFields(list);
  };

  const shiftType = shiftTypeData.shiftTypes;
  const qualifications = qualificationData.qualifications;
  const handleCheckboxChange = (label) => {
    const updatedOptions = selectedOptions.includes(label)
      ? selectedOptions.filter((option) => option !== label)
      : [...selectedOptions, label];

    setSelectedOptions(updatedOptions);
  };
  const handleRadioChange = (label) => {
    setSelectedOption(label);
  };
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
      <button
        className="radio-button"
        style={buttonStyle}
        onClick={handleClick}
      >
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

  switch (type) {
    case "text":
      return (
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          id="field"
          type="text"
          required
          placeholder="Enter search value"
          name="value"
          onChange={(e) => handleInputChange(e, i)}
        />
      );
    case "date":
      return (
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          id="field"
          type="date"
          required
          placeholder="Enter search value"
          name="value"
          onChange={(e) => handleInputChange(e, i)}
        />
      );
    case "time":
      return (
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          id="field"
          type="time"
          required
          placeholder="Enter search value"
          name="value"
          onChange={(e) => handleInputChange(e, i)}
        />
      );
    case "select":
      return (
        <select
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          id="field"
          name="value"
          onChange={(e) => handleInputChange(e, i)}
        >
          <option value="1">1 - Low</option>
          <option value="2">2 - Medium</option>
          <option value="3">3 - High</option>
        </select>
      );

    case "shiftType":
      return (
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
      );
    case "qualifications":
      return (
        <div className="mb-4">
          <label className="block text-sm mb-2">Qualifications Required</label>
          <CheckboxList
            options={qualifications}
            selectedOptions={selectedOptions}
            onChange={handleCheckboxChange}
          />
        </div>
      );
    default:
      return <div>Please select a field</div>;
  }
};

export default SearchInputField;
