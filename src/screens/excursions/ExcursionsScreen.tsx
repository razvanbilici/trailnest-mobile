import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CalendarDays, Heart, Map, Share2, Tent, Users } from 'lucide-react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '../../theme/ThemeProvider';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { trails } from '../../data/mockTrails';
import { glampingLocations } from '../../data/mockGlamping';
import { TrailCard } from '../../components/TrailCard';
import { GlampingCard } from '../../components/GlampingCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import type {
  ExcursionsStackParamList,
  MainTabParamList,
} from '../../navigation/types';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ExcursionsStackParamList, 'Excursions'>,
  BottomTabScreenProps<MainTabParamList>
>;

type SavedTab = 'trails' | 'glamping';

const mockGroupTrips = [
  {
    id: 'group-1',
    title: 'Weekend în Bucegi',
    route: 'Creasta Morii - Bucegi',
    date: '20 Iun 2026',
    participants: 4,
    status: 'Planificare',
  },
  {
    id: 'group-2',
    title: 'Aventură Piatra Craiului',
    route: 'Șaua La Om - Piatra Craiului',
    date: '10 Iul 2026',
    participants: 2,
    status: 'Confirmat',
  },
];

export function ExcursionsScreen({ navigation }: Props) {
  const theme = useTheme();
  const [savedTab, setSavedTab] = useState<SavedTab>('trails');
  const favTrailIds = useFavoritesStore((s) => s.trails);
  const favGlampingIds = useFavoritesStore((s) => s.glamping);

  const favTrails = trails.filter((t) => favTrailIds.includes(t.id));
  const favGlamping = glampingLocations.filter((g) => favGlampingIds.includes(g.id));

  const TabButton = ({
    value,
    label,
    count,
    icon,
  }: {
    value: SavedTab;
    label: string;
    count: number;
    icon: React.ReactNode;
  }) => {
    const isActive = savedTab === value;
    return (
      <Pressable
        onPress={() => setSavedTab(value)}
        style={[
          styles.tab,
          {
            borderColor: isActive ? theme.colors.primary : theme.colors.border,
            backgroundColor: isActive ? theme.colors.primary : 'transparent',
            borderRadius: theme.radius.full,
          },
        ]}
      >
        {icon}
        <Text
          style={{
            color: isActive ? theme.colors.textInverse : theme.colors.text,
            fontWeight: '700',
            fontSize: 13,
          }}
        >
          {label} ({count})
        </Text>
      </Pressable>
    );
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.scroll}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Favorite și excursii de grup
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
        Aventurile tale salvate și itinerariile partajate
      </Text>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Trasee salvate
      </Text>
      <View style={styles.tabs}>
        <TabButton
          value="trails"
          label="Trasee"
          count={favTrails.length}
          icon={
            <Map
              size={14}
              color={savedTab === 'trails' ? theme.colors.textInverse : theme.colors.text}
            />
          }
        />
        <TabButton
          value="glamping"
          label="Glamping"
          count={favGlamping.length}
          icon={
            <Tent
              size={14}
              color={
                savedTab === 'glamping' ? theme.colors.textInverse : theme.colors.text
              }
            />
          }
        />
      </View>

      <View style={styles.list}>
        {savedTab === 'trails' ? (
          favTrails.length > 0 ? (
            favTrails.map((trail) => (
              <TrailCard
                key={trail.id}
                trail={trail}
                onPress={() => navigation.navigate('TrailDetails', { trailId: trail.id })}
              />
            ))
          ) : (
            <EmptyState
              icon={<Heart size={48} color={theme.colors.textMuted} />}
              title="Niciun traseu salvat"
              message="Salvează traseele preferate apăsând pe inimioară."
              action={
                <Button
                  title="Descoperă trasee"
                  variant="outline"
                  onPress={() => navigation.navigate('TrailsTab', { screen: 'Trails' })}
                />
              }
            />
          )
        ) : favGlamping.length > 0 ? (
          favGlamping.map((g) => (
            <GlampingCard
              key={g.id}
              glamping={g}
              onPress={() => navigation.navigate('GlampingDetails', { glampingId: g.id })}
            />
          ))
        ) : (
          <EmptyState
            icon={<Heart size={48} color={theme.colors.textMuted} />}
            title="Nicio cazare salvată"
            message="Salvează cazările preferate apăsând pe inimioară."
            action={
              <Button
                title="Vezi glamping"
                variant="outline"
                onPress={() => navigation.navigate('GlampingTab', { screen: 'Glamping' })}
              />
            }
          />
        )}
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 20 }]}>
        Planificator excursii de grup
      </Text>
      <View style={styles.list}>
        {mockGroupTrips.map((trip) => (
          <View
            key={trip.id}
            style={[
              styles.tripCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.lg,
              },
            ]}
          >
            <View style={styles.tripTop}>
              <Text style={[styles.tripTitle, { color: theme.colors.text }]}>{trip.title}</Text>
              <Text style={{ color: theme.colors.primary, fontWeight: '700', fontSize: 12 }}>
                {trip.status}
              </Text>
            </View>
            <Text style={{ color: theme.colors.textMuted, fontSize: 13 }}>{trip.route}</Text>
            <View style={styles.tripMeta}>
              <View style={styles.metaItem}>
                <CalendarDays size={13} color={theme.colors.textMuted} />
                <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>{trip.date}</Text>
              </View>
              <View style={styles.metaItem}>
                <Users size={13} color={theme.colors.textMuted} />
                <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>
                  {trip.participants} participanți
                </Text>
              </View>
            </View>
            <View style={styles.tripActions}>
              <Pressable
                style={[
                  styles.tripActionBtn,
                  {
                    borderColor: theme.colors.border,
                    borderRadius: theme.radius.full,
                  },
                ]}
              >
                <Users size={14} color={theme.colors.text} />
                <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 12 }}>
                  Invitare participanți
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.tripActionBtn,
                  {
                    borderColor: theme.colors.border,
                    borderRadius: theme.radius.full,
                  },
                ]}
              >
                <Share2 size={14} color={theme.colors.text} />
                <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 12 }}>
                  Distribuie detalii
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 16,
    paddingBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 18,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  list: {
    gap: 14,
  },
  tripCard: {
    borderWidth: 1,
    padding: 14,
  },
  tripTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
    paddingRight: 8,
  },
  tripMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  tripActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  tripActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});
