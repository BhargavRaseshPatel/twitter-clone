import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignOutIcon from '../components/SignOutIcon'
import { useUserSync } from '@/hooks/useUserSync'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-expo'

const HomeScreen = () => {
    const { getToken } = useAuth()
    useUserSync()

    return (
        <SafeAreaView className='flex-1'>
            <Text>HomeScreen</Text>
            <SignOutIcon />
        </SafeAreaView>
    )
}

export default HomeScreen