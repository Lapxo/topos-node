import { of, value } from '@lapxo/topos/capsule';
import { alphabet, byBytes, canonical, fromLine, requirement } from '@lapxo/topos/wire';
import type { Asked } from '@lapxo/topos/capsule';

export const under = (asked: Asked, head: string): readonly (readonly [string, string])[] => asked.lines
  .filter((line) => of(line, 'shape') === asked.shape && (of(line, 'scope') === head || of(line, 'scope').startsWith(`${head}/`)))
  .map((line) => [of(line, 'scope').slice(head.length + (of(line, 'scope') === head ? 0 : 1)), of(line, 'value')] as const)
  .sort((a, b) => (a[0] === '' ? -1 : b[0] === '' ? 1 : byBytes(a[0], b[0])));
const low = (text: string): number | undefined => {
  try {
    const got = fromLine(canonical({ at: 'place:indent', by: 'reader', form: 'interval', measure: 'count', role: 'reads', scope: 'indent', value: text }), null);
    return got.kind === 'fact' && got.value.bound.kind === 'interval' ? got.value.bound.lo ?? undefined : undefined;
  } catch {
    return undefined;
  }
};
const indent = (asked: Asked): number => ((said) => low(said) ?? low(`${said}..${said}`) ?? 0)(value(asked, 'form/style/json/indent') ?? '0');
export const json = (asked: Asked, held: unknown): readonly string[] => `${JSON.stringify(held, null, indent(asked))}\n`.split('\n').slice(0, -1);
const truths: ReadonlyMap<string, boolean> = new Map([['true', true], ['false', false]]);
export const truth = (text: string): string | boolean => truths.get(text) ?? text;
export const versioned = (text: string | undefined): Record<string, string> => Object.fromEntries(alphabet(text ?? '').members
  .map((one) => ((wanted) => [wanted.name, wanted.range])(requirement(one))));
