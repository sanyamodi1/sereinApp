import { View, Text, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import React from 'react';

type DayData = {
    day: string;
    date: number;
    isToday: boolean;
};

const { width: screenWidth } = Dimensions.get('window');

const scale = (size: number): number => (screenWidth / 375) * size;

const getWeekDates = (): DayData[] => {
    const today = new Date();
    const currentDay = today.getDay();
    const dates: DayData[] = [];

    const sunday = new Date(today);
    sunday.setDate(today.getDate() - currentDay);

    for (let i = 0; i < 7; i++) {
        const date = new Date(sunday);
        date.setDate(sunday.getDate() + i);
        dates.push({
            day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
            date: date.getDate(),
            isToday: date.getDate() === today.getDate()
        });
    }
    return dates;
};

const weekDates = getWeekDates();

// ⬇️ Accept a `style` prop
const CalendarStrip = ({ style }: { style?: ViewStyle }) => {
    return (
        <View style={[styles.calendarStrip, style]}>
            {weekDates.map((day, index) => (
                <View
                    key={index}
                    style={[
                        styles.dayContainer,
                        day.isToday && styles.todayContainer
                    ]}
                >
                    <Text style={styles.dayName}>{day.day}</Text>
                    <Text style={styles.dateNumber}>{day.date}</Text>
                </View>
            ))}
        </View>
    );
};

export default CalendarStrip;

const styles = StyleSheet.create({
    calendarStrip: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: scale(8),
        paddingVertical: scale(5),
    },
    dayContainer: {
        alignItems: 'center',
        width: scale(45),
        paddingVertical: scale(8),
        borderRadius: scale(20),
    },
    todayContainer: {
        backgroundColor: '#FFFDF7',
    },
    dayName: {
        fontFamily: 'TT Commons',
        color: '#252525',
        fontSize: scale(14),
        marginBottom: scale(4),
    },
    dateNumber: {
        fontFamily: 'TT Commons',
        color: '#252525',
        fontSize: scale(14),
    },
});
