import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig"; // Adjust the import path as necessary

// Create context
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub=onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return () => unsub(); // Cleanup subscription on unmount
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
  const register = async (email, password, user, profileurl) => {
    try {
      const res= await createUserWithEmailAndPassword(auth,email, password);
      console.log("User registered:", res?.user);
      //user state will be updated by onAuthStateChanged in above useEffect
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped within an AuthContextProvider");
  }
  return value;
};
