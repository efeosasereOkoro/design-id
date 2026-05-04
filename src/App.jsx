import { useState } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const TRAITS = {
  A:["Agile","Ambitious","Adaptable","Assertive","Authentic","Accountable","Astute","Approachable","Attentive","Action-driven"],
  B:["Bold","Brilliant","Brave","Balanced","Boundless","Bright","Buoyant","Broad-minded","Benevolent","Breakthrough"],
  C:["Creative","Confident","Curious","Collaborative","Composed","Caring","Committed","Clear-headed","Constructive","Compelling"],
  D:["Driven","Dependable","Decisive","Dynamic","Dedicated","Diligent","Determined","Discerning","Daring","Detail-oriented"],
  E:["Energetic","Empathetic","Enthusiastic","Excellent","Effective","Engaging","Exploratory","Encouraging","Expressive","Exceptional"],
  F:["Focused","Fearless","Flexible","Forward-thinking","Faithful","Forthright","Fresh-minded","Fulfilling","Fair","Fluent"],
  G:["Growth-minded","Generous","Goal-oriented","Grounded","Genuine","Gifted","Gracious","Go-getter","Game-changing","Guided"],
  H:["Honest","Hardworking","Humble","Helpful","Holistic","High-achieving","Human-centred","Harmonious","Hardy","Hopeful"],
  I:["Innovative","Insightful","Intentional","Inspiring","Inclusive","Influential","Imaginative","Impactful","Intelligent","Inquisitive"],
  J:["Joyful","Judicious","Just","Jovial","Joined-up","Jubilant","Journeying","Jazzy","Judged","Jump-starting"],
  K:["Knowledgeable","Keen","Kind","Key-thinking","Kinetic","Knack-driven","Kaleidoscopic","Kick-starting","Kingly","Keep-going"],
  L:["Logical","Level-headed","Loyal","Leading","Lively","Lucid","Listening","Light-footed","Lean","Latent"],
  M:["Motivated","Methodical","Mindful","Mission-driven","Masterful","Measured","Modern","Meticulous","Magnetic","Multi-skilled"],
  N:["Nimble","Notable","Nurturing","Novel","Natural","Networked","Next-level","Navigating","Neat","Noticed"],
  O:["Optimistic","Organised","Open-minded","Observant","Outcome-focused","Original","Outgoing","Objective","Outstanding","Operative"],
  P:["Proactive","Purposeful","Passionate","Practical","Pioneering","Perceptive","Precise","Progressive","Persistent","Polished"],
  Q:["Quick-thinking","Quality-focused","Questioning","Quest-driven","Quiet-strength","Quality-led","Quick-adapting","Quintessential","Query-minded","Qualified"],
  R:["Resilient","Reliable","Resourceful","Results-driven","Reflective","Responsive","Rigorous","Respectful","Radical","Real"],
  S:["Strategic","Supportive","Smart","Solution-oriented","Skilled","Steady","Sharp","Structured","Spirited","Seasoned"],
  T:["Thoughtful","Tenacious","Trustworthy","Tactical","Thorough","Team-driven","Transparent","Transformative","Trailblazing","Tireless"],
  U:["Understanding","Uplifting","Unique","User-focused","United","Unwavering","Unifying","Unconventional","Useful","Unlimited"],
  V:["Visionary","Versatile","Valuable","Vibrant","Vocal","Vigilant","Venture-ready","Value-led","Vivid","Victory-minded"],
  W:["Wise","Willing","Well-rounded","Warm","Winning","Wide-ranging","Wholehearted","Witty","Workable","World-class"],
  X:["eXceptional","eXplorative","eXcellent","eXperienced","eXpressive","eXacting","eXpansive","eXemplary","eXtra-mile","eXecutive"],
  Y:["Youthful","Yielding","Yes-driven","Young-minded","Yearning","Yare","Year-round","You-first","Yield-focused","Youthfully-wise"],
  Z:["Zealous","Zen","Zesty","Zoned-in","Zeal-driven","Zippy","Zeitgeist","Zoomed-in","Zone-setting","Zero-limits"],
};

