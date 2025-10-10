import React, { useState, useEffect } from "react";
import DateTime from "./components/DateTime";
import Forecast from "./components/Forecast";
import Input from "./components/Input";
import WeatherDegree from "./components/WeatherDegree";
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
    if (!city) return;
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
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundImage = () => {
    if (!weather) return "/images/rainy.jpg";
    switch (weather.condition) {
      case "clear":
        return "/images/winter.jpg";
      case "snow":
        return "/images/snowy.jpg";
      case "rain":
      case "drizzle":
        return "/images/rain.jpg";
      case "clouds":
        return "/images/misty.jpg";
      default:
        return "/images/rain.webp";
    }
  };

  // Set body background (blur)
  useEffect(() => {
    const image = getBackgroundImage();
    document.body.style.backgroundImage = `url(${image})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
   
    document.body.style.height = "100%";
    document.body.style.margin = "0";
  }, [weather]);

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      {/* Main container div (sharp, clear) */}
      <div
        className="relative w-[90%] h-[90vh] border-12 border-white/20 shadow-2xl
        bg-cover bg-center bg-no-repeat rounded-2xl
        grid grid-cols-[75%_25%] text-white z-10 "
        style={{ backgroundImage: `url(${getBackgroundImage()})` }}
      >
        {/* Left side */}
        <div className="p-6 flex flex-col rounded-l-2xl ">
          <div className="flex justify-end text-xl font-medium text-white/85 bg-clip-text ">
            <DateTime />
          </div>

          <div className="flex justify-end items-end mb-12 flex-1">
            <h1 className="text-8xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-white/30 to-white/75">
              {weather ? weather.condition : "Search City"}
            </h1>
          </div>

          <div className="border-b-2 border-white/30"></div>

          <div>
            <Forecast key={weather?.name || city} city={weather?.name || city} />
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col p-6 backdrop-blur-sm border-l-2 border-white/20 rounded-r-2xl">
          <Input city={city} setCity={setCity} fetchWeather={fetchWeather} />

          <div className="flex items-center justify-center mt-6">
            <WeatherDegree weather={weather} loading={loading} error={error} />
          </div>

          <div className="flex items-center justify-center w-full max-w-[500px] mx-auto p-2 mt-14">
            <NextDaysForecast key={weather?.name || city} city={weather?.name || city} />
          </div>
        </div>
      </div>
    </div>
  );
}
