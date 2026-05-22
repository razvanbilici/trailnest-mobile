import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MapPin, Clock, Mountain, Users, Star } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/ThemeProvider';
import { getTrailById } from '../../data/mockTrails';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { WeatherWidget } from '../../components/WeatherWidget';
import { ReviewCard } from '../../components/ReviewCard';
import { FavoriteButton } from '../../components/FavoriteButton';
import { useFavoritesStore } from '../../stores/favoritesStore';
import {
  crowdLevelColors,
  crowdLevelLabel,
  difficultyColors,
  difficultyLabel,
} from '../../lib/utils';
import type { HomeStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'TrailDetails'>;

const { width } = Dimensions.get('window');

export function TrailDetailsScreen({ route }: Props) {
  const theme = useTheme();
  const trail = getTrailById(route.params.trailId);

  const isFav = useFavoritesStore((s) => trail ? s.trails.includes(trail.id) : false);
  const toggleFav = useFavoritesStore((s) => s.toggleTrail);

  if (!trail) {
    return (
      <View
        style={[
          styles.notFound,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={{ color: theme.colors.text }}>Traseu inexistent.</Text>
      </View>
    );
  }

  const diff = difficultyColors(trail.difficulty, theme.colors);
  const crowd = crowdLevelColors(trail.crowdLevel, theme.colors);

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
        {trail.images.map((img, i) => (
          <Image key={i} source={{ uri: img }} style={{ width, height: 260 }} />
        ))}
      </ScrollView>

      <View style={styles.body}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {trail.title}
            </Text>
            <View style={styles.locationRow}>
              <MapPin size={14} color={theme.colors.textMuted} />
              <Text style={{ color: theme.colors.textMuted, fontSize: 13 }}>
                {trail.location} • {trail.region}
              </Text>
            </View>
          </View>
          <FavoriteButton
            active={isFav}
            onToggle={() => toggleFav(trail.id)}
            variant="inline"
          />
        </View>

        <View style={styles.badgesRow}>
          <Badge
            label={difficultyLabel(trail.difficulty)}
            bg={diff.bg}
            color={diff.text}
          />
          <Badge
            label={`Aglomerație: ${crowdLevelLabel(trail.crowdLevel)}`}
            bg={crowd.bg}
            color={crowd.text}
          />
          <View style={styles.ratingPill}>
            <Star size={13} color={theme.colors.accent} fill={theme.colors.accent} />
            <Text style={{ color: theme.colors.text, fontSize: 12, fontWeight: '700' }}>
              {trail.rating.toFixed(1)} ({trail.reviewCount})
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.statsRow,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.lg,
            },
          ]}
        >
          <Stat
            icon={<Clock size={18} color={theme.colors.primary} />}
            label="Durată"
            value={trail.duration}
            color={theme.colors.text}
            muted={theme.colors.textMuted}
          />
          <Stat
            icon={<MapPin size={18} color={theme.colors.primary} />}
            label="Distanță"
            value={trail.distance}
            color={theme.colors.text}
            muted={theme.colors.textMuted}
          />
          <Stat
            icon={<Mountain size={18} color={theme.colors.primary} />}
            label="Elevație"
            value={trail.elevation}
            color={theme.colors.text}
            muted={theme.colors.textMuted}
          />
          <Stat
            icon={<Users size={18} color={theme.colors.primary} />}
            label="Aglomerație"
            value={crowdLevelLabel(trail.crowdLevel)}
            color={theme.colors.text}
            muted={theme.colors.textMuted}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Despre traseu
        </Text>
        <Text style={[styles.description, { color: theme.colors.text }]}>
          {trail.description}
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Vremea acum
        </Text>
        <WeatherWidget weather={trail.weather} />

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Recenzii
        </Text>
        <View style={styles.reviews}>
          {trail.reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </View>

        <Button title="Planifică drumeție" fullWidth style={{ marginTop: 8 }} />
      </View>
    </ScrollView>
  );
}

function Stat({
  icon,
  label,
  value,
  color,
  muted,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  muted: string;
}) {
  return (
    <View style={styles.stat}>
      {icon}
      <Text style={[styles.statValue, { color }]} numberOfLines={1}>
        {value}
      </Text>
      <Text style={[styles.statLabel, { color: muted }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 40 },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
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
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderWidth: 1,
    marginBottom: 20,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 6,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },
  reviews: {
    gap: 10,
    marginBottom: 16,
  },
});
