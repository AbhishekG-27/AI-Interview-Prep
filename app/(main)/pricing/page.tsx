import { Pricing } from "@/components/Pricing";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

const PricingPage = async () => {
  let currentPlan = null;
  const session = await getServerSession();
  if (session) {
    const email = session.user?.email;
    const user = await prisma.user.findUnique({
      where: { email: email || "" },
      select: { currentPlan: true },
    });
    currentPlan = user?.currentPlan || null;
  }
  return (
    <div className="mt-16">
      <Pricing currentPlan={currentPlan} />
    </div>
  );
};

export default PricingPage;
