import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import scale from '../../styles'; // Adjust the import path as necessary

interface ProgressCardProps {
  IconComponent?: React.ComponentType<{ width: number; height: number }>;
  title: string;
  progressText: string;
  progressValue?: number; // New prop (0 to 1)
  RightIconComponent?: React.ComponentType<{ width: number; height: number; style?: any }>;
  containerStyle?: StyleProp<ViewStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  progressTextStyle?: StyleProp<TextStyle>;
  progressBarColor?: string; // New prop
  progressBackgroundColor?: string; // New prop
  gap?: number;
  iconSize?: number;
  scale?: (num: number) => number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  IconComponent,
  title,
  progressText,
  progressValue = 0, // Default to 0
  RightIconComponent,
  containerStyle,
  iconContainerStyle,
  titleStyle,
  progressTextStyle,
  progressBarColor = '#E47572', // Default color
  progressBackgroundColor = '#F5F5F5', // Default color
  gap = 10,
  iconSize = 50,
  scale = (num) => num,
}) => {
  // Ensure progressValue is between 0 and 1
  const normalizedProgress = Math.min(1, Math.max(0, progressValue));

  return (
    <View  style={[styles.container, containerStyle]}>
      <View style={{
        flexDirection: 'row',
        gap: scale(gap),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={[{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: scale(100),
          borderWidth: 1,
          
          borderColor: "#6D6D6D",
          marginLeft: scale(20),
          height: scale(iconSize),
          width: scale(iconSize),
        }, iconContainerStyle]}>
          {IconComponent && (
            <IconComponent
              width={scale(iconSize * 0.6)}
              height={scale(iconSize * 0.6)}
            />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, titleStyle]}>
            {title}
          </Text>
          {/* Progress bar */}
          <View style={[styles.progressBarBackground, { backgroundColor: progressBackgroundColor }]}>
            <View 
              style={[
                styles.progressBarFill, 
                { 
                  width: `${normalizedProgress * 100}%`,
                  backgroundColor: progressBarColor
                }
              ]} 
            />
          </View>
          <Text style={[styles.progressText, progressTextStyle]}>
            {progressText}
          </Text>
        </View>
      </View>
      {RightIconComponent && (
        <RightIconComponent
          width={scale(iconSize * 0.6)}
          height={scale(iconSize * 0.6)}
          style={{ marginRight: scale(20) }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scale(90), // Increased height to accommodate progress bar
    marginTop: scale(10),
    marginHorizontal: scale(15),
    borderRadius: scale(20),
    backgroundColor: '#FFFDF7',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    // paddingHorizontal: scale(10),
    paddingVertical: scale(10),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: scale(16),
    marginBottom: scale(4),
  },
  progressText: {
    fontSize: scale(12),
    marginTop: scale(4),
  },
  progressBarBackground: {
    marginRight: scale(20),
    height: scale(6),
    borderRadius: scale(3),
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  progressBarFill: {
    height: '80%',
    borderRadius: scale(3),
  },
});

export default ProgressCard;