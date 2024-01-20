import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const UserInput = ({ presetValue, callback, isLoadingImages }) => {
  const [queryInput, setQueryInput] = useState(presetValue);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search/${queryInput}`);
    if (callback) {
      callback(queryInput);
    }
  };

  return (
    <div className="flex gap-2 w-10/12 md:w-3/5">
      <input
        onChange={(e) => setQueryInput(e.target.value)}
        type="text"
        value={queryInput}
        placeholder="Search image"
        className="focus:border-none outline-none p-2 w-full rounded placeholder-gray-600 shadow-lg"
      />

      <button
        onClick={handleSearch}
        type="button"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded text-sm w-24 md:w-32 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        {!isLoadingImages && <span>Search</span>}
        {isLoadingImages && <LoadingSpinner />}
      </button>
    </div>
  );
};

export default UserInput;
