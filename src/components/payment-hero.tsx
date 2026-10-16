"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useTextReveal } from "./use-text-reveal";

const FILLED = "/images/payment-network.webp";
const PENCIL = "/images/payment-network-pencil.webp";
const traces = [
  "M42 495 150 381 244 413 166 471 75 435 M75 435v13l91 33 78-55 M75 448v12l91 33 78-55 M75 460v12l91 33 78-55 M75 472v12l91 33 78-55 M75 484v12l91 33 78-55 M42 495v18l134 46 99-66 M176 541v18",
  "M216 496 384 551 495 479 M216 506l168 56 111-72 M280 516v34 M384 562v26 M495 479v80 M482 470 500 462 517 469 499 479Z M482 470v90l17 6 18-8v-89",
  "M540 363 628 315 1001 439 910 490Z M540 377 628 329 1001 453 910 504Z M540 363v232l15 6V377 M628 329v214 M986 453v222 M910 490v240l-14 11V504 M540 595l370 135 91-55 M540 612l370 135 91-55 M910 730v17",
  "M626 480 710 432 712 568 636 612 626 587Z M636 489v123 M722 513 806 464 808 600 732 646 722 620Z M732 521v125 M818 548 899 500 898 644 831 680 818 651Z M831 556v124",
  "M678 234 774 187 871 231 775 280Z M678 234v14l97 42 96-45 M775 280v10 M699 166l75-36 75 36-75 36Z M699 177l75 36 75-36 M699 188l75 36 75-36 M699 199l75 36 75-36 M699 210l75 36 75-36 M699 221l75 36 75-36 M699 232l75 36 75-36",
  "M890 211 915 224v38l-25-12Z M915 224l14-7v36l-14 9 M899 214v-15c0-19 18-19 18-2v20 M906 216v-17c0-9 6-9 6-2 M775 290v134",
  "M920 611 1039 649 1077 627 1218 676 M920 620 1039 658 1077 636 1218 685 M1070 619 1089 610 1105 618 1085 630Z M1070 619v90l15 7 20-10v-88 M1189 660v72",
  "M1230 674 1350 601 1481 645 1367 722Z M1230 691 1367 738 1481 662 M1230 710 1367 758 1481 682 M1230 731 1367 778 1481 702 M1230 751 1367 798 1481 722 M1230 771 1367 818 1481 742 M1230 791 1367 838 1481 762 M1230 811 1367 858 1481 782 M1190 811l176 68 126-80 M1190 825l176 68 126-80 M1366 879v14 M1217 659v156 M1230 674v137 M1481 645v153",
];

function PencilDrawing() {
  return <div className="pencil-drawing">
    <Image src={PENCIL} alt="" width={1536} height={1024} unoptimized loading="eager" className="pencil-final" />
    <svg viewBox="0 0 1536 1024" fill="none" aria-hidden="true" className="pencil-traces"><g stroke="#708493" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round">{traces.map((d,i)=><path key={i} d={d} pathLength="1" style={{"--trace-delay":`${i*240}ms`} as CSSProperties}/>)}</g></svg>
  </div>;
}

