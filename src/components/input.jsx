import React from "react";
import { MapPin } from "lucide-react";

export default function SearchBox({ city, setCity, fetchWeather }) {
  // Press Enter to trigger search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div
      className="
        flex items-center gap-2 sm:gap-3 border border-white/20 
        bg-gradient-to-r from-sky-700/40 via-indigo-700/40 to-purple-700/40 
        backdrop-blur-lg rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-xl 
        w-full max-w-md mx-auto transition-all duration-300
      "
    >
      {/* Map Icon */}
      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-sky-100 drop-shadow-md" />

      {/* Input Field */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter city name..."
        className="
          flex-1 bg-transparent outline-none placeholder-white/50 
          text-white text-sm sm:text-base px-1 sm:px-2 focus:placeholder-white/70 
          transition-all
        "
      />

      {/* Search Button */}
      <button
        onClick={fetchWeather}
        className="
          flex-shrink-0 bg-white/20 hover:bg-sky-400/30 text-white font-semibold 
          px-3 sm:px-5 py-1.5 rounded-lg border border-white/30 
          transition-all duration-300 hover:scale-105 hover:shadow-lg
        "
      >
        Search
      </button>
    </div>
  );
}
