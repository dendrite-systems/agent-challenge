"use client"
import { useState, useEffect } from 'react';

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState('');

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
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Next Challenge In:</h3>
            <div className="text-3xl font-bold">{timeLeft}</div>
        </div>
    );
}