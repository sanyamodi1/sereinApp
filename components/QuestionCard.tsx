import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Option {
  id: string;
  text: string;
}

interface QuestionCardProps {
  question: string;
  options: Option[];
  selectedOption: string | null;
  onSelect: (id: string) => void;
}

export default function QuestionCard({
  question,
  options,
  selectedOption,
  onSelect,
}: QuestionCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>
      
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              selectedOption === option.id && styles.selectedOption
            ]}
            onPress={() => onSelect(option.id)}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  questionText: {
    fontFamily: 'TT Commons',
    fontSize: 26,
    color: '#000000',
    marginBottom: 25,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FDD3D3',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  selectedOption: {
    backgroundColor: '#F5BCDD',
    borderColor: '#F5BCDD',
  },
  optionText: {
    fontFamily: 'TT Commons',
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
});