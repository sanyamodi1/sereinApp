import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function OnboardingLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFDF7' }}>
      <Stack
        screenOptions={{
          headerShown: false, // Hide header for all screens
          animation: 'fade', // Smooth transition between screens
        }}
      >
        <Stack.Screen name="page1" options={{ title: 'Onboarding 1' }} />
        <Stack.Screen name="page2" options={{ title: 'Onboarding 2' }} />
        <Stack.Screen name="page3" options={{ title: 'Onboarding 3' }} />
      </Stack>
    </View>
  );
}