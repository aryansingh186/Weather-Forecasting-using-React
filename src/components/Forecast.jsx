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

        // Take next 10 slots
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
  }, [city]);

  const renderIcon = (icon) => {
    if (icon.includes("rain")) return <CloudRain size={28} />;
    if (icon.includes("cloud")) return <Cloud size={28} />;
    return <Sun size={28} />;
  };

  if (loading)
    return (
      <div className="text-gray-300 flex justify-center py-6">
        Loading forecast...
      </div>
    );

  if (error)
    return <div className="text-red-400 flex justify-center py-6">{error}</div>;

  return (
    <div>
      {/* Small screens: horizontal scroll, large screens: show max 6 cards */}
      <div className="flex gap-3 sm:gap-4 overflow-x-auto md:overflow-x-hidden scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent py-3 px-1">
        {forecast.map((item, index) => (
          <div
            key={index}
            className="
              flex flex-col items-center justify-center 
              bg-white/10 backdrop-blur-md rounded-md 
              sm:min-w-[130px] md:min-w-0 
              md:flex-1 md:max-w-[120px] p-3 sm:p-4 
              hover:bg-white/20 transition-all duration-200
            "
          >
            <span className="text-xs sm:text-sm text-white/90">{item.time}</span>
            <div className="my-2">{renderIcon(item.icon)}</div>
            <span className="text-sm sm:text-base font-medium">{item.temp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
