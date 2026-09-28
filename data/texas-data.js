export const SNAPSHOT_DATE = '2026-09-28';

export const baseline = [
  {
    id: 'land', label: 'Agricultural operations', value: '231,000', sub: '2022 Census of Agriculture',
    detail: 'USDA/NASS reports 231,000 Texas farm operations operating about 125 million acres in 2022.',
    source: 'https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=texas&year=2022'
  },
  {
    id: 'acreage', label: 'Land in farms', value: '125M acres', sub: '2022',
    detail: 'The scale of the existing agricultural base makes producer efficiency, processing and distribution upgrades at least as important as creating new production.',
    source: 'https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=texas&year=2022'
  },
  {
    id: 'food-insecurity', label: 'Food insecurity', value: '17.6%', sub: 'TX households, avg. 2022–2024',
    detail: 'USDA ERS estimated Texas household food insecurity at 17.6% ±1.01 percentage points for the 2022–2024 average; very low food security was 6.6% ±0.63.',
    source: 'https://ers.usda.gov/publications/113622'
  },
  {
    id: 'rainfall', label: 'Rainfall span', value: '≈8–56 in/yr', sub: 'far west → east',
    detail: 'Texas Parks & Wildlife describes annual rainfall from about eight inches in far-west deserts to about 56 inches in east-Texas swamps.',
    source: 'https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions'
  },
  {
    id: 'regions', label: 'Natural regions', value: '10', sub: 'TPWD ecoregions',
    detail: 'Piney Woods, Gulf Prairies & Marshes, Post Oak Savannah, Blackland Prairies, Cross Timbers, South Texas Plains, Edwards Plateau, Rolling Plains, High Plains and Trans-Pecos.',
    source: 'https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions'
  },
  {
    id: 'water-planning', label: 'Water planning regions', value: '16', sub: 'TWDB regional process',
    detail: 'Texas state water plans are assembled from 16 regional water plans and address municipal, irrigation, manufacturing, livestock, mining and power-sector needs.',
    source: 'https://www.twdb.texas.gov/waterplanning/swp/'
  }
];

export const priceSystem = [
  {
    stage: 'Inputs & production', pressure: 'Water, fertilizer, feed, energy, labor, financing, weather losses',
    near: 'Irrigation scheduling, soil testing, cooperative purchasing, on-farm energy efficiency, crop/livestock matching to water budget',
    structural: 'Regional input cooperatives, precision agriculture, drought-adapted genetics, agrivoltaic pilots, wastewater/reuse integration where safe',
    metric: '$/marketable lb and acre-ft/marketable lb'
  },
  {
    stage: 'Aggregation', pressure: 'Small lots, inconsistent grading, missing wash/pack capacity and fragmented buyer discovery',
    near: 'Shared aggregation schedules, producer directories, standardized cases/labels and digital inventory exchange',
    structural: 'Food hubs, producer co-ops, packhouses, mobile cooling and regional QA systems',
    metric: 'fill rate, rejected loads, aggregation cost/case'
  },
  {
    stage: 'Processing', pressure: 'Insufficient local slaughter, freezing, milling, canning and value-add capacity in some regions',
    near: 'Map underused licensed capacity and coordinate production windows',
    structural: 'Shared-use processing commons, modular/mobile processing where lawful, co-packing, freezer and dry-storage networks',
    metric: 'processing utilization and cents/lb conversion cost'
  },
  {
    stage: 'Storage & cold chain', pressure: 'Spoilage, seasonal gluts, power outages, reefer availability and fragmented storage',
    near: 'Shared cold-room booking, temperature logs and surplus alerts',
    structural: 'Distributed cold stores, thermal storage, backup power, pre-cooling and resilient microgrids',
    metric: 'shrink %, kWh/case and days of regional inventory'
  },
  {
    stage: 'Transport', pressure: 'Long distances, partial loads, deadhead miles, congestion and last-mile cost',
    near: 'Load pooling, backhaul matching and route coordination across farms, schools, grocers and food banks',
    structural: 'Cross-dock nodes near metro/rural interfaces, rail/intermodal where economical, standardized reusable containers',
    metric: 'loaded-mile %, cost/case-mile and on-time %'
  },
  {
    stage: 'Wholesale & retail', pressure: 'Rent, energy, labor, inventory risk, market concentration and low-volume rural stores',
    near: 'Transparent local bid boards, direct institutional contracts, cooperative merchandising and dynamic markdowns for perishables',
    structural: 'Community groceries, rural distribution pooling, public-market infrastructure and producer-to-retailer data interoperability',
    metric: 'farmgate-to-shelf spread and basket price'
  },
  {
    stage: 'Household access', pressure: 'Income volatility, distance, transport, cooking equipment/time and benefit access',
    near: 'Mobile markets, pickup points, culturally relevant bulk boxes, school/community distribution and benefit-navigation support',
    structural: 'Walkable food access, edible landscapes, community kitchens, neighborhood freezers and resilient meal networks',
    metric: 'healthy basket affordability and minutes to access'
  }
];

