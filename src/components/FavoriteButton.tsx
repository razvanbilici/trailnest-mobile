import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeProvider';

interface FavoriteButtonProps {
  active: boolean;
  onToggle: () => void;
  size?: number;
  variant?: 'overlay' | 'inline';
}

export function FavoriteButton({
  active,
  onToggle,
  size = 22,
  variant = 'overlay',
}: FavoriteButtonProps) {
  const theme = useTheme();

  const bg =
    variant === 'overlay'
      ? 'rgba(255,255,255,0.85)'
      : theme.colors.surfaceElevated;

  return (
    <Pressable
      onPress={onToggle}
      hitSlop={8}
      style={({ pressed }) => [
        styles.btn,
        {
          backgroundColor: bg,
          borderRadius: theme.radius.full,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <Heart
        size={size}
        color={active ? theme.colors.danger : theme.colors.text}
        fill={active ? theme.colors.danger : 'transparent'}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
