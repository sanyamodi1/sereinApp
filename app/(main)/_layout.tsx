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
        <Stack.Screen name="home" options={{ title: 'Onboarding 1' }} />
      </Stack>
    </View>
  );
}