import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lead } from "@prisma/client";
import React from "react";
import dayjs from "dayjs";

function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg">Name</TableHead>
            <TableHead className="text-lg">Email</TableHead>
            <TableHead className="text-lg">Signup Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>
                {dayjs(lead.createdAt).format("MM-DD-YYYY")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {leads.length === 0 && (
        <div className="text-center m-5 font-bold">No Leads Found</div>
      )}
    </>
  );
}

export default LeadsTable;
