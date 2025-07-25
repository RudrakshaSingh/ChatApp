import { Image } from "expo-image";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { db } from "../firebaseConfig";
import { blurhash, formatDate, getRoomId } from "../utils/common";


export default function ChatItem({ item, noBorder, router,currentUser }) {

  const [lastMessage, setLastMessage] = useState(undefined);


  const openChatRoom = () => {
    router.push({pathname: "/ChatRoom/",params:item});
  };

  useEffect(() => {
  
      let roomId = getRoomId(currentUser?.uid, item?.uid); //user1.id-user2.id
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
  
      const q = query(messagesRef, orderBy("createdAt", "desc"));
  
      let unsubscribe = onSnapshot(q, (querySnapshot) => {
        let allMessages = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        setLastMessage(allMessages[0]?allMessages[0]:null);
      });
      return unsubscribe;
    }, []);

    const renderTime = () => {
      let date = lastMessage?.createdAt;

      return formatDate(new Date(date?.seconds * 1000));
      
    };

    const renderLastMessage = () => {
      if(typeof lastMessage==="undefined")return "loading..."
      if(lastMessage){
        if(lastMessage.uid===currentUser?.uid){
          return "You: "+lastMessage?.text
        }
        return lastMessage?.text
      }else{
          return "Say Hi👋😊!"
        }
    };
    
  return (
    <TouchableOpacity onPress={openChatRoom}
      className={`flex-row items-center justify-between mx-4 gap-3 mb-4 pb-2  ${
        noBorder ? "" : "border-b border-neutral-200"
      }`}
    >
      <Image
        style={{
          height: hp(6),
          width: hp(6),
          aspectRatio: 1,
          borderRadius: 100,
        }}
        source={{ uri: item.profileurl }}
        placeholder={blurhash}
        transition={500}
      />

      <View className="flex-1 gap-1">
        <View className="flex-row  justify-between">
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-700"
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            {renderTime()}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
