"use client";
import { useCountdown } from "@/hooks/useCountdown";

const Countdown = () => {
  const timeLeft = useCountdown();
  return (
    <span>
      {timeLeft[0]}:{timeLeft[1]}:{timeLeft[2]}:{timeLeft[3]}
    </span>
  );
};

export default Countdown