export const ecoregions = [
  {
    id:'pineywoods', name:'Piney Woods', rainfall:'≈36–50 in/yr', water:'comparatively rainfall-rich; flood and drainage risk still matter',
    assets:['long growing season','forestry/by-product biomass','pasture and livestock','proximity to East Texas population centers'],
    strategy:['rain-fed specialty crops where soils fit','agroforestry and silvopasture trials','distributed cool storage','soil acidity management','flood-resilient farm access'],
    caution:'High humidity raises disease and post-harvest cooling requirements.', source:'https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions'
  },
  {
    id:'gulf', name:'Gulf Prairies & Marshes', rainfall:'≈30–50 in/yr', water:'surface water, rainfall and coastal salinity/flood interactions',
    assets:['300+ day growing season in parts','major ports and metro demand','rice/row-crop heritage','aquaculture potential'],
    strategy:['storm-resilient cold chain','salt/flood-tolerant trials','controlled drainage','urban-edge greenhouses','port-linked food logistics'],
    caution:'Hurricanes, storm surge, heat, humidity and salinity require redundancy and elevated critical equipment.', source:'https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions'
  },
  {
    id:'postoak', name:'Post Oak Savannah', rainfall:'≈28–40 in/yr', water:'moderate rainfall with seasonal peaks',
    assets:['mixed woodland/grassland','cattle base','central access between major metros'],
    strategy:['integrated crop-livestock systems','forage diversification','orchards where soil/site fit','small regional food hubs','prescribed ecological management through qualified practitioners'],
    caution:'Sandy/acidic soils in many uplands require site-specific nutrient and water management.', source:'https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions'
  },
  {
    id:'blackland', name:'Blackland Prairies', rainfall:'≈28–40 in/yr', water:'rainfall moderate; heavy clays influence infiltration and field timing',
    assets:['highly productive soils','Dallas–Fort Worth/Austin–San Antonio market access','established row crops and livestock'],
    strategy:['peri-urban market farming','institutional procurement','soil-cover systems','stormwater-to-production pilots','regional milling/packing'],
    caution:'Urban expansion competes for agricultural land; heavy clay can magnify drought/flood swings.', source:'https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions'
  },
  {
    id:'crosstimbers', name:'Cross Timbers', rainfall:'moderate, variable', water:'seasonal moisture limitation',
    assets:['mixed grazing/cropping','large north-central consumer markets','diverse soils and landscapes'],
    strategy:['drought-aware forage systems','soil-moisture monitoring','community-scale aggregation','heat-adapted horticulture under shade/protection'],
    caution:'Variable soils mean county-level agronomy should override broad ecoregion assumptions.', source:'https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions'
  },
  {
    id:'south', name:'South Texas Plains', rainfall:'low to moderate; heat-intensive', water:'high evaporative demand; groundwater/surface constraints vary sharply',
    assets:['long season','winter vegetable opportunity','ranching','cross-border/port logistics'],
    strategy:['drip irrigation','shade/protected cropping','heat-adapted varieties','cool-chain first-mile investment','brackish/reuse R&D only with crop-water economics'],
    caution:'Heat and drought can make water and cooling energy the limiting variables.', source:'https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions'
  },
  {
    id:'edwards', name:'Edwards Plateau', rainfall:'≈15–34 in/yr', water:'karst aquifers, springs and shallow soils require careful watershed stewardship',
    assets:['ranching','Hill Country markets','perennial systems','tourism-linked local food demand'],
    strategy:['managed grazing','drought-tolerant perennials','rainwater capture for non-potable suitable uses','small processing nodes','aquifer-protective land management'],
    caution:'Do not equate visible springs with unlimited supply; recharge and ecological flows matter.', source:'https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions'
  },
  {
    id:'rolling', name:'Rolling Plains', rainfall:'≈22–30 in/yr', water:'variable rainfall and drought exposure',
    assets:['rangeland','cotton and grains','headwaters and broad transport corridors'],
    strategy:['dryland crop rotations','forage-livestock integration','low-pressure precision irrigation where available','grain/forage storage','wind/solar co-location pilots'],
    caution:'Profitability should be optimized per unit of water, not maximum yield per acre.', source:'https://tpwd.texas.gov/wildlife/wildlife-diversity/wildscapes/wildscapes-plant-guidance-by-ecoregion/rolling-plains/'
  },
  {
    id:'highplains', name:'High Plains', rainfall:'≈18–25 in/yr broad pattern', water:'Ogallala-dependent irrigation in many areas; declining well capacity is a structural constraint',
    assets:['large-scale crop and livestock expertise','grain/feed infrastructure','strong agricultural R&D ecosystem','solar/wind resource'],
    strategy:['variable-rate/low-pressure irrigation','limited irrigation targeted to highest-value response','sorghum/forage and dryland systems','integrated crop-livestock','agrivoltaic and protected-horticulture pilots near demand/energy nodes'],
    caution:'Do not use energy-intensive desalination to preserve low-value irrigated acreage without full water-energy-crop economics.', source:'https://trerc.tamu.edu/article/balancing-act-weather-irrigation-and-meeting-the-states-agriculture-needs/'
  },
  {
    id:'transpecos', name:'Trans-Pecos', rainfall:'≈8–13 in/yr in driest areas', water:'arid; groundwater and spring systems are limiting natural capital',
    assets:['solar resource','specialty desert crops in suitable sites','border logistics','high-value controlled-environment opportunity near demand'],
    strategy:['water-budget-first planning','closed-loop protected agriculture where economics work','solar-powered cooling','salinity-aware crop selection','water reuse with rigorous treatment and monitoring'],
    caution:'A greenhouse does not remove water/energy limits; economics must include cooling load and source-water quality.', source:'https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions'
  }
];

