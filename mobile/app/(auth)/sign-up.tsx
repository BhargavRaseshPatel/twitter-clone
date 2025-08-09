import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    try {
      // ✅ Clerk Expo SDK expects camelCase
      await signUp.create({
        emailAddress: emailAddress,
        password: password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-1 justify-center">
        <Text className="text-4xl font-bold mb-6 text-center">Sign up</Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
          className="w-full bg-gray-100 p-4 mb-4 rounded-lg"
        />
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          className="w-full bg-gray-100 p-4 mb-6 rounded-lg"
        />
        <TouchableOpacity 
          onPress={onSignUpPress}
          className="bg-blue-500 p-4 rounded-lg mb-4"
        >
          <Text className="text-white text-center font-semibold text-lg">Continue</Text>
        </TouchableOpacity>
        <View className="flex-row justify-center items-center space-x-1">
          <Text className="text-gray-600">Already have an account?</Text>
          <Link href="/sign-in">
            <Text className="text-blue-500 font-semibold">Sign in</Text>
          </Link>
        </View>
      </View>
    </View>
  )
}
