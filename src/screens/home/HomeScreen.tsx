import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Mountain, Sparkles } from 'lucide-react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuthStore } from '../../stores/authStore';
import { SearchBar } from '../../components/SearchBar';
import { DifficultyChips } from '../../components/DifficultyChips';
import { SectionHeader } from '../../components/SectionHeader';
import { TrailCard } from '../../components/TrailCard';
import { GlampingCard } from '../../components/GlampingCard';
import { getPopularTrails } from '../../data/mockTrails';
import { getRecommendedGlamping } from '../../data/mockGlamping';
import { useFilterStore } from '../../stores/filterStore';
import type { HomeStackParamList, MainTabParamList } from '../../navigation/types';
import type { Trail, Glamping } from '../../types';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'Home'>,
  BottomTabScreenProps<MainTabParamList>
>;

export function HomeScreen({ navigation }: Props) {
  const theme = useTheme();
  const user = useAuthStore((s) => s.user);
  const { search, setSearch, difficulty, toggleDifficulty } = useFilterStore();

  const [trails, setTrails] = useState<Trail[]>([]);
  const [glamping, setGlamping] = useState<Glamping[]>([]);

  useEffect(() => {
    setTrails(getPopularTrails(4));
    setGlamping(getRecommendedGlamping(3));
  }, []);

  const firstName = user?.name?.split(' ')[0] ?? 'drumeț';

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.scroll}
    >
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
        }}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View
          style={[
            styles.heroOverlay,
            {
              backgroundColor:
                theme.mode === 'dark' ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.35)',
            },
          ]}
        />
        <View style={styles.heroContent}>
          <View style={styles.heroRow}>
            <Mountain color="#ffffff" size={20} />
            <Text style={styles.heroBrand}>TrailNest</Text>
          </View>
          <Text style={styles.heroGreeting}>Bună, {firstName}!</Text>
          <Text style={styles.heroSub}>Următoarea ta aventură în natură</Text>
        </View>
      </ImageBackground>

      <View style={styles.section}>
        <SearchBar value={search} onChange={setSearch} />
        <View style={{ height: 12 }} />
        <DifficultyChips selected={difficulty} onToggle={toggleDifficulty} />
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Trasee populare"
          subtitle="Cele mai apreciate drumeții"
          actionLabel="Vezi tot"
          onPressAction={() => navigation.navigate('TrailsTab', { screen: 'Trails' })}
        />
        <View style={styles.list}>
          {trails.map((trail) => (
            <TrailCard
              key={trail.id}
              trail={trail}
              onPress={() => navigation.navigate('TrailDetails', { trailId: trail.id })}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Glamping recomandat"
          subtitle="Cazări unice aproape de trasee"
          actionLabel="Explorează"
          onPressAction={() => navigation.navigate('GlampingTab', { screen: 'Glamping' })}
        />
        <View style={styles.list}>
          {glamping.map((g) => (
            <GlampingCard
              key={g.id}
              glamping={g}
              onPress={() => navigation.navigate('GlampingDetails', { glampingId: g.id })}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View
          style={[
            styles.cta,
            {
              backgroundColor: theme.colors.primary,
              borderRadius: theme.radius.xl,
            },
          ]}
        >
          <View style={styles.ctaRow}>
            <Sparkles color={theme.colors.textInverse} size={20} />
            <Text style={[styles.ctaTitle, { color: theme.colors.textInverse }]}>
              Planifică o excursie de grup
            </Text>
          </View>
          <Text style={[styles.ctaText, { color: theme.colors.textInverse }]}>
            Invită prietenii, distribuie itinerariul și explorați împreună munții
            României cu TrailNest.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 40,
  },
  hero: {
    height: 200,
    justifyContent: 'flex-end',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    padding: 20,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  heroBrand: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroGreeting: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
  },
  heroSub: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  list: {
    gap: 14,
  },
  cta: {
    padding: 18,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
  },
  ctaText: {
    fontSize: 13,
    lineHeight: 19,
    opacity: 0.95,
  },
});
