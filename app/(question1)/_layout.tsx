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
        <Stack.Screen name="q1" options={{ title: 'Question 1' }} />
        <Stack.Screen name="q2" options={{ title: 'Question 2' }} />
        <Stack.Screen name="q3" options={{ title: 'Question 3' }} />
        <Stack.Screen name="q4" options={{ title: 'Question 4' }} />
        <Stack.Screen name="q5" options={{ title: 'Question 5' }} />
      </Stack>
    </View>
  );
}