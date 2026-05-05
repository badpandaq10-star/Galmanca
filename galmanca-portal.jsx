import { useState, useRef, useEffect } from "react";

const ADMIN_PASSWORD = "galmanca2025";

const initialData = {
  almanca: [
    { id: 1, baslik: "Begrüßungsausdrücke", seviye: "A1", icerik: "Guten Morgen (Günaydın), Guten Tag (İyi günler), Guten Abend (İyi akşamlar), Auf Wiedersehen (Hoşça kal), Tschüss (Güle güle)", tarih: "2025-03-10" },
    { id: 2, baslik: "Die Farben – Renkler", seviye: "A1", icerik: "rot (kırmızı), blau (mavi), grün (yeşil), gelb (sarı), schwarz (siyah), weiß (beyaz), grau (gri), lila (mor)", tarih: "2025-03-15" },
    { id: 3, baslik: "Zahlen 1–20 – Rakamlar", seviye: "A1", icerik: "eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf, dreizehn, vierzehn, fünfzehn...", tarih: "2025-04-01" },
    { id: 4, baslik: "Der Akkusativ", seviye: "B1", icerik: "den/einen/keinen (eril), die/eine/keine (dişil), das/ein/kein (nötr) — Ich sehe den Mann. Ich kaufe eine Tasche.", tarih: "2025-04-20" },
  ],
  ataturk: [
    { id: 1, soz: "Der wahrhaftigste Wegweiser im Leben ist das Wissen.", kategori: "Bildung", ikon: "📚", tr: "Hayatta en hakiki mürşit ilimdir." },
    { id: 2, soz: "Jugend, ihr seid diejenigen, die unseren Mut stärkt und erhält.", kategori: "Jugend", ikon: "🌟", tr: "Gençler, cesaretimizi takviye ve idame eden sizlersiniz." },
    { id: 3, soz: "Wissenschaft und Technik — wo sie auch sein mögen, wir werden sie nehmen.", kategori: "Wissenschaft", ikon: "🔬", tr: "Bilim ve fen nerede ise oradan alacağız." },
    { id: 4, soz: "Lehrer! Die Republik erwartet von euch Generationen mit freiem Denken.", kategori: "Bildung", ikon: "🏛️", tr: "Öğretmenler! Cumhuriyet sizden fikri hür nesiller ister." },
    { id: 5, soz: "Eine Nation kann nur durch die Armee der Bildung dauerhaften Ruhm erlangen.", kategori: "Bildung", ikon: "✨", tr: "Zaferlerin kalıcı olması ancak irfan ordusuyla kaimdir." },
    { id: 6, soz: "Das Erreichen des Niveaus zeitgenössischer Zivilisationen ist unser Grundziel.", kategori: "Wissenschaft", ikon: "🚀", tr: "Muasır medeniyetler seviyesine çıkmak temel hedefimizdir." },
  ],
  galeri: [
    { id: 1, baslik: "Abiturfeier 2024-2025", tarih: "15.06.2025", emoji: "🎓", imgUrl: null },
    { id: 2, baslik: "Wissenschaftsmesse", tarih: "22.04.2025", emoji: "🔭", imgUrl: null },
    { id: 3, baslik: "23 April Feier", tarih: "23.04.2025", emoji: "🎉", imgUrl: null },
    { id: 4, baslik: "Sporttage", tarih: "10.05.2025", emoji: "⚽", imgUrl: null },
    { id: 5, baslik: "Deutsches Theaterstück", tarih: "20.03.2025", emoji: "🎭", imgUrl: null },
    { id: 6, baslik: "Lesefestival", tarih: "14.02.2025", emoji: "📖", imgUrl: null },
  ],
  gazete: [
    { id: 1, baslik: "Frühlingsausgabe 2025", sayi: "Ausgabe 14", tarih: "April 2025", ozet: "Wissenschaftsmesse, Schülergedichte und Neuigkeiten aus der Deutschabteilung.", renk: "#e94560", pdfUrl: null, pdfName: null, kapakUrl: null },
    { id: 2, baslik: "Winterausgabe 2024", sayi: "Ausgabe 13", tarih: "Dezember 2024", ozet: "Erfolge unserer Absolventen, Schulnachrichten und exklusive Interviews.", renk: "#4A90D9", pdfUrl: null, pdfName: null, kapakUrl: null },
    { id: 3, baslik: "Herbstausgabe 2024", sayi: "Ausgabe 12", tarih: "Oktober 2024", ozet: "Willkommensausgabe für das neue Schuljahr. Neue Schüler und neue Projekte.", renk: "#27AE60", pdfUrl: null, pdfName: null, kapakUrl: null },
  ],
  duyurular: [
    { id: 1, icerik: "🎓 Die Abiturfeier findet am 15. Juni statt.", tarih: "vor 2 Stunden" },
    { id: 2, icerik: "📚 Die B1-Prüfungsergebnisse wurden veröffentlicht.", tarih: "vor 1 Tag" },
    { id: 3, icerik: "⚽ Anmeldungen für das Fußballturnier haben begonnen!", tarih: "vor 3 Tagen" },
    { id: 4, icerik: "🗞️ Die neue Ausgabe der Schulzeitung ist erschienen.", tarih: "vor 1 Woche" },
  ],
};

