/**
 * Single source of truth for portfolio content.
 * Edit here — desktop and mobile stay in sync.
 */

export const CONTACT_EMAIL = "arlikhozhaevca@gmail.com";

export const RESUME_PATH = "/files/resume.pdf";

export const aboutContent = {
  fileName: "Abdu-Alim.txt",
  subtitle: "Meet the Developer Behind the Code",
  heroImage: "/images/young-me.jpg",
  headline: "Hey, I'm Abdu Alim! 👋",
  intro:
    "Computer Science student at Langara College (Associate of Science, expected Dec 2026) and aspiring software engineer in Vancouver. I build scalable, user-friendly software where clean engineering meets thoughtful design.",
  photos: [
    {
      id: 1,
      name: "travel-me.png",
      imageUrl: "/images/travel-me.jpg",
      position: "top-10 left-5",
    },
    {
      id: 2,
      name: "nomad-me.png",
      imageUrl: "/images/nomad-me.jpg",
      position: "top-28 right-72",
    },
    {
      id: 3,
      name: "boxing-me.png",
      imageUrl: "/images/boxing-me.jpg",
      position: "top-52 left-80",
    },
  ],
  sections: [
    {
      id: "differentiator",
      emoji: "⚡",
      title: "What sets me apart",
      accent: "#0A84FF",
      body: "I don't just code — I learn fast, adapt quickly, and ship results. I thrive where creativity meets engineering: optimizing systems, solving hard problems, and building products that actually matter.",
    },
    {
      id: "life",
      emoji: "🥊",
      title: "Outside the keyboard",
      accent: "#ff9f0a",
      body: "Boxing, golfing, hiking in the mountains, or nature gazing wherever I can. Stepping away from the screen helps me recharge, think clearly, and come back a sharper engineer.",
    },
  ],
  cta: {
    emoji: "🚀",
    body: "Actively seeking software engineering opportunities to learn, ship, and grow. If you're building something ambitious — let's talk.",
  },
  desktopDescription: [
    "Computer Science student at Langara College (Associate of Science, expected Dec 2026), based in Vancouver. I build full-stack products where solid engineering and clear UX work together.",
    "I specialize in C/C++, Java, JavaScript, TypeScript, React, and Next.js — and I love making things feel smooth, fast, and delightful.",
    "I'm big on clean UI, solid UX, reliable backends, and code that doesn't need a search party to debug.",
    "Outside of dev work, you'll find me boxing, golfing, hiking somewhere in the mountains, or literally nature gazing anywhere I can. 😅",
  ],
};

export const education = [
  {
    id: 1,
    institution: "Langara College",
    degree: "Associate of Science, Computer Science",
    dates: "Expected Dec 2026",
    location: "Vancouver, BC",
    coursework: [
      "Data Structures & Algorithms (C++)",
      "Discrete Mathematics",
      "Database Systems",
      "Unix Tools & Scripting",
      "Calculus I/II",
    ],
  },
];

