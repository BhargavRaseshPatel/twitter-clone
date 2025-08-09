import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignOutIcon from '../components/SignOutIcon'

const HomeScreen = () => {
  return (
    <SafeAreaView className='flex-1'>
      <Text>HomeScreen</Text>
      <SignOutIcon />
    </SafeAreaView>
  )
}

export default HomeScreen