import React from "react";
import { Wind } from "lucide-react"; // import wind icon

export default function WeatherDegree({ weather, loading, error }) {
  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!weather)
    return (
      <div className="flex flex-col justify-center items-center text-xl font-md h-[90px] text-gray-400">
        No data yet
      </div>
    );

  return (
    <div className="flex flex-col items-center text-xl font-md h-[90px] mt-6">
      {/* Temperature */}
      <div className="text-8xl font-normal mb-2 text-white">
        {weather.temp}&#176;C
      </div>

      {/* Wind speed + direction */}
      <div className="flex items-center gap-2 text-white mb-4">
        <Wind className="w-6 h-6 text-sky-100 animate-pulse" /> 
        <span>
          {weather.windDir} {weather.windSpeed} km/h
        </span>
      </div>

      <div className="border-t-2 w-[350px] mx-auto  border-white/40"></div>
    </div>
  );
}
