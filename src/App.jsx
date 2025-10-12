import React, { useState, useEffect } from "react";
import DateTime from "./components/DateTime";
import Forecast from "./components/Forecast";
import SearchBox from "./components/input.jsx";
import WeatherDegree from "./components/WeatherDegree.jsx";
import NextDaysForecast from "./components/NextDaysForecast";
import "./App.css";

const API_KEY = "9616ef5c884710a781a0841757022167";
const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5";

export default function App() {
  const [city, setCity] = useState("Patna");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${WEATHER_API_BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather({
        name: data.name,
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main.toLowerCase(),
        windSpeed: Math.round(data.wind?.speed ?? 0),
        windDir: getWindDirection(data.wind?.deg ?? 0),
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getWindDirection = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  const getBackgroundImage = () => {
    if (!weather) return "/images/default.jpg";
    switch (weather.condition) {
      case "clear":
        return "/images/clear-sky.jpg";
      case "snow":
        return "/images/snowy.jpg";
      case "rain":
      case "drizzle":
        return "/images/rainy.jpg";
      case "clouds":
        return "/images/cloudy.jpg";
      case "mist":
      case "fog":
        return "/images/misty.jpg";
      default:
        return "/images/default.jpg";
    }
  };

  const bgImage = getBackgroundImage();

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/40 p-4">
      {/* Main Container (100vh fixed height, responsive) */}
      <div
        className="w-full max-w-7xl h-[100vh] md:h-[90vh] rounded-2xl shadow-2xl overflow-hidden 
        grid grid-cols-1 md:grid-cols-[65%_35%] text-white transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.35)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* LEFT PANEL */}
        <div className="flex flex-col justify-between p-6 sm:p-8 overflow-hidden">
          {/* Date and Time */}
          <div className="flex justify-end text-base sm:text-lg font-medium text-white/90">
            <DateTime />
          </div>

          {/* Weather Condition */}
          <div className="flex justify-end items-end flex-1 mb-8 sm:mb-10">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-white/50 to-white capitalize tracking-tight">
              {weather ? weather.condition : "Search your city"}
            </h1>
          </div>

          <div className="border-b border-white/30 my-4"></div>

          {/* Forecast */}
          <div className="overflow-auto">
            <Forecast key={weather?.name || city} city={weather?.name || city} />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col justify-start p-6 sm:p-8 backdrop-blur-md border-t md:border-t-0 md:border-l border-white/20 rounded-b-2xl md:rounded-r-2xl overflow-hidden">
          <SearchBox city={city} setCity={setCity} fetchWeather={fetchWeather} />

          <div className="flex justify-center mt-6">
            <WeatherDegree weather={weather} loading={loading} error={error} />
          </div>

          <div className="flex-1 overflow-auto mt-8 sm:mt-12">
            <NextDaysForecast key={weather?.name || city} city={weather?.name || city} />
          </div>
        </div>
      </div>
    </div>
  );
}
