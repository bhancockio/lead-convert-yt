import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { generateFromEmail } from "unique-username-generator";
import { object, string } from "zod";

export async function PUT(request: Request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const requestBody = await request.json();
  const usernameSchema = object({
    username: string()
      .min(3, { message: "A username must be at least 3 characters long." })
      .max(20, { message: "A username must be 20 characters or less." }),
  });

  const parsed = usernameSchema.safeParse(requestBody);

  if (!parsed.success) {
    return NextResponse.json({
      message: JSON.parse(parsed.error.message)[0],
      success: false,
      data: null,
    });
  }

  const newUsername = parsed.data.username;

  const existingAccount = await prismadb.account.findFirst({
    where: {
      username: newUsername,
    },
  });

  if (existingAccount) {
    return NextResponse.json({
      message: "Username already exists",
      success: false,
      data: null,
    });
  }

  const account = await prismadb.account.update({
    where: {
      userId: user.id,
    },
    data: {
      username: newUsername,
    },
  });

  return NextResponse.json({
    message: "Username updated",
    success: true,
    data: account,
  });
}

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  let account = await prismadb.account.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!account) {
    const baseEmail = user.emailAddresses[0].emailAddress;
    account = await prismadb.account.create({
      data: {
        userId: user.id,
        email: baseEmail,
        username: generateFromEmail(baseEmail, 3),
      },
    });
  }

  return NextResponse.json(
    {
      message: "Account found",
      success: true,
      data: account,
    },
    { status: 200 }
  );
}
