import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { SAMPLE_PLACES } from '@/data/samplePlaces';
import { loadPlaces, savePlaces } from '@/services/placesStorage';
import type { Place, PlaceInput } from '@/types/place';
import { createId } from '@/utils/text';

interface PlacesContextValue {
  places: Place[];
  loading: boolean;
  getPlace: (id: string) => Place | undefined;
  addPlace: (input: PlaceInput) => void;
  updatePlace: (id: string, input: PlaceInput) => void;
  removePlace: (id: string) => void;
}

const PlacesContext = createContext<PlacesContextValue | null>(null);

export function PlacesProvider({ children }: { children: ReactNode }) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlaces()
      .then((stored) => setPlaces(stored ?? SAMPLE_PLACES))
      .catch(() => setPlaces(SAMPLE_PLACES))
      .finally(() => setLoading(false));
  }, []);

  // Persiste qualquer alteração no AsyncStorage depois do carregamento inicial.
  useEffect(() => {
    if (loading) return;
    savePlaces(places).catch((error) => console.warn('Falha ao salvar locais', error));
  }, [places, loading]);

  const getPlace = useCallback((id: string) => places.find((place) => place.id === id), [places]);

  const addPlace = useCallback((input: PlaceInput) => {
    const now = new Date().toISOString();
    setPlaces((current) => [{ ...input, id: createId(), createdAt: now, updatedAt: now }, ...current]);
  }, []);

  const updatePlace = useCallback((id: string, input: PlaceInput) => {
    const now = new Date().toISOString();
    setPlaces((current) =>
      current.map((place) => (place.id === id ? { ...place, ...input, updatedAt: now } : place)),
    );
  }, []);

  const removePlace = useCallback((id: string) => {
    setPlaces((current) => current.filter((place) => place.id !== id));
  }, []);

  const value = useMemo(
    () => ({ places, loading, getPlace, addPlace, updatePlace, removePlace }),
    [places, loading, getPlace, addPlace, updatePlace, removePlace],
  );

  return <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>;
}

export function usePlaces(): PlacesContextValue {
  const context = useContext(PlacesContext);
  if (!context) {
    throw new Error('usePlaces deve ser usado dentro de PlacesProvider');
  }
  return context;
}
