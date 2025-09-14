import { config } from "@/lib/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/realtime/client_secrets",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.openai_api_key}`,
        },
        body: JSON.stringify({
          session: {
            type: "realtime",
            model: "gpt-realtime",
          },
        }),
      }
    );
    const { value } = await response.json();
    return NextResponse.json({ token: value });
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
