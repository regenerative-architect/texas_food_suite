# Legacy / optional Node + WebSocket adapter

This adapter is retained only for compatibility experiments and controlled deployments that explicitly need a conventional WebSocket relay.

**It is not required for normal multiplayer.** The application UI uses Trystero 0.25.3 peer discovery plus direct WebRTC room traffic, with BroadcastChannel as a same-device fallback.

The adapter is intentionally minimal and provides no authentication, durable database, authorization, retention policy, moderation, semantic conflict resolution or legal audit trail. Do not expose it publicly without adding the production controls appropriate to your environment.

Run only if needed:

```bash
npm install
npm start
```

Health check: `GET /health`.
