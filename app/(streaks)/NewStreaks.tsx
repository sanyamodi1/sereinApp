import { View, Text, ScrollView, TextInput, TouchableOpacity, Switch, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function NewStreaks() {
    const [habit, setHabit] = useState({
        title: '',
        totalTarget: 10,
        measurement: 'glasses',
        description: '',
        frequency: 'Daily',
        reminder: {
            enabled: false,
            time: '08:00'
        }
    })

    const frequencyOptions = ['Daily', 'Weekly', 'Weekdays', 'Custom']
const measurementOptions = [
  'glasses',
  'hours',
  'kms',
  'times',
  'pages',
  'steps',
  'minutes',
  'liters',
  'calories',
  'reps',
  'sessions',
  'miles',
  'chapters',
  'kilograms',
  'meals',
  'sets',
  'pushups',
];

    const reminderTimeOptions = ['Morning (08:00)', 'Afternoon (12:00)', 'Evening (18:00)', 'Custom']

    const updateHabit = (field: string, value: any) => {
        setHabit(prev => ({ ...prev, [field]: value }))
    }

    const updateReminder = (field: string, value: any) => {
        setHabit(prev => ({
            ...prev,
            reminder: {
                ...prev.reminder,
                [field]: value
            }
        }))
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Create New Habit</Text>
                
                {/* Title Input */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Habit Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., Drink Water, Exercise"
                        value={habit.title}
                        onChangeText={(text) => updateHabit('title', text)}
                    />
                </View>

                {/* Target Input */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Daily Target</Text>
                    <View style={styles.targetInputContainer}>
                        <TextInput
                            style={[styles.input, styles.targetInput]}
                            placeholder="10"
                            value={habit.totalTarget.toString()}
                            onChangeText={(text) => updateHabit('totalTarget', parseInt(text) || 0)}
                            keyboardType="numeric"
                        />
                        <View style={styles.measurementPicker}>
                            {measurementOptions.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[styles.measurementOption, habit.measurement === option && styles.selectedMeasurement]}
                                    onPress={() => updateHabit('measurement', option)}
                                >
                                    <Text style={habit.measurement === option ? styles.selectedMeasurementText : styles.measurementText}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Description Input */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description (Optional)</Text>
                    <TextInput
                        style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                        placeholder="Why is this habit important to you?"
                        value={habit.description}
                        onChangeText={(text) => updateHabit('description', text)}
                        multiline
                    />
                </View>

                {/* Frequency Selection */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Frequency</Text>
                    <View style={styles.optionsContainer}>
                        {frequencyOptions.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[styles.optionButton, habit.frequency === option && styles.selectedOption]}
                                onPress={() => updateHabit('frequency', option)}
                            >
                                <Text style={[styles.optionText, habit.frequency === option && styles.selectedOptionText]}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Reminders */}
                <View style={styles.section}>
                    <View style={styles.switchContainer}>
                        <Text style={styles.sectionTitle}>Enable Reminders</Text>
                        <Switch
                            value={habit.reminder.enabled}
                            onValueChange={(value) => updateReminder('enabled', value)}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={habit.reminder.enabled ? '#f5dd4b' : '#f4f3f4'}
                        />
                    </View>
                    {habit.reminder.enabled && (
                        <>
                            <Text style={[styles.sectionTitle, { marginTop: 15 }]}>Reminder Time</Text>
                            <View style={styles.optionsContainer}>
                                {reminderTimeOptions.map((option) => {
                                    const timeMap: Record<string, string> = {
                                        'Morning (08:00)': '08:00',
                                        'Afternoon (12:00)': '12:00',
                                        'Evening (18:00)': '18:00',
                                        'Custom': habit.reminder.time
                                    }
                                    const isSelected = habit.reminder.time === timeMap[option]
                                    return (
                                        <TouchableOpacity
                                            key={option}
                                            style={[styles.optionButton, isSelected && styles.selectedOption]}
                                            onPress={() => updateReminder('time', timeMap[option])}
                                        >
                                            <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                                                {option}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                            {habit.reminder.time === 'Custom' && (
                                <TextInput
                                    style={[styles.input, { marginTop: 10 }]}
                                    placeholder="HH:MM (e.g., 07:30)"
                                    value={habit.reminder.time}
                                    onChangeText={(text) => updateReminder('time', text)}
                                    keyboardType="numeric"
                                />
                            )}
                        </>
                    )}
                </View>

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Create Habit</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFDF7',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontFamily: 'TT Commons',
        fontSize: 30,
        // fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 30,
        textAlign: 'center',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontFamily: 'Acorn-Regular',
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    targetInputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
    },
    targetInput: {
        width: '100%',
        flex: 1,
    },
    measurementPicker: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        flex: 2,
    },
    measurementOption: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f5f5f5',
    },
    selectedMeasurement: {
        backgroundColor: '#E47572',
        borderColor: '#E47572',
    },
    measurementText: {
        fontSize: 14,
        color: '#333',
    },
    selectedMeasurementText: {
        color: '#fff',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    optionButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f5f5f5',
    },
    optionText: {
        fontSize: 14,
        color: '#333',
    },
    selectedOption: {
        backgroundColor: '#E47572',
        borderColor: '#E47572',
    },
    selectedOptionText: {
        color: '#fff',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: '#E47572',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
})