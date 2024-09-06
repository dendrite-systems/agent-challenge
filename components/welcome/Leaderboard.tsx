"use client"
import { useState, useEffect } from 'react';

interface Submission {
    user_id: string;
    github_repo_url: string;
    stars: number;
}

export default function Leaderboard() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);

    useEffect(() => {
        // Mock API call
        const fetchSubmissions = async () => {
            // Simulating API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmissions([
                { user_id: 'user1', github_repo_url: 'https://github.com/user1/agent', stars: 120 },
                { user_id: 'user2', github_repo_url: 'https://github.com/user2/agent', stars: 95 },
                { user_id: 'user3', github_repo_url: 'https://github.com/user3/agent', stars: 87 },
                { user_id: 'user4', github_repo_url: 'https://github.com/user4/agent', stars: 72 },
                { user_id: 'user5', github_repo_url: 'https://github.com/user5/agent', stars: 65 },
            ]);
        };
        fetchSubmissions();
    }, []);

    return (
        <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4">Today's Leaderboard</h2>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 text-left">Rank</th>
                        <th className="p-2 text-left">User</th>
                        <th className="p-2 text-left">GitHub Repo</th>
                        <th className="p-2 text-right">Stars</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((submission, index) => (
                        <tr key={submission.user_id} className="border-b">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{submission.user_id}</td>
                            <td className="p-2">
                                <a href={submission.github_repo_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    View Repo
                                </a>
                            </td>
                            <td className="p-2 text-right">{submission.stars}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
