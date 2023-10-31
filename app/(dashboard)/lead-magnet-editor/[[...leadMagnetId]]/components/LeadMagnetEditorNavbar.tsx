"use client";

import { BsArrowLeft, BsCheck, BsPencil } from "react-icons/bs";
import { useLeadMagnetEditorContext } from "@/context/LeadMagnetEditorContex";
import React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProfileEditorContext } from "@/context/ProfileEditorContext";

function LeadMagnetEditorNavbar() {
  const router = useRouter();
  const {
    edittedLeadMagnet,
    setEdittedLeadMagnet,
    save: saveLeadMagnet,
    publish,
    unpublish,
    remove,
  } = useLeadMagnetEditorContext();

  const { save: saveProfile, account } = useProfileEditorContext();

  const [editing, setEditing] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [publishing, setPublishing] = React.useState(false);
  const [unpublishing, setUnpublishing] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  console.log("edittedLeadMagnet", edittedLeadMagnet);

  const saveName = async () => {
    try {
      await saveLeadMagnet();
      toast.success("Saved!"); // TODO:
      setEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Error saving name. Please try again.");
    }
  };

  const cancelSaveName = () => {
    setEditing(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveLeadMagnet();
      await saveProfile();
      toast.success("Saved!");
    } catch (error) {
      console.log(error);
      toast.error("Error saving. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      await publish();
      toast.success("Published!");
    } catch (error) {
      console.log(error);
      toast.error("Error publishing. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    setUnpublishing(true);
    try {
      await unpublish();
      toast.success("Unpublished!");
    } catch (error) {
      console.log(error);
      toast.error("Error unpublishing. Please try again.");
    } finally {
      setUnpublishing(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await remove();
      toast.success("Deleted!");
      router.push("/lead-magnets");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex w-full flex-row items-center justify-between border-b-[1px] border-solid border-gray-200 bg-white p-3 text-gray-600">
      <div className="flex flex-row items-center">
        {/*sGo Back */}
        <BsArrowLeft
          size={20}
          className="pr-3 w-fit cursor-pointer"
          onClick={() => void router.push("/lead-magnets")}
        />
        {/* Input / Name */}
        {editing ? (
          <Input
            value={edittedLeadMagnet.name}
            onChange={(e) =>
              setEdittedLeadMagnet((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        ) : (
          <span className="text-xl font-bold">{edittedLeadMagnet.name}</span>
        )}
        {/*  Edit / Save */}
        {editing ? (
          <div className="flex flex-row text-purple-500">
            <BsCheck
              className="cursor-pointer"
              size={25}
              onClick={() => void saveName()}
            />
            <span className="border-r-2 mx-1 border-gray-300" />
            <span
              className="ml-[5px] cursor-pointer font-normal"
              onClick={cancelSaveName}
            >
              X
            </span>
          </div>
        ) : (
          <div
            className="ml-3 cursor-pointer"
            onClick={() => setEditing((prev) => !prev)}
          >
            <BsPencil />
          </div>
        )}
      </div>
      <div className="flex flex-row items-center gap-x-4">
        {/* Delete with state */}
        {edittedLeadMagnet.id && (
          <Button onClick={handleDelete} variant="destructive">
            {deleting ? "Deleting" : "Delete"}
          </Button>
        )}
        {/* Unpublish and View Final LM */}
        {edittedLeadMagnet.status === "published" && (
          <>
            <Button variant="outline" onClick={handleUnpublish}>
              {unpublishing ? "Unpublishing..." : "Unpublish"}
            </Button>
            {account && (
              <Link href={`/lm/${account?.username}/${edittedLeadMagnet.slug}`}>
                <Button variant="outline">View Published</Button>
              </Link>
            )}
          </>
        )}
        {/* Save & Publish with state */}
        <Button variant="outline" onClick={handleSave}>
          {saving ? "Saving..." : "Save"}
        </Button>
        <Button onClick={handlePublish}>
          {publishing ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </div>
  );
}

export default LeadMagnetEditorNavbar;
