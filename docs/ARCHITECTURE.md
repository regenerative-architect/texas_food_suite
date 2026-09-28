# Architecture

## Shared shell

`index.html` contains the semantic application shell. `js/app.js` defines the route registry used for navigation, active state and breadcrumbs. The food-system modules remain primary; **Connectivity & atlas** is a cross-domain enabling-infrastructure layer.

## Local persistence and data sovereignty

`js/db.js` provides IndexedDB storage with a small localStorage fallback. Room state is keyed by room ID. Data export/import is explicit and portable; there is no hidden account sync.

The v4 shared workspace schema includes projects, tasks, comments, proposals, resources, decisions and chat. Records carry stable IDs plus `updatedAt`/`updatedBy` metadata.

## Multiplayer stack

`js/collaboration.js` has three interoperable states:

1. **Local persistence** — browser-local workspace.
2. **BroadcastChannel** — same-origin, same-device tab synchronization; useful for offline demonstrations/workshops.
3. **Trystero 0.25.3** — remote peer discovery with Nostr default and selectable MQTT, BitTorrent or IPFS discovery.

Trystero's 0.25.x action-object API is used for presence, patches, snapshots, chat and files. When a peer joins, an existing room member sends a current workspace snapshot; later changes travel as collection patches.

Remote room state does not require a central application database. The merge rule is record-level last-write-wins by timestamp. This is intentionally simple and auditable, but it does not provide semantic merge guarantees for simultaneous conflicting edits.

Peer identifiers and self-declared profiles are **ephemeral coordination metadata, not verified identity**.

## WebRTC, TURN and discovery

The chosen Trystero strategy exchanges signaling/session information needed to establish WebRTC connections. Normal application payloads then use WebRTC peer channels. Direct WebRTC does not work through every network topology; the UI exposes TURN only as an explicit fallback.

## Optional legacy WebSocket adapter

`legacy-node-adapter/` preserves a minimal Node/WebSocket relay path for compatibility experiments. It is isolated from the normal PWA and is not required or automatically contacted.

## Local AI

`js/ai.js` dynamically imports WebLLM only on explicit user action. `js/webllm-worker.js` hosts the WebLLM worker handler. Model caching uses IndexedDB through WebLLM.

When WebGPU/model loading is unavailable, `deterministicPlan()` provides a rule-based local fallback. It is intentionally non-generative and labels itself as such.

## Connectivity/evidence layer

`data/connectivity-data.js` contains:

- dated enabling-infrastructure evidence records;
- the preserved 111-section Connectivity & Opportunity atlas headings plus implementation mapping;
- the four-depth Advanced Guides.

This layer is kept separate from the core food dataset so it can be updated independently.

## PWA

`sw.js` precaches the local app shell, food/connectivity data modules and workspace schema. Navigations use network-first with cached fallback; local static assets are cache-first. Small runtime ESM dependencies may be cached after first use. WebLLM manages its own model cache to avoid duplicate model storage.

## Failure isolation

- Trystero/discovery failure → local persistence + BroadcastChannel remain.
- Direct WebRTC blocked → optional user-supplied TURN may help; no claim of universal traversal.
- WebGPU/WebLLM failure → deterministic planner + all non-AI modules remain.
- IndexedDB failure → small-state localStorage fallback where possible.
- Offline before first hosted load → only files already physically/cached locally are available.
