import { createContext, useContext, useState, type ReactNode } from "react";
import type { IUser, ITransactions } from "../types/user";
import * as userService from "../services/userService";
import * as transactionService from "../services/transactionService";

interface BankContextType {
  currentUser: IUser | null;
  users: IUser[];
  loginUser: (email: string, password: string) => boolean;
  logoutUser: () => void;
  addUserByAdmin: (user: IUser) => IUser;
  transferMoney: (toAcc: number, amount: number) => void;
  getTransactions: () => ITransactions[];
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(() => {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  const [users, setUsers] = useState<IUser[]>(() => userService.getUsers());

  const loginUser = (email: string, password: string): boolean => {
    try {
      const user = userService.login(email, password);
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    } catch {
      return false;
    }
  };

  const logoutUser = (): void => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const addUserByAdmin = (user: IUser): IUser => {
    const newUser = userService.createUser(user);
    setUsers(userService.getUsers());
    return newUser;
  };

  const transferMoney = (toAcc: number, amount: number): void => {
    if (!currentUser) throw new Error("Not logged in");

    transactionService.createTransaction(
      currentUser.accountNumber,
      toAcc,
      amount
    );

    const updated = userService
      .getUsers()
      .find((u) => u.email === currentUser.email)!;
    setCurrentUser(updated);
    localStorage.setItem("currentUser", JSON.stringify(updated));
  };

  const getTransactions = (): ITransactions[] =>
    currentUser
      ? transactionService.getAccountTransactions(currentUser.accountNumber)
      : [];

  return (
    <BankContext.Provider
      value={{
        currentUser,
        users,
        loginUser,
        logoutUser,
        addUserByAdmin,
        transferMoney,
        getTransactions,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBank = (): BankContextType => {
  const ctx = useContext(BankContext);
  if (!ctx) throw new Error("useBank must be used within BankProvider");
  return ctx;
};
