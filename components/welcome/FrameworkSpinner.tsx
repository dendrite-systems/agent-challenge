"use client"
import { useState, useEffect } from "react";
import { agentFrameworks } from "@/lib/common";

export default function FrameworkSpinner() {
    const [selectedFramework, setSelectedFramework] = useState(agentFrameworks[0]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFramework = async () => {
            try {
                const response = await fetch('/api/get-challenge');
                const data = await response.json();
                setSelectedFramework(agentFrameworks[data.frameworkIndex]);
            } catch (error) {
                console.error('Error fetching challenge:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFramework();
    }, []);

    return (
        <div className="text-center p-8 bg-gray-900 rounded-lg shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-4 opacity-75">Suggested Framework:</h3>
            <div className="w-full h-16 mx-auto bg-white border-4 border-yellow-400 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-3xl font-bold text-gray-800">
                        {isLoading ? "Loading..." : selectedFramework.name}
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-yellow-200 pointer-events-none"></div>
            </div>
            {!isLoading && (
                <div className="mt-8 text-white">
                    <p className="mb-2 opacity-75">{selectedFramework.desc}</p>
                    <a
                        href={selectedFramework.docsURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 hover:text-blue-200 underline"
                    >
                        Documentation
                    </a>
                </div>
            )}
        </div>
    );
}
