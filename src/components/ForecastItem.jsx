import React from "react";
import { CloudRain, Cloud, CloudFog, CloudDrizzle, Sun } from "lucide-react";

const getWeatherIcon = (condition) => {
  const normalized = condition.toLowerCase();

  if (normalized.includes("rain") || normalized.includes("drizzle")) {
    return <CloudRain className="w-8 h-8 text-gray-300" />;
  }
  if (normalized.includes("cloud")) {
    return <Cloud className="w-8 h-8 text-gray-300" />;
  }
  if (normalized.includes("fog") || normalized.includes("mist") || normalized.includes("haze")) {
    return <CloudFog className="w-8 h-8 text-gray-300" />;
  }
  if (normalized.includes("clear")) {
    return <Sun className="w-8 h-8 text-gray-300" />;
  }

  // Fallback
  return <CloudDrizzle className="w-8 h-8 text-gray-300" />;
};

export default function ForecastItem({ date, condition, minTemp, maxTemp }) {
  return (
    <div className="flex items-center justify-between py-3 px-3 hover:bg-white/5 transition rounded-lg">
      {/* Left Section: Icon + Details */}
      <div className="flex items-center space-x-4">
        <div className="rounded-md bg-white/10 p-2 flex items-center justify-center w-12 h-12 flex-shrink-0">
          {getWeatherIcon(condition)}
        </div>
        <div>
          <p className="text-lg text-gray-100 font-medium">{date}</p>
          <p className="text-sm text-gray-300 capitalize">{condition}</p>
        </div>
      </div>

      {/* Right Section: Temperatures */}
      <div className="flex flex-col items-end text-lg font-medium">
        <span className="text-gray-400">{minTemp}°</span>
        <span className="text-gray-100">{maxTemp}°</span>
      </div>
    </div>
  );
}
