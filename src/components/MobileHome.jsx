import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import dayjs from "dayjs";
import {
  X,
  Check,
  Flag,
  ExternalLink,
  ChevronLeft,
  Trash2,
  FolderOpen,
  FileText,
  User,
  Briefcase,
} from "lucide-react";
import { gallery, techStack, blogPosts, socials, projects, experience, trashItems, CONTACT_EMAIL, aboutContent } from "#constants";
import AboutProfile from "./AboutProfile";
import BlogFeed from "./BlogFeed";
import ResumeViewer from "./ResumeViewer";
import RecommendationToast from "./RecommendationToast";
import { MobileThemeProvider, useMobileTheme } from "#context/MobileThemeContext";

// ─── iOS Status Bar ───────────────────────────────────────────────────────────
const StatusBar = ({ onRecommendationClick }) => {
  const [time, setTime] = useState(dayjs().format("h:mm"));

  useEffect(() => {
    const interval = setInterval(() => setTime(dayjs().format("h:mm")), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between items-center px-6 pt-3 pb-1 select-none">
      <span
        style={{
          fontFamily: "'SF Pro Display', system-ui",
          fontWeight: 600,
          fontSize: "17px",
          color: "white",
          letterSpacing: "-0.3px",
        }}
      >
        {time}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onRecommendationClick}
          aria-label="View LinkedIn recommendation"
          style={{
            background: "none",
            border: "none",
            padding: 4,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="white" />
            <path
              d="M3.5 6.5a6.5 6.5 0 0 1 9 0"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M1 4a10 10 0 0 1 14 0"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button>
        <div className="flex items-end gap-0.5">
          {[3, 5, 7, 9].map((h, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: h,
                borderRadius: 1.5,
                backgroundColor: i < 3 ? "white" : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-0.5">
          <div
            style={{
              width: 24,
              height: 12,
              borderRadius: 3,
              border: "1.5px solid rgba(255,255,255,0.7)",
              padding: "1.5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "75%",
                height: "100%",
                borderRadius: 1.5,
                backgroundColor: "white",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Home Indicator ───────────────────────────────────────────────────────────
const HomeIndicator = ({ onPress }) => (
  <div
    className="flex justify-center pb-2 pt-3"
    onClick={onPress}
    style={{ cursor: "pointer" }}
  >
    <div
      style={{
        width: 134,
        height: 5,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.4)",
      }}
    />
  </div>
);

// ─── App Sheet with swipe-to-close ───────────────────────────────────────────
const SWIPE_THRESHOLD = 100;
const SWIPE_VELOCITY = 0.4;

const AppSheet = ({
  isOpen,
  onClose,
  children,
  appName,
  appIcon,
  originRect,
}) => {
  const sheetRef = useRef(null);
  const overlayRef = useRef(null);
  const touch = useRef({ startY: 0, startTime: 0, dragging: false });
  const theme = useMobileTheme();

  useGSAP(() => {
    const sheet = sheetRef.current;
    const overlay = overlayRef.current;
    if (!sheet || !overlay) return;

    if (isOpen && originRect) {
      const cx = originRect.left + originRect.width / 2;
      const cy = originRect.top + originRect.height / 2;
      gsap.set(sheet, {
        y: 0,
        scale: 0.05,
        opacity: 0,
        transformOrigin: `${(cx / window.innerWidth) * 100}% ${(cy / window.innerHeight) * 100}%`,
        borderRadius: "50%",
        pointerEvents: "auto",
      });
      gsap.set(overlay, { opacity: 0, pointerEvents: "auto" });
      gsap.to(sheet, {
        scale: 1,
        opacity: 1,
        borderRadius: "20px 20px 0 0",
        duration: 0.45,
        ease: "expo.out",
      });
      gsap.to(overlay, { opacity: 1, duration: 0.3 });
    } else {
      gsap.to(sheet, {
        scale: 0.05,
        opacity: 0,
        duration: 0.3,
        ease: "expo.in",
        onComplete: () =>
          gsap.set(sheet, { pointerEvents: "none", y: 0, scale: 1 }),
      });
      gsap.to(overlay, { opacity: 0, duration: 0.25, pointerEvents: "none" });
    }
  }, [isOpen]);

  const dismiss = useCallback(() => {
    gsap.to(sheetRef.current, {
      y: "-100%",
      duration: 0.32,
      ease: "power3.in",
      onComplete: () => {
        gsap.set(sheetRef.current, { y: 0, pointerEvents: "none" });
        onClose();
      },
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      pointerEvents: "none",
    });
  }, [onClose]);

  const springBack = useCallback(() => {
    gsap.to(sheetRef.current, { y: 0, duration: 0.4, ease: "back.out(2)" });
  }, []);

  const onTouchStart = useCallback((e) => {
    touch.current = {
      startY: e.touches[0].clientY,
      startTime: Date.now(),
      dragging: true,
    };
  }, []);

  const onTouchMove = useCallback((e) => {
    const t = touch.current;
    if (!t.dragging) return;
    const dy = e.touches[0].clientY - t.startY;
    if (dy >= 0) return;
    const resistance = 1 - Math.min(Math.abs(dy) / 600, 0.4);
    gsap.set(sheetRef.current, { y: dy * resistance });
    gsap.set(overlayRef.current, {
      opacity: 1 - Math.min(Math.abs(dy) / SWIPE_THRESHOLD, 1) * 0.6,
    });
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      const t = touch.current;
      if (!t.dragging) return;
      t.dragging = false;
      const dy = e.changedTouches[0].clientY - t.startY;
      const velocity = Math.abs(dy) / (Date.now() - t.startTime);

      if (dy < -SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY) {
        dismiss();
      } else {
        springBack();
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.2 });
      }
    },
    [dismiss, springBack],
  );

  return (
    <>
      <div
        ref={overlayRef}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          backgroundColor: theme.overlay,
          pointerEvents: "none",
          opacity: 0,
          backdropFilter: "blur(6px)",
        }}
      />
      <div
        ref={sheetRef}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "92dvh",
          zIndex: 101,
          borderRadius: "20px 20px 0 0",
          backgroundColor: theme.sheetBg,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          willChange: "transform",
        }}
      >
        <div style={{ padding: "12px 16px 0", flexShrink: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img
                src={appIcon}
                alt={appName}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  objectFit: "contain",
                }}
              />
              <span
                style={{
                  color: theme.text,
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: "-0.3px",
                }}
              >
                {appName}
              </span>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: theme.controlBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
              }}
            >
              <X size={16} color={theme.text} />
            </button>
          </div>
          <div
            style={{ height: 1, backgroundColor: theme.border }}
          />
        </div>

        <div
          data-scroll
          style={{ flex: 1, overflowY: "auto", padding: "16px" }}
        >
          {children}
        </div>

        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: "none", paddingBottom: 4 }}
        >
          <HomeIndicator onPress={onClose} />
        </div>
      </div>
    </>
  );
};

