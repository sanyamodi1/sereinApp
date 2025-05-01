import { Stack, useRouter, usePathname } from 'expo-router';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';

// Define your valid route types (consistent with file names)
type AppRoute = '/' | '/home' | '/messages' | '/community' | '/Partner' | '/NewHabit';

export default function OnboardingLayout() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Main content container with padding for navbar */}
      <View style={styles.contentContainer}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        >
          <Stack.Screen name="home" />
          <Stack.Screen name="messages" />
          <Stack.Screen name="community" />
          <Stack.Screen name="Partner" />
          <Stack.Screen name="NewHabit" /> {/* Consistent with file name */}
        </Stack>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <NavButton 
          icon={<Ionicons name="home" size={24} />} 
          label="Home" 
          route="/home"
          isActive={pathname === '/home'}
        />
        <NavButton 
          icon={<Ionicons name="chatbubble-ellipses" size={24} />} 
          label="Messages" 
          route="/messages"
          isActive={pathname === '/messages'}
        />
        <NewHabitButton onPress={() => router.push('/NewHabit')} />
        <NavButton 
          icon={<MaterialCommunityIcons name="account-group" size={24} />} 
          label="Community" 
          route="/community"
          isActive={pathname === '/community'}
        />
        <NavButton 
          icon={<FontAwesome5 name="heart" size={24} />} 
          label="Partner" 
          route="/Partner"
          isActive={pathname === '/Partner'}
        />
      </View>
    </SafeAreaView>
  );
}

interface NavButtonProps {
  icon: React.ReactElement;
  label: string;
  route: AppRoute;
  isActive: boolean;
}

const NavButton = ({ icon, label, route, isActive }: NavButtonProps) => {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      style={styles.navButton}
      onPress={() => router.push(route)}
    >
      {React.cloneElement(icon, {
        color: isActive ? '#E47572' : '#8E8E93'
      })}
      <Text style={[styles.navLabel, isActive && styles.activeLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface NewHabitButtonProps {
  onPress: () => void;
}

const NewHabitButton = ({ onPress }: NewHabitButtonProps) => (
  <TouchableOpacity style={styles.newHabitButton} onPress={onPress}>
    <View style={styles.plusIconContainer}>
      <Ionicons name="add" size={28} color="white" />
    </View>
    <Text style={[styles.navLabel, styles.newHabitLabel]}>New Habit</Text>
  </TouchableOpacity>
);

const NAVBAR_HEIGHT = 80;
const BOTTOM_PADDING = 20;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFDF7'
  },
  contentContainer: {
    flex: 1,
    paddingBottom: NAVBAR_HEIGHT + BOTTOM_PADDING // Space for navbar
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: NAVBAR_HEIGHT,
    paddingBottom: BOTTOM_PADDING,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    flex: 1,
  },
  navLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
    fontFamily: 'TT Commons'
  },
  activeLabel: {
    color: '#E47572',
    fontWeight: '500'
  },
  newHabitButton: {
    alignItems: 'center',
    marginTop: -30,
    flex: 1,
  },
  plusIconContainer: {
    backgroundColor: '#E47572',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    shadowColor: '#E47572',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5
  },
  newHabitLabel: {
    color: '#E47572',
    fontWeight: '500'
  }
});