export const CONNECTIVITY_SNAPSHOT_DATE = '2026-09-28';

export const connectivityEvidence = [
  {
    id:'bead', layer:'BEAD', status:'Approved final proposal', grade:'A — official',
    fact:'Texas says its BEAD Final Proposal was approved Dec. 4, 2025. The BDO selected 22 applicants to serve more than 240,000 broadband-serviceable locations and more than 2,700 community anchor institutions, with about $1.2B in federal awards and $177M in state match.',
    foodLink:'Treat funded rural connectivity as enabling infrastructure for farm telemetry, producer-market coordination, cold-chain monitoring, remote training and rural retail operations; verify deployment at the actual project/location level before assuming service exists.',
    source:'https://comptroller.texas.gov/programs/broadband/funding/bead/'
  },
  {
    id:'boot', layer:'BOOT', status:'Projects in delivery', grade:'A — official',
    fact:'Texas reports BOOT I awards of $10.4M covering 1,468 residential locations, 77 businesses and 15 community anchor institutions; BOOT I projects are due by Dec. 31, 2026. BOOT II reports $623.4M awarded for 61,185 residential locations, 18,250 businesses and 2,191 community anchor institutions, with project status published by the BDO.',
    foodLink:'Use BOOT project geography as a planning layer for rural food hubs, school/library access points, producers and small grocers, but keep announced/awarded/construction/operational statuses distinct.',
    source:'https://comptroller.texas.gov/programs/broadband/funding/boot/'
  },
  {
    id:'fcc', layer:'FCC map / Fabric', status:'Continuously updated federal dataset', grade:'A — official',
    fact:'The FCC National Broadband Map shows provider-reported availability and allows location and availability challenges. FCC guidance explicitly distinguishes availability from real-world performance, affordability and adoption.',
    foodLink:'Use the map as one evidence layer—not proof that a farm, household, clinic or grocery has affordable, reliable service. Pair it with local speed/reliability observations and operational requirements.',
    source:'https://help.bdc.fcc.gov/hc/en-us/articles/10467446103579-How-to-Use-the-FCC-s-National-Broadband-Map'
  },
  {
    id:'census', layer:'Census', status:'2024 ACS 1-year Texas estimate', grade:'A — official',
    fact:'ACS table B28003 reports 11,449,769 Texas households in the 2024 estimate; 10,641,140 had a broadband internet subscription, 485,603 had a computer but no internet subscription, and 317,475 had no computer.',
    foodLink:'Household digital access affects online grocery comparison, benefit/program navigation, training, remote work and participation in digital food-market coordination. County/tract-level analysis should use appropriate ACS tables and margins of error.',
    source:'https://data.census.gov/table/ACSDT1Y2024.B28003?g=040XX00US48'
  },
  {
    id:'erate', layer:'E-Rate', status:'FY2026 program guidance available', grade:'A — official',
    fact:'USAC describes E-Rate as discounts for eligible schools and libraries on internet/data transmission and eligible internal connections. Funding-year eligibility changes, so applicants must use the current Eligible Services List and process guidance.',
    foodLink:'Schools and libraries can act as digital anchor institutions for procurement coordination, workforce learning and community access; E-Rate funding itself must remain within program eligibility and educational-purpose rules.',
    source:'https://www.usac.org/e-rate/'
  },
  {
    id:'library', layer:'Libraries', status:'Texas library broadband support active', grade:'A — official/institutional',
    fact:'TSLAC reports library broadband/E-Rate support and 2026 accreditation standards. Commission minutes from Aug. 1, 2025 reported Libraries Connecting Texas supporting 169 library systems, with more than $1.35M in discount funding requests and an average discount of 83%.',
    foodLink:'Libraries can be resilient public-access nodes for digital navigation, training and community coordination; do not assume every library has the same bandwidth, hours, rooms or E-Rate participation.',
    source:'https://www.tsl.texas.gov/ldn/accreditation'
  },
  {
    id:'telehealth', layer:'Telehealth', status:'SFY2026 rural tele-connectivity grant cycle documented', grade:'A — official',
    fact:'Texas HHSC released the SFY2026 Pediatric Tele-Connectivity Resource Program for Rural Texas to connect eligible rural hospitals and rural health clinics with pediatric specialists/subspecialists or participating higher-education institutions.',
    foodLink:'Connectivity planning for rural food systems overlaps with health access and community-anchor resilience; shared infrastructure design can coordinate power, broadband and private-room needs while keeping health data out of this food workspace.',
    source:'https://resources.hhs.texas.gov/rfa/hhs0017228'
  },
  {
    id:'workforce', layer:'Workforce', status:'2026 digital-skills guidance', grade:'A — official',
    fact:'Texas Workforce Commission guidance updated in 2026 treats digital-skills building as an allowable workforce-development activity and explicitly integrates AI literacy. TWC also operates training programs such as Skills for Success and regional workforce programs.',
    foodLink:'Food-system modernization requires digital literacy across producers, processors, logistics, retail, schools and community organizations—not only new hardware or connectivity.',
    source:'https://www.twc.texas.gov/sites/default/files/wf/policy-letter/wd/20-21-ch2-twc.pdf'
  },
  {
    id:'lifi', layer:'Library infrastructure / public access', status:'FY2026 Texas grant guidance published', grade:'A — official',
    fact:'TSLAC describes its LIFI grant program as supporting broadband infrastructure and facility improvements in eligible public libraries, including projects aimed at at least 100/100 Mbps and spaces that can support education, work and health monitoring.',
    foodLink:'Where appropriate, libraries can serve as neutral coordination and training nodes during normal operations or disruptions, but facility use must follow local policies and grant/program rules.',
    source:'https://www.tsl.texas.gov/ldn/grants/programs'
  }
];

