import { json } from '../helpers/values.ts';
import type { Asked } from '@lapxo/topos/capsule';
import { packaged } from '../helpers/packaged.ts';

/** The manifest a consumer reads: the place's own, each subpath a type and a default, without the source it was built from. */
export const render = (asked: Asked): readonly string[] => {
  const held = JSON.parse(packaged(asked).join('\n')) as Record<string, unknown>;
  for (const one of Object.values(held['exports'] as Record<string, unknown>)) if (typeof one === 'object' && one !== null) delete (one as Record<string, unknown>)['source'];
  return json(asked, held);
};