export const projects = [
  {
    id: 1,
    finderId: 5,
    name: "ReviewLens",
    desc: "Full-stack SaaS that turns customer reviews into clear, actionable themes using AI clustering.",
    link: "https://review-lens-ten.vercel.app/",
    linkLabel: "ReviewLens Website",
    img: "/images/project-1.png",
    tech: ["Next.js", "TypeScript", "Prisma", "Supabase", "OpenAI"],
    position: "top-10 left-5",
    windowPosition: "top-[5vh] left-9",
    description: [
      "ReviewLens helps teams understand large volumes of customer feedback without reading every comment manually. Users upload review data; the app groups similar feedback with OpenAI embeddings and k-means, then surfaces themes and trends in a visual dashboard.",
      "I built the product end-to-end with Next.js 14 (App Router), TypeScript, Prisma, and Supabase — including auth, workspaces, a GPT-4o-mini analysis pipeline, Recharts visualizations, and shareable report links.",
      "The goal was practical: go from raw CSV to a decision-ready summary in minutes, with a UI that non-technical stakeholders can actually use.",
    ],
  },
  {
    id: 2,
    finderId: 6,
    name: "AutoDev",
    desc: "Developer platform for AI-assisted code analysis, refactoring suggestions, and PR workflow automation.",
    link: "https://github.com/Arlikhozhaev/autodev",
    linkLabel: "AutoDev on GitHub",
    img: "/images/project-2.png",
    tech: ["FastAPI", "Celery", "PostgreSQL", "Next.js"],
    position: "top-52 right-50",
    windowPosition: "top-[20vh] left-5",
    description: [
      "AutoDev explores how AI can support the delivery loop — analyzing repositories, surfacing issues, suggesting refactors, and preparing change proposals developers review before merge.",
      "The architecture uses FastAPI with Celery workers and PostgreSQL for async job processing, plus a Next.js frontend for connecting repos, tracking jobs, and reviewing diffs.",
      "This project pushed me on queue-based backends, API design, and building tools where trust and clarity matter more than flashy demos.",
    ],
  },
  {
    id: 3,
    finderId: 7,
    name: "ProfessorMatch AI",
    desc: "Professor discovery app with personalized rankings and a retrieval-based AI assistant for students.",
    link: "https://professor-match-ai.vercel.app/",
    linkLabel: "ProfessorMatch AI Website",
    img: "/images/project-3.png",
    tech: ["Next.js", "SQLite", "OpenAI", "TypeScript"],
    position: "top-15 right-40",
    windowPosition: "top-[35vh] left-7",
    description: [
      "ProfessorMatch AI helps students find professors that fit their goals and learning style. Users search and filter by department, ratings, and interests, then get recommendations backed by real review data.",
      "Built with Next.js and TypeScript, with profiles stored in SQLite and a chat assistant powered by retrieval-based flows on OpenAI — answers stay grounded in actual reviews, not generic text.",
      "I focused on fast search, readable match explanations, and a conversational layer that feels useful during course planning, not like a gimmick.",
    ],
  },
  {
    id: 4,
    finderId: 8,
    name: "FlashStudy-AI",
    desc: "Study app that converts notes and topics into AI-generated flashcards for active recall.",
    link: "https://flash-study-ai.vercel.app/",
    linkLabel: "FlashStudy-AI Website",
    img: "/images/project-4.png",
    tech: ["React", "Node.js", "Firebase", "OpenAI"],
    position: "top-62 left-10",
    windowPosition: "top-[50vh] left-7",
    description: [
      "FlashStudy-AI turns lecture notes, articles, or topic prompts into question–answer flashcards using OpenAI. Students sign in, generate a deck in one flow, and review cards stored in Firebase.",
      "Stack: React frontend, Node.js API, Firebase Auth and Firestore, with structured prompts and validation so generated cards stay concise and study-ready.",
      "I cared about the details that separate a demo from a tool people reuse — handling malformed model output, keeping the review flow simple, and making generation feel instant after login.",
    ],
  },
];

export const trashItems = [
  {
    id: 1,
    name: "trash1.png",
    imageUrl: "/images/trash-1.png",
    position: "top-10 left-10",
  },
  {
    id: 2,
    name: "trash2.png",
    imageUrl: "/images/trash-2.png",
    position: "top-40 left-80",
  },
];

