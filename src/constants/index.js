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
    items: ["C++", "Java", "JavaScript", "TypeScript", "Python"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "HTML5"],
  },
  {
    category: "Styling",
    items: ["CSS3", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "REST APIs"],
  },
  {
    category: "Databases",
    items: ["MySQL", "SQL"],
  },
  {
    category: "Cloud",
    items: ["AWS", "Terraform", "Vercel"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "VS Code", "IntelliJ IDEA"],
  },
  {
    category: "OS",
    items: ["Linux(Ubuntu)", "Windows"],
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
    link: "https://arlikhozhaev.ca/",
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
      "Co-designed and built a subscription backend integrating RevenueCat webhooks, covering the full lifecycle — new subscriptions, renewals, expirations, and cancellations",
      "Implemented an event-driven AWS architecture (Lambda + API Gateway) serving as the paywall source of truth, decoupling billing logic entirely from mobile clients",
      "Exposed a subscription status REST API consumed by mobile clients, reducing client-side billing complexity and centralizing subscription state",
      "Secured API credentials via AWS environment variables and implemented robust error handling for edge cases including expired subscriptions, invalid receipts, and network failures",
      "Deployed and validated backend services on AWS, testing all endpoint flows using Postman before client integration",
    ],
  },
];

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Projects",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "FlashStudy-AI",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5", // icon position inside Finder
      windowPosition: "top-[5vh] left-5", // optional: Finder window position
      children: [
        {
          id: 1,
          name: "FlashStudy-AI.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "FlashStudy-AI is an AI-powered flashcard generator that transforms study material into concise, structured flashcards using natural language processing.",
            "Users can input text or topics, and the system automatically generates question-answer pairs to improve active recall and memory retention.",
            "Built using React, Node.js, Firebase, and OpenAI API, the application includes user authentication, flashcard storage, and review functionality to create an effective study experience.",
            "Sign in, generate your flashcards effortlessly, and boost your memory retention—all in one seamless experience!",
          ],
        },
        {
          id: 2,
          name: "FlashStudy-AI Website",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://flash-study-ai.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "FlashStudy-AI.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-1.png",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "AutoDev",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "AutoDev.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "AI-powered autonomous code analysis, refactoring, and PR automation.",
          ],
        },
        {
          id: 2,
          name: "autodev.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Arlikhozhaev/autodev",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "autodev.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/project-2.png",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "travel-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/travel-me.jpg",
    },
    {
      id: 2,
      name: "nomad-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/nomad-me.jpg",
    },
    {
      id: 3,
      name: "boxing-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/images/boxing-me.jpg",
    },
    {
      id: 4,
      name: "Abdu-Alim.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/young-me.jpg",
      description: [
        "Hey! I’m Abdu Alim 👋, a Software Engineer who enjoys building scalable, interactive and user-friendly websites that actually work well.",
        "I specialize in C++, Java, JavaScript, TypeScript, React, and Next.js — and I love making things feel smooth, fast, and delightful.",
        "I’m big on clean UI, good UX, solid backend and writing code that doesn’t need a search party to debug.",
        "Outside of dev work, you'll find me boxing, hiking somewhere in the mountains, or literally nature glazing anywhere I can. 😅",
      ],
    },
  ],
};

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

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

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