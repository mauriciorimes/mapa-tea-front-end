import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import SectionTitle from '@/components/SectionTitle';
import { usePlaces } from '@/contexts/PlacesContext';
import { RESOURCES } from '@/data/resources';
import { useResponsive } from '@/hooks/useResponsive';
import type { TabParamList } from '@/navigation/types';
import { colors, layout, radius, spacing } from '@/theme';
import type { IconName } from '@/types/icon';

type Props = BottomTabScreenProps<TabParamList, 'Inicio'>;

const TOPICS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'puzzle-outline',
    title: 'O problema',
    text: 'Saber se um lugar tem área silenciosa, vaga reservada ou benefícios para pessoas com TEA depende de indicações informais e dispersas.',
  },
  {
    icon: 'map-search-outline',
    title: 'A proposta',
    text: 'Reunir em um só lugar os estabelecimentos descritos pelos recursos do próprio ambiente, e não apenas pelo ramo de serviço.',
  },
  {
    icon: 'account-group-outline',
    title: 'Colaboração',
    text: 'Qualquer pessoa pode cadastrar e atualizar locais, ajudando famílias a planejar saídas com mais segurança.',
  },
];

export default function HomeScreen({ navigation }: Props) {
  const { places } = usePlaces();
  const { isWide } = useResponsive();

  const stats = [
    { value: '2,4 mi', label: 'pessoas com TEA no Brasil (Censo 2022)' },
    { value: String(places.length), label: places.length === 1 ? 'local cadastrado' : 'locais cadastrados' },
    { value: String(RESOURCES.length), label: 'recursos de acessibilidade' },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.container}>
        <View style={[styles.hero, isWide && styles.heroWide]}>
          <View style={styles.heroIcon}>
            <MaterialCommunityIcons name="map-marker-radius" size={isWide ? 56 : 44} color={colors.white} />
          </View>
          <View style={styles.heroText}>
            <Text style={styles.eyebrow}>Apresentação do tema do TCC</Text>
            <Text style={[styles.title, isWide && styles.titleWide]} accessibilityRole="header">
              Mapa TEA
            </Text>
            <Text style={styles.subtitle}>
              Locais com recursos de acessibilidade e benefícios para pessoas com Transtorno do Espectro Autista.
            </Text>
          </View>
        </View>

        <View style={styles.stats}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.stat}>
              <Text style={[styles.statValue, isWide && styles.statValueWide]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <SectionTitle>Por que este projeto?</SectionTitle>
        <View style={[styles.topics, isWide && styles.topicsWide]}>
          {TOPICS.map((topic) => (
            <View key={topic.title} style={[styles.topic, isWide && styles.topicWide]}>
              <View style={styles.topicIcon}>
                <MaterialCommunityIcons name={topic.icon} size={26} color={colors.primary} />
              </View>
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicText}>{topic.text}</Text>
            </View>
          ))}
        </View>

        <SectionTitle>Comece por aqui</SectionTitle>
        <View style={[styles.actions, isWide && styles.actionsWide]}>
          <Button
            label="Ver locais"
            icon="map-marker-multiple-outline"
            onPress={() => navigation.navigate('Locais', { screen: 'ListaLocais' })}
            style={isWide && styles.actionWide}
          />
          <Button
            label="Cadastrar local"
            icon="plus"
            variant="secondary"
            onPress={() => navigation.navigate('Locais', { screen: 'FormLocal', initial: false })}
            style={isWide && styles.actionWide}
          />
          <Button
            label="Saiba mais"
            icon="information-outline"
            variant="outline"
            onPress={() => navigation.navigate('Sobre')}
            style={isWide && styles.actionWide}
          />
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
    paddingBottom: spacing.xxl,
  },
  container: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
  },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  heroWide: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xxl,
    gap: spacing.xl,
  },
  heroIcon: {
    width: 88,
    height: 88,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    flex: 1,
    gap: spacing.sm,
  },
  eyebrow: {
    color: colors.primarySoft,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '800',
  },
  titleWide: {
    fontSize: 42,
  },
  subtitle: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  stat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },
  statValueWide: {
    fontSize: 30,
  },
  statLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted,
  },
  topics: {
    gap: spacing.md,
  },
  topicsWide: {
    flexDirection: 'row',
  },
  topic: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  topicWide: {
    flex: 1,
  },
  topicIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  topicText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
  },
  actions: {
    gap: spacing.sm,
  },
  actionsWide: {
    flexDirection: 'row',
  },
  actionWide: {
    flex: 1,
  },
});
