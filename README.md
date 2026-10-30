# Mapa TEA — Trabalho Final de Desenvolvimento Front End 1

Trabalho final da disciplina de **Desenvolvimento Front End 1**, da **Pós-graduação em Desenvolvimento Full Stack** do Instituto Federal de Educação, Ciência e Tecnologia do Sudeste de Minas Gerais (IF Sudeste MG). Professor: Robson de Souza.

Aplicação em React Native (Expo + TypeScript), executada na web, que apresenta de forma simplificada o tema do meu TCC, **Mapa TEA**: locais com recursos de acessibilidade e benefícios para pessoas com Transtorno do Espectro Autista.

Autor: Maurício Rimes Vieira

## Requisitos atendidos

| Requisito | Onde |
| --- | --- |
| 3 telas navegáveis | Início, Locais (lista + formulário) e Sobre |
| CRUD completo | Locais: cadastrar, listar/buscar/filtrar, editar e excluir, salvos com **AsyncStorage** |
| Bottom Tabs | `src/navigation/AppTabs.tsx` |
| Tela responsiva | Início, Locais (1, 2 ou 3 colunas conforme a largura) e Sobre |

## Como rodar

Requer Node 26.13.0 (fixado no projeto via Volta e `.nvmrc`).

```bash
npm install
npm run web      # navegador
npm start        # Expo Go no celular
```

## Estrutura

```
src/
  components/   Botões, chips, card de local e diálogo de confirmação
  contexts/     PlacesContext (estado e CRUD dos locais)
  data/         Recursos de acessibilidade, categorias e locais de exemplo
  hooks/        useResponsive (breakpoints)
  navigation/   Bottom Tabs + pilha de Locais
  screens/      Início, Lista de locais, Formulário e Sobre
  services/     Persistência no AsyncStorage
  theme/        Cores, espaçamentos e breakpoints
```
