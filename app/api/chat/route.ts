import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import { RESUME_TEXT } from "@/lib/data";

const SYSTEM_PROMPT = `You are Harsha's AI assistant. Answer questions about his skills (FastAPI, RAG, Docker, LangChain, agentic AI) and experience based ONLY on the context below. Be professional and concise. If the answer is not in the context, say so briefly.

Context:
${RESUME_TEXT}`;

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
