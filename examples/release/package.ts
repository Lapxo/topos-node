// A package asked of this world through the one contract: its own lock as it stands, the manifest those lines make, then the line a place adopts it with.
import { readFileSync } from 'node:fs';
import { declarationOf, shell } from '@lapxo/topos/capsule';
import { answer } from '@lapxo/topos/contract';
import { PROTOCOL, canonical } from '@lapxo/topos/wire';
import { render as manifest } from '../../src/regions/manifest.ts';

const lock = readFileSync(new URL('../../capsule.bound', import.meta.url), 'utf8').split('\n').filter((line) => line.startsWith('bound-lock/1'));
const render = shell({ manifest: { reads: declarationOf(lock).regions['manifest'] ?? [], region: manifest } });
const said = (scope: string, value: string): string => canonical({ at: 'policy:acme/package', by: 'target', form: 'alphabet', measure: 'id', role: 'writes', scope, shape: 'package.json', value });
const lines = [said('name', '@acme/room'), said('version', '0.1.0'), said('private', 'true'), said('type', 'module'), said('license', 'MIT'), said('engines', '>=22'),
  said('exports', 'dist/index'), said('dependencies', '@lapxo/topos@0.1.2'), said('form/style/json/indent', '2')];
const got = answer({ render }, { protocol: PROTOCOL, verb: 'render', rootScope: '', files: [], lines, region: 'manifest', at: 3, shape: 'package.json', name: 'acme', reads: declarationOf(lock).regions['manifest'] ?? [] }, '') as { kind: string; lines: string[]; why: string };

for (const line of lock.filter((one) => / scope=(capsule|region)\//.test(one))) console.log(line);
console.log(got.kind === 'fact' ? got.lines.join('\n') : got.why);
console.log(canonical({ at: 'policy:acme/capsules', by: 'target', form: 'alphabet', measure: 'id', role: 'writes', scope: 'uses/topos-node', value: 'sha256:bbcd3bbe503353e364e402fdf2ece997d4c757bfe3cbafbf2e9c1d0a0a4999d8' }));
