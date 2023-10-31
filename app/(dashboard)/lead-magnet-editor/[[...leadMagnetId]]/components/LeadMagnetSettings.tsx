import { useLeadMagnetEditorContext } from "@/context/LeadMagnetEditorContex";
import { slugifyLeadMagnet } from "@/lib/utils";
import React from "react";

function LeadMagnetSettings() {
  const { edittedLeadMagnet, setEdittedLeadMagnet } =
    useLeadMagnetEditorContext();

  return (
    <div className="flex h-full flex-row w-full">
      <div className="m-8 flex w-full h-full flex-col">
        <h1 className="mb-4 text-3xl font-bold text-purple-500">
          Lead Magnet Settings
        </h1>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Slug
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            value={
              edittedLeadMagnet.slug ??
              slugifyLeadMagnet(edittedLeadMagnet.draftTitle)
            }
            onChange={(e) => {
              const newSlug = slugifyLeadMagnet(e.target.value);

              setEdittedLeadMagnet((prev) => ({
                ...prev,
                slug: newSlug,
              }));
            }}
            placeholder="What is the title of your lead magnet?"
          />
          <p className="mt-2 text-sm text-gray-500">
            Slug can only contain numbers, letters, and -
          </p>
        </div>
      </div>
    </div>
  );
}

export default LeadMagnetSettings;