export const waterStack = [
  {layer:'Measure', now:'soil-moisture sensors, meters, evapotranspiration and weather data', why:'You cannot manage acre-feet or detect leaks reliably without measurement.', maturity:'proven'},
  {layer:'Schedule', now:'irrigate to crop stage and measured depletion rather than calendar habit', why:'Targets water to the period with highest marginal crop response.', maturity:'proven'},
  {layer:'Apply efficiently', now:'low-pressure/low-energy precision application, drip where crop/system fit, maintenance and nozzle audits', why:'Reduces avoidable conveyance and application losses.', maturity:'proven'},
  {layer:'Retain in soil', now:'residue, cover, reduced disturbance where agronomically appropriate, infiltration and organic-matter strategies', why:'Improves the fraction of rainfall that remains plant-available, but outcomes are site-dependent.', maturity:'proven/site-specific'},
  {layer:'Change enterprise mix', now:'shift marginal irrigated acreage toward dryland crops, forage/livestock or higher-value limited-irrigation crops', why:'Protects farm income per unit of scarce water rather than chasing maximum irrigated acres.', maturity:'proven/site-specific'},
  {layer:'Reuse', now:'municipal/industrial reclaimed water or captured process water where law, quality and food-safety controls permit', why:'Can substitute for potable/freshwater demands and improve drought resilience.', maturity:'infrastructure-dependent'},
  {layer:'Store/recharge', now:'aquifer storage/recovery and managed recharge in hydrogeologically appropriate projects', why:'Moves surplus-period water into drought reserves; requires permitting, monitoring and suitable geology.', maturity:'project-specific'},
  {layer:'Treat brackish water', now:'blending/desalination for higher-value uses when salinity and energy economics support it', why:'Adds a supply option but can be uneconomic for lower-value field crops and creates concentrate-management requirements.', maturity:'selective'}
];

