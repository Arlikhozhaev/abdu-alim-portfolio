import {
  aboutContent,
  projects,
  experience,
  CONTACT_EMAIL,
  RESUME_PATH,
} from "../src/constants/profile.js";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildSeoShellHtml = () => {
  const projectItems = projects
    .map(
      (project) =>
        `<li><a href="${escapeHtml(project.link)}">${escapeHtml(project.name)}</a> — ${escapeHtml(project.desc)}</li>`,
    )
    .join("");

  const experienceItems = experience
    .map(
      (role) =>
        `<li><strong>${escapeHtml(role.company)}</strong> — ${escapeHtml(role.title)} (${escapeHtml(role.dates)})</li>`,
    )
    .join("");

  return `
<main id="seo-prerender" aria-label="Abdu Alim portfolio summary">
  <header>
    <h1>${escapeHtml(aboutContent.headline.replace(/\s*👋\s*$/, ""))}</h1>
    <p>${escapeHtml(aboutContent.intro)}</p>
    <p><a href="mailto:${escapeHtml(CONTACT_EMAIL)}">${escapeHtml(CONTACT_EMAIL)}</a></p>
  </header>
  <section>
    <h2>Projects</h2>
    <ul>${projectItems}</ul>
  </section>
  <section>
    <h2>Experience</h2>
    <ul>${experienceItems}</ul>
  </section>
  <section>
    <h2>Resume</h2>
    <p><a href="${escapeHtml(RESUME_PATH)}">Download resume (PDF)</a></p>
  </section>
  <footer>
    <p>Open to software engineering opportunities in Vancouver, BC and remote.</p>
  </footer>
</main>`.trim();
};
