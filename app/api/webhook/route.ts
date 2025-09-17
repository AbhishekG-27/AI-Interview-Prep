import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { PrismaClient } from "@/lib/generated/prisma";
import { getServerSession } from "next-auth";
import { GenerateQuestions } from "@/lib/utils";

const secret = process.env.WEBHOOK_SECRET!;
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const headers = req.headers.get("ElevenLabs-Signature")?.split(",");
  const body = await req.json();

  const session = await getServerSession();
  const email = session?.user?.email;

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
  const { level, role, tech_stack, amount } = body.data.analysis;

  const questions = await GenerateQuestions({
    role,
    level,
    techstack: tech_stack,
    type: "mixed (behavioural and technical)",
    amount,
  });

  if (!questions) {
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }

  const response = await prisma.user.update({
    where: { email: email! },
    data: {
      Interview: {
        create: {
          level: level,
          role: role,
          techStack: tech_stack,
          amount: amount,
          questions: JSON.parse(questions),
        },
      },
    },
  });

  if (!response) {
    return NextResponse.json(
      { error: "Failed to update user with interview data" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
