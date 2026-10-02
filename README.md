A world for a node package. Point it at the lines that name a package and it renders the manifest, the published manifest, and the build. [its regions, read off its own descriptor](docs/reference.md)

## Why the lines

A package is the lines that name it. Two manifests come from one lock, and the build is the compiler lines that lock holds.

## One package, two manifests

<p align="center"><img src="docs/img/world.svg" alt="declares , runs on , reaches, 3 regions, the longest of them 0 lines, 0 vector files, each held from the blob, pinned by topos-node and run by the host" width="640"></p>

## Line

Add to your lock:
sources/topos-node value=github:Lapxo/topos-node
uses/topos-node sha256:<release digest>
https://github.com/Lapxo/topos-node/releases
Fetch the release asset, verify its sha256 equals the uses/ line, place it in bound/cas/blobs/. Fold: its pages appear.
open: line/install needs=host/resolve — when bound resolves sources/ itself, the fetch line leaves the page by fold.

```bash
node examples/release/package.ts
```

It rests on topos.

## Check

● 0 cases hold

● `npm ci && npm run build`

## Pointers

- [Reference](docs/reference.md)
