declare global {
    // eslint-disable-next-line no-var
    var model: ChatGoogleGenerativeAI | undefined;
    // eslint-disable-next-line no-var
    var embeddings: GoogleGenerativeAIEmbeddings | undefined
}
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const getModel = () : ChatGoogleGenerativeAI => {
    if(!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set in environment variables");
    }
    if(!global.model){
        global.model = new ChatGoogleGenerativeAI({
            model: "gemini-2.5-flash",
            apiKey: process.env.GEMINI_API_KEY,
        });
    }
  return global.model;
}