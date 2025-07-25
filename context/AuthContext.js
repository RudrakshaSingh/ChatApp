import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig"; // Adjust the import path as necessary

// Create context
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return () => unsub(); // Cleanup subscription on unmount
  }, []);

  const updateUserData = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
     let data = docSnap.data();
      setUser({...user,username:data.username,profileurl:data.profileurl,uid:data.uid});

      // setUser({username:data.username,profileurl:data.profileurl,uid:data.uid});
    }
  };

  const login = async (email, password) => {
    try {
      
      const response= await signInWithEmailAndPassword(auth,email, password);
      return { success: true};
    } catch (e) {
      console.error("Login error:", e);
      let msg = e.message;
      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid email.";
      }
      if(msg.includes("(auth/invalid-credential)")) {
        msg = "Invalid credentials.";
      }
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (e) {
      return { success: false, msg: e.message, error: e };
    }
  };
  const register = async (email, password, username, profileurl) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // console.log("User registered:", res?.user);
      //user state will be updated by onAuthStateChanged in above useEffect

      // Store user data in Firestore it updates/create existing user document
      await setDoc(doc(db, "users", res?.user?.uid), {
        username,
        email,
        profileurl,
        uid: res?.user?.uid,
      });
      return { success: true, data: res?.user };
    } catch (e) {
      let msg = e.message;
      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid email.";
      }
      if(msg.includes("(auth/email-already-in-use)")) {
        msg = "Email already in use.";
      }
      return { success: false, msg };
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