const ROLE_MAP = {
  "Developer":            ["Builder","Architect","Engineer","Creator","Coder","Implementer"],
  "Designer":             ["Creator","Visionary","Stylist","Crafter","Shaper"],
  "Interaction Designer": ["Simplifier","Shaper","Flowmaker","Refiner","Stylist"],
  "Service Designer":     ["Integrator","Orchestrator","Improver","Harmoniser","Systems-thinker"],
  "Product Manager":      ["Strategist","Orchestrator","Prioritiser","Navigator","Owner"],
  "Product Development":  ["Innovator","Maker","Builder","Pioneer","Creator"],
  "Delivery Manager":     ["Driver","Enabler","Coordinator","Facilitator","Executor"],
  "Scrum Master":         ["Facilitator","Coach","Enabler","Guide","Catalyst"],
  "Agile Coach":          ["Coach","Facilitator","Guide","Catalyst","Unblocker"],
  "Communications":       ["Storyteller","Amplifier","Messenger","Narrator","Broadcaster"],
  "Content Creator":      ["Creator","Curator","Storyteller","Producer","Publisher"],
  "Civil Service":        ["Steward","Administrator","Custodian","Guardian","Implementer"],
  "Public Servant":       ["Advocate","Guardian","Steward","Protector","Representative"],
  "Team Coordination":    ["Connector","Harmoniser","Coordinator","Organizer","Unifier"],
  "Chief Executive Officer":["Leader","Visionary","Driver","Architect","Pathfinder"],
  "Project Manager":      ["Planner","Driver","Organizer","Executor","Scheduler"],
  "Data Analyst":         ["Analyst","Interpreter","Decoder","Modeler","Forecaster"],
  "Researcher":           ["Explorer","Investigator","Discoverer","Analyst","Sense-maker"],
  "Change Management":    ["Catalyst","Enabler","Transformer","Guide","Shaper"],
  "GovTech / Digital":    ["Transformer","Moderniser","Innovator","Digitiser","Reformer"],
  "Policy Advisor":       ["Advisor","Analyst","Architect","Reformer","Strategist"],
  "IT Support":           ["Fixer","Maintainer","Troubleshooter","Supporter","Resolver"],
  "Legal / Compliance":   ["Protector","Guardian","Advisor","Regulator","Defender"],
  "Other":                ["Contributor","Specialist","Expert","Enabler","Champion"],
};

const ROLES = Object.keys(ROLE_MAP);

const ANIMALS = [
  "🦁","🐯","🦊","🐺","🦅","🦋","🐬","🦈",
  "🦚","🦜","🐉","🦄","🐻","🦝","🐸","🦉",
  "🦒","🐙","🦭","🦦","🦏","🦔","🐊","🦑",
];

const GRADIENTS = [
  ["#FF6B6B","#FF8E53"],   // coral → warm orange
  ["#667EEA","#764BA2"],   // periwinkle → violet
  ["#4ECDC4","#1A535C"],   // teal → deep teal
  ["#F093FB","#F5576C"],   // pink → hot coral
  ["#4FACFE","#00C6FB"],   // sky → cerulean
  ["#43E97B","#38F9D7"],   // spring → aqua
  ["#FA709A","#FEE140"],   // pink → gold
  ["#FF4E50","#F9D423"],   // red → bright yellow
  ["#30CFD0","#330867"],   // cyan → deep purple
  ["#FC466B","#3F5EFB"],   // coral → indigo
  ["#11998E","#38EF7D"],   // emerald → lime
  ["#A18CD1","#FBC2EB"],   // lavender → blush
];

// ─── HELPERS ───────────────────────────────────────────────────────────────

function getTrait(letter) {
  return TRAITS[(letter || "A").toUpperCase()] || TRAITS["A"];
}

