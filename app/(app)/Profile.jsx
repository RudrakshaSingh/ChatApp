import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Profile() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Safely parse the JSON
  let user = {};
  try {
    user = JSON.parse(params.user);
  } catch (e) {
    console.error("Invalid user param:", e);
  }
  
  console.log("hhh", user);

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Custom Header */}
      <View 
        style={{ paddingTop: hp(6), paddingHorizontal: wp(5), paddingBottom: hp(2) }}
        className="bg-white border-b border-gray-200"
      >
        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={hp(3)} color="#374151" />
          </TouchableOpacity>
          <Text 
            style={{ fontSize: hp(2.5) }}
            className="font-semibold text-gray-900"
          >
            Profile
          </Text>
          <TouchableOpacity>
            <Feather name="more-vertical" size={hp(3)} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Section */}
        <View 
          style={{ paddingVertical: hp(4) }}
          className="items-center bg-white mb-5"
        >
          <View 
            style={{ marginBottom: hp(2) }}
            className="items-center"
          >
            {user.profileurl ? (
              <Image 
                source={{ uri: user.profileurl }} 
                style={{ 
                  width: hp(12), 
                  height: hp(12), 
                  borderRadius: hp(6) 
                }}
                className="object-cover"
              />
            ) : (
              <View 
                style={{ 
                  width: hp(12), 
                  height: hp(12), 
                  borderRadius: hp(6) 
                }}
                className="bg-gray-200 items-center justify-center"
              >
                <Ionicons name="person" size={hp(6)} color="#6B7280" />
              </View>
            )}
          </View>
          
          <Text 
            style={{ fontSize: hp(3) }}
            className="font-semibold text-gray-900 mb-1"
          >
            {user.username || 'Unknown User'}
          </Text>
          
          <Text 
            style={{ fontSize: hp(1.5) }}
            className="text-gray-600 text-center"
          >
            ID: {user.uid || 'N/A'}
          </Text>
        </View>
        
        {/* Action Buttons */}
        <View 
          style={{ paddingVertical: hp(2) }}
          className="flex-row justify-around bg-white mb-5"
        >
          <TouchableOpacity className="flex-1 items-center">
            <MaterialIcons name="edit" size={hp(2.5)} color="#3B82F6" />
            <Text 
              style={{ fontSize: hp(1.5), marginTop: hp(0.5) }}
              className="text-blue-500 font-medium"
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-1 items-center">
            <Ionicons name="settings-outline" size={hp(2.5)} color="#3B82F6" />
            <Text 
              style={{ fontSize: hp(1.5), marginTop: hp(0.5) }}
              className="text-blue-500 font-medium"
            >
              Settings
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Profile Options */}
        <View 
          style={{ marginHorizontal: wp(4) }}
          className="bg-white rounded-xl"
        >
          <TouchableOpacity 
            style={{ paddingVertical: hp(2), paddingHorizontal: wp(5) }}
            className="flex-row justify-between items-center border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <Ionicons name="person-outline" size={hp(3)} color="#6B7280" />
              <Text 
                style={{ fontSize: hp(2), marginLeft: wp(4) }}
                className="text-gray-900"
              >
                Personal Info
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={hp(2.5)} color="#D1D5DB" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{ paddingVertical: hp(2), paddingHorizontal: wp(5) }}
            className="flex-row justify-between items-center border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <Ionicons name="notifications-outline" size={hp(3)} color="#6B7280" />
              <Text 
                style={{ fontSize: hp(2), marginLeft: wp(4) }}
                className="text-gray-900"
              >
                Notifications
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={hp(2.5)} color="#D1D5DB" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{ paddingVertical: hp(2), paddingHorizontal: wp(5) }}
            className="flex-row justify-between items-center border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <Ionicons name="shield-outline" size={hp(3)} color="#6B7280" />
              <Text 
                style={{ fontSize: hp(2), marginLeft: wp(4) }}
                className="text-gray-900"
              >
                Privacy
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={hp(2.5)} color="#D1D5DB" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{ paddingVertical: hp(2), paddingHorizontal: wp(5) }}
            className="flex-row justify-between items-center border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <Feather name="help-circle" size={hp(3)} color="#6B7280" />
              <Text 
                style={{ fontSize: hp(2), marginLeft: wp(4) }}
                className="text-gray-900"
              >
                Help & Support
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={hp(2.5)} color="#D1D5DB" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{ paddingVertical: hp(2), paddingHorizontal: wp(5) }}
            className="flex-row justify-between items-center"
          >
            <View className="flex-row items-center">
              <MaterialIcons name="logout" size={hp(3)} color="#EF4444" />
              <Text 
                style={{ fontSize: hp(2), marginLeft: wp(4) }}
                className="text-red-500"
              >
                Sign Out
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={hp(2.5)} color="#D1D5DB" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