const C = {
  bg: "#070710", surface: "#0e0e1a", surface2: "#14141f", surface3: "#1c1c2a",
  border: "#252535", accent: "#e94560", accentDim: "#e9456022", accentGlow: "rgba(233,69,96,0.35)",
  gold: "#f0b429", goldGlow: "rgba(240,180,41,0.25)", cyan: "#00d4ff", cyanGlow: "rgba(0,212,255,0.25)",
  text: "#dde0ee", textMuted: "#5a5a7a", textDim: "#8888aa", white: "#ffffff",
};

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=DM+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: ${C.surface}; }
    ::-webkit-scrollbar-thumb { background: ${C.accent}; border-radius: 10px; }
    select option { background: ${C.surface3}; color: ${C.text}; }

    @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes slideLeft { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
    @keyframes slideRight { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
    @keyframes glow { 0%,100%{box-shadow:0 0 8px ${C.accentGlow}} 50%{box-shadow:0 0 28px ${C.accentGlow},0 0 56px ${C.accentGlow}} }
    @keyframes scanLine { 0%{transform:translateY(-10px)} 100%{transform:translateY(100vh)} }
    @keyframes glitch1 { 0%,100%{clip-path:inset(0 0 98% 0);transform:translateX(0)} 20%{clip-path:inset(15% 0 60% 0);transform:translateX(-4px)} 40%{clip-path:inset(50% 0 30% 0);transform:translateX(4px)} 60%{clip-path:inset(80% 0 5% 0);transform:translateX(-2px)} }
    @keyframes glitch2 { 0%,100%{clip-path:inset(0 0 98% 0);transform:translateX(0)} 25%{clip-path:inset(20% 0 50% 0);transform:translateX(4px)} 50%{clip-path:inset(60% 0 20% 0);transform:translateX(-4px)} 75%{clip-path:inset(85% 0 3% 0);transform:translateX(2px)} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes gridMove { from{background-position:0 0} to{background-position:40px 40px} }
    @keyframes accentBar { from{transform:scaleY(0)} to{transform:scaleY(1)} }
    @keyframes cardReveal { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
    @keyframes iconBounce { 0%,100%{transform:scale(1) rotate(0)} 40%{transform:scale(1.2) rotate(4deg)} 70%{transform:scale(0.95) rotate(-2deg)} }
    @keyframes neonFlicker { 0%,19%,21%,23%,25%,54%,56%,100%{text-shadow:0 0 8px ${C.accent},0 0 20px ${C.accent},0 0 40px ${C.accent}} 20%,24%,55%{text-shadow:none} }
    @keyframes blink { 50%{opacity:0} }
    @keyframes countUp { from{opacity:0;transform:scale(0.6)} to{opacity:1;transform:scale(1)} }
    @keyframes heroGlow { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
    @keyframes sidebarSlide { from{transform:translateX(-100%)} to{transform:translateX(0)} }
    @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }

    .nav-btn { transition:all 0.22s cubic-bezier(.4,0,.2,1) !important; }
    .nav-btn:hover { background:${C.accentDim} !important; color:${C.accent} !important; transform:translateY(-2px) !important; }
    .card-hover { transition:transform 0.3s cubic-bezier(.4,0,.2,1),border-color 0.3s,box-shadow 0.3s !important; }
    .card-hover:hover { transform:translateY(-7px) !important; border-color:${C.accent}66 !important; box-shadow:0 20px 50px ${C.accentGlow} !important; }
    .glow-btn { transition:all 0.22s !important; }
    .glow-btn:hover { box-shadow:0 0 20px ${C.accentGlow} !important; transform:translateY(-2px) !important; }
    .shimmer-logo { background:linear-gradient(90deg,${C.white} 0%,${C.accent} 40%,${C.cyan} 60%,${C.white} 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
    .shimmer-logo:hover { animation:shimmer 1.4s linear infinite; }
    .sidebar-collapsed { width:56px !important; }
    .sidebar-collapsed .sidebar-label { display:none !important; }
    .sidebar-collapsed .sidebar-logo-text { display:none !important; }
    .sidebar-nav-btn { display:flex; align-items:center; gap:10px; width:100%; padding:10px 12px; border-radius:10px; border:none; cursor:pointer; font-size:13px; text-align:left; font-family:'DM Sans',sans-serif; transition:all 0.2s; margin-bottom:2px; }
    .sidebar-collapsed .sidebar-nav-btn { justify-content:center; padding:10px 0; }

    @media (max-width:768px) {
      .desktop-nav { display:none !important; }
      .mobile-menu-btn { display:flex !important; }
      .main-pad { padding:18px 12px !important; }
      .school-label { display:none !important; }
      .hero-h1 { font-size:24px !important; }
      .admin-sidebar-desktop { display:none !important; }
      .admin-content { margin-left:0 !important; padding:16px 12px !important; }
    }
    @media (min-width:769px) {
      .mobile-menu-btn { display:none !important; }
      .mobile-drop { display:none !important; }
      .admin-mobile-topbar { display:none !important; }
    }
  `}</style>
);

// ─── PARTICLE CANVAS ──────────────────────────────────────────────────────────
const ParticleBg = () => {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth, H = canvas.height = window.innerHeight;
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      color: ["#e94560", "#00d4ff", "#ffffff"][Math.floor(Math.random() * 3)],
      alpha: Math.random() * 0.55 + 0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx*dx+dy*dy);
        if (d < 120) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(233,69,96,${0.07*(1-d/120)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.4 }} />;
};

const ScanLine = () => (
  <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, right: 0, height: 3, background: "linear-gradient(transparent, rgba(233,69,96,0.05) 50%, transparent)", animation: "scanLine 7s linear infinite" }} />
    <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.02) 3px,rgba(0,0,0,0.02) 4px)" }} />
  </div>
);

const GlitchText = ({ children }) => (
  <span style={{ position: "relative", display: "inline-block" }}>
    {children}
    <span style={{ position: "absolute", inset: 0, color: "#00d4ff", animation: "glitch1 5s infinite", userSelect: "none", pointerEvents: "none" }}>{children}</span>
    <span style={{ position: "absolute", inset: 0, color: C.accent, animation: "glitch2 5s infinite 0.6s", userSelect: "none", pointerEvents: "none" }}>{children}</span>
  </span>
);

const AnimCounter = ({ value }) => {
  const [n, setN] = useState(0);
  useEffect(() => { let cur = 0; const step = () => { cur = Math.min(cur + Math.ceil(value / 18), value); setN(cur); if (cur < value) requestAnimationFrame(step); }; requestAnimationFrame(step); }, [value]);
  return <>{n}</>;
};

const Typewriter = ({ text, delay = 0 }) => {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown(""); let i = 0;
    const t = setTimeout(() => { const iv = setInterval(() => { setShown(text.slice(0, ++i)); if (i >= text.length) clearInterval(iv); }, 36); return () => clearInterval(iv); }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);
  return <>{shown}<span style={{ borderRight: `2px solid ${C.accent}`, animation: "blink 0.9s step-end infinite", marginLeft: 1 }} /></>;
};

const Badge = ({ children, color = C.accent }) => (
  <span style={{ background: color+"22", color, border: `1px solid ${color}55`, padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, display: "inline-block" }}>{children}</span>
);

const Btn = ({ children, onClick, variant = "primary", small = false, style: extra = {}, disabled = false }) => {
  const v = {
    primary: { background: C.accent, color: "#fff", border: "none", boxShadow: `0 4px 18px ${C.accentGlow}` },
    ghost: { background: "transparent", color: C.accent, border: `1.5px solid ${C.accent}` },
    danger: { background: "#b8291e", color: "#fff", border: "none" },
    dark: { background: C.surface3, color: C.text, border: `1px solid ${C.border}` },
  };
  return (
    <button onClick={onClick} disabled={disabled} className="glow-btn" style={{ ...v[variant], borderRadius: small ? 8 : 10, padding: small ? "5px 12px" : "9px 20px", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, fontSize: small ? 12 : 13, fontWeight: 700, letterSpacing: 0.3, display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans',sans-serif", ...extra }}>{children}</button>
  );
};

const Modal = ({ title, onClose, children }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, backdropFilter: "blur(8px)", animation: "fadeIn 0.2s ease" }} onClick={onClose}>
    <div style={{ background: C.surface, borderRadius: 20, padding: 28, maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto", border: `1px solid ${C.border}`, boxShadow: `0 0 70px rgba(0,0,0,0.7),0 0 0 1px ${C.accent}22`, animation: "fadeUp 0.3s ease" }} onClick={e => e.stopPropagation()}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: C.text }}>{title}</h3>
        <button onClick={onClose} style={{ background: C.surface3, border: `1px solid ${C.border}`, borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16, color: C.textDim, transition: "all 0.2s" }}
          onMouseOver={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = "#fff"; }}
          onMouseOut={e => { e.currentTarget.style.background = C.surface3; e.currentTarget.style.color = C.textDim; }}>×</button>
      </div>
      {children}
    </div>
  </div>
);

const Field = ({ label, value, onChange, type = "text", rows }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 5, letterSpacing: 1.5, textTransform: "uppercase" }}>{label}</label>
    {rows
      ? <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.text, background: C.surface3, boxSizing: "border-box", outline: "none", resize: "vertical", fontFamily: "'DM Sans',sans-serif", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
      : <input type={type} value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.text, background: C.surface3, boxSizing: "border-box", outline: "none", fontFamily: "'DM Sans',sans-serif", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
    }
  </div>
);

const ImageUploadBox = ({ value, onChange, label = "Fotoğraf Yükle" }) => {
  const ref = useRef();
  const handle = e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = ev => onChange(ev.target.result); r.readAsDataURL(f); };
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 5, letterSpacing: 1.5, textTransform: "uppercase" }}>{label}</label>
      <div style={{ border: `2px dashed ${C.border}`, borderRadius: 12, padding: 18, textAlign: "center", cursor: "pointer", background: C.surface3, transition: "border-color 0.2s,background 0.2s", minHeight: 100, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
        onClick={() => ref.current.click()}
        onMouseOver={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.background = C.accentDim; }}
        onMouseOut={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.surface3; }}>
        {value
          ? <img src={value} alt="" style={{ maxHeight: 120, borderRadius: 8, maxWidth: "100%", objectFit: "cover" }} />
          : <><div style={{ fontSize: 30, marginBottom: 6, animation: "float 2s ease-in-out infinite" }}>📷</div><div style={{ fontSize: 13, color: C.textDim }}>Tıklayın veya sürükleyin</div><div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>JPG, PNG, WEBP</div></>
        }
      </div>
      <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={handle} />
      {value && <button onClick={() => onChange(null)} style={{ marginTop: 6, background: "transparent", border: `1px solid ${C.border}`, borderRadius: 7, padding: "4px 10px", fontSize: 11, color: C.textMuted, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>✕ Görseli Kaldır</button>}
    </div>
  );
};

const SectionTitle = ({ children, subtitle }) => (
  <div style={{ marginBottom: 30, animation: "slideLeft 0.5s ease both" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
      <div style={{ width: 3, height: 30, background: `linear-gradient(180deg,${C.accent},${C.cyan})`, borderRadius: 4, animation: "accentBar 0.6s ease both", transformOrigin: "top" }} />
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>{children}</h2>
    </div>
    {subtitle && <p style={{ margin: "0 0 0 15px", color: C.textMuted, fontSize: 13 }}>{subtitle}</p>}
  </div>
);

// ─── FRONTEND SECTIONS ────────────────────────────────────────────────────────
const AlmancaSection = ({ data }) => (
  <div>
    <SectionTitle subtitle="Almanca dilbilgisi, kelime listeleri ve pratik notlar">🇩🇪 Almanca Öğrenim Köşesi</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 16 }}>
      {data.map((item, i) => (
        <div key={item.id} className="card-hover" style={{ background: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, padding: 22, position: "relative", overflow: "hidden", animation: `cardReveal 0.5s ease both`, animationDelay: `${i*0.07}s` }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${C.accent},${C.cyan})` }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <Badge color={item.seviye === "A1" ? "#27AE60" : item.seviye === "B1" ? "#F39C12" : C.accent}>{item.seviye}</Badge>
            <span style={{ fontSize: 11, color: C.textMuted }}>{item.tarih}</span>
          </div>
          <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 700, color: C.text }}>{item.baslik}</h3>
          <p style={{ margin: 0, fontSize: 13, color: C.textDim, lineHeight: 1.75 }}>{item.icerik}</p>
          <div style={{ position: "absolute", bottom: -25, right: -15, fontSize: 75, opacity: 0.04, animation: `float ${3+i*0.4}s ease-in-out infinite` }}>🇩🇪</div>
        </div>
      ))}
    </div>
  </div>
);