function drawRR(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// ─── GLOBAL CSS ────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{margin:0;}

.ib{
  font-family:'DM Sans',system-ui,sans-serif;
  min-height:100vh;
  background:#F4EDE0;
  background-image:radial-gradient(#D5C9B5 1.2px,transparent 1.2px);
  background-size:20px 20px;
  color:#14142B;
}

/* ── INPUT SCREEN ── */
.ib-in{max-width:440px;margin:0 auto;padding:0 18px 56px;}

.ib-hd{padding:40px 0 28px;text-align:center;}
.ib-badge{
  display:inline-flex;align-items:center;gap:6px;
  background:#14142B;color:#FFD93D;
  font-family:'Syne',sans-serif;font-size:10px;font-weight:700;
  letter-spacing:.18em;padding:7px 18px;border-radius:100px;
  margin-bottom:20px;
}
.ib-h1{
  font-family:'Syne',sans-serif;
  font-size:clamp(34px,10vw,50px);
  font-weight:800;line-height:1.04;
  letter-spacing:-.025em;margin-bottom:10px;
}
.ib-h1 em{color:#E63946;font-style:normal;}
.ib-sub{font-size:15px;color:#7C7B8A;line-height:1.55;font-weight:400;}

.ib-fc{
  background:#fff;border-radius:26px;
  padding:28px 22px;
  box-shadow:0 2px 0 #E0D5C5,0 6px 32px rgba(0,0,0,.1),0 1px 6px rgba(0,0,0,.05);
}
.ib-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.ib-fld{margin-bottom:16px;}
.ib-lbl{
  display:block;font-size:10px;font-weight:600;
  letter-spacing:.13em;color:#A8A0B4;
  text-transform:uppercase;margin-bottom:7px;
}
.ib-inp,.ib-sel{
  width:100%;padding:13px 15px;
  border:1.5px solid #ECEAF0;border-radius:12px;
  font-size:16px;font-family:'DM Sans',sans-serif;
  color:#14142B;background:#FAFAF8;
  outline:none;
  transition:border-color .2s,box-shadow .2s,background .2s;
  -webkit-appearance:none;appearance:none;
}
.ib-inp::placeholder{color:#C4BDD4;}
.ib-inp:focus,.ib-sel:focus{
  border-color:#E63946;
  box-shadow:0 0 0 3.5px rgba(230,57,70,.12);
  background:#fff;
}
.ib-inp.err,.ib-sel.err{
  border-color:#E63946;background:#FFF3F3;
  animation:shake .35s ease;
}
.ib-sw{position:relative;}
.ib-sw::after{
  content:'▾';position:absolute;right:14px;top:50%;
  transform:translateY(-50%);color:#A8A0B4;
  pointer-events:none;font-size:13px;
}
.ib-cta{
  width:100%;padding:17px;
  background:linear-gradient(135deg,#E63946 0%,#F4A261 100%);
  color:#fff;border:none;border-radius:14px;
  font-family:'Syne',sans-serif;font-size:16px;font-weight:700;
  letter-spacing:.03em;cursor:pointer;margin-top:6px;
  transition:transform .15s,box-shadow .15s,filter .15s;
  box-shadow:0 4px 22px rgba(230,57,70,.38),0 1px 0 rgba(255,255,255,.2) inset;
}
.ib-cta:hover{filter:brightness(1.06);}
.ib-cta:active{transform:scale(.97);box-shadow:0 2px 10px rgba(230,57,70,.25);}

/* ── CARD SCREEN ── */
.ib-ca{max-width:440px;margin:0 auto;padding:0 18px 56px;}
.ib-bk{display:flex;align-items:center;padding:22px 0 14px;gap:12px;}
.ib-bkb{
  background:none;border:none;cursor:pointer;
  font-family:'DM Sans',sans-serif;font-size:14px;
  font-weight:500;color:#8A87A0;
  display:flex;align-items:center;gap:5px;padding:0;
  transition:color .15s;
}
.ib-bkb:hover{color:#14142B;}
.ib-hi{
  font-family:'Syne',sans-serif;font-size:13px;font-weight:700;
  color:#14142B;letter-spacing:.04em;
  margin-left:auto;
  background:#fff;padding:6px 14px;border-radius:100px;
  box-shadow:0 1px 0 #E0D5C5,0 2px 8px rgba(0,0,0,.07);
}

@keyframes reveal{
  0%{opacity:0;transform:translateY(22px) scale(.94);}
  100%{opacity:1;transform:translateY(0) scale(1);}
}
@keyframes floatUp{
  0%,100%{transform:translateY(0px) rotate(-2deg);}
  50%{transform:translateY(-10px) rotate(2deg);}
}
@keyframes shake{
  0%,100%{transform:translateX(0);}
  20%{transform:translateX(-6px);}
  40%{transform:translateX(6px);}
  60%{transform:translateX(-4px);}
  80%{transform:translateX(4px);}
}
@keyframes fadeUp{
  from{opacity:0;transform:translate(-50%,14px);}
  to{opacity:1;transform:translate(-50%,0);}
}
@keyframes pulse{
  0%,100%{opacity:.35;}50%{opacity:.7;}
}

.ib-card{
  border-radius:28px;padding:36px 28px 38px;
  color:#fff;position:relative;overflow:hidden;
  box-shadow:0 24px 64px rgba(0,0,0,.26),0 4px 16px rgba(0,0,0,.12);
}
.ib-card-anim{animation:reveal .55s cubic-bezier(.34,1.56,.64,1) both;}

.ib-cd1{
  position:absolute;top:-80px;right:-70px;
  width:230px;height:230px;border-radius:50%;
  background:rgba(255,255,255,.11);pointer-events:none;
}
.ib-cd2{
  position:absolute;bottom:-90px;left:-65px;
  width:250px;height:250px;border-radius:50%;
  background:rgba(0,0,0,.08);pointer-events:none;
}
.ib-cd3{
  position:absolute;top:50%;left:-30px;
  width:80px;height:80px;border-radius:50%;
  background:rgba(255,255,255,.06);pointer-events:none;
  transform:translateY(-50%);
}

.ib-ci{
  position:relative;z-index:1;
  display:flex;flex-direction:column;
  align-items:center;text-align:center;
}
.ib-ctag{
  font-size:9.5px;font-weight:700;letter-spacing:.22em;
  color:rgba(255,255,255,.6);margin-bottom:22px;
  text-transform:uppercase;
  border:1px solid rgba(255,255,255,.22);
  padding:5px 14px;border-radius:100px;
  background:rgba(255,255,255,.1);
  backdrop-filter:blur(8px);
}
.ib-emoji{
  font-size:82px;line-height:1;margin-bottom:20px;
  animation:floatUp 3.8s ease-in-out infinite;
  display:block;filter:drop-shadow(0 8px 24px rgba(0,0,0,.2));
}
.ib-cname{
  font-family:'Syne',sans-serif;
  font-size:clamp(26px,8vw,38px);
  font-weight:800;letter-spacing:-.025em;
  margin-bottom:14px;line-height:1.08;
}
.ib-cdiv{
  width:52px;height:1.5px;
  background:rgba(255,255,255,.28);
  margin:0 auto 16px;border-radius:9px;
}
.ib-ctrait{
  font-size:clamp(14px,4vw,17px);
  font-weight:500;color:rgba(255,255,255,.82);
  margin-bottom:8px;line-height:1.45;
}
.ib-ctrait strong{color:#fff;font-weight:600;}
.ib-cid{
  font-family:'Syne',sans-serif;
  font-size:clamp(28px,9vw,42px);
  font-weight:800;letter-spacing:-.025em;
  line-height:1.08;margin-bottom:22px;
  overflow-wrap:break-word;word-break:break-word;
}
.ib-cpill{
  display:inline-block;
  background:rgba(255,255,255,.18);
  border:1px solid rgba(255,255,255,.28);
  backdrop-filter:blur(10px);
  padding:7px 18px;border-radius:100px;
  font-size:12.5px;font-weight:600;
  color:rgba(255,255,255,.9);letter-spacing:.01em;
}
.ib-dots{
  display:flex;justify-content:center;gap:7px;margin-top:18px;
}
.ib-dot{
  width:5px;height:5px;border-radius:50%;
  background:rgba(255,255,255,.32);
}
.ib-dot:nth-child(1){animation:pulse 2s ease-in-out infinite .0s;}
.ib-dot:nth-child(2){animation:pulse 2s ease-in-out infinite .3s;}
.ib-dot:nth-child(3){animation:pulse 2s ease-in-out infinite .6s;}
.ib-dot:nth-child(4){animation:pulse 2s ease-in-out infinite .9s;}
.ib-dot:nth-child(5){animation:pulse 2s ease-in-out infinite 1.2s;}

/* ── ACTIONS ── */
.ib-acts{margin-top:18px;display:flex;flex-direction:column;gap:10px;}
.ib-ar{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.ib-btn{
  padding:15px 12px;border:none;border-radius:14px;
  font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;
  cursor:pointer;
  transition:transform .14s,box-shadow .14s,filter .14s;
  display:flex;align-items:center;justify-content:center;gap:7px;
}
.ib-btn:active{transform:scale(.96);}
.ib-btn:hover{filter:brightness(1.05);}
.ib-dl{
  background:#14142B;color:#fff;
  box-shadow:0 3px 16px rgba(20,20,43,.24);
}
.ib-sh{
  background:#fff;color:#14142B;
  border:1.5px solid #E5E3ED;
  box-shadow:0 1px 0 #E0D5C5,0 3px 10px rgba(0,0,0,.06);
}
.ib-rg{
  background:linear-gradient(135deg,#E63946 0%,#F4A261 100%);
  color:#fff;
  box-shadow:0 4px 20px rgba(230,57,70,.32),0 1px 0 rgba(255,255,255,.2) inset;
}
.ib-hint{
  text-align:center;font-size:12px;color:#A8A0B4;margin-top:10px;
  font-weight:400;
}

/* ── TOAST ── */
.ib-toast{
  position:fixed;bottom:28px;left:50%;
  transform:translateX(-50%);
  background:#14142B;color:#fff;
  padding:12px 24px;border-radius:100px;
  font-size:14px;font-weight:500;z-index:9999;
  animation:fadeUp .3s ease both;
  white-space:nowrap;
  box-shadow:0 4px 20px rgba(0,0,0,.2);
}
`;

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("input");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [gen, setGen] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  };

  function validate() {
    const e = {};
    if (!firstName.trim()) e.fn = 1;
    if (!lastName.trim()) e.ln = 1;
    if (!role) e.role = 1;
    if (role === "Other" && !customRole.trim()) e.cr = 1;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function generate(seed = 0) {
    const fn = firstName.trim();
    const ln = lastName.trim();
    const actualRole = role === "Other" ? (customRole.trim() || "Other") : role;
    const pool = getTrait(fn[0]);
    const pool2 = getTrait(ln[0]);
    const prevT1 = gen?.t1;
    const prevT2 = gen?.t2;
    const filteredPool = pool.length > 1 ? pool.filter(w => w !== prevT1) : pool;
    const filteredPool2 = pool2.length > 1 ? pool2.filter(w => w !== prevT2) : pool2;
    const t1 = filteredPool[Math.floor(Math.random() * filteredPool.length)];
    const t2 = filteredPool2[Math.floor(Math.random() * filteredPool2.length)];
    const options = ROLE_MAP[role] || ROLE_MAP["Other"];
    const prevIdentity = gen?.identity;
    const filtered = options.length > 1 ? options.filter(o => o !== prevIdentity) : options;
    const identity = filtered[Math.floor(Math.random() * filtered.length)];
    const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    const gradient = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
    setGen({ t1, t2, identity, animal, gradient, seed, displayRole: actualRole });
    setAnimKey(k => k + 1);
    setScreen("card");
  }

  function handleGenerate() {
    if (!validate()) return;
    generate(0);
  }

  function handleRegenerate() {
    generate((gen?.seed || 0) + 1);
  }

  async function handleDownload() {
    if (!gen) return;
    await document.fonts.ready;

    // Instagram square: 1080x1080px
    const S = 1080;
    const cx = S / 2;
    const canvas = document.createElement("canvas");
    canvas.width = S;
    canvas.height = S;
    const ctx = canvas.getContext("2d");

    // ── Background gradient (full bleed, no rounded corners for max compatibility) ──
    const grad = ctx.createLinearGradient(0, 0, S, S);
    grad.addColorStop(0, gen.gradient[0]);
    grad.addColorStop(1, gen.gradient[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, S, S);

    // ── Decorative circles ──
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath(); ctx.arc(S - 100, 100, 380, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = "#000000";
    ctx.beginPath(); ctx.arc(80, S - 80, 400, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath(); ctx.arc(cx, cx, 300, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;

    // ── Inner glass panel ──
    const pad = 40;
    drawRR(ctx, pad, pad, S - pad * 2, S - pad * 2, 52);
    ctx.fillStyle = "rgba(255,255,255,0.10)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.20)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // ── Badge ──
    const badgeText = "✦  ICEBREAKER  ID  ✦";
    ctx.font = "bold 22px 'DM Sans', Arial, sans-serif";
    const bw = ctx.measureText(badgeText).width + 56;
    const bh = 50, by = 110;
    drawRR(ctx, cx - bw / 2, by - bh / 2, bw, bh, 25);
    ctx.fillStyle = "rgba(255,255,255,0.16)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.26)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.fillText(badgeText, cx, by);

    // ── Emoji ──
    ctx.font = "180px serif";
    ctx.fillText(gen.animal, cx, 310);

    // ── Full name ──
    const fn = firstName.trim(), ln = lastName.trim();
    ctx.font = "800 72px 'Syne', Arial, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.18)";
    ctx.shadowBlur = 16;
    const nameLines = wrapText(ctx, `${fn} ${ln}`, S - 140);
    let ny = 468;
    nameLines.forEach(l => { ctx.fillText(l, cx, ny); ny += 82; });
    ctx.shadowBlur = 0;
    const nameBottom = ny - 20;

    // ── Divider ──
    ctx.beginPath();
    ctx.moveTo(cx - 80, nameBottom + 10);
    ctx.lineTo(cx + 80, nameBottom + 10);
    ctx.strokeStyle = "rgba(255,255,255,0.32)";
    ctx.lineWidth = 3;
    ctx.stroke();

    // ── Trait line ──
    ctx.font = "500 30px 'DM Sans', Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.82)";
    const traitText = `I am ${gen.t1} & ${gen.t2} ${fn},`;
    const tlines = wrapText(ctx, traitText, S - 140);
    let ty = nameBottom + 58;
    tlines.forEach(l => { ctx.fillText(l, cx, ty); ty += 42; });

    // ── Identity ──
    ctx.font = "800 68px 'Syne', Arial, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.15)";
    ctx.shadowBlur = 12;
    const idLines = wrapText(ctx, `the ${gen.identity}`, S - 100);
    ty += 8;
    idLines.forEach(l => { ctx.fillText(l, cx, ty); ty += 78; });
    ctx.shadowBlur = 0;

    // ── Role pill ──
    ctx.font = "600 26px 'DM Sans', Arial, sans-serif";
    const rw = ctx.measureText(gen.displayRole).width + 60;
    const rh = 58, ry = ty + 14;
    drawRR(ctx, cx - rw / 2, ry - rh / 2, rw, rh, 29);
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText(gen.displayRole, cx, ry);
    ty += rh + 12;

    // ── Dots ──
    const dotY = S - 68;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(cx - 40 + i * 20, dotY, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fill();
    }

    const fn2 = fn, ln2 = ln;
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fn2}-${ln2}-IcebreakerID.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
    showToast("🎉 Downloading your ID card!");
  }

  async function handleShare() {
    if (!gen) return;
    const text = `I am ${gen.t1} & ${gen.t2} ${firstName.trim()}, the ${gen.identity} ${gen.animal}\n\nRole: ${gen.displayRole}\n\n#IcebreakerID`;
    if (navigator.share) {
      try { await navigator.share({ title: "My Icebreaker ID", text }); }
      catch (e) {}
    } else {
      try {
        await navigator.clipboard.writeText(text);
        showToast("✅ Copied to clipboard!");
      } catch {
        showToast("Could not copy — try manually");
      }
    }
  }

  // ── INPUT SCREEN ────────────────────────────────────────────────────────

  if (screen === "input") {
    return (
      <div className="ib">
        <style>{CSS}</style>
        <div className="ib-in">
          <header className="ib-hd">
            <div className="ib-badge">✦ ICEBREAKER ID</div>
            <h1 className="ib-h1">
              Discover your<br /><em>team identity</em>
            </h1>
            <p className="ib-sub">
              Enter your name & role to generate<br />a unique identity card in seconds
            </p>
          </header>

          <div className="ib-fc">
            <div className="ib-row">
              <div className="ib-fld">
                <label className="ib-lbl">First Name</label>
                <input
                  className={`ib-inp${errors.fn ? " err" : ""}`}
                  type="text" placeholder="Efe"
                  value={firstName}
                  onChange={e => { setFirstName(e.target.value); setErrors(p => ({ ...p, fn: 0 })); }}
                />
              </div>
              <div className="ib-fld">
                <label className="ib-lbl">Last Name</label>
                <input
                  className={`ib-inp${errors.ln ? " err" : ""}`}
                  type="text" placeholder="Okoro"
                  value={lastName}
                  onChange={e => { setLastName(e.target.value); setErrors(p => ({ ...p, ln: 0 })); }}
                />
              </div>
            </div>

            <div className="ib-fld">
              <label className="ib-lbl">Your Role</label>
              <div className="ib-sw">
                <select
                  className={`ib-sel${errors.role ? " err" : ""}`}
                  value={role}
                  onChange={e => { setRole(e.target.value); setErrors(p => ({ ...p, role: 0, cr: 0 })); }}
                >
                  <option value="">Choose your role…</option>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>

            {role === "Other" && (
              <div className="ib-fld">
                <label className="ib-lbl">Describe your role</label>
                <input
                  className={`ib-inp${errors.cr ? " err" : ""}`}
                  type="text" placeholder="e.g. Innovation Lead"
                  value={customRole}
                  onChange={e => { setCustomRole(e.target.value); setErrors(p => ({ ...p, cr: 0 })); }}
                />
              </div>
            )}

            <button className="ib-cta" onClick={handleGenerate}>
              Generate My Identity ✦
            </button>
          </div>
        </div>
        {toast && <div className="ib-toast">{toast}</div>}
      </div>
    );
  }

  // ── CARD SCREEN ─────────────────────────────────────────────────────────

  const bgStyle = {
    background: `linear-gradient(145deg, ${gen.gradient[0]} 0%, ${gen.gradient[1]} 100%)`,
  };

  return (
    <div className="ib">
      <style>{CSS}</style>
      <div className="ib-ca">
        <div className="ib-bk">
          <button className="ib-bkb" onClick={() => setScreen("input")}>
            ← Edit info
          </button>
          <div className="ib-hi">Your ID Card ✦</div>
        </div>

        <div key={animKey} className="ib-card ib-card-anim" style={bgStyle}>
          <div className="ib-cd1" />
          <div className="ib-cd2" />
          <div className="ib-cd3" />

          <div className="ib-ci">
            <div className="ib-ctag">✦ ICEBREAKER ID ✦</div>

            <span className="ib-emoji">{gen.animal}</span>

            <div className="ib-cname">{firstName} {lastName}</div>
            <div className="ib-cdiv" />

            <div className="ib-ctrait">
              I am <strong>{gen.t1}</strong> &amp; <strong>{gen.t2}</strong> {firstName},
            </div>

            <div className="ib-cid">the {gen.identity}</div>

            <div className="ib-cpill">{gen.displayRole}</div>

            <div className="ib-dots">
              {[0, 1, 2, 3, 4].map(i => <div key={i} className="ib-dot" />)}
            </div>
          </div>
        </div>

        <div className="ib-acts">
          <div className="ib-ar">
            <button className="ib-btn ib-dl" onClick={handleDownload}>
              ↓ Download
            </button>
            <button className="ib-btn ib-sh" onClick={handleShare}>
              ↑ Share
            </button>
          </div>
          <button className="ib-btn ib-rg" onClick={handleRegenerate}>
            ↺ &nbsp;Regenerate Identity
          </button>
          <p className="ib-hint">Tap regenerate to shuffle your identity word</p>
        </div>
      </div>

      {toast && <div className="ib-toast">{toast}</div>}
    </div>
  );
}
