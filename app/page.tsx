import FrameworkSpinner from "@/components/welcome/FrameworkSpinner";
import CountdownTimer from "@/components/welcome/CountdownTimer";
import Leaderboard from "@/components/welcome/leaderboard";
import { Metadata } from "next";
import ChallengeDescription from "@/components/welcome/ChallengeDescription";

export const metadata: Metadata = {
  title: "Agent challenge",
  description:
    "Every week, a new AI agent challenge is generated. Our goal is to accelerate the AI agent dev community, globally.",
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="flex-grow flex justify-between p-8 pb-20 gap-16 sm:p-20 font-[family-name:Courier]">
        <div className="flex-1 flex flex-col items-center gap-8">
          <ChallengeDescription />
          <FrameworkSpinner />
        </div>
        <div className="flex-1 flex flex-col items-center gap-8">
          <CountdownTimer />
          <Leaderboard />
        </div>
      </div>
      <footer className="text-white text-center p-4">
        <a href="https://dendrite.systems/" className="opacity-75">
          Made by dendrite.systems
        </a>
      </footer>
    </div>
  );
}
