import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

const Svg3 = require('../../assets/undraw/page3img.svg').default;

const Page3 = () => {
  const router = useRouter();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const svgSize = Math.min(screenWidth * 0.85, screenHeight * 0.6);
  const [isPressed, setIsPressed] = useState(false);
  // Load fonts - must be at the top level
  const [fontsLoaded] = useFonts({
    'TT Commons': require('../../assets/fonts/TT Commons Medium.otf'),
    'Acorn-Regular': require('../../assets/fonts/acorn-7.ttf'), // Added if not already loaded
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F5BCDD" />
      </SafeAreaView>
    );
  }

  const handleNextPress = () => {
    router.push('/screen1'); // Navigate to page2
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
        <Svg3
          transition={200}
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
          marginTop: 30,
        }}>

          <View style={{
            width: "20%",
            height: '90%',
            backgroundColor: '#252525',
            borderRadius: 10,
          }} />
          <View style={{
            width: 12,
            aspectRatio: 1,
            borderRadius: '50%',
            backgroundColor: '#F55D5D',
          }} />

          <View style={{
            width: 12,
            aspectRatio: 1,
            borderRadius: '50%',
            backgroundColor: '#F55D5D',
          }} />
        </View>

        <Text style={{
          fontSize: Math.min(screenWidth * 0.09, 40),
          textAlign: 'center',
          marginTop: screenHeight * 0.05,
          fontWeight: '400',
          color: '#000000',
          fontFamily: 'Acorn-Regular'
        }}>
          Feel Lighter, Together

        </Text>

        <Text style={{
          fontSize: Math.min(screenWidth * 0.1, 22),
          width: '92%',
          textAlign: 'center',
          marginTop: screenHeight * 0.04,
          fontWeight: '400',
          color: '#000000',
          fontFamily: 'TT Commons'
        }}>
          Find your people. Share your journey. Grow together.
        </Text>

        {/* NEXT Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: isPressed ? '#FF5E5E' : '#FE9191',
            paddingVertical: 15,
            paddingHorizontal: 40,
            borderRadius: 30,
            marginTop: screenHeight * 0.09,
          }}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={handleNextPress}
        >
          <Text style={{
            color: '#000000',
            fontFamily: 'TT Commons',
            fontSize: 22,
            fontWeight: '500',
          }}>
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Page3;