const atlasTitles = [
'PRIMARY OBJECTIVE','CORE PRINCIPLE','SYSTEM ARCHITECTURE','UNIVERSAL INTERFACE','USER MODES','CONNECTIVITY DASHBOARD','CONNECTIVITY SELF-ASSESSMENT','INTERNET SPEED EDUCATION','BANDWIDTH ESTIMATOR','SPEED TEST LOG','RELIABILITY TRACKER','BROADBAND AFFORDABILITY','TOTAL DIGITAL COST','PROVIDER COMPARISON','BROADBAND TECHNOLOGY EXPLAINER','FIBER MODULE','FIXED WIRELESS','MOBILE BROADBAND','SATELLITE CONNECTIVITY','RURAL CONNECTIVITY','PUBLIC WI-FI FINDER','PUBLIC WI-FI SAFETY','DEVICE ACCESS MODULE','DEVICE LIFECYCLE TRACKER','DEVICE REFURBISHMENT','COMMUNITY DEVICE BANK','DIGITAL LITERACY','INFORMATION LITERACY','AI LITERACY','CYBER SAFETY','DIGITAL IDENTITY SAFETY','SENIOR DIGITAL LITERACY','ACCESSIBILITY','EDUCATION ACCESS','HOMEWORK CONNECTIVITY PLAN','TELEHEALTH ACCESS','WORKFORCE ACCESS','REMOTE-WORK READINESS','REMOTE-WORK COST CALCULATOR','JOB ACCESS ENGINE','SMALL BUSINESS DIGITAL OS','SMALL BUSINESS DIGITAL MATURITY','LOCAL E-COMMERCE','ENTREPRENEURSHIP','AGRICULTURAL CONNECTIVITY','ENERGY CONNECTIVITY','WATER CONNECTIVITY','EMERGENCY CONNECTIVITY','BACKUP CONNECTIVITY','COMMUNITY CONNECTIVITY HUBS','LIBRARY CONNECTIVITY','COMMUNITY NETWORKS','OPEN-ACCESS NETWORKS','MUNICIPAL BROADBAND','COOPERATIVE BROADBAND','BROADBAND MAPPING','MAP ACCURACY CHALLENGE WORKFLOW','COVERAGE GAP DETECTOR','BROADBAND PROJECT PIPELINE','INFRASTRUCTURE COST MODEL','MIDDLE-MILE INFRASTRUCTURE','LAST-MILE INFRASTRUCTURE','ADOPTION GAP ANALYSIS','DIGITAL OPPORTUNITY SCORECARD','COUNTY CONNECTIVITY PROFILES','REGIONAL TEXAS PROFILES','COMMUNITY DIGITAL TWIN','HOUSEHOLD DIGITAL ACCESS PROFILE','SCENARIO LAB','CONNECTIVITY CASCADES','PROJECT GENERATOR','PROJECT PRIORITIZATION','COMMUNITY DEVICE PROJECT GENERATOR','DIGITAL LITERACY PROJECT GENERATOR','TELEHEALTH CONNECTIVITY PROJECT GENERATOR','REMOTE-WORK HUBS','EMERGENCY CONNECTIVITY HUBS','BROADBAND FUNDING NAVIGATOR','BEAD / BROADBAND DEPLOYMENT TRACKER','PROJECT TRANSPARENCY','GOVERNMENT DOCUMENT LIBRARY','CIVIC PARTICIPATION','RESEARCH REQUIREMENT','EVIDENCE CLASSIFICATION','DATA PROVENANCE','DATA FRESHNESS','LIVE DATA ADAPTERS','OPEN DATA EXPORT','OFFLINE MODE','SEARCH','ACCESSIBILITY','LANGUAGE','PRIVACY','DATA SOVEREIGNTY','SECURITY','PRINT MODE','VISUAL DESIGN','OPTIONAL CONNECTIVITY HUD','META-PROMPT ENGINE','PROJECT DISCOVERY ENGINE','CROSS-SYSTEM INTEGRATION','OPPORTUNITY CASCADE MODEL','DIGITAL RESILIENCE','CONNECTIVITY + POWER RESILIENCE','COMMUNITY CONNECTIVITY SCORECARD','30 / 60 / 90 DAY PLANS','SUCCESS METRICS','TEXAS CONNECTIVITY ROADMAP','ZERO-HARM / ANTI-INVERSION','ATTRIBUTIONS & LICENSES','FINAL QUALITY REQUIREMENT'
];

