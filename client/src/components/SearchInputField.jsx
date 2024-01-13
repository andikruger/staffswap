import React, { useState, useCallback } from "react";
import searchCriteria from "../data/searchCriteria.json";
import qualificationData from "../data/qualifications.json";
import shiftTypeData from "../data/shifttypes.json";

const SearchInputField = ({ type, index }) => {
  const [selectedQualification, setSelectedQualification] = useState(null);
  const [selectedShiftType, setSelectedShiftType] = useState(null);
  const [searchValues, setSearchValues] = useState([{ type: type, value: "" }]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setSearchValues({ ...searchValues, [name]: value });

      // Store the individual value in localStorage
      localStorage.setItem(`${name}_${index}`, value);
    },
    [searchValues, index]
  );

  const shiftType = shiftTypeData.shiftTypes;
  const qualifications = qualificationData.qualifications;
  const handleQualificationChange = (label) => {
    setSelectedQualification(label);

    // Store the selected option in localStorage
    localStorage.setItem(`search_qualifications`, label);
  };

  const handleShiftTypeChange = (label) => {
    setSelectedShiftType(label);

    // Store the selected option in localStorage
    localStorage.setItem(`search_shiftType`, label);
  };
  const QualificationButton = ({ label, isChecked, onChange }) => {
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

  const QualificationList = ({ options, selectedOptions, onChange }) => {
    return (
      <div className="checkbox-list">
        {options.map((option) => (
          <QualificationButton
            key={option}
            label={option}
            isChecked={selectedQualification === option}
            onChange={onChange}
          />
        ))}
      </div>
    );
  };

  const ShiftType = ({ label, isSelected, onChange }) => {
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

  const ShiftTypeList = ({ options, selectedShiftType, onChange }) => {
    return (
      <div className="radio-button-list">
        {options.map((option) => (
          <ShiftType
            key={option}
            label={option}
            isSelected={selectedShiftType === option}
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
          onChange={(e) => handleInputChange(e, index)}
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
          onChange={(e) => handleInputChange(e, index)}
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
          onChange={(e) => handleInputChange(e, index)}
        />
      );
    case "select":
      return (
        <select
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          id="field"
          name="value"
          onChange={(e) => handleInputChange(e, index)}
        >
          <option value="">Select a priority</option>
          <option value="1">1 - Low</option>
          <option value="2">2 - Medium</option>
          <option value="3">3 - High</option>
        </select>
      );

    case "shiftType":
      return (
        <div className="mb-4">
          <label className="block text-sm mb-2">Shift Wish</label>
          <div>
            {/* ... Radio buttons ... */}
            <ShiftTypeList
              options={shiftType}
              selectedShiftType={selectedShiftType}
              onChange={handleShiftTypeChange}
            />
          </div>
        </div>
      );
    case "qualifications":
      return (
        <div className="mb-4">
          <label className="block text-sm mb-2">Qualifications Required</label>
          <QualificationList
            options={qualifications}
            selectedQualification={selectedQualification}
            onChange={handleQualificationChange}
          />
        </div>
      );
    default:
      return <div>Please select a field</div>;
  }
};

export default SearchInputField;
