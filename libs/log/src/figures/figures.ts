// import figures from 'figures';

// export const cross = figures.cross;
// export const tick = figures.tick;
// export const info = figures.info;
// export const warning = figures.warning;
// export const pointer = figures.pointer;
// export const pointerSmall = figures.pointerSmall;
// export const question = figures.question;
// export const exclamation = figures.exclamation;
// export const bullet = figures.bullet;
// export const line = figures.line;

import { isUnicodeSupported } from './is-unicode-supported.js';

const is = isUnicodeSupported();

// export const cross  = shouldUseMain ? '✖' : '×';
export const tick = is ? '✔' : '×';
export const info = is ? 'ℹ' : '×';
export const warning = is ? '⚠' : '×';
export const cross = is ? '✘' : '×';
export const cross2 = is ? '✖' : '×';
export const lineCross = is ? '╳' : '×';
export const pointer = is ? '❯' : '>';
export const pointerSmall = is ? '›' : '>';
export const heart = is ? '♥' : '₀';
export const musicNote = is ? '♪' : '₁';
export const musicNoteBeamed = is ? '♫' : '₂';
export const star = is ? '★' : '₃';
export const play = is ? '▶' : '₄';
export const nodejs = is ? '⬢' : '₅';
export const lozenge = is ? '◆' : '₆';
export const lozengeOutline = is ? '◇' : '₇';
export const mustache = is ? '෴' : '₈';
