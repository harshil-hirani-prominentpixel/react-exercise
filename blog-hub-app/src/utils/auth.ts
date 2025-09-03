import type { User } from "../types";
import { readLocal, writeLocal } from "./storage";

const USERS_KEY = "users";
const CURRENT_KEY = "currentUser";

export function registerUser(
  user: User
): { ok: true } | { ok: false; error: string } {
  const users = readLocal<User[]>(USERS_KEY, []);
  if (users.some((u) => u.username === user.username)) {
    return { ok: false, error: "username already exists" };
  }
  if (users.some((u) => u.email.toLowerCase() === user.email.toLowerCase())) {
    return { ok: false, error: "email already registered" };
  }
  users.push(user);
  writeLocal<User[]>(USERS_KEY, users);
  writeLocal<User>(CURRENT_KEY, user);
  return { ok: true };
}

export function loginUser(
  usernameOrEmail: string,
  password: string
): { ok: true; user: User } | { ok: false; error: string } {
  const users = readLocal<User[]>(USERS_KEY, []);
  const user = users.find(
    (u) =>
      (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
      u.password === password
  );
  if (!user) return { ok: false, error: "invalid credentials" };
  writeLocal<User>(CURRENT_KEY, user);
  return { ok: true, user };
}

export function logout(): void {
  localStorage.removeItem(CURRENT_KEY);
}

export function getCurrentUser(): User | null {
  return readLocal<User | null>(CURRENT_KEY, null);
}
