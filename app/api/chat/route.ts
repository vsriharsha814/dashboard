import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { RESUME_TEXT } from "@/lib/data";

const SYSTEM_PROMPT = `You are Harsha's AI assistant, acting as his advocate to a hiring manager. Based ONLY on the context below, confidently highlight why he is a strong hire: emphasize business impact, ownership, systems thinking, and his fit for real-world production work.

When someone asks if they should hire him, do NOT say you cannot make hiring decisions. Instead:
- Give a clear, positive recommendation grounded in the context.
- Summarize his most impressive achievements with concrete outcomes and metrics.
- Mention the kinds of roles he is a strong fit for (for example: AI engineer, ML engineer, backend/systems engineer).
- Keep answers tight and readable (3–6 sentences, or a short paragraph plus 2–3 bullets).

If a specific fact is not in the context, say so briefly instead of guessing.

Context:
${RESUME_TEXT}`;

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  try {
    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error: unknown) {
    console.error("Error in /api/chat:", error);

    const statusCode = typeof error === "object" && error !== null ? (error as { statusCode?: number }).statusCode : undefined;
    const message =
      typeof error === "object" && error !== null
        ? (error as { message?: string }).message
        : undefined;

    // If the Gemini model is not found, log the list of available models
    if (statusCode === 404 && message?.includes("models/")) {
      try {
        const apiKey =
          process.env.GOOGLE_GENERATIVE_AI_API_KEY ??
          process.env.GOOGLE_API_KEY ??
          process.env.GEMINI_API_KEY;

        if (!apiKey) {
          console.error(
            "Gemini API key is not set (GOOGLE_GENERATIVE_AI_API_KEY / GOOGLE_API_KEY / GEMINI_API_KEY); cannot list models."
          );
        } else {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
          );
          const models = await res.json();
          console.error(
            "Available Gemini models from v1beta/models:",
            JSON.stringify(models, null, 2)
          );
        }
      } catch (listError) {
        console.error("Failed to list Gemini models:", listError);
      }
    }

    return new Response(
      JSON.stringify({
        error: "Chat service is temporarily unavailable. Please try again later.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
