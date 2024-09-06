"use client"
import { useState, useEffect, useRef } from "react";
import { agentFrameworks } from "@/lib/common";

export default function FrameworkSpinner() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isSpinning, setIsSpinning] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const [fetchedIndex, setFetchedIndex] = useState<number | null>(null);
    const spinIntervalRef = useRef<number | null>(null);
    const startTimeRef = useRef(0);

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

            spinIntervalRef.current = window.setTimeout(spin, currentInterval);
        };

        startTimeRef.current = Date.now();
        spin();

        return () => {
            if (spinIntervalRef.current) clearTimeout(spinIntervalRef.current);
        };
    }, [fetchedIndex]);

    const selectedFramework = agentFrameworks[selectedIndex];

    return (
        <div className="text-center p-8 bg-gray-900 rounded-lg shadow-2xl w-full" >
            <h3 className="text-xl font-semibold text-white mb-4 opacity-75">Suggested Framework:</h3>
            <div className="w-full h-16 mx-auto bg-white border-4 border-yellow-400 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-3xl font-bold text-gray-800">
                        {isSpinning ? selectedFramework.name : (showResult ? selectedFramework.name : "Loading...")}
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-yellow-200 pointer-events-none"></div>
            </div>
            {showResult && (
                <a
                    href={selectedFramework.docsURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 underline mt-4"
                >
                    Documentation
                </a>
            )}
        </div>
    );
}
