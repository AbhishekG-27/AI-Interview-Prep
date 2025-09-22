import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";
import { PrismaClient } from "@/lib/generated/prisma";
// import { getServerSession } from "next-auth";
import { GenerateQuestions } from "@/lib/utils";

// const secret = process.env.WEBHOOK_SECRET!;
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { level, user_id, role, techstack, amount } = body;

  const questions = await GenerateQuestions({
    role,
    level,
    techstack: techstack,
    type: "mixed (behavioural and technical)",
    amount,
  });

  if (!questions) {
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }

  // Log the generated questions and body data for debugging
  console.log({ level, role, techstack, amount, questions });

  const response = await prisma.user.update({
    where: { email: user_id! },
    data: {
      Interview: {
        create: {
          level: level,
          role: role,
          techStack: techstack,
          amount: parseInt(amount),
          questions: JSON.parse(questions),
        },
      },
      interviewsLeft: {
        decrement: 1,
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
