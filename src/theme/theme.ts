export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  text: string;
  textMuted: string;
  textInverse: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  overlay: string;

  difficultyEasyBg: string;
  difficultyEasyText: string;
  difficultyModerateBg: string;
  difficultyModerateText: string;
  difficultyHardBg: string;
  difficultyHardText: string;
  difficultyExpertBg: string;
  difficultyExpertText: string;

  crowdLowBg: string;
  crowdLowText: string;
  crowdModerateBg: string;
  crowdModerateText: string;
  crowdHighBg: string;
  crowdHighText: string;

  tabBarBackground: string;
  tabBarActive: string;
  tabBarInactive: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: (n: number) => number;
  radius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  typography: {
    h1: number;
    h2: number;
    h3: number;
    body: number;
    small: number;
    tiny: number;
  };
}

const baseSpacing = (n: number) => n * 4;

const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 999,
};

const typography = {
  h1: 30,
  h2: 22,
  h3: 18,
  body: 15,
  small: 13,
  tiny: 11,
};

export const lightTheme: Theme = {
  mode: 'light',
  spacing: baseSpacing,
  radius,
  typography,
  colors: {
    background: '#f7f5f0',
    surface: '#ffffff',
    surfaceElevated: '#ffffff',
    border: '#e2dccf',
    text: '#1f2a23',
    textMuted: '#5b6b60',
    textInverse: '#ffffff',
    primary: '#2f5d3a',
    primaryDark: '#1f4128',
    primaryLight: '#8bbf95',
    accent: '#d4a256',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    overlay: 'rgba(0,0,0,0.45)',

    difficultyEasyBg: '#d1fae5',
    difficultyEasyText: '#065f46',
    difficultyModerateBg: '#fef3c7',
    difficultyModerateText: '#92400e',
    difficultyHardBg: '#ffedd5',
    difficultyHardText: '#9a3412',
    difficultyExpertBg: '#fee2e2',
    difficultyExpertText: '#991b1b',

    crowdLowBg: '#dbeafe',
    crowdLowText: '#1e40af',
    crowdModerateBg: '#fef3c7',
    crowdModerateText: '#92400e',
    crowdHighBg: '#fee2e2',
    crowdHighText: '#9f1239',

    tabBarBackground: '#ffffff',
    tabBarActive: '#2f5d3a',
    tabBarInactive: '#8a8a8a',
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  spacing: baseSpacing,
  radius,
  typography,
  colors: {
    background: '#0d1611',
    surface: '#16221b',
    surfaceElevated: '#1d2c24',
    border: '#2a3a31',
    text: '#f4f1ea',
    textMuted: '#a3b2a8',
    textInverse: '#0d1611',
    primary: '#8bbf95',
    primaryDark: '#5e9a6c',
    primaryLight: '#c3e0c8',
    accent: '#e2b673',
    success: '#34d399',
    warning: '#fbbf24',
    danger: '#f87171',
    overlay: 'rgba(0,0,0,0.6)',

    difficultyEasyBg: 'rgba(16,185,129,0.18)',
    difficultyEasyText: '#6ee7b7',
    difficultyModerateBg: 'rgba(245,158,11,0.18)',
    difficultyModerateText: '#fbbf24',
    difficultyHardBg: 'rgba(249,115,22,0.18)',
    difficultyHardText: '#fdba74',
    difficultyExpertBg: 'rgba(239,68,68,0.18)',
    difficultyExpertText: '#fca5a5',

    crowdLowBg: 'rgba(59,130,246,0.18)',
    crowdLowText: '#93c5fd',
    crowdModerateBg: 'rgba(245,158,11,0.18)',
    crowdModerateText: '#fbbf24',
    crowdHighBg: 'rgba(244,63,94,0.18)',
    crowdHighText: '#fda4af',

    tabBarBackground: '#16221b',
    tabBarActive: '#8bbf95',
    tabBarInactive: '#6f7e74',
  },
};

export function getTheme(mode: ThemeMode): Theme {
  return mode === 'dark' ? darkTheme : lightTheme;
}
