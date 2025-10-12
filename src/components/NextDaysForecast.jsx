import React, { useEffect, useState } from "react";
import ForecastItem from "./ForecastItem";

const API_KEY = "9616ef5c884710a781a0841757022167";
const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5";

export default function NextDaysForecast({ city }) {
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

        // Group data by day (API returns 3-hour intervals)
        const daily = {};
        data.list.forEach((item) => {
          const date = new Date(item.dt_txt).toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          });

          if (!daily[date]) {
            daily[date] = {
              min: item.main.temp_min,
              max: item.main.temp_max,
              condition: item.weather[0].main,
            };
          } else {
            daily[date].min = Math.min(daily[date].min, item.main.temp_min);
            daily[date].max = Math.max(daily[date].max, item.main.temp_max);
          }
        });

        // Take only next 5 days
        setForecast(Object.entries(daily).slice(0, 5));
      } catch (err) {
        setError(err.message);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  return (
    <div className="flex flex-col items-center w-full max-w-[400px] p-4 bg-black/30 backdrop-blur-md rounded-sm mt-4 md:mt-2">
      <h2 className="text-xl md:text-xl font-bold text-white mb-2 text-center">
        Next Days Forecast
      </h2>

      {loading && (
        <p className="text-gray-300 text-center py-2">Loading forecast...</p>
      )}
      {error && (
        <p className="text-red-400 text-center py-2">{error}</p>
      )}

      <div className="flex flex-col gap-2  w-full">
        {forecast.map(([date, day], idx) => (
          <ForecastItem
            key={idx}
            date={date}
            condition={day.condition}
            minTemp={Math.round(day.min)}
            maxTemp={Math.round(day.max)}
          />
        ))}
      </div>
    </div>
  );
}
