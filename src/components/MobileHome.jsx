import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import dayjs from "dayjs";
import { X, MoveRight, Check, Flag, ExternalLink, ChevronLeft } from "lucide-react";
import { gallery, techStack, blogPosts, socials } from "#constants";

// ─── iOS Status Bar ───────────────────────────────────────────────────────────
const StatusBar = () => {
  const [time, setTime] = useState(dayjs().format("h:mm"));
  useEffect(() => {
    const interval = setInterval(() => setTime(dayjs().format("h:mm")), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex justify-between items-center px-6 pt-3 pb-1 select-none">
      <span style={{ fontFamily: "'SF Pro Display', system-ui", fontWeight: 600, fontSize: "17px", color: "white", letterSpacing: "-0.3px" }}>
        {time}
      </span>
      <div className="flex items-center gap-1.5">
        <div className="flex items-end gap-0.5">
          {[3, 5, 7, 9].map((h, i) => (
            <div key={i} style={{ width: 3, height: h, borderRadius: 1.5, backgroundColor: i < 3 ? "white" : "rgba(255,255,255,0.35)" }} />
          ))}
        </div>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="white"/>
          <path d="M3.5 6.5a6.5 6.5 0 0 1 9 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M1 4a10 10 0 0 1 14 0" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
        <div className="flex items-center gap-0.5">
          <div style={{ width: 24, height: 12, borderRadius: 3, border: "1.5px solid rgba(255,255,255,0.7)", padding: "1.5px", display: "flex", alignItems: "center" }}>
            <div style={{ width: "75%", height: "100%", borderRadius: 1.5, backgroundColor: "white" }} />
          </div>
          <div style={{ width: 2, height: 5, borderRadius: 1, backgroundColor: "rgba(255,255,255,0.5)" }} />
        </div>
      </div>
    </div>
  );
};

// ─── Home Indicator ───────────────────────────────────────────────────────────
const HomeIndicator = ({ onPress }) => (
  <div className="flex justify-center pb-2 pt-3" onClick={onPress} style={{ cursor: "pointer" }}>
    <div style={{ width: 134, height: 5, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.4)" }} />
  </div>
);

// ─── App Sheet with swipe-to-close ───────────────────────────────────────────
const SWIPE_THRESHOLD = 120; // px down to trigger dismiss
const SWIPE_VELOCITY  = 0.5; // px/ms fast flick also triggers dismiss

const AppSheet = ({ isOpen, onClose, children, appName, appIcon, originRect }) => {
  const sheetRef  = useRef(null);
  const overlayRef = useRef(null);

  // Touch state stored in a ref so handlers don't cause re-renders
  const touch = useRef({ startY: 0, startTime: 0, dragging: false, scrollEl: null });

  // ── Open / close animation ──────────────────────────────────────────────
  useGSAP(() => {
    const sheet   = sheetRef.current;
    const overlay = overlayRef.current;
    if (!sheet || !overlay) return;

    if (isOpen && originRect) {
      const cx = originRect.left + originRect.width  / 2;
      const cy = originRect.top  + originRect.height / 2;
      gsap.set(sheet, {
        y: 0, scale: 0.05, opacity: 0,
        transformOrigin: `${(cx / window.innerWidth) * 100}% ${(cy / window.innerHeight) * 100}%`,
        borderRadius: "50%", pointerEvents: "auto",
      });
      gsap.set(overlay, { opacity: 0, pointerEvents: "auto" });
      gsap.to(sheet,   { scale: 1, opacity: 1, borderRadius: "20px 20px 0 0", duration: 0.45, ease: "expo.out" });
      gsap.to(overlay, { opacity: 1, duration: 0.3 });
    } else {
      gsap.to(sheet, {
        scale: 0.05, opacity: 0, duration: 0.3, ease: "expo.in",
        onComplete: () => gsap.set(sheet, { pointerEvents: "none", y: 0, scale: 1 }),
      });
      gsap.to(overlay, { opacity: 0, duration: 0.25, pointerEvents: "none" });
    }
  }, [isOpen]);

  // ── Swipe helpers ────────────────────────────────────────────────────────
  const dismiss = useCallback(() => {
    const sheet   = sheetRef.current;
    const overlay = overlayRef.current;
    gsap.to(sheet,   { y: "100%", duration: 0.32, ease: "power3.in",
      onComplete: () => { gsap.set(sheet, { y: 0, pointerEvents: "none" }); onClose(); }
    });
    gsap.to(overlay, { opacity: 0, duration: 0.25, pointerEvents: "none" });
  }, [onClose]);

  const springBack = useCallback(() => {
    gsap.to(sheetRef.current, { y: 0, duration: 0.4, ease: "back.out(2)" });
  }, []);

  // ── Touch handlers attached to the drag-handle zone ─────────────────────
  const onTouchStart = useCallback((e) => {
    // Find the scrollable child so we can ignore drags that are actually scrolls
    const scrollEl = sheetRef.current?.querySelector("[data-scroll]");
    touch.current = {
      startY:    e.touches[0].clientY,
      startTime: Date.now(),
      dragging:  true,
      scrollEl,
      scrollTop: scrollEl?.scrollTop ?? 0,
    };
  }, []);

  const onTouchMove = useCallback((e) => {
    const t = touch.current;
    if (!t.dragging) return;

    const dy = e.touches[0].clientY - t.startY;

    // If scrollable content isn't at the top, let it scroll normally
    if (t.scrollEl && t.scrollEl.scrollTop > 0 && dy > 0) {
      t.dragging = false;
      return;
    }

    if (dy <= 0) return; // don't allow dragging up

    // Resist drag slightly for feel
    const resistance = 1 - Math.min(dy / 600, 0.4);
    gsap.set(sheetRef.current, { y: dy * resistance });
    // Fade overlay proportionally
    const progress = Math.min(dy / SWIPE_THRESHOLD, 1);
    gsap.set(overlayRef.current, { opacity: 1 - progress * 0.6 });
  }, []);

  const onTouchEnd = useCallback((e) => {
    const t = touch.current;
    if (!t.dragging) return;
    t.dragging = false;

    const dy       = e.changedTouches[0].clientY - t.startY;
    const elapsed  = Date.now() - t.startTime;
    const velocity = dy / elapsed;

    if (dy > SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY) {
      dismiss();
    } else {
      springBack();
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.2 });
    }
  }, [dismiss, springBack]);

  return (
    <>
      <div
        ref={overlayRef}
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.6)", pointerEvents: "none", opacity: 0, backdropFilter: "blur(6px)" }}
      />
      <div
        ref={sheetRef}
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          height: "92dvh", zIndex: 101,
          borderRadius: "20px 20px 0 0",
          backgroundColor: "#1c1c1e",
          overflow: "hidden",
          opacity: 0, pointerEvents: "none",
          display: "flex", flexDirection: "column",
          willChange: "transform",
        }}
      >
        {/* ── Drag handle zone — touch starts here ── */}
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ padding: "12px 16px 0", flexShrink: 0, touchAction: "none" }}
        >
          {/* Pill — visual affordance */}
          <div style={{ width: 36, height: 5, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.35)", margin: "0 auto 12px" }} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src={appIcon} alt={appName} style={{ width: 36, height: 36, borderRadius: 9, objectFit: "contain" }} />
              <span style={{ color: "white", fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px" }}>{appName}</span>
            </div>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}>
              <X size={16} color="white" />
            </button>
          </div>
          <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Scrollable content — data-scroll lets swipe handler check position */}
        <div data-scroll style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          {children}
        </div>

        <HomeIndicator onPress={onClose} />
      </div>
    </>
  );
};

