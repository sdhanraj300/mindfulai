import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

export function createEmbeddings() {
  return new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HF_TOKEN!,
    model: "BAAI/bge-base-en-v1.5",
    provider: "hf-inference",
  });
}

export function getPineconeIndex() {
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  return pinecone.Index(process.env.PINECONE_INDEX!);
}

export async function retrieveContext(query: string, k = 5): Promise<string> {
  const embeddings = createEmbeddings();
  const pineconeIndex = getPineconeIndex();
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: "pdf-namespace",
  });
  const retriever = vectorStore.asRetriever({ k });
  const docs = await retriever.getRelevantDocuments(query);
  return docs.map((d) => d.pageContent).join("\n\n");
}
