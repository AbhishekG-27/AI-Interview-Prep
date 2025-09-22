import { InterviewPrepAgent } from "@/components/InterviewPrepAgent";
import { config } from "@/lib/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/lib/generated/prisma";
import Link from "next/link";
import { Zap } from "lucide-react";

const prisma = new PrismaClient();

const Createinterview = async () => {
  const session = await getServerSession();
  if (!session) {
    return redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
    select: {
      interviewsLeft: true,
    },
  });

  if ((user?.interviewsLeft || 0) <= 0) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No Interviews Left
          </h1>
          <p className="text-gray-400 mb-6">
            You&apos;ve used all your available interviews. Upgrade your plan to
            continue practicing and improving your skills.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
          >
            Upgrade Plan {<Zap className="ml-2 h-5 w-5" />}
          </Link>
        </div>
      </div>
    );
  }
  const agent_id = config.question_agent_id;
  return (
    <div className="mt-16">
      <InterviewPrepAgent
        interview_agent_id={agent_id}
        username={session?.user?.email || "User"}
      />
    </div>
  );
};

export default Createinterview;
