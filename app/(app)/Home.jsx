import { Pressable, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const { logout,user } = useAuth();
  console.log("Ukkkkkserssss in Home:", user);
  const handleLogout = async() => {
    await logout();
  }
  return (
    <View className="flex-1 bg-white">
      <Text>Home</Text>
      <Pressable onPress={handleLogout}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  )
}

export default Home