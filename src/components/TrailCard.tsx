import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MapPin, Clock, Star } from 'lucide-react-native';
import type { Trail } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { difficultyColors, difficultyLabel } from '../lib/utils';
import { Badge } from './ui/Badge';
import { FavoriteButton } from './FavoriteButton';
import { useFavoritesStore } from '../stores/favoritesStore';

interface TrailCardProps {
  trail: Trail;
  onPress: () => void;
  variant?: 'standard' | 'compact';
}

export function TrailCard({ trail, onPress, variant = 'standard' }: TrailCardProps) {
  const theme = useTheme();
  const diff = difficultyColors(trail.difficulty, theme.colors);
  const isFav = useFavoritesStore((s) => s.trails.includes(trail.id));
  const toggleFav = useFavoritesStore((s) => s.toggleTrail);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.lg,
          },
        ]}
      >
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: trail.images[0] }}
            style={[
              styles.image,
              { height: variant === 'compact' ? 140 : 180 },
            ]}
          />
          <View style={styles.imageOverlay}>
            <Badge
              label={difficultyLabel(trail.difficulty)}
              bg={diff.bg}
              color={diff.text}
            />
            <FavoriteButton active={isFav} onToggle={() => toggleFav(trail.id)} />
          </View>
        </View>

        <View style={styles.body}>
          <Text
            style={[styles.title, { color: theme.colors.text }]}
            numberOfLines={1}
          >
            {trail.title}
          </Text>

          <View style={styles.metaRow}>
            <MapPin size={13} color={theme.colors.textMuted} />
            <Text
              style={[styles.metaText, { color: theme.colors.textMuted }]}
              numberOfLines={1}
            >
              {trail.location}
            </Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Clock size={13} color={theme.colors.textMuted} />
              <Text style={[styles.statText, { color: theme.colors.text }]}>
                {trail.duration}
              </Text>
            </View>
            <Text style={[styles.statText, { color: theme.colors.text }]}>
              {trail.distance}
            </Text>
            <Text style={[styles.statText, { color: theme.colors.text }]}>
              {trail.elevation}
            </Text>
          </View>

          <View style={styles.ratingRow}>
            <Star size={14} color={theme.colors.accent} fill={theme.colors.accent} />
            <Text style={[styles.ratingText, { color: theme.colors.text }]}>
              {trail.rating.toFixed(1)}
            </Text>
            <Text style={[styles.reviewText, { color: theme.colors.textMuted }]}>
              ({trail.reviewCount} recenzii)
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageWrap: {
    position: 'relative',
  },
  image: {
    width: '100%',
    backgroundColor: '#888',
  },
  imageOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  body: {
    padding: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  metaText: {
    fontSize: 12,
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
  },
  reviewText: {
    fontSize: 12,
  },
});
