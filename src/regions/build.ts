import { alphabet } from '@lapxo/topos/wire';
import { json, truth, under } from '../helpers/values.ts';
import type { Asked } from '@lapxo/topos/capsule';

/** How a place builds: every option one line, its sources one list, written as its build reads them. */
/** The one option a build reads outside its compiler options. */
const outside: 'include' = 'include';

export const render = (asked: Asked): readonly string[] => {
  const options = under(asked, 'build').filter(([name]) => name !== '');
  const include = options.find(([name]) => name === outside)?.[1];
  return json(asked, { compilerOptions: Object.fromEntries(options.filter(([name]) => name !== outside).map(([name, held]) => [name, truth(held)])), ...(include === undefined ? {} : { include: alphabet(include).members }) });
};
