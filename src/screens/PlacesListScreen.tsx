import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

import Button from '@/components/Button';
import Chip from '@/components/Chip';
import ConfirmDialog from '@/components/ConfirmDialog';
import PlaceCard from '@/components/PlaceCard';
import { usePlaces } from '@/contexts/PlacesContext';
import { RESOURCES } from '@/data/resources';
import { useResponsive } from '@/hooks/useResponsive';
import type { PlacesStackParamList } from '@/navigation/types';
import { colors, layout, radius, spacing, webNoOutline } from '@/theme';
import type { Place, ResourceId } from '@/types/place';
import { normalize } from '@/utils/text';

type Props = NativeStackScreenProps<PlacesStackParamList, 'ListaLocais'>;

export default function PlacesListScreen({ navigation }: Props) {
  const { places, loading, removePlace } = usePlaces();
  const { columns } = useResponsive();
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [filters, setFilters] = useState<ResourceId[]>([]);
  const [placeToDelete, setPlaceToDelete] = useState<Place | null>(null);

  const filteredPlaces = useMemo(() => {
    const term = normalize(search);
    return places.filter((place) => {
      const matchesSearch =
        !term ||
        normalize(place.name).includes(term) ||
        normalize(place.address).includes(term) ||
        normalize(place.category).includes(term);
      const matchesFilters = filters.every((filter) => place.resources.includes(filter));
      return matchesSearch && matchesFilters;
    });
  }, [places, search, filters]);

  function toggleFilter(id: ResourceId) {
    setFilters((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function confirmDelete() {
    if (placeToDelete) removePlace(placeToDelete.id);
    setPlaceToDelete(null);
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const header = (
    <View style={styles.header}>
      <View style={[styles.searchBox, searchFocused && styles.searchBoxFocused]}>
        <MaterialCommunityIcons name="magnify" size={22} color={searchFocused ? colors.primary : colors.textMuted} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Buscar por nome, endereço ou categoria"
          placeholderTextColor={colors.textMuted}
          accessibilityLabel="Buscar locais"
          // A borda de foco fica na caixa inteira (ícone + campo), não só no campo.
          style={[styles.searchInput, webNoOutline]}
        />
      </View>

      <Text style={styles.filterLabel}>Filtrar por recurso</Text>
      <View style={styles.filters}>
        {RESOURCES.map((resource) => (
          <Chip
            key={resource.id}
            label={resource.label}
            icon={resource.icon}
            selected={filters.includes(resource.id)}
            onPress={() => toggleFilter(resource.id)}
          />
        ))}
      </View>

      <View style={styles.toolbar}>
        <Text style={styles.count}>
          {filteredPlaces.length} {filteredPlaces.length === 1 ? 'local encontrado' : 'locais encontrados'}
        </Text>
        <Button label="Novo local" icon="plus" onPress={() => navigation.navigate('FormLocal')} />
      </View>
    </View>
  );

  return (
    <>
      <FlatList
        key={columns}
        data={filteredPlaces}
        keyExtractor={(place) => place.id}
        numColumns={columns}
        style={styles.screen}
        contentContainerStyle={styles.content}
        ListHeaderComponent={header}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialCommunityIcons name="store-search-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>Nenhum local encontrado</Text>
            <Text style={styles.emptyText}>Ajuste a busca ou os filtros, ou cadastre um novo local.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.item, { width: `${100 / columns}%` }]}>
            <PlaceCard
              place={item}
              onEdit={() => navigation.navigate('FormLocal', { id: item.id })}
              onDelete={() => setPlaceToDelete(item)}
            />
          </View>
        )}
      />

      <ConfirmDialog
        visible={placeToDelete !== null}
        title="Excluir local"
        message={`Deseja excluir "${placeToDelete?.name ?? ''}"? Essa ação não pode ser desfeita.`}
        onConfirm={confirmDelete}
        onCancel={() => setPlaceToDelete(null)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  content: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    padding: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  header: {
    padding: spacing.sm,
    gap: spacing.md,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  searchBoxFocused: {
    borderColor: colors.primary,
    boxShadow: `0 0 0 3px ${colors.primarySoft}`,
  },
  searchInput: {
    flex: 1,
    minHeight: 46,
    fontSize: 15,
    color: colors.text,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  count: {
    flex: 1,
    fontSize: 14,
    color: colors.textMuted,
  },
  item: {
    padding: spacing.sm,
  },
  empty: {
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.xxl,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  emptyText: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
