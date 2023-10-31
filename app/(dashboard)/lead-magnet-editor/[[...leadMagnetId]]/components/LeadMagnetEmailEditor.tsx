import LeadMagnetEmailCapturePreview from "@/components/LeadMagnetEmailCapturePreview";
import { useLeadMagnetEditorContext } from "@/context/LeadMagnetEditorContex";
import React from "react";

function LeadMagnetEmailEditor() {
  const { edittedLeadMagnet, setEdittedLeadMagnet } =
    useLeadMagnetEditorContext();

  return (
    <div className="flex h-full flex-row border-t-2 border-gray-200">
      <div className="m-8 flex w-1/2 flex-col">
        <h1 className="mb-4 text-3xl font-bold text-purple-500">
          Email Capture Editor
        </h1>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Email Capture Prompt
          </label>
          <input
            type="text"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            value={edittedLeadMagnet.draftEmailCapture}
            onChange={(e) =>
              setEdittedLeadMagnet((prev) => ({
                ...prev,
                draftEmailCapture: e.target.value,
              }))
            }
            placeholder="How to ask users for their email to chat with the AI?"
          />
        </div>
      </div>
      <div className="purple-dotted-pattern flex w-1/2 flex-col">
        <div className="mx-12 my-8 flex max-w-lg rounded-lg bg-white p-4 shadow-lg lg:mx-auto">
          <LeadMagnetEmailCapturePreview
            leadMagnetId={edittedLeadMagnet.id}
            emailCapturePrompt={edittedLeadMagnet.draftEmailCapture}
          />
        </div>
      </div>
    </div>
  );
}

export default LeadMagnetEmailEditor;
