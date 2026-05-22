import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Cloud, Sun, CloudRain, Snowflake, Wind, Droplets } from 'lucide-react-native';
import type { Weather, WeatherIcon } from '../types';
import { useTheme } from '../theme/ThemeProvider';

interface WeatherWidgetProps {
  weather: Weather;
  compact?: boolean;
}

function iconFor(icon: WeatherIcon, color: string, size = 28) {
  switch (icon) {
    case 'sun':
      return <Sun size={size} color={color} />;
    case 'rain':
      return <CloudRain size={size} color={color} />;
    case 'snow':
      return <Snowflake size={size} color={color} />;
    case 'wind':
      return <Wind size={size} color={color} />;
    case 'cloud':
    default:
      return <Cloud size={size} color={color} />;
  }
}

export function WeatherWidget({ weather, compact }: WeatherWidgetProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: theme.colors.surfaceElevated,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.iconCol}>
          {iconFor(weather.icon, theme.colors.primary, compact ? 22 : 28)}
        </View>
        <View style={styles.tempCol}>
          <Text style={[styles.temp, { color: theme.colors.text }]}>
            {weather.temp}°C
          </Text>
          <Text style={[styles.condition, { color: theme.colors.textMuted }]}>
            {weather.condition}
          </Text>
        </View>
      </View>
      {!compact ? (
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Droplets size={14} color={theme.colors.textMuted} />
            <Text style={[styles.metaText, { color: theme.colors.textMuted }]}>
              {weather.humidity}%
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Wind size={14} color={theme.colors.textMuted} />
            <Text style={[styles.metaText, { color: theme.colors.textMuted }]}>
              {weather.windSpeed} km/h
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 12,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCol: {
    marginRight: 12,
  },
  tempCol: {
    flex: 1,
  },
  temp: {
    fontSize: 22,
    fontWeight: '700',
  },
  condition: {
    fontSize: 13,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
});
