import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    Timestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Keyboard, TextInput, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import MessageList from "../../components/MessageList";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebaseConfig";
import { getRoomId } from "../../utils/common";

export default function ChatRoom() {
  const item = useLocalSearchParams(); //second user from chatlist
  const { user } = useAuth(); //currently logged in
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const textRef = useRef(); //updating ref do not rerender the app
  const inputRef = useRef(null);
  const scroolViewRef = useRef(null);

  useEffect(() => {
    createRoomIfNotExist();

    let roomId = getRoomId(user?.uid, item?.uid); //user1.id-user2.id
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");

    const q = query(messagesRef, orderBy("createdAt", "asc"));

    let unsubscribe = onSnapshot(q, (querySnapshot) => {
      let allMessages = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollView
    );

    return () => {
      unsubscribe();
      keyboardDidShowListener.remove();
    };
  }, []);

  const createRoomIfNotExist = async () => {
    //roomid
    let roomId = getRoomId(user?.uid, item?.uid); //user1.id-user2.id
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    console.log("clicked");

    //send message to firebase
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.uid, item?.uid); //user1.id-user2.id
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef.current) inputRef.current.clear();

      await addDoc(messagesRef, {
        uid: user?.uid,
        text: message,
        profileurl: user?.profileurl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      alert("Message", error.message);
    }
  };

  useEffect(() => {
    updateScrollView();
  }, [messages]);
  const updateScrollView = () => {
    setTimeout(() => {
      scroolViewRef?.current?.scrollToEnd({ animated: true });
    });
  };

  return (
    <CustomKeyboardView inChat={true}>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View className="h-3 border-b border-neutral-300" />
        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
          <View className="flex-1">
            <MessageList
              scroolViewRef={scroolViewRef}
              messages={messages}
              currentUser={user}
            />
          </View>

          <View style={{ marginBottom: hp(2.7) }} className="pt-2">
            <View className="flex-row mx-3 justify-between bg-white border p-2 pl-5 border-neutral-300 rounded-full">
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholder="Type a message..."
                style={{ fontSize: hp(2) }}
                className="flex-1 mr-2"
              />
              <TouchableOpacity
                onPress={handleSendMessage}
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