// ─── Photo Lightbox ───────────────────────────────────────────────────────────
const PhotoLightbox = ({ photo, onClose }) => {
  const ref = useRef(null);
  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.25, ease: "power3.out" });
  }, []);
  const handleClose = () => {
    gsap.to(ref.current, { opacity: 0, scale: 0.92, duration: 0.2, ease: "power3.in", onComplete: onClose });
  };
  return (
    <div ref={ref} style={{ position: "absolute", inset: 0, zIndex: 200, backgroundColor: "#000", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "16px", flexShrink: 0 }}>
        <button onClick={handleClose} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#0A84FF" }}>
          <ChevronLeft size={20} />
          <span style={{ fontSize: 16 }}>Gallery</span>
        </button>
        <p style={{ color: "white", fontWeight: 600, fontSize: 16, margin: "0 auto", letterSpacing: "-0.2px" }}>{photo.title}</p>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px" }}>
        <img src={photo.img} alt={photo.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 12 }} />
      </div>
      {photo.desc && (
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textAlign: "center", padding: "12px 16px 24px", margin: 0 }}>{photo.desc}</p>
      )}
    </div>
  );
};

// ─── App Contents ─────────────────────────────────────────────────────────────
const PhotosApp = () => {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ position: "relative" }}>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Library</p>
      <div style={{ columns: 2, columnGap: 4 }}>
        {gallery.map((photo) => (
          <div key={photo.id} onClick={() => setSelected(photo)} style={{ breakInside: "avoid", marginBottom: 4, borderRadius: 10, overflow: "hidden", position: "relative", cursor: "pointer" }}>
            <img src={photo.img} alt={photo.title} style={{ width: "100%", height: "auto", display: "block" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.7))", padding: "20px 8px 8px" }}>
              <p style={{ color: "white", fontSize: 11, fontWeight: 600, margin: 0 }}>{photo.title}</p>
              {photo.desc && <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 10, margin: "2px 0 0" }}>{photo.desc}</p>}
            </div>
          </div>
        ))}
      </div>
      {selected && <PhotoLightbox photo={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

const SafariApp = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>My Developer Blog</p>
    {blogPosts.map(({ id, image, title, date, link }) => (
      <a key={id} href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
        <div style={{ backgroundColor: "#2c2c2e", borderRadius: 16, overflow: "hidden" }}>
          <img src={image} alt={title} style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
          <div style={{ padding: 14 }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: "0 0 6px" }}>{date}</p>
            <p style={{ color: "white", fontWeight: 600, fontSize: 15, lineHeight: 1.4, margin: "0 0 10px" }}>{title}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#0A84FF" }}>
              <span style={{ fontSize: 13 }}>Read full post</span>
              <MoveRight size={14} />
            </div>
          </div>
        </div>
      </a>
    ))}
  </div>
);

