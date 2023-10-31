import LeadMagnetNotFound from "@/components/LeadMagnetNotFound";
import { prismadb } from "@/lib/prismadb";
import React from "react";
import LeadsContainer from "./components/LeadsContainer";

const getLeadMagnet = (leadMagnetId: string) => {
  return prismadb.leadMagnet.findUnique({
    where: {
      id: leadMagnetId,
    },
  });
};

const getLeads = (leadMagnetId: string) => {
  return prismadb.lead.findMany({
    where: {
      leadMagnetId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

interface LeadPageProps {
  params: {
    leadMagnetId: string;
  };
}

async function LeadsPage({ params }: LeadPageProps) {
  const leadMagnetId = params.leadMagnetId;

  if (!leadMagnetId) return <LeadMagnetNotFound returnLink="/lead-magnets" />;

  const fetchLeadMagnet = getLeadMagnet(leadMagnetId);
  const fetchLeads = getLeads(leadMagnetId);

  const [leadMagnet, leads] = await Promise.all([fetchLeadMagnet, fetchLeads]);

  if (!leadMagnet) return <LeadMagnetNotFound returnLink="/lead-magnets" />;

  return <LeadsContainer leadMagnet={leadMagnet} leads={leads} />;
}

export default LeadsPage;
