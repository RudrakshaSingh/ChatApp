import { ActivityIndicator, View } from 'react-native'
import "../global.css"


//loader page with loading sign
const StartPage = () => {
  return (
    <View className="flex-1 justify-center">
      <ActivityIndicator size="large" color="gray"/>
    </View>
  )
}

export default StartPage