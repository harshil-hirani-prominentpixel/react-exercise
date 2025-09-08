import type { IUser, ITransactions } from "../types/user";

const USERS_KEY = "bank_users_v1";
const TX_KEY = "bank_transactions_v1";
const CURRENT_KEY = "bank_current_user_v1";

export const getUsers = (): IUser[] =>
  JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as IUser[];

export const saveUsers = (users: IUser[]): void =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const addUser = (user: IUser): void => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};

export const updateUser = (updated: IUser): void => {
  const users = getUsers().map((u) =>
    u.accountNumber === updated.accountNumber ? updated : u
  );
  saveUsers(users);
};

export const getTransactions = (): ITransactions[] =>
  JSON.parse(localStorage.getItem(TX_KEY) || "[]") as ITransactions[];

export const saveTransactions = (txs: ITransactions[]): void =>
  localStorage.setItem(TX_KEY, JSON.stringify(txs));

export const addTransaction = (tx: ITransactions): void => {
  const txs = getTransactions();
  txs.push(tx);
  saveTransactions(txs);
};

export const setCurrentUser = (accountNumber: number | null): void => {
  if (accountNumber === null) localStorage.removeItem(CURRENT_KEY);
  else localStorage.setItem(CURRENT_KEY, JSON.stringify(accountNumber));
};

export const getCurrentUserAccountNumber = (): number | null => {
  const v = localStorage.getItem(CURRENT_KEY);
  return v ? (JSON.parse(v) as number) : null;
};

export const getCurrentUser = (): IUser | null => {
  const accountNumber = getCurrentUserAccountNumber();
  if (!accountNumber) return null;
  return getUsers().find((u) => u.accountNumber === accountNumber) || null;
};

export const clearAllDataForDev = (): void => {
  localStorage.removeItem(USERS_KEY);
  localStorage.removeItem(TX_KEY);
  localStorage.removeItem(CURRENT_KEY);
};
