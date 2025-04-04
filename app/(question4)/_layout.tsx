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
        <Stack.Screen name="q41" options={{ title: 'Question 3-1' }} />
        <Stack.Screen name="q42" options={{ title: 'Question 3-2' }} />
        <Stack.Screen name="q43" options={{ title: 'Question 3-3' }} />
      </Stack>
    </View>
  );
}