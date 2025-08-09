import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-3xl font-bold mb-8 text-center">Sign in</Text>
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-4 mb-4"
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-4 mb-6"
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity 
        className="w-full bg-blue-500 p-4 rounded-lg mb-4"
        onPress={onSignInPress}
      >
        <Text className="text-white text-center font-semibold text-lg">Continue</Text>
      </TouchableOpacity>
      <View className="flex-row justify-center items-center gap-1">
        <Text className="text-gray-600">Don't have an account?</Text>
        <Link href="/sign-up">
          <Text className="text-blue-500 font-semibold">Sign up</Text>
        </Link>
      </View>
    </View>
  )
}