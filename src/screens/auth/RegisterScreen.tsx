import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ArrowLeft, Mail, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuthStore } from '../../stores/authStore';
import type { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const theme = useTheme();
  const register = useAuthStore((s) => s.register);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);
    if (password !== confirm) {
      setError('Parolele nu coincid.');
      return;
    }
    setLoading(true);
    try {
      await register({ name, email, password });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'A apărut o eroare.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={8}
              style={[
                styles.backBtn,
                {
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.surface,
                  borderRadius: theme.radius.full,
                },
              ]}
            >
              <ArrowLeft size={20} color={theme.colors.text} />
            </Pressable>
            <View style={{ flex: 1 }} />
          </View>

          <View style={styles.body}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              Creează cont
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
              Alătură-te comunității TrailNest în câteva secunde.
            </Text>

            <View style={{ height: 24 }} />

            <Input
              label="Nume complet"
              value={name}
              onChangeText={setName}
              placeholder="Andrei Popescu"
              autoCapitalize="words"
              leftIcon={<UserIcon size={18} color={theme.colors.textMuted} />}
            />

            <View style={{ height: 14 }} />

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="andrei@email.ro"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              leftIcon={<Mail size={18} color={theme.colors.textMuted} />}
            />

            <View style={{ height: 14 }} />

            <Input
              label="Parolă"
              value={password}
              onChangeText={setPassword}
              placeholder="Minim 6 caractere"
              secureTextEntry={!showPassword}
              autoComplete="new-password"
              leftIcon={<Lock size={18} color={theme.colors.textMuted} />}
              rightIcon={
                <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={6}>
                  {showPassword ? (
                    <EyeOff size={18} color={theme.colors.textMuted} />
                  ) : (
                    <Eye size={18} color={theme.colors.textMuted} />
                  )}
                </Pressable>
              }
            />

            <View style={{ height: 14 }} />

            <Input
              label="Confirmă parola"
              value={confirm}
              onChangeText={setConfirm}
              placeholder="Repetă parola"
              secureTextEntry={!showPassword}
              leftIcon={<Lock size={18} color={theme.colors.textMuted} />}
            />

            {error ? (
              <Text style={[styles.error, { color: theme.colors.danger }]}>
                {error}
              </Text>
            ) : null}

            <View style={{ height: 22 }} />

            <Button
              title="Creează cont"
              fullWidth
              loading={loading}
              onPress={onSubmit}
            />

            <View style={styles.footerRow}>
              <Text style={{ color: theme.colors.textMuted, fontSize: 13 }}>
                Ai deja cont?
              </Text>
              <Pressable onPress={() => navigation.navigate('Login')} hitSlop={6}>
                <Text
                  style={{ color: theme.colors.primary, fontSize: 13, fontWeight: '700' }}
                >
                  Autentifică-te
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, paddingBottom: 30 },
  header: {
    flexDirection: 'row',
    padding: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  body: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
  },
  error: {
    marginTop: 12,
    fontSize: 13,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
  },
});
