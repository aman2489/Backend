import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AIMessage, HumanMessage, SystemMessage, tool, createAgent} from "langchain";
import * as z from "zod";
import searchInternet from "./internet.service.js";



const mistralModel = new ChatMistralAI({
    model: "mistral-medium-latest",
    temperature: 0,
    maxRetries: 2,
    // other params...
})


const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const searchInternetTool = tool(
     searchInternet,
    {
        name: "searchInternet",
        description: "use this tool to get the latest information from the internet.",
        schema: z.object({
            query: z.string().describe("The search query to look up on internet.")
        })
    }
)

const agent = createAgent({
    model: mistralModel,
    tools: [searchInternetTool],
    maxIterations: 3

})


export async function generateResponse(messages){
    const response = await agent.invoke({
        messages: [
            new SystemMessage(`
                You are a helpful and precise assistant for answering questions.
                If you don't know the answer, say you don't know. 
                If the question requires up-to-date information, use the "searchInternet" tool to get the latest information from the internet and then answer based on the search results.
            `),
            ...(messages.map(message => {
            if(message.role === "user") {
                return new HumanMessage(message.content)
            }else if(message.role === "ai") {
                return new AIMessage(message.content)
            }
        }))]
    });

    console.log(response.messages);
    
    return response.messages[response.messages.length - 1].text;
}

export async function generateChatTitle(message) {
    const response = await mistralModel.invoke([
        new SystemMessage(`You are a helpful assistant that generates concise and relevant titles for the given content. The title should capture the essence of the content in a few words, making it easy for users to understand what the content is about at a glance. Please provide a title that is engaging and accurately reflects the main topic of the content. in 2-5 words.`),

        new HumanMessage(`
            Generate the title for a chat conversation based on the following messages:
            ${message}
            `)
    ]);
    return response.text;
}