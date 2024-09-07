"use client";
import { useCountdown } from "@/hooks/useCountdown";
import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const timeLeft = useCountdown(6, 0);

  return (
    <div className="text-center">
      <h3 className="text-2xl font-semibold mb-4 text-white">
        Next Challenge In:
      </h3>
      <div className="flex justify-center space-x-4">
        {timeLeft.map((value, index) => (
          <div key={index} className="flex items-center">
            {value.split("").map((digit, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-md p-3 mx-0.5 w-12 h-16 flex items-center justify-center"
              >
                <span className="text-3xl font-bold text-white">{digit}</span>
              </div>
            ))}
            {index < 2 && (
              <span className="text-3xl font-bold text-white mx-2">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
