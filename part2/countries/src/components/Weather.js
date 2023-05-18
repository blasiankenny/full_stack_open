import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const api_key = process.env.REACT_APP_API_KEY;
  console.log(api_key);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [city, api_key]);
  return (
    <div>
      {weatherData && (
        <div>
          <p>temperature: {weatherData.main.temp} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt=""
          />
          <p>wind {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
