import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import MessageList from "../../components/MessageList";

export default function ChatRoom() {
  const item = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  return (
    <CustomKeyboardView inChat={true}>
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ChatRoomHeader user={item} router={router} />
      <View className="h-3 border-b border-neutral-300" />
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
        <View className="flex-1">
          <MessageList messages={messages} />
        </View>

        <View style={{ marginBottom: hp(2.7) }} className="pt-2">
          <View className="flex-row mx-3 justify-between bg-white border p-2 pl-5 border-neutral-300 rounded-full">
            <TextInput
              placeholder="Type a message..."
              style={{ fontSize: hp(2) }}
              className="flex-1 mr-2"
            />
            <TouchableOpacity
              style={{ width: hp(5.5), height: hp(5.5) }}
              className="bg-neutral-200 items-center justify-center p-2 mr-[1px] rounded-full"
            >
              <Feather name="send" size={hp(2.7)} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    </CustomKeyboardView>
  );
}
