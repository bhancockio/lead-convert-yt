import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { object, string } from "zod";

const createLeadRequestSchema = object({
  name: string(),
  email: string(),
  leadMagnetId: string(),
});

export async function POST(request: Request) {
  const requestBody = await request.json();
  const parsedRequest = createLeadRequestSchema.safeParse(requestBody);

  if (!parsedRequest.success) {
    return NextResponse.json({ message: parsedRequest.error }, { status: 400 });
  }

  const leadMagnet = await prismadb.leadMagnet.findUnique({
    where: {
      id: parsedRequest.data.leadMagnetId,
    },
  });

  if (!leadMagnet) {
    return NextResponse.json(
      { message: "Lead magnet not found" },
      { status: 404 }
    );
  }

  await prismadb.lead.create({
    data: {
      email: parsedRequest.data.email,
      name: parsedRequest.data.name,
      leadMagnetId: parsedRequest.data.leadMagnetId,
      userId: leadMagnet.userId,
    },
  });

  return NextResponse.json({ message: "Lead created" }, { status: 200 });
}
