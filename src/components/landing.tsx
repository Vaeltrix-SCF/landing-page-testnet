"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PaymentHero from "./payment-hero";
import { useTextReveal } from "./use-text-reveal";

const steps = [
  { number: "01", label: "COMMIT", title: "A promise with something behind it.", copy: "A payment provider chooses a standard delivery promise and locks USDC as a performance bond. The rules are public. The deposit stays put.", detail: "PROVIDER → COMMITMENT", time: "60 MIN TARGET" },
  { number: "02", label: "OBSERVE", title: "Follow the payment. Keep the evidence.", copy: "The Stellar ledger marks the start. A signed completion event marks the finish. An observer checks the timeline against the promise.", detail: "LEDGER → SIGNED TIMELINE", time: "CLOCK RUNNING" },
  { number: "03", label: "RESOLVE", title: "When the deadline passes, the rules take over.", copy: "A late payment can become a claim. The provider has 48 hours to challenge it. An unchallenged, valid claim pays from the locked bond when resolved.", detail: "EVIDENCE → CLAIM → PAYOUT", time: "48 H CHALLENGE" },
];
const audiences = [
  ["PAYMENT PROVIDERS", "Turn operational reliability into a public commitment. Choose a payment corridor, back a standard SLA, and give partners evidence they can verify."],
  ["WALLETS & REMITTANCE APPS", "Compare delivery performance before choosing a provider. Route using verifiable reliability, with clear coverage for each tagged payment."],
  ["SENDING ANCHORS", "Know what your receiving partner has promised. Signed evidence and a defined claim process replace a chain of support tickets."],
  ["INFRASTRUCTURE BUILDERS", "Build on open templates, published evidence, contract events, and a planned TypeScript SDK. Help make payment reliability observable."],
  ["INSTITUTIONS", "Evaluate counterparties using delivery records, locked stake, and claim history rather than a promise in a sales deck."],
];
const templates = [
  { name: "FAST BANK PAYOUT", rail: "BANK", target: "60", unit: "MINUTES", grace: "2 minutes", penalty: "0.5%", cap: "50 USDC", window: "7 days", range: "10–10,000 USDC" },
  { name: "SAME-DAY PAYOUT", rail: "BANK", target: "8", unit: "HOURS", grace: "5 minutes", penalty: "0.25%", cap: "250 USDC", window: "14 days", range: "Any amount" },
  { name: "MOBILE MONEY", rail: "MOBILE MONEY", target: "15", unit: "MINUTES", grace: "1 minute", penalty: "1%", cap: "20 USDC", window: "7 days", range: "1–2,000 USDC" },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}
