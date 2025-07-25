import { StatusBar } from "expo-status-bar";
import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ChatList from "../../components/ChatList";
import Loading from "../../components/Loading";
import { useAuth } from "../../context/AuthContext";
import { usersRef } from "../../firebaseConfig";

const Home = () => {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {

    if (user?.uid) {
      getUsers();
    }
  }, [ user?.uid]);

  const getUsers = async () => {

    //fetch user expect currently logged in user
    
    const q = query(usersRef, where("uid", "!=", user?.uid));
    
    
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    setUsers(data);
  };
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {users.length > 0 ? (
        <ChatList users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <Loading size={hp(30)} />
          <Text
            style={{ fontSize: hp(2) }}
            className="font-semibold text-neutral-600"
          >
            Loading...
          </Text>
        </View>
      )}
    </View>
  );
};

export default Home;