function atlasGroup(n){
  if(n<=6) return 'Foundation';
  if(n<=20) return 'Access & technologies';
  if(n<=35) return 'Devices, skills & education';
  if(n<=55) return 'Opportunity & cross-domain access';
  if(n<=70) return 'Mapping, infrastructure & scenarios';
  if(n<=82) return 'Projects, funding & participation';
  if(n<=98) return 'Evidence, data, privacy & UX';
  return 'Synthesis, resilience & quality';
}

export const connectivityRequirements = atlasTitles.map((title,i)=>({
  number:i+1,
  title,
  group:atlasGroup(i+1),
  relevance:
    i+1===45 ? 'Direct food-system integration: precision agriculture, irrigation monitoring, livestock tracking, weather, markets and equipment telemetry.' :
    [34,36,37,48,50,51,101,103,104].includes(i+1) ? 'Cross-domain dependency: food access and continuity can depend on education, health, workforce, emergency, library, power or other shared infrastructure.' :
    [56,57,58,79,80,81,83,84,85,86].includes(i+1) ? 'Evidence and project-status discipline: distinguish mapped availability, observed performance, funding status and verified operation.' :
    [89,93,94,95].includes(i+1) ? 'Local-first resilience, privacy and data-sovereignty requirement carried into the shared Texas Commons architecture.' :
    'Preserved requirement from the Texas Connectivity & Opportunity OS; available as an enabling layer for cross-domain Texas planning.'
}));

