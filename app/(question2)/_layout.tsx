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
        <Stack.Screen name="q21" options={{ title: 'Question 2-1' }} />
        <Stack.Screen name="q22" options={{ title: 'Question 2-2' }} />
        <Stack.Screen name="q23" options={{ title: 'Question 2-3' }} />
      </Stack>
    </View>
  );
}