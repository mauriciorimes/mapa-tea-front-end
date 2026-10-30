import type { IconName } from '@/types/icon';
import type { Category, ResourceId } from '@/types/place';

export interface Resource {
  id: ResourceId;
  label: string;
  description: string;
  icon: IconName;
}

export const RESOURCES: Resource[] = [
  {
    id: 'areaSilenciosa',
    label: 'Área silenciosa',
    description: 'Espaço reservado com pouco ruído para pausas e regulação sensorial.',
    icon: 'volume-off',
  },
  {
    id: 'estacionamento',
    label: 'Vaga reservada',
    description: 'Estacionamento próximo à entrada, reservado a pessoas com TEA.',
    icon: 'car',
  },
  {
    id: 'atendimentoPrioritario',
    label: 'Atendimento prioritário',
    description: 'Fila ou atendimento preferencial, evitando longos tempos de espera.',
    icon: 'account-clock',
  },
  {
    id: 'iluminacaoSuave',
    label: 'Iluminação suave',
    description: 'Ambiente sem luzes fortes ou piscantes, com iluminação controlada.',
    icon: 'lightbulb-on-outline',
  },
  {
    id: 'abafadores',
    label: 'Abafadores de ruído',
    description: 'Protetores auriculares disponíveis para empréstimo no local.',
    icon: 'headphones',
  },
  {
    id: 'equipeTreinada',
    label: 'Equipe capacitada',
    description: 'Funcionários orientados para acolher pessoas com TEA e suas famílias.',
    icon: 'account-heart',
  },
];

export const CATEGORIES: Category[] = ['Alimentação', 'Comércio', 'Educação', 'Lazer', 'Saúde', 'Outro'];

export function getResource(id: ResourceId): Resource | undefined {
  return RESOURCES.find((resource) => resource.id === id);
}
