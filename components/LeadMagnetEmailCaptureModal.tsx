import React, { Dispatch, SetStateAction } from "react";
import LeadMagnetEmailCapturePreview from "./LeadMagnetEmailCapturePreview";

interface LeadMagnetEmailCaptureModalProps {
  leadMagnetId: string;
  emailCapturePrompt: string;
  setHasCapturedUserInfo: Dispatch<SetStateAction<boolean>>;
  setShowEmailCaptureModal: Dispatch<SetStateAction<boolean>>;
}

function LeadMagnetEmailCaptureModal({
  setShowEmailCaptureModal,
  emailCapturePrompt,
  leadMagnetId,
  setHasCapturedUserInfo,
}: LeadMagnetEmailCaptureModalProps) {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center bg-black/20">
        <div className="transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-2xl sm:w-full sm:max-w-lg sm:p-6">
          <button
            onClick={() => setShowEmailCaptureModal(false)}
            className="absolute right-2 top-2 text-2xl"
          >
            &times;
          </button>
          <LeadMagnetEmailCapturePreview
            emailCapturePrompt={emailCapturePrompt}
            leadMagnetId={leadMagnetId}
            setHasCapturedUserInfo={setHasCapturedUserInfo}
            setShowEmailCaptureModal={setShowEmailCaptureModal}
          />
        </div>
      </div>
    </div>
  );
}

export default LeadMagnetEmailCaptureModal;
