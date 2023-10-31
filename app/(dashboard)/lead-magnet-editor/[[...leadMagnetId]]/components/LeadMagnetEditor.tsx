"use client";
import React, { useState } from "react";
import LeadMagnetEditorNavbar from "./LeadMagnetEditorNavbar";
import LeadMagnetContentEditor from "./LeadMagnetContentEditor";
import LeadMagnetEditorSidebar from "./LeadMagnetEditorSidebar";
import LeadMagnetPromptEditor from "./LeadMagnetPromptEditor";
import LeadMagnetEmailEditor from "./LeadMagnetEmailEditor";
import LeadMagnetProfileEditor from "./LeadMagnetProfileEditor";
import LeadMagnetSettings from "./LeadMagnetSettings";

export type LeadMagnetSections =
  | "content"
  | "prompt"
  | "email"
  | "profile"
  | "settings";

function LeadMagnetEditor() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedEditor, setSelectedEditor] =
    useState<LeadMagnetSections>("content");

  return (
    <div
      className="flex h-screen w-full flex-col overflow-y-hidden"
      style={{ height: `calc(100vh - 66px)` }}
    >
      <LeadMagnetEditorNavbar />
      <div className="flex h-full flex-row">
        <LeadMagnetEditorSidebar
          isSidebarCollapsed={isSidebarCollapsed}
          setSelectedEditor={setSelectedEditor}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />
        <div className="h-full flex-grow">
          {selectedEditor === "content" && <LeadMagnetContentEditor />}
          {selectedEditor === "prompt" && <LeadMagnetPromptEditor />}
          {selectedEditor === "email" && <LeadMagnetEmailEditor />}
          {selectedEditor === "profile" && <LeadMagnetProfileEditor />}
          {selectedEditor === "settings" && <LeadMagnetSettings />}
        </div>
      </div>
    </div>
  );
}

export default LeadMagnetEditor;