// ─── Photo Lightbox ───────────────────────────────────────────────────────────
const PhotoLightbox = ({ photo, onClose }) => {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.25, ease: "power3.out" },
    );
  }, []);

  const handleClose = () => {
    gsap.to(ref.current, {
      opacity: 0,
      scale: 0.92,
      duration: 0.2,
      ease: "power3.in",
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 200,
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          flexShrink: 0,
        }}
      >
        <button
          onClick={handleClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "#0A84FF",
          }}
        >
          <ChevronLeft size={20} />
          <span style={{ fontSize: 16 }}>Gallery</span>
        </button>
        <p
          style={{
            color: "white",
            fontWeight: 600,
            fontSize: 16,
            margin: "0 auto",
            letterSpacing: "-0.2px",
          }}
        >
          {photo.title}
        </p>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 8px",
        }}
      >
        <img
          src={photo.img}
          alt={photo.title}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            borderRadius: 12,
          }}
        />
      </div>
      {photo.desc && (
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 13,
            textAlign: "center",
            padding: "12px 16px 24px",
            margin: 0,
          }}
        >
          {photo.desc}
        </p>
      )}
    </div>
  );
};

// ─── Photos App ───────────────────────────────────────────────────────────────
const PhotosApp = () => {
  const [selected, setSelected] = useState(null);
  const theme = useMobileTheme();

  return (
    <div style={{ position: "relative" }}>
      <p
        style={{
          color: theme.textMuted,
          fontSize: 12,
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        Library
      </p>
      <div style={{ columns: 2, columnGap: 4 }}>
        {gallery.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelected(photo)}
            style={{
              breakInside: "avoid",
              marginBottom: 4,
              borderRadius: 10,
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <img
              src={photo.img}
              alt={photo.title}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                padding: "20px 8px 8px",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: 11,
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                {photo.title}
              </p>
              {photo.desc && (
                <p
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: 10,
                    margin: "2px 0 0",
                  }}
                >
                  {photo.desc}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <PhotoLightbox photo={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

// ─── Safari App ───────────────────────────────────────────────────────────────
const SafariApp = () => {
  const theme = useMobileTheme();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p
        style={{
          color: theme.textMuted,
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: 1,
          margin: 0,
        }}
      >
        My Developer Blog
      </p>
      <BlogFeed posts={blogPosts} variant="mobile" />
    </div>
  );
};

// ─── Resume App ───────────────────────────────────────────────────────────────
const ResumeApp = () => <ResumeViewer variant="mobile" />;
const ContactApp = () => {
  const theme = useMobileTheme();

  return (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        paddingTop: 8,
      }}
    >
      <img
        src="/images/abdualim.jpg"
        alt="Abdu Alim"
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          objectFit: "cover",
          border: `3px solid ${theme.avatarBorder}`,
          boxShadow: theme.cardShadow,
        }}
      />
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            color: theme.text,
            fontWeight: 700,
            fontSize: 22,
            margin: 0,
            letterSpacing: "-0.3px",
          }}
        >
          Abdu Alim
        </p>
        <p
          style={{
            color: theme.textMuted,
            fontSize: 14,
            margin: "4px 0 0",
          }}
        >
          CS Student & Aspiring Software Engineer · Vancouver, BC
        </p>
      </div>
    </div>

    <div
      style={{
        backgroundColor: theme.cardBg,
        borderRadius: 16,
        padding: 16,
        border: `1px solid ${theme.border}`,
        boxShadow: theme.cardShadow,
      }}
    >
      <p
        style={{
          color: theme.textMuted,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: 1,
          margin: "0 0 8px",
        }}
      >
        Email
      </p>
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        style={{ color: theme.accent, fontSize: 15, textDecoration: "none", fontWeight: 600 }}
      >
        {CONTACT_EMAIL}
      </a>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <p
        style={{
          color: theme.textMuted,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: 1,
          margin: 0,
        }}
      >
        Socials
      </p>
      {socials.map(({ id, bg, link, icon, text }) => (
        <a
          key={id}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              backgroundColor: bg,
              borderRadius: 16,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                src={icon}
                alt={text}
                style={{
                  width: 20,
                  height: 20,
                  filter: "brightness(0) invert(1)",
                }}
              />
              <span style={{ color: "#ffffff", fontWeight: 600, fontSize: 15 }}>
                {text}
              </span>
            </div>
            <ExternalLink size={14} color="rgba(255,255,255,0.85)" />
          </div>
        </a>
      ))}
    </div>
  </div>
  );
};

