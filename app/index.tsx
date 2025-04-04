import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router

const logo = require('../assets/icons/logo.jpg');

export default function Index() {
  const router = useRouter(); // Get the router object
  
  // Get screen dimensions
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  
  // Load your custom font
  const [fontsLoaded] = useFonts({
    'Acorn-Regular': require('../assets/fonts/acorn-7.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Set a timer to navigate after 3 seconds (3000 milliseconds)
      const timer = setTimeout(() => {
        router.replace('/page1'); // Navigate to the first onboarding page
      }, 1000);
      
      // Clear the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, router]);

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <View style={{ 
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
      }}>
        <Image
          source={logo}
          style={{
            width: Math.min(screenWidth * 0.9, 500), // Won't exceed 500px
            aspectRatio: 1,
          }}
          contentFit="contain"
          transition={200}
        />
        <Text style={{
          fontSize: screenWidth * 0.04,
          fontWeight: '400',
          color: '#000000',
          marginTop: -screenHeight * 0.02,
          fontFamily: 'Acorn-Regular'
        }}>
          by mindsync
        </Text>
      </View>
      <Text style={{
        marginTop: screenHeight * 0.05,
        fontSize: Math.min(screenWidth * 0.08, 40), // Won't exceed 40px
        color: '#000000',
        textAlign: 'center',
        width: '80%',
        fontFamily: 'Acorn-Regular'
      }}>
        Come as you are
      </Text>
      <Text style={{
        fontSize: Math.min(screenWidth * 0.08, 40), // Won't exceed 40px
        color: '#000000',
        textAlign: 'center',
        width: '80%',
        fontFamily: 'Acorn-Regular'
      }}>
         leave a little lighter
      </Text>
    </SafeAreaView>
  );
}