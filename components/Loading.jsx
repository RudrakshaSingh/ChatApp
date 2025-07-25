import LottieView from 'lottie-react-native'
import { View } from 'react-native'

export default function Loading({size}) {
  return (
    <View style={{height:size,aspectRatio:1}} >
      <LottieView
      style={{flex:1}}
        source={require('../assets/animations/loading.json')}
        autoPlay
        loop
      />
    </View>
  )
}