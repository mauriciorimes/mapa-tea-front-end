import { useState } from 'react';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { colors, radius, spacing, webNoOutline } from '@/theme';

interface TextFieldProps extends TextInputProps {
  hasError?: boolean;
}

// Troca o contorno padrão do navegador por uma borda de foco que acompanha o arredondamento do campo.
export default function TextField({ hasError = false, style, onFocus, onBlur, ...props }: TextFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      placeholderTextColor={colors.textMuted}
      {...props}
      onFocus={(event) => {
        setFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setFocused(false);
        onBlur?.(event);
      }}
      style={[styles.input, webNoOutline, focused && styles.focused, hasError && styles.error, style]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  focused: {
    borderColor: colors.primary,
    boxShadow: `0 0 0 3px ${colors.primarySoft}`,
  },
  error: {
    borderColor: colors.danger,
  },
});
