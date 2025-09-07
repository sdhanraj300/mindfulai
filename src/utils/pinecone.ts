declare global {
  var pinecone: PineconeClient | undefined;
  var embeddings: GoogleGenerativeAIEmbeddings | undefined;
}
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

export const getPineconeClient = () => {
  if (!process.env.PINECONE_API_KEY) {
    throw new Error("PINECONE_API_KEY is not set in environment variables");
  }
  if (!global.pinecone) {
    global.pinecone = new PineconeClient({
      apiKey: process.env.PINECONE_API_KEY,
    });
  }
  return global.pinecone;
};

export const getEmbeddings = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }
  if (!global.embeddings) {
    global.embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }
  return global.embeddings;
};