export const rdStack = [
  {tech:'Precision irrigation + decision support', readiness:'Deploy now', role:'farms, irrigation districts, universities, vendors', benefit:'water productivity, pumping-energy reduction, better yield targeting', limit:'sensor maintenance, connectivity, calibration and farmer workflow integration', evidence:'Texas High Plains work and mainstream irrigation practice'},
  {tech:'Integrated crop–livestock systems', readiness:'Deploy / adapt', role:'ranches, farms, extension, lenders', benefit:'diversifies revenue and can reduce irrigation/input intensity', limit:'management complexity, fencing/water infrastructure and market fit', evidence:'long-running Texas High Plains systems research'},
  {tech:'Protected cropping / high tunnels', readiness:'Deploy selectively', role:'small/mid farms, schools, urban growers', benefit:'season extension, pest/weather protection and quality consistency', limit:'heat management, labor, capital and market price'},
  {tech:'Hydroponics / CEA', readiness:'Selective commercial', role:'urban/peri-urban growers, grocers, institutions, energy partners', benefit:'high output per land area and controllable water loops', limit:'electricity/cooling cost, skilled operations, crop economics; not a universal staple-food solution'},
  {tech:'Agrivoltaics', readiness:'Pilot → selective scale', role:'producers, utilities, researchers, solar developers', benefit:'dual land use, crop microclimate potential, energy revenue and possible water benefits', limit:'crop response varies; structures/capex/interconnection and farm machinery access matter'},
  {tech:'Computer vision quality grading', readiness:'Deploy / pilot', role:'packers, food hubs, processors, universities', benefit:'faster sorting, consistent grades and waste diversion', limit:'dataset bias, lighting/calibration and false rejects'},
  {tech:'Demand forecasting + pooled procurement', readiness:'Deploy now', role:'schools, hospitals, grocers, hubs, producers', benefit:'aggregates demand, reduces uncertainty and improves truck utilization', limit:'interoperability and procurement-cycle timing'},
  {tech:'Thermal-energy storage for cold chain', readiness:'Deploy / project engineering', role:'warehouses, groceries, food hubs, utilities', benefit:'ride-through, peak-shaving and spoilage resilience', limit:'site engineering, controls and capital'},
  {tech:'Anaerobic digestion / nutrient recovery', readiness:'Selective commercial', role:'dairies, processors, municipalities', benefit:'waste treatment, biogas and nutrient cycling', limit:'feedstock consistency, digestate management, economics and permitting'},
  {tech:'Biochar / pyrolysis', readiness:'Pilot → selective', role:'forestry/ag residues, soil researchers, municipalities', benefit:'potential soil amendment plus durable carbon when produced correctly', limit:'crop/soil response is variable; contaminant, feedstock and economics controls required'},
  {tech:'Robotics / autonomous weeding', readiness:'Commercializing', role:'specialty crop growers, equipment firms, colleges', benefit:'labor productivity and reduced herbicide use in suitable systems', limit:'capex, field conditions, repair capacity and safety'},
  {tech:'Brackish-water desalination for agriculture', readiness:'R&D / niche', role:'water utilities, high-value growers, universities', benefit:'can unlock otherwise unsuitable water for some uses', limit:'energy and concentrate; often poor economics for low-value field crops'}
];

