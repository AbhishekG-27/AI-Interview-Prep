import { Interviewer } from "@/components/Interviewer";
import { config } from "@/lib/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/lib/generated/prisma";
import InterviewAnalysis from "@/components/InterviewAnalysis";

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
    },
  });

  if (!questions) {
    return redirect("/my-interviews");
  }

  if (questions.isCompleted) {
    return (
      <div className="mt-16">
        <InterviewAnalysis interview_id={id} />
      </div>
    );
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
