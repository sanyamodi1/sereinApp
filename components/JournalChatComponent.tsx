import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Feather, Ionicons } from '@expo/vector-icons';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const ChatComponent = () => {
  const API_KEY = Constants.expoConfig?.extra?.API_KEY;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mood, setMood] = useState<number | null>(null);
  const [showPrompts, setShowPrompts] = useState(true);

  const handleSend = useCallback(async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: mood ? `[Mood: ${mood}/5] ${input}` : input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');
    setShowPrompts(false);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat-v3-0324:free',
          messages: [
            {
              role: 'system',
              content: `You are Serein, a compassionate journaling assistant. Follow these rules:
              - Respond warmly but concisely (1-2 sentences)
              - Ask open-ended questions to encourage reflection
              - Acknowledge emotions first ("I hear that you're feeling...")
              - Suggest simple mindfulness exercises when appropriate
              - Help identify patterns in thinking/behavior
              - Never diagnose or give medical advice
              - For mood ratings: Explore what contributed to that feeling`
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: userMessage.content
            }
          ],
          temperature: 0.7,
          max_tokens: 150,
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      const botMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.choices[0]?.message?.content || "I'd love to hear more about that.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('API Error:', err);
      setError('Connection issue. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [input, loading, API_KEY, messages, mood]);

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const handleMoodSelect = (selectedMood: number) => {
    setMood(selectedMood);
    setInput(prev => prev ? prev : `I'm feeling ${selectedMood}/5 today.`);
  };

  const togglePrompts = () => {
    setShowPrompts(!showPrompts);
  };

  return (
    <View style={styles.container}>
      {/* Improved Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={require('../../assets/icons/logo.jpg')}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.title}>Serein</Text>
            <Text style={styles.subtitle}>Reflective Journaling</Text>
          </View>
        </View>
        {messages.length > 0 && (
          <TouchableOpacity onPress={togglePrompts} style={styles.promptToggle}>
            <Ionicons 
              name={showPrompts ? "chevron-down" : "sparkles"} 
              size={20} 
              color="#6d28d9" 
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        ref={ref => ref?.scrollToEnd({ animated: true })}
      >
        {messages.length === 0 || showPrompts ? (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>How would you describe your current state?</Text>
            
            <View style={styles.moodContainer}>
              <Text style={styles.moodTitle}>Mood Check-in</Text>
              <View style={styles.moodButtons}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <Pressable
                    key={num}
                    style={[styles.moodButton, mood === num && styles.selectedMood]}
                    onPress={() => handleMoodSelect(num)}
                  >
                    <Text style={styles.moodEmoji}>
                      {num === 1 ? '😔' : 
                       num === 2 ? '😕' : 
                       num === 3 ? '😐' : 
                       num === 4 ? '🙂' : '😊'}
                    </Text>
                    <Text style={styles.moodLabel}>{num}/5</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Text style={styles.promptTitle}>Journal Prompts</Text>
            {[
              "What emotion has been most present for you this week?",
              "Describe a moment that felt meaningful recently",
              "What's something you're learning about yourself?",
              "How would you like to feel tomorrow?"
            ].map((prompt, index) => (
              <Pressable
                key={index}
                style={styles.promptButton}
                onPress={() => handleQuickPrompt(prompt)}
              >
                <Text style={styles.promptText}>{prompt}</Text>
                <Feather name="arrow-right" size={16} color="#6d28d9" />
              </Pressable>
            ))}
          </View>
        ) : null}

        {/* Messages */}
        {messages.map((message) => (
          <View 
            key={message.id} 
            style={[
              styles.messageBubble,
              message.role === 'user' ? styles.userBubble : styles.botBubble
            ]}
          >
            {message.role === 'assistant' && (
              <Image 
                source={require('../../assets/icons/logo.jpg')}
                style={styles.messageAvatar}
              />
            )}
            <View style={styles.messageContent}>
              <Text style={[
                styles.messageText,
                message.role === 'user' && styles.userMessageText
              ]}>
                {message.content}
              </Text>
              <Text style={[
                styles.timestamp,
                message.role === 'user' && styles.userTimestamp
              ]}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </View>
        ))}
        
        {loading && (
          <View style={[styles.messageBubble, styles.botBubble]}>
            <Image 
              source={require('../../assets/icons/logo.jpg')}
              style={styles.messageAvatar}
            />
            <View style={styles.messageContent}>
              <ActivityIndicator size="small" color="#6d28d9" />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Enhanced Input Area */}
      <View style={styles.inputContainer}>
        {mood !== null && (
          <View style={styles.moodIndicator}>
            <Text style={styles.moodIndicatorText}>Mood: {mood}/5</Text>
            <TouchableOpacity onPress={() => setMood(null)}>
              <Feather name="x" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Share your thoughts..."
          placeholderTextColor="#94a3b8"
          editable={!loading}
          multiline
          onSubmitEditing={handleSend}
        />
        <Pressable
          style={({ pressed }) => [
            styles.sendButton,
            pressed && styles.sendButtonPressed,
            (loading || !input.trim()) && styles.sendButtonDisabled
          ]}
          onPress={handleSend}
          disabled={loading || !input.trim()}
        >
          <Feather name="send" size={20} color="#fff" />
        </Pressable>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  promptToggle: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingBottom: 20,
  },
  welcomeContainer: {
    paddingVertical: 24,
    gap: 24,
  },
  welcomeText: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
  },
  moodContainer: {
    gap: 8,
  },
  moodTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
    textAlign: 'center',
  },
  moodButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  moodButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  selectedMood: {
    backgroundColor: '#ede9fe',
    borderWidth: 1,
    borderColor: '#ddd6fe',
  },
  moodEmoji: {
    fontSize: 24,
  },
  moodLabel: {
    fontSize: 12,
    color: '#475569',
    marginTop: 4,
  },
  promptTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
    marginBottom: 8,
  },
  promptButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  promptText: {
    flex: 1,
    color: '#334155',
  },
  messageBubble: {
    flexDirection: 'row',
    marginVertical: 8,
    maxWidth: '80%',
  },
  botBubble: {
    alignSelf: 'flex-start',
  },
  userBubble: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    marginTop: 4,
  },
  messageContent: {
    flex: 1,
  },
  messageText: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    color: '#334155',
    fontSize: 15,
    lineHeight: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  userMessageText: {
    backgroundColor: '#6d28d9',
    color: '#fff',
    borderColor: '#5b21b6',
  },
  timestamp: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 4,
    marginLeft: 12,
  },
  userTimestamp: {
    textAlign: 'right',
    marginRight: 12,
    color: '#c4b5fd',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    paddingTop: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  moodIndicator: {
    position: 'absolute',
    top: -28,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#6d28d9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  moodIndicatorText: {
    color: '#fff',
    fontSize: 12,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 16,
    color: '#0f172a',
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6d28d9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonPressed: {
    backgroundColor: '#5b21b6',
  },
  sendButtonDisabled: {
    backgroundColor: '#c4b5fd',
  },
  errorText: {
    color: '#dc2626',
    textAlign: 'center',
    paddingBottom: 8,
    fontSize: 12,
  },
});

export default ChatComponent;