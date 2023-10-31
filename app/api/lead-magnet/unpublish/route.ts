import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const leadMagnetUnpublishRequest = z.object({
  id: z.string({ required_error: "Id is required" }),
});

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user || !user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = user.id;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const requestBody = await request.json();
  const parsedPublishedRequest =
    leadMagnetUnpublishRequest.safeParse(requestBody);

  if (!parsedPublishedRequest.success) {
    return NextResponse.json(
      { message: parsedPublishedRequest.error },
      { status: 400 }
    );
  }

  const publishRequest = parsedPublishedRequest.data;

  const leadMagnet = await prismadb.leadMagnet.findUnique({
    where: {
      id: publishRequest.id,
    },
  });

  if (!leadMagnet) {
    return NextResponse.json(
      { message: "Lead magnet not found" },
      { status: 404 }
    );
  }

  const unpublishedLeadMagnet = await prismadb.leadMagnet.update({
    where: {
      id: publishRequest.id,
    },
    data: {
      ...leadMagnet,
      status: "draft",
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(
    {
      message: "Successfully unpublished new lead magnet!",
      data: unpublishedLeadMagnet,
      success: true,
    },
    { status: 201 }
  );
}
