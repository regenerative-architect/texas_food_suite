# Cross-domain collaboration guide

The collaboration layer is designed to coordinate multidisciplinary work without pretending every participant has the same authority, evidence standard or legal mandate.

## Working-room pattern

1. **Bound the outcome.** Define geography, population, time horizon and a measurable food-system outcome.
2. **Declare roles as context, not credentials.** The in-room role field helps participants understand disciplinary perspective; it does not verify identity or professional authority.
3. **Publish a baseline.** Record current price, spoilage, water use, throughput, service reliability or other relevant measures before proposing technology.
4. **Create shared projects.** Each project carries region, domain, lead, status, intended impact and dependencies.
5. **Break work into shared tasks.** Tasks synchronize as first-class records and can be scoped to a project.
6. **Use comments for evidence/dependencies.** Comments are useful for observations, caveats and implementation notes; do not place regulated or sensitive records in them.
7. **Use proposals for advisory governance.** Votes expose room sentiment; they are not statutory, procurement or corporate authorization.
8. **Log decisions separately.** Record the decision and its stated basis while keeping authoritative legal/institutional records in the appropriate external system.
9. **Post needs/offers.** Share capacity gaps and capabilities such as storage, trucks, kitchens, research equipment, buyer demand or training.
10. **Export at milestones.** The data model is local-first and simple; export a JSON snapshot at consequential milestones.

## Peer-join synchronization

When a peer joins a Trystero room, an existing peer sends the current workspace snapshot directly to that peer. Later changes are distributed as record patches. The same-device BroadcastChannel path also exchanges a snapshot when a tab joins.

This avoids a required central application database but does not create durable cloud persistence by itself.

## Recommended multidisciplinary cells

- **Affordable basket:** producer + buyer/retailer + logistics/cold chain + community/household + economics/data.
- **Water productivity:** producer + irrigation/water + extension/research + buyer + energy.
- **Institutional procurement:** school/hospital/other buyer + producer + distributor + procurement/legal + food safety.
- **Food hub:** producer network + anchor buyer + logistics + cold-chain/utility + finance/planning.
- **Connectivity:** producer/business + library/school + broadband planner + emergency/resilience + IT/security.
- **Resilience:** emergency management + grocery/food bank + school/community kitchen + carrier + utility + public-health/food-safety.
- **R&D:** operator + university/extension + buyer + measurement specialist + maintenance + economic evaluator.

## Identity, passwords and trust

A Trystero peer ID and self-chosen profile are not verified identity. For private or consequential rooms, authenticate people/organizations out-of-band using an existing trusted institutional process.

A shared room password strengthens protection of session-description data during discovery. It is not a substitute for participant authentication, authorization or records governance.

## Conflict handling

Records use last-write-wins timestamps. This is not a CRDT. Avoid simultaneous edits to the same consequential record, and preserve rationale with comments/proposals plus exports.

## Privacy boundary

Do not put health information, student records, credentials, trade secrets, private household locations or other unnecessary sensitive information in a shared room. WebRTC transport security does not replace institutional access controls, retention policy or incident response.
