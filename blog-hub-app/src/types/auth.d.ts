export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthResponse {
  ok: boolean;
  user?: User;
  error?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => AuthResponse;
  logout: () => void;
}
