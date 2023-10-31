import LeadMagnetAIChatContainer from "@/components/LeadMagnetAIChatContainer";
import LeadMagnetNotFound from "@/components/LeadMagnetNotFound";
import { prismadb } from "@/lib/prismadb";
import React from "react";
import LeadMagnetView from "./components/LeadMagnetView";
import { Metadata } from "next";

interface LeadMagnetPageProps {
  params: {
    username: string;
    leadMagnetSlug: string;
  };
}

export async function generateMetadata({
  params,
}: LeadMagnetPageProps): Promise<Metadata> {
  const account = await prismadb.account.findUnique({
    where: { username: params.username },
  });

  let title = "LeadConvert.ai";
  let description =
    "LeadConvert helps creators turn regular content into interactive AI experiences, effortlessly capturing leads, and nurturing them towards your digital products or courses.";
  let openGraphImage;

  if (account) {
    const leadMagnet = await prismadb.leadMagnet.findFirst({
      where: {
        userId: account.userId,
        slug: params.leadMagnetSlug,
        status: "published",
      },
    });
    if (leadMagnet) {
      title = leadMagnet.publishedTitle;
      description = leadMagnet.publishedSubtitle;
      openGraphImage = {
        url: `https://image.thum.io/get/auth/${
          process.env.SCREENSHOT_ACCESS_KEY ?? ""
        }/width/1200/crop/700/https://www.leadconvert.ai/lm/${
          account.username
        }/${leadMagnet.slug}`,
        width: 4096,
        height: 4096,
        alt: "Lead Magnet Preview",
      };
    }
  }

  return {
    title,
    openGraph: {
      images: openGraphImage ? [openGraphImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      site: "@bhancock_ai",
      title: title,
      description: description,
      images: openGraphImage,
    },
  };
}

async function LeadMagnetPage({ params }: LeadMagnetPageProps) {
  console.log("params", params);

  if (!params.username || !params.leadMagnetSlug) {
    return <LeadMagnetNotFound returnLink="/" />;
  }

  const account = await prismadb.account.findUnique({
    where: { username: params.username },
  });

  if (!account) {
    return <LeadMagnetNotFound returnLink="/" />;
  }

  const fetchProfile = prismadb.profile.findFirst({
    where: { userId: account.userId },
  });

  const fetchLeadMagnet = prismadb.leadMagnet.findFirst({
    where: {
      userId: account.userId,
      slug: params.leadMagnetSlug,
    },
  });

  const [profile, leadMagnet] = await Promise.all([
    fetchProfile,
    fetchLeadMagnet,
  ]);

  if (!leadMagnet || !profile) {
    return <LeadMagnetNotFound returnLink="/" />;
  }

  return (
    <div className="ai-dotted-pattern flex w-screen flex-col justify-between p-6 md:max-h-screen min-h-screen md:flex-row md:p-8 lg:p-12">
      <LeadMagnetView leadMagnet={leadMagnet} profile={profile} />
      <div
        id="ai-chat"
        className="mb-10 flex max-h-[85vh] flex-1 flex-col rounded-lg bg-white p-4 shadow-lg md:mb-0 md:ml-4 md:overflow-y-scroll md:p-8"
      >
        <LeadMagnetAIChatContainer
          emailCapturePrompt={leadMagnet.publishedEmailCapture}
          leadMagnetId={leadMagnet.id}
          firstQuestion={leadMagnet.publishedFirstQuestion}
          prompt={leadMagnet.publishedPrompt}
          captureEmail={true}
        />
      </div>
    </div>
  );
}

export default LeadMagnetPage;
