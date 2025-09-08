export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountNumber: number;
  mobileNumber: number;
  balance: number;
  transactions: ITransactions[];
  role: "admin" | "user";
}

export interface ITransactions {
  id: string;
  from: number;
  to: number;
  amount: number;
  date: string;
}

