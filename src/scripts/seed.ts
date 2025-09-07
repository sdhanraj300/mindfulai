import fs from "fs";
import path from "path";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


const pdfsDir = path.join(__dirname, "../pdfs");
const pinecone = new Pinecone({apiKey : process.env.PINECONE_API_KEY!});
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);
const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY!,
});
async function main() {
  // List all PDF files in the pdfs directory
  const files = fs.readdirSync(pdfsDir).filter((f) => f.endsWith(".pdf"));
  if (files.length === 0) {
    console.log("No PDF files found in pdfs directory.");
    return;
  }

    // Process, split, and upload each PDF one at a time
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    const pineconeStore = new PineconeStore(embeddings, {
      pineconeIndex,
      namespace: "pdf-namespace",
      textKey: "text",
    });

    for (const file of files) {
      const loader = new PDFLoader(path.join(pdfsDir, file));
      const loadedDocs = await loader.load();
      const splitDocs = await splitter.splitDocuments(loadedDocs);
      await pineconeStore.addDocuments(splitDocs);
      console.log(`Seeded ${file} to Pinecone DB.`);
    }
    console.log("All PDFs seeded to Pinecone DB successfully.");
}

main().catch((err) => {
  console.error("Error seeding PDFs to Pinecone DB:", err);
});
