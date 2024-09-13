"use server";

import { agentFrameworks } from "@/lib/common";
import Anthropic from "@anthropic-ai/sdk";
import { createAdminClient } from "../supabase/server";

const client = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"],
});

const generateChallenge = async () => {
  const supabase = createAdminClient();
  const { data: recentChallenges } = await supabase
    .from("challenge")
    .select("challenge")
    .order("created_at", { ascending: false })
    .limit(10);

  const recentChallengesText = recentChallenges
    ?.map((c, i) => `${i + 1}. ${c.challenge}`)
    .join("\n\n");

  const prompt = `You are the game leader of a game called "AgentChallenge.ai". 
  
Your goal is to come up with an interesting daily challenge for developers to build that involves using AI agents to automate some process.

Please list a few ideas for agent workflows that should address some common and tedious automation process.

Please give some practical examples, e.g:

1. 📧 Fetch a customer's request from an email for the purchase of a product.
2. 🔍 If the email doesn't contain all the necessary information (e.g amount of items is missing), reply to the email and ask for the missing information.
3. 📝 Log the purchase inside a business logging service, or just a google sheet.

or 

1. 📰 Downloads transactions from your bank.
2. 📊 Analyze the tranactions with a data anlysis agent (e.g. with OpenAI's code interpreter) and write a report.
3. 📤 Email the report to stakeholders.

The examples don't need to include exact services to use, the important thing is that some valuable automation is done by an agent. 

The examples should be easy for any developer to use (they shouldn't need to spend time setting up a account somewhere for instance that they dont already have).

Use the web in your examples.

Here are the 10 most recent challenges:

${recentChallengesText}

Please create a new challenge that is different from these recent ones. Make sure it's novel and unique.

Output one example as a numbered list and nothing else. Don't write anything else besides the list.

There should three steps, use double line breaks to separate the steps and nice emojis.`;

  const message = await client.messages.create({
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
    model: "claude-3-5-sonnet-20240620",
  });

  let challengeText = "Could not generate challenge today";
  let frameworkName = "";
  if (message.content[0].type === "text") {
    challengeText = message.content[0].text;
    // Randomly select a framework
    frameworkName =
      agentFrameworks[Math.floor(Math.random() * agentFrameworks.length)].name;
  }

  const { data, error } = await supabase
    .from("challenge")
    .insert({ challenge: challengeText, framework_name: frameworkName })
    .select()
    .single();

  if (error) {
    console.error("Error storing challenge:", error);
    return { challenge: challengeText, frameworkName };
  }

  return { challenge: data.challenge, frameworkName: data.framework_name };
};

export async function getChallenge() {
  const now = new Date();
  const pstNow = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  const sixAMPST = new Date(pstNow);
  sixAMPST.setHours(6, 0, 0, 0);

  const supabase = createAdminClient();
  const { data: latestChallenge } = await supabase
    .from("challenge")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (
    !latestChallenge ||
    (pstNow >= sixAMPST && latestChallenge.created_at < sixAMPST.getTime())
  ) {
    const { challenge, frameworkName } = await generateChallenge();
    return { challenge, frameworkName };
  }

  return {
    challenge: latestChallenge.challenge,
    frameworkName: latestChallenge.framework_name,
  };
}
