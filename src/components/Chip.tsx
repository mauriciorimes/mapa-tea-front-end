import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';
import type { IconName } from '@/types/icon';

interface ChipProps {
  label: string;
  icon?: IconName;
  selected?: boolean;
  // Sem onPress o chip vira apenas uma etiqueta informativa.
  onPress?: () => void;
  small?: boolean;
}

export default function Chip({ label, icon, selected = false, onPress, small = false }: ChipProps) {
  const foreground = selected ? colors.white : colors.primary;
  const content = (
    <>
      {icon && <MaterialCommunityIcons name={icon} size={small ? 14 : 18} color={foreground} />}
      <Text style={[styles.label, small && styles.labelSmall, { color: foreground }]}>{label}</Text>
      {onPress && selected && <MaterialCommunityIcons name="check" size={16} color={foreground} />}
    </>
  );

  if (!onPress) {
    return <View style={[styles.base, small && styles.small]}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.base, styles.pressable, selected && styles.selected, pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primarySoft,
  },
  pressable: {
    minHeight: 40,
  },
  small: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  labelSmall: {
    fontSize: 12,
  },
});
