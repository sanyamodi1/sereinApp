import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
};

const MentalHealthInfoBot = () => {
    const API_KEY = Constants.expoConfig?.extra?.API_KEY;
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [showCategories, setShowCategories] = useState(true);

    const mentalHealthCategories = {
        'anxiety': 'Anxiety Disorders',
        'depression': 'Depression',
        'adhd': 'ADHD',
        'ptsd': 'PTSD',
        'ocd': 'OCD',
        'bipolar': 'Bipolar Disorder',
        'sleep': 'Sleep Disorders',
        'therapy': 'Therapy Options',
        'medication': 'Medications',
        'self-care': 'Self-Care',
        'neurodiversity': 'Neurodiversity',
        'stress': 'Stress Management'
    };

    const exampleQuestions = {
        'anxiety': [
            "What are the symptoms of generalized anxiety disorder?",
            "What's the difference between anxiety and panic attacks?",
            "What are effective treatments for social anxiety?"
        ],
        'depression': [
            "What are the signs of clinical depression?",
            "How does depression affect the brain?",
            "What lifestyle changes help with depression?"
        ],
        'therapy': [
            "What types of therapy are most effective for anxiety?",
            "How does CBT work?",
            "What should I expect in my first therapy session?"
        ]
    };

    const handleSend = useCallback(async () => {
        if (!input.trim() || loading) return;
        
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);
        setError('');
        setShowCategories(false);

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
                            content: `You are MindGuide, a mental health information assistant. Follow these guidelines:
                            - Provide accurate, evidence-based information about mental health
                            - Cite recent research when possible (include years)
                            - Break down complex concepts into simple terms
                            - Include key statistics when relevant
                            - Suggest additional resources (books, websites, organizations)
                            - Clarify that you're not a substitute for professional help
                            - Keep responses concise but informative (3-5 sentences)
                            - When discussing treatments, mention both professional and self-help options
                            - Avoid making definitive claims about causes or cures
                            - End with a follow-up question to encourage exploration`
                        },
                        ...messages.map(msg => ({
                            role: msg.role,
                            content: msg.content
                        })),
                        {
                            role: 'user',
                            content: input
                        }
                    ],
                    temperature: 0.5,
                    max_tokens: 250,
                }),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            const botMessage: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: data.choices[0]?.message?.content || "Here's some information that might help...",
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            console.error('API Error:', err);
            setError('Failed to get response. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [input, loading, API_KEY, messages]);

    const handleCategorySelect = (category: string) => {
        setActiveCategory(category);
        setShowCategories(false);
        setInput(`Tell me about ${mentalHealthCategories[category as keyof typeof mentalHealthCategories]}`);
    };

    const handleExampleQuestion = (question: string) => {
        setInput(question);
    };

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    return (
        <View style={styles.container}>
            {/* Information-Specific Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image
                        source={require('../../assets/icons/logo.jpg')}
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={styles.title}>MindGuide</Text>
                        <Text style={styles.subtitle}>Mental Health Information</Text>
                    </View>
                </View>
                {messages.length > 0 && (
                    <TouchableOpacity onPress={toggleCategories} style={styles.promptToggle}>
                        <Ionicons
                            name={showCategories ? "chevron-down" : "book"}
                            size={20}
                            color="#4c6ef5"
                        />
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
                ref={ref => ref?.scrollToEnd({ animated: true })}
            >
                {(messages.length === 0 || showCategories) && (
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>What would you like to learn about?</Text>

                        {/* Mental Health Categories */}
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.categoriesContainer}
                        >
                            {Object.entries(mentalHealthCategories).map(([key, label]) => (
                                <TouchableOpacity
                                    key={key}
                                    style={[
                                        styles.categoryButton,
                                        activeCategory === key && styles.activeCategory
                                    ]}
                                    onPress={() => handleCategorySelect(key)}
                                >
                                    <Text style={styles.categoryText}>{label}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Example Questions */}
                        {activeCategory && exampleQuestions[activeCategory as keyof typeof exampleQuestions] && (
                            <>
                                <Text style={styles.promptTitle}>Example Questions</Text>
                                {exampleQuestions[activeCategory as keyof typeof exampleQuestions].map((question, index) => (
                                    <Pressable
                                        key={index}
                                        style={styles.promptButton}
                                        onPress={() => handleExampleQuestion(question)}
                                    >
                                        <Text style={styles.promptText}>{question}</Text>
                                        <Feather name="arrow-right" size={16} color="#4c6ef5" />
                                    </Pressable>
                                ))}
                            </>
                        )}

                        {/* Quick Facts */}
                        <Text style={styles.promptTitle}>Quick Facts</Text>
                        {[
                            "What percentage of people experience mental health conditions?",
                            "How does exercise impact mental health?",
                            "What are common myths about mental illness?",
                            "How does nutrition affect mental health?"
                        ].map((fact, index) => (
                            <Pressable
                                key={index}
                                style={styles.promptButton}
                                onPress={() => handleExampleQuestion(fact)}
                            >
                                <Text style={styles.promptText}>{fact}</Text>
                                <MaterialIcons name="fact-check" size={16} color="#4c6ef5" />
                            </Pressable>
                        ))}
                    </View>
                )}

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
                            <ActivityIndicator size="small" color="#4c6ef5" />
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Input Area */}
            <View style={styles.inputContainer}>
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
                        placeholder="Ask about mental health..."
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

            {/* Disclaimer */}
            <View style={styles.disclaimerContainer}>
                <Text style={styles.disclaimerText}>
                    Note: This provides general information only, not medical advice. Consult a qualified professional for diagnosis and treatment.
                </Text>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

// Reuse similar styles from your AnxietySupportChat with minor adjustments
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
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
        color: '#1e293b',
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
        paddingTop: 16,
        paddingBottom: 8,
    },
    welcomeContainer: {
        marginBottom: 16,
    },
    welcomeText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1e293b',
        marginBottom: 16,
    },
    categoriesContainer: {
        paddingBottom: 8,
        gap: 8,
    },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#e2e8f0',
        marginRight: 8,
    },
    activeCategory: {
        backgroundColor: '#c7d2fe',
    },
    categoryText: {
        color: '#334155',
        fontSize: 14,
    },
    promptTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#475569',
        marginTop: 16,
        marginBottom: 8,
    },
    promptButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginBottom: 8,
    },
    promptText: {
        flex: 1,
        color: '#334155',
    },
    messageBubble: {
        maxWidth: '80%',
        marginBottom: 12,
        flexDirection: 'row',
        gap: 8,
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
    },
    messageContent: {
        flex: 1,
    },
    messageText: {
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#e0e7ff',
        color: '#1e293b',
    },
    userMessageText: {
        backgroundColor: '#4c6ef5',
        color: 'white',
    },
    timestamp: {
        fontSize: 10,
        color: '#64748b',
        marginTop: 4,
        marginLeft: 12,
    },
    userTimestamp: {
        textAlign: 'right',
        marginRight: 12,
    },
    inputContainer: {
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    input: {
        flex: 1,
        padding: 12,
        borderRadius: 24,
        backgroundColor: '#f1f5f9',
        color: '#1e293b',
        maxHeight: 120,
    },
    sendButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#4c6ef5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        opacity: 0.5,
    },
    disclaimerContainer: {
        padding: 12,
        backgroundColor: '#ffedd5',
    },
    disclaimerText: {
        fontSize: 12,
        color: '#9a3412',
        textAlign: 'center',
    },
    errorText: {
        color: '#dc2626',
        textAlign: 'center',
        padding: 8,
    },
});

export default MentalHealthInfoBot;