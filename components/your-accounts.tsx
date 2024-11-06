import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { createClient } from "@/utils/supabase/server";
import { handleLookupAccounts, lookupAccounts } from "@/app/server/tb";
import { type Account } from "tigerbeetle-node";
import AccountCard from "./account-card";

export default async function YourAccounts() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  let { data } = await supabase
    .from("accounts")
    .select()
    .eq("user_id", user.id);

  const accounts = await handleLookupAccounts(data);

  console.log(accounts);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts?.map((account) => (
          <AccountCard key={account.id} account={account} showTopup={true} /> // Use the new component
        ))}
      </div>
    </>
  );
}
