import { useWindowDimensions } from 'react-native';

import { layout } from '@/theme';

export function useResponsive() {
  const { width } = useWindowDimensions();
  const isWide = width >= layout.wideBreakpoint;
  const isLarge = width >= layout.largeBreakpoint;

  return {
    width,
    isWide,
    isLarge,
    columns: isLarge ? 3 : isWide ? 2 : 1,
  };
}
