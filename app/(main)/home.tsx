import { View, Image, ScrollView, Text, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long'
  });

  const [fontsLoaded] = useFonts({
    'TT Commons': require('../../assets/fonts/TT Commons Medium.otf'),
    'Acorn-Regular': require('../../assets/fonts/acorn-7.ttf'),
  });

  if (!fontsLoaded) return null;

  const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

  // Get current week dates (Sunday to Saturday)
  const getWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const dates = [];

    // Start from Sunday
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - currentDay);

    for (let i = 0; i < 7; i++) {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      dates.push({
        day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
        date: date.getDate(),
        isToday: date.getDate() === today.getDate()
      });
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const emojiData = [
    {
      component: require('../../assets/undraw/emoji.svg').default,
      label: 'Calm'
    },
    {
      component: require('../../assets/undraw/emoji2.svg').default,
      label: 'Happy'
    },
    {
      component: require('../../assets/undraw/emoji3.svg').default,
      label: 'Energetic'
    },
    {
      component: require('../../assets/undraw/emoji4.svg').default,
      label: 'Sad'
    },
    {
      component: require('../../assets/undraw/emoji5.svg').default,
      label: 'Angry'
    },
    {
      component: require('../../assets/undraw/emoji6.svg').default,
      label: 'Guilty'
    },
    {
      component: require('../../assets/undraw/emoji7.svg').default,
      label: 'Confused'
    }
    ,
    {
      component: require('../../assets/undraw/emoji8.svg').default,
      label: 'Anxious'
    }
    ,
    {
      component: require('../../assets/undraw/emoji9.svg').default,
      label: 'Don\'t Know'
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFDF7' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#FFD5D4', '#E47572']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            width: '100%',
            paddingBottom: 20,
            height: screenHeight * 0.5,
          }}
        >
          <View style={styles.dateHeader}>
            <Text style={styles.dateText}>
              {formattedDate}
            </Text>
          </View>
          <Text style={styles.greeting}>hi sanya</Text>
          <Text style={styles.question}>How are you feeling today?</Text>

          {/* 7-Day Calendar */}
          <View style={styles.calendarStrip}>
            {weekDates.map((day, index) => (
              <View key={index} style={[styles.dayContainer, day.isToday && styles.todayContainer]}>
                <Text style={[styles.dayName]}>
                  {day.day}
                </Text>
                <Text style={[styles.dateNumber]}>
                  {day.date}
                </Text>
              </View>
            ))}
          </View>
          <View style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: screenWidth,
            marginTop: 20,
          }}>
            <Text style={{
              marginTop: 20,
              fontSize: 50,
              fontFamily: 'TT Commons',
              color: '#252525',
              fontWeight: '200'
            }}>
              High Energy
            </Text>
            <Text style={{
              marginTop: 5,
              fontSize: 50,
              fontFamily: 'TT Commons',
              color: '#252525',
              fontWeight: '200'
            }}>
              Phase
            </Text>
          </View>
        </LinearGradient>
        <Text style={{
          fontSize: 22,
          fontFamily: 'TT Commons',
          color: '#252525',
          fontWeight: '200',
          paddingLeft: 15,
          marginBottom: 20
        }}>
          Your Daily Check-In
        </Text>
        <View style={{
          height: 100, // Slightly taller to accommodate rounded corners
          marginTop: 10,
          marginHorizontal: 15,
          borderRadius: 20, // This creates the rounded corners
          backgroundColor: '#FFF5F5', // Light pink background
          shadowColor: '#000', // Optional shadow
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3, // For Android shadow
          overflow: 'hidden', // Important to clip the scroll content
        }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingVertical: 15, // Added vertical padding
              alignItems: 'center',
            }}
          >
            {emojiData.map((item, index) => (
              <View
                key={index}
                style={{
                  width: 70,
                  marginRight: 15,
                  alignItems: 'center',
                }}
              >
                <View style={{
                  backgroundColor: 'white',
                  borderRadius: 50,
                  padding: 10,
                  marginBottom: 5,
                }}>
                  <item.component
                    width={40}
                    height={40}
                    preserveAspectRatio="xMidYMid meet"
                  />
                </View>
                <Text style={{
                  fontFamily: 'TT Commons',
                  fontSize: 14,
                  color: '#252525',
                }}>
                  {item.label}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dateHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 20
  },
  dateText: {
    fontSize: 26,
    fontFamily: 'TT Commons',
    color: '#252525',
    fontWeight: '500'
  },
  greeting: {
    fontSize: 28,
    paddingLeft: 15,
    fontFamily: 'Acorn-Regular',
    color: '#252525',
    fontWeight: '500',
  },
  question: {
    fontSize: 22,
    fontFamily: 'TT Commons',
    color: '#252525',
    fontWeight: '200',
    paddingLeft: 15,
    marginBottom: 20
  },
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  dayContainer: {
    alignItems: 'center',
    width: 45,
    paddingVertical: 8,
    borderRadius: 20,
  },
  todayContainer: {
    backgroundColor: '#FFFDF7',
  },
  dayName: {
    fontFamily: 'TT Commons',
    color: '#252525',
    fontSize: 20,
    marginBottom: 5,
  },
  dateNumber: {
    fontFamily: 'TT Commons',
    color: '#252525',
    fontSize: 20,
  },
});

export default Home;