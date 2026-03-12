import { ChatMistralAI } from "@langchain/mistralai";

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    temperature: 0,
    maxRetries: 2,
    // other params...
})


export async function testAi() {
    model.invoke("What is the capital of india")
        .then((response) => {
            console.log(response.text);
        })
}