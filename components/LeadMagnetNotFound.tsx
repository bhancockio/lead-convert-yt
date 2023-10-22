import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

interface LeadMagnetNotFoundProps {
  returnLink: string;
}

function LeadMagnetNotFound({ returnLink }: LeadMagnetNotFoundProps) {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full gap-y-3">
      <h1 className="text-2xl">Lead Magnet Not Found</h1>

      <Link href={returnLink}>
        <Button variant="outline">Go Back</Button>
      </Link>
    </div>
  );
}

export default LeadMagnetNotFound;
