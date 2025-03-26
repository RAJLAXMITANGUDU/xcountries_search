import React from "react";
import "./Country.css";
const Country = ({ name, flag }) => {
  return (
    <div className="countryCard">
      <img src={flag} alt={name} className="flag" />
      <h2 className="name">{name}</h2>
    </div>
  );
};

export default Country;