import TodaysChallenge from "@/components/welcome/TodaysChallenge";
import FrameworkSpinner from "@/components/welcome/FrameworkSpinner";
import CountdownTimer from "@/components/welcome/CountdownTimer";
import Leaderboard from "@/components/welcome/Leaderboard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex-grow flex justify-between p-8 pb-20 gap-16 sm:p-20 font-[family-name:Courier]">
        <div className="flex-1 flex flex-col items-center gap-8">
          <TodaysChallenge />
          <FrameworkSpinner />
        </div>
        <div className="flex-1 flex flex-col items-center gap-8">
          <CountdownTimer />
          <Leaderboard />
        </div>
      </div>
      <footer className="text-white text-center p-4">
        <a href="https://dendrite.systems/" className="opacity-75">Made by dendrite.systems</a>
      </footer>
    </div>
  );
}





