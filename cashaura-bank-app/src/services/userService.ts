import type { IUser } from "../types/user";

const setLocals = (): void => {
  if (!localStorage.getItem("users"))
    localStorage.setItem("users", JSON.stringify([]));
};
setLocals();

export const getUsers = (): IUser[] =>
  JSON.parse(localStorage.getItem("users") || "[]");

export const createUser = (user: IUser): IUser => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return user;
};

export const updateUser = (email: string, user: IUser): IUser => {
  const users = getUsers();
  const idx = users.findIndex((u) => u.email === email);
  if (idx < 0) throw new Error("User not exist");
  users.splice(idx, 1, user);
  localStorage.setItem("users", JSON.stringify(users));
  return user;
};

export const deleteUser = (email: string): void => {
  const users = getUsers();
  const updated = users.filter((u) => u.email !== email);
  localStorage.setItem("users", JSON.stringify(updated));
};

export const login = (email: string, password: string): IUser => {
  const users = getUsers();
  const user = users.find((u) => u.email === email);
  if (!user || user.password !== password)
    throw new Error("Invalid email or password");
  return user;
};
