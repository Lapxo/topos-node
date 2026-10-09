import{shell,receiptShell}from'@lapxo/topos/capsule';
import type{Asked}from'@lapxo/topos/capsule';
import{alphabet}from'@lapxo/topos/wire';
import * as r0 from './regions/manifest.ts';
import * as r1 from './regions/published-manifest.ts';
import * as r2 from './regions/build.ts';
type Fields=Readonly<Record<string,string>>;
const provided=(asked:Asked):readonly Fields[]=>{const lines=(asked as Asked & {provider?:{lines?:readonly Fields[]}}).provider?.lines;if(lines===undefined)throw Error('REFUSE·world provider standing not handed');return lines;};
const own=(lines:readonly Fields[]):readonly Fields[]=>lines.filter(f=>['form','prose','notation'].includes((f.scope??'').split('/')[0]!));
const readsOf=(lines:readonly Fields[],name:string,role:string):readonly string[]=>lines.filter(f=>f.scope==='region/'+name&&f.role===role&&f.measure==='reads').flatMap(f=>alphabet(f.value??'').members);
export const render=(asked:Asked)=>{const lines=provided(asked);return shell({
  "manifest":{reads:readsOf(lines,"manifest","render"),region:(a:Asked)=>r0.render({...a,lines:[...a.lines,...own(lines)]})},
  "published-manifest":{reads:readsOf(lines,"published-manifest","render"),region:(a:Asked)=>r1.render({...a,lines:[...a.lines,...own(lines)]})},
  "build":{reads:readsOf(lines,"build","render"),region:(a:Asked)=>r2.render({...a,lines:[...a.lines,...own(lines)]})},
})(asked);};
export const receipt=(asked:Asked)=>{const lines=provided(asked);return receiptShell({
})(asked);};
