import React, { useEffect, useState } from "react";
import { CloudRain, Cloud, Sun } from "lucide-react";

const API_KEY = "9616ef5c884710a781a0841757022167";
const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5";

export default function Forecast({ city }) {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    const fetchForecast = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${WEATHER_API_BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) throw new Error("Forecast not available");
        const data = await response.json();

        // Filter next 10 time slots (3-hourly data)
        const sliced = data.list.slice(0, 10).map((item) => ({
          time: new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          temp: `${Math.round(item.main.temp)}°C`,
          icon: item.weather[0].main.toLowerCase(),
        }));

        setForecast(sliced);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]); // 

  // Function to render correct icon
  const renderIcon = (icon) => {
    if (icon.includes("rain")) return <CloudRain size={32} />;
    if (icon.includes("cloud")) return <Cloud size={32} />;
    return <Sun size={32} />;
  };

  if (loading)
    return (
      <div className="text-gray-400 flex justify-center py-6">
        Loading forecast...
      </div>
    );

  if (error)
    return (
      <div className="text-red-400 flex justify-center py-6">{error}</div>
    );

  return (
    <div className="flex justify-around ">
      {forecast.map((item, index) => (
        <div
          key={index}
          className="bg-black/20 backdrop-blur-sm p-2   rounded-md px-2 py-4 flex flex-col items-center text-white min-w-[100px] h-[160px] gap-4  my-6"
        >
          <span className="text-sm underline underline-offset-8 decoration-white/25 text-white ">{item.time}</span>
          <div className="py-2 px-2 rounded-md bg-white/10">{renderIcon(item.icon)}</div>
          <span className="text-lg font-bold">{item.temp}</span>
        </div>
      ))}
    </div>
  );
}
