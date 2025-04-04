
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import Buttonskip from "@/components/Buttonskip";
import QuestionCard from '../../components/QuestionCard';
import NextButton from '../../components/NextButton';
import { useRouter } from 'expo-router';

export default function Question32() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();
  const handleNextPress = () => {
    router.push('/screen5'); // Navigate to page2
  };
  const question = "Would you like gentle bedtime reminders or wind-down exercises?";
  const options = [
    { id: '1', text: 'Yes, that would be nice. 🌿' },
    { id: '2', text: 'Maybe, let me decide later. ' },
    { id: '3', text: 'No, I prefer to check in when I need. ' },
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