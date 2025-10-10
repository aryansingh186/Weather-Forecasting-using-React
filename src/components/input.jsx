import React from "react";
import { MapPin } from "lucide-react";

export default function SearchBox({ city, setCity, fetchWeather }) {
  return (
    <div
      className="flex items-center gap-4  border border-white/20 
      backdrop-blur-md rounded-xl px-4 py-2 shadow-md w-[350px]"
    >
      {/* Map Icon */}
      <MapPin className="w-6 h-6 text-white/90" />

      {/* Input Field */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="flex-1 bg-transparent outline-none placeholder-white/60 
        text-white text-lg"
      />

      {/* Search Button */}
      <button
        onClick={fetchWeather}
        className="bg-white/20 hover:bg-white/30 text-white font-medium 
        px-4 py-1 rounded-lg border border-white/30 transition-all"
      >
        Search
      </button>
      
    </div>
  );
}
