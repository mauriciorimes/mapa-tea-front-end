import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { PlacesStackParamList } from '@/navigation/types';
import PlaceFormScreen from '@/screens/PlaceFormScreen';
import PlacesListScreen from '@/screens/PlacesListScreen';
import { colors } from '@/theme';

const Stack = createNativeStackNavigator<PlacesStackParamList>();

export default function PlacesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.primary,
        headerTitleStyle: { color: colors.text, fontWeight: '700' },
      }}
    >
      <Stack.Screen name="ListaLocais" component={PlacesListScreen} options={{ title: 'Locais acessíveis' }} />
      <Stack.Screen name="FormLocal" component={PlaceFormScreen} options={{ title: 'Novo local' }} />
    </Stack.Navigator>
  );
}
