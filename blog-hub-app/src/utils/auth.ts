import type { User } from "../types";
import { readLocal, writeLocal } from "./storage";

const USERS_KEY = "users";
const CURRENT_KEY = "currentUser";

function notifyAuthChange() {
  document.dispatchEvent(new Event("authChange"));
}

export function registerUser(
  user: User
): { ok: true } | { ok: false; error: string } {
  const users = readLocal<User[]>(USERS_KEY, []);

  if (!user.email.endsWith("@prominentpixel.com")) {
    return { ok: false, error: "Email must be from prominentpixel.com domain" };
  }

  if (users.some((u) => u.username === user.username)) {
    return { ok: false, error: "Username already exists" };
  }

  if (users.some((u) => u.email.toLowerCase() === user.email.toLowerCase())) {
    return { ok: false, error: "Email already registered" };
  }

  users.push(user);
  writeLocal<User[]>(USERS_KEY, users);
  writeLocal<User>(CURRENT_KEY, user);

  notifyAuthChange(); 
  return { ok: true };
}

export function loginUser(
  usernameOrEmail: string,
  password: string
): { ok: true; user: User } | { ok: false; error: string } {
  const users = readLocal<User[]>(USERS_KEY, []);

  if (
    usernameOrEmail.includes("@") &&
    !usernameOrEmail.endsWith("@prominentpixel.com")
  ) {
    return { ok: false, error: "Email must be from prominentpixel.com domain" };
  }

  const user = users.find(
    (u) => u.username === usernameOrEmail || u.email === usernameOrEmail
  );

  if (!user) {
    return { ok: false, error: "Email is not registered" };
  }

  if (user.password !== password) {
    return { ok: false, error: "Invalid password" };
  }

  writeLocal<User>(CURRENT_KEY, user);

  notifyAuthChange(); 
  return { ok: true, user };
}

export function logout(): void {
  localStorage.removeItem(CURRENT_KEY);
  notifyAuthChange(); 
}

export function getCurrentUser(): User | null {
  return readLocal<User | null>(CURRENT_KEY, null);
}
