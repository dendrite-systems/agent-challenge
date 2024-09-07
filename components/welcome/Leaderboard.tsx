import { getRepos } from "@/lib/repositories/get";
import { createClient } from "@/lib/supabase/server";
// import { IconStar } from "@tabler/icons-react";
// import { SubmitButton } from "../essentials/button/submit";
// import { starRepo } from "@/lib/repositories/star";

const Leaderboard = async () => {
  const entries = await getRepos();
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;
  console.log({ entries });

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
            {user && <th className="p-2 text-center">Star</th>}
          </tr>
        </thead>
        <tbody>
          {entries?.map((entry, index) => (
            <tr
              key={entry.id}
              className="border-b border-gray-700 text-gray-300"
            >
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{entry.uid}</td>
              <td className="p-2">
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  View Repo
                </a>
              </td>
              <td className="p-2 text-right">{entry.stars}</td>
              {user && (
                <td className="p-2 text-center">
                  {/* <SubmitButton formAction={() => {starRepo(entry.id)}}>
                    <IconStar />
                  </SubmitButton> */}
                  {/* <button
                  onClick={() => handleStar(entry.user_id)}
                  className={`text-2xl ${
                    entry.starred
                      ? "opacity-100 hover:opacity-75"
                      : "opacity-50"
                  }`}
                >
                  ⭐
                </button> */}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
