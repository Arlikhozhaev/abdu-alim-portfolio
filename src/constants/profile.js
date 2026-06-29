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
    "Computer Science student & aspiring software engineer based in Vancouver. I build scalable, interactive, user-friendly software where clean engineering meets great design — and I'm always hungry to learn, ship, and grow.",
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
    "Computer Science student & aspiring software engineer based in Vancouver. I build scalable, interactive, user-friendly software where clean engineering meets great design — and I'm always hungry to learn, ship, and grow.",
    "I specialize in C/C++, Java, JavaScript, TypeScript, React, and Next.js — and I love making things feel smooth, fast, and delightful.",
    "I'm big on clean UI, solid UX, reliable backends, and code that doesn't need a search party to debug.",
    "Outside of dev work, you'll find me boxing, golfing, hiking somewhere in the mountains, or literally nature gazing anywhere I can. 😅",
  ],
};

export const projects = [
  {
    id: 1,
    finderId: 5,
    name: "ReviewLens",
    desc: "AI-powered review analysis platform. Clusters customer feedback into structured insights using OpenAI embeddings + k-means.",
    link: "https://review-lens-ten.vercel.app/",
    linkLabel: "ReviewLens Website",
    img: "/images/project-1.png",
    tech: ["Next.js", "TypeScript", "Prisma", "Supabase", "OpenAI"],
    position: "top-10 left-5",
    windowPosition: "top-[5vh] left-9",
    description: [
      "AI-powered review analysis platform. Clusters customer feedback into structured insights using OpenAI embeddings + k-means.",
      "Built with Next.js 14 App Router, TypeScript, Prisma, Supabase, and GPT-4o-mini.",
      "Full-stack SaaS — CSV parsing, AI pipeline, Recharts dashboard, shareable reports, and session persistence.",
    ],
  },
  {
    id: 2,
    finderId: 6,
    name: "AutoDev",
    desc: "AI-powered autonomous code analysis, refactoring, and PR automation.",
    link: "https://github.com/Arlikhozhaev/autodev",
    linkLabel: "autodev.com",
    img: "/images/project-2.png",
    tech: ["FastAPI", "Celery", "PostgreSQL", "Next.js"],
    position: "top-52 right-50",
    windowPosition: "top-[20vh] left-5",
    description: [
      "AI-powered autonomous code analysis, refactoring, and PR automation.",
    ],
  },
  {
    id: 3,
    finderId: 7,
    name: "ProfessorMatch AI",
    desc: "AI-powered professor recommendation platform with personalized search and a conversational assistant.",
    link: "https://professor-match-ai.vercel.app/",
    linkLabel: "ProfessorMatch AI Website",
    img: "/images/project-3.png",
    tech: ["Next.js", "SQLite", "OpenAI", "TypeScript"],
    position: "top-15 right-40",
    windowPosition: "top-[35vh] left-7",
    description: [
      "A modern AI-powered professor recommendation platform built with Next.js, SQLite, and retrieval-based chat flows.",
      "The app helps students explore professors using review data, personalized search results, and a conversational assistant.",
    ],
  },
  {
    id: 4,
    finderId: 8,
    name: "FlashStudy-AI",
    desc: "AI-powered flashcard generator that transforms study material into structured flashcards using NLP.",
    link: "https://flash-study-ai.vercel.app/",
    linkLabel: "FlashStudy-AI Website",
    img: "/images/project-4.png",
    tech: ["React", "Node.js", "Firebase", "OpenAI"],
    position: "top-62 left-10",
    windowPosition: "top-[50vh] left-7",
    description: [
      "FlashStudy-AI is an AI-powered flashcard generator that transforms study material into concise, structured flashcards using natural language processing.",
      "Users can input text or topics, and the system automatically generates question-answer pairs to improve active recall and memory retention.",
      "Built using React, Node.js, Firebase, and OpenAI API, the application includes user authentication, flashcard storage, and review functionality to create an effective study experience.",
      "Sign in, generate your flashcards effortlessly, and boost your memory retention—all in one seamless experience!",
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
    dates: "Oct 2025 – Jan 2026",
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
