import { View, StyleSheet, TextInput, Text } from 'react-native';
import { useState } from 'react';
import Buttonskip from "@/components/Buttonskip";
import NextButton from '../../components/NextButton';
import { useRouter } from 'expo-router';

export default function Question1() {
  const [name, setName] = useState('');
  const handleNextPress = () => {
    router.push('/q5'); // Navigate to page2
  };

  const handleSkip = () => {
    console.log('Skip button pressed');
    // Add your custom logic here
  };
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  return (
    <View style={styles.container}>
      <Buttonskip onPress={handleSkip} />

      {/* Centered Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.inputLabel}>What time do you usually wake up in the morning?</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="7 AM.."
          placeholderTextColor="#888"
          autoFocus={true}
          returnKeyType="done"
        />
      </View>

      <NextButton
        onPress={handleNextPress}
        disabled={!name.trim()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF7',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputLabel: {
    fontFamily: 'TT Commons',
    fontSize: 28,
    color: '#000',
    marginBottom: 24,  // Increased margin
    textAlign: 'center',
  },
  input: {
    height: 60,  // Increased height from 50 to 60
    width: '100%',
    borderWidth: 2,  // Thicker border
    borderColor: '#F8A4A4',
    borderRadius: 16,  // Larger border radius
    paddingHorizontal: 20,
    fontSize: 20,  // Larger font size
    fontFamily: 'TT Commons',
    backgroundColor: '#FFF',
    textAlign: 'center',
    paddingVertical: 16,  // Added vertical padding
  },
});