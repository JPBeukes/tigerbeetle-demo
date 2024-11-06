"use client";

import { handleCreateAccount } from "@/app/server/tb";
import { Button } from "@/components/ui/button";

export default function CreateAccount() {
  return (
    <Button
      onClick={async () => {
        await handleCreateAccount();
        window.location.reload();
      }}
    >
      Create New Account
    </Button>
  );
}
