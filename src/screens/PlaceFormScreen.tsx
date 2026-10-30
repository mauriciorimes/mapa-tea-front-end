import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Chip from '@/components/Chip';
import ConfirmDialog from '@/components/ConfirmDialog';
import TextField from '@/components/TextField';
import { usePlaces } from '@/contexts/PlacesContext';
import { CATEGORIES, RESOURCES } from '@/data/resources';
import type { PlacesStackParamList } from '@/navigation/types';
import { colors, radius, spacing } from '@/theme';
import type { Category, ResourceId } from '@/types/place';

type Props = NativeStackScreenProps<PlacesStackParamList, 'FormLocal'>;

interface FormErrors {
  name?: string;
  address?: string;
}

export default function PlaceFormScreen({ navigation, route }: Props) {
  const id = route.params?.id;
  const { getPlace, addPlace, updatePlace, removePlace } = usePlaces();
  const existing = id ? getPlace(id) : undefined;

  const [name, setName] = useState(existing?.name ?? '');
  const [address, setAddress] = useState(existing?.address ?? '');
  const [category, setCategory] = useState<Category>(existing?.category ?? 'Outro');
  const [resources, setResources] = useState<ResourceId[]>(existing?.resources ?? []);
  const [benefits, setBenefits] = useState(existing?.benefits ?? '');
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmVisible, setConfirmVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: id ? 'Editar local' : 'Novo local' });
  }, [navigation, id]);

  if (id && !existing) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Este local não foi encontrado.</Text>
        <Button label="Voltar para a lista" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  function toggleResource(resourceId: ResourceId) {
    setResources((current) =>
      current.includes(resourceId) ? current.filter((item) => item !== resourceId) : [...current, resourceId],
    );
  }

  function handleSave() {
    const nextErrors: FormErrors = {};
    if (name.trim().length < 3) nextErrors.name = 'Informe o nome do local (mínimo de 3 letras).';
    if (address.trim().length < 5) nextErrors.address = 'Informe o endereço do local.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const input = { name: name.trim(), address: address.trim(), category, resources, benefits: benefits.trim() };
    if (id) {
      updatePlace(id, input);
    } else {
      addPlace(input);
    }
    navigation.goBack();
  }

  function handleDelete() {
    setConfirmVisible(false);
    navigation.goBack();
    if (id) removePlace(id);
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Nome do local *</Text>
            <TextField
              value={name}
              onChangeText={setName}
              placeholder="Ex.: Biblioteca Municipal"
              accessibilityLabel="Nome do local"
              hasError={!!errors.name}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Endereço *</Text>
            <TextField
              value={address}
              onChangeText={setAddress}
              placeholder="Rua, número – bairro"
              accessibilityLabel="Endereço"
              hasError={!!errors.address}
            />
            {errors.address && <Text style={styles.error}>{errors.address}</Text>}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Categoria</Text>
            <View style={styles.chips} accessibilityRole="radiogroup">
              {CATEGORIES.map((item) => (
                <Chip key={item} label={item} selected={category === item} onPress={() => setCategory(item)} />
              ))}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Recursos de acessibilidade</Text>
            <Text style={styles.hint}>Marque o que o local oferece.</Text>
            <View style={styles.chips}>
              {RESOURCES.map((resource) => (
                <Chip
                  key={resource.id}
                  label={resource.label}
                  icon={resource.icon}
                  selected={resources.includes(resource.id)}
                  onPress={() => toggleResource(resource.id)}
                />
              ))}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Benefícios</Text>
            <TextField
              value={benefits}
              onChangeText={setBenefits}
              placeholder="Ex.: hora silenciosa, desconto, sessão adaptada..."
              accessibilityLabel="Benefícios"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.textArea}
            />
          </View>

          <View style={styles.actions}>
            <Button label="Salvar" icon="content-save-outline" onPress={handleSave} />
            <Button label="Cancelar" variant="outline" onPress={() => navigation.goBack()} />
            {id && (
              <Button label="Excluir local" icon="trash-can-outline" variant="danger" onPress={() => setConfirmVisible(true)} />
            )}
          </View>
        </View>
      </ScrollView>

      <ConfirmDialog
        visible={confirmVisible}
        title="Excluir local"
        message={`Deseja excluir "${existing?.name ?? ''}"? Essa ação não pode ser desfeita.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmVisible(false)}
      />
    </KeyboardAvoidingView>
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
  form: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    gap: spacing.xl,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  hint: {
    fontSize: 13,
    color: colors.textMuted,
  },
  textArea: {
    minHeight: 110,
    paddingTop: spacing.md,
  },
  error: {
    fontSize: 13,
    color: colors.danger,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  actions: {
    gap: spacing.sm,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  notFoundText: {
    fontSize: 16,
    color: colors.text,
  },
});
