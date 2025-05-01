import { Stack, Redirect } from "expo-router";
import { View, ActivityIndicator } from 'react-native';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <View style={{ flex: 1, backgroundColor: '#FFFDF7' }}>
        <AuthAwareRouter />
      </View>
    </ClerkProvider>
  );
}

function AuthAwareRouter() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FFFDF7' }
      }}
    >
      {/* Index route handles initial redirect */}
      <Stack.Screen
        name="index"
        redirect={!isSignedIn}  // Changed this line
      />

      {/* Public routes (no auth required) */}
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(transition)" />
      <Stack.Screen name="(question1)" />

      {/* Protected routes */}
      {isSignedIn ? (
        <>
          <Stack.Screen name="(main)" />
        </>
      ) : (
        <Redirect href="../(auth)" />  // Changed this to explicitly redirect
      )}
    </Stack>
  );
}