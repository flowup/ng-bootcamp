import { Pipe, PipeTransform } from '@angular/core';

interface Replacement {
  pattern: RegExp;
  emoji: string;
}

@Pipe({
  name: 'emoji',
})
export class EmojiPipe implements PipeTransform {
  transform(text: string): string {
    /* implementation for more advanced */

    const replacements: Replacement[] = [
      { pattern: /:-?\)/g, emoji: '\uD83D\uDE42' },
      { pattern: /:-?D/g, emoji: '\uD83D\uDE04' },
      { pattern: /;-?\)/g, emoji: '\uD83D\uDE09' },
      { pattern: /XD/g, emoji: '\uD83D\uDE06' },
      { pattern: /:-?\*/g, emoji: '\uD83D\uDE18' },
      { pattern: /\^\^/g, emoji: '\uD83D\uDE0A' },
      { pattern: /:-?P/g, emoji: '\uD83D\uDE1B' },
      { pattern: /;-?P/g, emoji: '\uD83D\uDE1C' },
      { pattern: /:-?\|/g, emoji: '\uD83D\uDE10' },
      { pattern: /8-?\)/g, emoji: '\uD83D\uDE0E' },
      { pattern: /:-?\(/g, emoji: '\uD83D\uDE1E' },
      { pattern: /:-?[oO]/g, emoji: '\uD83D\uDE2E' },
      { pattern: /:'-?\(/g, emoji: '\uD83D\uDE22' },
      { pattern: /></g, emoji: '\uD83D\uDE16' },
      { pattern: /\+1/g, emoji: '\uD83D\uDC4D' },
      { pattern: /-1/g, emoji: '\uD83D\uDC4E' },
      { pattern: /<3/g, emoji: '\uD83D\uDC93' },
    ];
    return replacements.reduce(
      (acc, { pattern, emoji }) => acc.replace(pattern, emoji),
      text,
    );

    /* implementation for less advanced */

    // return text
    //   .replace(/:-?\)/g, '\uD83D\uDE42')
    //   .replace(/:-?D/g, '\uD83D\uDE04')
    //   .replace(/;-?\)/g, '\uD83D\uDE09')
    //   .replace(/XD/g, '\uD83D\uDE06')
    //   .replace(/:-?\*/g, '\uD83D\uDE18')
    //   .replace(/\^\^/g, '\uD83D\uDE0A')
    //   .replace(/:-?P/g, '\uD83D\uDE1B')
    //   .replace(/;-?P/g, '\uD83D\uDE1C')
    //   .replace(/:-?\|/g, '\uD83D\uDE10')
    //   .replace(/8-?\)/g, '\uD83D\uDE0E')
    //   .replace(/:-?\(/g, '\uD83D\uDE1E')
    //   .replace(/:-?[oO]/g, '\uD83D\uDE2E')
    //   .replace(/:'-?\(/g, '\uD83D\uDE22')
    //   .replace(/></g, '\uD83D\uDE16')
    //   .replace(/\+1/g, '\uD83D\uDC4D')
    //   .replace(/-1/g, '\uD83D\uDC4E')
    //   .replace(/<3/g, '\uD83D\uDC93');
  }
}
