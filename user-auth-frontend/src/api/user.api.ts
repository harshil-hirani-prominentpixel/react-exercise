import axios from "axios";
import { type IUser } from "../types/user.type";

const apiInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  }
});

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: IRegisterData): Promise<void> => {
  try {
    await apiInstance.post("/auth/register", data);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Registration failed.");
    }
    throw new Error("Unexpected error occurred during registration.");
  }
};
 
export const loginUser = async (data: ILoginData): Promise<void> => {
  try {
    await apiInstance.post("/auth/login", data);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Login failed.");
    }
    throw new Error("Unexpected error occurred during login.");
  }
};

export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const res = await apiInstance.get<{data:IUser[]}>("/users");
    console.log(res);
    return res.data.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Failed to fetch users.");
    }
    throw new Error("Unexpected error occurred while fetching users.");
  }
};