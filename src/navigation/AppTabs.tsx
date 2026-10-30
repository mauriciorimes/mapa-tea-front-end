import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PlacesStack from '@/navigation/PlacesStack';
import type { TabParamList } from '@/navigation/types';
import AboutScreen from '@/screens/AboutScreen';
import HomeScreen from '@/screens/HomeScreen';
import { colors } from '@/theme';
import type { IconName } from '@/types/icon';

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS: Record<keyof TabParamList, IconName> = {
  Inicio: 'home-outline',
  Locais: 'map-marker-multiple-outline',
  Sobre: 'information-outline',
};

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { color: colors.text, fontWeight: '700' },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 13, fontWeight: '600' },
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name={TAB_ICONS[route.name]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} options={{ title: 'Mapa TEA', tabBarLabel: 'Início' }} />
      <Tab.Screen name="Locais" component={PlacesStack} options={{ title: 'Locais', headerShown: false }} />
      <Tab.Screen name="Sobre" component={AboutScreen} options={{ title: 'Sobre o projeto', tabBarLabel: 'Sobre' }} />
    </Tab.Navigator>
  );
}
