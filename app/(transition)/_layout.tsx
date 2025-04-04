import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function OnboardingLayout() {
  return (
    <View style={{ flex: 1  }}>
      <Stack
        screenOptions={{
          headerShown: false, // Hide header for all screens
          animation: 'fade', // Smooth transition between screens
        }}
      >
        <Stack.Screen name="screen1" options={{ title: 'Transition 1' }} />
        <Stack.Screen name="screen2" options={{ title: 'Transition 2' }} />
        <Stack.Screen name="screen3" options={{ title: 'Transition 3' }} />
        <Stack.Screen name="screen4" options={{ title: 'Transition 4' }} />
      </Stack>
    </View>
  );
}