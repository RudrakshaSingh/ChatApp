import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { StatusBar } from "react-native-web";
import Loading from "../components/Loading";
const SignUp = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  const profilePicRef = useRef("");

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !userNameRef.current ||
      !profilePicRef.current
    ) {
      alert("Please fill in all fields correctly to register.");
      return;
    }

    //login
  };
  return (
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
            source={require("../assets/asset/register.png")}
          />
        </View>

        {/*signin text */}
        <View className="items-center">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-semibold tracking-wider text-center text-neutral-800"
          >
            Sign Up
          </Text>
          <Text
            style={{ fontSize: hp(2) }}
            className="text-gray-500 text-center mt-2"
          >
            Create a new account to get started.
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
            <View
              style={{ height: hp(5) }}
              className="flex-row gap-4  px-4  bg-neutral-100 items-center rounded-xl"
            >
              <Feather name="user" size={hp(2.7)} color="black" />

              <TextInput
                onChangeText={(text) => (userNameRef.current = text)}
                style={{
                  flex: 1,
                  paddingHorizontal: wp(2),
                  fontSize: hp(2),
                }}
                placeholder="Username"
                placeholderTextColor="gray"
                className="text-base"
              />
            </View>
            
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
            <View
              style={{ height: hp(5) }}
              className="flex-row gap-4  px-4  bg-neutral-100 items-center rounded-xl"
            >
              <Feather name="image" size={hp(2.7)} color="black" />

              <TextInput
                onChangeText={(text) => (profilePicRef.current = text)}
                style={{
                  flex: 1,
                  paddingHorizontal: wp(2),
                  fontSize: hp(2),
                }}
                placeholder="Profile Picture URL"
                placeholderTextColor="gray"
                className="text-base"
              />
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
                  onPress={handleRegister}
                  style={{ height: hp(5) }}
                  className="bg-neutral-800 w-full items-center justify-center rounded-xl tracking-wider"
                >
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="text-white font-semibold"
                  >
                    Sign Up
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
                Already have an account ?
              </Text>
              <TouchableOpacity onPress={() => router.push("/SignIn")}>
                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="font-semibold text-indigo-500"
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
