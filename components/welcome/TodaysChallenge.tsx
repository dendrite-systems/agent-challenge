"use client"
import { useState, useEffect } from "react";

export default function TodaysChallenge() {
    const [challenge, setChallenge] = useState('');
    const [displayedChallenge, setDisplayedChallenge] = useState('');

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await fetch('/api/get-challenge');
                const data = await response.json();
                setChallenge(data.challenge);
            } catch (error) {
                console.error('Error fetching challenge:', error);
                setChallenge('Failed to load challenge. Please try again later.');
            }
        };
        fetchChallenge();
    }, []);

    useEffect(() => {
        if (challenge) {
            let i = 0;
            const intervalId = setInterval(() => {
                setDisplayedChallenge(challenge.slice(0, i));
                i++;
                if (i > challenge.length) clearInterval(intervalId);
            }, 10);
            return () => clearInterval(intervalId);
        }
    }, [challenge]);

    return (
        <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-4 text-center mb-8">
                Today&apos;s Agent Challenge
            </h1>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                <div className="text-1xl whitespace-pre-wrap">
                    {displayedChallenge}
                </div>
            </div>
            <div className="bg-gray-900 p-2 rounded-lg shadow-md mt-8">
                <div className="whitespace-pre-wrap opacity-75">
                    Psst... Use <a href="https://github.com/dendrite-systems/dendrite-python-sdk" className="text-blue-400 hover:text-blue-300 underline font-semibold">Dendrite SDK</a> for easy web interactions for your agent ;)
                </div>
            </div>
        </div>
    );
}