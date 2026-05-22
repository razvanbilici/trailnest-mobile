import React from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {
  LogOut,
  Moon,
  Sun,
  MonitorSmartphone,
  Mail,
  Heart,
  Map,
  Settings,
  Bell,
} from 'lucide-react-native';
import { useTheme, useThemeContext } from '../../theme/ThemeProvider';
import { useAuthStore } from '../../stores/authStore';
import { useFavoritesStore } from '../../stores/favoritesStore';

export function ProfileScreen() {
  const theme = useTheme();
  const { mode, preference, setPreference } = useThemeContext();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const favTrails = useFavoritesStore((s) => s.trails.length);
  const favGlamping = useFavoritesStore((s) => s.glamping.length);

  const handleLogout = () => {
    Alert.alert('Deconectare', 'Sigur vrei să te deconectezi?', [
      { text: 'Anulează', style: 'cancel' },
      { text: 'Deconectează', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.scroll}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.xl,
          },
        ]}
      >
        <Image
          source={{
            uri:
              user?.avatar ??
              'https://i.pravatar.cc/150?u=trailnest',
          }}
          style={[styles.avatar, { borderColor: theme.colors.primary }]}
        />
        <Text style={[styles.name, { color: theme.colors.text }]}>
          {user?.name ?? 'Drumeț'}
        </Text>
        <View style={styles.emailRow}>
          <Mail size={14} color={theme.colors.textMuted} />
          <Text style={{ color: theme.colors.textMuted, fontSize: 13 }}>
            {user?.email ?? '—'}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <StatBlock
            label="Trasee salvate"
            value={favTrails}
            icon={<Map size={16} color={theme.colors.primary} />}
            color={theme.colors.text}
            muted={theme.colors.textMuted}
          />
          <View
            style={{
              width: 1,
              backgroundColor: theme.colors.border,
              marginHorizontal: 12,
            }}
          />
          <StatBlock
            label="Cazări salvate"
            value={favGlamping}
            icon={<Heart size={16} color={theme.colors.danger} />}
            color={theme.colors.text}
            muted={theme.colors.textMuted}
          />
        </View>
      </View>

      <SectionTitle title="Aparență" />
      <View
        style={[
          styles.group,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.lg,
          },
        ]}
      >
        <Pressable
          onPress={() => setPreference('light')}
          style={[
            styles.row,
            { borderBottomColor: theme.colors.border, borderBottomWidth: 1 },
          ]}
        >
          <View style={styles.rowLabel}>
            <Sun size={18} color={theme.colors.text} />
            <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: '600' }}>
              Mod luminos
            </Text>
          </View>
          <Radio active={preference === 'light'} color={theme.colors.primary} />
        </Pressable>

        <Pressable
          onPress={() => setPreference('dark')}
          style={[
            styles.row,
            { borderBottomColor: theme.colors.border, borderBottomWidth: 1 },
          ]}
        >
          <View style={styles.rowLabel}>
            <Moon size={18} color={theme.colors.text} />
            <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: '600' }}>
              Mod întunecat
            </Text>
          </View>
          <Radio active={preference === 'dark'} color={theme.colors.primary} />
        </Pressable>

        <Pressable
          onPress={() => setPreference('system')}
          style={styles.row}
        >
          <View style={styles.rowLabel}>
            <MonitorSmartphone size={18} color={theme.colors.text} />
            <View>
              <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: '600' }}>
                Sistem
              </Text>
              <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>
                Urmărește setarea telefonului ({mode})
              </Text>
            </View>
          </View>
          <Radio active={preference === 'system'} color={theme.colors.primary} />
        </Pressable>
      </View>

      <SectionTitle title="Preferințe" />
      <View
        style={[
          styles.group,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.lg,
          },
        ]}
      >
        <ToggleRow icon={<Bell size={18} color={theme.colors.text} />} label="Notificări push" />
        <Divider color={theme.colors.border} />
        <ToggleRow icon={<Mail size={18} color={theme.colors.text} />} label="Notificări email" />
        <Divider color={theme.colors.border} />
        <ToggleRow icon={<Settings size={18} color={theme.colors.text} />} label="Alerte meteo" defaultValue />
      </View>

      <View style={{ height: 24 }} />

      <Pressable
        onPress={handleLogout}
        style={[
          styles.logoutBtn,
          {
            borderColor: theme.colors.danger,
            borderRadius: theme.radius.lg,
          },
        ]}
      >
        <LogOut size={18} color={theme.colors.danger} />
        <Text style={{ color: theme.colors.danger, fontWeight: '700' }}>
          Deconectează-te
        </Text>
      </Pressable>

      <Text style={[styles.version, { color: theme.colors.textMuted }]}>
        TrailNest Mobile • v0.1.0
      </Text>
    </ScrollView>
  );
}

function StatBlock({
  label,
  value,
  icon,
  color,
  muted,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  muted: string;
}) {
  return (
    <View style={styles.statBlock}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        {icon}
        <Text style={{ color, fontSize: 20, fontWeight: '800' }}>{value}</Text>
      </View>
      <Text style={{ color: muted, fontSize: 12, marginTop: 2 }}>{label}</Text>
    </View>
  );
}

function Radio({ active, color }: { active: boolean; color: string }) {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {active ? (
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: color,
          }}
        />
      ) : null}
    </View>
  );
}

function SectionTitle({ title }: { title: string }) {
  const theme = useTheme();
  return (
    <Text
      style={{
        color: theme.colors.textMuted,
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginTop: 24,
        marginBottom: 10,
        paddingHorizontal: 4,
      }}
    >
      {title}
    </Text>
  );
}

function ToggleRow({
  icon,
  label,
  defaultValue,
}: {
  icon: React.ReactNode;
  label: string;
  defaultValue?: boolean;
}) {
  const theme = useTheme();
  const [value, setValue] = React.useState<boolean>(defaultValue ?? false);
  return (
    <View style={styles.row}>
      <View style={styles.rowLabel}>
        {icon}
        <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: '600' }}>
          {label}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={setValue}
        trackColor={{ true: theme.colors.primaryLight, false: theme.colors.border }}
        thumbColor={value ? theme.colors.primary : theme.colors.surface}
      />
    </View>
  );
}

function Divider({ color }: { color: string }) {
  return <View style={{ height: 1, backgroundColor: color }} />;
}

const styles = StyleSheet.create({
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  statBlock: {
    flex: 1,
    alignItems: 'center',
  },
  group: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    paddingVertical: 14,
  },
  version: {
    textAlign: 'center',
    fontSize: 11,
    marginTop: 18,
  },
});
