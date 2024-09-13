"use client";
import { useCountdown } from "@/hooks/useCountdown";

export default function CountdownTimer() {
    const timeLeft = useCountdown();
    const labels = ["days", "hours", "mins", "secs"];

    return (
        <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4 text-white">
                Next Challenge In:
            </h3>
            <div className="flex justify-center space-x-4">
                {timeLeft.map((value, index) => (
                    <div key={index} className="flex">
                        <div className="flex flex-col">
                            <span className="text-md text-gray-400 mb-1 w-full ">{labels[index]}</span>
                            <div className="flex items-center">
                                {value.split("").map((digit, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-gray-800 rounded-md mx-0.5 w-12 h-16 flex items-center justify-center"
                                    >
                                        <span className="text-3xl font-bold text-white">{digit}</span>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
