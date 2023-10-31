import React from "react";

function LandingPageFooter() {
  return (
    <div className="border-t border-gray-200 bg-white px-5 py-4 text-right">
      <span className="text-gray-600">Contact: </span>
      <span className="font-bold text-purple-500">
        <a
          href="mailto:brandon@brandonhancock.io"
          className="text-purple-500 hover:underline"
        >
          brandon@brandonhancock.io
        </a>
      </span>
    </div>
  );
}

export default LandingPageFooter;
