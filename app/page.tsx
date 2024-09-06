import TodaysChallenge from "@/components/welcome/TodaysChallenge";
import FrameworkWheel from "@/components/welcome/FrameworkWheel";
import CountdownTimer from "@/components/welcome/CountdownTimer";
import Leaderboard from "@/components/welcome/Leaderboard";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold text-center">
        Welcome to AgentChallenge.ai
      </h1>
      <TodaysChallenge />
      <FrameworkWheel />
      <CountdownTimer />
      <Leaderboard />
    </div>
  );
}






