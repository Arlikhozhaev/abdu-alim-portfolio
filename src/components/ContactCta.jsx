import { CONTACT_EMAIL } from "#constants";

/**
 * Subtle, always-visible contact path for recruiters.
 * Typography-only — no loud buttons; mailto for zero friction.
 */
const ContactCta = ({ variant = "desktop" }) => {
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Portfolio inquiry — Abdu Alim")}`;

  if (variant === "mobile") {
    return (
      <p
        style={{
          color: "rgba(255,255,255,0.45)",
          fontSize: 13,
          margin: "14px 0 0",
          fontWeight: 400,
          letterSpacing: "0.01em",
        }}
      >
        Open to opportunities ·{" "}
        <a
          href={mailto}
          style={{
            color: "rgba(255,255,255,0.85)",
            textDecoration: "none",
            borderBottom: "1px solid rgba(255,255,255,0.25)",
            paddingBottom: 1,
          }}
        >
          Get in touch
        </a>
      </p>
    );
  }

  return (
    <p className="mt-8 text-sm font-georama text-gray-500 dark:text-gray-400 tracking-wide select-text">
      Open to opportunities ·{" "}
      <a
        href={mailto}
        className="text-gray-400 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 underline-offset-[6px] hover:underline decoration-gray-400/60 dark:decoration-gray-500/60"
      >
        Get in touch
      </a>
    </p>
  );
};

export default ContactCta;