export const institutions = [
  {sector:'State agriculture', entities:'Texas Department of Agriculture; Texas Agricultural Finance Authority', capabilities:'producer programs, market development, child-nutrition Farm Fresh resources, grants and agricultural finance', collaboration:'publish demand signals; connect producers to schools; align infrastructure grants with regional food-hub needs', source:'https://texasagriculture.gov/'},
  {sector:'Water', entities:'Texas Water Development Board; 16 regional water planning groups; groundwater conservation districts; river authorities', capabilities:'water planning, supply strategies, data, financing and local groundwater management', collaboration:'attach food-production scenarios to water budgets and drought plans; share non-sensitive project assumptions', source:'https://www.twdb.texas.gov/waterplanning/swp/'},
  {sector:'Environment & public health', entities:'TCEQ; DSHS; local health departments', capabilities:'water quality, environmental permitting, retail-food and food-safety oversight', collaboration:'bring regulators into pilots early; encode compliance gates into project checklists', source:'https://www.dshs.texas.gov/retail-food-establishments'},
  {sector:'Education', entities:'Texas Education Agency; school districts; colleges; universities; extension', capabilities:'large meal demand, workforce education, demonstration farms, research and procurement', collaboration:'aggregate school demand, publish crop calendars, create paid work-based learning and evaluate pilots'},
  {sector:'Health & nutrition', entities:'HHSC; hospitals; clinics; food banks; community organizations', capabilities:'nutrition assistance, medically vulnerable populations, emergency feeding and institutional purchasing', collaboration:'coordinate healthy-food access and resilience without disclosing personal health data'},
  {sector:'Local & regional government', entities:'counties; municipalities; councils of governments; transit and emergency-management bodies', capabilities:'land use, public facilities, emergency logistics, some procurement and economic-development tools', collaboration:'identify sites for markets/hubs/cold storage; coordinate disaster food logistics and public infrastructure'},
  {sector:'Federal', entities:'USDA AMS/FNS/NRCS/FSA/Rural Development; FDA; EPA; SBA', capabilities:'nutrition programs, conservation assistance, farm credit/safety nets, rural infrastructure, food safety and small-business support', collaboration:'stack compatible programs; maintain grant/compliance calendar; use common project data room'},
  {sector:'Private market', entities:'farms, ranches, processors, distributors, truckers, grocers, restaurants, insurers, lenders and technology firms', capabilities:'production, capital, logistics, retail execution and innovation', collaboration:'share non-sensitive capacity/demand windows, publish needs/offers, co-invest against transparent service-level metrics'},
  {sector:'Families & neighborhoods', entities:'households, mutual-aid groups, gardeners, parent groups, civic associations', capabilities:'demand knowledge, food skills, small-scale production, local distribution and feedback', collaboration:'co-design pickup points, community kitchens, garden networks and household resilience plans'}
];

export const programs = [
  {name:'TDA AgPro – Agriculture Production Resource Opportunity', status:'2026 application round closed; award notices expected by Nov. 15, 2026 per TDA', use:'producer equipment, infrastructure and efficiency investments; grants $5,000–$500,000 with match varying by award size', source:'https://texasagriculture.gov/Grants-Services/Rural-Economic-Development/Texas-Agricultural-Finance-Authority/Texas-Agricultural-Grant/AgPro'},
  {name:'Texas Farm Fresh Initiative', status:'ongoing TDA child-nutrition resource', use:'helps schools, summer meal programs and child-care centers connect with local producers and agricultural education', source:'https://texasagriculture.gov/Home/Healthy-Living/Texas-Farm-Fresh/For-Child-Nutrition-Programs'},
  {name:'USDA Specialty Crop Multi-State Program via TDA', status:'FY2026 cycle active in 2026; verify current deadline before acting', use:'multi-state specialty-crop collaboration on research, food safety, pests/disease and related competitiveness issues', source:'https://texasagriculture.gov/Grants-Services/Specialty-Crop-Multi-State-Program'},
  {name:'TWDB State / Regional Water Planning', status:'continuous five-year planning cycle', use:'regional strategies, project needs and water-supply planning context for agriculture and communities', source:'https://www.twdb.texas.gov/waterplanning/swp/'},
  {name:'USDA NRCS conservation assistance', status:'ongoing programs with local sign-up windows', use:'technical and financial assistance for eligible conservation practices; local availability and ranking vary', source:'https://www.nrcs.usda.gov/programs-initiatives'}
];

