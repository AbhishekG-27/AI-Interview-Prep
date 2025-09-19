import UserInterviews from "@/components/UserInterviews";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/lib/generated/prisma";

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
    return <div>No interviews found.</div>;
  }

  return (
    <div className="mt-16">
      <UserInterviews interviews={interviews.Interview} />
    </div>
  );
};

export default MyInterviews;
