import { useState, useEffect, useRef, useMemo } from "react";
import { ShoppingBag, X, ArrowRight, Minus, Plus, Heart } from "lucide-react";

const W = '#F8F6F1', SB = '#EDE6DA', WB = '#6A4A34', OG = '#606B57', DB = '#1A1A1A';
const serif = 'Cormorant Garamond, Georgia, serif';

import icedCoffeeLatte from './assets/products/iced-coffee-latte.png';
import icedMatcha from './assets/products/iced-matcha.png';
import brownSugarBoba from './assets/products/brown-sugar-boba.png';
import strawberryLatte from './assets/products/strawberry-latte.png';
import icedCinnamonLatte from './assets/products/Cinnamon-latte.png';
import espressoShot from './assets/products/Espresso-shot.png';
import aperolSpritz from './assets/products/aperol-spritz.png';
import cozyMartini from './assets/products/cozy-martinin-goed.png';
import honeyJar from './assets/products/honey-jar.png';
import collectieImg from './assets/collectie-goed.png';
import kaarsVerkoop from './assets/kaars-verkoop.png';
import heroVideo from './assets/hero-video-long.mp4';

const PRODUCTS = [
  { id:1, name:'Iced Coffee Latte', scent:'Met een heerlijke geur van versgemalen koffie', price:17.50, bg:'#D6C9B4', fg:'#5A3A24', image: icedCoffeeLatte },
  { id:7, name:'Aperol Spritz', scent:'Fris, sprankelend en vol zonnige sinaasappeltonen', price:15, bg:'#E8B87A', fg:'#7A3A10', image: aperolSpritz },
  { id:2, name:'Iced Matcha', scent:'Zachte vanilletonen met een romige matcha twist', price:17.50, bg:'#B8C9A8', fg:'#3A5230', image: icedMatcha },
  { id:6, name:'Espresso Shot', scent:'Diepe koffietonen van een versgezette espresso', price:5, bg:'#8B6B54', fg:'#2A1A0A', image: espressoShot },
  { id:5, name:'Strawberry Latte', scent:'Zoete aardbeien met een romige, frisse touch', price:17.50, bg:'#D4ADA8', fg:'#7A3030', image: strawberryLatte },
  { id:4, name:'Iced Cinnamon Latte', scent:'Warme kaneelkruiden zoals in een versgemaakte latte', price:17.50, bg:'#D4AA88', fg:'#6A3A1A', image: icedCinnamonLatte },
  { id:3, name:'Brown Sugar Bubble Tea', scent:'De warme zoetheid van gesmolten karamel', price:17.50, bg:'#C9A97A', fg:'#5A3010', image: brownSugarBoba },
  { id:8, name:'Cozy Martini', scent:'Zoete passievrucht met zachte vanilletonen', price:15, bg:'#B89870', fg:'#4A2A10', image: cozyMartini },
  { id:9, name:'Honey Jar', scent:'De zachte geur van gouden honing', price:15, bg:'#D4C090', fg:'#5A4010', image: honeyJar },
];

const SHAPES = [
  { tl:'3rem', tr:'1rem', br:'4rem', bl:'1.5rem' },
  { tl:'1rem', tr:'4rem', br:'1.5rem', bl:'3rem' },
  { tl:'2rem', tr:'2.5rem', br:'2rem', bl:'2.5rem' },
  { tl:'4rem', tr:'1.5rem', br:'3.5rem', bl:'1rem' },
  { tl:'1.5rem', tr:'3rem', br:'1rem', bl:'4rem' },
];

function IconInstagram({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none"/>
    </svg>
  );
}

function IconTikTok({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
  );
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return y;
}

function Logo({ light, onClick }) {
  return (
    <span onClick={onClick} style={{ fontFamily: serif, fontSize: '1.75rem', fontWeight: 300, letterSpacing: '-0.01em', color: light ? W : WB, lineHeight: 1, cursor: 'pointer' }}>
      cozycandles
    </span>
  );
}

