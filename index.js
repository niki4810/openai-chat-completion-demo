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
const messages = [
  {
    role: "system",
    content: "You are a helpful assistant.",
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

    try {
      // Step 3: Call OpenAI Chat Completions API
      // Step 4: Push assistant reply to memory
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
