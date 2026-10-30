import type { NavigatorScreenParams } from '@react-navigation/native';

export type PlacesStackParamList = {
  ListaLocais: undefined;
  FormLocal: { id?: string } | undefined;
};

export type TabParamList = {
  Inicio: undefined;
  Locais: NavigatorScreenParams<PlacesStackParamList>;
  Sobre: undefined;
};
