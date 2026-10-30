export type ResourceId =
  | 'areaSilenciosa'
  | 'estacionamento'
  | 'atendimentoPrioritario'
  | 'iluminacaoSuave'
  | 'abafadores'
  | 'equipeTreinada';

export type Category = 'Alimentação' | 'Comércio' | 'Educação' | 'Lazer' | 'Saúde' | 'Outro';

export interface Place {
  id: string;
  name: string;
  address: string;
  category: Category;
  resources: ResourceId[];
  benefits: string;
  createdAt: string;
  updatedAt: string;
}

export type PlaceInput = Omit<Place, 'id' | 'createdAt' | 'updatedAt'>;
