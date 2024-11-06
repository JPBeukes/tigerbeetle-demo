"use client";

import { Button } from "./ui/button";

import { handleTransfer } from "./account-card";

interface TopupButtonProps {
  to: bigint;
}

export default function TopupButton({ to }: TopupButtonProps) {
  return (
    <Button
      className="w-full"
      onClick={async () => {
        await handleTransfer(to);
        window.location.reload(); // Refresh the page after transfer
      }}
    >
      Topup +100
    </Button>
  );
}
