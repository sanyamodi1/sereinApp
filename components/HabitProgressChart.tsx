import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

interface HabitProgressData {
  id: string;
  date: string;
  value: number;
}

interface HabitProgressChartProps {
  habitId: number;
  habitName: string;
  unit: string;
  data: HabitProgressData[];
  targetValue?: number;
  colorScheme?: string;
  customColor?: string;
  timeframe?: 'week' | 'month';
  onBarPress?: (dataPoint: HabitProgressData) => void;
}

const screenWidth = Dimensions.get('window').width;

const HabitProgressChart: React.FC<HabitProgressChartProps> = ({
  habitId,
  habitName,
  unit,
  data,
  targetValue,
  colorScheme = 'primary',
  customColor,
  timeframe = 'week',
  onBarPress,
}) => {
  const [selectedDataPoint, setSelectedDataPoint] = useState<HabitProgressData | null>(null);

  // Color schemes
  const colorSchemes = {
    primary: {
      gradientFrom: '#e3f2fd',
      gradientTo: '#bbdefb',
      barColor: '#2196f3',
      textColor: '#0d47a1',
    },
    secondary: {
      gradientFrom: '#f3e5f5',
      gradientTo: '#e1bee7',
      barColor: '#9c27b0',
      textColor: '#4a148c',
    },
    accent: {
      gradientFrom: '#e8f5e9',
      gradientTo: '#c8e6c9',
      barColor: '#4caf50',
      textColor: '#2e7d32',
    },
  };

  // Handle custom colors separately
  const colors = colorScheme === 'custom' && customColor
    ? {
      gradientFrom: `${customColor}20`, // adding opacity manually
      gradientTo: `${customColor}40`,
      barColor: customColor,
      textColor: customColor,
    }
    : colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes.primary;


  // Prepare chart data
  const chartData = {
    labels: data.map(item => {
      const date = new Date(item.date);
      return timeframe === 'week'
        ? date.toLocaleDateString('en-US', { weekday: 'short' })
        : date.getDate().toString();
    }),
    datasets: [{
      data: data.map(item => item.value)
    }]
  };

  // Calculate stats
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const average = Math.round(total / data.length);
  const maxValue = Math.max(...data.map(item => item.value));
  const targetTotal = targetValue ? targetValue * data.length : null;

  // Handle bar press
  const handleBarPress = (index: number) => {
    const selected = data[index];
    setSelectedDataPoint(selectedDataPoint?.date === selected.date ? null : selected);
    if (onBarPress) {
      onBarPress(selected);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.textColor }]}>{habitName} Progress</Text>

        {/* Chart */}
        <View style={styles.chartWrapper}>
          <BarChart
            data={chartData}
            width={screenWidth - 40}
            height={250}
            yAxisLabel=""
            yAxisSuffix=""
            fromZero
            showValuesOnTopOfBars
            withInnerLines={false}
            // withOuterLines={false}
            verticalLabelRotation={0}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: colors.gradientFrom,
              backgroundGradientTo: colors.gradientTo,
              decimalPlaces: 0,
              color: (opacity = 1) => colors.barColor,
              labelColor: (opacity = 1) => colors.textColor,
              style: { borderRadius: 20 },
              propsForBackgroundLines: { strokeWidth: 0 },
              propsForLabels: { fontSize: 12, fontWeight: '500' },
              barPercentage: 0.7,
            }}
            style={styles.chart}
          />
          {targetValue && (
            <View style={[styles.targetLine, { bottom: `${(targetValue / Math.max(maxValue, targetValue * 1.2)) * 100}%` }]}>
              <Text style={[styles.targetLabel, { color: colors.textColor }]}>Target: {targetValue}{unit}</Text>
            </View>
          )}
        </View>

        {/* Selected day details */}
        {selectedDataPoint && (
          <View style={[styles.detailsCard, { borderColor: colors.barColor }]}>
            <Text style={[styles.detailsTitle, { color: colors.textColor }]}>
              {new Date(selectedDataPoint.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </Text>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Progress:</Text>
              <Text style={styles.detailsValue}>
                {selectedDataPoint.value}{unit}
              </Text>
            </View>
            {targetValue && (
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Completion:</Text>
                <Text style={[
                  styles.detailsValue,
                  selectedDataPoint.value >= targetValue ? styles.targetMet : styles.targetMissed
                ]}>
                  {Math.round((selectedDataPoint.value / targetValue) * 100)}%
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Stats summary */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: `${colors.barColor}20` }]}>
            <Ionicons name="stats-chart" size={20} color={colors.textColor} />
            <Text style={[styles.statValue, { color: colors.textColor }]}>
              {total}{"\n"}{unit}
            </Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: `${colors.barColor}20` }]}>
            <Ionicons name="analytics" size={20} color={colors.textColor} />
            <Text style={[styles.statValue, { color: colors.textColor }]}>{average}{'\n'}{unit}</Text>
            <Text style={styles.statLabel}>Average</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: `${colors.barColor}20` }]}>
            <Ionicons name="trending-up" size={20} color={colors.textColor} />
            <Text style={[styles.statValue, { color: colors.textColor }]}>{maxValue}{'\n'}{unit}</Text>
            <Text style={styles.statLabel}>Peak</Text>
          </View>
        </View>

        {/* Target progress */}
        {targetTotal && (
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressTitle, { color: colors.textColor }]}>
                {timeframe === 'week' ? 'Weekly' : 'Monthly'} Target
              </Text>
              <Text style={[styles.progressPercent, { color: colors.textColor }]}>
                {Math.round((total / targetTotal) * 100)}%
              </Text>
            </View>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${Math.min(100, (total / targetTotal) * 100)}%`,
                    backgroundColor: colors.barColor,
                  }
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.textColor }]}>
              {total} {unit} of {targetTotal} {unit}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
  },
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
    paddingRight: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  targetLine: {
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#f44336',
    justifyContent: 'center',
  },
  targetLabel: {
    position: 'absolute',
    right: 10,
    top: 10,
    fontSize: 12,
    fontWeight: '500',
    backgroundColor: 'white',
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  detailsCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailsLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailsValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  targetMet: {
    color: '#4caf50',
  },
  targetMissed: {
    color: '#f44336',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HabitProgressChart;