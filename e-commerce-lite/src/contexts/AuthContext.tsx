import {  useState, useEffect,type ReactNode } from "react";
import { AuthContext } from "./sharedAuth";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("auth") === "1";
  });
  const [user, setUser] = useState<{ name: string } | undefined>(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : undefined;
  });

  useEffect(() => {
    // persist
    localStorage.setItem("auth", isAuthenticated ? "1" : "0");
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [isAuthenticated, user]);

  const login = async (username: string, password: string) => {
    // simulasi validasi (no backend). gunakan promise agar mudah dipakai di UI.
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (username && password) {
          setIsAuthenticated(true);
          setUser({ name: username });
          resolve();
        } else {
          reject(new Error("Username / password tidak valid"));
        }
      }, 500);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
