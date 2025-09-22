-- CreateEnum
CREATE TYPE "public"."Plan" AS ENUM ('free', 'pro');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "currentPlan" "public"."Plan" NOT NULL DEFAULT 'free',
ADD COLUMN     "interviewsLeft" INTEGER NOT NULL DEFAULT 1;
