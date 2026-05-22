import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Map } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/ThemeProvider';
import { SearchBar } from '../../components/SearchBar';
import { DifficultyChips } from '../../components/DifficultyChips';
import { TrailCard } from '../../components/TrailCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { trails } from '../../data/mockTrails';
import { useFilterStore } from '../../stores/filterStore';
import type { TrailsStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<TrailsStackParamList, 'Trails'>;

export function TrailsScreen({ navigation }: Props) {
  const theme = useTheme();
  const { search, difficulty, setSearch, toggleDifficulty } = useFilterStore();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return trails.filter((t) => {
      const matchesSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.region.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchesDifficulty =
        difficulty.length === 0 || difficulty.includes(t.difficulty);
      return matchesSearch && matchesDifficulty;
    });
  }, [search, difficulty]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <SearchBar value={search} onChange={setSearch} />
        <View style={{ height: 12 }} />
        <DifficultyChips selected={difficulty} onToggle={toggleDifficulty} />
        <Text style={[styles.count, { color: theme.colors.textMuted }]}>
          {filtered.length} {filtered.length === 1 ? 'traseu' : 'trasee'} găsite
        </Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(t) => t.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        renderItem={({ item }) => (
          <TrailCard
            trail={item}
            onPress={() => navigation.navigate('TrailDetails', { trailId: item.id })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon={<Map size={48} color={theme.colors.textMuted} />}
            title="Niciun traseu găsit"
            message="Încearcă să modifici filtrele sau termenul de căutare."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  count: {
    marginTop: 12,
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