function Mark({ small = false }: { small?: boolean }) {
  return <span className={`brand-mark ${small ? "small" : ""}`} aria-hidden="true"><span /><span /><span /></span>;
}
function Action({ href, children, solid = false }: { href: string; children: React.ReactNode; solid?: boolean }) {
  return <a className={`action ${solid ? "solid" : ""}`} href={href}><span className="action-text"><span>{children}</span><span aria-hidden="true">{children}</span></span><Arrow /></a>;
}
function NetworkDiagram({ step, selected, setSelected }: { step: number; selected: number | null; setSelected: (n: number | null) => void }) {
  const labels = ["LOCKED PERFORMANCE BOND", "SIGNED PAYMENT EVIDENCE", "VALID CLAIM / FIXED PENALTY"];
  return <div className={`network-diagram phase-${step}`}>
    <svg viewBox="0 0 1000 600" role="img" aria-label="Payment route from client through Stellar settlement to the receiving provider, with observer, bond, and claim branches">
      <defs><pattern id="draft-grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0v25" fill="none" stroke="var(--line)" strokeWidth=".4"/></pattern></defs>
      <rect x="90" y="60" width="820" height="470" fill="url(#draft-grid)" opacity=".5"/>
      <g fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.4">
        <path d="m105 276 115-66 115 66-115 67Z"/><path d="M105 276v55l115 67 115-67v-55L220 343Z"/><path d="M220 343v55"/>
        <path d="m400 276 100-58 100 58-100 58Z"/><path d="M400 276v55l100 58 100-58v-55l-100 58Z"/><path d="M500 334v55"/>
        <path d="m700 276 115-66 115 66-115 67Z"/><path d="M700 276v55l115 67 115-67v-55L815 343Z"/><path d="M815 343v55"/>
        <path d="m404 108 96-55 96 55-96 55Z"/><path d="M404 108v31l96 55 96-55v-31l-96 55Z"/><path d="M500 163v31"/>
        <path d="m404 488 96-55 96 55-96 55Z"/><path d="M404 488v31l96 55 96-55v-31l-96 55Z"/><path d="M500 543v31"/>
      </g>
      <g stroke="var(--ink)" strokeWidth="1.2" fill="none"><path d="M335 301h65M600 301h100"/><path d="m386 296 8 5-8 5M686 296l8 5-8 5"/><path d="M500 194v24M500 389v44" strokeDasharray="4 5"/></g>
      <g fill="var(--signal)" opacity=".13"><path d={step===0?"m404 108 96-55 96 55-96 55Z":step===1?"m404 488 96-55 96 55-96 55Z":"m700 276 115-66 115 66-115 67Z"}/></g>
      <g className="route-active" stroke="var(--signal)" strokeWidth="2" fill="none"><path d="M220 301h595" strokeDasharray="5 7"/><path d="M500 301V139M500 301v187" strokeDasharray="4 7"/></g>
      <g className="diagram-labels" fill="var(--ink)" textAnchor="middle"><text x="220" y="289">SENDING CLIENT</text><text x="500" y="286">STELLAR</text><text x="815" y="289">PROVIDER</text><text x="500" y="119">PERFORMANCE BOND</text><text x="500" y="495">OBSERVER</text></g>
      <g className="diagram-tiny" fill="var(--muted)" textAnchor="middle"><text x="220" y="424">START / t₀</text><text x="815" y="424">COMPLETION / t₁</text><text x="500" y="35">COLLATERAL STAYS LOCKED</text><text x="500" y="598">EVIDENCE → VERDICT</text></g>
      <circle className="traveler" cx="500" cy="301" r="6" fill="var(--signal)"/>
    </svg>
    {[{x:50,y:23},{x:81.5,y:50},{x:50,y:82}].map((p,i)=><button key={i} className={`diagram-marker ${selected===i?'selected':''}`} style={{left:`${p.x}%`,top:`${p.y}%`}} onClick={()=>setSelected(selected===i?null:i)} aria-label={`Inspect ${labels[i].toLowerCase()}`} aria-expanded={selected===i}>{String(i+1).padStart(2,'0')}</button>)}
    {selected!==null && <div className="evidence-popover" role="status"><span className="mono">EVIDENCE / {String(selected+1).padStart(2,'0')}</span><strong>{labels[selected]}</strong><p>{["The commitment’s USDC backs its own payment promises. It is never lent or invested.","A ledger start and signed completion build a timeline. Legitimate, declared holds can pause the clock.","After validation and the challenge process, a resolved claim pays the agreed penalty to its beneficiary."][selected]}</p><button onClick={()=>setSelected(null)} aria-label="Close evidence detail">×</button></div>}
  </div>;
}

