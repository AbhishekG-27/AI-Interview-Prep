import { Interviewer } from "@/components/Interviewer";
import { config } from "@/lib/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/lib/generated/prisma";
import InterviewAnalysis from "@/components/InterviewAnalysis";
import { AlertCircle } from "lucide-react";

const prisma = new PrismaClient();

const Interview = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const session = await getServerSession();
  if (!session) {
    return redirect("/sign-in");
  }

  const questions = await prisma.interview.findUnique({
    where: { id: id },
    select: {
      questions: true,
      isCompleted: true,
      interviewAnalysis: true,
    },
  });

  if (!questions) {
    return redirect("/my-interviews");
  }

  if (questions.isCompleted) {
    if (questions.interviewAnalysis && questions.interviewAnalysis.trim() !== "") {
      return (
        <div className="mt-16">
          <InterviewAnalysis analysis={questions.interviewAnalysis} />
        </div>
      );
    } else {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-16">
          <div className="max-w-md mx-auto text-center space-y-4 p-6">
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Analysis Pending</h2>
            <p className="text-gray-600">
              Your interview is completed but the analysis is still being processed. 
              Please check back in a few minutes.
            </p>
            <a
              href={`/interview/${id}`}
              className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Refresh Page
            </a>
          </div>
        </div>
      );
    }
  }

  const agent_id = config.interview_agent_id;
  return (
    <div className="mt-16">
      <Interviewer
        interview_id={id}
        interview_agent_id={agent_id}
        questions={questions.questions.join(", ")}
        username={session?.user?.name || "Candidate"}
      />
    </div>
  );
};

export default Interview;
