import React, { useState, useEffect } from "react";

const Search = ({ history }) => {
  const SelectData = [
    {
      af: "Projeknaam",
      de: "Projektname",
      en: "Project name",
      value: "projectName",
    },
    {
      af: "Projeknommer",
      de: "Projektnumber",
      en: "Project Number",
      value: "projectNumber",
    },
    {
      af: "Model",
      de: "Modell",
      en: "Model",
      value: "model",
    },
    {
      af: "Veranderingsrede",
      de: "Änderungsgrund",
      en: "Change State",
      value: "changeState",
    },
    {
      af: "Geskep deur",
      de: "Erstellt durch",
      en: "Created By",
      value: "createdByName",
    },
    {
      af: "Eienaar",
      de: "Leiter",
      en: "Owner",
      value: "owner",
    },
    {
      af: "Moeite",
      de: "Aufwand",
      en: "Effort",
      value: "effort",
    },
    {
      af: "Funksie",
      de: "Funktion",
      en: "Function",
      value: "function",
    },
    {
      af: "Mislukkingsmodus",
      de: "Ausfallmodus",
      en: "Failue Mode",
      value: "failureMode",
    },
    {
      af: "Mislukkingseffect",
      de: "Ausfalleffekt",
      en: "Failure Effect",
      value: "failureEffect",
    },
    {
      af: "Oorsaak",
      de: "Ursache",
      en: "Cause",
      value: "cause",
    },
    {
      af: "Huidige beheer",
      de: "Aktuelle Maßnahmen",
      en: "Current Control",
      value: "currentControl",
    },
    {
      af: "Verbeeterings gemaak",
      de: "Vorgenommene Verbesserungen",
      en: "Improvments Made",
      value: "improvementsMade",
    },
    {
      af: "Datum",
      de: "Datum",
      en: "Date",
      value: "createdAt",
    },
  ];

  const [searchParams, setSearchParams] = useState([]);
  const [functions, setfunctions] = useState([{ field: "", value: "" }]);
  const [join, setJoin] = useState("and");
  const [admin, setAdmin] = useState(false);
  const [language, setLanguage] = useState([]);

  // set the language

  // deal with the change of global join
  const handleJoinChange = (text) => (e) => {
    setJoin(e.target.value);
  };

  // when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchParams);
    let search_string = encodeURIComponent(btoa(JSON.stringify(searchParams)));
    history.push(`/result/${search_string}`);
  };

  // handle if the input is changed
  const handleInputChange = (e, index) => {
    let search_params = {};
    const { name, value } = e.target;
    const list = [...functions];

    list[index][name] = value;
    search_params.join = join;
    search_params.admin = admin;
    search_params.criteria = list;
    setfunctions(list);
    setSearchParams(search_params);
  };

  // handle add a search criteria
  const handleAddClick = () => {
    setfunctions([...functions, { field: "", value: "" }]);
  };

  // handle remove a search criteria
  const handleRemoveClick = (index) => {
    const list = [...functions];
    list.splice(index, 1);
    let search_params = {};
    search_params.join = join;
    if (!search_params.admin) {
      search_params.admin = false;
    } else {
      search_params.admin = admin;
    }
    search_params.criteria = list;
    setfunctions(list);
    setSearchParams(search_params);
  };

  return (
    <>
      <div className="relative BackgroundImage md:ml-64 bg-gray-100">
        {/* Header */}
        <div className="relative  md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full"></div>
        </div>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {/* Outer box  */}
          <div className="flex flex-wrap mt-4">
            <div className="w-full  mb-12 xl:mb-0 px-4">
              <div className="relative overflow-auto h-5/6 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-base text-black-700 flex justify-center">
                        Search FMEA
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="block w-full overflow-x-auto">
                  {/* search form */}
                  <div className="py-10 flex justify-center">
                    <form className="w-11/12 max-w-lg" onSubmit={handleSubmit}>
                      <div className="w-full px-3">
                        <div></div>
                        {/* Global join */}

                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Global Join
                          <i className="fas fa-question-circle"></i>
                        </label>

                        <select
                          name="join"
                          id="join"
                          onChange={handleJoinChange("join")}
                          className="shadow-lg appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        >
                          <option value="and">AND</option>
                          <option value="or">OR</option>
                        </select>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6"></div>
                      {/* display search criterias */}
                      {functions.map((x, i) => {
                        return (
                          <div className="box" key={i}>
                            <div className="flex flex-wrap -mx-3 mb-2">
                              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                  htmlFor="field"
                                >
                                  Search Field
                                </label>
                                <select
                                  name="field"
                                  id="field"
                                  onChange={(e) => handleInputChange(e, i)}
                                  className="shadow-lg appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                >
                                  <option>
                                    Select the field you want to search in
                                  </option>
                                  {SelectData.map((item, index) => {
                                    return (
                                      <option key={index} value={item.value}>
                                        {item["en"]}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>

                              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                  htmlFor="field"
                                >
                                  Search Value
                                </label>
                                <input
                                  className="shadow-lg appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                  id="field"
                                  type="text"
                                  required
                                  placeholder="Search value"
                                  name="value"
                                  value={x.value}
                                  onChange={(e) => handleInputChange(e, i)}
                                />
                              </div>
                            </div>

                            {/* Add/remove search criterias */}
                            <div className="btn-box">
                              {functions.length - 1 === i && (
                                <button onClick={handleAddClick}>
                                  Add Search Criteria
                                </button>
                              )}
                              <br />
                              {functions.length !== 1 && (
                                <button
                                  className="mr10"
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

                      <button
                        type="submit"
                        className="rounded-lg shadow-md lg:shadow-lg w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
                      >
                        <i className="fas fa-clipboard-list fa 1x w-6  -ml-2" />
                        <span className="ml-3">Submit</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
