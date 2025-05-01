import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AichatbotCard from '../../components/AichatbotCard';
import { useRouter } from 'expo-router';

const logo = require('../../assets/icons/logo.jpg'); // Local JPG image

// Mock data for chatbots
const chatbots = [
  {
    id: '1',
    title: 'Journal Buddy',
    subtitle: 'How are you feeling today?',
    // timestamp: '10:30 AM',
    isRead: false,
    unreadCount: 2,
    avatarUri: "", // Replace with your image
  },
  {
    id: '2',
    title: 'Anxiety?',
    subtitle: 'I am here with you...',
    timestamp: 'Yesterday',
    isRead: true,
    unreadCount: 0,
    avatarUri: "", // Replace with your image
  },
  {
    id: '3',
    title: 'Learn about Mental Health',
    subtitle: 'Remember to breathe deeply...',
    timestamp: 'Tuesday',
    isRead: false,
    unreadCount: 5,
    avatarUri: "", // Replace with your image
  },
];

const Messages = () => {
  const screenWidth = Dimensions.get('window').width;
  const [activeChatbot, setActiveChatbot] = React.useState<string | null>(null);
  const router = useRouter();

  const handleChatbotPress = (chatbotId: string, chatbotTitle: string) => {
    setActiveChatbot(chatbotId);
    
    // Navigate based on the chatbot title
    if (chatbotTitle === 'Journal Buddy') {
      router.push('/JournalChat');
    } else if (chatbotTitle === 'Anxiety?') {
      router.push('/AnxietyChat');
    } else {
      // Default navigation if needed
      router.push('/MentalHealthBot');
    }
  };

  return (
    <SafeAreaProvider>
      <ScrollView style={{ flex: 1, backgroundColor: '#FFFDF7' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
          {/* Left-aligned logo */}
          <Image
            source={logo}
            style={{ width: 50, height: 50, resizeMode: 'contain' }}
          />
          {/* Centered title */}
          <View style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontFamily: 'Acorn-Regular' }}>Serein</Text>
          </View>
        </View>

        {/* List of chatbots using your AichatbotCard component */}
        {chatbots.map((chatbot) => (
          <AichatbotCard
            key={chatbot.id}
            title={chatbot.title}
            subtitle={chatbot.subtitle}
            avatarUri={chatbot.avatarUri}
            timestamp={chatbot.timestamp}
            isRead={chatbot.isRead}
            isActive={activeChatbot === chatbot.id}
            containerStyle={{ marginVertical: 8 }}
            onPress={() => handleChatbotPress(chatbot.id, chatbot.title)}
          />
        ))}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Messages;
