"use client"
import { useState, useEffect, useRef } from "react";
import { agentFrameworks } from "@/lib/common";
import { getChallenge } from "@/lib/challenge";

export default function FrameworkSpinner() {
    const [selectedFramework, setSelectedFramework] = useState(agentFrameworks[0]);
    const [isSpinning, setIsSpinning] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const [fetchedFrameworkName, setFetchedFrameworkName] = useState<string | null>(null);
    const spinIntervalRef = useRef<number | null>(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const data = await getChallenge();
                if (data) {
                    setFetchedFrameworkName(data.frameworkName);
                } else {
                    throw new Error('No data received');
                }
            } catch (error) {
                console.error('Error fetching challenge:', error);
            }
        };

        fetchChallenge();

        const totalDuration = 5000; // 5 seconds
        const initialInterval = 20; // Faster initial speed (ms)
        const finalInterval = 200; // Final speed (ms)

        // Change easing function to slow down quickly
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

        const spin = () => {
            const now = Date.now();
            const elapsedTime = now - startTimeRef.current;

            if (elapsedTime >= totalDuration) {
                if (spinIntervalRef.current) clearTimeout(spinIntervalRef.current);
                setIsSpinning(false);
                setShowResult(true);
                if (fetchedFrameworkName) {
                    setSelectedFramework(agentFrameworks.find(f => f.name === fetchedFrameworkName) || agentFrameworks[0]);
                }
                return;
            }

            const progress = elapsedTime / totalDuration;
            const easedProgress = easeOutCubic(progress);
            const currentInterval = initialInterval + (finalInterval - initialInterval) * easedProgress;

            setSelectedFramework(agentFrameworks[Math.floor(Math.random() * agentFrameworks.length)]);

            spinIntervalRef.current = window.setTimeout(spin, currentInterval);
        };

        startTimeRef.current = Date.now();
        spin();

        return () => {
            if (spinIntervalRef.current) clearTimeout(spinIntervalRef.current);
        };
    }, [fetchedFrameworkName]);

    return (
        <div className="text-center p-8 bg-gray-900 rounded-lg shadow-2xl w-full">
            <h3 className="text-xl font-semibold text-white mb-4 opacity-75">Suggested Framework:</h3>
            <div className={`w-full h-16 mx-auto border-2 rounded-lg overflow-hidden relative transition-all duration-1000 ${showResult ? 'bg-gray-800 border-yellow-600' : 'bg-gray-700 border-gray-600'}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`text-3xl font-bold transition-colors duration-1000 ${showResult ? 'text-yellow-400' : 'text-gray-400'}`}>
                        {isSpinning ? selectedFramework.name : (showResult ? selectedFramework.name : "Loading...")}
                    </div>
                </div>
                {showResult && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-subtle-shimmer"></div>
                )}
            </div>
            {showResult && (
                <a
                    href={selectedFramework.docsURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 underline mt-4 inline-block"
                >
                    Documentation
                </a>
            )}
        </div>
    );
}
