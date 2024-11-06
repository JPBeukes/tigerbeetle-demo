"use server";

import {
  Account,
  CreateAccountError,
  id,
  createClient as tbCreateClient,
} from "tigerbeetle-node";
import { createClient } from "@/utils/supabase/server";

const tbClient = tbCreateClient({
  cluster_id: 0n,
  replica_addresses: [process.env.TB_ADDRESS || "3000"],
});

export const createAccount = async () => {
  const account = {
    id: id(), // TigerBeetle time-based ID.
    debits_pending: 0n,
    debits_posted: 0n,
    credits_pending: 0n,
    credits_posted: 0n,
    user_data_128: 0n,
    user_data_64: 0n,
    user_data_32: 0,
    reserved: 0,
    ledger: 1,
    code: 718,
    flags: 0,
    timestamp: 0n,
  };

  const account_errors = await tbClient.createAccounts([account]);

  for (const error of account_errors) {
    switch (error.result) {
      case CreateAccountError.exists:
        throw new Error(`Account at ${error.index} already exists.`);
      default:
        throw new Error(
          `Account at ${error.index} failed to create: ${
            CreateAccountError[error.result]
          }.`
        );
    }
  }

  return account.id;
};

export async function handleCreateAccount() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const id = await createAccount();

    const { data, error } = await supabase.from("accounts").insert({
      user_id: user.id,
      account_name: "Main",
      description: "Main account",
      tb_id: id.toString(),
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function lookupAccounts(accountIds: bigint[]) {
  return await tbClient.lookupAccounts(accountIds);
}

export interface SupabaseAccount {
  id: number;
  user_id: string;
  account_name: string;
  description: string;
  tb_id: string;
}

export interface AccountDetails extends SupabaseAccount {
  tb_account: Account | undefined;
}

export async function handleLookupAccounts(accounts: SupabaseAccount[] | null) {
  let tbAccounts: Account[] = [];

  if (accounts) {
    const tbIds = accounts?.map((a) => BigInt(a.tb_id));
    tbAccounts = await lookupAccounts(tbIds);
  }

  const result: AccountDetails[] =
    accounts?.map((a) => ({
      ...a,
      tb_account: tbAccounts.find((t) => t.id === BigInt(a.tb_id)),
    })) || [];

  return result;
}

export const transfer = async (from: bigint, to: bigint, amount: bigint) => {
  const transfers = [
    {
      id: id(), // TigerBeetle time-based ID.
      debit_account_id: from,
      credit_account_id: to,
      amount: amount,
      pending_id: 0n,
      user_data_128: 0n,
      user_data_64: 0n,
      user_data_32: 0,
      timeout: 0,
      ledger: 1,
      code: 720,
      flags: 0,
      timestamp: 0n,
    },
  ];

  const transfer_errors = await tbClient.createTransfers(transfers);

  return transfers;
};
