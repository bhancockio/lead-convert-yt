import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { profileCreateRequest, profileUpdateRequest } from "./profile.schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required", data: null },
      { status: 400 }
    );
  }

  let profile = await prismadb.profile.findFirst({ where: { userId } });

  if (!profile) {
    profile = await prismadb.profile.create({
      data: { userId, description: "", profileImageUrl: "", title: "" },
    });
  }

  return NextResponse.json({ message: "Success", data: profile });
}

async function handleRequest(
  request: Request,
  schema: z.ZodType<any, any>,
  isUpdate = false
) {
  const user = await currentUser();

  if (!user || !user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = user.id;

  const requestBody = await request.json();
  const parsed = schema.safeParse(requestBody);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error, data: null },
      { status: 400 }
    );
  }

  if (isUpdate && parsed.data.userId !== userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const data = {
    ...parsed.data,
    userId: userId,
  };

  const updatedProfile = isUpdate
    ? await prismadb.profile.update({ where: { id: data.id }, data })
    : await prismadb.profile.create({ data });

  return NextResponse.json(
    {
      message: "Successfully handled lead magnet change!",
      data: updatedProfile,
    },
    { status: isUpdate ? 200 : 201 }
  );
}

export const POST = (request: Request) =>
  handleRequest(request, profileCreateRequest);
export const PUT = (request: Request) =>
  handleRequest(request, profileUpdateRequest, true);
