-- AlterTable
ALTER TABLE "public"."Interview" ADD COLUMN     "interviewAnalysis" TEXT DEFAULT '',
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;
