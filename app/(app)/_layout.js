import { Stack } from 'expo-router'
import HomeHeader from '../../components/HomeHeader'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="Home"
      options={{ header: () => <HomeHeader /> }} />
      <Stack.Screen
        name="Profile"
        options={{ headerShown: false }}
      />

    </Stack>
  )
}

export default _layout