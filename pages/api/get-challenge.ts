import { agentFrameworks } from "@/lib/common";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"], // This is the default and can be omitted
});

const generateChallenge = async () => {
  console.log("claude!");
  const prompt = `You are the game leader of a game called "AgentChallenge.ai". 
  
Your goal is to come up with an interesting daily challenge for developers to build that involves using AI agents to automate some process.

Please list a few ideas for agent workflows that should adress some common and tedious automation process.

Please give some practical examples, e.g:

1. fetch a customer's request from an email for the purchase of a product
2. If the email doesn't contain all the necessary information (e.g amount of items is missing), reply to the email and ask for the missing information
3. log the purchase inside a business logging service, or just a google sheet

or 

1. Downloads transactions from your bank
2. Analyze the tranactions with openai code interperater and write a report
3. email the report to stakeholders

The examples don't need to include exact services to use, the important thing is that some valuable automation is done by an agent. 

The examples should be easy for any developer to use (they shouldn't need to spend time setting up a account somewhere for instance that they dont already have)

Output one example as a list of bullet points and nothing else. Don't write anything else besides the list.`;

  const message = await client.messages.create({
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
    model: "claude-3-5-sonnet-20240620",
  });

  console.log(message.content);
  if (message.content[0].type === "text") {
    return message.content[0].text;
  }
};

let todaysChallenge: string | undefined = undefined;

export default async function getChallenge(req, res) {
  if (!todaysChallenge) {
    const challenge = await generateChallenge();
    todaysChallenge = challenge;
  }
  const frameworkIndex = Math.floor(Math.random() * agentFrameworks.length);
  res.status(200).json({ challenge: todaysChallenge, frameworkIndex });
}
