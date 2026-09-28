const MODEL_DEFAULT = 'Qwen2.5-0.5B-Instruct-q4f16_1-MLC';
let engine=null;

export function aiCapabilities(){
  return {
    webgpu: !!navigator.gpu,
    workers: 'Worker' in window,
    secureContext: window.isSecureContext,
    defaultModel: MODEL_DEFAULT
  };
}

export async function loadAI({model=MODEL_DEFAULT,onProgress=()=>{}}={}){
  if(engine) return engine;
  if(!navigator.gpu) throw new Error('WebGPU is unavailable in this browser/device.');
  const webllm = await import('https://esm.run/@mlc-ai/web-llm@0.2.85');
  const worker = new Worker(new URL('./webllm-worker.js', import.meta.url), {type:'module'});
  const appConfig={...webllm.prebuiltAppConfig,cacheBackend:'indexeddb'};
  engine = await webllm.CreateWebWorkerMLCEngine(worker,model,{appConfig,initProgressCallback:onProgress});
  return engine;
}

export async function askAI(prompt,context='',options={}){
  const e=await loadAI(options);
  const system=`You are a local, privacy-preserving planning assistant inside the Texas Food Sovereignty OS. Separate sourced facts, inference, hypothesis and proposed experiments. Never invent current laws, grants, prices, endpoints or empirical results. Treat the provided application context as a planning snapshot that may become stale. Recommend verification when a decision depends on current regulation or funding. Optimize jointly for affordability, water stewardship, producer viability, resilience, access, food safety and ecological integrity.\n\nAPPLICATION CONTEXT:\n${context.slice(0,18000)}`;
  const chunks=await e.chat.completions.create({
    messages:[{role:'system',content:system},{role:'user',content:prompt}],
    temperature:0.35,max_tokens:900,stream:true
  });
  return chunks;
}

export async function unloadAI(){
  if(engine){ try{await engine.unload();}catch{} engine=null; }
}

export function deterministicPlan(prompt, context='', reason='WebLLM unavailable'){
  const q=String(prompt||'').toLowerCase();
  const focus=[];
  if(/water|irrigat|aquifer|drought/.test(q)) focus.push('water productivity and source sustainability');
  if(/price|cost|afford|grocery/.test(q)) focus.push('delivered-cost decomposition and household affordability');
  if(/broadband|connect|webrtc|trystero|network/.test(q)) focus.push('connectivity, reliability and peer-network constraints');
  if(/school|student|education|procurement/.test(q)) focus.push('institutional demand and education constraints');
  if(/health|telehealth|clinic/.test(q)) focus.push('health-access continuity with strict data separation');
  if(/emerg|disaster|outage|resilien/.test(q)) focus.push('continuity, redundancy and graceful degradation');
  if(/farm|producer|ranch|crop|food/.test(q)) focus.push('producer viability and food-system operations');
  if(!focus.length) focus.push('cross-domain feasibility, evidence quality and measurable outcomes');
  return [
    'DETERMINISTIC LOCAL PLANNING FALLBACK',
    `WebLLM was not used: ${reason}. This fallback uses fixed planning rules and does not generate new empirical claims.`,
    '',
    `Planning focus: ${focus.join('; ')}.`,
    '',
    '1. Define the decision: geography, affected people/organizations, time horizon, target outcome and non-negotiable safety/legal constraints.',
    '2. Establish the baseline: separate verified facts from local observations, assumptions and unknowns; record source date and geography.',
    '3. Map dependencies: water, energy, connectivity, transport, labor, cold chain, food safety, procurement, finance and governance as applicable.',
    '4. Identify the dominant bottleneck before adding technology. Prefer using underused existing capacity before new capital expenditure.',
    '5. Design the smallest reversible pilot with an owner, milestones, stop conditions, baseline metrics and a comparison or counterfactual where feasible.',
    '6. Measure outcomes: delivered food cost, access, reliability, producer margin, water/energy intensity, waste and implementation burden. Keep measured and modeled values separate.',
    '7. Red-team the plan: failure during heat, outage, drought, network loss, supplier failure, funding loss and institutional turnover.',
    '8. Verify current laws, grants, program status, engineering requirements and prices against primary sources before commitment.',
    '',
    'Suggested room handoff: create one shared project, break it into tasks, attach evidence notes as comments, record advisory proposals separately from authoritative decisions, and export a JSON snapshot at major milestones.',
    '',
    `Prompt received: ${String(prompt).slice(0,1200)}`
  ].join('\n');
}
