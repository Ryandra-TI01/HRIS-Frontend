import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, logoutRequest } from "../features/auth/api/auth";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

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
  const login = async (payload) => {
    setAuthLoading(true);
    try {
      const data = await loginRequest(payload);
      const decoded = jwtDecode(data.token);
  
      setUser(decoded.user || decoded);
      setToken(data.token);
  
      localStorage.setItem("token", data.token);
    } finally {
      setAuthLoading(false);
    }
  };

  // logout function
  const logout = async () => {
    setAuthLoading(true);
    try {
      await logoutRequest();
    } catch (e) {
      console.warn("Logout API failed:", e);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      setAuthLoading(false);
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
        loading, // for initial loading state
        authLoading, // for login/logout loading state
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
};
