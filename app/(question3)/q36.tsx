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
    router.push('/screen4'); // Navigate to page2
  };
  const question = "Would you like to build or track any habits?";
  const options = [
    { id: '1', text: 'Yes, I want to build healthier habits.' },
    { id: '2', text: 'I’d like support for small daily tasks I struggle with.' },
    { id: '3', text: 'Not right now, maybe later.' },
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