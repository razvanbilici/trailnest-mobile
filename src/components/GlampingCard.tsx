import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';
import type { Glamping } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { formatPrice } from '../lib/utils';
import { FavoriteButton } from './FavoriteButton';
import { useFavoritesStore } from '../stores/favoritesStore';

interface GlampingCardProps {
  glamping: Glamping;
  onPress: () => void;
}

export function GlampingCard({ glamping, onPress }: GlampingCardProps) {
  const theme = useTheme();
  const isFav = useFavoritesStore((s) => s.glamping.includes(glamping.id));
  const toggleFav = useFavoritesStore((s) => s.toggleGlamping);

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
          <Image source={{ uri: glamping.images[0] }} style={styles.image} />
          <View style={styles.imageOverlay}>
            <FavoriteButton
              active={isFav}
              onToggle={() => toggleFav(glamping.id)}
            />
          </View>
          <View
            style={[
              styles.priceTag,
              {
                backgroundColor: theme.colors.primary,
                borderRadius: theme.radius.full,
              },
            ]}
          >
            <Text style={[styles.priceText, { color: theme.colors.textInverse }]}>
              {formatPrice(glamping.price)} / noapte
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text
            style={[styles.title, { color: theme.colors.text }]}
            numberOfLines={1}
          >
            {glamping.name}
          </Text>

          <View style={styles.row}>
            <MapPin size={13} color={theme.colors.textMuted} />
            <Text
              style={[styles.muted, { color: theme.colors.textMuted }]}
              numberOfLines={1}
            >
              {glamping.location}
            </Text>
          </View>

          <View style={styles.row}>
            <Star size={13} color={theme.colors.accent} fill={theme.colors.accent} />
            <Text style={[styles.ratingText, { color: theme.colors.text }]}>
              {glamping.rating.toFixed(1)}
            </Text>
            <Text style={[styles.muted, { color: theme.colors.textMuted }]}>
              ({glamping.reviewCount})
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
    height: 170,
    backgroundColor: '#888',
  },
  imageOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  priceTag: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '700',
  },
  body: {
    padding: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  muted: {
    fontSize: 12,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
