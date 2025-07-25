import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function ChatRoom() {
    const item=useLocalSearchParams();
    console.log(item);
    
  return (
    <View>
      <Text>ChatRoom</Text>
    </View>
  )
}