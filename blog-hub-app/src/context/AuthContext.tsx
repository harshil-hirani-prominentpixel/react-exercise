import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, loginUser, logout as authLogout } from "../utils/auth";
import type { User, AuthResponse, AuthContextType } from "../types/auth";

const AuthContext = createContext<AuthContextType | null >(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(getCurrentUser());

  useEffect(() => {
    const handleAuthChange = () => setUser(getCurrentUser());
    document.addEventListener("authChange", handleAuthChange);
    return () => document.removeEventListener("authChange", handleAuthChange);
  }, []);

  const login = (email: string, password: string): AuthResponse => {
    const res = loginUser(email, password);
    if (res.ok && res.user) {
      setUser(res.user);
      document.dispatchEvent(new Event("authChange"));
    }
    return res;
  };

  const logout = () => {
    authLogout();
    setUser(null);
    document.dispatchEvent(new Event("authChange"));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
