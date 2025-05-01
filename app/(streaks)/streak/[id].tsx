import { useLocalSearchParams } from 'expo-router';
import { View, Text, Dimensions, ActivityIndicator, Switch, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { habitData } from '@/dummydata/habitData';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import CalendarStrip from '@/components/CalendarStrip';
import { LinearGradient } from 'expo-linear-gradient';
import HabitProgressChart from '@/components/HabitProgressChart';

const screenWidth = Dimensions.get('window').width;
const WaterDrink = require('../../../assets/undraw/waterdrink.svg')
export default function StreakDetail() {

    const [notificationsEnabled, setNotificationsEnabled] = useState(false)
    const notificationFrequencyOptions = ['Once a day', 'Twice a day', 'Only on weekdays', 'Custom']
    const [notificationFrequency, setNotificationFrequency] = useState('Once a day')

    const { id } = useLocalSearchParams<{ id: string }>(); // Explicitly type the params
    const [isLoading, setIsLoading] = useState(false);
    const [fontsLoaded] = useFonts({
        'TTCommons': require('../../../assets/fonts/TT Commons Medium.otf'),
        'Acorn-Regular': require('../../../assets/fonts/acorn-7.ttf'),
    });
    const [reminderTime, setReminderTime] = useState('08:00')

    const [intakeData, setIntakeData] = useState([0, 0, 0, 0, 0, 0, 0]);

    // Sample hardcoded data
    const sampleData = [1200, 800, 950, 1100, 700, 1300, 1000];

    useEffect(() => {
        // Animate by gradually updating the values
        let i = 0;
        const interval = setInterval(() => {
            setIntakeData(prevData => {
                const newData = [...prevData];
                if (i < sampleData.length) {
                    newData[i] = sampleData[i];
                }
                return newData;
            });
            i++;
            if (i >= sampleData.length) clearInterval(interval);
        }, 200); // animate one bar every 200ms
    }, []);

    // Find the matching streak with proper null check
    const streakData = habitData.find(item => item.id === id);

    if (!streakData) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Habit not found! 🚫</Text>
            </SafeAreaView>
        );
    }

    if (!fontsLoaded || isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFDF7' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ fontFamily: 'TTCommons', marginTop: 20 }}>Loading...</Text>
            </SafeAreaView>
        );
    }
    function darkenColor(hex: string, amount = 20): string {
        return '#' + hex.replace(/^#/, '').replace(/../g, (color) => {
            const value = Math.max(0, parseInt(color, 16) - amount);
            return value.toString(16).padStart(2, '0');
        });
    }

    // Now TypeScript knows streakData is defined here
    const progressPercent = (streakData.dailyProgress / streakData.totalTarget) * 100;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFDF7' }}>
            <ScrollView>
                {/* Title */}
                <Text style={{ fontSize: 26, textAlign: 'center', marginBottom: 20, fontFamily: 'Acorn-Regular', paddingHorizontal: 20, marginTop: 20 }}>
                    {streakData.title}
                </Text>
                <LinearGradient
                    colors={[streakData.color, streakData.color]} // Gradient from D8F3FF to 8CB8CA
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        marginVertical: 20,
                        padding: 10,
                        borderRadius: 10, // optional for rounded corners
                    }}
                >
                    <CalendarStrip />
                </LinearGradient>
                <Text style={{
                    paddingHorizontal: 20,
                    fontSize: 24,
                    fontFamily: 'Acorn-Regular'
                }}>
                    {streakData.totalTarget - streakData.dailyProgress} {streakData.measurement} to go!
                </Text>

                {/* Circular Habit Tracker */}
                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                    <AnimatedCircularProgress
                        size={200}
                        width={15}
                        fill={progressPercent}
                        tintColor={darkenColor(streakData.color, 40)}
                        backgroundColor={streakData.color}
                        rotation={0}
                    >
                        {() => (
                            <View>
                                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                                    {streakData.dailyProgress} / {streakData.totalTarget} {streakData.measurement}
                                </Text>
                            </View>

                        )}
                    </AnimatedCircularProgress>
                    <Text style={{ fontSize: 24, borderRadius: 20, fontWeight: 'bold', marginTop: 20, backgroundColor: '#D8F3FF', paddingHorizontal: 50, paddingVertical: 10 }}>
                        Add +
                    </Text>
                </View>

                <View style={{
                    paddingHorizontal: 20,
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>
                        Notification
                    </Text>
                </View>
                <View style={{ marginBottom: 25, paddingHorizontal: 20 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: 10
                        }}>Enable Reminders</Text>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
                        />
                    </View>
                    {notificationsEnabled && (
                        <>
                            <Text style={{ marginBottom: 25, marginTop: 15 }}>Reminder Frequency</Text>
                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: 10,
                            }}>
                                {notificationFrequencyOptions.map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[{
                                            paddingVertical: 8,
                                            paddingHorizontal: 15,
                                            borderRadius: 20,
                                            borderWidth: 1,
                                            borderColor: '#ddd',
                                            backgroundColor: '#f5f5f5'
                                        }, notificationFrequency === option && {
                                            backgroundColor: '#E47572',
                                            borderColor: '#E47572'
                                        }]}
                                        onPress={() => setNotificationFrequency(option)}
                                    >
                                        <Text style={[{
                                            fontSize: 14,
                                            color: '#333'
                                        }, notificationFrequency === option && {
                                            backgroundColor: '#E47572',
                                            borderColor: '#E47572'
                                        }]}>
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={[{
                                fontSize: 18,
                                fontWeight: '600',
                                color: '#333',
                                marginBottom: 10
                            }, { marginTop: 15 }]}>Reminder Time</Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    borderRadius: 8,
                                    padding: 12,
                                    fontSize: 16,
                                    backgroundColor: '#fff'
                                }}
                                placeholder="HH:MM (e.g., 08:00)"
                                value={reminderTime}
                                onChangeText={setReminderTime}
                                keyboardType="numeric"
                            />
                        </>
                    )}
                </View>
                {/* Line Chart for Analytics */}
                <HabitProgressChart
                    habitId={parseInt(streakData.id, 10)}
                    habitName={streakData.title}
                    unit={streakData.measurement}
                    data={[
                        { id: '1', date: '2025-04-01', value: 8 },
                        { id: '2', date: '2025-04-02', value: 3 },
                        { id: '3', date: '2025-04-03', value: 5 },
                        { id: '4', date: '2025-04-04', value: 6 },
                        { id: '5', date: '2025-04-05', value: 6 },
                        { id: '6', date: '2025-04-06', value: 7 },
                        { id: '7', date: '2025-04-07', value: 5 },
                        // ... more data
                    ]}
                    targetValue={streakData.totalTarget}
                    colorScheme={streakData.colorsScheme}
                    timeframe="week"
                />
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 12,
        paddingTop: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24
    }
});