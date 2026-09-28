# Evidence and source ledger

Research snapshot: **2026-09-28**. Re-check time-sensitive programs, funding, rules, prices, drought status and procurement requirements before operational use.

## Texas baseline

| Topic | Source | What this bundle uses |
|---|---|---|
| Farm operations and land in farms | USDA NASS, 2022 State Agriculture Overview — Texas — https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=texas&year=2022 | 231,000 farm operations; about 125 million acres in farms in 2022. |
| Household food security | USDA ERS, Household Food Security in the United States in 2024 — https://ers.usda.gov/publications/113622 | Texas 2022–2024 household food-insecurity estimate and uncertainty interval. |
| Natural regions and broad rainfall gradient | Texas Parks & Wildlife Department, Texas Ecoregions — https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions | Ten natural regions and broad ecological/rainfall context. |
| Water planning | Texas Water Development Board, State Water Planning — https://www.twdb.texas.gov/waterplanning/swp/ | Sixteen regional water-planning areas and water-user-group planning structure. |
| Agricultural irrigation context | Texas A&M Real Estate Research Center, Balancing Act — https://trerc.tamu.edu/article/balancing-act-weather-irrigation-and-meeting-the-states-agriculture-needs/ | Regional precipitation differences, irrigation reliance and water-productivity context. |
| High Plains conservation systems | Southern SARE, Water Conservation on the High Plains — https://southern.sare.org/sare-in-your-state/texas/water-conservation-on-the-high-plains/ | Integrated crop/livestock, precision irrigation and water-conservation field context. |

## Current program hooks

These are included as examples of mechanisms that collaborators can investigate, not promises of eligibility or funding.

| Program | Source | Use in the OS |
|---|---|---|
| AgPro | Texas Department of Agriculture — https://texasagriculture.gov/Grants-Services/Rural-Economic-Development/Texas-Agricultural-Finance-Authority/Texas-Agricultural-Grant/AgPro | Producer infrastructure/efficiency funding context and current program status. |
| Farm Fresh Initiative | Texas Department of Agriculture — https://texasagriculture.gov/Home/Healthy-Living/Texas-Farm-Fresh/For-Child-Nutrition-Programs | Farm-to-school/local purchasing resources for child-nutrition programs. |
| Specialty Crop Multi-State Program | Texas Department of Agriculture — https://texasagriculture.gov/Grants-Services/Specialty-Crop-Multi-State-Program | Cross-state research/collaboration funding context for specialty crops. |

## Technology sources

| Technology | Source | Important boundary |
|---|---|---|
| Trystero | https://github.com/dmotz/trystero | Used for decentralized discovery and direct WebRTC room traffic. Room codes are not identity; some networks require TURN. |
| WebLLM | https://github.com/mlc-ai/web-llm and https://webllm.mlc.ai/docs/ | Optional local WebGPU inference. First model load needs network access and substantial storage/memory; output is not an authoritative source. |

## Evidence labels used by the application

- **Sourced fact:** a quantitative or descriptive claim linked to a cited source.
- **Operational inference:** a systems-design conclusion derived from multiple constraints; useful for planning but not itself an observed fact.
- **Pilot hypothesis:** a proposition that should be tested with a baseline, metrics and a scale/no-scale gate.
- **Scenario:** a user-controlled calculation or exercise; it is not a forecast.

## Verification practice

For any project that affects public funds, food safety, regulated facilities, water rights, procurement, contracts, land use or institutional records, verify current requirements with the competent authority and qualified professionals. Preserve source dates and do not silently convert a planning assumption into a factual claim.

## Connectivity, digital opportunity and cross-domain enabling infrastructure

These layers are included because rural food production, logistics, institutional procurement, training, public access and emergency continuity increasingly depend on communications infrastructure. Availability does not by itself prove affordability, performance, adoption or operational readiness.

| Layer | Source | What this bundle uses |
|---|---|---|
| Texas BEAD | Texas Broadband Development Office — https://comptroller.texas.gov/programs/broadband/funding/bead/ | Approved Final Proposal status, award/project scale and the distinction between selected/funded locations and completed operational service. |
| BOOT I / II | Texas Broadband Development Office — https://comptroller.texas.gov/programs/broadband/funding/boot/ | Award scale, location categories, completion/status transparency and rural infrastructure context. |
| FCC National Broadband Map / Fabric concepts | FCC — https://help.bdc.fcc.gov/hc/en-us/articles/10467446103579-How-to-Use-the-FCC-s-National-Broadband-Map | Mapping literacy, location/availability challenge concepts and the boundary between reported availability and real-world performance/adoption. |
| Texas household digital access | U.S. Census Bureau ACS B28003 — https://data.census.gov/table/ACSDT1Y2024.B28003?g=040XX00US48 | Statewide household computer/internet-subscription context; local analysis still needs geography-appropriate tables and margins of error. |
| E-Rate | USAC — https://www.usac.org/e-rate/ | School/library connectivity-program context and current-guidance boundary. |
| Texas libraries | Texas State Library and Archives Commission — https://www.tsl.texas.gov/ldn/accreditation | Library broadband/E-Rate support and public-access anchor context. |
| Rural telehealth | Texas HHSC — https://resources.hhs.texas.gov/rfa/hhs0017228 | Rural tele-connectivity program context; health records are explicitly outside this food collaboration workspace. |
| Workforce/digital skills | Texas Workforce Commission — https://www.twc.texas.gov/ | Digital-skills/workforce-development context. |

## Connectivity requirements atlas provenance

The bundle includes a searchable 111-section requirements atlas derived from the project's earlier **Texas Connectivity & Opportunity Operating System** requirements. The integrated application preserves the section sequence/headings and maps them to implementation relevance; see `docs/CONNECTIVITY_ATLAS.md`.
