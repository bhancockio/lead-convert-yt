import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface LeadMagnetEmailCapturePreviewProps {
  leadMagnetId: string;
  emailCapturePrompt: string;
  setHasCapturedUserInfo?: Dispatch<SetStateAction<boolean>>;
  setShowEmailCaptureModal?: Dispatch<SetStateAction<boolean>>;
}

function LeadMagnetEmailCapturePreview({
  emailCapturePrompt,
  leadMagnetId,
  setHasCapturedUserInfo,
  setShowEmailCaptureModal,
}: LeadMagnetEmailCapturePreviewProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isCreatingLead, setIsCreatingLead] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsCreatingLead(true);
    axios
      .post("/api/lead", { name, email, leadMagnetId })
      .then(() => {
        setHasCapturedUserInfo && setHasCapturedUserInfo(true);
        setShowEmailCaptureModal && setShowEmailCaptureModal(false);
        toast.success("You have successfully signed up!");
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsCreatingLead(false);
      });
  };

  return (
    <div className="mt-3 text-center sm:mt-5">
      <h3 className="mb-6 text-xl font-normal leading-6 text-gray-900">
        {emailCapturePrompt}
      </h3>
      <div className="mt-2">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-3 mt-1 w-full rounded-md border border-gray-300 px-3 py-4"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-4"
          />
          <button
            type="submit"
            disabled={email.indexOf("@") === -1 || name === ""}
            className={`mt-4 rounded-lg border-2 border-purple-500 bg-white px-6 py-3 text-lg font-semibold text-purple-500 hover:border-white hover:bg-purple-500 hover:text-white ${
              email.indexOf("@") === -1 || name === ""
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
          >
            {isCreatingLead ? "Signing up" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LeadMagnetEmailCapturePreview;
