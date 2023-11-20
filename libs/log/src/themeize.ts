import { colorize } from '@lskjs/colors';

import { randomColors, theme, themeLight } from './config.js';
import { ThemeKey } from './types.js';
import hashCode from './utils/hashCode.js';

export function themeizeRandom(str: string, randomName?: string | number | null): string {
  const colors = randomColors[hashCode(randomName || '') % randomColors.length] || [];
  return colorize(str, colors);
}

export function themeize(str: string, themeKey?: ThemeKey | null): string {
  const colors = themeKey ? theme[themeKey] : [];
  return colorize(str, colors);
}
export function themeizeLight(str: string, themeKey?: ThemeKey | null): string {
  const colors = themeKey ? themeLight[themeKey] : [];
  return colorize(str, colors);
}
