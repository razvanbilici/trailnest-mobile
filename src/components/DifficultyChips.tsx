import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import type { Difficulty } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { difficultyColors, difficultyLabel } from '../lib/utils';
import { DIFFICULTY_OPTIONS } from '../stores/filterStore';

interface DifficultyChipsProps {
  selected: Difficulty[];
  onToggle: (value: Difficulty) => void;
}

export function DifficultyChips({ selected, onToggle }: DifficultyChipsProps) {
  const theme = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {DIFFICULTY_OPTIONS.map((d) => {
        const isActive = selected.includes(d);
        const colors = difficultyColors(d, theme.colors);
        return (
          <Pressable
            key={d}
            onPress={() => onToggle(d)}
            style={[
              styles.chip,
              {
                borderRadius: theme.radius.full,
                backgroundColor: isActive ? colors.bg : theme.colors.surface,
                borderColor: isActive ? colors.text : theme.colors.border,
              },
            ]}
          >
            <Text
              style={{
                color: isActive ? colors.text : theme.colors.textMuted,
                fontSize: 13,
                fontWeight: '700',
              }}
            >
              {difficultyLabel(d)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
  },
});
