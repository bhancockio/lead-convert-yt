import { Lead, LeadMagnet } from "@prisma/client";
import React from "react";
import LeadsTable from "./LeadsTable";

interface LeadsContainerProps {
  leadMagnet: LeadMagnet;
  leads: Lead[];
}

function LeadsContainer({ leadMagnet, leads }: LeadsContainerProps) {
  return (
    <div className="p-6 w-full lg:max-w-5xl lg:mx-auto">
      <div className="flex  flex-row justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">{leadMagnet.publishedTitle}</h2>
        <span className="text-xl font-bold text-purple-500">
          {leads.length} Leads
        </span>
      </div>

      <LeadsTable leads={leads} />
    </div>
  );
}

export default LeadsContainer;
