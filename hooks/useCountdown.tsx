"use client";
import { useState, useEffect } from "react";

export function useCountdown(targetHour = 6, targetMinute = 0) {
  const [timeLeft, setTimeLeft] = useState(["00", "00", "00"]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetTime = new Date(now);
      targetTime.setHours(targetHour, targetMinute, 0, 0);
      if (now > targetTime) targetTime.setDate(targetTime.getDate() + 1);

      const difference = targetTime.getTime() - now.getTime();
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const timer = setInterval(() => {
      const timeString = calculateTimeLeft();
      setTimeLeft(timeString.split(":"));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetHour, targetMinute]);

  return timeLeft;
}
