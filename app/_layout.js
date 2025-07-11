//slot component renders the childen of the layout
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthContextProvider, useAuth } from "../context/AuthContext";
import "../global.css";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();//return array of segment values in current route
  const router= useRouter();

  //everytime auth state changes
  useEffect(() => {
    //check if user is authenticated
    if (typeof isAuthenticated === "undefined") return;

    const inApp = segments[0] === "(app)";// means user in in (app) folder

    //redirect to home //else to signin
    if (isAuthenticated && !inApp) {
      //redirect to home
      //replace instead redirect so cannot go  back to loading screen
      router.replace("/Home");
    } else if (isAuthenticated===false) {
      //redirect to signin
      router.replace("/SignIn");
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
