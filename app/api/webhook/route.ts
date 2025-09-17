import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const secret = process.env.WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const headers = req.headers.get("ElevenLabs-Signature")?.split(",");
  const body = await req.json();

  if (!headers || headers.length < 2) {
    return NextResponse.json(
      { error: "Missing signature headers" },
      { status: 400 }
    );
  }

  const timestamp = headers?.find((e) => e.startsWith("t="))?.substring(2);
  const signature = headers?.find((e) => e.startsWith("v0="));
  if (!timestamp || !signature) {
    return NextResponse.json(
      { error: "Missing signature headers" },
      { status: 400 }
    );
  }

  // Validate timestamp
  const reqTimestamp = parseInt(timestamp) * 1000;
  const tolerance = Date.now() - 30 * 60 * 1000;

  if (reqTimestamp < tolerance) {
    return NextResponse.json({ error: "Request expired" }, { status: 403 });
  } else {
    // Validate hash
    const message = `${timestamp}.${body}`;
    const digest =
      "v0=" + crypto.createHmac("sha256", secret).update(message).digest("hex");
    if (signature !== digest) {
      return NextResponse.json(
        { error: "Request unauthorized" },
        { status: 401 }
      );
    }
  }

  // Authentication successful (proceed)
  const analysisData = body.data.analysis;

  console.log("Analysis Data:", analysisData);

  return NextResponse.json({ received: true }, { status: 200 });
}
