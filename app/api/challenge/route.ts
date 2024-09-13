import { NextResponse } from "next/server";
import { getChallenge } from "@/lib/challenge";

export async function GET() {
  try {
    const challengeData = await getChallenge();
    return NextResponse.json(challengeData);
  } catch (error) {
    console.error("Error in challenge API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch challenge" },
      { status: 500 }
    );
  }
}
