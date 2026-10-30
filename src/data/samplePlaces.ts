import type { Place } from '@/types/place';

const now = new Date().toISOString();

// Dados fictícios carregados apenas no primeiro acesso, para o app não abrir vazio.
export const SAMPLE_PLACES: Place[] = [
  {
    id: 'exemplo-1',
    name: 'Biblioteca Municipal (exemplo)',
    address: 'Rua das Flores, 100 – Centro',
    category: 'Educação',
    resources: ['areaSilenciosa', 'iluminacaoSuave', 'equipeTreinada'],
    benefits: 'Sala de leitura silenciosa reservada mediante solicitação na recepção.',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'exemplo-2',
    name: 'Supermercado Bom Preço (exemplo)',
    address: 'Av. Principal, 450 – Bairro Novo',
    category: 'Comércio',
    resources: ['estacionamento', 'atendimentoPrioritario'],
    benefits: 'Hora silenciosa às terças, das 14h às 16h, com luzes reduzidas e sem som ambiente.',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'exemplo-3',
    name: 'Cine Centro (exemplo)',
    address: 'Praça Central, 20 – Centro',
    category: 'Lazer',
    resources: ['abafadores', 'iluminacaoSuave', 'atendimentoPrioritario'],
    benefits: 'Sessão azul mensal, com som mais baixo e luzes parcialmente acesas.',
    createdAt: now,
    updatedAt: now,
  },
];
