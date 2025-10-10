import React, { useEffect, useState } from "react";

export default function DateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    // har 1 second baad update hoga 
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer); // cleanup
  }, []);

  const formattedDate = dateTime.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <span>
      {formattedDate} | {formattedTime}
    </span>
  );
}
