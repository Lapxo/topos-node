import { found, lang, listed, of } from '@lapxo/topos/capsule';
import { alphabet } from '@lapxo/topos/wire';
import type { Asked } from '@lapxo/topos/capsule';
import { json, truth, under, versioned } from './values.ts';

const at = (asked: Asked, scope: string): string | undefined => ((line) => (line === undefined ? undefined : of(line, 'value')))(asked.lines.find((line) => of(line, 'scope') === scope && of(line, 'shape') === asked.shape));

/** A text as the language writes a sentence: its trailing marks cut, capital first and a period last where its rule says so. */
const sentence = (asked: Asked, text: string): string => {
  const rule = listed(asked, `form/prose/${lang(asked)}/sentence`);
  let end = text.length;
  while (end > 0 && '.;:, \n'.includes(text.charAt(end - 1))) end -= 1;
  const start = rule.includes('capital') ? `${text.charAt(0).toUpperCase()}${text.slice(1, end)}` : text.slice(0, end);
  return rule.includes('period') ? `${start}.` : start;
};

/**
 * The manifest of a place: what it holds, each subpath a type and a default, each command it offers, and the source it
 * was built from while a line still names one. Nothing is a default: a field absent from the place's lines is absent here, and the description
 * is its prose written as its language writes.
 */
export const packaged = (asked: Asked): readonly string[] => {
  const [subpaths, bins, source, what] = [under(asked, 'exports'), under(asked, 'bin').filter(([name]) => name !== ''), at(asked, 'source'), found(asked, `prose/${lang(asked)}/what`)];
  const resolved = (built: string): Record<string, string> => ({ ...(source ? { source: `./${source}${built.slice(built.indexOf('/'))}.ts` } : {}), types: `./${built}.d.ts`, default: `./${built}.js` });
  const [repository, kind, side, closed] = [at(asked, 'repository'), at(asked, 'type'), at(asked, 'sideEffects'), at(asked, 'private')];
  return json(asked, {
    name: at(asked, 'name'), version: at(asked, 'version'), ...(closed === undefined ? {} : { private: truth(closed) }), description: what === undefined ? undefined : sentence(asked, of(what, 'about')),
    ...(kind ? { type: kind } : {}), license: at(asked, 'license'), author: at(asked, 'author'),
    ...(repository ? { repository: { type: 'git', url: `git+${repository}.git` } } : {}), keywords: alphabet(at(asked, 'keywords') ?? '').members,
    ...(side === undefined ? {} : { sideEffects: truth(side) }), engines: { node: at(asked, 'engines') },
    exports: { ...Object.fromEntries(subpaths.map(([sub, built]) => [sub === '' ? '.' : `./${sub}`, resolved(built)])), [`./${asked.shape}`]: `./${asked.shape}` },
    ...(bins.length ? { bin: Object.fromEntries(bins.map(([name, built]) => [name, `./${built}.js`])) } : {}),
    files: listed(asked, 'audit/wire/ships'), scripts: Object.fromEntries(under(asked, 'scripts').filter(([name]) => name !== '')),
    ...(at(asked, 'dependencies') === undefined ? {} : { dependencies: versioned(at(asked, 'dependencies')) }),
    ...(at(asked, 'devDependencies') === undefined ? {} : { devDependencies: versioned(at(asked, 'devDependencies')) }),
  });
};
