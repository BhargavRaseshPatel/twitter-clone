import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignOutIcon from '../components/SignOutIcon'
import { useUserSync } from '@/hooks/useUserSync'
import { useAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import PostComposer from '../components/PostComposer'
import PostsList from '../components/PostsList'

const HomeScreen = () => {
    const { getToken } = useAuth()
    useUserSync()

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-row justify-between items-center px-4 py-3 border-gray-100'>
                <Ionicons name='logo-twitter' size={24} color={"#1DA1F2"} />
                <Text className='text-xl font-bold text-gray-900'>Home</Text>
                <SignOutIcon />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className='flex-1' contentContainerStyle={{paddingBottom : 80}}>
                <PostComposer/>
                <PostsList />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen