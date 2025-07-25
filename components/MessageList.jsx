import { ScrollView } from "react-native";
import MessageItem from "./MessageItem";

export default function MessageList({ messages,currentUser,scroolViewRef }) {
  return (
    <ScrollView
      showverticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
      ref={scroolViewRef}
    >
        {
            messages.map((message, index) => {
                return (
                    <MessageItem message={message} key={index} currentUser={currentUser}/>
                )
            })
        }
    </ScrollView>
  );
}
