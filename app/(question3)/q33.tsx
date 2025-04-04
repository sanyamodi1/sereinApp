import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import Buttonskip from "@/components/Buttonskip";
import QuestionCard from '../../components/QuestionCard';
import NextButton from '../../components/NextButton';
import { useRouter } from 'expo-router';

export default function Question33() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();
  const handleNextPress = () => {
    router.push('/q34'); // Navigate to page2
  };
  const question = "Which of these sounds helpful for you? (Pick as many as you like)";
  const options = [
    { id: '1', text: 'Breathing exercises & mindfulness 🌬️ ' },
    { id: '2', text: 'Quick mood-boosting activities 🎵' },
    { id: '3', text: 'Guided reflections & journaling 📖' },
    { id: '4', text: 'I’m not sure yet 🤷‍♀️' },
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