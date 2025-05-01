import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import scale from '../styles'
import { useRouter } from 'expo-router';

type Habit = {
    id: string;
    title: string;
    progress: string;
    current: number;
    target: number;
    icon: string;
    color: string;
};

type EmojiItem = {
    id: string;
    component: React.ComponentType<{ width: number; height: number; preserveAspectRatio: string }>;
    label: string;
};
type MoodEntry = {
    id: string;
    mood: string;
    date: string;
};

type EmojiContainerProps = {
    onMoodSelect?: (moodId: string) => void;
    disableNavigation?: boolean;
};
const EmojiContainer = ({ onMoodSelect, disableNavigation = false }: EmojiContainerProps) => {
    const router = useRouter();

    const handleNextPress = () => {
        if (!disableNavigation) {
            router.push('/DailyCheckIn');
        }
    };
    const [error, setError] = useState<string | null>(null);
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const apiService = {
        fetchMoods: async (): Promise<MoodEntry[]> => {
            // Replace with actual API call
            return [
                { id: '1', mood: 'happy', date: new Date().toISOString() },
                // Add more mood entries...
            ];
        },
        submitMood: async (mood: string): Promise<boolean> => {
            // Replace with actual API call
            return true;
        }
    };
    const handleMoodSelect = async (moodId: string) => {
        try {
          setSelectedMood(moodId);
          const success = await apiService.submitMood(moodId);
          if (!success) {
            throw new Error('Failed to submit mood');
          }
          onMoodSelect?.(moodId); // Optional chaining in case parent doesn't provide
        } catch (err) {
          setError('Failed to submit mood selection');
          console.error(err);
        }
      };
    const emojiData: EmojiItem[] = [
        { id: '1', component: require('../assets/undraw/emoji.svg').default, label: 'Calm' },
        { id: '2', component: require('../assets/undraw/emoji2.svg').default, label: 'Happy' },
        { id: '3', component: require('../assets/undraw/emoji3.svg').default, label: 'Energetic' },
        { id: '4', component: require('../assets/undraw/emoji4.svg').default, label: 'Sad' },
        { id: '5', component: require('../assets/undraw/emoji5.svg').default, label: 'Angry' },
        { id: '6', component: require('../assets/undraw/emoji6.svg').default, label: 'Guilty' },
        { id: '7', component: require('../assets/undraw/emoji7.svg').default, label: 'Confused' },
        { id: '8', component: require('../assets/undraw/emoji8.svg').default, label: 'Anxious' },
        { id: '9', component: require('../assets/undraw/emoji9.svg').default, label: "Don't Know " },
    ];
    return (
        <View style={styles.emojiScrollContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.emojiScrollContent}
            >
                {emojiData.map((item) => (
                    <TouchableOpacity onPress={handleNextPress} key={item.id} style={styles.emojiItem}>
                        <View
                            style={[
                                styles.emojiCircle,
                                selectedMood === item.id && styles.selectedEmojiCircle
                            ]}
                            onTouchEnd={() => handleMoodSelect(item.id)}
                        >
                            <item.component
                                width={scale(30)}
                                height={scale(30)}
                                preserveAspectRatio="xMidYMid meet"
                            />
                        </View>
                        <Text style={styles.emojiLabel}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    emojiScrollContainer: {
        height: scale(80),
        marginTop: scale(5),
        marginHorizontal: scale(5),
        borderRadius: scale(20),
        backgroundColor: '#FFF5F5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    emojiScrollContent: {
        paddingHorizontal: scale(10),
        paddingVertical: scale(10),
        alignItems: 'center',
    },
    emojiItem: {
        width: scale(70),
        marginRight: scale(18),
        alignItems: 'center',
    },
    emojiCircle: {
        backgroundColor: 'white',
        borderRadius: scale(50),
        padding: scale(8),
        marginBottom: scale(6),
    },
    emojiLabel: {
        fontFamily: 'TT Commons',
        fontSize: scale(12),
        color: '#252525',
        textAlign: 'center',
    },
    selectedEmojiCircle: {
        borderWidth: 2,
        borderColor: '#E47572'
    }

})
export default EmojiContainer