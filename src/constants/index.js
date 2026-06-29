import {
  aboutContent,
  projects,
  trashItems,
  experience,
  volunteerExperience,
  education,
  CONTACT_EMAIL,
  RESUME_PATH,
  buildWorkLocation,
  buildAboutLocation,
  buildTrashLocation,
} from "./profile";

const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/moon.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "Feb 12, 2026",
    title:
      "AI Made Student Developers Faster — But Not Necessarily Better",
    image: "/images/blog1.png",
    link: "https://medium.com/techtrends-digest/ai-made-student-developers-faster-but-not-necessarily-better-19750d07d0f6",
  },
];


const techStack = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "C/C++", "Java", "Python", "SQL", "Bash"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    category: "Backend",
    items: ["Node.js", "FastAPI", "RESTful APIs", "Celery", "AWS Lambda", "API Gateway"],
  },
  {
    category: "AI & LLMs",
    items: ["OpenAI API", "Claude API", "Vercel AI SDK", "k-means clustering"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS(EC2, S3, Lambda, API Gateway, IAM)", "Terraform(IaC)", "Vercel", "Git", "Linux"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "Supabase", "Prisma ORM"],
  },
];


const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/Arlikhozhaev",
  },
  {
    id: 2,
    text: "Platform",
    icon: "/icons/atom.svg",
    bg: "#4bcb63",
    link: "https://arlikhozhaev.dev/",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "https://x.com/arlikhozhaev",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/arlikhozhaev/",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.jpg",
    title: "High School Honors Graduate 🎓",
  },
  {
    id: 2,
    img: "/images/gal2.jpg",
    title: "Judging Hacker Projects at nwHacks 2026 💻",
  },
  {
    id: 3,
    img: "/images/gal3.jpg",
    title: "Happy Me 👍",
  },
  {
    id: 4,
    img: "/images/gal4.jpg",
    title: "Hackathon in Waterloo ✨",
  },
  {
    id: 5,
    img: "/images/gal5.jpg",
    title: "Hackathon Closing Ceremony 📚",
  },
];

export {
  aboutContent,
  projects,
  trashItems,
  experience,
  volunteerExperience,
  education,
  CONTACT_EMAIL,
  RESUME_PATH,
};

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const EXPERIENCE_LOCATION = {
  id: 5,
  type: "experience",
  name: "Experience",
  icon: "/icons/experience.svg",
  kind: "folder",
  children: [],
};

const WORK_LOCATION = buildWorkLocation();
const ABOUT_LOCATION = buildAboutLocation();

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = buildTrashLocation();

export const locations = {
  about: ABOUT_LOCATION,
  experience: EXPERIENCE_LOCATION,
  resume: RESUME_LOCATION,
  work: WORK_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };