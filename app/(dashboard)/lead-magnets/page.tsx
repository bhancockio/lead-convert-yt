import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import React from "react";
import LeadMagnetsContainer from "./components/LeadMagnetsContainer";

const getLeadMagnets = async (userId: string) => {
  try {
    const leadMagnets = await prismadb.leadMagnet.findMany({
      where: { userId },
    });

    return leadMagnets;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getLeads = async (userId: string) => {
  try {
    const leads = await prismadb.lead.findMany({
      where: { userId },
    });

    return leads;
  } catch (error) {
    console.error(error);
    return [];
  }
};

async function LeadMagnetsPage() {
  const { userId } = auth();

  console.log("userId", userId);

  if (!userId) return <div>No user found...</div>;

  const leadMagnetsRequest = getLeadMagnets(userId);
  const leadsRequest = getLeads(userId);

  const [leadMagnets, leads] = await Promise.all([
    leadMagnetsRequest,
    leadsRequest,
  ]);

  console.log("leadMagnets", leadMagnets);
  console.log("leads", leads);

  return <LeadMagnetsContainer leadMagnets={leadMagnets} leads={leads} />;
}

export default LeadMagnetsPage;
