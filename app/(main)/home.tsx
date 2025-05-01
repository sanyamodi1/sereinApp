import { View, ScrollView, Text, Dimensions, StyleSheet, ActivityIndicator, Pressable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import CalendarStrip from '../../components/CalendarStrip';
import ProgressCard from '@/components/habits/ProgressCard';
import { useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

type EmojiItem = {
  id: string;
  component: React.ComponentType<{ width: number; height: number; preserveAspectRatio: string }>;
  label: string;
};

type Habit = {
  id: string;
  title: string;
  dailyProgress: number;
  totalTarget: number;
  measurement: string;
  description: string;
  frequency: string; // assuming these are the only options
  streak: number;
  completedDays: number;
  totalDays: number;
  icon: string;
  color: string;
};


type MoodEntry = {
  id: string;
  mood: string;
  date: string;
};

// Screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const scale = (size: number): number => (screenWidth / 375) * size;

// Mock API Service (Replace with actual API calls)
import { habitData } from '../../dummydata/habitData';
import EmojiContainer from '@/components/EmojiContainer';
import { SignOutButton } from '@/components/SignOutButton';

const apiService = {

  // fetchHabits: async (): Promise<Habit[]> => {
  //   try {
  //     const response = await fetch('https://your-api.com/habits');
  //     if (!response.ok) throw new Error('Network response was not ok');
  //     return await response.json();
  //   } catch (error) {
  //     console.error('Error fetching habits:', error);
  //     // You could return the local data as fallback
  //     return habitsData;
  //   }
  // },
  fetchHabits: async (): Promise<Habit[]> => {
    // Now returns the imported data instead of hardcoded values
    return habitData;
  },
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

const Home = () => {
  const { getToken } = useAuth();
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      console.log('Clerk JWT Token:', token);
    };

    fetchToken();
  }, []);
  const router = useRouter();
  const handleNextPress = () => {
    router.push('/DailyCheckIn');
  };
  const handleHabitPress = (habitId: string) => {
    router.push(`/streak/${habitId}`);
  };
  
  // State management
  const [habits, setHabits] = useState<Habit[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Font loading
  const [fontsLoaded] = useFonts({
    'TT Commons': require('../../assets/fonts/TT Commons Medium.otf'),
    'Acorn-Regular': require('../../assets/fonts/acorn-7.ttf'),
  });

  // Format date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long'
  });

  // Emoji data with unique IDs
 

  // Quick habits data
  const quickHabits = [
    { id: '1', title: 'Add A New Habit', color: '#F5BCDD' },
    { id: '2', title: 'Best of luck for your ppt', color: '#ccde92' },
    { id: '3', title: 'High Energy Phase', color: '#c5d8fb' }
  ];

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [habits, moodsData] = await Promise.all([
          apiService.fetchHabits(),
          apiService.fetchMoods()
        ]);
        setHabits(habits);
        setMoodEntries(moodsData);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle mood selection
  const handleMoodSelect = async (moodId: string) => {
    try {
      setSelectedMood(moodId);
      const success = await apiService.submitMood(moodId);
      if (!success) {
        throw new Error('Failed to submit mood');
      }
      // Update local state or refetch data
    } catch (err) {
      setError('Failed to submit mood selection');
      console.error(err);
    }
  };

  if (!fontsLoaded || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E47572" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <LinearGradient
          colors={['#FFD5D4', '#E47572']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradientContainer}
        >
          <View style={styles.dateHeader}>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <SignOutButton/>
          </View>
          <Text style={styles.greeting}>hi sanya</Text>
          <Text style={styles.question}>How are you feeling today?</Text>

          <CalendarStrip />

          <View style={styles.energyContainer}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.energyText}>
              High Energy
            </Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.energyText}>
              Phase
            </Text>
          </View>
        </LinearGradient>

        {/* Mood Selection */}
        <Text style={styles.dailyCheckIn}>Your Daily Check-In</Text>
        <EmojiContainer/>
        <View style={styles.habitListContainer}>
          {quickHabits.map((habit) => (
            <View
              key={habit.id}
              style={[
                styles.habitContainer,
                { backgroundColor: habit.color }
              ]}
            >
              <Text style={styles.habitText}>{habit.title}</Text>
            </View>
          ))}
        </View>

        {/* Progress Cards */}

        {habits.map((habit) => (
          <Pressable
            key={habit.id}
            onPress={()=>handleHabitPress(habit.id)}
          >
            <ProgressCard
              IconComponent={getIconComponent(habit.icon)}
              title={habit.title}
              progressText={`${habit.dailyProgress} / ${habit.totalTarget} ${habit.measurement}`}
              progressValue={habit.dailyProgress / habit.totalTarget}
              scale={scale}
            />
          </Pressable>
        ))}

        {/* Stress Relief Suggestion */}
        <View style={[styles.simemojiScrollContainer, { marginBottom: scale(10) }]}>
          <LinearGradient
            colors={['#BFE88E', '#F9F9F9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.stressGradient}
          >
            <Text style={styles.stressText}>
              Feeling Stressed/Anxious?
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'water':
      return require('../../assets/undraw/Drop.svg').default;
    case 'sleep':
      return require('../../assets/undraw/Group 17.svg').default;
    case 'study':
      return require('../../assets/undraw/laptop.svg').default;
    default:
      return require('../../assets/undraw/Drop.svg').default;
  }
};

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#FFFDF7'
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: scale(20)
  },
  gradientContainer: {
    width: '100%',
    paddingBottom: scale(15),
    height: screenHeight * 0.5,
    minHeight: scale(300)
  },
  dateHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(50),
    marginTop: scale(1)
  },
  dateText: {
    fontSize: scale(20),
    fontFamily: 'TT Commons',
    color: '#252525',
    fontWeight: '500'
  },
  greeting: {
    fontSize: scale(26),
    lineHeight: scale(25),
    paddingLeft: scale(15),
    fontFamily: 'Acorn-Regular',
    color: '#252525',
    fontWeight: '500',
  },
  question: {
    fontSize: scale(18),
    fontFamily: 'TT Commons',
    color: '#252525',
    fontWeight: '200',
    paddingLeft: scale(15),
    marginBottom: scale(6)
  },
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: scale(8),
    paddingVertical: scale(5),
  },
  dayContainer: {
    alignItems: 'center',
    width: scale(45),
    paddingVertical: scale(8),
    borderRadius: scale(20),
  },
  todayContainer: {
    backgroundColor: '#FFFDF7',
  },
  dayName: {
    fontFamily: 'TT Commons',
    color: '#252525',
    fontSize: scale(14),
    marginBottom: scale(4),
  },
  dateNumber: {
    fontFamily: 'TT Commons',
    color: '#252525',
    fontSize: scale(14),
  },
  energyContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: scale(10),
  },
  energyText: {
    marginTop: scale(12),
    fontSize: scale(40),
    fontFamily: 'TT Commons',
    color: '#252525',
    fontWeight: '200',
    textAlign: 'center',
    maxWidth: '100%',
  },
  dailyCheckIn: {
    fontSize: scale(24),
    fontFamily: 'TT Commons',
    color: '#252525',
    fontWeight: '200',
    paddingLeft: scale(15),
    marginTop: scale(15),
    marginBottom: scale(15)
  },
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
  habitListContainer: {
    marginTop: scale(30),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  habitContainer1: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: scale(5),
    height: scale(120),
    width: scale(110),
    padding: scale(10),
    borderRadius: scale(10),
    backgroundColor: '#F5BCDD',
  },
  habitContainer2: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: scale(5),
    height: scale(120),
    width: scale(110),
    padding: scale(10),
    borderRadius: scale(10),
    backgroundColor: '#ccde92',
  },
  habitContainer3: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: scale(5),
    height: scale(120),
    width: scale(110),
    padding: scale(10),
    borderRadius: scale(10),
    backgroundColor: '#c5d8fb',
  },
  habitText: {
    fontFamily: 'TT Commons',
    fontSize: scale(16),
    color: '#252525',
    textAlign: 'center'
  },
  simemojiScrollContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scale(80),
    marginTop: scale(10),
    marginHorizontal: scale(15),
    borderRadius: scale(20),
    backgroundColor: '#FFFDF7',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFDF7'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFDF7'
  },
  errorText: {
    color: '#E47572',
    fontSize: 16,
    textAlign: 'center'
  },
  selectedEmojiCircle: {
    borderWidth: 2,
    borderColor: '#E47572'
  },
  habitContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: scale(5),
    height: scale(120),
    width: scale(110),
    padding: scale(10),
    borderRadius: scale(10),
  },
  stressGradient: {
    height: '100%',
    width: '100%',
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  stressText: {
    fontSize: scale(20),
    textAlign: 'center',
    paddingVertical: scale(10),
    fontFamily: 'Acorn-Regular',
    color: '#252525',
  }
});

export default Home;