import LeadMagnetAIChatContainer from "@/components/LeadMagnetAIChatContainer";
import { useLeadMagnetEditorContext } from "@/context/LeadMagnetEditorContex";
import React from "react";

function LeadMagnetPromptEditor() {
  const { edittedLeadMagnet, setEdittedLeadMagnet } =
    useLeadMagnetEditorContext();

  return (
    <div className="flex h-full flex-row">
      <div className="m-8 flex w-1/2 flex-col">
        <h1 className="mb-4 w-fit bg-gradient-to-r from-red-400 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
          AI Prompt Editor
        </h1>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Prompt
          </label>
          <textarea
            value={edittedLeadMagnet.draftPrompt}
            placeholder="Type in your Prompt Engineering here..."
            rows={15}
            onChange={(e) =>
              setEdittedLeadMagnet((prev) => ({
                ...prev,
                draftPrompt: e.target.value,
              }))
            }
            className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            First Question in Chat
          </label>
          <textarea
            placeholder="What is the subtitle of your lead magnet?"
            rows={2}
            className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            value={edittedLeadMagnet.draftFirstQuestion}
            onChange={(e) =>
              setEdittedLeadMagnet((prev) => ({
                ...prev,
                draftFirstQuestion: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className="ai-dotted-pattern flex w-1/2 flex-col">
        <div className="mx-12 my-8 flex max-w-lg rounded-lg bg-white p-4 shadow-lg lg:mx-auto">
          <LeadMagnetAIChatContainer
            leadMagnetId={edittedLeadMagnet.id}
            emailCapturePrompt={edittedLeadMagnet.draftEmailCapture}
            firstQuestion={edittedLeadMagnet.draftFirstQuestion}
            prompt={edittedLeadMagnet.draftPrompt}
            captureEmail={false}
          />
        </div>
      </div>
    </div>
  );
}

export default LeadMagnetPromptEditor;
