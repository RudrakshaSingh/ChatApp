import { createContext, useContext, useEffect, useState } from "react";

// Create context
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    // onAuthStateChanged
  }, []);

  const login = async (email, password) => {
    try {
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  const logout = async () => {
    try {
    } catch (e) {
      console.error("Logout error:", e);
    }
  };
  const register = async ( email, password,user,profileurl) => {
    try {
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth=() => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped within an AuthContextProvider");
  }
  return  value;
}