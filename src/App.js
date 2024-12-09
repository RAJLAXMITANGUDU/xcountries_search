import React,{useState,useEffect} from "react";
import "./App.css";
 const App=()=>{
  const [countries,setCountries]=useState([]);
  const [searchTerm,setSearchTerm]=useState("");
  const [filteredCountries,setFilteredCountries]=useState([]);
   useEffect(()=>{
    const fetchCountries=async()=>{
      try{
        const response=await fetch("https://restcountries.com/v3.1/all");
        if(!response.ok){
          throw new Error(`HTTP error! status:${response.status}`);
        }
        const data=await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error fetching countries:",error);
      }
    };
    fetchCountries();
   }, []);
   useEffect(()=>{
    const results=countries.filter((country)=>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredCountries(results);
   }, [searchTerm,countries]);

  return(
    <div className="app">
      <input
       type="text"
       placeholder="Search for a country..."
       value={searchTerm}
       onChange={(e)=>setSearchTerm(e.target.value)}
       className="search-bar"
      />
      <div className="country-grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country)=>(
            <div className="countryCard" key={country.cca3}>
              <img  
                src={country.flags.png}
                alt={`Flag of${country.name.common}`}
                className="flag"
              />
              <p className="country-name">{country.name.common}</p>
            </div>
          ))
        ):(
          <p className="no-results" >No countries found</p>
        )}
      </div>
    </div>
  );
 };

 export default App;