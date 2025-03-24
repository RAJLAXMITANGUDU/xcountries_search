import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        setError("Failed to fetch countries. Please try again later.");
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredCountries(countries);
    } else {
      const results = countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(results);
    }
  }, [searchTerm, countries]);

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
        aria-label="search-countries"
      />
      {loading ? (
        <p className="loading">Loading countries...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="country-grid">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div className="countryCard" key={country.code}>
                <img
                  src={country.flag}
                  alt={`Flag of ${country.name}`}
                  className="flag"
                />
                <p className="country-name">{country.name}</p>
              </div>
            ))
          ) : (
            <p className="no-results">No countries found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
