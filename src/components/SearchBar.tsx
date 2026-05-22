import React from 'react';
import { Search, X } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { Input } from './ui/Input';
import { useTheme } from '../theme/ThemeProvider';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  const theme = useTheme();
  return (
    <View>
      <Input
        value={value}
        onChangeText={onChange}
        placeholder={placeholder ?? 'Caută trasee, regiuni…'}
        leftIcon={<Search size={18} color={theme.colors.textMuted} />}
        rightIcon={
          value.length > 0 ? (
            <Pressable onPress={() => onChange('')} hitSlop={8}>
              <X size={16} color={theme.colors.textMuted} />
            </Pressable>
          ) : null
        }
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
      />
    </View>
  );
}
