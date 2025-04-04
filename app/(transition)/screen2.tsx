import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState , useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

const Trans1 = require('../../assets/undraw/transition2.svg').default;

const Screen2 = () => {
  // All hooks called unconditionally at the top
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const [fontsLoaded] = useFonts({
    'TT Commons': require('../../assets/fonts/TT Commons Medium.otf'),
    'Acorn-Regular': require('../../assets/fonts/acorn-7.ttf'),
  });

  // Get dimensions after hooks
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const svgSize = Math.min(screenWidth * 0.9, screenHeight * 0.9);

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F5BCDD" />
      </SafeAreaView>
    );
  }

useEffect(() => {
    if (fontsLoaded) {
     // Set a timer to navigate after 3 seconds (3000 milliseconds)
      const timer = setTimeout(() => {
        router.replace('/q21'); // Navigate to the first onboarding page
      }, 2000);
      
    //  Clear the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, router]);

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
        <Trans1
          transition={200}
          width={svgSize}
          height={svgSize}
          preserveAspectRatio="xMidYMid meet"
        />
        
        {/* Indicator dots */}
        <Text style={{
          fontSize: Math.min(screenWidth * 0.098, 40),
          marginTop: -(screenHeight * 0.03),
          color: '#000000',
          textAlign: 'center',
          fontFamily: 'Acorn-Regular'
        }}>
          Understanding Your Emotions & Well-being
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Screen2;