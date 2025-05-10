import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthContextProvider, useAuth } from "../context/AuthContext";
import "../global.css";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router= useRouter();

  //everytime auth state changes
  useEffect(() => {
    //check if user is authenticated
    if (typeof isAuthenticated === "undefined") return;

    const inApp = segments[0] === "(app)";

    //redirect to home //else to signin
    if (isAuthenticated && !inApp) {
      //redirect to home
      //replace instead redirect so cannot go  back to loading screen
      router.replace("/home");
    } else if (isAuthenticated===false) {
      //redirect to signin
      router.replace("/signin");
    }
  }, [isAuthenticated]);

  return <Slot />;
};
const RootLayout = () => {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
};

export default RootLayout;
