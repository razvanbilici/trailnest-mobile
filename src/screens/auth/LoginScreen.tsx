import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Mail, Lock, Eye, EyeOff, Mountain } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useTheme, useThemeContext } from '../../theme/ThemeProvider';
import { useAuthStore } from '../../stores/authStore';
import type { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const theme = useTheme();
  const { mode, toggle } = useThemeContext();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
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
          <View style={styles.heroWrap}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
              }}
              style={styles.hero}
            />
            <View
              style={[
                styles.heroOverlay,
                { backgroundColor: theme.mode === 'dark' ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.35)' },
              ]}
            />
            <View style={styles.heroContent}>
              <View
                style={[
                  styles.logoBadge,
                  {
                    backgroundColor: 'rgba(255,255,255,0.18)',
                    borderRadius: theme.radius.full,
                  },
                ]}
              >
                <Mountain size={22} color="#ffffff" />
              </View>
              <Text style={styles.brand}>TrailNest</Text>
              <Text style={styles.tagline}>Aventura ta în natură începe aici</Text>
            </View>
          </View>

          <View style={styles.form}>
            <View style={styles.formHead}>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                Bine ai revenit
              </Text>
              <Pressable onPress={toggle} hitSlop={6}>
                <Text
                  style={[
                    styles.toggleText,
                    { color: theme.colors.primary, borderColor: theme.colors.primary },
                  ]}
                >
                  {mode === 'dark' ? 'Mod luminos' : 'Mod întunecat'}
                </Text>
              </Pressable>
            </View>

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
              placeholder="••••••••"
              secureTextEntry={!showPassword}
              autoComplete="password"
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

            {error ? (
              <Text style={[styles.error, { color: theme.colors.danger }]}>
                {error}
              </Text>
            ) : null}

            <View style={{ height: 18 }} />

            <Button
              title="Autentifică-te"
              fullWidth
              loading={loading}
              onPress={onSubmit}
            />

            <View style={styles.footerRow}>
              <Text style={{ color: theme.colors.textMuted, fontSize: 13 }}>
                Nu ai cont încă?
              </Text>
              <Pressable onPress={() => navigation.navigate('Register')} hitSlop={6}>
                <Text
                  style={{ color: theme.colors.primary, fontSize: 13, fontWeight: '700' }}
                >
                  Înregistrează-te
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
  scroll: { flexGrow: 1 },
  heroWrap: {
    height: 260,
    position: 'relative',
  },
  hero: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoBadge: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  brand: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tagline: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginTop: 6,
  },
  form: {
    padding: 24,
  },
  formHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 999,
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