function Journey() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      frame=0;
      const el=ref.current;if(!el)return;
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
      const r=el.getBoundingClientRect();
      const progress=Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-window.innerHeight)));
      el.style.setProperty('--journey-progress',String(progress));
      setStep(previous=>{const next=Math.min(2,Math.floor(progress*3));return previous===next?previous:next;});
    };
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);
    return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);cancelAnimationFrame(frame);};
  },[]);
  const jump=(index:number)=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){setStep(index);return;}const el=ref.current;if(!el)return;const y=window.scrollY+el.getBoundingClientRect().top+(el.offsetHeight-window.innerHeight)*(index/3+.05);window.scrollTo({top:y,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
  return <section ref={ref} className="journey" id="how-it-works" aria-label="How Vaeltrix works"><div className="journey-stage frame">
    <div className="section-top"><span className="mono">ONE PAYMENT. A COMPLETE ACCOUNT.</span><span className="mono">{steps[step].time}</span></div>
    <div className="journey-heading"><span className="mono">[ {steps[step].number} / 03 ]</span><h2 key={step}>{steps[step].title}</h2></div>
    <NetworkDiagram step={step} selected={selected} setSelected={setSelected}/>
    <div className="journey-bottom"><div className="journey-tabs">{steps.map((s,i)=><button className={step===i?'active':''} key={s.label} onClick={()=>jump(i)} aria-current={step===i?'step':undefined}><span className="mono">{s.number}</span>{s.label}</button>)}</div><div className="journey-note"><span className="mono">{steps[step].detail}</span><p key={step}>{steps[step].copy}</p></div></div>
    <div className="journey-progress"><span/></div>
    <span className="scroll-hint mono">SCROLL TO FOLLOW THE PAYMENT ↓</span>
  </div></section>;
}

function TemplateExplorer(){
  const [active,setActive]=useState(0);const t=templates[active];
  return <div className="template-explorer"><div className="template-tabs" role="tablist" aria-label="Proposed SLA templates">{templates.map((item,i)=><button id={`template-tab-${i}`} key={item.name} role="tab" aria-selected={active===i} aria-controls="template-panel" tabIndex={active===i?0:-1} onKeyDown={e=>{let next=active;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(active+1)%templates.length;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(active+templates.length-1)%templates.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=templates.length-1;else return;e.preventDefault();setActive(next);document.getElementById(`template-tab-${next}`)?.focus();}} onClick={()=>setActive(i)} className={active===i?'active':''}><span className="mono">[0{i+1}]</span>{item.name}<Arrow/></button>)}</div><div id="template-panel" role="tabpanel" aria-labelledby={`template-tab-${active}`} className="template-panel"><div className="template-head mono"><span>PROPOSED TESTNET TEMPLATE</span><span>SEP-31 / USDC</span></div><div className="template-time"><span>{t.target}</span><span>{t.unit}<br/><small>TO COMPLETE</small></span></div><div className="template-values">{[["PENALTY",t.penalty],["PENALTY CAP",t.cap],["GRACE",t.grace],["CLAIM WINDOW",t.window],["PAYMENT SIZE",t.range],["PAYOUT RAIL",t.rail]].map(([label,value])=><div key={label}><span className="mono">{label}</span><strong>{value}</strong></div>)}</div><p className="template-caption mono">DRAFT PARAMETERS. TO BE TUNED WITH PILOT PROVIDERS.</p></div></div>;
}
function PaymentExample(){
  const [late,setLate]=useState(true);
  return <div className="payment-example"><div className="example-toolbar mono"><span>ILLUSTRATIVE PAYMENT / US → NG</span><span>USDC</span></div><div className="example-route"><span>SENDER</span><span className="route-dash"/><span>RECEIVER</span></div><div className="example-amount">1,000<span>USDC</span></div><div className="example-timeline"><div/><div/><div className={late?'breach':''}/><div/></div><div className="example-data"><span className="mono">DELIVERY TARGET<strong>60 min + 2 min grace</strong></span><span className="mono">COMPLETION<strong>{late?'75 minutes':'45 minutes'}</strong></span></div><div className={`example-result ${late?'late':'on-time'}`}><span className="mono">{late?'SLA BREACH':'ON TIME'}</span><strong>{late?'5 USDC proposed penalty':'No penalty due'}</strong><span className="mono">{late?'SUBJECT TO CLAIM RESOLUTION':'COMPLETION RECORDED'}</span></div><div className="scenario-switch"><button onClick={()=>setLate(false)} aria-pressed={!late}>ON-TIME PAYMENT</button><button onClick={()=>setLate(true)} aria-pressed={late}>LATE PAYMENT</button></div></div>;
}

export default function Landing(){
  const [menu,setMenu]=useState(false);const [audience,setAudience]=useState(0);const [pilot,setPilot]=useState(false);
  const pilotRef=useRef<HTMLDialogElement>(null);
  useTextReveal('[data-reveal] h2, [data-reveal] h3, [data-reveal] p, .collateral-readout h3, .contract-grid h3, .contract-grid p, .principle-label h3, .principle-label p, .closing h2, .closing > p, .footer-top h2, .footer-top > div > p');
  useEffect(()=>{if(pilot)pilotRef.current?.showModal();else pilotRef.current?.close();},[pilot]);
  useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){setMenu(false);}};document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey);},[]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><a href="#" className="wordmark" aria-label="Vaeltrix home"><Mark/><span>VAELTRIX</span></a><div className="nav-cell"><button className="menu-button mono" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-controls="navigation"><span>{menu?'CLOSE':'MENU'}</span><span>{menu?'−':'≡'}</span></button><nav id="navigation" className={menu?'open':''} aria-label="Main navigation">{[["THE PROTOCOL","#mission"],["HOW IT WORKS","#how-it-works"],["SLA TEMPLATES","#templates"],["FOR BUILDERS","#builders"]].map(([label,href])=><a key={label} href={href} onClick={()=>setMenu(false)}>{label}<Arrow/></a>)}<Link href="/docs">DOCUMENTATION<Arrow diagonal/></Link></nav></div><button className="header-cta mono" onClick={()=>setPilot(true)}>PILOT BRIEF<Arrow/></button></header>
    <main id="main" className="page-shell">
      <PaymentHero/>
      <section id="mission" className="mission"><div className="mission-art collateral-readout"><span className="mono">THE PERFORMANCE BOND</span><h3>Collateral that<br/>stays committed.</h3><div className="bond-facts"><div><span className="mono">STAKE ASSET</span><strong>Testnet USDC</strong></div><div><span className="mono">COVERAGE</span><strong>One commitment</strong></div><div><span className="mono">CAPITAL POLICY</span><strong>Never lent or invested</strong></div></div><span className="mono">RESERVED FOR VERIFIED CLAIMS.</span></div><div className="mission-copy" data-reveal><h2>FAST RAILS.<br/>SLOW PAYOUTS.<br/>LET’S CLOSE<br/>THE GAP.</h2><p>Stellar can settle in seconds. The bank or mobile-money payout can still take hours. Vaeltrix holds that last mile to a promise everyone can see.</p><Action href="#protocol">EXPLORE THE PROTOCOL</Action></div></section>
      <div className="integration-strip"><span className="mono">BUILT AROUND EXISTING STELLAR FLOWS</span><div><span>STELLAR</span><span>SOROBAN</span><span>SEP-31</span><span>USDC</span></div><p className="mono">OPEN PROTOCOL DESIGN · NO NEW PAYMENT RAIL REQUIRED</p></div>
      <section className="problems"><div className="section-heading" data-reveal><div><span className="mono eyebrow">THE RELIABILITY GAP</span><h2>THE MONEY MOVES.<br/>THE CERTAINTY<br/>DOESN’T.</h2></div><p>Between settlement and delivery, accountability gets lost. Private agreements and support tickets can’t give a wallet a clear picture of its next payment.</p></div><div className="problem-grid">{[["INVISIBLE","No shared view of performance.","Delivery speed varies by provider and corridor. Today, it’s hard to compare like for like."],["UNBACKED","Promises without a deposit.","Service terms often live in private agreements, without funds already set aside for a breach."],["MANUAL","A delay becomes a support ticket.","Chasing a partner is slow. Enforcing a small payment claim can cost more than the claim itself."],["ANECDOTAL","Reputation isn’t a routing signal.","Wallets need an observable delivery record, not a recommendation buried in a chat thread."]].map(([label,title,copy],i)=><article className="problem" key={label}><div className="cell-label mono"><span>{label}</span><span>[0{i+1}]</span></div><div className="problem-copy" data-reveal><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>
      <Journey/>
      <section id="protocol" className="protocol"><div className="section-heading" data-reveal><div><span className="mono eyebrow">SMALL ON-CHAIN FOOTPRINT</span><h2>THREE CONTRACTS.<br/>ONE CLEAR<br/>ACCOUNTABILITY LOOP.</h2></div><p>Keep the funds, the rules, and the record in separate places. Each layer does one job. The evidence connects them.</p></div><div className="contract-grid">{[["REGISTRY","The identity & the promise.","Providers, signing keys, and standard SLA templates."],["BOND","The stake & the settlement.","Locked collateral, claims, challenges, and penalty payouts."],["SCOREBOARD","The public track record.","Payment statistics and claim outcomes, ready to query."]].map(([label,title,copy],i)=><article key={label}><span className="mono">[0{i+1}] / VAELTRIX_{label}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
      <section className="product-row"><div className="product-visual"><PaymentExample/></div><div className="product-copy" data-reveal><span className="mono">[01] / PAYMENT COVERAGE</span><h2>THE PROMISE<br/>TRAVELS WITH<br/>THE PAYMENT.</h2><p>A tagged payment points to a specific commitment. That means a known deadline, a known penalty, and a known source of funds.</p><p className="small-note">Example uses the proposed fast bank payout template. A penalty goes to the sending client by default.</p><Action href="#templates">INSPECT THE TERMS</Action></div></section>
      <section className="product-row scoreboard-row"><div className="scoreboard-preview"><div className="example-toolbar mono"><span>RELIABILITY / PUBLIC READ SIDE</span><span>V0 DESIGN</span></div><div className="scoreboard-title"><span>Every outcome<br/>leaves a record.</span></div><div className="scoreboard-table">{[["DELIVERY","On-time rate & payout latency"],["EXCEPTIONS","Declared holds, by reason"],["COVERAGE","Stake backing the commitment"],["CLAIMS","Upheld, rejected, paid, expired"]].map(([label,value],i)=><div key={label}><span className="mono">0{i+1} / {label}</span><span>{value}</span><span className="square-dot"/></div>)}</div><div className="mono preview-footnote">METRIC STRUCTURE — LIVE PROVIDER DATA COMES WITH THE PILOT</div></div><div className="product-copy" data-reveal><span className="mono">[02] / PUBLIC SCOREBOARD</span><h2>RELIABILITY<br/>YOU CAN<br/>ACTUALLY READ.</h2><p>Compare providers by corridor and asset. See delivery speed, exceptions, stake, and claim history in one public record.</p><p className="small-note">A track record that wallets can use to make better routing decisions.</p><Action href="/docs#scoreboard">READ ABOUT THE SCOREBOARD</Action></div></section>
      <section id="templates" className="templates"><div className="section-heading" data-reveal><div><span className="mono eyebrow">STANDARD TERMS. COMPARABLE PROVIDERS.</span><h2>A PROMISE<br/>WITH THE DETAILS<br/>FILLED IN.</h2></div><p>Same rules, same measurements. Three proposed launch templates turn service quality into something providers and clients can agree on.</p></div><TemplateExplorer/></section>
      <section className="principles"><div className="principles-title" data-reveal><span className="mono">DESIGNED TO BE FAIR</span><h2>ACCOUNTABILITY<br/>GOES BOTH WAYS.</h2></div><div className="principle-grid">{[["OBSERVE","Measure what can be proven.","Ledger timestamps and signed events make the payment’s timeline attributable."],["PROTECT","Keep the collateral in place.","A performance bond is locked against its commitment. It is never lent or invested."],["CHALLENGE","Give evidence room to answer.","Providers can contest a claim. Declared, auditable exceptions protect legitimate delays."],["PUBLISH","Make every outcome visible.","Breach counts, carve-outs, and resolved claims all contribute to the public record."]].map(([label,title,copy],i)=><article key={label}><div className="principle-label"><span className="mono">0{i+1} / {label}</span><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>
      <div className="network-banner frame"><span className="mono">A BETTER LAST MILE.</span><p>Trust the rails.<br/>Verify the delivery.</p><span className="banner-foot mono">OPEN EVIDENCE / ACCOUNTABLE PROVIDERS</span></div>
      <section id="builders" className="audiences"><div className="audience-heading" data-reveal><span className="mono eyebrow">FOR THE PEOPLE MOVING MONEY</span><h2>A SHARED STANDARD.<br/>A BETTER PAYMENT<br/>FOR EVERY SIDE.</h2></div><div className="audience-list">{audiences.map(([title,copy],i)=><div className={`audience ${audience===i?'expanded':''}`} key={title}><button aria-expanded={audience===i} aria-controls={`audience-${i}`} onClick={()=>setAudience(audience===i?-1:i)}><span>{title}</span><span aria-hidden="true">{audience===i?'−':'+'}</span></button><div id={`audience-${i}`} className="audience-content" hidden={audience!==i}><p>{copy}</p></div></div>)}</div></section>
      <section className="closing frame"><span className="mono closing-meta">NEXT / V0 TESTNET PILOT</span><h2>MAKE THE NEXT<br/>PAYMENT A PROMISE<br/>YOU CAN VERIFY.</h2><p>The first milestone: commit stake, track a payment,<br className="desktop-break"/> prove a breach, resolve a claim. All on testnet.</p><button className="action solid" onClick={()=>setPilot(true)}><span className="action-text"><span>EXPLORE THE PILOT</span><span aria-hidden="true">EXPLORE THE PILOT</span></span><Arrow/></button><span className="mono closing-note">DRAFT V0.1 · MAINNET FOLLOWS ADOPTION AND SECURITY GATES</span></section>
    </main>
    <footer className="footer"><div className="footer-top"><h2>RELIABILITY.<br/>BACKED BY<br/>SOMETHING.</h2><div><span className="mono">BUILD WITH THE PROTOCOL</span><p>Start with the rules.<br/>Understand the evidence.<br/>Then follow the payment.</p><Action href="/docs">OPEN THE TECHNICAL BRIEF</Action></div></div><div className="footer-links"><div><span className="mono">PROTOCOL</span><a href="#mission">The idea</a><a href="#how-it-works">How it works</a><a href="#templates">SLA templates</a></div><div><span className="mono">BUILDERS</span><Link href="/docs">Documentation</Link><Link href="/docs#roadmap">Testnet roadmap</Link><a href="/vaeltrix-specification.pdf" target="_blank" rel="noreferrer">Technical specification ↗</a></div><div><span className="mono">STATUS</span><p>Open protocol design.<br/>Stellar / Soroban.<br/>V0.1 — testnet first.</p><span className="status mono"><i/>DRAFT, NOT A LIVE SERVICE</span></div></div><div className="footer-bottom mono"><span>PAYMENT PROMISES, MADE ENFORCEABLE.</span><a href="#">BACK TO TOP ↑</a></div></footer>
    <dialog ref={pilotRef} onCancel={()=>setPilot(false)} onClick={e=>{if(e.target===e.currentTarget)setPilot(false);}} className="pilot-dialog" aria-labelledby="pilot-title"><div className="dialog-top mono"><span>V0 / TESTNET PILOT</span><button onClick={()=>setPilot(false)} aria-label="Close pilot brief">×</button></div><h2 id="pilot-title">PROVE THE LOOP.<br/>THEN OPEN IT UP.</h2><p>The specification proposes a pilot with two payment providers, testnet USDC, and one reference observer.</p><ol><li>Publish a standard payout promise.</li><li>Lock a testnet performance bond.</li><li>Track a real SEP-31 test payment.</li><li>Exercise the claim and challenge paths.</li></ol><p className="small-note">This is a protocol preview. Pilot onboarding and wallet connections are not live yet.</p><Action href="/docs#roadmap" solid>READ THE PILOT ROADMAP</Action></dialog>
  </>;
}
