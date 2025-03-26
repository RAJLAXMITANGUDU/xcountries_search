// import React, { useState, useEffect } from 'react';
// import './App.css';

// function App() {
//   const [countries, setCountries] = useState([]);
//   const [filteredCountries, setFilteredCountries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetch('https://restcountries.com/v3.1/all')
//       .then((response) => response.json())
//       .then((data) => {
//         setCountries(data);
//         setFilteredCountries(data);
//       })
//       .catch((error) => console.error('Error fetching countries:', error));
//   }, []);

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
    
//     if (value === "") {
//       setFilteredCountries(countries);
//     } else {
//       const filtered = countries.filter(country =>
//         country.name.common.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredCountries(filtered);
//     }
//   };

//   return (
//     <div className="App">
//       <input
//         type="text"
//         placeholder="Search for a country"
//         value={searchTerm}
//         onChange={handleSearchChange}
//         className="searchBar"
//       />
//       <div className="country-grid">
//         {filteredCountries.length > 0 ? (
//           filteredCountries.map((country) => (
//             <div key={country.cca3} className="countryCard">
//               <img
//                 src={country.flags.png}
//                 alt={`${country.name.common} flag`}
//                 className="flag"
//               />
//               <p>{country.name.common}</p>
//             </div>
//           ))
//         ) : (
//           <p>No countries found</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
// import React, { useState, useEffect } from 'react';
// import './App.css';

// function App() {
//   const [countries, setCountries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Fetch countries data from API
//   // useEffect(() => {
//   //   // fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries')
//   //   async init = ()=>{
//   //     fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries')
//   //     .then((response) => response.json())
//   //     .then((data) => setCountries(data))
//   //     .catch((error) => console.error('Error fetching countries:', error));
//   //   } init()
//   //     // .then((response) => response.json())
//   //     // .then((data) => setCountries(data))
//   //     // .catch((error) => console.error('Error fetching countries:', error));
      
//   // }, []);
//   useEffect(() => {
//     const fetchCountries = async () => {
//         try {
//             const response = await fetch('https://countries-search-data-prod-812930491762.asia-south1.run.app/countries');
//             const data = await response.json();
//             setCountries(data);
//         } catch (error) {
//             console.error('Error fetching countries:', error);
//         }
//     };

//     fetchCountries();
// }, []);
//   // Filter countries based on search term
//   const filteredCountries = countries.filter((country) =>
//     country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className='App'>
//       {/* Search Bar */}
//       <input
//         type='text'
//         placeholder='Search for a country...'
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className='search-bar'
//       />

//       {/* Country Grid */}
//       <div className='country-grid'>
//         {filteredCountries.length > 0 ? (
//           filteredCountries.map((country, index) => (
//             <div className='countryCard' key={index}>
//               <img
//                 src={country.flags.png}
//                 alt={country.name.common + ' flag'}
//               />
//               <h2>{country.name.common}</h2>
//             </div>
//           ))
//         ) : (
//           <p>No countries found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
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