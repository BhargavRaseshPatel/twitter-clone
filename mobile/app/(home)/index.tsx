import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { Link, Redirect } from 'expo-router'
import { Text, View } from 'react-native'
import { SignOutButton } from '@/app/components/SignOutButton'

export default function Page() {
    const { user } = useUser()

    const { isSignedIn } = useAuth()

    if (isSignedIn) {
        return <Redirect href={'/(tabs)'} />
    }

    return (
        <View className="flex-1 p-5 justify-center items-center">
            <SignedIn>
                {/* <Text className="text-base mb-5">Hello {user?.emailAddresses[0].emailAddress}</Text>
            <SignOutButton /> */}
            </SignedIn>
            <SignedOut>
                <Link href="/(auth)/sign-in" className="my-2.5 p-2.5 bg-[#1DA1F2] rounded w-[200px] items-center">
                    <Text className="text-white text-base font-bold">Sign in</Text>
                </Link>
                <Link href="/(auth)/sign-up" className="my-2.5 p-2.5 bg-[#1DA1F2] rounded w-[200px] items-center">
                    <Text className="text-white text-base font-bold">Sign up</Text>
                </Link>
            </SignedOut>
        </View>
    )
}