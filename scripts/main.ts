import { id, createClient } from "tigerbeetle-node";

export const createAccount = async () => {
  const client = createClient({
    cluster_id: BigInt(0),
    replica_addresses: [process.env.TB_ADDRESS || "3000"],
  });

  const account = {
    id: id(), // TigerBeetle time-based ID.
    debits_pending: BigInt(0),
    debits_posted: BigInt(0),
    credits_pending: BigInt(0),
    credits_posted: BigInt(0),
    user_data_128: BigInt(0),
    user_data_64: BigInt(0),
    user_data_32: 0,
    reserved: 0,
    ledger: 1,
    code: 718,
    flags: 0,
    timestamp: BigInt(0),
  };

  const account_errors = await client.createAccounts([account]);
  // Error handling omitted.

  if (account_errors.length > 0) {
    console.error(account_errors);
    console.log("Error creating account");
  } else {
    console.log("Account created");
  }
};

createAccount();
