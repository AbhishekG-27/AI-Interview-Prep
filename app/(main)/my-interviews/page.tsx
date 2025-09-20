import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/lib/generated/prisma";
import InterviewCard from "@/components/InterviewCard";

const prisma = new PrismaClient();

const MyInterviews = async () => {
  // Authenticate the user
  const session = await getServerSession();
  if (!session) {
    return redirect("/sign-in");
  }

  // Get the user interviews using email from the session
  const interviews = await prisma.user.findUnique({
    where: { email: session.user?.email || "" },
    select: {
      Interview: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!interviews) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No interviews found
            </h2>
            <p className="text-gray-600">
              Create your first interview to get started!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Interviews
          </h1>
          <p className="text-gray-600">
            {interviews.Interview.length} interview
            {interviews.Interview.length !== 1 ? "s" : ""} prepared
          </p>
        </div>

        {/* Interview Cards Grid */}
        {interviews.Interview.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {interviews.Interview.map((interview, index) => (
              <div
                key={interview.id}
                className="animate-slideInLeft"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationDuration: "600ms",
                  animationFillMode: "both",
                }}
              >
                <InterviewCard interview={interview} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No interviews yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first interview to start practicing!
            </p>
            <a
              href="/create-interview"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Create Interview
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInterviews;
