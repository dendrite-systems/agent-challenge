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
            }, 50);
            return () => clearInterval(intervalId);
        }
    }, [challenge]);

    return (
        <div className="flex flex-col items-center justify-center" >
            <h1 className="text-2xl font-bold mb-4">
                Today's Challenge
            </h1>
            <div className="flex flex-col items-center justify-center">
                {displayedChallenge}
            </div>
        </div>
    );
}