import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Chip from '@/components/Chip';
import { getResource } from '@/data/resources';
import { colors, radius, spacing } from '@/theme';
import type { Place } from '@/types/place';

interface PlaceCardProps {
  place: Place;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PlaceCard({ place, onEdit, onDelete }: PlaceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.category}>{place.category}</Text>
      </View>

      <View style={styles.addressRow}>
        <MaterialCommunityIcons name="map-marker-outline" size={18} color={colors.textMuted} />
        <Text style={styles.address}>{place.address}</Text>
      </View>

      {place.resources.length > 0 && (
        <View style={styles.resources}>
          {place.resources.map((id) => {
            const resource = getResource(id);
            return resource ? <Chip key={id} label={resource.label} icon={resource.icon} small /> : null;
          })}
        </View>
      )}

      {place.benefits.length > 0 && (
        <View style={styles.benefits}>
          <MaterialCommunityIcons name="gift-outline" size={18} color={colors.secondary} />
          <Text style={styles.benefitsText}>{place.benefits}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <Button
          label="Editar"
          icon="pencil-outline"
          variant="outline"
          onPress={onEdit}
          accessibilityHint={`Editar ${place.name}`}
          style={styles.action}
        />
        <Button
          label="Excluir"
          icon="trash-can-outline"
          variant="danger"
          onPress={onDelete}
          accessibilityHint={`Excluir ${place.name}`}
          style={styles.action}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  header: {
    gap: spacing.xs,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  category: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondary,
    backgroundColor: colors.secondarySoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  address: {
    flex: 1,
    fontSize: 14,
    color: colors.textMuted,
  },
  resources: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  benefits: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.secondarySoft,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  benefitsText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: 'auto',
  },
  action: {
    flex: 1,
  },
});
