// Use the new, universal stream handler from the core 'ai' package
import { NextResponse } from "next/server"
import { Pinecone } from "@pinecone-database/pinecone"
import { PineconeStore } from "@langchain/pinecone"
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"
import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from "@langchain/core/output_parsers"
import type { Document } from "@langchain/core/documents"
import { HumanMessage, AIMessage, type BaseMessage } from "@langchain/core/messages"
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf"

// --- Define types for clarity ---
type IncomingChatMessage = {
  role: "user" | "assistant"
  content: string
}

type RequestBody = {
  messages: IncomingChatMessage[]
}

// --- Helper function to format messages for LangChain ---
const formatMessage = (message: IncomingChatMessage): BaseMessage => {
  return message.role === "user" ? new HumanMessage(message.content) : new AIMessage(message.content)
}

export async function POST(req: Request) {
  try {
    const { messages }: RequestBody = await req.json()
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 })
    }

    // --- 1. Initialize Clients ---
    const llm = new ChatOpenAI({
      apiKey: process.env.OPENROUTER_API_KEY!,
      modelName: "openai/gpt-oss-120b",
      configuration: { baseURL: "https://openrouter.ai/api/v1" },
    })

    const embeddings = new HuggingFaceInferenceEmbeddings({ apiKey: process.env.HF_TOKEN!,
      model: "BAAI/bge-base-en-v1.5",
      provider: "hf-inference",
     })
    const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! })
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!)

    // --- 2. Prepare Data ---
    const currentMessageContent = messages[messages.length - 1].content
    const previousMessages = messages.slice(0, -1).map(formatMessage)
    const chatHistoryString = previousMessages
      .map((msg) => (msg._getType() === "human" ? `User: ${msg.content}` : `Assistant: ${msg.content}`))
      .join("\n")

    // --- 3. Retrieve Context from Vector Store ---
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      namespace: "pdf-namespace",
    })
    const retriever = vectorStore.asRetriever({ k: 5 })
    const relevantDocs = await retriever.getRelevantDocuments(currentMessageContent)
    const context = relevantDocs.map((doc: Document) => doc.pageContent).join("\n\n")

    // --- 4. Define the Full Prompt Template ---
    const TEMPLATE = `
      You are an expert mental health AI assistant. Always follow an empathetic and supportive tone.
      Use the following pieces of context to answer the question at the end. If the context is not relevant, rely on the chat history.
      
      Guidelines for your response:
      1. Be specific and extract information directly from the context provided.
      2. Keep your response focused and to the point.
      3. Format lists with bullet points for better      3. Try to answer in list with bullet points for better readability. We are already using markdown library to show the message so always use markdown syntax.
      4. Use empathetic language and validate the user's feelings.
      5ords unless explicitly asked for more detail.
      5. If you don't know the answer, just say you don't6know, don't try to make up an answer.
      6. If the context provided is not relevant to menta7 health, politely inform the user that you can only assist with mental health related queries.
      
      ----------------
      CONTEXT: {context}
      ----------------
      CHAT HISTORY:
      {chat_history}
      ----------------
      USER'S QUESTION: {question}
      ----------------
      
      Response:`

    const prompt = PromptTemplate.fromTemplate(TEMPLATE)

    // --- 5. Create the Chain and STREAM the response ---
    const chain = prompt.pipe(llm).pipe(new StringOutputParser())

    const stream = await chain.stream({
      context: context,
      chat_history: chatHistoryString,
      question: currentMessageContent,
    })

    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            controller.enqueue(encoder.encode(chunk))
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    })
  } catch (err) {
    let errorMsg = "Unknown error"
    if (err instanceof Error) {
      errorMsg = err.message
    }
    console.error("API Error:", err)
    return NextResponse.json({ error: errorMsg }, { status: 500 })
  }
}
