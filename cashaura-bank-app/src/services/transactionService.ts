import type { IUser, ITransactions } from "../types/user";
import { getUsers, updateUser } from "./userService";

const findUserByAccount = (acc: number): IUser | null =>
  getUsers().find((u) => u.accountNumber === acc) || null;

export const createTransaction = (
  fromAccount: number,
  toAccount: number,
  amount: number
): ITransactions => {
  const fromUser = findUserByAccount(fromAccount);
  const toUser = findUserByAccount(toAccount);

  if (!fromUser || !toUser) throw new Error("Accounts not found");
  if (fromUser.balance < amount) throw new Error("Insufficient balance");

  const transaction: ITransactions = {
    id: Date.now().toString(),
    from: fromUser.accountNumber,
    to: toUser.accountNumber,
    amount,
    date: new Date().toISOString(),
  };

  fromUser.balance -= amount;
  toUser.balance += amount;

  fromUser.transactions.push(transaction);
  toUser.transactions.push(transaction);

  updateUser(fromUser.email, fromUser);
  updateUser(toUser.email, toUser);

  return transaction;
};

export const getAccountTransactions = (
  accountNumber: number
): ITransactions[] => {
  const user = findUserByAccount(accountNumber);
  if (!user) throw new Error("Account not found");
  return user.transactions;
};
