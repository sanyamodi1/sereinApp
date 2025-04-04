import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SkipButtonProps {
  onPress?: () => void;
}

export default function Buttonskip({ onPress }: SkipButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Text style={styles.text}>Skip</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    padding: 16,
  },
  text: {
    fontFamily: 'TT Commons',
    fontSize: 16,
    color: '#AB576C',
    fontWeight: '500',
  },
});