export const playbooks = [
  {role:'Family / neighborhood', horizon:'0–90 days', actions:['Build a baseline weekly healthy-food basket price.','Map the nearest full-service grocery, farm stand, school meal sites and emergency food options.','Coordinate a 5–20 household bulk-buying club only for products with clear storage and food-safety plans.','Create a neighborhood surplus/need board without publishing sensitive household data.','Pilot herbs, greens or heat-appropriate garden crops where water use is justified.'], metric:'basket price, food waste, travel time, households served'},
  {role:'Producer / rancher', horizon:'0–12 months', actions:['Calculate gross margin per acre-foot or per inch of irrigation, not only yield/acre.','Publish a non-sensitive availability calendar to hubs, schools and retailers.','Identify one aggregation/processing bottleneck that lowers price or raises shrink.','Run one measured water/energy efficiency trial with a control.','Standardize pack size, lot ID, temperature and traceability data.'], metric:'$/acre-foot, shrink, rejected loads, contracted demand'},
  {role:'School / college', horizon:'0–12 months', actions:['Aggregate annual demand by commodity and month.','Use TDA Farm Fresh resources to connect with qualifying local suppliers.','Create realistic bid lots that small/mid producers can meet where procurement rules permit.','Pair purchasing with agriculture/career education.','Publish anonymized demand forecasts into collaboration rooms.'], metric:'local spend, meal cost, supplier count, student learning outcomes'},
  {role:'Grocer / distributor', horizon:'0–12 months', actions:['Measure shrink by SKU and cause.','Share backhaul and partial-load windows.','Pilot direct regional aggregation for suitable products.','Use dynamic markdown/donation routing before spoilage.','Publish packaging and service-level requirements clearly to producers.'], metric:'shrink, fill rate, cents/case-mile, local supplier lead time'},
  {role:'City / county / COG', horizon:'0–24 months', actions:['Map cold storage, licensed kitchens, markets, freight nodes and food-access gaps.','Inventory publicly controlled sites that could host markets, lockers or resilient cooling.','Integrate food logistics into emergency-management exercises.','Convene schools, hospitals, food banks, producers, utilities and logistics providers around one measurable corridor pilot.','Publish neutral permitting and funding guides.'], metric:'capacity mapped, projects launched, emergency days-of-supply, access time'},
  {role:'State / regional institution', horizon:'1–5 years', actions:['Align water, agriculture, economic-development, nutrition and transport data definitions.','Fund interoperable infrastructure rather than isolated pilots where lawful and appropriate.','Make program timelines machine-readable.','Evaluate projects on affordability, water, resilience, producer viability and access simultaneously.','Preserve regional autonomy because Texas water/ecology differs sharply by place.'], metric:'program stacking, data interoperability, cost per sustained unit of capacity'},
  {role:'University / R&D', horizon:'0–5 years', actions:['Design pilots around an explicit Texas ecoregion and buyer.','Publish negative results and full water/energy/cost accounting.','Use open schemas for non-sensitive trial data.','Include extension, producers, buyers and regulators before equipment selection.','Define scale/no-scale gates before the pilot starts.'], metric:'replication, unit economics, water/energy intensity, adoption after trial'},
  {role:'Corporation / financier', horizon:'0–5 years', actions:['Offer offtake, logistics capacity, equipment finance or energy services against measurable service levels.','Avoid locking communities into proprietary data formats.','Support modular infrastructure that remains useful if one vendor exits.','Publish total lifecycle costs and repair dependencies.','Use blended finance only when the public benefit is transparent and auditable.'], metric:'cost of capital, downtime, vendor concentration, local retained value'}
];