// ─── Notes App (About Me) ─────────────────────────────────────────────────────
const NotesApp = () => <AboutProfile />;

// ─── Terminal App (Skills) ────────────────────────────────────────────────────
const TerminalApp = () => {
  const theme = useMobileTheme();

  return (
  <div style={{ fontFamily: "'Roboto Mono', monospace" }}>
    <p style={{ color: theme.terminalGreen, fontSize: 13, marginBottom: 16 }}>
      <span style={{ color: theme.terminalPrompt, fontWeight: 700 }}>@abdu-alim % </span>show
      tech stack
    </p>
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {techStack.map(({ category, items }) => (
        <div
          key={category}
          style={{
            backgroundColor: theme.cardBg,
            borderRadius: 12,
            padding: "12px 14px",
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            border: `1px solid ${theme.border}`,
            boxShadow: theme.cardShadow,
          }}
        >
          <Check
            size={14}
            style={{ color: theme.terminalGreen, flexShrink: 0, marginTop: 2 }}
          />
          <div>
            <p
              style={{
                color: theme.terminalGreen,
                fontWeight: 700,
                fontSize: 12,
                margin: "0 0 4px",
              }}
            >
              {category}
            </p>
            <p
              style={{
                color: theme.textSecondary,
                fontSize: 12,
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {items.join(", ")}
            </p>
          </div>
        </div>
      ))}
    </div>
    <div
      style={{
        marginTop: 16,
        color: theme.terminalGreen,
        fontSize: 12,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <p style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
        <Check size={14} /> {techStack.length} of {techStack.length} stacks
        loaded (100%)
      </p>
      <p
        style={{
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: theme.terminalMuted,
        }}
      >
        <Flag size={12} fill="currentColor" /> Render time: 6ms
      </p>
    </div>
  </div>
  );
};

// ─── Contact App ──────────────────────────────────────────────────────────────
const FinderApp = () => {
  const [tab, setTab] = useState("about");
  const theme = useMobileTheme();

  const cardShell = {
    backgroundColor: theme.cardBg,
    borderRadius: 16,
    overflow: "hidden",
    border: `1px solid ${theme.border}`,
    boxShadow: theme.cardShadow,
  };

  const tabs = [
    { id: "about", label: "About", icon: <User size={14} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={14} /> },
    { id: "resume", label: "Resume", icon: <FileText size={14} /> },
    { id: "work", label: "Projects", icon: <FolderOpen size={14} /> },
    { id: "trash", label: "Trash", icon: <Trash2 size={14} /> },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Tab Bar */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 16,
          backgroundColor: theme.tabBarBg,
          borderRadius: 12,
          padding: 4,
        }}
      >
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "8px 4px",
              borderRadius: 9,
              border: "none",
              cursor: "pointer",
              backgroundColor: tab === id ? theme.tabActiveBg : "transparent",
              color: tab === id ? theme.tabActiveText : theme.tabInactiveText,
              transition: "all 0.15s ease",
              fontSize: 10,
              fontWeight: 600,
            }}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Work Tab */}
      {tab === "work" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p
            style={{
              color: theme.textMuted,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1,
              margin: 0,
            }}
          >
            Projects
          </p>
          {projects.map(({ id, name, desc, link, img, tech }) => (
            <div
              key={id}
              style={cardShell}
            >
              <img
                src={img}
                alt={name}
                style={{
                  width: "100%",
                  height: 150,
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div style={{ padding: 14 }}>
                <p
                  style={{
                    color: theme.text,
                    fontWeight: 700,
                    fontSize: 15,
                    margin: "0 0 6px",
                  }}
                >
                  {name}
                </p>
                <p
                  style={{
                    color: theme.textSecondary,
                    fontSize: 13,
                    lineHeight: 1.5,
                    margin: "0 0 10px",
                  }}
                >
                  {desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                    marginBottom: 10,
                  }}
                >
                  {tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        backgroundColor: theme.chipBg,
                        color: theme.chipText,
                        fontSize: 10,
                        padding: "3px 9px",
                        borderRadius: 20,
                        fontWeight: 500,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: theme.accent,
                    fontSize: 13,
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  View Project <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience Tab */}
      {tab === "experience" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p
            style={{
              color: theme.textMuted,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1,
              margin: 0,
            }}
          >
            Work Experience
          </p>
          {experience.map(
            ({ id, company, logo, title, dates, location, tech, bullets }) => (
              <div key={id} style={cardShell}>
                {/* Card Header */}
                <div
                  style={{
                    background: theme.experienceHeader,
                    padding: "16px 14px 12px",
                    borderBottom: `1px solid ${theme.experienceHeaderBorder}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 8,
                    }}
                  >
                    <img
                      src={logo}
                      alt={company}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        objectFit: "contain",
                        backgroundColor: theme.experienceLogoBg,
                        padding: 4,
                        border: `1px solid ${theme.experienceLogoBorder}`,
                      }}
                    />
                    <div>
                      <p
                        style={{
                          color: theme.text,
                          fontWeight: 700,
                          fontSize: 15,
                          margin: "0 0 3px",
                        }}
                      >
                        {company}
                      </p>
                      <p
                        style={{
                          color: theme.accent,
                          fontWeight: 600,
                          fontSize: 12,
                          margin: 0,
                        }}
                      >
                        {title}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <p
                      style={{
                        color: theme.textMuted,
                        fontSize: 11,
                        margin: 0,
                      }}
                    >
                      {dates}
                    </p>
                    <p
                      style={{
                        color: theme.textMuted,
                        fontSize: 11,
                        margin: 0,
                      }}
                    >
                      · {location}
                    </p>
                  </div>
                </div>

                {/* Bullets */}
                <div
                  style={{
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {bullets.map((b, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          backgroundColor: theme.bulletColor,
                          flexShrink: 0,
                          marginTop: 7,
                        }}
                      />
                      <p
                        style={{
                          color: theme.textSecondary,
                          fontSize: 13,
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {b}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div
                  style={{
                    padding: "0 14px 14px",
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                  }}
                >
                  {tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        backgroundColor: theme.tagBg,
                        color: theme.tagText,
                        fontSize: 10,
                        padding: "3px 9px",
                        borderRadius: 20,
                        fontWeight: 500,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      )}

      {/* Resume Tab */}
      {tab === "resume" && <ResumeApp />}

      {/* About Tab */}
      {tab === "about" && <AboutProfile compact />}

      {/* Trash Tab */}
      {tab === "trash" &&
        (trashItems.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 12,
            }}
          >
            {trashItems.map(({ id, name, imageUrl }) => (
              <div key={id} style={cardShell}>
                <img
                  src={imageUrl}
                  alt={name}
                  style={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <p
                  style={{
                    color: theme.textMuted,
                    fontSize: 11,
                    margin: 0,
                    padding: "8px 12px",
                  }}
                >
                  {name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 60,
              gap: 16,
            }}
          >
            <Trash2 size={64} color={theme.emptyIcon} />
            <p
              style={{
                color: theme.emptyText,
                fontSize: 15,
                fontWeight: 500,
                margin: 0,
              }}
            >
              Trash is Empty
            </p>
            <p
              style={{
                color: theme.emptySubtext,
                fontSize: 12,
                margin: 0,
              }}
            >
              Items deleted more than 30 days ago will be removed.
            </p>
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
    gsap.fromTo(
      ref.current,
      { scale: 0.88 },
      { scale: 1, duration: 0.3, ease: "back.out(2)" },
    );
    onClick(rect);
  };

  return (
    <div
      ref={ref}
      onClick={handleTap}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <img
        src={icon}
        alt={label}
        style={{
          width: 60,
          height: 60,
          objectFit: "contain",
          borderRadius: 14,
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      />
      <span
        style={{
          color: "white",
          fontSize: 11,
          fontWeight: 500,
          textShadow: "0 1px 4px rgba(0,0,0,0.8)",
        }}
      >
        {label}
      </span>
    </div>
  );
};

// ─── Dock Icon ────────────────────────────────────────────────────────────────
const DockIcon = ({ icon, label, onClick }) => {
  const ref = useRef(null);

  const handleTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    gsap.fromTo(
      ref.current,
      { scale: 0.85 },
      { scale: 1, duration: 0.3, ease: "back.out(2)" },
    );
    onClick(rect);
  };

  return (
    <div
      ref={ref}
      onClick={handleTap}
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={icon}
        alt={label}
        style={{
          width: 52,
          height: 52,
          objectFit: "contain",
          borderRadius: 13,
          boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
};

// ─── App Registry ─────────────────────────────────────────────────────────────
const APP_META = {
  finder: { name: "Finder", icon: "/images/finder.png", Component: FinderApp },
  safari: { name: "Blog", icon: "/images/safari.png", Component: SafariApp },
  photos: { name: "Gallery", icon: "/images/photos.png", Component: PhotosApp },
  contact: {
    name: "Contact",
    icon: "/images/contact.png",
    Component: ContactApp,
  },
  notes: { name: "About Me", icon: "/images/notes.png", Component: NotesApp },
  terminal: {
    name: "Skills",
    icon: "/images/terminal.png",
    Component: TerminalApp,
  },
  resume: { name: "Resume", icon: "/images/resume.png", Component: ResumeApp },
};

const GRID_APPS = ["notes", "terminal", "resume"];
const DOCK_APPS = ["finder", "safari", "photos", "contact"];

// ─── Main ─────────────────────────────────────────────────────────────────────
const MobileHomeContent = () => {
  const [activeApp, setActiveApp] = useState(null);
  const [originRect, setOriginRect] = useState(null);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const openApp = useCallback((id, rect) => {
    setOriginRect(rect);
    setActiveApp(id);
  }, []);
  const closeApp = useCallback(() => {
    setActiveApp(null);
    setOriginRect(null);
  }, []);

  return (
    <div
      className="sm:hidden"
      style={{
        width: "100dvw",
        height: "100dvh",
        backgroundColor: "#000",
        backgroundImage: "url('/images/wallpaper.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -80,
          left: -60,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(88,86,214,0.25) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 120,
          right: -80,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(10,132,255,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
      <StatusBar
        onRecommendationClick={() => setShowRecommendation((prev) => !prev)}
      />

      {showRecommendation ? (
        <RecommendationToast
          topOffset="48px"
          onClose={() => setShowRecommendation(false)}
        />
      ) : null}

      {/* Greeting */}
      <div
        style={{
          textAlign: "center",
          padding: "24px 24px 8px",
          userSelect: "none",
        }}
      >
        <p
          style={{
            color: "white",
            fontSize: 26,
            fontWeight: 700,
            margin: 0,
            letterSpacing: "-0.5px",
            lineHeight: 1.25,
          }}
        >
          {aboutContent.headline}
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 14,
            margin: "8px 0 0",
            fontWeight: 400,
          }}
        >
          Welcome to my Portfolio
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: 12,
            margin: "4px 0 0",
          }}
        >
          {dayjs().format("dddd, MMMM D")}
        </p>
      </div>

      {/* Grid — About Me, Skills, Resume */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px 0",
          padding: "28px 16px 0",
          alignContent: "start",
        }}
      >
        {GRID_APPS.map((id) => {
          const { name, icon } = APP_META[id];
          return (
            <AppIcon
              key={id}
              icon={icon}
              label={name}
              onClick={(rect) => openApp(id, rect)}
            />
          );
        })}
      </div>

      <div style={{ flex: 1 }} />

      {/* Dock */}
      <div
        style={{
          margin: "0 20px 16px",
          backgroundColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(24px)",
          borderRadius: 26,
          padding: "14px 20px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        {DOCK_APPS.map((id) => {
          const { name, icon } = APP_META[id];
          return (
            <DockIcon
              key={id}
              icon={icon}
              label={name}
              onClick={(rect) => openApp(id, rect)}
            />
          );
        })}
      </div>

      <HomeIndicator />

      {/* All sheets */}
      {Object.entries(APP_META).map(([id, { name, icon, Component }]) => (
        <AppSheet
          key={id}
          isOpen={activeApp === id}
          onClose={closeApp}
          appName={name}
          appIcon={icon}
          originRect={originRect}
        >
          <Component />
        </AppSheet>
      ))}
      </div>
    </div>
  );
};

const MobileHome = () => (
  <MobileThemeProvider>
    <MobileHomeContent />
  </MobileThemeProvider>
);

export default MobileHome;
