"use client"
import { useState, useEffect } from 'react';

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState(['00', '00', '00']);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const targetTime = new Date(now);
            targetTime.setHours(6, 0, 0, 0);
            if (now > targetTime) targetTime.setDate(targetTime.getDate() + 1);

            const difference = targetTime.getTime() - now.getTime();
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };

        const timer = setInterval(() => {
            const timeString = calculateTimeLeft();
            setTimeLeft(timeString.split(':'));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4 text-white">Next Challenge In:</h3>
            <div className="flex justify-center space-x-4">
                {timeLeft.map((value, index) => (
                    <div key={index} className="flex items-center">
                        {value.split('').map((digit, idx) => (
                            <div key={idx} className="bg-gray-800 rounded-md p-3 mx-0.5 w-12 h-16 flex items-center justify-center">
                                <span className="text-3xl font-bold text-white">{digit}</span>
                            </div>
                        ))}
                        {index < 2 && <span className="text-3xl font-bold text-white mx-2">:</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}