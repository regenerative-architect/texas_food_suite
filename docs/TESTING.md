# Testing checklist and delivery result

Delivery date: **2026-09-28**.

## Automated/static checks executed

The delivery pass checked:

- JavaScript syntax with `node --check` for `app.js`, `collaboration.js`, `ai.js`, `db.js`, `webllm-worker.js`, `sw.js`, `connectivity-data.js` and the optional legacy WebSocket server.
- HTML parsing and duplicate-ID detection.
- Route-registry entries against real `route-*` sections.
- Static application `#id` references against the HTML shell.
- Manifest JSON parsing and icon/start/scope paths.
- Workspace JSON Schema parsing and required v4 collections.
- Service-worker precache entries against files on disk.
- 111 connectivity-atlas headings/count.
- Required guide concepts and 15-guide inventory.
- Trystero version pin and Nostr/MQTT/BitTorrent/IPFS strategy definitions.
- CSS brace balance.
- HTTP 200 smoke tests for the main application, manifest, service worker, JS/data modules, Advanced Guides documentation, Connectivity Atlas and legacy adapter documentation.
- Same-device multiplayer synchronization using two `CollaborationManager` instances and `BroadcastChannel`; projects, tasks and comments synchronized successfully in the test.

At delivery the static suite reported **152 unique DOM IDs, 14 application routes and 126 static UI ID references** without duplicate/missing required IDs after accounting for the intentionally runtime-created self-video card.

## Environment-dependent tests not claimed

A static/container test cannot prove remote browser behavior across arbitrary NAT/firewall/provider combinations. Validate after deployment:

- two-device Trystero pairing for each strategy you intend to support;
- peer-join remote snapshot synchronization;
- optional password behavior between real peers;
- restrictive-network behavior and TURN fallback;
- microphone/video permissions and teardown;
- received binary file flow;
- PWA install prompt and offline reload in target browsers;
- WebLLM model download/inference on target WebGPU hardware;
- browser storage quota/eviction behavior;
- screen-reader and keyboard review of tooltips, navigation and forms.

## Recommended remote multiplayer acceptance test

1. Deploy through HTTPS.
2. Device A joins a new Nostr room and creates a project plus task.
3. Device B joins afterward and should receive the current snapshot.
4. B posts a comment and decision; A should receive patches.
5. Repeat with MQTT, BitTorrent and IPFS only if those strategies are operationally required.
6. Test a restrictive network pairing; if direct WebRTC cannot establish, configure TURN and retry.
7. Confirm peer labels are treated as unverified and no regulated/private data is placed in the prototype room.

## Important interpretation

Passing static and BroadcastChannel tests demonstrates bundle integrity and the local collaboration code path. It does **not** certify a production deployment, institutional identity model, legal record system, security audit or universal remote WebRTC connectivity.
