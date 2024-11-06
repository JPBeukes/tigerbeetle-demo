import YourAccounts from "@/components/your-accounts";
import CreateAccount from "@/components/create-account";
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { Mail } from "lucide-react";
import { redirect } from "next/navigation";
import IssuerAccounts from "@/components/issuer-accounts";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start space-y-6">
        <h2 className="font-bold text-2xl">Issuer Account</h2>
        <IssuerAccounts />
        <h2 className="font-bold text-2xl">Your Accounts</h2>
        <YourAccounts />
        <CreateAccount />
      </div>
    </div>
  );
}
