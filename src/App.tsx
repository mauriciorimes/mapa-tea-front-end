import { DefaultTheme, NavigationContainer, type Theme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PlacesProvider } from '@/contexts/PlacesContext';
import AppTabs from '@/navigation/AppTabs';
import { colors } from '@/theme';

const APP_NAME = 'Mapa TEA';

const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PlacesProvider>
        <NavigationContainer
          theme={navigationTheme}
          documentTitle={{
            formatter: (options, route) => {
              const title = options?.title ?? route?.name ?? APP_NAME;
              return title === APP_NAME ? APP_NAME : `${title} · ${APP_NAME}`;
            },
          }}
        >
          <AppTabs />
        </NavigationContainer>
        <StatusBar style="dark" />
      </PlacesProvider>
    </SafeAreaProvider>
  );
}
