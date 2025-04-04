import { Stack } from "expo-router";
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFDF7' }}>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFDF7' } // Ensures all screens have this bg
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(transition)" />
        <Stack.Screen name="(question1)" />
        <Stack.Screen name="(main)" />
      </Stack>
    </View>
  );
}