const AtaturkSection = ({ data }) => (
  <div>
    <SectionTitle subtitle="Atatürk'ün sözleri — Almanca ve Türkçe">🏛️ Atatürk Köşesi</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 18 }}>
      {data.map((item, i) => (
        <div key={item.id} className="card-hover" style={{ background: [C.surface2,"#0a1628","#120a14"][i%3], borderRadius: 16, padding: 24, position: "relative", overflow: "hidden", border: `1px solid ${C.border}`, animation: `cardReveal 0.5s ease both`, animationDelay: `${i*0.08}s` }}>
          <div style={{ position: "absolute", top: -18, right: -18, fontSize: 88, opacity: 0.05, animation: `float ${3+i*0.5}s ease-in-out infinite` }}>{item.ikon}</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.accent, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 18, height: 1, background: C.accent, display: "inline-block" }} /> AUF DEUTSCH
          </div>
          <div style={{ fontSize: 28, marginBottom: 12, display: "inline-block" }}>{item.ikon}</div>
          <blockquote style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.85, fontStyle: "italic", color: C.text, fontWeight: 500, borderLeft: `2px solid ${C.accent}44`, paddingLeft: 12 }}>„{item.soz}"</blockquote>
          <p style={{ margin: "0 0 14px", fontSize: 12, color: C.textMuted, fontStyle: "italic", lineHeight: 1.6, paddingLeft: 12 }}>🇹🇷 {item.tr}</p>
          <div style={{ paddingTop: 10, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase" }}>Mustafa Kemal Atatürk</span>
            <Badge color={C.cyan}>{item.kategori}</Badge>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const GaleriSection = ({ data }) => (
  <div>
    <SectionTitle subtitle="Okul etkinliklerimizden unutulmaz kareler">📸 Fotoğraf Galerisi</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 14 }}>
      {data.map((item, i) => (
        <div key={item.id} style={{ borderRadius: 16, aspectRatio: "4/3", overflow: "hidden", cursor: "pointer", position: "relative", border: `1px solid ${C.border}`, background: item.imgUrl ? "none" : `radial-gradient(ellipse at 30% 30%,${C.surface3},${C.surface2})`, transition: "transform 0.35s cubic-bezier(.4,0,.2,1),box-shadow 0.35s,border-color 0.35s", animation: `cardReveal 0.5s ease both`, animationDelay: `${i*0.07}s` }}
          onMouseOver={e => { e.currentTarget.style.transform = "scale(1.06) rotate(-0.5deg)"; e.currentTarget.style.boxShadow = `0 22px 60px ${C.accentGlow}`; e.currentTarget.style.borderColor = C.accent+"66"; }}
          onMouseOut={e => { e.currentTarget.style.transform = "scale(1) rotate(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = C.border; }}>
          {item.imgUrl
            ? <img src={item.imgUrl} alt={item.baslik} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 46, marginBottom: 10, animation: `float ${2.2+i*0.3}s ease-in-out infinite` }}>{item.emoji}</div>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 13, textAlign: "center", padding: "0 12px" }}>{item.baslik}</div>
              <div style={{ color: C.textMuted, fontSize: 11, marginTop: 5 }}>{item.tarih}</div>
            </div>}
          {item.imgUrl && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "22px 14px 12px", background: "linear-gradient(transparent,rgba(0,0,0,0.85))" }}><div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{item.baslik}</div><div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>{item.tarih}</div></div>}
          <div style={{ position: "absolute", top: 10, right: 10, width: 7, height: 7, borderRadius: "50%", background: C.accent, animation: `pulse ${1.8+i*0.3}s ease-in-out infinite`, boxShadow: `0 0 10px ${C.accent}` }} />
        </div>
      ))}
    </div>
  </div>
);

