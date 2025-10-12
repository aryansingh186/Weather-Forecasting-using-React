import React from "react";
import { Wind } from "lucide-react";

export default function WeatherDegree({ weather, loading, error }) {
  if (loading)
    return (
      <div className="flex justify-center items-center h-[120px] text-gray-400 animate-pulse">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[120px] text-red-400">
        {error}
      </div>
    );

  if (!weather)
    return (
      <div className="flex flex-col justify-center items-center h-[120px] text-gray-400 text-lg sm:text-xl">
        No data yet
      </div>
    );

  return (
    <section
      aria-label="Current weather"
      className="relative flex flex-col items-center justify-center text-center rounded-xl p-6 w-full max-w-md mx-auto 
                 bg-gradient-to-b from-sky-500/30 via-blue-800/40 to-indigo-900/40 
                 backdrop-blur-md shadow-xl border border-white/20 transition-all duration-500 hover:scale-[1.02]"
    >
      {/* Temperature */}
      <div className="text-4xl sm:text-8xl md:text-4xl font-semibold mb-3 text-white drop-shadow-lg transition-all duration-300">
        {weather?.temp ?? "--"}&#176;C
      </div>

      {/* Wind speed + direction */}
      <div className="flex items-center justify-center gap-2 text-white text-lg sm:text-xl mb-4">
        <Wind className="w-6 h-6 sm:w-7 sm:h-7 text-sky-200 animate-spin-slow" />
        <span className="font-light">
          {weather?.windDir ?? "N/A"} {weather?.windSpeed ?? "--"} km/h
        </span>
      </div>

      {/* Divider */}
      <div className="border-t w-[80%] border-white/40 mb-3"></div>

      {/* Extra info (optional placeholder) */}
      <div className="text-sm text-sky-100/80 italic">
        Stay safe and enjoy your day 🌈
      </div>
    </section>
  );
}