const ContactApp = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, paddingTop: 8 }}>
      <img src="/images/abdualim.jpg" alt="Abdu Alim" style={{ width: 80, height: 80, borderRadius: 40, objectFit: "cover", border: "3px solid rgba(255,255,255,0.2)" }} />
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "white", fontWeight: 700, fontSize: 22, margin: 0, letterSpacing: "-0.3px" }}>Abdu Alim</p>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, margin: "4px 0 0" }}>Software Developer · Vancouver, BC</p>
      </div>
    </div>
    <div style={{ backgroundColor: "#2c2c2e", borderRadius: 16, padding: 16 }}>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 8px" }}>Email</p>
      <a href="mailto:arlikhozhaevca@gmail.com" style={{ color: "#0A84FF", fontSize: 15, textDecoration: "none" }}>arlikhozhaevca@gmail.com</a>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>Socials</p>
      {socials.map(({ id, bg, link, icon, text }) => (
        <a key={id} href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <div style={{ backgroundColor: bg, borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src={icon} alt={text} style={{ width: 20, height: 20, filter: "brightness(0) invert(1)" }} />
              <span style={{ color: "white", fontWeight: 600, fontSize: 15 }}>{text}</span>
            </div>
            <ExternalLink size={14} color="rgba(255,255,255,0.7)" />
          </div>
        </a>
      ))}
    </div>
  </div>
);

const NotesApp = () => (
  <div>
    <div style={{ backgroundColor: "#2c2c2e", borderRadius: 16, overflow: "hidden", marginBottom: 20 }}>
      <img src="/images/young-me.jpg" alt="Abdu Alim" style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }} />
    </div>
    <div style={{ backgroundColor: "#2c2c2e", borderRadius: 16, padding: "16px", marginBottom: 12 }}>
      <p style={{ color: "white", fontWeight: 700, fontSize: 17, margin: "0 0 8px", letterSpacing: "-0.2px" }}>Hey, I'm Alim (Ah-leem)! 👨🏻‍💻</p>
      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
        CS student & software engineer based in Vancouver. I build scalable, interactive software and love the intersection where clean engineering meets great design.
      </p>
    </div>
    <div style={{ backgroundColor: "#2c2c2e", borderRadius: 16, padding: "16px", marginBottom: 12 }}>
      <p style={{ color: "#0A84FF", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px" }}>⚡ What sets me apart</p>
      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
        I don't just code — I learn fast, adapt quickly, and ship results. I thrive where creativity meets engineering: optimizing systems, solving hard problems, and building things that actually matter.
      </p>
    </div>
    <div style={{ backgroundColor: "#2c2c2e", borderRadius: 16, padding: "16px", marginBottom: 12 }}>
      <p style={{ color: "#30d158", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px" }}>💻 Stack</p>
      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
        C++, Java, JavaScript, TypeScript, Python, React, Next.js, FastAPI, Node.js, PostgreSQL, Firebase, AWS, Vercel
      </p>
    </div>
    <div style={{ backgroundColor: "#2c2c2e", borderRadius: 16, padding: "16px", marginBottom: 12 }}>
      <p style={{ color: "#ff9f0a", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px" }}>🥊 Outside the keyboard</p>
      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
        Boxing, hiking in the mountains, and nature gazing wherever I can find it. 
        Stepping away from the screen helps me recharge, think clearly, and come back a better engineer.
      </p>
    </div>
    <div style={{ backgroundColor: "#1a3a5c", borderRadius: 16, padding: "16px", border: "1px solid rgba(10,132,255,0.3)" }}>
      <p style={{ color: "white", fontSize: 14, lineHeight: 1.65, margin: "0 0 10px" }}>
        🚀 Actively seeking software engineering internship opportunities. If you're building something ambitious, let's talk!
      </p>
      <a href="mailto:arlikhozhaevca@gmail.com" style={{ color: "#0A84FF", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
        arlikhozhaevca@gmail.com →
      </a>
    </div>
  </div>
);

const TerminalApp = () => (
  <div style={{ fontFamily: "'Roboto Mono', monospace" }}>
    <p style={{ color: "#00A154", fontSize: 13, marginBottom: 16 }}>
      <span style={{ color: "white", fontWeight: 700 }}>@abdu-alim % </span>show tech stack
    </p>
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {techStack.map(({ category, items }) => (
        <div key={category} style={{ backgroundColor: "#2c2c2e", borderRadius: 12, padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
          <Check size={14} style={{ color: "#00A154", flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ color: "#00A154", fontWeight: 700, fontSize: 12, margin: "0 0 4px" }}>{category}</p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, margin: 0, lineHeight: 1.5 }}>{items.join(", ")}</p>
          </div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 16, color: "#00A154", fontSize: 12, display: "flex", flexDirection: "column", gap: 6 }}>
      <p style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
        <Check size={14} /> {techStack.length} of {techStack.length} stacks loaded (100%)
      </p>
      <p style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.6)" }}>
        <Flag size={12} fill="currentColor" /> Render time: 6ms
      </p>
    </div>
  </div>
);

const FinderApp = () => {
  const projects = [
    { id: 1, name: "FlashStudy-AI", desc: "AI-powered flashcard generator that transforms study material into concise, structured flashcards using NLP.", link: "https://flash-study-ai.vercel.app/", img: "/images/project-1.png", tech: ["React", "Node.js", "Firebase", "OpenAI"] },
    { id: 2, name: "AutoDev", desc: "AI-powered autonomous code analysis, refactoring, and PR automation.", link: "https://github.com/Arlikhozhaev/autodev", img: "/images/project-2.png", tech: ["FastAPI", "Celery", "PostgreSQL", "Next.js"] },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>Projects</p>
      {projects.map(({ id, name, desc, link, img, tech }) => (
        <div key={id} style={{ backgroundColor: "#2c2c2e", borderRadius: 16, overflow: "hidden" }}>
          <img src={img} alt={name} style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} />
          <div style={{ padding: 14 }}>
            <p style={{ color: "white", fontWeight: 700, fontSize: 16, margin: "0 0 6px" }}>{name}</p>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.5, margin: "0 0 12px" }}>{desc}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              {tech.map((t) => (
                <span key={t} style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 500 }}>{t}</span>
              ))}
            </div>
            <a href={link} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, color: "#0A84FF", fontSize: 13, textDecoration: "none", fontWeight: 600 }}>
              View Project <ExternalLink size={13} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── App Icon ─────────────────────────────────────────────────────────────────
const AppIcon = ({ icon, label, onClick }) => {
  const ref = useRef(null);
  const handleTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    gsap.fromTo(ref.current, { scale: 0.88 }, { scale: 1, duration: 0.3, ease: "back.out(2)" });
    onClick(rect);
  };
  return (
    <div ref={ref} onClick={handleTap} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", userSelect: "none" }}>
      <img src={icon} alt={label} style={{ width: 60, height: 60, objectFit: "contain", borderRadius: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }} />
      <span style={{ color: "white", fontSize: 11, fontWeight: 500, textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>{label}</span>
    </div>
  );
};

// ─── Dock Icon ────────────────────────────────────────────────────────────────
const DockIcon = ({ icon, label, onClick }) => {
  const ref = useRef(null);
  const handleTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    gsap.fromTo(ref.current, { scale: 0.85 }, { scale: 1, duration: 0.3, ease: "back.out(2)" });
    onClick(rect);
  };
  return (
    <div ref={ref} onClick={handleTap} style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img src={icon} alt={label} style={{ width: 52, height: 52, objectFit: "contain", borderRadius: 13, boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }} />
    </div>
  );
};

// ─── App registry ─────────────────────────────────────────────────────────────
const APP_META = {
  finder:   { name: "Projects",  icon: "/images/finder.png",   Component: FinderApp },
  safari:   { name: "Blog",      icon: "/images/safari.png",   Component: SafariApp },
  photos:   { name: "Gallery",   icon: "/images/photos.png",   Component: PhotosApp },
  contact:  { name: "Contact",   icon: "/images/contact.png",  Component: ContactApp },
  notes:    { name: "About Me",  icon: "/images/notes.png",    Component: NotesApp },
  terminal: { name: "Skills",    icon: "/images/terminal.png", Component: TerminalApp },
};

const GRID_APPS = ["notes", "terminal"];
const DOCK_APPS = ["finder", "safari", "photos", "contact"];

// ─── Main ─────────────────────────────────────────────────────────────────────
const MobileHome = () => {
  const [activeApp, setActiveApp]   = useState(null);
  const [originRect, setOriginRect] = useState(null);

  const openApp  = useCallback((id, rect) => { setOriginRect(rect); setActiveApp(id); }, []);
  const closeApp = useCallback(() => { setActiveApp(null); setOriginRect(null); }, []);

  return (
    <div
      className="sm:hidden"
      style={{ width: "100dvw", height: "100dvh", backgroundImage: "url('/images/wallpaper.png')", backgroundSize: "cover", backgroundPosition: "center", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}
    >
      <div style={{ position: "absolute", top: -80, left: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(88,86,214,0.25) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 120, right: -80, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(10,132,255,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />

      <StatusBar />

      <div style={{ textAlign: "center", padding: "24px 24px 8px", userSelect: "none" }}>
        <p style={{ color: "white", fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: "-0.5px", lineHeight: 1.25 }}>Hey, I'm Abdu Alim! 👋</p>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, margin: "8px 0 0", fontWeight: 400 }}>Welcome to my Portfolio</p>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, margin: "4px 0 0" }}>{dayjs().format("dddd, MMMM D")}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "28px 0", padding: "32px 48px 0", alignContent: "start" }}>
        {GRID_APPS.map((id) => {
          const { name, icon } = APP_META[id];
          return <AppIcon key={id} icon={icon} label={name} onClick={(rect) => openApp(id, rect)} />;
        })}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ margin: "0 20px 16px", backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(24px)", borderRadius: 26, padding: "14px 20px", display: "flex", justifyContent: "space-around", alignItems: "center", border: "1px solid rgba(255,255,255,0.15)" }}>
        {DOCK_APPS.map((id) => {
          const { name, icon } = APP_META[id];
          return <DockIcon key={id} icon={icon} label={name} onClick={(rect) => openApp(id, rect)} />;
        })}
      </div>

      <HomeIndicator />

      {Object.entries(APP_META).map(([id, { name, icon, Component }]) => (
        <AppSheet key={id} isOpen={activeApp === id} onClose={closeApp} appName={name} appIcon={icon} originRect={originRect}>
          <Component />
        </AppSheet>
      ))}
    </div>
  );
};

export default MobileHome;