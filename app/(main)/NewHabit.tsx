import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { ScrollView, Text, View, ActivityIndicator, TouchableOpacity , StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import scale from '@/styles';
import { useRouter } from 'expo-router';
import { habitData } from '@/dummydata/habitData';


const NewHabit = () => {
  const router = useRouter();
  const handleNextPress = () => {
    router.push('/NewStreaks');
  };
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    'TTCommons': require('../../assets/fonts/TT Commons Medium.otf'),
    'Acorn-Regular': require('../../assets/fonts/acorn-7.ttf'),
  });

  // Sample streak data
  const streaks = habitData.map(habit => ({
    id: habit.id,
    name: habit.description,
    days: habit.completedDays,
  }));
  
  if (!fontsLoaded || isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFDF7' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ fontFamily: 'TTCommons', marginTop: 20 }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFDF7' }}>
      <ScrollView style={{ flex: 1, paddingBottom: 20 }}>
        <View style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: scale(50),
          paddingBottom: scale(20),
        }}>
          <Text style={{
            fontSize: scale(30),
            color: '#666',
            fontFamily: 'Acorn-Regular',
            marginBottom: scale(30),
          }}>
            Your Current Streaks
          </Text>
          {/* Streak Boxes */}
          {streaks.map((streak) => (
            <TouchableOpacity
              key={streak.id}
              activeOpacity={0.8}
              onPress={() => router.push({ pathname: '/streak/[id]', params: { id: streak.id.toString() } })}
              style={{
                width: '80%',
                marginBottom: scale(20),
              }}
            >

              <LinearGradient
                colors={['#E47572', '#D96A67']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  height: scale(100),
                  borderRadius: scale(20),
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: scale(15),
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Text style={{
                  fontSize: scale(20),
                  color: '#FFFDF7',
                  fontFamily: 'TTCommons',
                  marginBottom: scale(5),
                  textAlign: 'center',
                }}>
                  {streak.name}
                </Text>
                <Text style={{
                  fontSize: scale(14),
                  color: 'rgba(255, 253, 247, 0.8)',
                  fontFamily: 'TTCommons',
                }}>
                  {streak.days} day streak
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
          {/* Add New Streak Button */}
          <TouchableOpacity
            onPress={handleNextPress}
            activeOpacity={0.8}
            style={{
              width: '80%',
              marginTop: scale(10),
            }}
          >
            <LinearGradient
              colors={['#F5F5F5', '#E8E8E8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                height: scale(100),
                borderRadius: scale(20),
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#E0E0E0',
              }}
            >
              <Text style={{
                fontSize: scale(20),
                color: '#666',
                fontFamily: 'TTCommons',
              }}>
                Add a new Streak +
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}



export default NewHabit;