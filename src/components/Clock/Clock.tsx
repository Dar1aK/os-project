import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const intervalID = setInterval(() => updateClock(), 1000);
    return () => clearInterval(intervalID);
  }, []);

  const updateClock = () => {
    setTime(
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return <span>{time}</span>;
};

export default Clock;
