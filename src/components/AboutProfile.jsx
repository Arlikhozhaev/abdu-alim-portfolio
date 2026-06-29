import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { aboutContent, CONTACT_EMAIL, techStack } from "#constants";
import { useMobileTheme } from "#context/MobileThemeContext";

const AboutProfile = ({ compact = false }) => {
  const containerRef = useRef(null);
  const theme = useMobileTheme();

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      gsap.fromTo(
        el.querySelectorAll("[data-about-item]"),
        { opacity: 0, y: compact ? 16 : 24, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    },
    { scope: containerRef },
  );

  const titleSize = compact ? 16 : 17;
  const bodySize = compact ? 13 : 14;
  const sectionTitleSize = compact ? 13 : 13;
  const gap = compact ? 12 : 12;

  const cardStyle = {
    backgroundColor: theme.cardBg,
    borderRadius: 16,
    padding: compact ? 14 : 16,
    border: `1px solid ${theme.border}`,
    boxShadow: theme.cardShadow,
  };

  return (
    <div
      ref={containerRef}
      style={{ display: "flex", flexDirection: "column", gap }}
    >
      <div
        data-about-item
        style={{
          backgroundColor: theme.cardBg,
          borderRadius: 16,
          overflow: "hidden",
          border: `1px solid ${theme.border}`,
          boxShadow: theme.cardShadow,
        }}
      >
        <img
          src={aboutContent.heroImage}
          alt="Abdu Alim"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "contain",
          }}
        />
      </div>

      <div data-about-item style={cardStyle}>
        <p
          style={{
            color: theme.text,
            fontWeight: 700,
            fontSize: titleSize,
            margin: "0 0 8px",
            letterSpacing: "-0.2px",
          }}
        >
          {aboutContent.headline}
        </p>
        <p
          style={{
            color: theme.textSecondary,
            fontSize: bodySize,
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {aboutContent.intro}
        </p>
      </div>

      {aboutContent.sections.map(({ id, emoji, title, accent, body }) => (
        <div key={id} data-about-item style={cardStyle}>
          <p
            style={{
              color: accent,
              fontWeight: 700,
              fontSize: sectionTitleSize,
              textTransform: "uppercase",
              letterSpacing: 1,
              margin: "0 0 8px",
            }}
          >
            {emoji} {title}
          </p>
          <p
            style={{
              color: theme.textSecondary,
              fontSize: bodySize,
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {body}
          </p>
        </div>
      ))}

      <div data-about-item style={cardStyle}>
        <p
          style={{
            color: "#30d158",
            fontWeight: 700,
            fontSize: sectionTitleSize,
            textTransform: "uppercase",
            letterSpacing: 1,
            margin: "0 0 10px",
          }}
        >
          💻 Stack
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {techStack.map(({ category, items }) => (
            <div key={category}>
              <p
                style={{
                  color: theme.textMuted,
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  margin: "0 0 4px",
                }}
              >
                {category}
              </p>
              <p
                style={{
                  color: theme.textSecondary,
                  fontSize: compact ? 12 : 13,
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        data-about-item
        style={{
          ...cardStyle,
          backgroundColor: theme.ctaBg,
          border: `1px solid ${theme.ctaBorder}`,
        }}
      >
        <p
          style={{
            color: theme.text,
            fontSize: bodySize,
            lineHeight: 1.65,
            margin: "0 0 10px",
          }}
        >
          {aboutContent.cta.emoji} {aboutContent.cta.body}
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          style={{
            color: theme.accent,
            fontSize: bodySize,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          {CONTACT_EMAIL} →
        </a>
      </div>
    </div>
  );
};

export default AboutProfile;
