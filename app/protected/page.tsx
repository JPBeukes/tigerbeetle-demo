import CreateAccount from "@/components/create-account";
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { Mail } from "lucide-react";
import { redirect } from "next/navigation";

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
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Account Details</h2>
        <div className="flex items-center gap-2 text-sm ">
          <Mail className="w-4 h-4" />
          <p>{user.email}</p>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-2xl mb-4">Create Account</h2>
        <CreateAccount />
      </div>
    </div>
  );
}
