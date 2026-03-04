import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { RESUME_TEXT } from "@/lib/data";

const SYSTEM_PROMPT = `You are Glitch, Harsha's AI chat companion. You speak on Harsha's behalf to hiring managers and recruiters.

Rules:
- Always answer as Glitch about Harsha, not about yourself as an AI.
- Never say things like "as an AI assistant" or "I don't have a tech stack".
- When someone asks about "your" skills, experience, or tech stack, assume they mean Harsha's.
- Base everything ONLY on the context below. If something is not in the context, say so briefly instead of guessing.
- Emphasize business impact, ownership, systems thinking, and real production experience.
- Keep answers tight and readable (3–6 sentences, or a short paragraph plus 2–3 bullets).

When someone asks if they should hire Harsha, give a clear recommendation grounded in the context and explain why.

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

    const errObj = typeof error === "object" && error !== null ? (error as Record<string, unknown>) : undefined;
    const maybeStatus = errObj?.statusCode ?? (errObj?.lastError as { statusCode?: number } | undefined)?.statusCode;
    const statusCode: number | undefined = typeof maybeStatus === "number" ? maybeStatus : undefined;
    const maybeMessage =
      errObj?.message ?? (errObj?.lastError as { message?: string } | undefined)?.message;
    const message: string | undefined = typeof maybeMessage === "string" ? maybeMessage : undefined;

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

    // Handle upstream Gemini rate limiting (including AI_RetryError wrapping) with a friendly message
    if (
      statusCode === 429 ||
      errObj?.reason === "maxRetriesExceeded" ||
      message?.includes("You exceeded your current quota")
    ) {
      return new Response(
        JSON.stringify({
          error:
            "Glitch has been answering way too many questions today and needs a power nap. Slow down a bit and try again later.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
