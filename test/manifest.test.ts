import test from 'node:test';
import assert from 'node:assert/strict';
import { render } from '../src/regions/manifest.ts';
import { render as published } from '../src/regions/published-manifest.ts';
import type { Asked } from '@lapxo/topos/capsule';

const asked = (lines: Asked['lines']): Asked => ({name:'place',shape:'package.json',lines} as Asked);
const line = (scope:string,value:string,shape='package.json') => ({scope,value,shape,role:'writes',form:'alphabet',measure:'id'});
const read = (rendered:readonly string[]) => JSON.parse(rendered.join('\n'));

test('metadata preserves declared dependencies and commands; publication removes only the source projection', () => {
 const input=asked([line('devDependencies','typescript@5.9.3'),line('scripts/test','node --test test/*.test.ts'),line('source','src'),line('exports','dist/index')]);
 assert.deepEqual(read(render(input)).devDependencies,{typescript:'5.9.3'});
 assert.equal(read(render(input)).scripts.test,'node --test test/*.test.ts');
 assert.deepEqual(read(published(input)).devDependencies,{typescript:'5.9.3'});
 assert.equal(read(render(input)).exports['.'].source,'./src/index.ts');
 assert.equal(read(published(input)).exports['.'].source,undefined);
});

test('a declaration for another output is not borrowed into the manifest', () => {
 const output=read(render(asked([line('devDependencies','typescript@5.9.3','other.json'),line('scripts/test','unrelated','other.json')])));
 assert.equal(output.devDependencies,undefined);
 assert.deepEqual(output.scripts,{});
});
