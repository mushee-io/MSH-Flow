import { NextResponse } from "next/server";
import { TOOL_PRICING, ToolKey } from "@/lib/config";

const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

type RunBody = {
  tool?: ToolKey;
  input?: string;
  instruction?: string;
  txHash?: string;
  amount?: string;
  wallet?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RunBody;
    const { tool, input, instruction, txHash, amount, wallet } = body;

    if (!tool || !(tool in TOOL_PRICING)) {
      return NextResponse.json({ error: "Invalid tool." }, { status: 400 });
    }
    if (!input?.trim()) {
      return NextResponse.json({ error: "Input is required." }, { status: 400 });
    }
    if (!txHash) {
      return NextResponse.json({ error: "Payment transaction hash is required before execution." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        error: "GEMINI_API_KEY is missing.",
      }, { status: 500 });
    }

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${instruction || "Help the user with the request."}\n\nUser input:\n${input}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.5,
      },
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "Gemini request failed.", details: data },
        { status: response.status }
      );
    }

    const output = data?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || "").join("\n").trim();

    return NextResponse.json({
      ok: true,
      output: output || "No result returned.",
      meta: {
        txHash,
        wallet,
        amount,
        tool,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown server error." },
      { status: 500 }
    );
  }
}
