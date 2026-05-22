import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Star } from 'lucide-react-native';
import type { Review } from '../types';
import { useTheme } from '../theme/ThemeProvider';

export function ReviewCard({ review }: { review: Review }) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
        },
      ]}
    >
      <View style={styles.head}>
        <Image source={{ uri: review.avatar }} style={styles.avatar} />
        <View style={styles.headText}>
          <Text style={[styles.author, { color: theme.colors.text }]}>
            {review.author}
          </Text>
          <Text style={[styles.date, { color: theme.colors.textMuted }]}>
            {review.date}
          </Text>
        </View>
        <View style={styles.rating}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              color={theme.colors.accent}
              fill={i < review.rating ? theme.colors.accent : 'transparent'}
            />
          ))}
        </View>
      </View>
      <Text style={[styles.comment, { color: theme.colors.text }]}>
        {review.comment}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 14,
    borderWidth: 1,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  headText: {
    flex: 1,
  },
  author: {
    fontWeight: '700',
    fontSize: 14,
  },
  date: {
    fontSize: 12,
  },
  rating: {
    flexDirection: 'row',
    gap: 2,
  },
  comment: {
    fontSize: 14,
    lineHeight: 20,
  },
});