export const experience = [
  {
    id: 1,
    company: "Envia Together",
    logo: "/images/envia-logo.png",
    title: "Software Developer Intern",
    dates: "Oct 2025 – Jan 2026 · 4 mos",
    location: "Remote · Vancouver, BC",
    tech: ["AWS", "Node.js", "TypeScript", "MySQL", "Terraform", "RevenueCat"],
    bullets: [
      "Co-designed and built a subscription enforcement backend for an MVP launch, integrating RevenueCat webhooks to handle the full entitlement lifecycle (trial, active, expired, billing-retry) across web clients",
      "Co-built an event-driven AWS system (Lambda + API Gateway) that became the single source of truth for paywall access -- enabling real-time entitlement enforcement with zero production incidents across all post-launch releases",
      "Provisioned and managed cloud infrastructure using Terraform (IaC), maintaining reproducible dev and production environments and eliminating manual environment setup.",
      "Deployed and validated backend services on AWS, testing all endpoint flows using Postman before client integration",
    ],
  },
];

export const volunteerExperience = [
  {
    id: 1,
    company: "Web Summit Vancouver",
    logo: "/images/web-summit-logo.png",
    title: "Volunteer Team Lead",
    dates: "May 2026 · 1 mo",
    location: "Vancouver, BC",
    tech: ["Team Leadership", "Event Operations", "Stakeholder Coordination"],
    bullets: [
      "Led a volunteer team at Web Summit Vancouver 2026 — a global tech conference with 20,000+ attendees, 1,500+ startups, and 700+ investors",
      "Resolved real-time operational issues and coordinated with the Key Events team on attendee guidance, venue flow, and on-site logistics",
      "Supported fast-paced event execution alongside founders, investors, and teams across AI, software, and Vancouver's tech ecosystem",
    ],
  },
  {
    id: 2,
    company: "BC Technology for Learning Society",
    logo: "/images/bc-tech-logo.png",
    title: "Volunteer Hardware Technician",
    dates: "Feb 2025 – May 2025 · 4 mos",
    location: "Vancouver, BC",
    tech: ["Windows", "Hardware Diagnostics", "Microsoft Authorized Refurbisher"],
    bullets: [
      "Refurbished 350+ donated computers, laptops, and peripherals — OS installs, cleaning, and component swaps (HDD, SSD, RAM)",
      "Tested and assessed system performance before devices reached schools, non-profits, and low-income families",
      "Worked as a Microsoft Authorized Refurbisher, helping expand access to reliable technology in the community",
    ],
  },
];

const buildProjectFolderChildren = (project) => [
  {
    id: 1,
    name: `${project.name}.txt`,
    icon: "/images/txt.png",
    kind: "file",
    fileType: "txt",
    position: "top-5 left-10",
    description: project.description,
  },
  {
    id: 2,
    name: project.linkLabel,
    icon: "/images/safari.png",
    kind: "file",
    fileType: "url",
    href: project.link,
    position: "top-10 right-20",
  },
  {
    id: 4,
    name: `${project.name}.png`,
    icon: "/images/image.png",
    kind: "file",
    fileType: "img",
    position: "top-52 right-80",
    imageUrl: project.img,
  },
];

export const buildWorkLocation = () => ({
  id: 1,
  type: "work",
  name: "Projects",
  icon: "/icons/work.svg",
  kind: "folder",
  children: projects.map((project) => ({
    id: project.finderId,
    name: project.name,
    icon: "/images/folder.png",
    kind: "folder",
    position: project.position,
    windowPosition: project.windowPosition,
    children: buildProjectFolderChildren(project),
  })),
});

export const buildAboutLocation = () => ({
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    ...aboutContent.photos.map((photo) => ({
      id: photo.id,
      name: photo.name,
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: photo.position,
      imageUrl: photo.imageUrl,
    })),
    {
      id: 4,
      name: aboutContent.fileName,
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: aboutContent.subtitle,
      image: aboutContent.heroImage,
      headline: aboutContent.headline,
      description: aboutContent.desktopDescription,
      sections: aboutContent.sections,
      cta: aboutContent.cta,
    },
  ],
});

export const buildTrashLocation = () => ({
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: trashItems.map((item) => ({
    id: item.id,
    name: item.name,
    icon: "/images/image.png",
    kind: "file",
    fileType: "img",
    position: item.position,
    imageUrl: item.imageUrl,
  })),
});
