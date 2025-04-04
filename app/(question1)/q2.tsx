import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import Buttonskip from "@/components/Buttonskip";
import QuestionCard from '../../components/QuestionCard';
import NextButton from '../../components/NextButton';
import { useRouter } from 'expo-router';

export default function Question2() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();
  const handleNextPress = () => {
    router.push('/q3'); // Navigate to page2
  };
  const question = "What can we do to help you?";
  const options = [
    { id: '1', text: 'Mood Tracking & Insights' },
    { id: '2', text: 'Stress & Anxiety Relief' },
    { id: '3', text: 'Better Sleep & Wind-Down' },
    { id: '4', text: 'Self-Compassion & Kindness' },
    { id: '5', text: 'Habit Building (The Gentle Way)' },
    { id: '6', text: 'Community & Shared Stories' },
  ];
  const handleSkip = () => {
    console.log('Skip button pressed');
    // Add your custom logic here
  };
  return (
    <View style={styles.container}>
      <Buttonskip onPress={handleSkip} />

      <QuestionCard
        question={question}
        options={options}
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
      />

      <NextButton
        onPress={handleNextPress}
        disabled={!selectedOption}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF7',
    paddingTop: 50,
  },
});