import "dotenv/config";
// index.js: Node CLI input example (readline)
import readline from 'readline/promises';
import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent, HumanMessage, tool } from "langchain";
import { sendEmail } from "./mail.service.js";
import * as z from "zod";


const emailTool = tool(
    sendEmail,
    {
        name: "emailTool",
        description: "Use this tool to send emails.",
        schema: z.object({
            to: z.string().describe("The email address of the recipient"),
            subject: z.string().describe("The subject of the email"),
            html: z.string().describe("The HTML content of the email"),
        })
    }
)

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    temperature: 0,
    maxRetries: 2
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const agent = createAgent({
    model,
    tools: [emailTool]
})

const messages = [];

while(true){
    
    const UserInput = await rl.question("\x1b[32mYou:\x1b[0m ");
    if(UserInput.toLowerCase() === "exit") break;

    messages.push(new HumanMessage(UserInput));
    
    const response = await agent.invoke({messages});

    messages.push(response.messages[response.messages.length - 1]);    

    // console.log("\x1b[34mAI:\x1b[0m", response, "\n");

    console.log("\x1b[34mAI:\x1b[0m", response.messages[response.messages.length - 1].text, "\n");
}


rl.close();