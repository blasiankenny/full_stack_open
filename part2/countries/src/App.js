import "./App.css";
import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [filteredList, setFilteredList] = useState(countriesData);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountriesData(data);
        setFilteredList(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFilterValue = (event) => {
    const inputValue = event.target.value.toLowerCase(); // Convert input value to lowercase

    if (inputValue === "") {
      setFilteredList(countriesData);
    } else {
      setFilteredList(
        countriesData.filter((country) => {
          const countryName = country?.name?.common.toLowerCase(); // Convert country name to lowercase
          return countryName.includes(inputValue);
        })
      );
    }
  };

  const handleClick = (country) => {
    setFilteredList([country]);
  };

  return (
    <div className="">
      <Filter handleFilterValue={handleFilterValue} />
      <Countries countries={filteredList} handleClick={handleClick} />
    </div>
  );
}

export default App;
