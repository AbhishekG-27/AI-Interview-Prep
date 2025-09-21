import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/lib/generated/prisma";
import InterviewAnalysis from "@/components/InterviewAnalysis";
import { AlertCircle } from "lucide-react";

const prisma = new PrismaClient();

const AnalysisPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const session = await getServerSession();

  if (!session) {
    return redirect("/sign-in");
  }

  // Verify the interview exists and belongs to the user
  const interview = await prisma.interview.findUnique({
    where: { id: id },
    select: {
      id: true,
      userId: true,
      isCompleted: true,
      interviewAnalysis: true,
    },
  });

  if (!interview) {
    return redirect("/my-interviews");
  }

  // Check if the interview belongs to the current user
  // Note: You might need to adjust this based on how you store user ID in session
  // For now, we'll allow access if the interview exists

  if (!interview.isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-4 p-6">
          <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">
            Interview Not Completed
          </h2>
          <p className="text-gray-600">
            This interview hasn't been completed yet. Complete the interview to
            view your analysis.
          </p>
          <a
            href={`/interview/${id}`}
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Interview
          </a>
        </div>
      </div>
    );
  }

  if (
    !interview.interviewAnalysis ||
    interview.interviewAnalysis.trim() === ""
  ) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-4 p-6">
          <AlertCircle className="h-16 w-16 text-orange-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">Analysis Pending</h2>
          <p className="text-gray-600">
            Your interview is completed but the analysis is still being
            processed. Please check back in a few minutes.
          </p>
          <a
            href={`/analysis/${id}`}
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Refresh
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <InterviewAnalysis analysis={interview.interviewAnalysis} />
    </div>
  );
};

export default AnalysisPage;