export const advancedGuides = [
  {
    id:'connectivity-diagnosis', title:'Connectivity diagnosis', domain:'Connectivity',
    minute:'Diagnose the layer that is failing before choosing a technology. Separate availability, affordability, device capacity, Wi-Fi quality, reliability, skills and application-specific needs. A “slow internet” complaint can originate inside the building, at the access link, upstream, or from the application itself.',
    steps:['Record connection technology, plan speed and monthly cost.','Run several wired/Wi-Fi measurements at different times; log download, upload and latency.','Test another device and, where possible, a wired connection to isolate local Wi-Fi/device issues.','Log outages and identify whether failures coincide with power loss.','Check the FCC/BDO availability layer, then document discrepancies rather than assuming the map measures performance.','Define the operational requirement: farm telemetry, video training, point-of-sale, telehealth, classroom, emergency hub or general household access.'],
    advanced:'Use a fault tree: device → LAN/Wi-Fi → CPE/modem → access network → middle mile/backhaul → internet/application. Add packet loss/jitter where real-time services matter. Track availability and performance separately, because a location can be “served” yet operationally unreliable or unaffordable.',
    expert:'For institutional pilots, establish repeatable measurement windows, equipment baselines, timestamped observations and change control. Avoid publishing precise household/farm location data unless needed and authorized. Map findings to service-level objectives instead of a single speed number.',
    outcome:'A defensible diagnosis and a small set of interventions matched to the failing layer.'
  },
  {
    id:'trystero', title:'Trystero 0.25.3 + WebRTC rooms', domain:'Multiplayer',
    minute:'Trystero helps browsers discover peers, then application data travels directly between browsers over WebRTC. This bundle pins Trystero 0.25.3 and uses the object-based action API introduced in 0.25.0. Nostr is the default discovery strategy; MQTT, BitTorrent and IPFS are selectable alternatives.',
    steps:['Use the same room code and discovery strategy on each device.','Use a strong shared room password when session-description privacy matters; share it out-of-band.','Connect two browsers over HTTPS and verify peer presence.','Create or edit a project/task and confirm the patch arrives at the other peer.','Refresh one peer and confirm a connected peer supplies a room snapshot on join.','If direct WebRTC fails across different networks, test the documented TURN fallback rather than silently relaying traffic.'],
    advanced:'The collaboration layer uses named action objects for presence, patch, snapshot, chat and file transfer. Timestamped records merge with last-write-wins semantics; this is conflict-aware but not a full CRDT. Same-device tabs use BroadcastChannel even without Trystero.',
    expert:'Production deployments should add organizational identity/authentication, authorization policy, stronger conflict-resolution semantics where simultaneous edits matter, durable audit rules where required, and monitored TURN capacity for restrictive NAT/firewall environments. Trystero peer IDs are transport identifiers—not verified people or organizations.',
    outcome:'A testable browser-native collaboration room without a required central application database.'
  },
  {
    id:'broadband-status', title:'Texas broadband-project status', domain:'Texas evidence',
    minute:'As of this evidence snapshot, Texas reports an approved BEAD Final Proposal and active BOOT deployments. Status language matters: an award is not the same as construction, activation or reliable service at a specific farm, home, library, clinic or business.',
    steps:['Open the Texas BDO BEAD and BOOT source links in the evidence module.','Identify the county/project and record award, technology, responsible entity and published completion/status data.','Cross-check the FCC National Broadband Map for the exact serviceable-location context.','Record local operational observations separately from government/provider availability data.','For food-system planning, flag farms, processors, grocers, schools, libraries and cold-chain sites whose digital dependencies are material.'],
    advanced:'The Texas BDO says the BEAD Final Proposal was approved Dec. 4, 2025, selecting 22 applicants for more than 240,000 BSLs and more than 2,700 CAIs. BOOT I projects have a Dec. 31, 2026 completion deadline; BOOT II has separate project deadlines/status reporting. Re-verify before capital decisions.',
    expert:'Build a status ontology: proposed → applied → awarded → contracted → permitting → construction → technically complete → activated → adopted → measured performance. Store source date and verification method with every transition. Never collapse statewide program approval into location-level service certainty.',
    outcome:'A current, source-linked project-status layer that can support food, education, health, workforce and resilience planning.'
  },
  {
    id:'mapping', title:'Broadband mapping & challenge workflow', domain:'Mapping',
    minute:'Broadband maps are evidence, not ground truth. The FCC map is built from provider submissions plus verification/challenge processes and mainly represents availability. It does not directly prove affordability, adoption or the performance a user experiences.',
    steps:['Search the exact location on the FCC National Broadband Map.','Check the location point, provider list, technologies and advertised speeds.','If the location itself is wrong, use the FCC location-challenge process.','If a provider is shown as available but service is not actually offered, review the availability-challenge process and collect the required evidence.','Keep local speed/outage logs separate from availability challenges.'],
    advanced:'For community analysis, separate the FCC Fabric/location layer, provider availability layer, measured-performance observations, subscription/adoption data and affordability context. Different datasets answer different questions and have different licensing/update constraints.',
    expert:'Use stable identifiers where permitted, retain source vintage, and avoid fuzzy address-only joins when authoritative geospatial identifiers are available. FCC guidance notes that geospatial alignment to the Fabric is often more reliable than address matching alone.',
    outcome:'A repeatable evidence chain from observed discrepancy to appropriately scoped official challenge or local planning record.'
  },
  {
    id:'multidisciplinary', title:'Multidisciplinary project design', domain:'Collaboration',
    minute:'A cross-domain project succeeds when roles, dependencies, evidence and decision rights are explicit. “Invite everyone” is not a design. Define the shared outcome, then identify who owns water, food safety, procurement, power, connectivity, logistics, finance, workforce, data and community operations.',
    steps:['Write one measurable outcome and one geography.','Map affected users and operational nodes.','Assign a disciplinary owner to each dependency.','Create shared tasks with owners, dates and evidence requirements.','Record decisions and dissent/uncertainty separately from chat.','Define a stop/scale gate before spending major capital.'],
    advanced:'Use interface contracts between disciplines: units, timestamps, data sensitivity, handoff criteria, maintenance responsibility and escalation paths. Keep legal authority separate from advisory collaboration—room votes do not create statutory authorization.',
    expert:'For complex pilots, use a dependency graph and responsibility matrix, pre-register measurable outcomes, preserve decision provenance, and plan degraded-mode operation. Design so optional modules or institutions can fail without taking down the whole project.',
    outcome:'A project that can be understood, executed and audited across organizational boundaries.'
  },
  {
    id:'telehealth', title:'Telehealth connectivity', domain:'Health',
    minute:'Telehealth readiness is more than bandwidth: it also involves device capability, camera/microphone quality, privacy, accessibility, staff workflow and backup connectivity. Texas HHSC documented a 2026 rural pediatric tele-connectivity grant program for eligible rural hospitals and clinics.',
    steps:['Identify the clinical workflow and minimum video/audio/privacy requirements.','Test upload, latency and reliability at the actual room/device.','Check backup power and secondary connectivity for critical sites.','Keep protected health information out of this shared food/civic workspace.','Use official HHSC/provider guidance for clinical, reimbursement and regulatory requirements.'],
    advanced:'Community anchor infrastructure can sometimes support multiple public-benefit functions, but physical privacy, network segmentation, access control and program eligibility must remain explicit. “Shared infrastructure” does not mean shared sensitive datasets.',
    expert:'Treat telehealth as a service chain: patient endpoint → local LAN/Wi-Fi → access network → provider platform → clinical workflow. Model failure and recovery at each link, including power and staffing dependencies.',
    outcome:'A connectivity plan that supports telehealth without collapsing clinical privacy or regulatory boundaries.'
  },
  {
    id:'emergency-comms', title:'Emergency communications', domain:'Resilience',
    minute:'Emergency connectivity should assume simultaneous power, ISP and transportation disruptions. No single medium is universally resilient. Design a layered plan around the communications that must continue and the duration of the disruption.',
    steps:['List critical messages and users for the first 2, 24 and 72 hours.','Inventory primary internet, mobile service, radios, satellite options, public hubs and offline contact lists.','Map the power dependency of routers, modems, towers and local devices.','Create a printed/offline fallback and assign communication roles.','Run a tabletop exercise and log single points of failure.'],
    advanced:'Separate communications for public warning, internal operations, logistics, welfare checks and data synchronization. Prioritize low-bandwidth modes under congestion. Test failover instead of assuming a backup subscription works under regional stress.',
    expert:'Model power runtime, fuel/logistics dependencies, RF/coverage constraints, interagency interoperability and message authentication. Keep emergency planning compatible with official incident-command and local emergency-management procedures where applicable.',
    outcome:'A tested layered communications plan for continuity of essential food/community operations.'
  },
  {
    id:'webllm', title:'WebLLM local planning', domain:'AI',
    minute:'WebLLM can run a supported language model in the browser with WebGPU, keeping prompts in the local browser process rather than sending them to this application’s server. Model files are large and may require an initial online download. The rest of the OS must remain useful without AI.',
    steps:['Check WebGPU in Settings diagnostics.','Start with the smallest supported model.','Use the local planner for synthesis—not authoritative facts.','Ask it to label facts, assumptions, risks and experiments.','Verify current laws, funding, prices and engineering requirements against primary sources.','If WebGPU/model loading fails, use the deterministic local planning fallback.'],
    advanced:'This bundle uses a dedicated Web Worker so inference does not monopolize the main UI thread. Model artifacts use WebLLM caching; the service worker intentionally does not attempt to own the model cache.',
    expert:'Production governance should document model/version, prompt context, data sensitivity, failure modes and human verification. Local execution reduces one class of data transfer but does not automatically make prompts non-sensitive or outputs correct.',
    outcome:'An optional local synthesis tool with a useful non-AI fallback and explicit verification boundaries.'
  },
  {
    id:'pwa', title:'PWA + offline architecture', domain:'Offline',
    minute:'The PWA caches the application shell and core data so essential planning, guides and local workspace records can remain available after a successful online visit. Service workers require HTTPS or localhost and do not make uncached live sources magically available offline.',
    steps:['Serve the bundle over HTTPS/localhost.','Load once online and confirm service-worker registration.','Use the browser offline test and reload the app.','Create a local project/task and confirm it persists through reload.','Export a JSON backup.','Reconnect and verify that current online-only source links are clearly treated as external/live.'],
    advanced:'IndexedDB stores structured state; small UI preferences are separate. The service worker versions its shell cache and uses network-first navigation with cached/offline fallback. External Trystero/WebLLM modules still require network when not already browser-cached by their own mechanisms.',
    expert:'For production, define cache invalidation, schema migrations, storage-quota handling, update UX and integrity checks. Avoid caching sensitive shared data in service-worker caches; structured workspace data belongs in the local data layer.',
    outcome:'An installable app with honest offline behavior and portable local data.'
  },
  {
    id:'provenance', title:'Evidence & provenance', domain:'Evidence',
    minute:'A useful evidence system records what a claim says, where it came from, when it was published/retrieved, what geography it covers and what it cannot prove. Hashes can verify file integrity; they do not prove who authored an idea or caused an external event.',
    steps:['Classify each claim as measured fact, peer-reviewed evidence, institutional analysis, preliminary result, model/scenario or conceptual proposal.','Store source URL/publisher/date and retrieval date.','Record geography and population.','Separate announcement, award, construction and operational status.','Keep inference and causal claims distinct from temporal resemblance.','Export evidence records with the project backup.'],
    advanced:'Use immutable IDs for evidence records and link decisions/tasks to the evidence they relied on. Preserve superseded values rather than silently rewriting history when status changes.',
    expert:'For stronger provenance, use signed attestations or trusted publication systems in addition to hashes. Build reproducible transformations from source data to derived metrics and preserve uncertainty/margins of error where applicable.',
    outcome:'A traceable evidence chain that survives collaboration, updates and later review.'
  },
  {
    id:'hub', title:'Scope a regional food hub', domain:'Food logistics',
    minute:'A food hub is a coordination and infrastructure problem, not automatically a building project. Start with product flows, buyer requirements and missing services; then determine whether software/coordination, leased capacity or new infrastructure is justified.',
    steps:['Define commodities, counties and buyer classes.','Collect monthly supply/demand in common units.','Map pack, cold, freezer, dry storage, dock and transport capacity.','Quantify shrink, rejected loads, partial loads and deadhead.','Compare virtual coordination, leased shared space and dedicated hub options.','Set scale gates for committed volume, gross margin, utilization, energy and governance.'],
    advanced:'Model temperature classes, service windows, food-safety/traceability needs, backup energy and labor. A hub can lower some transaction/logistics costs while adding handling overhead; measure the net delivered-cost effect.',
    expert:'Design interoperable data contracts for lots, availability, quality, temperature and service levels. Finance only the bottleneck whose utilization can be supported by anchor demand and realistic maintenance.',
    outcome:'A demand-backed food-hub concept with measurable scale/no-scale thresholds.'
  },
  {
    id:'school', title:'School procurement pathway', domain:'Education + food',
    minute:'Schools can create stable demand, but procurement, food-safety, pack size, delivery timing, preparation labor and student acceptance determine whether a local-food pilot works. Use current TDA/district guidance before committing.',
    steps:['Extract menu/commodity demand by month.','Translate demand to grade, pack size and delivery window.','Verify procurement/food-safety rules.','Identify suppliers and aggregation options.','Pilot a small number of commodities with substitutes.','Track delivered cost, prep time, waste, acceptance and reliability.'],
    advanced:'Aggregate demand across schools only where procurement structures allow. Pair purchasing with CTE/agriculture learning and publish non-sensitive forward demand signals that producers can use for planning.',
    expert:'Evaluate whole-system cost rather than invoice price alone: receiving labor, storage, processing, waste and menu substitution can dominate. Build bid specifications that are outcome-oriented but non-discriminatory and legally compliant.',
    outcome:'A measured institutional procurement pilot that can scale only when operations and economics support it.'
  },
  {
    id:'water', title:'Water-productivity sprint', domain:'Water + agriculture',
    minute:'In water-constrained regions, optimize marketable food value and resilience per unit of scarce water rather than maximum yield per acre alone.',
    steps:['Meter source water and baseline irrigation.','Record marketable yield/revenue and pumping energy.','Introduce one scheduling/sensing or management change.','Hold other major variables as stable as practical.','Calculate marketable output and gross margin per acre-foot.','Publish anonymized results including failures.'],
    advanced:'Include soil moisture, weather/ET, crop-stage sensitivity and system application efficiency. Compare deficit strategies only with agronomic and economic context.',
    expert:'Use replicated or matched-field designs where practical, quantify uncertainty, account for rebound effects/acreage expansion, and link farm-level savings to basin/aquifer sustainability rather than assuming efficiency automatically reduces total withdrawals.',
    outcome:'A decision metric tied to water scarcity, energy and economic viability.'
  },
  {
    id:'rd', title:'No-hype R&D pilot', domain:'R&D',
    minute:'Novel technology earns scale through measured Texas-specific performance, not novelty. Define the baseline, the constraint and the stop/scale gate before buying equipment.',
    steps:['State one constraint in one sentence.','Choose one region/use case/buyer.','Define baseline/control.','Meter water, energy, labor, capex utilization and marketable output.','Pre-register stop/scale thresholds.','Publish limitations and maintenance requirements.'],
    advanced:'Include failure-mode testing, operator training and lifecycle repair dependencies. Separate technical feasibility from commercial viability and institutional fit.',
    expert:'Use statistically defensible comparisons where possible, sensitivity analysis for volatile inputs, transparent total-cost-of-ownership and replication across materially different Texas environments before generalized claims.',
    outcome:'A pilot capable of generating a credible scale/no-scale decision.'
  },
  {
    id:'resilience', title:'Food continuity tabletop exercise', domain:'Resilience + food',
    minute:'A tabletop exercise reveals dependencies before a real outage does. Pick a disruption, walk the food flow node-by-node, and turn every failure into a named corrective task.',
    steps:['Choose a 72-hour outage, road closure, heat wave or refrigeration failure.','List critical food assets and backup power.','Identify movers, receivers and temperature requirements.','Assume internet degradation and test the offline/local board.','Record failure points and communication gaps.','Create corrective tasks with owners and dates.'],
    advanced:'Add fuel, staffing, water, sanitation and cold-chain dependencies. Run at least one “compound failure” scenario rather than a single isolated outage.',
    expert:'Tie the exercise to recovery time objectives, minimum service levels, inventory buffers and mutual-aid agreements. Distinguish tabletop assumptions from tested field performance.',
    outcome:'A practical resilience backlog tied to real facilities, people and dependencies.'
  }
];
