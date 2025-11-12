import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, logoutRequest } from "../features/auth/api/auth";
import {jwtDecode} from "jwt-decode";
import { Outlet } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // restore data saat refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        setUser(decoded.user || decoded);
        setToken(savedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  // login function
  const login = async (email, password) => {
    const data = await loginRequest(email, password);
    const decoded = jwtDecode(data.token);

    setUser(decoded.user || decoded);
    setToken(data.token);

    localStorage.setItem("token", data.token);
  };

  // logout function
  const logout = async () => {
    try {
      await logoutRequest();
    } catch (e) {
      console.warn("Logout API failed:", e);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}
