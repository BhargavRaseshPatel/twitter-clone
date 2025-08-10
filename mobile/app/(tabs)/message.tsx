import { View, Text, Alert, TouchableOpacity, TextInput, ScrollView, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { CONVERSATIONS, ConversationType } from '@/data/conversations'
import { Feather } from '@expo/vector-icons'

// todo : implement this page
const MessageScreen = () => {
    const inserts = useSafeAreaInsets()
    const [searchText, setSearchText] = useState("")
    const [conversationList, setConversationList] = useState(CONVERSATIONS)
    const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [newMessage, setNewMessage] = useState("")

    const deleteConversation = (conversationId: number) => {
        Alert.alert("Delete Conversation", "Are you sure you want to delete this conversation?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    setConversationList((prev) => prev.filter((conv) => conv.id !== conversationId));
                },
            },
        ]);
    };

    const openConversation = (conversation: ConversationType) => {
        setSelectedConversation(conversation);
        setIsChatOpen(true);
    };

    const closeChatModal = () => {
        setIsChatOpen(false);
        setSelectedConversation(null);
        setNewMessage("");
    };

    const sendMessage = () => {
        if (newMessage.trim() && selectedConversation) {
            // update last message in conversation
            setConversationList((prev) =>
                prev.map((conv) =>
                    conv.id === selectedConversation.id
                        ? { ...conv, lastMessage: newMessage, time: "now" }
                        : conv
                )
            );
            setNewMessage("");
            Alert.alert(
                "Message Sent!",
                `Your message has been sent to ${selectedConversation.user.name}`
            );
        }
    };
    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* HEADER  */}
            <View className='flex-row items-center justify-between px-4 py-3 border-b border-gray-100' >
                <Text className='text-xl font-bold text-gray-900'>Messages</Text>
                <TouchableOpacity>
                    <Feather name='edit' size={24} color={"#1DA1F2"} />
                </TouchableOpacity>
            </View>
            {/* Search Bar */}
            <View className="px-4 py-3 border-b border-gray-100">
                <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
                    <Feather name="search" size={20} color="#657786" />
                    <TextInput
                        placeholder="Search for people and groups"
                        className="flex-1 ml-3 text-base"
                        placeholderTextColor="#657786"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>
            </View>

            {/* CONVERSATION LIST  */}

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 + inserts.bottom }}
            >
                {conversationList.map((conversation) => (
                    <TouchableOpacity
                        key={conversation.id}
                        className="flex-row items-center p-4 border-b border-gray-50 active:bg-gray-50"
                        onPress={() => openConversation(conversation)}
                        onLongPress={() => deleteConversation(conversation.id)}
                    >
                        <Image
                            source={{ uri: conversation.user.avatar }}
                            className="size-12 rounded-full mr-3"
                        />

                        <View className="flex-1">
                            <View className="flex-row items-center justify-between mb-1">
                                <View className="flex-row items-center gap-1">
                                    <Text className="font-semibold text-gray-900">{conversation.user.name}</Text>
                                    {conversation.user.verified && (
                                        <Feather name="check-circle" size={16} color="#1DA1F2" className="ml-1" />
                                    )}
                                    <Text className="text-gray-500 text-sm ml-1">@{conversation.user.username}</Text>
                                </View>
                                <Text className="text-gray-500 text-sm">{conversation.time}</Text>
                            </View>
                            <Text className="text-sm text-gray-500" numberOfLines={1}>
                                {conversation.lastMessage}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Quick Actions */}
            <View className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                <Text className="text-xs text-gray-500 text-center">
                    Tap to open • Long press to delete
                </Text>
            </View>

            <Modal
              visible={isChatOpen}
              animationType='slide'
              presentationStyle='pageSheet'
              onRequestClose={closeChatModal}
            >
                {
                    selectedConversation && (
                        <>
                            {/* CHAR HEADER  */}
                            <View className='flex-row items-center px-4 py-3 border-b border-gray-100'>
                                <TouchableOpacity onPress={closeChatModal} className='mr-3'>
                                    <Feather name='arrow-left' size={24} color={"#1DA1F2"} />
                                </TouchableOpacity>
                                <Image
                                    source={{ uri: selectedConversation.user.avatar }}
                                    className="size-12 rounded-full mr-3"
                                />

                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <View className="flex-1 gap-1">
                                            <View className='flex-row'>
                                            <Text className="font-semibold text-gray-900">{selectedConversation.user.name}</Text>
                                            {selectedConversation.user.verified && (
                                                <Feather name="check-circle" size={16} color="#1DA1F2" className="ml-1" />
                                            )}</View>
                                            <Text className="text-gray-500 text-sm ml-1">@{selectedConversation.user.username}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </>
                    )
                }
            </Modal>
        </SafeAreaView>
    )
}

export default MessageScreen