export const seedProjects = [
  {id:'seed-hub',title:'Regional Food Hub + Cold Chain Pilot',domain:'logistics',region:'Blackland Prairies',lead:'Unassigned consortium',status:'concept',impact:'Reduce shrink and partial-load cost by aggregating farm, school, hospital and grocery demand.',needs:'site, cold-room sizing, buyer commitments, producer volumes, energy profile',updatedAt:0},
  {id:'seed-water',title:'High Plains Water Productivity Benchmark',domain:'water',region:'High Plains',lead:'Producer + extension working group',status:'concept',impact:'Compare gross margin and marketable output per acre-foot across enterprise options.',needs:'farmer consent, meter data, agronomy protocol, privacy-safe reporting',updatedAt:0},
  {id:'seed-school',title:'Farm Fresh Demand Signal Exchange',domain:'education',region:'Statewide',lead:'School/producer network',status:'concept',impact:'Turn school menu forecasts into producer-readable seasonal demand without disclosing sensitive purchasing data.',needs:'commodity schema, procurement review, district participants, producer directory',updatedAt:0},
  {id:'seed-rural',title:'Rural Grocery Backhaul Pool',domain:'retail',region:'Multi-region',lead:'Retail/logistics cooperative',status:'concept',impact:'Pool inbound and return capacity for low-volume communities to lower freight cost.',needs:'carrier windows, store orders, cross-dock rules, liability and temperature standards',updatedAt:0},
  {id:'seed-cea',title:'Heat-Resilient Protected Agriculture Testbed',domain:'R&D',region:'South Texas Plains',lead:'University + producer + buyer',status:'concept',impact:'Measure real cooling, water, labor and quality economics for high-value crops under Texas heat.',needs:'buyer spec, site, controls, baseline field comparison, water/energy metering',updatedAt:0},
  {id:'seed-resilience',title:'72-Hour Community Food Continuity Drill',domain:'resilience',region:'Gulf Prairies & Marshes',lead:'Local emergency food coalition',status:'concept',impact:'Test backup refrigeration, communications and distribution during grid/transport disruption.',needs:'food bank, grocer, school kitchen, backup power, emergency management participation',updatedAt:0}
];

export const guides = [
  {id:'room', title:'Start a secure collaboration room', level:'5 minutes', steps:['Choose a room code that identifies the project, not a person.','For sensitive working groups, create and share a strong room password out-of-band.','Select Nostr discovery (default), MQTT, BitTorrent or IPFS discovery.','Enter display name, organization type and Texas region; avoid personal data not needed for the work.','Join. When another peer connects, the app exchanges presence and a timestamp-merged workspace snapshot directly over WebRTC.','Export a JSON backup after important sessions.'], outcome:'A browser-to-browser workspace with peer presence, shared projects, tasks, comments, proposals, decisions, chat and resource exchange.'},
  {id:'hub', title:'Scope a regional food hub', level:'30–90 minutes', steps:['Define the foods, counties and buyer classes; do not start with a building.','Collect monthly supply and demand volumes in common units.','Map current pack, cold, freezer, dry storage and dock capacity.','Quantify shrink, partial loads, rejected deliveries and deadhead miles.','Model at least three operating forms: virtual coordination, leased shared space, dedicated hub.','Set scale gates: committed volume, gross margin, utilization, energy cost and governance.'], outcome:'A demand-backed hub concept instead of an infrastructure-first proposal.'},
  {id:'school', title:'Build a school procurement pathway', level:'1–4 weeks', steps:['Extract the district menu/commodity calendar.','Translate demand to pack size, grade, delivery frequency and season.','Check applicable procurement and food-safety requirements with district/TDA guidance.','Use Farm Fresh resources to identify producers.','Pilot 1–3 commodities with a documented substitute plan.','Track delivered cost, preparation time, waste, student acceptance and supplier reliability.'], outcome:'A procurement pilot with evidence on cost and operational fit.'},
  {id:'water', title:'Run a water-productivity sprint', level:'1 crop cycle', steps:['Meter source water and establish the existing schedule.','Record marketable yield, crop revenue and direct energy cost.','Add soil/weather sensing or an improved scheduling protocol.','Hold other major variables as constant as practical.','Calculate marketable lb/acre-foot and gross margin/acre-foot.','Share anonymized results, including failures.'], outcome:'A decision metric tied to scarce water rather than maximum yield alone.'},
  {id:'rd', title:'Design a no-hype R&D pilot', level:'30 minutes to design', steps:['State the Texas constraint in one sentence.','Choose one ecoregion, one crop/food process and one buyer.','Define baseline and control before selecting technology.','Meter water, energy, labor, capital utilization and marketable output.','Pre-register stop/scale thresholds.','Publish limitations and maintenance requirements with the results.'], outcome:'A pilot that can produce a credible scale/no-scale decision.'},
  {id:'resilience', title:'Food continuity tabletop exercise', level:'60 minutes', steps:['Pick a scenario: 72-hour outage, road closure, heat wave or refrigeration failure.','List critical food assets and backup power at each node.','Identify who can move product, who can receive it and the temperature constraints.','Simulate a communications outage and use the local/offline board.','Record failures and single points of dependency.','Create corrective tasks with owners and dates.'], outcome:'A practical resilience backlog tied to real facilities and responsibilities.'}
];

