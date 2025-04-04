import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import Buttonskip from "@/components/Buttonskip";
import QuestionCard from '../../components/QuestionCard';
import NextButton from '../../components/NextButton';
import { useRouter } from 'expo-router';

export default function Question1_2() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();
  const handleNextPress = () => {
    router.push('/q22'); // Navigate to page2
  };
  const question = "How have you been feeling lately?";
  const options = [
    { id: '1', text: 'Pretty good! 😊' },
    { id: '2', text: 'Okay, could be better. 😌' },
    { id: '3', text: 'A little overwhelmed. 😔' },
    { id: '4', text: 'Not great, honestly. 💙' },
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