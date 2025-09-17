import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

// check if the user exists in the database and compare the password (sign-in) flow
export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, password } = reqBody;

  // find the user in the database
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // compare the password
  if (user.password !== password) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  return NextResponse.json(
    { message: "User authenticated", user: user },
    { status: 200 }
  );
}
