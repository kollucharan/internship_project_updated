import { useState } from "react";
import './searchbar.css'

export default function Searchbar({ setSubmittedValue }) {
  const [searchTerm, setSearchTerm] = useState(""); // Holds the input value

  function handleInputChange(e) {
    setSearchTerm(e.target.value);
  }

  function handlebuttonclick() {
    setSubmittedValue(searchTerm);
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by product name"
        onChange={handleInputChange}
        className="search-input"
      />
      <button
        onClick={() => {
          handlebuttonclick();
        }}
        className="search-button"
      >
        Search
      </button>
    </div>
  );
}
