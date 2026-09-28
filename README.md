# Texas Food Sovereignty Commons — Collaborative PWA v4

A Texas-specific, evidence-grounded operating system for reducing avoidable food-system costs while strengthening water stewardship, producer viability, food access, ecological resilience, digital infrastructure and cross-domain cooperation.

## Major capabilities

- Texas ecoregion, water, agricultural, food-access, procurement and program context.
- Delivered-price analysis from production through household access.
- Cross-domain institutional/role playbooks covering producers, families, schools, universities, libraries, clinics, businesses, logistics, utilities and public institutions.
- Shared **projects, tasks, comments, proposals/advisory votes, decisions, needs/offers and chat**.
- **Trystero 0.25.3** using the modern 0.25.x action-object API.
- Nostr discovery by default; selectable **MQTT, BitTorrent and IPFS** strategies.
- Direct browser-to-browser **WebRTC** traffic after discovery, with optional explicit TURN fallback for network combinations that cannot establish a direct path.
- Snapshot synchronization when a peer joins so an existing room participant can provide current collaborative state without a central application database.
- Same-device/offline `BroadcastChannel` collaboration fallback.
- IndexedDB local-first persistence, last-write-wins timestamp merging, validated JSON backup/import and workspace export.
- Optional **WebLLM 0.2.85** dedicated-worker architecture with IndexedDB model caching.
- Deterministic local planning fallback when WebGPU/model loading is unavailable.
- Installable PWA, versioned service worker and offline application/data shell.
- Animated splash with connectivity → evidence → collaboration progression, network rings, loading track and immediate Enter button.
- Reduced-motion behavior that suppresses nonessential animation.
- Accessible tooltips usable with pointer, keyboard focus and Escape dismissal.
- Four-depth **Simplified Advanced Guides**: one-minute explanation → actionable steps → advanced explanation → expert/implementation detail.
- Current connectivity enabling layers for BEAD/BOOT, FCC mapping/Fabric concepts, Census, E-Rate, libraries, telehealth and workforce.
- Searchable preservation of the original **111-section Texas Connectivity & Opportunity requirements atlas**.
- Source/provenance classifications, data-sovereignty boundaries and Zero-Harm / Anti-Inversion guardrails.
- An optional **legacy Node/WebSocket adapter** retained separately; it is not required for normal multiplayer.

## Quick start — GitHub Pages

1. Extract this ZIP into the root of a GitHub repository.
2. Keep the directory structure intact and publish the branch/folder containing `index.html` through GitHub Pages.
3. Open the HTTPS site online once so the service worker can cache the local application shell.
4. For multiplayer, open **Multiplayer room** on two devices/browsers, choose the same room code, discovery strategy and optional password, then connect.
5. For a private working group, verify participants independently before sharing non-public information. A Trystero peer ID or self-chosen display label is **not identity verification**.

No custom application server is required for the normal P2P room path.

## Multiplayer architecture

`js/collaboration.js` pins Trystero to **0.25.3** and imports one of:

- `@trystero-p2p/nostr@0.25.3`
- `@trystero-p2p/mqtt@0.25.3`
- `@trystero-p2p/torrent@0.25.3`
- `@trystero-p2p/ipfs@0.25.3`

The action-object API is used for presence, patches, snapshots, chat and binary files. Existing peers send their current room snapshot to a newly joined participant. Application records are then synchronized as patches.

Shared record collections are:

- projects
- tasks
- comments
- proposals
- resources
- decisions
- chat

This prototype deliberately uses a simple last-write-wins record merge. It is **not** a CRDT, authenticated enterprise database, Byzantine consensus system or authoritative legal record.

### Network constraints

Discovery requires access to the selected Trystero discovery medium. Direct WebRTC cannot traverse every NAT/firewall configuration. An optional TURN configuration is exposed in the UI and credentials are not stored by this app.

The optional `legacy-node-adapter/` is retained only for deployments that explicitly need a conventional WebSocket relay. It is not the normal Trystero path and is not automatically used by the PWA.

## Connectivity + food-system integration

The **Connectivity & atlas** module treats digital infrastructure as an enabling dependency rather than a broadband-only topic. It connects:

- farm/irrigation telemetry and market coordination;
- rural grocery and cold-chain operations;
- schools and E-Rate-supported connectivity context;
- libraries as public digital-access anchors;
- telehealth continuity while keeping health records outside the food workspace;
- workforce/digital-skills development;
- emergency communication and backup-power planning;
- FCC mapping/challenge literacy;
- BEAD/BOOT project-state transparency.

Availability, affordability, performance, adoption and verified operational status remain distinct concepts.

## Simplified Advanced Guides

The dedicated module includes guides for:

- connectivity diagnosis;
- Trystero/WebRTC;
- Texas broadband-project status;
- mapping challenges;
- multidisciplinary project design;
- telehealth;
- emergency communications;
- WebLLM;
- PWA/offline architecture;
- evidence/provenance;
- food hubs;
- institutional/school procurement;
- water-productivity trials;
- R&D pilots;
- food-continuity exercises.

See `docs/ADVANCED_GUIDES.md`.

## WebLLM and deterministic fallback

The AI tab dynamically loads `@mlc-ai/web-llm@0.2.85` only after the user asks it to run. The model executes through a dedicated Web Worker and uses WebLLM's IndexedDB cache backend. The default model is intentionally small.

If WebGPU, the module or model is unavailable, the app falls back to a deterministic local planning routine. That fallback uses fixed planning rules, does not pretend to be a language model and does not invent empirical findings.

## Offline behavior

The service worker precaches the application shell and local data modules. IndexedDB room snapshots and deterministic planning remain local. First-time Trystero imports, remote discovery and first-time WebLLM/model downloads are not promised offline.

Service workers do not run under `file://`; use HTTPS or localhost.

## Security, privacy and identity boundaries

- No built-in analytics or telemetry.
- No API keys are embedded.
- TURN credentials are session-only.
- Received peer files are never auto-opened.
- Room passwords strengthen protection of discovery/session-description data but do not establish participant identity.
- Do not place credentials, regulated health/student records, trade secrets or unnecessary personal information into shared rooms.
- Transport encryption does not replace authorization, institutional retention rules, records management, access control or incident response.
- Hashes verify file integrity, not authorship or institutional approval.

## File tree

```text
index.html
legacy-singlefile.html
offline.html
manifest.webmanifest
sw.js
LICENSE
README.md
checksums.sha256
css/
  styles.css
js/
  app.js
  db.js
  collaboration.js
  ai.js
  webllm-worker.js
data/
  texas-data.js
  connectivity-data.js
  workspace-schema.json
icons/
  icon.svg
  icon-192.png
  icon-512.png
docs/
  ARCHITECTURE.md
  ADVANCED_GUIDES.md
  COLLABORATION_GUIDE.md
  CONNECTIVITY_ATLAS.md
  DEPLOYMENT.md
  LICENSES.md
  SOURCES.md
  TESTING.md
legacy-node-adapter/
  README.md
  package.json
  server.mjs
```

## Evidence date

The bundled research/connectivity snapshot is dated **2026-09-28**. Current grants, project completion, laws, procurement rules, drought conditions and prices can change. Recheck primary sources before consequential decisions.

## Attribution

Application architecture and compilation: **Foster + Navi / Planetary Restoration Archive**.

Trystero and WebLLM are independent open-source projects. The bundle imports their documented packages at runtime instead of copying proprietary vendor code. See `docs/LICENSES.md`.
