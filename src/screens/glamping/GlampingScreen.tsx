import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Tent } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/ThemeProvider';
import { SearchBar } from '../../components/SearchBar';
import { GlampingCard } from '../../components/GlampingCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { glampingLocations } from '../../data/mockGlamping';
import type { GlampingStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<GlampingStackParamList, 'Glamping'>;

export function GlampingScreen({ navigation }: Props) {
  const theme = useTheme();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return glampingLocations;
    return glampingLocations.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.location.toLowerCase().includes(q) ||
        g.region.toLowerCase().includes(q) ||
        g.amenities.some((a) => a.toLowerCase().includes(q)),
    );
  }, [search]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Caută cazări, regiuni…"
        />
        <Text style={[styles.count, { color: theme.colors.textMuted }]}>
          {filtered.length} {filtered.length === 1 ? 'locație' : 'locații'} găsite
        </Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(g) => g.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        renderItem={({ item }) => (
          <GlampingCard
            glamping={item}
            onPress={() => navigation.navigate('GlampingDetails', { glampingId: item.id })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon={<Tent size={48} color={theme.colors.textMuted} />}
            title="Niciun rezultat"
            message="Încearcă un alt termen de căutare."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  count: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    flexGrow: 1,
  },
});
