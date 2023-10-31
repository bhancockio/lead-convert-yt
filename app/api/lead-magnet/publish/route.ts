import { prismadb } from "@/lib/prismadb";
import { slugifyLeadMagnet } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const leadMagnetPublishRequest = z.object({
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
    leadMagnetPublishRequest.safeParse(requestBody);

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

  const publishedLeadMagnet = await prismadb.leadMagnet.update({
    where: {
      id: publishRequest.id,
    },
    data: {
      ...leadMagnet,
      publishedBody: leadMagnet.draftBody,
      publishedPrompt: leadMagnet.draftPrompt,
      publishedTitle: leadMagnet.draftTitle,
      publishedSubtitle: leadMagnet.draftSubtitle,
      publishedFirstQuestion: leadMagnet.draftFirstQuestion,
      publishedEmailCapture: leadMagnet.draftEmailCapture,
      updatedAt: new Date(),
      status: "published",
      publishedAt: new Date(),
      slug: leadMagnet.slug ?? slugifyLeadMagnet(leadMagnet.draftTitle),
    },
  });

  return NextResponse.json({
    message: "Successfully published lead magnet!",
    data: publishedLeadMagnet,
    success: true,
  });
}