const GazeteSection = ({ data }) => (
  <div>
    <SectionTitle subtitle="Dijital okul gazetesi — PDF formatında indirin">🗞️ Schulzeitung / Okul Gazetesi</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 18 }}>
      {data.map((item, i) => (
        <div key={item.id} className="card-hover" style={{ background: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden", position: "relative", animation: `cardReveal 0.5s ease both`, animationDelay: `${i*0.08}s` }}>
          <div style={{ height: 5, background: item.renk, boxShadow: `0 0 20px ${item.renk}88` }} />
          {/* Kapak Fotoğrafı */}
          {item.kapakUrl && (
            <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
              <img src={item.kapakUrl} alt={item.baslik} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(transparent 40%, ${C.surface})` }} />
            </div>
          )}
          <div style={{ padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <Badge color={item.renk}>{item.sayi}</Badge>
              <span style={{ fontSize: 12, color: C.textMuted }}>{item.tarih}</span>
            </div>
            <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 700, color: C.text }}>{item.baslik}</h3>
            <p style={{ margin: "0 0 18px", fontSize: 13, color: C.textDim, lineHeight: 1.7 }}>{item.ozet}</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              {item.pdfUrl
                ? <a href={item.pdfUrl} download={item.pdfName || "gazete.pdf"} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", color: item.renk, border: `1.5px solid ${item.renk}55`, borderRadius: 9, padding: "7px 14px", fontSize: 12, fontWeight: 700, textDecoration: "none", transition: "all 0.25s" }}
                  onMouseOver={e => { e.currentTarget.style.background = item.renk+"22"; e.currentTarget.style.boxShadow = `0 0 18px ${item.renk}55`; }}
                  onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}>📄 PDF İndir</a>
                : <span style={{ fontSize: 12, color: C.textMuted, fontStyle: "italic" }}>📄 PDF yok</span>}
            </div>
          </div>
          <div style={{ position: "absolute", bottom: -25, right: -15, fontSize: 78, opacity: 0.04 }}>🗞️</div>
        </div>
      ))}
    </div>
  </div>
);

const DuyuruSection = ({ data }) => (
  <div>
    <SectionTitle subtitle="Güncel okul duyuruları ve haberler">📢 Duyurular / Bekanntmachungen</SectionTitle>
    <div style={{ display: "grid", gap: 12 }}>
      {data.map((item, i) => (
        <div key={item.id} style={{ background: C.surface, borderRadius: 14, padding: "14px 18px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 14, transition: "border-color 0.25s,transform 0.25s,box-shadow 0.25s", position: "relative", overflow: "hidden", animation: `slideLeft 0.4s ease both`, animationDelay: `${i*0.07}s` }}
          onMouseOver={e => { e.currentTarget.style.borderColor = C.accent+"55"; e.currentTarget.style.transform = "translateX(5px)"; e.currentTarget.style.boxShadow = `inset 4px 0 0 ${C.accent}`; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: C.surface3, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, border: `1px solid ${C.border}`, animation: `pulse ${2+i*0.5}s ease-in-out infinite` }}>{item.icerik.split(" ")[0]}</div>
          <p style={{ margin: 0, fontSize: 14, color: C.text, fontWeight: 500, flex: 1 }}>{item.icerik.slice(item.icerik.indexOf(" ")+1)}</p>
          <span style={{ fontSize: 11, color: C.textMuted, whiteSpace: "nowrap" }}>{item.tarih}</span>
        </div>
      ))}
    </div>
  </div>
);

// ─── ADMIN SECTIONS ───────────────────────────────────────────────────────────
const AdminList = ({ items, onEdit, onDel, renderItem }) => (
  <div style={{ display: "grid", gap: 10 }}>
    {items.map((item, i) => (
      <div key={item.id} style={{ background: C.surface2, borderRadius: 12, padding: "14px 18px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 14, animation: `slideLeft 0.4s ease both`, animationDelay: `${i*0.05}s`, transition: "border-color 0.2s" }}
        onMouseOver={e => e.currentTarget.style.borderColor = C.accent+"44"}
        onMouseOut={e => e.currentTarget.style.borderColor = C.border}>
        <div style={{ flex: 1, minWidth: 0 }}>{renderItem(item)}</div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <Btn small variant="dark" onClick={() => onEdit(item)}>✏️</Btn>
          <Btn small variant="danger" onClick={() => onDel(item.id)}>🗑️</Btn>
        </div>
      </div>
    ))}
  </div>
);

const AdminAlmanca = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ baslik: "", seviye: "A1", icerik: "", tarih: "" });
  const openAdd = () => { setForm({ baslik: "", seviye: "A1", icerik: "", tarih: new Date().toISOString().slice(0,10) }); setModal("add"); };
  const save = () => { if (modal === "add") setData(d => [...d, {...form, id: Date.now()}]); else setData(d => d.map(x => x.id === form.id ? form : x)); setModal(null); };
  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: C.text }}>Almanca İçerikleri</h3>
        <Btn onClick={openAdd}>+ Yeni Ekle</Btn>
      </div>
      <AdminList items={data} onEdit={item => { setForm({...item}); setModal("edit"); }} onDel={id => setData(d => d.filter(x => x.id !== id))}
        renderItem={item => <><div style={{ display:"flex", gap:8, marginBottom:4 }}><Badge color={item.seviye==="A1"?"#27AE60":"#F39C12"}>{item.seviye}</Badge></div><div style={{ fontWeight:600, color:C.text, fontSize:14 }}>{item.baslik}</div><div style={{ fontSize:11, color:C.textMuted }}>{item.tarih}</div></>} />
      {modal && (
        <Modal title={modal==="add"?"Yeni Konu Ekle":"Konuyu Düzenle"} onClose={() => setModal(null)}>
          <Field label="Başlık" value={form.baslik} onChange={v => setForm(f=>({...f,baslik:v}))} />
          <div style={{ marginBottom:14 }}>
            <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.accent, marginBottom:5, letterSpacing:1.5, textTransform:"uppercase" }}>Seviye</label>
            <select value={form.seviye} onChange={e => setForm(f=>({...f,seviye:e.target.value}))} style={{ width:"100%", padding:"10px 14px", borderRadius:10, border:`1.5px solid ${C.border}`, fontSize:13, color:C.text, background:C.surface3, outline:"none" }}>
              {["A1","A2","B1","B2","C1"].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <Field label="İçerik" value={form.icerik} onChange={v => setForm(f=>({...f,icerik:v}))} rows={4} />
          <Field label="Tarih" type="date" value={form.tarih} onChange={v => setForm(f=>({...f,tarih:v}))} />
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:16 }}>
            <Btn variant="ghost" onClick={() => setModal(null)}>İptal</Btn>
            <Btn onClick={save}>💾 Kaydet</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

const AdminAtaturk = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ soz:"", tr:"", kategori:"Bildung", ikon:"📚" });
  const openAdd = () => { setForm({ soz:"", tr:"", kategori:"Bildung", ikon:"📚" }); setModal("add"); };
  const save = () => { if (modal==="add") setData(d=>[...d,{...form,id:Date.now()}]); else setData(d=>d.map(x=>x.id===form.id?form:x)); setModal(null); };
  return (
    <div style={{ animation:"fadeUp 0.4s ease" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <h3 style={{ margin:0, fontSize:18, fontWeight:800, color:C.text }}>Atatürk Sözleri (Almanca)</h3>
        <Btn onClick={openAdd}>+ Söz Ekle</Btn>
      </div>
      <AdminList items={data} onEdit={item=>{setForm({...item});setModal("edit");}} onDel={id=>setData(d=>d.filter(x=>x.id!==id))}
        renderItem={item=><><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:20}}>{item.ikon}</span><Badge color={C.accent}>{item.kategori}</Badge></div><p style={{margin:"0 0 3px",fontSize:13,color:C.text,fontStyle:"italic",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>„{item.soz}"</p><p style={{margin:0,fontSize:12,color:C.textMuted}}>🇹🇷 {item.tr}</p></>} />
      {modal && (
        <Modal title={modal==="add"?"Yeni Söz Ekle":"Sözü Düzenle"} onClose={()=>setModal(null)}>
          <Field label="Almanca Söz" value={form.soz} onChange={v=>setForm(f=>({...f,soz:v}))} rows={3} />
          <Field label="Türkçe Orijinal" value={form.tr} onChange={v=>setForm(f=>({...f,tr:v}))} rows={2} />
          <Field label="Kategori" value={form.kategori} onChange={v=>setForm(f=>({...f,kategori:v}))} />
          <Field label="İkon (emoji)" value={form.ikon} onChange={v=>setForm(f=>({...f,ikon:v}))} />
          <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:16}}>
            <Btn variant="ghost" onClick={()=>setModal(null)}>İptal</Btn>
            <Btn onClick={save}>💾 Kaydet</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

const AdminGaleri = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ baslik:"", tarih:"", emoji:"📸", imgUrl:null });
  const openAdd = () => { setForm({ baslik:"", tarih:"", emoji:"📸", imgUrl:null }); setModal("add"); };
  const save = () => { if (modal==="add") setData(d=>[...d,{...form,id:Date.now()}]); else setData(d=>d.map(x=>x.id===form.id?form:x)); setModal(null); };
  return (
    <div style={{ animation:"fadeUp 0.4s ease" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <h3 style={{ margin:0, fontSize:18, fontWeight:800, color:C.text }}>Fotoğraf Galerisi</h3>
        <Btn onClick={openAdd}>+ Fotoğraf Ekle</Btn>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:12 }}>
        {data.map((item,i) => (
          <div key={item.id} style={{ borderRadius:12, overflow:"hidden", border:`1px solid ${C.border}`, animation:`cardReveal 0.4s ease both`, animationDelay:`${i*0.06}s`, transition:"border-color 0.2s,transform 0.2s" }}
            onMouseOver={e=>{e.currentTarget.style.borderColor=C.accent+"66";e.currentTarget.style.transform="scale(1.03)";}}
            onMouseOut={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="scale(1)";}}>
            <div style={{ aspectRatio:"4/3", background:item.imgUrl?"none":C.surface3, display:"flex", alignItems:"center", justifyContent:"center", fontSize:34, overflow:"hidden" }}>
              {item.imgUrl?<img src={item.imgUrl} alt={item.baslik} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:item.emoji}
            </div>
            <div style={{ padding:"10px 12px", background:C.surface2 }}>
              <div style={{ fontSize:12, fontWeight:600, color:C.text, marginBottom:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.baslik}</div>
              <div style={{ fontSize:11, color:C.textMuted, marginBottom:8 }}>{item.tarih}</div>
              <div style={{ display:"flex", gap:6 }}>
                <Btn small variant="dark" onClick={()=>{setForm({...item});setModal("edit");}}>✏️</Btn>
                <Btn small variant="danger" onClick={()=>setData(d=>d.filter(x=>x.id!==item.id))}>🗑️</Btn>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <Modal title={modal==="add"?"Fotoğraf Ekle":"Fotoğrafı Düzenle"} onClose={()=>setModal(null)}>
          <Field label="Başlık" value={form.baslik} onChange={v=>setForm(f=>({...f,baslik:v}))} />
          <Field label="Tarih" value={form.tarih} onChange={v=>setForm(f=>({...f,tarih:v}))} />
          <Field label="Emoji" value={form.emoji} onChange={v=>setForm(f=>({...f,emoji:v}))} />
          <ImageUploadBox value={form.imgUrl} onChange={v=>setForm(f=>({...f,imgUrl:v}))} />
          <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:16}}>
            <Btn variant="ghost" onClick={()=>setModal(null)}>İptal</Btn>
            <Btn onClick={save}>💾 Kaydet</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

const AdminGazete = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ baslik:"", sayi:"", tarih:"", ozet:"", renk:C.accent, pdfUrl:null, pdfName:null, kapakUrl:null });
  const pdfRef = useRef();
  const openAdd = () => { setForm({ baslik:"", sayi:"", tarih:"", ozet:"", renk:C.accent, pdfUrl:null, pdfName:null, kapakUrl:null }); setModal("add"); };
  const save = () => { if (modal==="add") setData(d=>[...d,{...form,id:Date.now()}]); else setData(d=>d.map(x=>x.id===form.id?form:x)); setModal(null); };
  const handlePdf = e => { const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=ev=>setForm(f2=>({...f2,pdfUrl:ev.target.result,pdfName:f.name})); r.readAsDataURL(f); };
  return (
    <div style={{ animation:"fadeUp 0.4s ease" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <h3 style={{ margin:0, fontSize:18, fontWeight:800, color:C.text }}>Okul Gazetesi</h3>
        <Btn onClick={openAdd}>+ Sayı Ekle</Btn>
      </div>
      <AdminList items={data} onEdit={item=>{setForm({...item});setModal("edit");}} onDel={id=>setData(d=>d.filter(x=>x.id!==id))}
        renderItem={item=>(
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            {item.kapakUrl && <img src={item.kapakUrl} alt="" style={{width:40,height:40,borderRadius:8,objectFit:"cover",border:`1px solid ${C.border}`,flexShrink:0}} />}
            <div style={{width:6,height:50,background:item.renk,borderRadius:4,flexShrink:0,boxShadow:`0 0 12px ${item.renk}66`}}/>
            <div style={{minWidth:0}}>
              <div style={{fontWeight:700,color:C.text,fontSize:14,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.baslik}</div>
              <div style={{fontSize:12,color:C.textMuted}}>{item.sayi} · {item.tarih}</div>
              {item.pdfName&&<div style={{fontSize:11,color:"#27AE60",marginTop:2}}>📄 {item.pdfName}</div>}
            </div>
          </div>
        )} />
      {modal && (
        <Modal title={modal==="add"?"Yeni Sayı Ekle":"Sayıyı Düzenle"} onClose={()=>setModal(null)}>
          <Field label="Başlık" value={form.baslik} onChange={v=>setForm(f=>({...f,baslik:v}))} />
          <Field label="Sayı (örn: Ausgabe 14)" value={form.sayi} onChange={v=>setForm(f=>({...f,sayi:v}))} />
          <Field label="Tarih" value={form.tarih} onChange={v=>setForm(f=>({...f,tarih:v}))} />
          <Field label="Özet" value={form.ozet} onChange={v=>setForm(f=>({...f,ozet:v}))} rows={3} />
          <Field label="Renk" type="color" value={form.renk} onChange={v=>setForm(f=>({...f,renk:v}))} />

          {/* Kapak Fotoğrafı */}
          <ImageUploadBox value={form.kapakUrl} onChange={v=>setForm(f=>({...f,kapakUrl:v}))} label="Kapak Fotoğrafı" />

          {/* PDF */}
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:C.accent,marginBottom:5,letterSpacing:1.5,textTransform:"uppercase"}}>PDF Yükle</label>
            <div style={{border:`2px dashed ${C.border}`,borderRadius:12,padding:18,textAlign:"center",cursor:"pointer",background:C.surface3,transition:"border-color 0.2s"}}
              onClick={()=>pdfRef.current.click()}
              onMouseOver={e=>e.currentTarget.style.borderColor=C.accent}
              onMouseOut={e=>e.currentTarget.style.borderColor=C.border}>
              {form.pdfName
                ? <><div style={{fontSize:26,marginBottom:4}}>📄</div><div style={{fontSize:13,color:"#27AE60",fontWeight:600}}>{form.pdfName}</div></>
                : <><div style={{fontSize:26,marginBottom:6,animation:"float 2s ease-in-out infinite"}}>📄</div><div style={{fontSize:13,color:C.textDim}}>PDF yüklemek için tıklayın</div></>}
            </div>
            <input ref={pdfRef} type="file" accept=".pdf" style={{display:"none"}} onChange={handlePdf} />
            {form.pdfName && <button onClick={()=>setForm(f=>({...f,pdfUrl:null,pdfName:null}))} style={{marginTop:6,background:"transparent",border:`1px solid ${C.border}`,borderRadius:7,padding:"4px 10px",fontSize:11,color:C.textMuted,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>✕ PDF'i Kaldır</button>}
          </div>

          <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:16}}>
            <Btn variant="ghost" onClick={()=>setModal(null)}>İptal</Btn>
            <Btn onClick={save}>💾 Kaydet</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

const AdminOverview = ({ data }) => {
  const stats = [
    {label:"Almanca Konusu",value:data.almanca.length,icon:"🇩🇪",color:"#27AE60"},
    {label:"Atatürk Sözü",value:data.ataturk.length,icon:"🏛️",color:C.accent},
    {label:"Galeri Albümü",value:data.galeri.length,icon:"📸",color:C.cyan},
    {label:"Gazete Sayısı",value:data.gazete.length,icon:"🗞️",color:C.gold},
  ];
  return (
    <div style={{animation:"fadeUp 0.4s ease"}}>
      <h3 style={{margin:"0 0 4px",fontSize:20,fontWeight:800,color:C.text}}>Genel Bakış</h3>
      <p style={{margin:"0 0 24px",color:C.textMuted,fontSize:13}}>Tüm içeriklerin özeti</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))",gap:14,marginBottom:24}}>
        {stats.map((s,i)=>(
          <div key={s.label} style={{background:C.surface,borderRadius:16,padding:20,border:`1px solid ${C.border}`,position:"relative",overflow:"hidden",transition:"border-color 0.2s,transform 0.2s,box-shadow 0.2s",animation:`cardReveal 0.5s ease both`,animationDelay:`${i*0.09}s`,cursor:"default"}}
            onMouseOver={e=>{e.currentTarget.style.borderColor=s.color+"66";e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=`0 14px 40px ${s.color}33`;}}
            onMouseOut={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:s.color,boxShadow:`0 0 14px ${s.color}`}}/>
            <div style={{fontSize:26,marginBottom:8,animation:`float ${2.5+i*0.35}s ease-in-out infinite`}}>{s.icon}</div>
            <div style={{fontSize:34,fontWeight:900,color:s.color,lineHeight:1,animation:`countUp 0.6s ease both`,animationDelay:`${i*0.1}s`}}><AnimCounter value={s.value}/></div>
            <div style={{fontSize:11,color:C.textMuted,marginTop:5,fontWeight:500}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{background:C.surface,borderRadius:16,padding:22,border:`1px solid ${C.border}`}}>
        <h4 style={{margin:"0 0 16px",color:C.text,fontSize:15,fontWeight:700}}>Son Duyurular</h4>
        {data.duyurular.map((d,i)=>(
          <div key={d.id} style={{display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:`1px solid ${C.border}`,animation:`slideLeft 0.4s ease both`,animationDelay:`${i*0.06}s`,alignItems:"center"}}>
            <span style={{fontSize:13,color:C.textDim,flex:1,marginRight:10}}>{d.icerik}</span>
            <span style={{fontSize:11,color:C.textMuted,whiteSpace:"nowrap"}}>{d.tarih}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminSettings = ({ onLogout }) => {
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(()=>setSaved(false),2500); };
  return (
    <div style={{animation:"fadeUp 0.4s ease"}}>
      <h3 style={{margin:"0 0 4px",fontSize:20,fontWeight:800,color:C.text}}>Ayarlar</h3>
      <p style={{margin:"0 0 22px",color:C.textMuted,fontSize:13}}>Site ve okul bilgilerini düzenleyin</p>
      {[
        {title:"🌐 Site Bilgileri",content:<><Field label="Site Adı" value="Galmanca" onChange={()=>{}}/><Field label="Okul Adı" value="Gaziosmanpaşa Anadolu Lisesi Portalı" onChange={()=>{}}/></>},
        {title:"🎨 Görünüm",content:<div style={{display:"flex",alignItems:"center",gap:14,padding:"12px 16px",background:C.surface3,borderRadius:10,border:`1px solid ${C.border}`}}><div style={{width:36,height:36,borderRadius:8,background:C.accent,boxShadow:`0 0 18px ${C.accentGlow}`,animation:"glow 3s ease-in-out infinite"}}/><div><div style={{fontSize:13,color:C.text,fontWeight:600}}>Vurgu Rengi — {C.accent}</div><div style={{fontSize:12,color:C.textMuted}}>Karanlık tema aktif ✓</div></div></div>},
        {title:"🔒 Güvenlik",content:<><Field label="Yeni Şifre" type="password" value="" onChange={()=>{}}/><Field label="Şifre Tekrar" type="password" value="" onChange={()=>{}}/></>},
      ].map((s,i)=>(
        <div key={i} style={{background:C.surface,borderRadius:16,padding:22,marginBottom:14,border:`1px solid ${C.border}`,animation:`slideLeft 0.4s ease both`,animationDelay:`${i*0.08}s`}}>
          <h4 style={{margin:"0 0 16px",color:C.text,fontSize:14,fontWeight:700,borderBottom:`1px solid ${C.border}`,paddingBottom:10}}>{s.title}</h4>
          {s.content}
        </div>
      ))}
      <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
        <Btn onClick={save}>💾 Değişiklikleri Kaydet</Btn>
        <Btn variant="danger" onClick={onLogout}>🚪 Çıkış Yap</Btn>
        {saved&&<span style={{fontSize:13,color:"#27AE60",fontWeight:600,animation:"fadeIn 0.3s ease"}}>✓ Kaydedildi!</span>}
      </div>
    </div>
  );
};

// ─── ADMIN LOGIN ──────────────────────────────────────────────────────────────
const AdminLogin = ({ onSuccess, onCancel }) => {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);

  const attempt = () => {
    if (pw === ADMIN_PASSWORD) { onSuccess(); }
    else {
      setErr(true); setShake(true); setPw("");
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setErr(false), 3000);
    }
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:20, backdropFilter:"blur(12px)", animation:"fadeIn 0.3s ease" }}>
      <div style={{ background:C.surface, borderRadius:24, padding:36, maxWidth:380, width:"100%", border:`1px solid ${C.border}`, boxShadow:`0 0 80px rgba(0,0,0,0.7), 0 0 0 1px ${C.accent}22`, animation:"fadeUp 0.4s ease" }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ width:56, height:56, background:C.accent, borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:24, color:"#fff", animation:"glow 3s ease-in-out infinite", fontFamily:"'Orbitron',sans-serif", margin:"0 auto 14px" }}>G</div>
          <div style={{ fontWeight:900, fontSize:20, color:C.white, fontFamily:"'Orbitron',sans-serif", letterSpacing:2, marginBottom:4 }}>ADMIN PANELİ</div>
          <div style={{ fontSize:12, color:C.textMuted }}>Galmanca · Gaziosmanpaşa Anadolu Lisesi</div>
        </div>

        {/* Lock icon */}
        <div style={{ textAlign:"center", fontSize:36, marginBottom:20, animation:`float 2.5s ease-in-out infinite` }}>🔐</div>

        <div style={{ marginBottom:16 }}>
          <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.accent, marginBottom:6, letterSpacing:1.5, textTransform:"uppercase" }}>Şifre</label>
          <div style={{ position:"relative", animation: shake ? "shake 0.5s ease" : "none" }}>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setErr(false); }}
              onKeyDown={e => e.key === "Enter" && attempt()}
              placeholder="Admin şifresini girin..."
              style={{ width:"100%", padding:"12px 16px", borderRadius:12, border:`1.5px solid ${err ? C.accent : C.border}`, fontSize:14, color:C.text, background:C.surface3, boxSizing:"border-box", outline:"none", fontFamily:"'DM Sans',sans-serif", transition:"border-color 0.2s", boxShadow: err ? `0 0 16px ${C.accentGlow}` : "none" }}
              onFocus={e => !err && (e.target.style.borderColor = C.accent)}
              onBlur={e => !err && (e.target.style.borderColor = C.border)}
              autoFocus
            />
          </div>
          {err && <div style={{ marginTop:8, fontSize:12, color:C.accent, animation:"fadeIn 0.2s ease", display:"flex", alignItems:"center", gap:5 }}>⚠️ Hatalı şifre, tekrar deneyin.</div>}
        </div>

        <div style={{ display:"flex", gap:10 }}>
          <Btn variant="ghost" onClick={onCancel} style={{ flex:1, justifyContent:"center" }}>← Geri</Btn>
          <Btn onClick={attempt} style={{ flex:1, justifyContent:"center" }}>Giriş Yap →</Btn>
        </div>

        <div style={{ marginTop:18, padding:"12px 14px", background:C.surface3, borderRadius:10, border:`1px solid ${C.border}` }}>
          <div style={{ fontSize:11, color:C.textMuted, textAlign:"center" }}>
            🔒 Varsayılan şifre: <span style={{ color:C.textDim, fontWeight:600 }}>galmanca2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
const AdminPanel = ({ data, setData, updateData, onExit }) => {
  const [adminSection, setAdminSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const adminNav = [
    { id:"overview", label:"Genel Bakış", icon:"📊" },
    { id:"almanca", label:"Almanca", icon:"🇩🇪" },
    { id:"ataturk", label:"Atatürk Sözleri", icon:"🏛️" },
    { id:"galeri", label:"Galeri", icon:"📸" },
    { id:"gazete", label:"Okul Gazetesi", icon:"🗞️" },
    { id:"settings", label:"Ayarlar", icon:"⚙️" },
  ];

  const Sidebar = ({ mobile = false }) => (
    <div style={{
      width: mobile ? 240 : (sidebarOpen ? 220 : 56),
      background: C.surface, borderRight: `1px solid ${C.border}`,
      display:"flex", flexDirection:"column", flexShrink:0,
      height: mobile ? "100%" : "100vh",
      transition: "width 0.3s cubic-bezier(.4,0,.2,1)",
      overflow:"hidden",
      ...(mobile ? { position:"fixed", left:0, top:0, bottom:0, zIndex:200, animation:"sidebarSlide 0.3s ease" } : { position:"sticky", top:0 })
    }}>
      {/* Header */}
      <div style={{ padding:"16px 12px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", minHeight:64 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, overflow:"hidden" }}>
          <div style={{ width:34, height:34, background:C.accent, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:15, color:"#fff", animation:"glow 3s ease-in-out infinite", fontFamily:"'Orbitron',sans-serif", flexShrink:0 }}>G</div>
          {(mobile || sidebarOpen) && (
            <div style={{ animation:"fadeIn 0.2s ease" }}>
              <div style={{ fontWeight:900, fontSize:12, color:C.text, fontFamily:"'Orbitron',sans-serif", letterSpacing:1, whiteSpace:"nowrap" }}>ADMIN</div>
              <div style={{ fontSize:10, color:C.textMuted, whiteSpace:"nowrap" }}>Galmanca</div>
            </div>
          )}
        </div>
        {/* Toggle button — only in desktop sidebar */}
        {!mobile && (
          <button onClick={() => setSidebarOpen(o=>!o)} style={{ background:C.surface3, border:`1px solid ${C.border}`, borderRadius:8, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:C.textDim, fontSize:14, transition:"all 0.2s", flexShrink:0 }}
            onMouseOver={e=>{e.currentTarget.style.background=C.accentDim;e.currentTarget.style.color=C.accent;}}
            onMouseOut={e=>{e.currentTarget.style.background=C.surface3;e.currentTarget.style.color=C.textDim;}}>
            {sidebarOpen ? "◀" : "▶"}
          </button>
        )}
        {mobile && (
          <button onClick={() => setMobileSidebarOpen(false)} style={{ background:C.surface3, border:`1px solid ${C.border}`, borderRadius:8, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:C.textDim, fontSize:14 }}>×</button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:"12px 8px", overflowY:"auto" }}>
        {adminNav.map(item => (
          <button key={item.id} onClick={() => { setAdminSection(item.id); if (mobile) setMobileSidebarOpen(false); }} style={{
            width:"100%", display:"flex", alignItems:"center", gap: (mobile || sidebarOpen) ? 10 : 0,
            justifyContent: (mobile || sidebarOpen) ? "flex-start" : "center",
            padding: (mobile || sidebarOpen) ? "10px 12px" : "10px 0",
            borderRadius:10, border:"none", cursor:"pointer",
            background: adminSection === item.id ? C.accentDim : "transparent",
            color: adminSection === item.id ? C.accent : C.textDim,
            fontWeight: adminSection === item.id ? 700 : 400, marginBottom:2,
            fontSize:13, textAlign:"left", fontFamily:"'DM Sans',sans-serif",
            borderLeft: adminSection === item.id ? `2px solid ${C.accent}` : "2px solid transparent",
            transition:"all 0.2s",
          }}
            title={(!mobile && !sidebarOpen) ? item.label : ""}
            onMouseOver={e=>{if(adminSection!==item.id){e.currentTarget.style.background=C.surface3;e.currentTarget.style.color=C.text;}}}
            onMouseOut={e=>{if(adminSection!==item.id){e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.textDim;}}}>
            <span style={{ fontSize:18, flexShrink:0 }}>{item.icon}</span>
            {(mobile || sidebarOpen) && <span style={{ whiteSpace:"nowrap", animation:"fadeIn 0.2s ease" }}>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer actions */}
      <div style={{ padding:"10px 8px", borderTop:`1px solid ${C.border}`, display:"flex", flexDirection:"column", gap:6 }}>
        <button onClick={onExit} style={{ width:"100%", display:"flex", alignItems:"center", gap:(mobile||sidebarOpen)?10:0, justifyContent:(mobile||sidebarOpen)?"flex-start":"center", padding:(mobile||sidebarOpen)?"9px 12px":"9px 0", borderRadius:10, border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", background:C.goldGlow, color:C.gold, fontWeight:600, fontSize:12, transition:"all 0.2s" }}
          title={(!mobile&&!sidebarOpen)?"Siteyi Gör":""}>
          <span style={{fontSize:16}}>👁️</span>
          {(mobile||sidebarOpen)&&<span style={{whiteSpace:"nowrap"}}>Siteyi Gör</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:C.bg, fontFamily:"'DM Sans',sans-serif" }}>
      {/* Desktop sidebar */}
      <div className="admin-sidebar-desktop"><Sidebar /></div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <>
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:199, backdropFilter:"blur(4px)" }} onClick={() => setMobileSidebarOpen(false)} />
          <Sidebar mobile />
        </>
      )}

      {/* Content */}
      <div className="admin-content" style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, overflowX:"hidden" }}>
        {/* Mobile top bar */}
        <div className="admin-mobile-topbar" style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background:C.surface, borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:50 }}>
          <button onClick={() => setMobileSidebarOpen(true)} style={{ background:C.surface2, border:`1px solid ${C.border}`, borderRadius:8, width:36, height:36, cursor:"pointer", fontSize:18, color:C.textDim, display:"flex", alignItems:"center", justifyContent:"center" }}>☰</button>
          <div style={{ fontWeight:900, fontSize:14, color:C.text, fontFamily:"'Orbitron',sans-serif", letterSpacing:1 }}>
            {adminNav.find(n=>n.id===adminSection)?.icon} {adminNav.find(n=>n.id===adminSection)?.label}
          </div>
          <button onClick={onExit} style={{ marginLeft:"auto", background:C.goldGlow, border:"none", borderRadius:8, padding:"6px 12px", fontSize:12, color:C.gold, cursor:"pointer", fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>👁️ Site</button>
        </div>

        {/* Main content */}
        <div style={{ flex:1, padding:"28px 24px", overflowY:"auto" }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            {adminSection==="overview" && <AdminOverview data={data}/>}
            {adminSection==="almanca" && <AdminAlmanca data={data.almanca} setData={updateData("almanca")}/>}
            {adminSection==="ataturk" && <AdminAtaturk data={data.ataturk} setData={updateData("ataturk")}/>}
            {adminSection==="galeri" && <AdminGaleri data={data.galeri} setData={updateData("galeri")}/>}
            {adminSection==="gazete" && <AdminGazete data={data.gazete} setData={updateData("gazete")}/>}
            {adminSection==="settings" && <AdminSettings onLogout={onExit}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── ANA UYGULAMA ─────────────────────────────────────────────────────────────
export default function GalmancaPortal() {
  const [view, setView] = useState("frontend"); // "frontend" | "login" | "admin"
  const [activeSection, setActiveSection] = useState("almanca");
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState(initialData);
  const updateData = key => fn => setData(d => ({ ...d, [key]: typeof fn === "function" ? fn(d[key]) : fn }));

  const frontNav = [
    {id:"almanca",label:"Almanca",icon:"🇩🇪"},
    {id:"ataturk",label:"Atatürk",icon:"🏛️"},
    {id:"galeri",label:"Galeri",icon:"📸"},
    {id:"gazete",label:"Gazete",icon:"🗞️"},
    {id:"duyurular",label:"Duyurular",icon:"📢"},
  ];
  const subs = {
    almanca:"Dil bilgisi ve kelime listeleriyle Almanca öğrenin",
    ataturk:"Atatürk'ün değerli sözleri Almanca ve Türkçe",
    galeri:"Okul etkinliklerimizden unutulmaz kareler",
    gazete:"Dijital okul gazetesi arşivi — PDF formatında",
    duyurular:"Güncel okul duyuruları ve haberler",
  };

  if (view === "admin") return (
    <>
      <GlobalStyles/>
      <AdminPanel data={data} setData={setData} updateData={updateData} onExit={() => setView("frontend")} />
    </>
  );

  return (
    <>
      <GlobalStyles/>
      <ParticleBg/>
      <ScanLine/>

      {/* Admin Login Modal */}
      {view === "login" && (
        <AdminLogin
          onSuccess={() => setView("admin")}
          onCancel={() => setView("frontend")}
        />
      )}

      <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'DM Sans',sans-serif", color:C.text, position:"relative", zIndex:2 }}>

        {/* HEADER */}
        <header style={{ background:`${C.surface}ee`, borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:100, backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 16px", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, animation:"slideLeft 0.5s ease" }}>
              <div style={{ width:38, height:38, background:C.accent, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:18, color:"#fff", animation:"glow 3s ease-in-out infinite", fontFamily:"'Orbitron',sans-serif" }}>G</div>
              <div>
                <div className="shimmer-logo" style={{ fontWeight:900, fontSize:18, letterSpacing:2, fontFamily:"'Orbitron',sans-serif", cursor:"default" }}>GALMANCA</div>
                <div className="school-label" style={{ fontSize:9, color:C.textMuted, letterSpacing:0.5, textTransform:"uppercase" }}>Gaziosmanpaşa Anadolu Lisesi</div>
              </div>
            </div>

            <nav className="desktop-nav" style={{ display:"flex", gap:4, animation:"fadeIn 0.6s ease 0.2s both" }}>
              {frontNav.map(item => (
                <button key={item.id} onClick={() => setActiveSection(item.id)} className="nav-btn" style={{ background:activeSection===item.id?C.accentDim:"transparent", border:activeSection===item.id?`1px solid ${C.accent}44`:"1px solid transparent", color:activeSection===item.id?C.accent:C.textDim, padding:"7px 14px", borderRadius:10, cursor:"pointer", fontSize:13, fontWeight:activeSection===item.id?700:400, display:"flex", alignItems:"center", gap:6, fontFamily:"'DM Sans',sans-serif", boxShadow:activeSection===item.id?`0 0 18px ${C.accentGlow}`:"none" }}>
                  <span>{item.icon}</span>{item.label}
                </button>
              ))}
            </nav>

            <div style={{ display:"flex", alignItems:"center", gap:8, animation:"slideRight 0.5s ease" }}>
              <button onClick={() => setView("login")} className="glow-btn" style={{ background:C.surface2, border:`1px solid ${C.border}`, color:C.textDim, padding:"7px 14px", borderRadius:10, cursor:"pointer", fontWeight:700, fontSize:12, display:"flex", alignItems:"center", gap:5, fontFamily:"'DM Sans',sans-serif" }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.color=C.accent;}}
                onMouseOut={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.textDim;}}>
                ⚙️ Admin
              </button>
              <button className="mobile-menu-btn" onClick={() => setMenuOpen(o=>!o)} style={{ background:C.surface2, border:`1px solid ${C.border}`, color:C.textDim, width:38, height:38, borderRadius:10, cursor:"pointer", fontSize:18, display:"none", alignItems:"center", justifyContent:"center" }}>
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="mobile-drop" style={{ background:C.surface2, borderTop:`1px solid ${C.border}`, padding:"10px 14px 14px", animation:"fadeUp 0.2s ease" }}>
              {frontNav.map(item => (
                <button key={item.id} onClick={() => { setActiveSection(item.id); setMenuOpen(false); }} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"11px 14px", borderRadius:10, border:"none", cursor:"pointer", background:activeSection===item.id?C.accentDim:"transparent", color:activeSection===item.id?C.accent:C.textDim, fontWeight:activeSection===item.id?700:400, fontSize:14, marginBottom:4, fontFamily:"'DM Sans',sans-serif" }}>
                  <span>{item.icon}</span>{item.label}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* HERO */}
        <div style={{ position:"relative", overflow:"hidden", background:`linear-gradient(135deg,${C.surface} 0%,${C.surface2} 100%)`, borderBottom:`1px solid ${C.border}`, padding:"44px 16px 38px" }}>
          <div style={{ position:"absolute", inset:0, zIndex:0, opacity:0.035, backgroundImage:`linear-gradient(${C.accent} 1px,transparent 1px),linear-gradient(90deg,${C.accent} 1px,transparent 1px)`, backgroundSize:"40px 40px", animation:"gridMove 5s linear infinite" }} />
          <div style={{ position:"absolute", top:-80, left:"50%", transform:"translateX(-50%)", width:500, height:250, background:`radial-gradient(ellipse,${C.accentGlow} 0%,transparent 70%)`, zIndex:0, animation:"heroGlow 4s ease-in-out infinite" }} />
          <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.accent, letterSpacing:4, textTransform:"uppercase", marginBottom:12, animation:"slideLeft 0.4s ease", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
              <span style={{ width:24, height:1, background:C.accent, display:"inline-block" }} />
              🇩🇪 Gaziosmanpaşa Anadolu Lisesi Portalı
            </div>
            <h1 key={activeSection} className="hero-h1" style={{ margin:"0 0 10px", fontSize:38, fontWeight:900, color:C.white, letterSpacing:-1, lineHeight:1.1, animation:"fadeUp 0.4s ease" }}>
              <GlitchText>{frontNav.find(n=>n.id===activeSection)?.icon+" "+frontNav.find(n=>n.id===activeSection)?.label}</GlitchText>
            </h1>
            <p key={activeSection+"s"} style={{ margin:"0 0 24px", color:C.textMuted, fontSize:14, animation:"fadeUp 0.4s ease 0.1s both" }}>
              <Typewriter text={subs[activeSection]} delay={250}/>
            </p>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {frontNav.map((item,i) => (
                <button key={item.id} onClick={() => setActiveSection(item.id)} style={{ background:activeSection===item.id?C.accent:"transparent", border:`1px solid ${activeSection===item.id?C.accent:C.border}`, color:activeSection===item.id?"#fff":C.textDim, padding:"5px 14px", borderRadius:20, cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif", transition:"all 0.25s", animation:`fadeUp 0.4s ease both`, animationDelay:`${i*0.07}s`, boxShadow:activeSection===item.id?`0 0 20px ${C.accentGlow}`:"none" }}
                  onMouseOver={e=>{if(activeSection!==item.id){e.currentTarget.style.borderColor=C.accent+"66";e.currentTarget.style.color=C.text;}}}
                  onMouseOut={e=>{if(activeSection!==item.id){e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.textDim;}}}>
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN */}
        <main key={activeSection} className="main-pad" style={{ maxWidth:1200, margin:"0 auto", padding:"36px 16px", animation:"fadeUp 0.4s ease" }}>
          {activeSection==="almanca" && <AlmancaSection data={data.almanca}/>}
          {activeSection==="ataturk" && <AtaturkSection data={data.ataturk}/>}
          {activeSection==="galeri" && <GaleriSection data={data.galeri}/>}
          {activeSection==="gazete" && <GazeteSection data={data.gazete}/>}
          {activeSection==="duyurular" && <DuyuruSection data={data.duyurular}/>}
        </main>

        {/* FOOTER */}
        <footer style={{ background:C.surface, borderTop:`1px solid ${C.border}`, padding:"36px 16px", textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${C.accent},${C.cyan},${C.accent},transparent)`, animation:"shimmer 3s linear infinite", backgroundSize:"200% auto" }} />
          <div style={{ fontWeight:900, fontSize:24, letterSpacing:4, marginBottom:6, fontFamily:"'Orbitron',sans-serif", animation:"neonFlicker 5s infinite", color:C.white }}>GALMANCA</div>
          <div style={{ fontSize:12, color:C.textMuted, marginBottom:3 }}>Gaziosmanpaşa Anadolu Lisesi Portalı</div>
          <div style={{ fontSize:11, color:C.textMuted, marginBottom:18 }}>© 2025 — Alle Rechte vorbehalten.</div>
          <div style={{ display:"flex", justifyContent:"center", gap:18 }}>
            {["🇩🇪","🏛️","📸","🗞️","📢"].map((e,i) => (
              <span key={i} style={{ fontSize:22, cursor:"pointer", display:"inline-block", animation:`float ${2.2+i*0.4}s ease-in-out infinite`, transition:"transform 0.2s" }}
                onMouseOver={ev=>ev.currentTarget.style.transform="scale(1.5) rotate(10deg)"}
                onMouseOut={ev=>ev.currentTarget.style.transform="scale(1) rotate(0)"}>{e}</span>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}
