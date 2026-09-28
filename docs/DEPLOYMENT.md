# Deployment

## GitHub Pages / static HTTPS hosting

This application is designed so its normal path works from static HTTPS hosting.

1. Preserve the directory tree.
2. Publish the directory containing `index.html`.
3. Confirm HTTPS and load the site online once.
4. Refresh after service-worker activation if you want to verify the cached shell.
5. Use the same room code, discovery strategy and optional password on participating browsers.

Relative URLs make repository-subdirectory hosting compatible with GitHub Pages.

## Local development

Use an HTTP server rather than `file://`:

```bash
python -m http.server 8080
```

Service workers do not operate from `file://`. Media and WebGPU capability still depend on the browser/device.

## Trystero 0.25.3 strategies

The UI can dynamically import these strategy packages:

- Nostr — default
- MQTT
- BitTorrent
- IPFS

All use the same application room/action architecture. Strategy availability depends on access to the relevant public discovery infrastructure. Application state is not promised to persist on those networks; the browser-local snapshot remains the durability layer in this prototype.

## Remote multiplayer validation

Test with at least two real browsers/devices:

1. Open the same deployed URL.
2. Select the same room code and strategy.
3. Optionally enter the same strong shared room password.
4. Connect both peers and verify presence.
5. Create a project on A and verify it arrives on B.
6. Create a task/comment/decision on B and verify it arrives on A.
7. Refresh one peer; verify its IndexedDB snapshot restores.
8. Join a third peer after state exists; verify peer-join snapshot synchronization provides current projects/tasks/comments/proposals/resources/decisions.
9. Disconnect internet but keep two same-origin tabs open; verify BroadcastChannel same-device synchronization.

## TURN fallback

Some NAT/firewall combinations cannot establish a direct WebRTC path. Supply a TURN service only when needed. TURN credentials are not persisted by this app. A TURN relay helps connectivity; it does not become the authoritative project database.

## Optional legacy Node/WebSocket adapter

The `legacy-node-adapter/` folder is isolated and unused by the default PWA. Run it only if a deployment explicitly requires a conventional WebSocket relay and after adding the authentication, TLS, authorization, rate limiting, audit and operational controls appropriate to that environment.

## Institutional production hardening

Organizations needing durable identity, authorization, retention schedules, moderation, legal holds, audit trails, regulated-data controls, guaranteed service levels or authoritative records should add explicitly governed infrastructure rather than representing the static P2P prototype as providing those guarantees.
