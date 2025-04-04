import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface NextButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export default function NextButton({ onPress, disabled = false }: NextButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>Continue</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#151515',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 80,
    marginTop: 30,
    marginBottom: 40,
    alignSelf: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: 'TT Commons',
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});