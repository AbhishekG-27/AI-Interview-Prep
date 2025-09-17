/*
  Warnings:

  - Added the required column `amount` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Interview" ADD COLUMN     "amount" INTEGER NOT NULL,
ALTER COLUMN "questions" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "techStack" SET DEFAULT ARRAY[]::TEXT[];
