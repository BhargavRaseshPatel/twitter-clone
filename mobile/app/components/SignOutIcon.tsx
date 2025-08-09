import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import * as Linking from 'expo-linking'
import { Feather } from '@expo/vector-icons'
import { useClerk } from '@clerk/clerk-expo'

const SignOutIcon = () => {
    // Use `useClerk()` to access the `signOut()` function
    const { signOut } = useClerk()

    const signOutUser = async () => {
        try {
            await signOut()
            // Redirect to your desired page
            Linking.openURL(Linking.createURL('/'))
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }
    
    const handleSignOut = async () => {

        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", style: "destructive", onPress: () => signOutUser() }
        ])

    }
    return (
        <TouchableOpacity onPress={handleSignOut}>
            <Feather name='log-out' size={24} color={"#E0245E"} />
        </TouchableOpacity>
    )
}

export default SignOutIcon