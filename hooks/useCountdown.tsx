"use client";
import { useState, useEffect } from "react";

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(["00", "00", "00", "00"]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetTime = new Date(now);
      targetTime.setUTCHours(13, 0, 0, 0); // 6 AM PST is 13:00 UTC

      if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 7);
      }

      const difference = targetTime.getTime() - now.getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return `${days.toString().padStart(2, "0")}:${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
    };

    const timer = setInterval(() => {
      const timeString = calculateTimeLeft();
      setTimeLeft(timeString.split(":"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}
