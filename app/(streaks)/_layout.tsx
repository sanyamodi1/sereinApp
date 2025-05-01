import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function OnboardingLayout() {
  return (
    <View style={{ flex: 1 , backgroundColor: '#FFFDF7' }}>
      <Stack
        screenOptions={{
          headerShown: false, // Hide header for all screens
          animation: 'fade', // Smooth transition between screens
        }}
      >
        <Stack.Screen name="NewStreaks" options={{ title: 'Question 2-1' }} />
        <Stack.Screen name="streak/[id]" options={{ title: 'Question 2-2'
         }} />
        <Stack.Screen name="DailyCheckIn" options={{ title: 'Question 2-3' }} />
      </Stack>
    </View>
  );
}