import { Conversation } from "@/components/Conversation";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Interview = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const session = await getServerSession();
  if (!session) {
    return redirect("/sign-in");
  }
  return (
    <div className="mt-20">
      <Conversation questions="What is ReactJs?" />
    </div>
  );
};

export default Interview;
