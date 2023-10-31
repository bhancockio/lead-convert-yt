import { useSession } from "@clerk/nextjs";
import { LeadMagnet } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { toast } from "react-hot-toast";

interface LeadMagnetEditorContextState {
  edittedLeadMagnet: LeadMagnet;
  setEdittedLeadMagnet: Dispatch<SetStateAction<LeadMagnet>>;
  save: () => Promise<void>;
  publish: () => Promise<void>;
  unpublish: () => Promise<void>;
  remove: () => Promise<void>;
}

const LeadMagnetEditorContext =
  createContext<LeadMagnetEditorContextState | null>(null);

export const LeadMagnetEditorContextProvider = ({
  children,
  leadMagnet,
}: {
  children: ReactNode;
  leadMagnet: LeadMagnet;
}) => {
  const { session } = useSession();
  const { replace, push } = useRouter();

  const [edittedLeadMagnet, setEdittedLeadMagnet] =
    useState<LeadMagnet>(leadMagnet);

  if (!session) {
    throw new Error("No session found");
  }

  const save = async () => {
    try {
      const response = await axios.request({
        url: "/api/lead-magnet",
        method: edittedLeadMagnet.id ? "PUT" : "POST",
        data: {
          ...edittedLeadMagnet,
          userId: session.user.id,
        },
      });

      if (response.data.data) {
        toast.success("Lead Magnet saved successfully");
      }
    } catch (error) {
      toast.error("Failed to save Lead Magnet");
    }
  };

  const publish = async () => {
    try {
      const response = await axios.post(`/api/lead-magnet/publish`, {
        id: edittedLeadMagnet.id,
      });

      if (response.data.data) {
        setEdittedLeadMagnet(response.data.data);
        toast.success("Lead Magnet published successfully");
      }
    } catch (error) {
      toast.error("Failed to publish Lead Magnet");
    }
  };

  const unpublish = async () => {
    try {
      const response = await axios.post(`/api/lead-magnet/unpublish`, {
        id: edittedLeadMagnet.id,
      });

      if (response.data.data) {
        toast.success("Lead Magnet unpublished successfully");
      }
    } catch (error) {
      toast.error("Failed to unpublish Lead Magnet");
    }
  };

  const remove = async () => {
    try {
      const response = await axios.delete(
        `/api/lead-magnet?id=${edittedLeadMagnet.id}`
      );

      if (response.data.success) {
        toast.success("Lead Magnet deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete Lead Magnet");
    }
  };

  return (
    <LeadMagnetEditorContext.Provider
      value={{
        save,
        edittedLeadMagnet,
        setEdittedLeadMagnet,
        publish,
        unpublish,
        remove,
      }}
    >
      {children}
    </LeadMagnetEditorContext.Provider>
  );
};

// Custom hook to use the context
export function useLeadMagnetEditorContext() {
  const context = useContext(LeadMagnetEditorContext);
  if (!context) {
    throw new Error(
      "useLeadMagnetEditorContext must be used within a LeadMagnetEditorProvider"
    );
  }

  return context;
}