export const sources = [
  {org:'USDA NASS', title:'2022 State Agriculture Overview – Texas', url:'https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=texas&year=2022', use:'farm operations, land, crops and livestock'},
  {org:'USDA ERS', title:'Household Food Security in the United States in 2024', url:'https://ers.usda.gov/publications/113622', use:'Texas 2022–2024 food insecurity estimates and methods'},
  {org:'Texas Parks & Wildlife', title:'Texas Ecoregions', url:'https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions', use:'10 natural regions, rainfall and landscape context'},
  {org:'Texas Water Development Board', title:'State Water Planning', url:'https://www.twdb.texas.gov/waterplanning/swp/', use:'16-region planning framework, water user groups and state plan'},
  {org:'Texas A&M Real Estate Research Center', title:'Balancing Act: Weather, Irrigation, and Meeting the State’s Agriculture Needs', url:'https://trerc.tamu.edu/article/balancing-act-weather-irrigation-and-meeting-the-states-agriculture-needs/', use:'regional precipitation, irrigation dependence and water-efficiency context'},
  {org:'Texas Department of Agriculture', title:'AgPro Grant Program', url:'https://texasagriculture.gov/Grants-Services/Rural-Economic-Development/Texas-Agricultural-Finance-Authority/Texas-Agricultural-Grant/AgPro', use:'2026 producer infrastructure/efficiency grant status and parameters'},
  {org:'Texas Department of Agriculture', title:'Farm Fresh Initiative for Child Nutrition Programs', url:'https://texasagriculture.gov/Home/Healthy-Living/Texas-Farm-Fresh/For-Child-Nutrition-Programs', use:'farm-to-school connections and local purchasing resources'},
  {org:'Texas Department of Agriculture', title:'Specialty Crop Multi-State Program', url:'https://texasagriculture.gov/Grants-Services/Specialty-Crop-Multi-State-Program', use:'multi-state specialty crop research/collaboration funding context'},
  {org:'Southern SARE', title:'Water Conservation on the High Plains', url:'https://southern.sare.org/sare-in-your-state/texas/water-conservation-on-the-high-plains/', use:'integrated crop/livestock and water-conservation research context'},
  {org:'MLC', title:'WebLLM Documentation', url:'https://webllm.mlc.ai/docs/', use:'in-browser WebGPU LLM, workers and model caching'},
  {org:'Trystero', title:'Trystero WebRTC peer discovery and room API', url:'https://github.com/dmotz/trystero', use:'decentralized peer discovery, direct WebRTC actions, encryption and TURN guidance'}
];

export const schemaVersion = 4;
