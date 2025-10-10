import React, { useState, useEffect } from "react";
import WeatherDegree from "./components/WeatherDegree";
import Input from "./components/Input";

const API_KEY = "9616ef5c884710a781a0841757022167";
const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5";

export default function App() {
  const [city, setCity] = useState("Patna");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Helper to convert degree → compass direction
  const getWindDirection = (deg) => {
    const directions = [
      "North",
      "Northeast",
      "East",
      "Southeast",
      "South",
      "Southwest",
      "West",
      "Northwest",
    ];
    return directions[Math.round(deg / 45) % 8];
  };

  // ✅ Fetch weather data from OpenWeatherMap
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
        windSpeed: data.wind.speed.toFixed(2),
        windDir: getWindDirection(data.wind.deg),
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(); // fetch initial weather
  }, []);

  return (
    <div>
      <Input city={city} setCity={setCity} fetchWeather={fetchWeather} />
      <WeatherDegree weather={weather} loading={loading} error={error} />
    </div>
  );
}
