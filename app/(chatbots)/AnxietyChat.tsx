import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Button } from 'react-native';
import Constants from 'expo-constants';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import EmojiContainer from '@/components/EmojiContainer';

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
};

const AnxietySupportChat = () => {
    const API_KEY = Constants.expoConfig?.extra?.API_KEY;
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [anxietyLevel, setAnxietyLevel] = useState<number | null>(null);
    const [showPrompts, setShowPrompts] = useState(true);

    const anxietyLevelTitles = {
        1: "Mild (noticeable but manageable)",
        2: "Moderate (interfering with focus)",
        3: "High (physical symptoms present)",
        4: "Very High (difficulty functioning)",
        5: "Overwhelming (feeling out of control)"
    };

    const handleSend = useCallback(async () => {
        if (!input.trim() || loading) return;
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: anxietyLevel ? `[Anxiety Level: ${anxietyLevel}/5 - ${anxietyLevelTitles[anxietyLevel as keyof typeof anxietyLevelTitles]}] ${input}` : input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);
        setError('');
        setShowPrompts(false);

        // Timeout promise
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('Request timed out'));
            }, 10000);
        });

        try {
            const fetchPromise = fetch('https://openrouter.ai/api/v1/chat/completions', {
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
                            content: `You are CalmCare, an anxiety support assistant. Follow these guidelines:
                            - Respond with empathy and validation first
                            - Keep responses brief (1-3 sentences)
                            - Suggest concrete coping strategies when appropriate
                            - Help ground the user in the present moment
                            - Normalize anxiety responses
                            - Ask open-ended questions to explore thoughts
                            - For high anxiety levels (4-5), suggest immediate grounding techniques
                            - Never minimize the user's experience
                            - Avoid reassurance-seeking traps
                            - Help identify thought patterns without judgment
                            - End with a simple question or suggestion`
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

            const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            const botMessage: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: data.choices[0]?.message?.content || "I'm here with you. Would you like to share more about what you're experiencing?",
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            console.error('API Error:', err);
            if (err instanceof Error) {
                setError(err.message === 'Request timed out' ? 'Request took too long. Please try again.' : 'Connection issue. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }, [input, loading, API_KEY, messages, anxietyLevel]);

    const handleQuickPrompt = (prompt: string) => {
        setInput(prompt);
    };

    const handleAnxietyLevelSelect = (level: number) => {
        setAnxietyLevel(level);
        setInput(prev => prev ? prev : `I'm experiencing anxiety at level ${level}/5.`);
    };

    const togglePrompts = () => {
        setShowPrompts(!showPrompts);
    };

    return (
        <View style={styles.container}>
            {/* Anxiety-Specific Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image
                        source={require('../../assets/icons/logo.jpg')} // Use a calming icon
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={styles.title} >Serein</Text>
                        <Text style={styles.subtitle}>Anxiety Support Companion</Text>
                    </View>
                </View>
                {messages.length > 0 && (
                    <TouchableOpacity onPress={togglePrompts} style={styles.promptToggle}>
                        <Ionicons
                            name={showPrompts ? "chevron-down" : "sparkles"}
                            size={20}
                            color="#4c6ef5" // Calmer blue color
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
                        <Text style={styles.welcomeText}>How intense is your anxiety right now?</Text>

                        {/* Anxiety Level Selector */}
                        <View style={styles.anxietyLevelContainer}>
                            {[1, 2, 3, 4, 5].map((level) => (
                                <TouchableOpacity
                                    key={level}
                                    style={[
                                        styles.anxietyLevelButton,
                                        anxietyLevel === level && styles.selectedAnxietyLevel
                                    ]}
                                    onPress={() => handleAnxietyLevelSelect(level)}
                                >
                                    <Text style={styles.anxietyLevelText}>{level}</Text>
                                    {anxietyLevel === level && (
                                        <Text style={styles.anxietyLevelLabel}>
                                            {anxietyLevelTitles[level as keyof typeof anxietyLevelTitles]}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.promptTitle}>Anxiety Support Prompts</Text>
                        {[
                            "What physical sensations are you noticing right now?",
                            "What thought is most bothering you in this moment?",
                            "What would feel helpful to you right now?",
                            "Can you describe where you feel the anxiety in your body?"
                        ].map((prompt, index) => (
                            <Pressable
                                key={index}
                                style={styles.promptButton}
                                onPress={() => handleQuickPrompt(prompt)}
                            >
                                <Text style={styles.promptText}>{prompt}</Text>
                                <Feather name="arrow-right" size={16} color="#4c6ef5" />
                            </Pressable>
                        ))}

                        {/* Quick Coping Techniques */}
                        <Text style={styles.promptTitle}>Quick Coping Tools</Text>
                        {[
                            "Guide me through a grounding exercise",
                            "Help me challenge this anxious thought",
                            "Suggest a breathing technique",
                            "Help me make a worry containment plan"
                        ].map((technique, index) => (
                            <Pressable
                                key={index}
                                style={[styles.promptButton, styles.copingButton]}
                                onPress={() => handleQuickPrompt(technique)}
                            >
                                <Text style={[styles.promptText, styles.copingText]}>{technique}</Text>
                                <MaterialCommunityIcons name="meditation" size={16} color="#4c6ef5" />
                            </Pressable>
                        ))}
                    </View>
                ) : null}

                {/* Messages display */}
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
                            source={require('../../assets/icons/logo.jpg')} // Use a calming icon
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
                            source={require('../../assets/icons/logo.jpg')} // Use a calming icon
                            style={styles.messageAvatar}
                        />
                        <View style={styles.messageContent}>
                            <ActivityIndicator size="small" color="#4c6ef5" />
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Input Area with Anxiety Tools */}
            <View style={styles.inputContainer}>
                {anxietyLevel !== null && (
                    <View style={styles.anxietyIndicator}>
                        <Text style={styles.anxietyIndicatorText}>
                            Anxiety: {anxietyLevel}/5 - {anxietyLevelTitles[anxietyLevel as keyof typeof anxietyLevelTitles]}
                        </Text>
                        <TouchableOpacity
                            onPress={() => setAnxietyLevel(null)}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>×</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    gap: 12,
                }}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="What's on your mind?..."
                    placeholderTextColor="#94a3b8"
                    editable={!loading}
                    multiline
                    onSubmitEditing={handleSend}
                />
                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        (loading || !input.trim()) && styles.sendButtonDisabled
                    ]}
                    onPress={handleSend}
                    disabled={loading || !input.trim()}
                >
                    <Ionicons name="send" size={20} color="white" />
                </TouchableOpacity>
                </View>
            </View>

            {/* Emergency Resources (always visible) */}
            <View style={styles.emergencyContainer}>
                <Text style={styles.emergencyText}>
                    If you're in crisis, please contact your local emergency services or a crisis hotline.
                </Text>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

// Add these new styles to your existing stylesheet
const styles = StyleSheet.create({
    anxietyLevelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15,
        paddingHorizontal: 10,
    },
    anxietyLevelButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e9ecef',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    selectedAnxietyLevel: {
        backgroundColor: '#4c6ef5',
    },
    anxietyLevelText: {
        color: '#495057',
        fontWeight: 'bold',
    },
    anxietyLevelLabel: {
        position: 'absolute',
        top: 45,
        fontSize: 10,
        color: '#495057',
        width: 100,
        textAlign: 'center',
    },
    anxietyIndicator: {
        flexDirection: 'row',
        backgroundColor: '#edf2ff',
        padding: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: 8,
        alignItems: 'center',
    },
    anxietyIndicatorText: {
        color: '#364fc7',
        fontSize: 12,
    },
    copingButton: {
        backgroundColor: '#edf2ff',
    },
    copingText: {
        color: '#364fc7',
    },
    emergencyContainer: {
        padding: 10,
        backgroundColor: '#fff3bf',
        marginTop: 5,
        borderRadius: 8,
    },
    emergencyText: {
        color: '#e67700',
        fontSize: 12,
        textAlign: 'center',
    },

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
        fontFamily: 'Acorn-Regular',
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
        marginVertical: 10,
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

    },
    messageText: {
        flex: 1,
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#fff',
        color: '#334155',
        fontSize: 15,
        lineHeight: 15,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    userMessageText: {
        backgroundColor: '#fa6eba',
        color: '#fff',
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
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#f8fafc',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    moodIndicator: {
        position: 'absolute',
        top: -30,
        left: 16,
        backgroundColor: '#64748b',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
    },
    moodIndicatorText: {
        color: '#fff',
        fontSize: 14,
        marginRight: 8,
    },
    closeButton: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        minHeight: 40,
        maxHeight: 120,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 12,
        fontSize: 16,
        color: '#1e293b',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    sendButton: {
        backgroundColor: '#ec4899', // Pink color to match app theme
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 40,
        paddingHorizontal: 12,
    },
    sendButtonDisabled: {
        backgroundColor: '#f9a8d4', // Lighter pink for disabled state
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    errorText: {
        color: '#dc2626',
        textAlign: 'center',
        paddingBottom: 8,
        fontSize: 12,
    },
});

export default AnxietySupportChat;