import React, { useState, useEffect } from "react";
import "./weather.css";
const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    getWeatherData();
  }, [city]);

  const getWeatherData = async () => {
    try {
      if (city) {
        let data = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2d0e06fe679c0d5c46b5c5fd0f35921a`
        );
        data = await data.json();
        if (data) {
          setWeatherData(data);
        }
      } else {
        setWeatherData({});
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlecity = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <div className="box">
        <div className="city">
          <input
            type="search"
            value={city}
            placeholder="search city"
            className="cityField"
            onChange={(e) => handlecity(e)}
          />
        </div>
        {weatherData && Object.keys(weatherData).length ? (
          <div className="weatherInfo">
            <h2 className="location">{city}</h2>
            {weatherData?.main?.temp ? (
              <h1 className="temp">{weatherData?.main?.temp}°C</h1>
            ) : (
              ""
            )}
            {weatherData?.main ? (
              <h3 className="temp details">
                Min_temp: {weatherData?.main?.temp_min}°C and Max_temp:{" "}
                {weatherData?.main?.temp_max}°C
              </h3>
            ) : (
              ""
            )}
          </div>
        ) : (
          <p className="nodata">No data found</p>
        )}
      </div>
    </>
  );
};

export default Weather;
