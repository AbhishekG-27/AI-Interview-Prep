import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { createFeedback } from "@/lib/utils";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const transcript = JSON.parse(body.transcript);
  const interview_id = body.interview_id;

  console.log("Received interview completion request:", { interview_id, transcript });

  try {
    // find the interview by id
    const interview = await prisma.interview.findUnique({
      where: { id: interview_id },
    });

    if (!interview) {
      return new Response(JSON.stringify({ error: "Interview not found" }), {
        status: 404,
      });
    }

    // get the interview analysis using the transcript
    const feedback = await createFeedback({ transcript });
    if (!feedback.success) {
      return new NextResponse(
        JSON.stringify({ error: "Failed to generate feedback" }),
        { status: 500 }
      );
    }

    // update the interview with the analysis and mark it as completed
    await prisma.interview.update({
      where: { id: interview_id },
      data: {
        isCompleted: true,
        interviewAnalysis: feedback.feedback,
      },
    });

    return NextResponse.json(
      { message: "Interview completed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error completing interview:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to complete interview" }),
      { status: 500 }
    );
  }
}
