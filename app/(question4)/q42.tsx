
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
    router.push('/q43'); // Navigate to page2
  };
  const question = "Do you have a bedtime routine?";
  const options = [
    { id: '1', text: 'Yes, and I love it! 🌙' },
    { id: '2', text: 'I try, but it’s not consistent. ' },
    { id: '3', text: 'No, but I’d love to build one. ' },
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