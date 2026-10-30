import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Place } from '@/types/place';

const STORAGE_KEY = '@mapa-tea/places';

export async function loadPlaces(): Promise<Place[] | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Place[]) : null;
}

export async function savePlaces(places: Place[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(places));
}
