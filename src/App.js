
import React, { useEffect, useState } from "react";
import Country from "./Country";
import "./App.css";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");
  const fetchData = async () => {
    try {
      const res = await fetch(
        " https://countries-search-data-prod-812920491762.asia-south1.run.app/countries ",
        {
          mode: "cors",
        }
      );
      console.log(res);
      const data = await res.json();
      console.log(data);
      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let data1;
    if (search === "") data1 = countries;
    else
      data1 = countries.filter((d) =>
        d.common.toLowerCase().includes(search.toLowerCase())
      );
    setFilteredCountries(data1);
  }, [search, countries]);
  return (
    <div className="main">
      <input
        type="text"
        placeholder="Search for countries"
        value={search}
        className="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="container">
        {filteredCountries?.map((country) => (
          <Country
            key={country.common}
            name={country.common}
            flag={country.png}
          />
        ))}
      </div>
    </div>
  );
};

export default App;