import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { TEMPLATE } from "@/utils/constants";

export function createLLM() {
  return new ChatOpenAI({
    apiKey: process.env.OPENROUTER_API_KEY!,
    modelName: "openai/gpt-oss-120b",
    configuration: { baseURL: "https://openrouter.ai/api/v1" },
  });
}

export function createPrompt() {
  return PromptTemplate.fromTemplate(TEMPLATE);
}

export function createChain(llm = createLLM()) {
  const prompt = createPrompt();
  return prompt.pipe(llm).pipe(new StringOutputParser());
}

// Title generation
const TITLE_TEMPLATE = `You are an assistant that generates concise chat titles.
Rules:
- Base the title ONLY on the provided first user message.
- Keep it short, natural, and human-friendly (ideally 3–7 words).
- Max 60 characters.
- No quotes or surrounding punctuation.
- Title Case if it reads better; avoid trailing periods.

First message:
"""
{text}
"""

Return only the title text.`;

export async function generateTitleFromMessage(text: string): Promise<string> {
  const llm = createLLM();
  const prompt = PromptTemplate.fromTemplate(TITLE_TEMPLATE);
  const chain = prompt.pipe(llm).pipe(new StringOutputParser());
  try {
    const raw = await chain.invoke({ text });
    let title = (raw ?? "").trim();
    // Sanitize and cap
    title = title
      .replaceAll("\n", " ")
      .replaceAll('"', "")
      .replaceAll("'", "")
      .trim();
    if (title.length > 60) title = title.slice(0, 60).trim();
    // Fallback if model returned empty
    if (!title) {
      const fallback = text.trim().replace(/\s+/g, " ");
      return fallback.length > 60 ? fallback.slice(0, 60).trim() : fallback;
    }
    return title;
  } catch {
    const fallback = text.trim().replace(/\s+/g, " ");
    return fallback.length > 60 ? fallback.slice(0, 60).trim() : fallback;
  }
}
