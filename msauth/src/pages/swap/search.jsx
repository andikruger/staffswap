import React, { useState, useMemo, useCallback, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SearchInputField from "../../components/SearchInputField";

import "../../index.css";
import searchCriteria from "../../data/searchCriteria.json";

const SearchSwap = React.memo(() => {
  const [searchValues, setSearchValues] = useState([{ field: "", value: "" }]);
  const [selectedTypes, setSelectedTypes] = useState(
    Array(searchValues.length).fill("")
  );
  const [selectedName, setSelectedName] = useState("");

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

      const selectedName = searchCriteria.find(
        (item) => item.value === value
      )?.displayName;
      setSelectedName(selectedName);
    },
    [searchValues, selectedTypes, selectedName, searchCriteria]
  );

  const handleAddClick = useCallback(() => {
    setSearchValues([...searchValues, { field: "", value: "" }]);
  }, [searchValues]);

  const handleRemoveClick = useCallback(
    (index) => {
      const list = [...searchValues];
      list.splice(index, 1);
      setSearchValues(list);
    },
    [searchValues]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      // Retrieve data from sessionStorage
      const formData = {
        globalJoin: document.getElementById("join").value,
        searchCriteria: searchValues.map((searchValue, index) => {
          const selectedType = selectedTypes[index];

          return {
            field: searchValue.field,
            value: sessionStorage.getItem(`value_${index}`) || "",
            type: selectedType,
          };
        }),
      };

      // if there is a an element in the array "field": "shiftType" make its value that what is in the sessionStorage search_shiftType

      if (formData.searchCriteria.some((item) => item.field === "shiftType")) {
        formData.searchCriteria.find(
          (item) => item.field === "shiftType"
        ).value = sessionStorage.getItem("search_shiftType");
      }

      // if there is a an element in the array "field": "qualifications" make its value that what is in the sessionStorage search_qualifications

      if (
        formData.searchCriteria.some((item) => item.field === "qualifications")
      ) {
        // split the string into an array split by the comma
        const qualifications = sessionStorage.getItem("search_qualifications");

        formData.searchCriteria.find(
          (item) => item.field === "qualifications"
        ).value = qualifications;
      }

      // if there is a an element in the array "field": "threeLetterCode" make its value uppercase

      if (
        formData.searchCriteria.some((item) => item.field === "threeLetterCode")
      ) {
        formData.searchCriteria
          .find((item) => item.field === "threeLetterCode")
          .value.toUpperCase();
      }

      let searchQuery = encodeURIComponent(btoa(JSON.stringify(formData)));

      // Redirect to the search results page
      window.location.href = `/swap/result/${searchQuery}`;

      // Log the form data to the console
      console.log("Form Data:", formData);
      console.log(JSON.stringify(formData));

      // Clear sessionStorage
      sessionStorage.clear();
    },
    [searchValues, selectedTypes]
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
                      <SearchInputField type={selectedTypes[i]} index={i} />
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
