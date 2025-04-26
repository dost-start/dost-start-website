"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function ShareButton() {
  const [buttonText, setButtonText] = useState("Copy Link");

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setButtonText("Link copied!");
        setTimeout(() => setButtonText("Copy Link"), 3000);
      })
      .catch(() => {
        setButtonText("Failed to copy");
        setTimeout(() => setButtonText("Copy Link"), 3000);
      });
  };

  return (
    <Button size="lg" className="px-10" onClick={handleCopyLink}>
      {buttonText}
    </Button>
  );
}
