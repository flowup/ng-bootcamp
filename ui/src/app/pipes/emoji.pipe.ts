import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emoji',
})
export class EmojiPipe implements PipeTransform {
  transform(text: string): string {
    return text
      .replace(/:-?\)/g, '\uD83D\uDE42')
      .replace(/:-?D/g, '\uD83D\uDE04')
      .replace(/;-?\)/g, '\uD83D\uDE09')
      .replace(/XD/g, '\uD83D\uDE06')
      .replace(/:-?\*/g, '\uD83D\uDE18')
      .replace(/\^\^/g, '\uD83D\uDE0A')
      .replace(/:-?P/g, '\uD83D\uDE1B')
      .replace(/;-?P/g, '\uD83D\uDE1C')
      .replace(/:-?\|/g, '\uD83D\uDE10')
      .replace(/8-?\)/g, '\uD83D\uDE0E')
      .replace(/:-?\(/g, '\uD83D\uDE1E')
      .replace(/:-?[oO]/g, '\uD83D\uDE2E')
      .replace(/:'-?\(/g, '\uD83D\uDE22')
      .replace(/></g, '\uD83D\uDE16')
      .replace(/\+1/g, '\uD83D\uDC4D')
      .replace(/-1/g, '\uD83D\uDC4E')
      .replace(/<3/g, '\uD83D\uDC93');
  }
}