function Navbar({ count, onCart, page, setPage }) {
  return (
    <nav style={{
      position:'fixed', top:0, width:'100%', zIndex:50,
      padding: '12px 64px',
      display:'flex', justifyContent:'space-between', alignItems:'center',
      background: 'rgba(248,246,241,0.55)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid rgba(200,190,178,0.2)',
      boxShadow: '0 1px 20px rgba(0,0,0,0.06)',
    }}>
      <div style={{ flex:1, display:'flex', gap:40 }}>
        <a className="nav-link" onClick={() => { setPage('home'); setTimeout(() => document.getElementById('collection')?.scrollIntoView({ behavior:'smooth' }), 50); }}
          style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.4em', fontWeight:600, color: WB, textDecoration:'none', cursor:'pointer' }}>
          Collectie
        </a>
        <a className="nav-link" onClick={() => { setPage('about'); window.scrollTo({ top:0, behavior:'smooth' }); }}
          style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.4em', fontWeight:600, color: WB, textDecoration:'none', cursor:'pointer' }}>
          Over Ons
        </a>
      </div>
      <Logo light={false} onClick={() => { setPage('home'); window.scrollTo({ top:0, behavior:'smooth' }); }} />
      <div style={{ flex:1, display:'flex', justifyContent:'flex-end', alignItems:'center', gap:16 }}>
        <button className="cart-btn" onClick={onCart} style={{ position:'relative', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:8, transition:'opacity 0.2s' }}>
          <div className="cart-pill" style={{ display:'flex', alignItems:'center', padding:'8px 20px', border:'1px solid rgba(106,74,52,0.2)', borderRadius:9999, transition:'border-color 0.2s, background 0.2s' }}>
            <span style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.3em', fontWeight:700, color: WB }}>Selectie</span>
          </div>
          <ShoppingBag size={22} color={WB} />
          {count > 0 && <span style={{ position:'absolute', top:-4, right:-4, background:OG, color:'#fff', fontSize:8, width:16, height:16, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>{count}</span>}
        </button>
      </div>
    </nav>
  );
}

function Cart({ open, onClose, items, update }) {
  const total = items.reduce((s,i) => s + i.price * i.quantity, 0);
  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(26,26,26,0.4)', backdropFilter:'blur(6px)', zIndex:60, opacity:open?1:0, pointerEvents:open?'auto':'none', transition:'opacity 0.5s' }} />
      <div style={{ position:'fixed', right:16, top:16, bottom:16, width:'100%', maxWidth:440, background:W, zIndex:70, borderRadius:'2rem', boxShadow:'0 25px 80px rgba(0,0,0,0.2)', transform:open?'translateX(0)':'translateX(120%)', transition:'transform 0.7s cubic-bezier(0.16,1,0.3,1)', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'40px 40px 24px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h2 style={{ fontFamily:serif, fontSize:'2rem', color:WB, margin:0 }}>Jouw Selectie</h2>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:8, borderRadius:'50%' }}><X size={22} color={WB} /></button>
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:'0 40px', display:'flex', flexDirection:'column', gap:24 }}>
          {items.length === 0 ? (
            <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', opacity:0.3, paddingTop:80, gap:16 }}>
              <ShoppingBag size={40} strokeWidth={1} color={WB} />
              <p style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.3em', fontWeight:700, color:WB }}>Mandje is nog leeg</p>
            </div>
          ) : items.map(i => (
            <div key={i.id} style={{ display:'flex', gap:20, alignItems:'center' }}>
              <div style={{ width:72, height:88, borderRadius:16, background:i.bg, flexShrink:0, overflow:'hidden' }}>
                {i.image
                  ? <img src={i.image} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt={i.name} />
                  : <span style={{ fontFamily:serif, fontSize:11, fontStyle:'italic', color:i.fg, textAlign:'center', padding:4, display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>{i.name}</span>
                }
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:WB, margin:'0 0 4px' }}>{i.name}</p>
                <p style={{ fontFamily:serif, fontSize:11, fontStyle:'italic', color:'rgba(106,74,52,0.6)', margin:'0 0 12px' }}>{i.scent}</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div style={{ display:'flex', alignItems:'center', border:'1px solid rgba(106,74,52,0.1)', borderRadius:9999, padding:'2px 4px', background:'rgba(255,255,255,0.5)' }}>
                    <button onClick={() => update(i.id,-1)} style={{ background:'none', border:'none', cursor:'pointer', padding:6 }}><Minus size={10} /></button>
                    <span style={{ fontSize:10, fontWeight:700, padding:'0 12px' }}>{i.quantity}</span>
                    <button onClick={() => update(i.id,1)} style={{ background:'none', border:'none', cursor:'pointer', padding:6 }}><Plus size={10} /></button>
                  </div>
                  <span style={{ fontSize:14, fontWeight:700, color:WB }}>€{i.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding:'24px 40px 40px', borderTop:'1px solid rgba(200,190,178,0.4)', marginTop:8 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:24 }}>
            <span style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(106,74,52,0.6)', fontWeight:700 }}>Subtotaal</span>
            <span style={{ fontFamily:serif, fontSize:'1.3rem', color:WB }}>€{total.toFixed(2)}</span>
          </div>
          <button style={{ width:'100%', background:WB, color:'#fff', border:'none', borderRadius:9999, padding:'18px 0', fontSize:10, textTransform:'uppercase', letterSpacing:'0.4em', fontWeight:700, cursor:'pointer' }}>Afrekenen</button>
        </div>
      </div>
    </>
  );
}

function ProductCard({ product, index }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  const [added, setAdded] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const sh = SHAPES[index % SHAPES.length];
  const offsets = [0, 64, 32];
  const handleAdd = () => { product.onAdd(product); setAdded(true); setTimeout(() => setAdded(false), 1500); };

  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:'flex', flexDirection:'column', marginBottom:48, opacity:vis?1:0, transform:vis?`translateY(${offsets[index%3]}px)`:`translateY(${offsets[index%3]+64}px)`, transition:'opacity 0.9s ease, transform 0.9s ease' }}>
      <div style={{ aspectRatio:'4/5', width:'100%', background:product.bg, position:'relative', overflow:'hidden', borderRadius:`${sh.tl} ${sh.tr} ${sh.br} ${sh.bl}`, boxShadow:hov?'0 20px 60px rgba(106,74,52,0.2)':'0 4px 20px rgba(106,74,52,0.1)', transition:'box-shadow 0.5s ease' }}>
        {product.image ? (
          <img src={product.image} alt={product.name} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 4s ease', transform:hov?'scale(1.08)':'scale(1)' }} />
        ) : (
          <>
            <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35) 0%, transparent 60%)` }} />
            <svg viewBox="0 0 200 280" style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'55%', opacity:0.7 }}>
              <rect x="60" y="120" width="80" height="140" rx="8" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
              <ellipse cx="100" cy="120" rx="40" ry="7" fill="rgba(255,255,255,0.4)"/>
              <line x1="100" y1="90" x2="100" y2="120" stroke={product.fg} strokeWidth="1.5" strokeLinecap="round"/>
              <ellipse cx="100" cy="84" rx="4" ry="7" fill="#F5C842" opacity="0.9"/>
              <ellipse cx="100" cy="87" rx="2.5" ry="4" fill="#FF8C00" opacity="0.7"/>
            </svg>
          </>
        )}
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.06)', opacity:hov?1:0, transition:'opacity 0.4s' }} />
        <button onClick={handleAdd} style={{ position:'absolute', bottom:40, left:'50%', transform:`translateX(-50%) translateY(${hov?0:16}px)`, background:added?OG:'rgba(248,246,241,0.97)', color:added?'#fff':WB, border:'none', borderRadius:9999, padding:'10px 40px', fontSize:9, textTransform:'uppercase', letterSpacing:'0.3em', fontWeight:700, opacity:hov?1:0, transition:'opacity 0.3s, transform 0.3s, background 0.3s', cursor:'pointer', whiteSpace:'nowrap', display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
          {added ? <span>✓ Toegevoegd</span> : (<><span>Voeg toe</span><span style={{ fontSize:8, letterSpacing:'0.15em', opacity:0.7 }}>€{Number(product.price).toFixed(2).replace('.',',')}</span></>)}
        </button>
      </div>
      <div style={{ marginTop:24, padding:'0 8px' }}>
        <p style={{ fontSize:11, textTransform:'uppercase', letterSpacing:'0.2em', fontWeight:700, color:WB, margin:'0 0 4px' }}>{product.name}</p>
        <p style={{ fontFamily:serif, fontSize:14, fontStyle:'italic', color:'rgba(106,74,52,0.6)', margin:0 }}>{product.scent}</p>
      </div>
    </div>
  );
}

function SectionWave({ from, to, flip = false }) {
  const d = flip
    ? "M0,20 C360,65 1080,65 1440,20 L1440,80 L0,80 Z"
    : "M0,60 C360,15 1080,15 1440,60 L1440,80 L0,80 Z";
  return (
    <div style={{ display:'block', lineHeight:0, background:from, marginBottom:-1 }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display:'block', width:'100%', height:80 }}>
        <path d={d} fill={to} />
      </svg>
    </div>
  );
}

function AboutPage({ setPage }) {
  const ref1 = useRef(null); const [v1, setV1] = useState(false);
  const ref2 = useRef(null); const [v2, setV2] = useState(false);
  const ref3 = useRef(null); const [v3, setV3] = useState(false);
  const ref4 = useRef(null); const [v4, setV4] = useState(false);

  useEffect(() => {
    const entries = [[ref1, setV1],[ref2, setV2],[ref3, setV3],[ref4, setV4]];
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) entries.find(([r]) => r.current === e.target)?.[1](true); }, { threshold: 0.15 });
    entries.forEach(([r]) => { if (r.current) obs.observe(r.current); });
    return () => obs.disconnect();
  }, []);

  const fadeIn = (vis, delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
  });

  return (
    <div style={{ background: W }}>

      {/* Verhaal */}
      <section style={{ padding:'clamp(64px,10vw,120px) clamp(24px,6vw,120px)', paddingTop:'clamp(100px,12vw,160px)', background:'radial-gradient(ellipse at 60% 50%, #5A3A24 0%, #1A1A1A 70%)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(48px,6vw,96px)', alignItems:'center' }}>
          <div ref={ref1} style={fadeIn(v1)}>
            <p style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'0.5em', fontWeight:700, color:OG, margin:'0 0 20px' }}>Hoe het begon</p>
            <h2 style={{ fontFamily:serif, fontSize:'clamp(2rem,4vw,3.2rem)', color:W, lineHeight:1.2, margin:'0 0 28px', fontWeight:300, fontStyle:'italic' }}>Een hobby tussen moeder en dochter.</h2>
            <p style={{ fontFamily:serif, fontSize:'1.1rem', fontStyle:'italic', color:'rgba(248,246,241,0.9)', lineHeight:1.9, margin:'0 0 32px' }}>
              Alles begon gewoon thuis — twee mensen, een pan was, wat geuren en veel lachen. Moeder en dochter ontdekten samen de magie van kaarsen maken. De kaarsen werden steeds mooier, de geuren steeds verfijnder. En dochter — inmiddels 10 jaar oud — bleek een echte ondernemer in de dop.
            </p>
            <p style={{ fontFamily:serif, fontSize:'clamp(1.1rem,2vw,1.4rem)', fontStyle:'italic', color:'rgba(248,246,241,0.55)', lineHeight:1.7, margin:0, borderLeft:`2px solid ${OG}`, paddingLeft:20 }}>
              "Ze verkocht ze op een zelfgemaakt winkeltje op de stoep. Met een krijtbord en zelfgemaakte prijskaartjes. Geweldig toch!"
            </p>
          </div>
          <div ref={ref1} style={{ ...fadeIn(v1, 0.2), aspectRatio:'4/5', background: SB, borderRadius:'4rem 1rem 4rem 1rem', overflow:'hidden', boxShadow:'0 30px 80px rgba(106,74,52,0.12)' }}>
            <img src={collectieImg} alt="cozy candles collectie" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
        </div>
      </section>

      {/* Groei */}
      <section style={{ padding:'clamp(64px,10vw,120px) clamp(24px,6vw,120px)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(48px,6vw,96px)', alignItems:'center' }}>
          <div ref={ref3} style={{ ...fadeIn(v3, 0.1), aspectRatio:'4/5', background:'#D6C9B4', borderRadius:'1rem 4rem 1rem 4rem', overflow:'hidden', boxShadow:'0 30px 80px rgba(106,74,52,0.12)' }}>
            <img src={kaarsVerkoop} alt="kaarsen verkoop" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
          <div ref={ref3} style={fadeIn(v3, 0.25)}>
            <p style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'0.5em', fontWeight:700, color:OG, margin:'0 0 20px' }}>Wat klein begon, groeide vanzelf.</p>
            <h2 style={{ fontFamily:serif, fontSize:'clamp(2rem,4vw,3.2rem)', color:DB, lineHeight:1.2, margin:'0 0 28px', fontWeight:300, fontStyle:'italic' }}>Van stoep tot webshop.</h2>
            <p style={{ fontFamily:serif, fontSize:'1.1rem', fontStyle:'italic', color:'rgba(106,74,52,0.7)', lineHeight:1.9, margin:0 }}>
              Het winkeltje op de stoep trok meer bezoekers dan verwacht. Buren, vrienden, vreemden — iedereen wilde een kaars mee naar huis. Het enthousiasme was zo groot dat Cozy Candles al snel uitgroeide tot een echte webshop.
            </p>
          </div>
        </div>
      </section>

      {/* Waarden */}
      <section style={{ background: DB, padding:'clamp(64px,8vw,100px) clamp(24px,6vw,120px)' }}>
        <div ref={ref4} style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ ...fadeIn(v4), textAlign:'center', marginBottom:64 }}>
            <h2 style={{ fontFamily:serif, fontStyle:'italic', fontWeight:300, fontSize:'clamp(2rem,5vw,4rem)', color:W, margin:'0 0 16px' }}>Waarom Cozy Candles?</h2>
            <p style={{ fontFamily:serif, fontSize:'1.1rem', fontStyle:'italic', color:'rgba(248,246,241,0.45)', margin:0 }}>Elke kaars is een klein verhaal. Dit is het onze.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:32 }}>
            {[
              { title:'Handgegoten', text:'Elke kaars wordt met de hand gegoten — nooit in bulk, altijd met aandacht voor elk detail.' },
              { title:'Herbruikbaar glas', text:'Het glas is ontworpen om te blijven. Na het branden wordt het een vaasje, een potje of een drinkglas.' },
              { title:'Uniek cadeau', text:'Op zoek naar een cadeau dat echt iets zegt? Een Cozy Candle is persoonlijk, mooi en onvergetelijk.' },
              { title:'Eerlijke ingrediënten', text:'We gebruiken soja-was en hoogwaardige geuroliën. Goed voor jou, beter voor de wereld.' },
              { title:'Limited batches', text:'We gieten in kleine batches. Dat betekent dat elke kaars extra bijzonder is — en soms even weg.' },
              { title:'Op maat', text:'Staat jouw geur er niet bij? Stuur een berichtje. We denken graag mee over een kaars speciaal voor jou.' },
            ].map((v, i) => (
              <div key={v.title} style={{ ...fadeIn(v4, 0.1 * (i % 3)), background:'rgba(255,255,255,0.04)', borderRadius:24, padding:32, border:'1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.3em', fontWeight:700, color:OG, margin:'0 0 12px' }}>{v.title}</p>
                <p style={{ fontFamily:serif, fontSize:'1rem', fontStyle:'italic', color:'rgba(248,246,241,0.5)', lineHeight:1.8, margin:0 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social + CTA */}
      <section style={{ background: SB, padding:'clamp(64px,8vw,100px) clamp(24px,6vw,120px)', textAlign:'center' }}>
        <p style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'0.5em', fontWeight:700, color:OG, margin:'0 0 20px' }}>Volg ons</p>
        <h2 style={{ fontFamily:serif, fontStyle:'italic', fontWeight:300, fontSize:'clamp(2rem,5vw,3.5rem)', color:DB, margin:'0 0 16px' }}>Kom ons volgen op social media</h2>
        <p style={{ fontFamily:serif, fontSize:'1.1rem', fontStyle:'italic', color:'rgba(106,74,52,0.6)', margin:'0 0 40px', lineHeight:1.8 }}>
          Achter de schermen, nieuwe geuren, kaarsjes die branden — we delen het allemaal.
        </p>
        <div style={{ display:'flex', justifyContent:'center', gap:20, marginBottom:64 }}>
          <a href="https://instagram.com/cozycandles" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:12, padding:'14px 28px', background:WB, color:W, borderRadius:9999, fontSize:10, textTransform:'uppercase', letterSpacing:'0.3em', fontWeight:700, textDecoration:'none' }}>
            <IconInstagram size={16} color={W} /> Instagram
          </a>
          <a href="https://tiktok.com/@cozycandles" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:12, padding:'14px 28px', background:DB, color:W, borderRadius:9999, fontSize:10, textTransform:'uppercase', letterSpacing:'0.3em', fontWeight:700, textDecoration:'none' }}>
            <IconTikTok size={16} color={W} /> TikTok
          </a>
        </div>
      </section>

      <FooterSection setPage={setPage} />
    </div>
  );
}

function ContactPage({ setPage }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = e => { e.preventDefault(); setSent(true); };
  const inputStyle = { width:'100%', background:'transparent', border:'none', borderBottom:`1px solid rgba(106,74,52,0.2)`, padding:'12px 0', fontSize:'1rem', fontFamily:serif, fontStyle:'italic', color:WB, outline:'none', marginBottom:32 };

  return (
    <div style={{ background:W }}>
      <section style={{ minHeight:'40vh', background:DB, display:'flex', alignItems:'center', justifyContent:'center', paddingTop:120, paddingBottom:80 }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 40% 60%, #5A3A24 0%, #1A1A1A 70%)', position:'relative' }} />
        <div style={{ textAlign:'center', padding:'0 clamp(24px,6vw,120px)', position:'relative', zIndex:1 }}>
          <p style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'0.5em', fontWeight:700, color:OG, margin:'0 0 20px' }}>Neem contact op</p>
          <h1 style={{ fontFamily:serif, fontStyle:'italic', fontWeight:300, fontSize:'clamp(3rem,7vw,5.5rem)', color:W, margin:'0 0 20px', lineHeight:1.1 }}>Hallo! Hoe kunnen<br/>we je helpen?</h1>
          <p style={{ fontFamily:serif, fontSize:'1.1rem', fontStyle:'italic', color:'rgba(248,246,241,0.5)', margin:0 }}>We reageren altijd zo snel mogelijk — meestal binnen 1 werkdag.</p>
        </div>
      </section>

      <section style={{ padding:'clamp(64px,8vw,100px) clamp(24px,6vw,120px)' }}>
        <div style={{ maxWidth:680, margin:'0 auto' }}>
          {sent ? (
            <div style={{ textAlign:'center', padding:'80px 0' }}>
              <p style={{ fontSize:'3rem', marginBottom:24 }}>🕯️</p>
              <h2 style={{ fontFamily:serif, fontStyle:'italic', fontWeight:300, fontSize:'clamp(2rem,4vw,3rem)', color:DB, margin:'0 0 16px' }}>Bedankt voor je berichtje!</h2>
              <p style={{ fontFamily:serif, fontSize:'1.1rem', fontStyle:'italic', color:'rgba(106,74,52,0.6)', lineHeight:1.8, margin:'0 0 40px' }}>We nemen zo snel mogelijk contact met je op. In de tussentijd mag je altijd nog een kaarsje uitzoeken. 😊</p>
              <button className="btn-primary" onClick={() => { setPage('home'); window.scrollTo({top:0}); }} style={{ display:'inline-flex', alignItems:'center', gap:12, padding:'16px 40px', background:WB, color:W, border:'none', borderRadius:9999, fontSize:10, textTransform:'uppercase', letterSpacing:'0.3em', fontWeight:700, cursor:'pointer' }}>
                Naar de collectie <ArrowRight size={13} />
              </button>
            </div>
          ) : (
            <>
              <p style={{ fontFamily:serif, fontSize:'1.1rem', fontStyle:'italic', color:'rgba(106,74,52,0.6)', lineHeight:1.9, margin:'0 0 48px', textAlign:'center' }}>
                Heb je een vraag over een bestelling, wil je een kaars op maat, of gewoon even hallo zeggen? Vul het formulier in en we komen er zo snel mogelijk op terug.
              </p>
              <form onSubmit={submit}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 32px' }}>
                  <div><label style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'0.3em', fontWeight:700, color:'rgba(106,74,52,0.4)' }}>Naam</label><input required value={form.name} onChange={set('name')} style={inputStyle} placeholder="Jouw naam" /></div>
                  <div><label style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'0.3em', fontWeight:700, color:'rgba(106,74,52,0.4)' }}>E-mail</label><input required type="email" value={form.email} onChange={set('email')} style={inputStyle} placeholder="jouw@email.nl" /></div>
                </div>
                <div>
                  <label style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'0.3em', fontWeight:700, color:'rgba(106,74,52,0.4)' }}>Onderwerp</label>
                  <select value={form.subject} onChange={set('subject')} style={{ ...inputStyle, cursor:'pointer' }}>
                    <option value="">Kies een onderwerp...</option>
                    <option>Vraag over mijn bestelling</option>
                    <option>Kaars op maat</option>
                    <option>Samenwerking / winkels</option>
                    <option>Iets anders</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'0.3em', fontWeight:700, color:'rgba(106,74,52,0.4)' }}>Bericht</label>
                  <textarea required rows={5} value={form.message} onChange={set('message')} style={{ ...inputStyle, resize:'vertical', borderBottom:'none', border:`1px solid rgba(106,74,52,0.2)`, borderRadius:12, padding:'16px', marginBottom:40 }} placeholder="Schrijf hier je bericht..." />
                </div>
                <button className="btn-primary" type="submit" style={{ width:'100%', background:WB, color:W, border:'none', borderRadius:9999, padding:'18px 0', fontSize:10, textTransform:'uppercase', letterSpacing:'0.4em', fontWeight:700, cursor:'pointer' }}>
                  Verstuur bericht
                </button>
              </form>
            </>
          )}
        </div>
      </section>
      <FooterSection setPage={setPage} />
    </div>
  );
}

function FAQPage({ setPage }) {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q:'Hoe lang duurt de levering?', a:'We versturen bestellingen binnen 2-3 werkdagen. Na verzending ontvang je een Track & Trace. Gemiddeld is je kaarsje er binnen 5 werkdagen.' },
    { q:'Zijn de kaarsen handgemaakt?', a:'Ja, elk kaarsje wordt met de hand gegoten — in kleine batches, met aandacht voor elk detail. Geen fabriek, geen massaproductie. Puur ambacht.' },
    { q:'Kan ik een kaars op maat bestellen?', a:'Zeker! Staat jouw favoriete geur er niet bij? Stuur ons een berichtje via de contactpagina. We denken graag mee over een kaars speciaal voor jou — perfect als persoonlijk cadeau.' },
    { q:'Zijn de glazen herbruikbaar?', a:'Absoluut. Onze kaarsen worden gegoten in mooie glazen die ook na het branden een plekje verdienen. Gebruik ze als drinkglas, vaasje of potje. Ze zijn ook vaatwasbestendig!' },
    { q:'Welke was gebruiken jullie?', a:'We gebruiken 100% sojawasx — een duurzame, plantaardige was die schoner brandt dan paraffine. Gecombineerd met hoogwaardige geuroliën voor de beste geur.' },
    { q:'Waar kan ik jullie kaarsen in de winkel kopen?', a:'We liggen inmiddels in een aantal winkels. Neem contact met ons op of volg ons op Instagram en TikTok voor de meest actuele lijst van verkooppunten.' },
    { q:'Hoe zorg ik goed voor mijn kaars?', a:'Knip het lontje voor elke aansteking tot ±5mm. Laat de kaars de eerste keer minimaal 2-3 uur branden zodat de wastafel egaal smelt. Zo geniet je het langst van je geur.' },
    { q:'Kan ik een bestelling annuleren of retourneren?', a:'Heb je je bedacht? Neem dan zo snel mogelijk contact met ons op. Zolang de bestelling nog niet verzonden is, lossen we het graag op. Stuur ons een berichtje!' },
  ];

  return (
    <div style={{ background:W }}>
      <section style={{ minHeight:'35vh', background:DB, display:'flex', alignItems:'center', justifyContent:'center', paddingTop:120, paddingBottom:80, position:'relative' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 60% 40%, #4A3828 0%, #1A1A1A 70%)' }} />
        <div style={{ textAlign:'center', padding:'0 clamp(24px,6vw,120px)', position:'relative', zIndex:1 }}>
          <p style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'0.5em', fontWeight:700, color:OG, margin:'0 0 20px' }}>Veelgestelde vragen</p>
          <h1 style={{ fontFamily:serif, fontStyle:'italic', fontWeight:300, fontSize:'clamp(3rem,7vw,5.5rem)', color:W, margin:'0 0 20px', lineHeight:1.1 }}>FAQ</h1>
          <p style={{ fontFamily:serif, fontSize:'1.1rem', fontStyle:'italic', color:'rgba(248,246,241,0.5)', margin:0 }}>Staat je vraag er niet bij? Stuur ons gerust een berichtje.</p>
        </div>
      </section>

      <section style={{ padding:'clamp(64px,8vw,100px) clamp(24px,6vw,120px)' }}>
        <div style={{ maxWidth:760, margin:'0 auto', display:'flex', flexDirection:'column', gap:0 }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom:`1px solid rgba(106,74,52,0.1)` }}>
              <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)} style={{ width:'100%', background:'none', border:'none', cursor:'pointer', padding:'28px 0', display:'flex', justifyContent:'space-between', alignItems:'center', gap:24, textAlign:'left', borderRadius:8, transition:'background 0.2s' }}>
                <span style={{ fontFamily:serif, fontSize:'1.2rem', color:DB, fontWeight:400, lineHeight:1.4 }}>{f.q}</span>
                <span style={{ fontSize:'1.4rem', color:OG, flexShrink:0, transition:'transform 0.3s', transform:open===i?'rotate(45deg)':'rotate(0deg)', display:'inline-block' }}>+</span>
              </button>
              <div style={{ maxHeight:open===i?400:0, overflow:'hidden', transition:'max-height 0.4s ease' }}>
                <p style={{ fontFamily:serif, fontSize:'1.1rem', fontStyle:'italic', color:'rgba(106,74,52,0.65)', lineHeight:1.9, margin:'0 0 28px', paddingRight:40 }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth:760, margin:'64px auto 0', textAlign:'center', padding:48, background:SB, borderRadius:24 }}>
          <p style={{ fontFamily:serif, fontSize:'1.4rem', fontStyle:'italic', color:DB, margin:'0 0 8px' }}>Staat je vraag er niet bij?</p>
          <p style={{ fontFamily:serif, fontSize:'1rem', fontStyle:'italic', color:'rgba(106,74,52,0.6)', margin:'0 0 28px' }}>We helpen je graag verder.</p>
          <button className="btn-primary" onClick={() => { setPage('contact'); window.scrollTo({top:0,behavior:'smooth'}); }} style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 36px', background:WB, color:W, border:'none', borderRadius:9999, fontSize:10, textTransform:'uppercase', letterSpacing:'0.3em', fontWeight:700, cursor:'pointer' }}>
            Neem contact op <ArrowRight size={13} />
          </button>
        </div>
      </section>
      <FooterSection setPage={setPage} />
    </div>
  );
}

function FooterSection({ setPage }) {
  return (
    <footer style={{ background:'#161616', color:W, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-20%', left:'30%', width:'60vw', height:'60vw', background:'rgba(255,255,255,0.04)', borderRadius:'50%', filter:'blur(120px)', pointerEvents:'none' }} />
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'80px 64px 48px', display:'grid', gridTemplateColumns:'1fr 2fr', gap:64, position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
          <span style={{ fontFamily:serif, fontSize:'1.75rem', fontWeight:300, color:W }}>cozycandles</span>
          <p style={{ fontSize:9, letterSpacing:'0.25em', lineHeight:2.2, color:'rgba(248,246,241,0.3)', textTransform:'uppercase', margin:0 }}>ZACHT, RUSTIG & TIJDLOOS.<br/>HANDGEGOTEN MET LIEFDE.</p>
          <div style={{ display:'flex', gap:20 }}>
            <a className="social-icon" href="https://instagram.com/cozycandles" target="_blank" rel="noopener noreferrer" style={{ opacity:0.35 }}>
              <IconInstagram size={20} color={W} />
            </a>
            <a className="social-icon" href="https://tiktok.com/@cozycandles" target="_blank" rel="noopener noreferrer" style={{ opacity:0.35 }}>
              <IconTikTok size={20} color={W} />
            </a>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:40 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <h6 style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'0.5em', fontWeight:700, color:OG, margin:0 }}>Atelier</h6>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:14 }}>
              <li className="footer-link" onClick={() => { if(setPage) { window.scrollTo({top:0}); setTimeout(() => document.getElementById('collection')?.scrollIntoView({behavior:'smooth'}),50); }}} style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(248,246,241,0.28)', cursor:'pointer' }}>Collectie</li>
              <li className="footer-link" onClick={() => { if(setPage) { setPage('about'); window.scrollTo({top:0,behavior:'smooth'}); }}} style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(248,246,241,0.28)', cursor:'pointer' }}>Ons Verhaal</li>
            </ul>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <h6 style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'0.5em', fontWeight:700, color:OG, margin:0 }}>Help</h6>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:14 }}>
              <li className="footer-link" onClick={() => { setPage('contact'); window.scrollTo({top:0,behavior:'smooth'}); }} style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(248,246,241,0.28)', cursor:'pointer' }}>Contact</li>
              <li className="footer-link" onClick={() => { setPage('faq'); window.scrollTo({top:0,behavior:'smooth'}); }} style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(248,246,241,0.28)', cursor:'pointer' }}>FAQ</li>
            </ul>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <h6 style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'0.5em', fontWeight:700, color:OG, margin:0 }}>Updates</h6>
            <div style={{ display:'flex', borderBottom:'1px solid rgba(248,246,241,0.1)', paddingBottom:8 }}>
              <input type="email" placeholder="EMAIL" style={{ background:'transparent', fontSize:9, letterSpacing:'0.25em', outline:'none', flex:1, color:'rgba(248,246,241,0.5)', textTransform:'uppercase', border:'none' }} />
              <button style={{ fontSize:9, letterSpacing:'0.25em', fontWeight:700, color:'rgba(248,246,241,0.35)', background:'none', border:'none', cursor:'pointer', textTransform:'uppercase' }}>OK</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ borderTop:'1px solid rgba(248,246,241,0.05)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'24px 64px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'0.4em', color:'rgba(248,246,241,0.1)' }}>© 2025 COZY CANDLES.</span>
          <span style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'0.4em', fontStyle:'italic', color:'rgba(248,246,241,0.1)' }}>MADE WITH LOVE.</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [page, setPage] = useState('home');
  const scrollY = useScrollY();

  const addToCart = p => {
    setCart(prev => { const ex = prev.find(i => i.id===p.id); return ex ? prev.map(i => i.id===p.id?{...i,quantity:i.quantity+1}:i) : [...prev,{...p,quantity:1}]; });
    setCartOpen(true);
  };
  const update = (id,d) => setCart(prev => prev.map(i => i.id===id?{...i,quantity:Math.max(0,i.quantity+d)}:i).filter(i=>i.quantity>0));
  const totalItems = useMemo(() => cart.reduce((s,i)=>s+i.quantity,0), [cart]);
  const productsWithAdd = PRODUCTS.map(p => ({ ...p, onAdd: addToCart }));

  return (
    <div style={{ minHeight:'100vh', background:W, color:WB, fontFamily:'Inter, sans-serif' }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" />
      <style>{`
        html{scroll-behavior:smooth}*{box-sizing:border-box}a{text-decoration:none}
        .nav-link{transition:color 0.2s,border-bottom-color 0.2s;border-bottom:1px solid transparent;padding-bottom:2px}
        .nav-link:hover{color:#606B57 !important;border-bottom-color:#606B57}
        .cart-btn:hover .cart-pill{border-color:#606B57 !important;background:rgba(96,107,87,0.08)}
        .cart-btn:hover svg{stroke:#606B57}
        .btn-primary{transition:background 0.2s,transform 0.15s,box-shadow 0.2s}
        .btn-primary:hover{background:#4A3424 !important;transform:translateY(-1px);box-shadow:0 8px 30px rgba(0,0,0,0.25) !important}
        .btn-light:hover{background:#ede6da !important;transform:translateY(-1px)}
        .footer-link{transition:color 0.2s}
        .footer-link:hover{color:rgba(248,246,241,0.75) !important}
        .social-icon{transition:opacity 0.2s,transform 0.2s;display:inline-flex}
        .social-icon:hover{opacity:1 !important;transform:scale(1.15)}
        .faq-btn:hover{background:rgba(106,74,52,0.04)}
      `}</style>

      <Navbar count={totalItems} onCart={() => setCartOpen(true)} page={page} setPage={setPage} />
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} items={cart} update={update} />

      {page === 'about' ? <AboutPage setPage={setPage} /> :
       page === 'contact' ? <ContactPage setPage={setPage} /> :
       page === 'faq' ? <FAQPage setPage={setPage} /> : (
        <>
          {/* Hero */}
          <section style={{ position:'relative', minHeight:'85vh', display:'flex', flexDirection:'column', overflow:'hidden', background:DB }}>
            <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="hg1" cx="55%" cy="40%" r="70%"><stop offset="0%" stopColor="#7A5040" stopOpacity="0.9"/><stop offset="100%" stopColor="#1A1A1A" stopOpacity="1"/></radialGradient>
                <radialGradient id="hg2" cx="15%" cy="75%" r="55%"><stop offset="0%" stopColor="#606B57" stopOpacity="0.4"/><stop offset="100%" stopColor="#1A1A1A" stopOpacity="0"/></radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="#1A1A1A"/>
              <rect width="100%" height="100%" fill="url(#hg1)"/>
              <rect width="100%" height="100%" fill="url(#hg2)"/>
            </svg>
            <video autoPlay muted loop playsInline src={heroVideo} onLoadedData={e => e.target.playbackRate = 1} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.75 }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(26,26,26,0.35) 0%, transparent 45%, rgba(26,26,26,0.95) 100%)' }} />
            <div style={{ position:'relative', zIndex:10, flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'0 64px' }}>
              <div style={{ width:'100%', maxWidth:960 }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                  <p style={{ fontFamily:serif, fontSize:'clamp(1rem,2vw,1.5rem)', letterSpacing:'0.3em', color:'rgba(248,246,241,0.75)', textTransform:'uppercase', lineHeight:1, transform:'translateX(-20%) rotate(-2deg)', alignSelf:'flex-start', marginLeft:'36%', marginBottom:'-0.2em' }}>For</p>
                  <h1 style={{ fontFamily:serif, fontStyle:'italic', fontWeight:300, fontSize:'clamp(4rem,11vw,9.5rem)', color:W, lineHeight:0.9, letterSpacing:'-0.01em', margin:0, textAlign:'center' }}>scentsational</h1>
                  <p style={{ fontFamily:serif, fontSize:'clamp(1.8rem,5vw,4.5rem)', color:'rgba(248,246,241,0.9)', letterSpacing:'0.08em', lineHeight:1, transform:'rotate(1deg)', alignSelf:'flex-end', marginRight:'12%', marginTop:'-0.1em' }}>moments.</p>
                </div>
              </div>
            </div>
            <div style={{ position:'relative', zIndex:20, display:'flex', justifyContent:'center', paddingBottom:64, paddingTop:32 }}>
              <a href="#collection" className="btn-light" style={{ display:'inline-flex', alignItems:'center', gap:16, padding:'18px 48px', background:'rgba(248,246,241,0.97)', color:WB, borderRadius:9999, fontSize:11, textTransform:'uppercase', letterSpacing:'0.4em', fontWeight:700, boxShadow:'0 8px 40px rgba(0,0,0,0.2)', transition:'background 0.2s,transform 0.15s' }}>
                Ontdek de Collectie <ArrowRight size={14} />
              </a>
            </div>
          </section>

          {/* Brand */}
          <section style={{ padding:'clamp(48px,8vw,96px) clamp(24px,5vw,64px)', background:W }}>
            <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', flexWrap:'wrap', alignItems:'center', gap:'clamp(40px,6vw,96px)' }}>
              <div style={{ flex:'1 1 320px', maxWidth:480 }}>
                <div style={{ aspectRatio:'3/4', background:SB, overflow:'hidden', boxShadow:'0 30px 80px rgba(106,74,52,0.15)', borderRadius:'6rem 1.5rem 6rem 1.5rem', position:'relative' }}>
                  <img src={collectieImg} alt="cozy candles collectie" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                </div>
              </div>
              <div style={{ flex:'1 1 320px', display:'flex', flexDirection:'column', gap:32 }}>
                <h2 style={{ fontFamily:serif, fontSize:'clamp(2.5rem,5vw,4rem)', color:DB, lineHeight:1.15, margin:0, fontWeight:300, fontStyle:'italic' }}>Handgemaakte kaarsen,<br/>met liefde gemaakt.</h2>
                <p style={{ fontFamily:serif, fontSize:'1.1rem', fontStyle:'italic', color:'rgba(106,74,52,0.65)', lineHeight:1.8, margin:0 }}>Onze handgemaakte kaarsen worden gegoten in herbruikbare glazen met bamboo deksel (m.u.v. de cocktails & espresso) — ontworpen om ook na het branden een mooi plekje in je interieur te houden.</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px 32px', maxWidth:400, alignItems:'start' }}>
                  {['Uniek cadeau','Limited batches','Heerlijke geuren','Herbruikbaar & vaatwasbestendig'].map(v => (
                    <div key={v} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                      <span style={{ display:'inline-flex', flexShrink:0, marginTop:2 }}><Heart size={10} color={OG} fill={OG} /></span>
                      <span style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.15em', fontWeight:700, color:'rgba(106,74,52,0.5)', lineHeight:1.3 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <SectionWave from={W} to={SB} />

          {/* Collectie */}
          <section id="collection" style={{ padding:'96px 64px', background:'#EDE6DA', backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`, backgroundSize:'300px' }}>
            <div style={{ maxWidth:1280, margin:'0 auto 80px', display:'flex', flexDirection:'column', alignItems:'center', gap:20 }}>
              <h2 style={{ fontFamily:serif, fontSize:'clamp(2.5rem,7vw,6rem)', color:DB, letterSpacing:'-0.02em', textAlign:'center', margin:0 }}>De Collectie</h2>
              <div style={{ width:48, height:1, background:OG }} />
              <p style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.4em', fontWeight:700, color:'rgba(106,74,52,0.4)', fontStyle:'italic', margin:0 }}>9 Ambachtelijke geuren, geïnspireerd op kleine geluksmomenten.</p>
              <p style={{ fontFamily:serif, fontSize:'1rem', fontStyle:'italic', color:'rgba(106,74,52,0.55)', textAlign:'center', margin:0, lineHeight:1.8 }}>Staat jouw favoriete geur of kaarsoort er niet tussen? Stuur ons een berichtje — we bekijken graag de mogelijkheden om die speciaal voor jou te maken.</p>
            </div>
            <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0 48px' }}>
              {productsWithAdd.map((p,i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>

          <FooterSection setPage={setPage} />
        </>
      )}
    </div>
  );
}
