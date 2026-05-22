import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MapPin, Star, Check } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/ThemeProvider';
import { getGlampingById } from '../../data/mockGlamping';
import { Button } from '../../components/ui/Button';
import { ReviewCard } from '../../components/ReviewCard';
import { FavoriteButton } from '../../components/FavoriteButton';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { formatPrice } from '../../lib/utils';
import type { GlampingStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<GlampingStackParamList, 'GlampingDetails'>;

const { width } = Dimensions.get('window');

export function GlampingDetailsScreen({ route }: Props) {
  const theme = useTheme();
  const glamping = getGlampingById(route.params.glampingId);
  const isFav = useFavoritesStore((s) =>
    glamping ? s.glamping.includes(glamping.id) : false,
  );
  const toggleFav = useFavoritesStore((s) => s.toggleGlamping);

  if (!glamping) {
    return (
      <View
        style={[
          styles.notFound,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={{ color: theme.colors.text }}>Cazare inexistentă.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.scroll}
    >
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ height: 260 }}
      >
        {glamping.images.map((img, i) => (
          <Image key={i} source={{ uri: img }} style={{ width, height: 260 }} />
        ))}
      </ScrollView>

      <View style={styles.body}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {glamping.name}
            </Text>
            <View style={styles.locationRow}>
              <MapPin size={14} color={theme.colors.textMuted} />
              <Text style={{ color: theme.colors.textMuted, fontSize: 13 }}>
                {glamping.location} • {glamping.region}
              </Text>
            </View>
            <View style={styles.ratingRow}>
              <Star size={14} color={theme.colors.accent} fill={theme.colors.accent} />
              <Text style={{ color: theme.colors.text, fontWeight: '700' }}>
                {glamping.rating.toFixed(1)}
              </Text>
              <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>
                ({glamping.reviewCount} recenzii)
              </Text>
            </View>
          </View>
          <FavoriteButton
            active={isFav}
            onToggle={() => toggleFav(glamping.id)}
            variant="inline"
          />
        </View>

        <View
          style={[
            styles.priceBox,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.lg,
            },
          ]}
        >
          <View>
            <Text style={[styles.priceLabel, { color: theme.colors.textMuted }]}>
              Tarif
            </Text>
            <Text style={[styles.priceValue, { color: theme.colors.text }]}>
              {formatPrice(glamping.price)}
              <Text style={{ color: theme.colors.textMuted, fontSize: 13 }}>
                {' '}/ noapte
              </Text>
            </Text>
          </View>
          <Button title="Rezervă" />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Despre cazare
        </Text>
        <Text style={[styles.description, { color: theme.colors.text }]}>
          {glamping.description}
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Facilități
        </Text>
        <View style={styles.amenities}>
          {glamping.amenities.map((amenity) => (
            <View
              key={amenity}
              style={[
                styles.amenityChip,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  borderRadius: theme.radius.full,
                },
              ]}
            >
              <Check size={14} color={theme.colors.primary} />
              <Text style={{ color: theme.colors.text, fontSize: 13 }}>{amenity}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Recenzii
        </Text>
        <View style={styles.reviews}>
          {glamping.reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 40 },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { padding: 16 },
  headerRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  priceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
  },
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  reviews: {
    gap: 10,
  },
});
