import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CalendarStrip from '@/components/CalendarStrip'
import { LinearGradient } from 'expo-linear-gradient'
import EmojiContainer from '@/components/EmojiContainer'

const Medidatesvg = require('../../assets/undraw/amico.svg').default
const DailyCheckIn = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>How Are You Feeling Today?</Text>
          
          <LinearGradient
            colors={['#FCE7F3', '#FF94D1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.calendarContainer}
          >
            <CalendarStrip />
          </LinearGradient>

          <View style={styles.moodOptionsContainer}>
            <Text style={styles.subtitle}>Log your Mood</Text>
            <EmojiContainer/>
          </View>
          <View style= {{
            // margin: 20,.

            // flexDirection: 'row',
            justifyContent: 'center',
            // alignItems: 'center',
            // gap: 10,
          }}>
       
            <Text style={styles.subtitle}>  
            Manage Stress
            </Text>
            <Text style={{
              paddingHorizontal: 20,

              fontSize: 16,
              fontWeight: '400',
              color: '#444',
              // marginBottom: 15,
              fontFamily: 'Acorn-Regular',
            }}>
              Medidating can help a lot!
            </Text>
          </View>
          <View style={{
            margin: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}>
            <Medidatesvg width={200} height={200} />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => console.log('Submit')}
            >
              <Text style={styles.submitButtonText}>Medidate Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30
  },
  container: {
    flex: 1,
    // paddingHorizontal: 20,
    paddingTop: 20
  },
  title: {
    fontSize: 24,
    // fontWeight: '600',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
    fontFamily: 'Acorn-Regular'
  },
  calendarContainer: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  moodOptionsContainer: {
    marginBottom: 30
  },
  subtitle: {
    paddingHorizontal: 20,
    fontSize: 26,
    fontWeight: '500',
    color: '#444',
    marginBottom: 0,
    fontFamily: 'Acorn-Regular',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  moodButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF'
  },
  moodEmoji: {
    fontSize: 24
  },
  notesContainer: {
    marginBottom: 30
  },
  textInputContainer: {
    height: 120,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    justifyContent: 'flex-start'
  },
  placeholderText: {
    color: '#6C757D',
    fontSize: 14
  },
  submitButton: {
    // width: '50%',
    justifyContent: 'center',
    // height: 50,
    backgroundColor: '#000000',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4A6FA5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Acorn-Regular'
  }
})

export default DailyCheckIn