"use server";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AccountDetails, transfer } from "@/app/server/tb";
import { getIssuerAccount, issuer_id } from "./issuer-accounts";
import TopupButton from "./topup-button";

interface AccountCardProps {
  account: AccountDetails;
  showTopup: boolean;
}

export const handleTransfer = async (to: bigint) => {
  const issuerAccount = await getIssuerAccount();
  await transfer(BigInt(issuerAccount.tb_id), to, 100n);
};

const AccountCard: React.FC<AccountCardProps> = ({ account, showTopup }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{account.account_name}</CardTitle>
        <CardDescription>{account.description}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="flex justify-between">
          <div className="flex-col">
            <div className="text-sm">Credits Posted</div>
            <span className="text-4xl font-mono font-bold">
              {account.tb_account?.credits_posted.toString()}
            </span>{" "}
            ZAR
          </div>
          <div className="flex-col">
            <div className="text-sm">Debits Posted</div>
            <span className="text-4xl font-mono font-bold">
              {account.tb_account?.debits_posted.toString()}
            </span>{" "}
            ZAR
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex-col space-y-2">
        <div className="flex-col">
          <div className="text-sm">TigerBeetle Acc. No.</div>
          <div className="font-mono font-bold">{account.tb_id}</div>
        </div>
        {showTopup && <TopupButton to={BigInt(account.tb_id)} />}
      </CardFooter>
    </Card>
  );
};

export default AccountCard;
