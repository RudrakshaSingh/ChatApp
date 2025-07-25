import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { blurhash } from "../utils/common";


export default function ChatItem({ item, noBorder, router }) {

  const openChatRoom = () => {
    router.push({pathname: "/ChatRoom/",params:item});
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
            Time
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          Last message
        </Text>
      </View>
    </TouchableOpacity>
  );
}
