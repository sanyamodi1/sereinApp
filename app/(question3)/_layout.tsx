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
        <Stack.Screen name="q31" options={{ title: 'Question 3-1' }} />
        <Stack.Screen name="q32" options={{ title: 'Question 3-2' }} />
        <Stack.Screen name="q33" options={{ title: 'Question 3-3' }} />
        <Stack.Screen name="q34" options={{ title: 'Question 3-4' }} />
        <Stack.Screen name="q35" options={{ title: 'Question 3-5' }} />
        <Stack.Screen name="q36" options={{ title: 'Question 3-6' }} />
      </Stack>
    </View>
  );
}