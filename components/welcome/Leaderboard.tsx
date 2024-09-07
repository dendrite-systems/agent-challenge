import { getRepos } from "@/lib/repositories/get";

interface Submission {
  user_id: string;
  github_repo_url: string;
  stars: number;
  starred: boolean;
}

const Leaderboard = async () => {
  const submissions = await getRepos();
  console.log({submissions})
  const handleStar = async (userId: string) => {
    // Mock API call to star a solution
    try {
      await fetch("/api/star", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
    } catch (error) {
      console.error("Error starring solution:", error);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Today's Leaderboard
      </h2>
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
          {submissions?.map((submission, index) => (
            <tr
              key={submission.id}
              className="border-b border-gray-700 text-gray-300"
            >
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{submission.uid}</td>
              <td className="p-2">
                <a
                  href={submission.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  View Repo
                </a>
              </td>
              <td className="p-2 text-right">{submission.stars}</td>
              <td className="p-2 text-center">
                {/* <button
                  onClick={() => handleStar(submission.user_id)}
                  className={`text-2xl ${
                    submission.starred
                      ? "opacity-100 hover:opacity-75"
                      : "opacity-50"
                  }`}
                >
                  ⭐
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
