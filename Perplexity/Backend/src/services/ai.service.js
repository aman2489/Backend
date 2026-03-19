import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    temperature: 0,
    maxRetries: 2,
    // other params...
})


const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});


export async function generateResponse(messages){
    const response = await geminiModel.invoke(messages.map(message => {
            if(message.role === "user") {
                return new HumanMessage(message.content)
            }else if(message.role === "ai") {
                return new AIMessage(message.content)
            }
        }));
    
    return response.text
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