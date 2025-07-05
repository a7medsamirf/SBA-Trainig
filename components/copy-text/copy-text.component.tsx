"use client";

import { useState } from "react";

export const CopyText = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyText = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } catch (error) {
        console.error("Failed to copy text: ", error);
      }
    } else {
      console.error("Clipboard API is not available.");
    }
  };

  return (
    <button onClick={copyText}>
      {isCopied ? <span className="text-green-500">✓</span> : <span>📋</span>}
    </button>
  );
};
