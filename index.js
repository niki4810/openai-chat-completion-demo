import OpenAI from "openai";
import readline from "readline";
import "dotenv/config";
import { mockUsers } from "./mock-contacts.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Create a simple terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Step 1: update system prompt
const SYSTEM_PROMPT = `
 You are a helpful AI Contacts manager assistant. You will have answers to a contacts list of users.
 You will use that as context and take a question from user, search the contacts and try to answer users questions.
 If the question is not related to the provided contacts, just say you cannot answer that.

 ### Contacts lists
 ${JSON.stringify(mockUsers)}
`;
const messages = [
  {
    role: "system",
    content: SYSTEM_PROMPT,
  },
];

async function main() {
  console.log("Chatbot ready. Type 'exit' to quit.\n");

  while (true) {
    const userInput = await ask("> ");

    if (userInput.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
      process.exit(0);
    }

    // Step 2: Push new user message into conversation history
    messages.push({ role: "user", content: userInput });
    try {
      // Step 3: Call OpenAI Chat Completions API

      const response = await client.chat.completions.create({
        model: "gpt-4.1-mini",
        messages,
      });

      const assistantReply = response.choices[0].message.content;

      console.log("\nAssistant:", assistantReply, "\n");

      // Step 4: Push assistant reply to memory
      messages.push({ role: "assistant", content: assistantReply });
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

// Helper function to prompt for input
function ask(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

main();
