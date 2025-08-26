import { errorCodes } from "http-sarcasm-codes";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// This function now takes the original excuse and asks Gemini to rewrite it.
async function getSarcasticVersion(originalExcuse) {
  const system_prompt = `You are a sarcastic excuse rewriter. Take the following standard HTTP status message and rewrite it as a funny, sarcastic, one-line excuse in GenZ style. Do NOT repeat the original status code or name. Just give the excuse.\n\nOriginal Message: "${originalExcuse}"\n\nSarcastic Version:`;
  
  try {
    const result = await model.generateContent(system_prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error fetching from Gemini:", error);
    return `(Gemini refused to rewrite this, it was too boring: ${originalExcuse})`;
  }
}

// This is the main function our server will call.
export const getDynamicExcuse = async (code) => {
  const originalExcuse = errorCodes[code] || `No static excuse for code ${code}.`;
  // Get the new sarcastic version of the original excuse.
  const sarcasticVersion = await getSarcasticVersion(originalExcuse);
  return sarcasticVersion;
};