import { Conversation } from "@/components/Conversation";
import { config } from "@/lib/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Interview = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const session = await getServerSession();
  if (!session) {
    return redirect("/sign-in");
  }
  const agent_id = config.interview_agent_id;
  return (
    <div className="mt-20">
      <Conversation
        interview_agent_id={agent_id}
        questions="What is ReactJs?"
      />
    </div>
  );
};

export default Interview;
