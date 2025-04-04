import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

const Svg1 = require('../../assets/undraw/page1img.svg').default;

const Page1 = () => {
  // All hooks called unconditionally at the top
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const [fontsLoaded] = useFonts({
    'TT Commons': require('../../assets/fonts/TT Commons Medium.otf'),
    'Acorn-Regular': require('../../assets/fonts/acorn-7.ttf'),
  });

  // Get dimensions after hooks
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const svgSize = Math.min(screenWidth * 0.85, screenHeight * 0.6);

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F5BCDD" />
      </SafeAreaView>
    );
  }

  const handleNextPress = () => {
    router.push('/page2'); // Navigate to page2
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#FFFDF7',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <View style={{
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
      }}>
        <Svg1
          width={svgSize}
          height={svgSize}
          preserveAspectRatio="xMidYMid meet"
        />
        
        {/* Indicator dots */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          width: '100%',
          marginTop: 20,
        }}>
          <View style={{
            width: "25%",
            height: 10, // Fixed height instead of percentage
            backgroundColor: '#252525',
            borderRadius: 10,
          }} />
          <View style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: '#AB576C',
          }} />
          <View style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: '#AB576C',
          }} />
        </View>

        <Text style={{
          fontSize: Math.min(screenWidth * 0.098, 40),
          marginTop: screenHeight * 0.05,
          color: '#000000',
          fontFamily: 'Acorn-Regular'
        }}>
          Your Safe Space
        </Text>

        <Text style={{
          fontSize: Math.min(screenWidth * 0.1, 22),
          width: '90%',
          textAlign: 'center',
          marginTop: screenHeight * 0.05,
          color: '#000000',
          fontFamily: 'TT Commons'
        }}>
          Track your moods, reflect with guided journals, and unwind with calming exercises
        </Text>

        {/* NEXT Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: isPressed ? '#FB89CB' : '#F5BCDD',
            paddingVertical: 15,
            paddingHorizontal: 40,
            borderRadius: 30,
            marginTop: screenHeight * 0.08,
          }}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={handleNextPress} // Using the navigation handler
        >
          <Text style={{
            color: '#000000',
            fontFamily: 'TT Commons',
            fontSize: 20,
            fontWeight: '500',
          }}>
            NEXT
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Page1;