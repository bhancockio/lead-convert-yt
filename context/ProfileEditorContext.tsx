import { useAuth } from "@clerk/nextjs";
import { Account, Profile } from "@prisma/client";
import axios from "axios";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

const DEFAULT_PROFILE: Profile = {
  id: "",
  userId: "",
  title: "",
  description: "",
  profileImageUrl: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

interface ProfileEditorContextState {
  edittedProfile: Profile;
  setEdittedProfile: Dispatch<SetStateAction<Profile>>;
  save: () => Promise<void>;
  account: Account | null;
}

const ProfileEditorContext = createContext<ProfileEditorContextState | null>(
  null
);

export const ProfileEditorContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { userId } = useAuth();

  const [account, setAccount] = useState<Account | null>(null);
  const [edittedProfile, setEdittedProfile] =
    useState<Profile>(DEFAULT_PROFILE);

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await axios
        .get(`/api/profile?userId=${userId}`)
        .then((resp) => {
          const fetchedProfile = resp.data.data;
          return fetchedProfile;
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to fetch profile");
          return DEFAULT_PROFILE;
        });

      setEdittedProfile(fetchedProfile);
    };

    fetchProfile();
  }, [userId]);

  useEffect(() => {
    axios
      .get("/api/account")
      .then((resp) => {
        if (resp.data.success) {
          setAccount(resp.data.data);
        } else {
          setAccount(null);
        }
      })
      .catch((err) => {
        console.log(err);
        setAccount(null);
      });
  }, []);

  const save = async () => {
    const reponse = await axios.request({
      method: edittedProfile.id ? "PUT" : "POST",
      url: "/api/profile",
      data: edittedProfile,
    });

    const updatedProfile = reponse.data.data;
    if (updatedProfile) {
      setEdittedProfile(updatedProfile);
    } else {
      toast.error("Failed to save profile");
    }
  };

  return (
    <ProfileEditorContext.Provider
      value={{
        edittedProfile,
        setEdittedProfile,
        save,
        account,
      }}
    >
      {children}
    </ProfileEditorContext.Provider>
  );
};

export function useProfileEditorContext() {
  const context = useContext(ProfileEditorContext);

  if (!context) {
    throw new Error(
      "useProfileEditorContext must be used within a ProfileEditorContextProvider"
    );
  }

  return context;
}
