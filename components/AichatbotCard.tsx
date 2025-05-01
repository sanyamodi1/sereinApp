import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';

type AichatbotCardProps = {
  title?: string;
  subtitle?: string;
  avatarUri?: string | null;
  timestamp?: string;
  isRead?: boolean;
  isActive?: boolean; // New: indicates currently selected journal
  containerStyle?: object;
  avatarStyle?: object;
  onPress?: () => void;
};

const AichatbotCard = ({
  title = "Journal with me",
  subtitle = "Is now a better time to journal?",
  avatarUri = null,
  timestamp = "",
  isRead = true,
  isActive = false, // New prop
  containerStyle = {},
  avatarStyle = {},
  onPress = () => {},
}: AichatbotCardProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Animation on press
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  // Active state pulse effect
  useEffect(() => {
    if (isActive) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.02,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [isActive]);

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[
        styles.container,
        containerStyle,
        !isRead && styles.unreadContainer,
        isActive && styles.activeContainer,
        { transform: [{ scale: scaleAnim }] }
      ]}>
        <View style={[styles.avatarContainer, avatarStyle]}>
          {avatarUri ? (
            <Image 
              source={{ uri: avatarUri }}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          ) : (
            <View style={[
              styles.avatarPlaceholder,
              isActive && styles.activeAvatarPlaceholder
            ]}>
              <Text style={styles.avatarPlaceholderText}>
                {title.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text style={[
              styles.title,
              !isRead && styles.unreadTitle,
              isActive && styles.activeTitle
            ]}>
              {title}
            </Text>
            {timestamp && (
              <Text style={[
                styles.timestamp,
                isActive && styles.activeTimestamp
              ]}>
                {timestamp}
              </Text>
            )}
          </View>
          
          <View style={styles.subtitleRow}>
            <Text 
              style={[
                styles.subtitle,
                !isRead && styles.unreadSubtitle,
                isActive && styles.activeSubtitle
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {subtitle}
            </Text>
            {!isRead && <View style={styles.unreadIndicator} />}
            {isActive && <View style={styles.activeIndicator} />}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    gap: 20,
    alignItems: 'center',
    backgroundColor: '#FFFDF7',
    borderRadius: 20,
    padding: 15,
    marginVertical: 4,
  },
  unreadContainer: {
    backgroundColor: '#F8F4E9',
  },
  activeContainer: {
    backgroundColor: '#F0EAD6',
    borderWidth: 1,
    borderColor: '#5E8B7E',
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#6D6D6D",
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeAvatarPlaceholder: {
    backgroundColor: '#5E8B7E',
  },
  avatarPlaceholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6D6D6D',
  },
  contentContainer: {
    flex: 1,
    gap: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1,
  },
  unreadTitle: {
    color: '#222',
  },
  activeTitle: {
    color: '#5E8B7E',
  },
  timestamp: {
    fontSize: 12,
    color: '#6D6D6D',
    marginLeft: 8,
  },
  activeTimestamp: {
    color: '#5E8B7E',
    fontWeight: '600',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#6D6D6D',
    fontWeight: '400',
    flex: 1,
  },
  unreadSubtitle: {
    fontWeight: '600',
    color: '#333',
  },
  activeSubtitle: {
    color: '#5E8B7E',
    fontWeight: '600',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E47572',
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5E8B7E',
  },
});

export default AichatbotCard;