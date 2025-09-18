import { InterviewPrepAgent } from "@/components/InterviewPrepAgent";
import { config } from "@/lib/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Createinterview = async () => {
  const session = await getServerSession();
  if (!session) {
    return redirect("/sign-in");
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
