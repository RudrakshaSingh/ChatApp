import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig"; // Adjust the import path as necessary

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
  const register = async (email, password, username, profileurl) => {
    try {
      const res= await createUserWithEmailAndPassword(auth,email, password);
      console.log("User registered:", res?.user);
      //user state will be updated by onAuthStateChanged in above useEffect

      // Store user data in Firestore it updates/create existing user document
      await setDoc(doc(db,"users",res?.user?.uid),{
        username,
        email,
        profileurl,
        uid: res?.user?.uid,
      });
      return {success: true, data: res?.user};
    } catch (e) {
      console.error("Register error:", e);
      return {success: false, message: e.message};
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
