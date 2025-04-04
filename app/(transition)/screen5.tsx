import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState , useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

const Trans1 = require('../../assets/undraw/transition51.svg').default;
const Trans2  = require('../../assets/undraw/Transition52.svg').default;

const Screen4 = () => {
  // All hooks called unconditionally at the top
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const [fontsLoaded] = useFonts({
    'TT Commons': require('../../assets/fonts/TT Commons Medium.otf'),
    'Acorn-Regular': require('../../assets/fonts/acorn-7.ttf'),
  });

  // Get dimensions after hooks
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const svgSize = Math.min(screenWidth*1, screenHeight * 0.6);

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
        router.replace('/home'); // Navigate to the first onboarding page
      }, 2000);
      
    //  Clear the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, router]);

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#FFFDF7',
    }}>
      <View style={{
        marginTop: -(50),
        alignItems: 'center',
        width: '100%',
      }}>
        <Trans1
          transition={200}
          width={svgSize}
          height={svgSize}
          preserveAspectRatio="xMidYMid meet"
        />
        
        {/* Indicator dots */}
        <Text style={{
          fontSize: Math.min(screenWidth * 0.04, 40),
          marginTop: (screenHeight * 0.01),
          color: '#000000',
          textAlign: 'center',
          fontFamily: 'Acorn-Regular',
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
         That was quite a ride, wasn’t it? But now, it’s time to focus on you. 
        </Text>
        <Text style={{
          fontSize: Math.min(screenWidth * 0.08, 40),
          color: '#000000',
          textAlign: 'center',
          fontFamily: 'Acorn-Regular',
          padding: 10,
        }}>
         Welcome Aboard!
        </Text>

        <Trans2
          style={{
            marginTop: -(screenHeight * 0.05),
          }}
          transition={200}
          width={svgSize}
          height={svgSize}
          preserveAspectRatio="xMidYMid meet"
        />
      </View>
    </SafeAreaView>
  );
};

export default Screen4;