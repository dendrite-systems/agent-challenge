"use client";
import { useCountdown } from "@/hooks/useCountdown";

const Countdown = () => {
  const timeLeft = useCountdown(6, 0);
  return (
    <span>
      {timeLeft[0]}:{timeLeft[1]}:{timeLeft[2]}
    </span>
  );
};

export default Countdown