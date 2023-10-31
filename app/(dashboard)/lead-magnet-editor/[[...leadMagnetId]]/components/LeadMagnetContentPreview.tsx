import React from "react";

interface LeadMagnetContentPreviewProps {
  title: string;
  subtitle?: string;
  body: string;
}

function LeadMagnetContentPreview({
  title,
  subtitle,
  body,
}: LeadMagnetContentPreviewProps) {
  return (
    <div className="mb-10 flex max-h-[85vh] flex-col overflow-y-scroll rounded-lg bg-white p-4 shadow-lg md:mb-10 md:p-8 ">
      <h1 className="mb-4 text-2xl font-semibold text-gray-700 md:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <h2 className="mb-6 text-xl text-gray-500 md:text-2xl">{subtitle}</h2>
      )}
      <div className="ProseMirror" dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}

export default LeadMagnetContentPreview;
