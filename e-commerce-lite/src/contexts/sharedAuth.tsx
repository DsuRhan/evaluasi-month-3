import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  user?: { name: string };
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
