import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_BASE =
  Deno.env.get("GEMINI_API_BASE") ??
  "https://generativelanguage.googleapis.com/v1beta";
const GEMINI_MODEL = Deno.env.get("GEMINI_MODEL") ?? "gemini-1.5-pro";

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }

  try {
    const { sender, subject, body, tone } = await req.json() as {
      sender?: string;
      subject?: string;
      body?: string;
      tone?: string;
    };

    if (!GEMINI_API_KEY) {
      throw new Error(
        "GEMINI_API_KEY is not set in the function environment variables",
      );
    }

    const safeSender = sender?.trim() || "Unknown sender";
    const safeSubject = subject?.trim() || "No subject";
    const safeBody = body?.trim() || "No email body provided.";
    const safeTone = tone?.trim() || "neutral";

    const prompt = `
You are an AI assistant that writes high-quality email replies.

Requirements:
- Match the requested tone: \`${safeTone}\`.
- Be clear, concise, and professional.
- Preserve important details from the original email.
- Do NOT invent facts that are not in the thread.
- Return only the email body (no explanations, no quotes of the prompt).

Sender: ${safeSender}
Subject: ${safeSubject}

Email thread:
${safeBody}

Write a reply email in a ${safeTone} tone.
Return only the reply text that the user can send back.
    `.trim();

    const payload = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
      },
    };

    const url =
      `${GEMINI_API_BASE}/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent?key=${GEMINI_API_KEY}`;

    const aiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("Gemini API error:", aiResponse.status, errorText);

      return new Response(
        JSON.stringify({
          error: "Failed to generate reply from Gemini",
          status: aiResponse.status,
          details: errorText,
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    const data = await aiResponse.json();

    const reply =
      (data?.candidates?.[0]?.content?.parts ?? [])
        .map((p: { text?: string }) => p?.text ?? "")
        .join("")
        .trim();

    if (!reply) {
      throw new Error("Gemini returned an empty reply");
    }

    return new Response(
      JSON.stringify({ reply }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error in generate-reply function:", error);

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});
