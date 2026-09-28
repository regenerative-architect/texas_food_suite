# Attributions & licenses

## Original application code

Copyright 2026 Foster + Navi / Planetary Restoration Archive.
License: MIT. See `/LICENSE`.

## Trystero

Project: https://github.com/dmotz/trystero
Author/maintainer: Dan Motzenbecker and contributors.
License: MIT according to the upstream repository.

This bundle does not copy Trystero source into the repository. `js/collaboration.js` dynamically imports the documented public ESM package at runtime.

## WebLLM

Project: https://github.com/mlc-ai/web-llm
Documentation: https://webllm.mlc.ai/docs/
Copyright/license: see the upstream WebLLM repository for current terms.

This bundle does not copy WebLLM source or model weights into the repository. The AI module dynamically imports WebLLM on explicit user action. Model licenses vary by model and must be reviewed independently.

## Texas / U.S. government and research sources

The app links to source material from USDA, Texas Parks & Wildlife, Texas Water Development Board, Texas Department of Agriculture and other cited publishers. Links and factual summaries do not transfer ownership of those materials to this project. Consult each source for reuse terms.

## No implied endorsement

Use of a project, institution, agency, technology or source name is descriptive and does not imply endorsement, partnership or sponsorship.

## Trystero version and strategy packages

The multiplayer module is pinned to Trystero **0.25.3** and dynamically imports strategy-specific packages for Nostr, MQTT, BitTorrent or IPFS. The bundle uses the public 0.25.x action-object API; it does not vendor the Trystero source code.

## Legacy Node/WebSocket adapter

`legacy-node-adapter/` contains small original compatibility code plus the `ws` npm dependency. The adapter is optional and not used by the default application path. Review the upstream `ws` package license and security guidance before deploying that adapter.
