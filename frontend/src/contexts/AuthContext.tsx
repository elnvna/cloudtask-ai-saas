import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import type { AuthContextType, User } from "../types/auth";

import { login as loginService } from "../services/authService";

import { api } from "../api/api";

export const AuthContext = createContext({} as AuthContextType);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  async function login(email: string, password: string) {

    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    const response = await api.post(
        "/auth/login",
        formData,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    localStorage.setItem("token", response.data.access_token);

    setToken(response.data.access_token);
}

  function logout() {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}