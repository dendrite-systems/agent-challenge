"use client"
import { useState, useEffect } from 'react';

interface Submission {
    user_id: string;
    github_repo_url: string;
    stars: number;
    starred: boolean;
}

export default function Leaderboard() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);

    useEffect(() => {
        // Mock API call
        const fetchSubmissions = async () => {
            // Simulating API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmissions([
                { user_id: 'user1', github_repo_url: 'https://github.com/user1/agent', stars: 120, starred: false },
                { user_id: 'user2', github_repo_url: 'https://github.com/user2/agent', stars: 95, starred: false },
                { user_id: 'user3', github_repo_url: 'https://github.com/user3/agent', stars: 87, starred: false },
                { user_id: 'user4', github_repo_url: 'https://github.com/user4/agent', stars: 72, starred: false },
                { user_id: 'user5', github_repo_url: 'https://github.com/user5/agent', stars: 65, starred: false },
            ]);
        };
        fetchSubmissions();
    }, []);

    const handleStar = async (userId: string) => {
        // Mock API call to star a solution
        try {
            await fetch('/api/star', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });

            setSubmissions(prevSubmissions =>
                prevSubmissions.map(sub =>
                    sub.user_id === userId
                        ? { ...sub, stars: sub.stars + 1, starred: true }
                        : sub
                )
            );
        } catch (error) {
            console.error('Error starring solution:', error);
        }
    };

    return (
        <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white">Today's Leaderboard</h2>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-800 text-gray-300">
                        <th className="p-2 text-left">Rank</th>
                        <th className="p-2 text-left">User</th>
                        <th className="p-2 text-left">GitHub Repo</th>
                        <th className="p-2 text-right">Stars</th>
                        <th className="p-2 text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((submission, index) => (
                        <tr key={submission.user_id} className="border-b border-gray-700 text-gray-300">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{submission.user_id}</td>
                            <td className="p-2">
                                <a href={submission.github_repo_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                    View Repo
                                </a>
                            </td>
                            <td className="p-2 text-right">{submission.stars}</td>
                            <td className="p-2 text-center">
                                <button
                                    onClick={() => handleStar(submission.user_id)}
                                    className={`text-2xl ${submission.starred
                                        ? 'opacity-100 hover:opacity-75'
                                        : 'opacity-50'
                                        }`}
                                >
                                    ⭐
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
