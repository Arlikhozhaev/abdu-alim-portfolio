import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { aboutContent, CONTACT_EMAIL, techStack } from "#constants";

const cardStyle = {
  backgroundColor: "#2c2c2e",
  borderRadius: 16,
  padding: 16,
};

const AboutProfile = ({ compact = false }) => {
  const containerRef = useRef(null);

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

  return (
    <div
      ref={containerRef}
      style={{ display: "flex", flexDirection: "column", gap }}
    >
      <div
        data-about-item
        style={{
          backgroundColor: "#2c2c2e",
          borderRadius: 16,
          overflow: "hidden",
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
            color: "white",
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
            color: "rgba(255,255,255,0.75)",
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
              color: "rgba(255,255,255,0.75)",
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
                  color: "rgba(255,255,255,0.45)",
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
                  color: "rgba(255,255,255,0.75)",
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
          backgroundColor: "#1a3a5c",
          border: "1px solid rgba(10,132,255,0.3)",
        }}
      >
        <p
          style={{
            color: "white",
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
            color: "#0A84FF",
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
