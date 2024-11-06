import { createClient } from "@/utils/supabase/server";
import {
  handleLookupAccounts,
  lookupAccounts,
  SupabaseAccount,
} from "@/app/server/tb";
import AccountCard from "./account-card";

export const issuer_id = "5ad8cbd9-186e-49fe-8860-fda262ee0c4a";

export async function getIssuerAccount(): Promise<SupabaseAccount> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("accounts")
    .select()
    .eq("user_id", issuer_id);
  if (data) {
    return data[0];
  } else throw new Error("Issuer account not found");
}

export default async function IssuerAccounts() {
  const issuerAccount = await getIssuerAccount();

  const accounts = await handleLookupAccounts([issuerAccount]);

  console.log(accounts);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts?.map((account) => (
          <AccountCard key={account.id} account={account} showTopup={false} />
        ))}
      </div>
    </>
  );
}
