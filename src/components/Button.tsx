import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius, spacing } from '@/theme';
import type { IconName } from '@/types/icon';

type Variant = 'primary' | 'secondary' | 'outline' | 'danger';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  icon?: IconName;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
}

const VARIANTS: Record<Variant, { background: string; border: string; foreground: string }> = {
  primary: { background: colors.primary, border: colors.primary, foreground: colors.white },
  secondary: { background: colors.secondary, border: colors.secondary, foreground: colors.white },
  outline: { background: colors.surface, border: colors.border, foreground: colors.primary },
  danger: { background: colors.dangerSoft, border: colors.dangerSoft, foreground: colors.danger },
};

export default function Button({ label, onPress, variant = 'primary', icon, accessibilityHint, style }: ButtonProps) {
  const palette = VARIANTS[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: palette.background, borderColor: palette.border },
        pressed && styles.pressed,
        style,
      ]}
    >
      {icon && <MaterialCommunityIcons name={icon} size={20} color={palette.foreground} />}
      <Text style={[styles.label, { color: palette.foreground }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 46,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
});
