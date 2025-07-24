 
 
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useAuth } from "../context/AuthContext";

import CustomKeyboardView from "../components/CustomKeyboardView";

import Loading from "../components/Loading";
const SignIn = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    let res = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    if (!res.success) {
      alert("sign in failed: " + res.msg);
    }
    
  };
  return (
    <CustomKeyboardView>
    <View className="flex-1 ">
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12"
      >
        {/*signin image */}
        <View className="items-center">
          <Image
            style={{ height: hp(25), width: wp(50) }}
            source={require("../assets/asset/login.png")}
          />
        </View>

        {/*signin text */}
        <View className="items-center">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-semibold tracking-wider text-center text-neutral-800"
          >
            Sign In
          </Text>
          <Text
            style={{ fontSize: hp(2) }}
            className="text-gray-500 text-center mt-2"
          >
            Welcome back! Please sign in to your account.
          </Text>

          {/*signin form */}
          <View className="w-full mt-8 gap-4">
            <View
              style={{ height: hp(5) }}
              className="flex-row gap-4  px-4  bg-neutral-100 items-center rounded-xl"
            >
              <Feather name="mail" size={hp(2.7)} color="black" />

              <TextInput
                onChangeText={(text) => (emailRef.current = text)}
                style={{
                  flex: 1,
                  paddingHorizontal: wp(2),
                  fontSize: hp(2),
                }}
                placeholder="Email"
                placeholderTextColor="gray"
                className="text-base"
              />
            </View>
            <View className=" gap-3">
              <View
                style={{ height: hp(5) }}
                className="flex-row gap-4  px-4  bg-neutral-100 items-center rounded-xl"
              >
                <Feather name="lock" size={hp(2.7)} color="black" />

                <TextInput
                  onChangeText={(text) => (passwordRef.current = text)}
                  style={{
                    flex: 1,
                    paddingHorizontal: wp(2),
                    fontSize: hp(2),
                  }}
                  secureTextEntry={true}
                  placeholder="Password"
                  placeholderTextColor="gray"
                  className="text-base"
                />
              </View>
              <Text
                style={{ fontSize: hp(1.5) }}
                className="text-right font-semibold text-neutral-500"
              >
                Forgot Password ?
              </Text>
            </View>

            {/*submit button */}
            <View className="justify-center items-center">
              {loading ? (
                <View
                  style={{ height: hp(5), aspectRatio: 1 }}
                  className="items-center justify-center"
                >
                  <Loading size={hp(18)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleLogin}
                  style={{ height: hp(5) }}
                  className="bg-neutral-800 w-full items-center justify-center rounded-xl tracking-wider"
                >
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="text-white font-semibold"
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/*sign up text */}
            <View className="flex-row items-center justify-center">
              <Text
                style={{ fontSize: hp(1.5) }}
                className="font-semibold text-neutral-500"
              >
                {"Don\u2019t have an account ?"}
              </Text>
              <TouchableOpacity onPress={() => router.push("/SignUp")}>
                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="font-semibold text-indigo-500"
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
    </CustomKeyboardView>
  );
};

export default SignIn;
