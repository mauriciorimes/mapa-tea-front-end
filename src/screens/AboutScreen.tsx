import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Chip from '@/components/Chip';
import SectionTitle from '@/components/SectionTitle';
import { RESOURCES } from '@/data/resources';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, layout, radius, spacing } from '@/theme';

const TECHNOLOGIES = ['React Native', 'Expo', 'TypeScript', 'React Navigation (Bottom Tabs)', 'AsyncStorage'];

export default function AboutScreen() {
  const { isWide } = useResponsive();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.container}>
        <SectionTitle>O que é o TEA</SectionTitle>
        <View style={styles.card}>
          <Text style={styles.paragraph}>
            O Transtorno do Espectro Autista (TEA) é uma condição do neurodesenvolvimento que influencia a comunicação, a
            interação social e o processamento sensorial.
          </Text>
          <Text style={styles.paragraph}>
            Muitas pessoas com TEA têm hipersensibilidade a sons, luzes e aglomerações. Por isso, conhecer antes os
            recursos de um local faz diferença para decidir se é possível frequentá-lo com conforto.
          </Text>
        </View>

        <SectionTitle>Recursos considerados</SectionTitle>
        <View style={[styles.resources, isWide && styles.resourcesWide]}>
          {RESOURCES.map((resource) => (
            <View key={resource.id} style={[styles.resource, isWide && styles.resourceWide]}>
              <View style={styles.resourceIcon}>
                <MaterialCommunityIcons name={resource.icon} size={24} color={colors.primary} />
              </View>
              <View style={styles.resourceText}>
                <Text style={styles.resourceTitle}>{resource.label}</Text>
                <Text style={styles.resourceDescription}>{resource.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <SectionTitle>Sobre este trabalho</SectionTitle>
        <View style={styles.card}>
          <Text style={styles.paragraph}>
            Aplicação desenvolvida como trabalho final da disciplina de Desenvolvimento Front End 1, da Pós-graduação em
            Desenvolvimento Full Stack do IF Sudeste MG.
          </Text>
          <Text style={styles.paragraph}>
            O tema apresenta a ideia do TCC “Mapa TEA” em uma versão simplificada: sem mapa e sem servidor, com os locais
            salvos no próprio dispositivo.
          </Text>
          <Text style={styles.author}>Autor: Maurício Rimes Vieira</Text>
          <View style={styles.technologies}>
            {TECHNOLOGIES.map((technology) => (
              <Chip key={technology} label={technology} small />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingTop: 0,
    paddingBottom: spacing.xxl,
  },
  container: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.text,
  },
  author: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  technologies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  resources: {
    gap: spacing.md,
  },
  resourcesWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resource: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  resourceWide: {
    width: '48.5%',
    flexGrow: 1,
  },
  resourceIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceText: {
    flex: 1,
    gap: spacing.xs,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  resourceDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
  },
});
