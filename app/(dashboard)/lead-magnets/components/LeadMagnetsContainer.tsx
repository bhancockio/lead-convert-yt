"use client";

import { Button } from "@/components/ui/button";
import { Lead, LeadMagnet, Subscription } from "@prisma/client";
import Link from "next/link";
import React from "react";
import LeadMagnetTable from "./LeadMagnetTable";
import { getPayingStatus } from "@/utils/stripe";
import { MAXIMUM_FREE_LEAD_MAGNETS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HiOutlineSparkles } from "react-icons/hi";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LeadMagnetsContainerProps {
  leadMagnets: LeadMagnet[];
  leads: Lead[];
  subscription: Subscription | null;
}

function LeadMagnetsContainer({
  leadMagnets,
  leads,
  subscription,
}: LeadMagnetsContainerProps) {
  const router = useRouter();
  const [upgrading, setUpgrading] = React.useState(false);
  const isActive = getPayingStatus(subscription);

  const isMaxFreeLeadMagnet =
    !isActive && leadMagnets.length >= MAXIMUM_FREE_LEAD_MAGNETS;

  const upgrade = async () => {
    setUpgrading(true);
    try {
      const response = await axios.get("/api/stripe");

      if (response.data.url) {
        router.push(response.data.url);
      } else {
        console.error("Something went wrong with Stripe.");
        toast.error("Something went wrong with Stripe.");
      }
    } catch (error) {
      console.error("Something went wrong with Stripe.");
      toast.error("Something went wrong with Stripe.");
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <div className="p-6 w-full lg:max-w-5xl lg:mx-auto">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Lead Magnets</h2>
        <Button disabled={isMaxFreeLeadMagnet} variant="default">
          <Link href="/lead-magnet-editor">Create</Link>
        </Button>
      </div>

      <LeadMagnetTable leadMagnets={leadMagnets} leads={leads} />

      {!isActive && (
        <div className="flex flex-col w-full mt-8 items-center">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="bg-gradient-to-r from-red-500 to-purple-500 inline-block text-transparent bg-clip-text pb-1 w-fit mx-auto">
                Upgrade To Pro
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
              <p className="font-semibold text-gray-700 mb-2">
                {leadMagnets.length} / {MAXIMUM_FREE_LEAD_MAGNETS} Free Lead
                Magnets Generated
              </p>
              <Button variant="ai" onClick={upgrade}>
                <span className="mr-2">
                  <HiOutlineSparkles />
                </span>
                {upgrading ? "Upgrading..." : "Upgrade"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default LeadMagnetsContainer;