export default function PaymentHero() {
  const [phase,setPhase]=useState<"loading"|"drawing"|"opening"|"ready">("loading");
  const [progress,setProgress]=useState(0);
  const [replay,setReplay]=useState(0);
  const [hotspot,setHotspot]=useState<number|null>(null);
  useTextReveal(".hero-copy h1, .hero-description > p", phase === "ready", true);
  const art=useRef<HTMLDivElement>(null);
  const overlay=useRef<HTMLDivElement>(null);
  const finishIntro=useRef<()=>void>(()=>{});

  useEffect(()=>{
    let cancelled=false;let finished=false;const timers:ReturnType<typeof setTimeout>[]=[];let interval:ReturnType<typeof setInterval>|undefined;
    const measure=()=>{const rect=art.current?.getBoundingClientRect();const el=overlay.current;if(!rect||!el)return;el.style.setProperty('--art-x',`${rect.x}px`);el.style.setProperty('--art-y',`${rect.y}px`);el.style.setProperty('--art-w',`${rect.width}px`);el.style.setProperty('--art-h',`${rect.height}px`);el.style.setProperty('--split',`${rect.y+rect.height*.5}px`);};
    const finish=()=>{if(cancelled)return;finished=true;setPhase('ready');setProgress(100);document.body.classList.remove('intro-scroll-lock');if(interval)clearInterval(interval);timers.forEach(clearTimeout);};
    finishIntro.current=finish;
    const escape=(event:KeyboardEvent)=>{if(event.key==='Escape')finish();};
    window.addEventListener('resize',measure);document.addEventListener('keydown',escape);
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){timers.push(setTimeout(finish,0));return()=>{cancelled=true;timers.forEach(clearTimeout);window.removeEventListener('resize',measure);document.removeEventListener('keydown',escape);};}
    window.scrollTo({top:0,behavior:'instant'});
    document.body.classList.add('intro-scroll-lock');
    const load=(src:string)=>new Promise<void>(resolve=>{const image=new window.Image();image.onload=()=>resolve();image.onerror=()=>resolve();image.src=src;});
    Promise.all([load(FILLED),load(PENCIL),document.fonts.ready]).then(()=>{
      if(cancelled||finished)return;measure();setPhase('drawing');setProgress(0);
      const start=performance.now();interval=setInterval(()=>{const t=Math.min(1,(performance.now()-start)/3800);setProgress(Math.round(t*100));},65);
      timers.push(setTimeout(()=>{if(cancelled||finished)return;setProgress(100);if(interval)clearInterval(interval);setPhase('opening');},4100));
      timers.push(setTimeout(finish,6200));
    });
    timers.push(setTimeout(finish,12000));
    return()=>{cancelled=true;if(interval)clearInterval(interval);timers.forEach(clearTimeout);document.body.classList.remove('intro-scroll-lock');window.removeEventListener('resize',measure);document.removeEventListener('keydown',escape);};
  },[replay]);

  const replayIntro=()=>{window.scrollTo({top:0,behavior:'instant'});setPhase('loading');setProgress(0);setHotspot(null);setReplay(value=>value+1);};
  return <section className="hero payment-hero" data-phase={phase} aria-labelledby="hero-title">
    <div className="hero-art frame"><div className="hero-meta mono"><span>PAYMENT RELIABILITY INFRASTRUCTURE</span><span>STELLAR / SOROBAN</span></div>
      <div className="hero-image-wrap payment-art" ref={art}><Image className="hero-image payment-filled" src={FILLED} alt="Abstract payment network: a sender routes a payment through a settlement ledger to a receiving provider, backed by a locked deposit" width={1536} height={1024} priority unoptimized/>
        <div className="hero-guide horizontal"/><div className="hero-guide vertical"/>
        {[{x:50,y:24,title:'LOCKED DEPOSIT',copy:'The provider’s performance bond backs the delivery promise.'},{x:62,y:62,title:'SIGNED EVIDENCE',copy:'An observable timeline connects settlement to final payout.'}].map((p,i)=><div className="hero-hotspot" key={p.title} style={{left:`${p.x}%`,top:`${p.y}%`}}><button onClick={()=>setHotspot(hotspot===i?null:i)} onMouseEnter={()=>setHotspot(i)} onMouseLeave={()=>setHotspot(null)} onFocus={()=>setHotspot(i)} onBlur={()=>setHotspot(null)} aria-label={`Show ${p.title.toLowerCase()} detail`} aria-expanded={hotspot===i}/><div className={`hero-callout ${hotspot===i?'visible':''}`} aria-hidden={hotspot!==i}><span className="mono">{p.title}</span><p>{p.copy}</p></div></div>)}
      </div>
      <div className="hero-caption mono"><span>FIG. 01 — A PAYMENT, WITH AN ACCOUNTABLE PATH</span><button className="replay-intro mono" onClick={replayIntro}>REPLAY INTRO ↺</button></div>
    </div>
    <div className="hero-copy"><h1 id="hero-title">PAYMENT<br/>PROMISES,<br/>MADE<br/>ENFORCEABLE.</h1><div className="hero-description"><p>Reliable payments should be more than a promise. Vaeltrix makes delivery commitments public, measurable, and backed by a provider’s own stake.</p><a className="hero-link mono" href="#how-it-works">FOLLOW THE PAYMENT<span className="arrow" aria-hidden="true">→</span></a></div><div className="hero-strip mono"><div>{Array.from({length:3},(_,i)=><span key={i}>PUBLIC PROMISES <b>/</b> SIGNED EVIDENCE <b>/</b> LOCKED COLLATERAL <b>/</b> CLEAR OUTCOMES <b>/</b> </span>)}</div></div></div>
    {phase!=='ready'&&<div className="hero-intro" ref={overlay} key={replay} aria-label="Vaeltrix pencil drawing and payment network reveal">
      <div className="paper-curtain curtain-top"><div className="intro-art-position"><PencilDrawing/></div><div className="intro-upper mono">VAELTRIX / PAYMENT RELIABILITY<br/><span>FROM A PROMISE TO A PUBLIC RECORD.</span></div></div>
      <div className="paper-curtain curtain-bottom"><div className="intro-art-position"><PencilDrawing/></div><div className="intro-lower"><strong>EVERY PAYMENT.<br/>A TRACEABLE<br/>PROMISE.</strong><div className="mono">01 / DEFINE THE COMMITMENT<br/>02 / LOCK THE PERFORMANCE BOND<br/>03 / OBSERVE THE PAYMENT<br/>04 / VERIFY THE EVIDENCE<br/>05 / RECORD THE OUTCOME</div></div></div>
      <div className="intro-progress" style={{"--draw-progress":progress/100} as CSSProperties} aria-hidden="true"><span className="mono">{progress}%</span><i/></div>
      <button className="skip-intro mono" onClick={()=>finishIntro.current()}>SKIP INTRO →</button>
    </div>}
  </section>;
}
