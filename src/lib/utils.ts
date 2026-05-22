import type { CrowdLevel, Difficulty } from '../types';
import type { ThemeColors } from '../theme/theme';

export function formatPrice(price: number): string {
  return `${price.toLocaleString('ro-RO')} RON`;
}

export function difficultyLabel(difficulty: Difficulty): string {
  const map: Record<Difficulty, string> = {
    easy: 'Ușor',
    moderate: 'Mediu',
    hard: 'Dificil',
    expert: 'Expert',
  };
  return map[difficulty];
}

export function crowdLevelLabel(level: CrowdLevel): string {
  const map: Record<CrowdLevel, string> = {
    low: 'Scăzut',
    moderate: 'Mediu',
    high: 'Ridicat',
  };
  return map[level];
}

export function difficultyColors(
  difficulty: Difficulty,
  colors: ThemeColors,
): { bg: string; text: string } {
  switch (difficulty) {
    case 'easy':
      return { bg: colors.difficultyEasyBg, text: colors.difficultyEasyText };
    case 'moderate':
      return { bg: colors.difficultyModerateBg, text: colors.difficultyModerateText };
    case 'hard':
      return { bg: colors.difficultyHardBg, text: colors.difficultyHardText };
    case 'expert':
      return { bg: colors.difficultyExpertBg, text: colors.difficultyExpertText };
  }
}

export function crowdLevelColors(
  level: CrowdLevel,
  colors: ThemeColors,
): { bg: string; text: string } {
  switch (level) {
    case 'low':
      return { bg: colors.crowdLowBg, text: colors.crowdLowText };
    case 'moderate':
      return { bg: colors.crowdModerateBg, text: colors.crowdModerateText };
    case 'high':
      return { bg: colors.crowdHighBg, text: colors.crowdHighText };
  }
}

export function pluralize(count: number, one: string, many: string) {
  return `${count} ${count === 1 ? one : many}`;
}
