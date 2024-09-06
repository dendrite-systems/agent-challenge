"use client"
import { useState, useEffect, useRef } from "react";
import { agentFrameworks } from "@/lib/common";

export default function FrameworkWheel() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isSpinning, setIsSpinning] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const spinIntervalRef = useRef<NodeJS.Timer | null>(null);
    const startTimeRef = useRef<number>(0);
    const [fetchedIndex, setFetchedIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchIndex = async () => {
            try {
                const response = await fetch('/api/get-challenge');
                const data = await response.json();
                setFetchedIndex(data.frameworkIndex);
            } catch (error) {
                console.error('Error fetching challenge:', error);
            }
        };

        fetchIndex();

        const totalDuration = 5000; // 5 seconds
        const initialInterval = 50; // Initial speed (ms)
        const finalInterval = 500; // Final speed (ms)

        const easeOutQuad = (t: number) => t * (2 - t);

        const spin = () => {
            const now = Date.now();
            const elapsedTime = now - startTimeRef.current;

            if (elapsedTime >= totalDuration) {
                if (spinIntervalRef.current) clearTimeout(spinIntervalRef.current);
                setIsSpinning(false);
                setShowResult(true);
                if (fetchedIndex !== null) {
                    setSelectedIndex(fetchedIndex);
                }
                return;
            }

            const progress = elapsedTime / totalDuration;
            const easedProgress = easeOutQuad(progress);
            const currentInterval = initialInterval + (finalInterval - initialInterval) * easedProgress;

            setSelectedIndex(prev => (prev + 1) % agentFrameworks.length);

            spinIntervalRef.current = setTimeout(spin, currentInterval);
        };

        startTimeRef.current = Date.now();
        spin();

        return () => {
            if (spinIntervalRef.current) clearTimeout(spinIntervalRef.current);
        };
    }, [fetchedIndex]);

    return (
        <div className="text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl">
            <div className="w-64 h-32 mx-auto bg-white border-4 border-yellow-400 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold text-gray-800">
                        {agentFrameworks[selectedIndex]}
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-yellow-200 pointer-events-none"></div>
            </div>
            <div className="mt-8 text-2xl font-semibold text-white">
                {isSpinning ? (
                    <p className="animate-pulse">Spinning...</p>
                ) : showResult && (
                    <p>
                        Suggested Framework:
                        <span className="block mt-2 text-yellow-300">
                            {agentFrameworks[selectedIndex]}
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
}
