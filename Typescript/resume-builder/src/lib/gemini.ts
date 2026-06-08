import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });

// export async function generateAiContent(prompt: string) {
//   const response = await ai.models.generateContent({
//     model: "gemini-3.5-flash",
//     contents: prompt,
//   });

//   return response.text;
// }



const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// Define your models in order of priority
const MODEL_CHAIN = ["gemini-3.5-flash", "gemini-2.5-flash"];

export async function generateAiContent(prompt: string) {
  let lastError: any;

  // Loop through your fallback models array
  for (const modelName of MODEL_CHAIN) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
      });

      // If successful, break the loop and return the text
      return response.text;
    } catch (error: any) {
      console.warn(`Model ${modelName} failed. Attempting next fallback...`);
      lastError = error;
      
      // Optional: Check if the error is specifically due to high traffic/rate limits
      // const isRateLimitOrOverloaded = error.status === 429 || error.status === 503;
      // if (!isRateLimitOrOverloaded) throw error; // immediately crash if it's an invalid prompt error instead
    }
  }

  // If all models in the chain fail, throw the last recorded error
  throw new Error(`All fallback models failed. Last error: ${lastError?.message || lastError}`);
}