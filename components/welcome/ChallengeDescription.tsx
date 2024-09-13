'use client';

import { useState, useEffect } from 'react';
import { getChallenge } from "@/lib/challenge";

export default function ChallengeDescription() {
    const [challenge, setChallenge] = useState('');
    const [displayedChallenge, setDisplayedChallenge] = useState('');

    useEffect(() => {
        async function fetchChallenge() {
            try {
                const data = await getChallenge();
                if (data) {
                    setChallenge(data.challenge);
                } else {
                    throw new Error('No data received');
                }
            } catch (error) {
                console.error('Error fetching challenge:', error);
                setChallenge('Failed to load challenge. Please try again later.');
            }
        }
        fetchChallenge();
    }, []);

    useEffect(() => {
        if (challenge) {
            let i = 0;
            const intervalId = setInterval(() => {
                setDisplayedChallenge(challenge.slice(0, i));
                i++;
                if (i > challenge.length) clearInterval(intervalId);
            }, 5);
            return () => clearInterval(intervalId);
        }
    }, [challenge]);
    return (
        <div className="flex flex-col w-full">
            <h1 className="text-4xl font-bold mb-4 text-center mb-8">
                Challenge
            </h1>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md min-h-[440px] w-full">
                <div className="whitespace-pre-wrap w-full" style={{ fontSize: "18px" }}>
                    {displayedChallenge}
                </div>
            </div>
        </div>
    );
}