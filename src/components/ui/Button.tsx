import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  leftIcon,
  rightIcon,
  style,
  ...rest
}: ButtonProps) {
  const theme = useTheme();

  const palette = (() => {
    switch (variant) {
      case 'secondary':
        return {
          bg: theme.colors.surface,
          border: theme.colors.border,
          text: theme.colors.text,
        };
      case 'outline':
        return {
          bg: 'transparent',
          border: theme.colors.primary,
          text: theme.colors.primary,
        };
      case 'ghost':
        return {
          bg: 'transparent',
          border: 'transparent',
          text: theme.colors.primary,
        };
      case 'danger':
        return {
          bg: theme.colors.danger,
          border: theme.colors.danger,
          text: '#ffffff',
        };
      case 'primary':
      default:
        return {
          bg: theme.colors.primary,
          border: theme.colors.primary,
          text: theme.colors.textInverse,
        };
    }
  })();

  const sizing = (() => {
    switch (size) {
      case 'sm':
        return { paddingVertical: 8, paddingHorizontal: 14, fontSize: 13 };
      case 'lg':
        return { paddingVertical: 16, paddingHorizontal: 24, fontSize: 17 };
      case 'md':
      default:
        return { paddingVertical: 12, paddingHorizontal: 18, fontSize: 15 };
    }
  })();

  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...rest}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: palette.bg,
          borderColor: palette.border,
          borderRadius: theme.radius.md,
          paddingVertical: sizing.paddingVertical,
          paddingHorizontal: sizing.paddingHorizontal,
          alignSelf: fullWidth ? 'stretch' : 'auto',
          opacity: isDisabled ? 0.6 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.text} />
      ) : (
        <View style={styles.row}>
          {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
          <Text
            style={{
              color: palette.text,
              fontSize: sizing.fontSize,
              fontWeight: '600',
            }}
          >
            {title}
          </Text>
          {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    minHeight: 44,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
