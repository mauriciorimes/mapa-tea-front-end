import { Platform, type TextStyle } from 'react-native';

// No navegador o foco usa `outline-style: auto`, que ignora `outline-width: 0`; só `none` remove o contorno.
// O tipo do React Native não aceita 'none', por isso o cast. Os campos desenham a própria borda de foco.
export const webNoOutline = (Platform.OS === 'web' ? { outlineStyle: 'none' } : {}) as TextStyle;

export const colors = {
  primary: '#2F6690',
  primarySoft: '#E3EEF6',
  secondary: '#3A7D6B',
  secondarySoft: '#E4F1EC',
  background: '#F4F6F8',
  surface: '#FFFFFF',
  text: '#1F2933',
  textMuted: '#52606D',
  border: '#D9E2EC',
  danger: '#B23B3B',
  dangerSoft: '#FBEAEA',
  white: '#FFFFFF',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const layout = {
  maxWidth: 1100,
  wideBreakpoint: 768,
  largeBreakpoint: 1024,
} as const;
