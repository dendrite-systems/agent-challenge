import { agentFrameworks } from "@/lib/common";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"],
});

const generateChallenge = async () => {
  const prompt = `You are the game leader of a game called "AgentChallenge.ai". 
  
Your goal is to come up with an interesting daily challenge for developers to build that involves using AI agents to automate some process.

Please list a few ideas for agent workflows that should adress some common and tedious automation process.

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

Output one example as a numbered list and nothing else. Don't write anything else besides the list.

There should three steps, use double line breaks to separate the steps and nice emojis.`;

  const message = await client.messages.create({
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
    model: "claude-3-5-sonnet-20240620",
  });

  if (message.content[0].type === "text") {
    return message.content[0].text;
  }

  return "Could not generate challenge today";
};

let todaysChallenge:
  | { challenge: string; frameworkIndex: number; timestamp: number }
  | undefined = undefined;

export default async function getChallenge(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const now = new Date();
  const pstNow = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  const sixAMPST = new Date(pstNow);
  sixAMPST.setHours(6, 0, 0, 0);

  console.log(`Current time (PST): ${pstNow.toLocaleString()}`);
  console.log(`6AM PST: ${sixAMPST.toLocaleString()}`);

  if (!todaysChallenge) {
    console.log("No challenge cached. Generating new challenge.");
  } else if (
    pstNow >= sixAMPST &&
    todaysChallenge.timestamp < sixAMPST.getTime()
  ) {
    console.log(
      "It's past 6AM PST and the cached challenge is old. Generating new challenge."
    );
  } else {
    console.log("Using cached challenge.");
    console.log(
      `Cached challenge timestamp: ${new Date(
        todaysChallenge.timestamp
      ).toLocaleString()}`
    );
  }

  if (
    !todaysChallenge ||
    (pstNow >= sixAMPST && todaysChallenge.timestamp < sixAMPST.getTime())
  ) {
    const challenge = await generateChallenge();
    const frameworkIndex = Math.floor(Math.random() * agentFrameworks.length);
    todaysChallenge = {
      challenge: challenge || "",
      frameworkIndex,
      timestamp: pstNow.getTime(),
    };
    console.log("New challenge generated and cached.");
    console.log(
      `New challenge timestamp: ${new Date(
        todaysChallenge.timestamp
      ).toLocaleString()}`
    );
  }

  res.status(200).json({
    challenge: todaysChallenge.challenge,
    frameworkIndex: todaysChallenge.frameworkIndex,
  });
}
