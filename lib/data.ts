export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Full-Stack" | "AI & SaaS" | "3D & Creative" | "Cloud & DevOps" | "E-commerce" | "Consulting" | "Restaurant";
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
  overview?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  challenges?: string[];
  technologies: string[];
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tools";
  level: number; // percentage 0-100
  icon: string;
  description: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  relationship: string;
}

export const PERSONAL_CONFIG = {
  name: "Saroj Kumar Sahoo",
  displayRole: "Full-Stack Web Developer",
  tagline: "Building Digital Experiences That Feel Alive.",
  bioShort: "I'm a full-stack developer focused on building high-performance web applications, immersive interfaces and scalable digital products.",
  bioLong: "With over 3+ years of professional engineering experience across fast-scaling tech startups and creative studios, I bridge the gap between elegant design aesthetics and resilient backend distributed systems. I obsess over sub-100ms render speeds, cinematic micro-interactions, robust database models, and developer ergonomics.",
  status: "Available for freelance / full-time opportunities",
  availabilityPeriod: "Q1 / Q2 2026",
  email: "sarojjagu@gmail.com",
  phone: "+91 8457875524",
  location: "Bhubaneswar,Odisha,India (Remote Worldwide)",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://www.instagram.com/sarojkumarjagu/",
    linkedin: "https://www.linkedin.com/in/saroj-kumar-sahoo-167099181/?skipRedirect=true",
    twitter: "https://www.facebook.com/sks845",
    discord: "https://discord.com/users/yourusername"
  },
  stats: [
    { value: 3, suffix: "+", label: "Years Experience", description: "Specialized in TypeScript, Node & modern cloud architectures" },
    { value: 10, suffix: "+", label: "Projects Built", description: "From autonomous AI agents to high-volume commerce engines" },
    { value: 15, suffix: "+", label: "Core Technologies", description: "Mastery spanning modern web, microservices, and databases" },
    { value: 100, suffix: "%", label: "Code Craft & Passion", description: "Dedicated to pixel-precision, accessibility & performance" }
  ]
};

export const SKILL_CATEGORIES = ["All", "Frontend", "Backend", "Database", "Tools"] as const;

export const SKILLS_DATA: Skill[] = [
  // Frontend
  { name: "HTML 5", category: "Frontend", level: 98, icon: "Layout", description: "Semantic markup, accessibility, modern HTML5 APIs", featured: true },
  { name: "CSS 3", category: "Frontend", level: 95, icon: "Palette", description: "Flexbox, CSS Grid, animations, container queries", featured: true },
  { name: "JavaScript", category: "Frontend", level: 95, icon: "Code2", description: "ES2024+, async/await, DOM, modern browser APIs", featured: true },
  { name: "TypeScript", category: "Frontend", level: 93, icon: "FileCode", description: "Strict type safety, generics, modern ASTs", featured: true },
  { name: "React 19", category: "Frontend", level: 92, icon: "Atom", description: "Server Components, hooks, concurrent rendering", featured: true },
  { name: "Next.js 15", category: "Frontend", level: 91, icon: "Zap", description: "App Router, SSR, Server Actions, streaming", featured: true },
  { name: "Tailwind CSS", category: "Frontend", level: 94, icon: "Brush", description: "Utility-first CSS, responsive design, custom themes" },
  { name: "Bootstrap", category: "Frontend", level: 88, icon: "LayoutGrid", description: "Responsive grid system, components, theming" },

  // Backend
  { name: "Node.js", category: "Backend", level: 90, icon: "Server", description: "Async I/O, event loops, clustering, microservices", featured: true },
  { name: "Python", category: "Backend", level: 85, icon: "Terminal", description: "Scripting, automation, data pipelines, AI integrations", featured: true },
  { name: "WordPress", category: "Backend", level: 88, icon: "Globe", description: "Custom themes, plugins, WooCommerce, REST API" },

  // Database
  { name: "MySQL", category: "Database", level: 87, icon: "Database", description: "Relational schemas, joins, indexing, stored procedures", featured: true },

  // Tools
  { name: "Git", category: "Tools", level: 93, icon: "GitPullRequest", description: "Version control, branching strategies, collaboration", featured: true },
  { name: "Digital Marketing", category: "Tools", level: 82, icon: "TrendingUp", description: "Social media, email campaigns, analytics, funnels" },
  { name: "SEO", category: "Tools", level: 85, icon: "Search", description: "On-page SEO, Core Web Vitals, keyword strategy, audits" },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "sai-tech-academy",
    title: "Sai Tech Academy",
    subtitle: "Learning Platform With AI Agents and Interactive Code Labs",
    category: "Full-Stack",
    description: "A modern learning management system (LMS) featuring AI-powered course recommendations, real-time coding environments, and gamified progress tracking.",
    longDescription: "Built for Sai Tech Academy, this platform delivers a fully adaptive learning experience powered by AI agents that tailor course content to each learner's pace and skill level. The system features live collaborative coding labs, gamified streaks and leaderboards, and a role-based admin console for instructors and organizations.",
    image: "https://www.saitechacademy.com/saitech-logo.png",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Redis", "WebSockets", "Node.js"],
    githubUrl: "https://github.com/yourusername/sai-tech-academy",
    liveUrl: "https://www.saitechacademy.com/",
    featured: true,
    metrics: [
      { label: "Active Organizations", value: "480+" },
      { label: "Queries Processed", value: "2.4M" },
    ],
    technologies: ["Next.js 15", "React 19", "Node.js", "Redis", "Tailwind CSS", "TypeScript", "Docker"]
  },
  {
    id: "gargi-group",
    title: "Gargi Group",
    subtitle: "Real Estate Company Website",
    category: "Full-Stack",
    description: "Gargi Group is a diversified business group rooted in Bhubaneswar, Odisha, with a strong presence in the Real Estate and Infrastructure sectors.",
    longDescription: "Engineered for an avant-garde horology brand, Aetheria combines physical craftsmanship with digital interactivity through WebGL watch models, real-time material switches, and instant cart synchronization.",
    image: "/assets/final-logo-gargigroup.png",
    tags: ["Next.js", "Three.js", "WebGL", "Tailwind CSS", "Stripe", "Zustand"],
    githubUrl: "https://github.com/yourusername/aetheria-luxury-commerce",
    liveUrl: "https://www.gargigroup.in/",
    featured: true,
    metrics: [
      { label: "Conversion Lift", value: "+38%" },
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Frame Rate", value: "60 FPS" }
    ],
    technologies: ["Three.js", "Next.js", "Tailwind CSS", "Stripe API", "Zustand", "TypeScript"]
  },
  {
    id: "gargi-treasure",
    title: "Gargi Treasure",
    subtitle: "WHERE CAPITAL MEETS GLOBAL TRADE",
    category: "Full-Stack",
    description: "Expanding credit, optimizing investments, and unlocking new trade frontiers. We make every market move count by providing transparent financing solutions and proven investment governance for enterprise and family wealth.",
    longDescription: "PulseOps aggregates metrics from Kubernetes clusters, edge worker nodes, and serverless containers into intuitive charts and animated topology maps.",
    image: "/assets/GT-transparent-logo.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Chart.js", "Node.js"],
    githubUrl: "https://github.com/yourusername/pulseops-telemetry",
    liveUrl: "https://www.gargitreasure.com/",
    featured: true,
    metrics: [
      { label: "Events / Sec", value: "85,000" },
      { label: "Telemetry Uptime", value: "99.99%" },
      { label: "Incident MTTR", value: "-45%" }
    ],
    technologies: ["Next.js", "PostgreSQL", "Node.js", "Tailwind CSS", "TypeScript", "Docker"]
  },
  {
    id: "atol-exports",
    title: "Atol Exports",
    subtitle: "Turmeric exporter from India, built for B2B buyers.",
    category: "E-commerce",
    description: "Atoll Exports supplies dried turmeric fingers and turmeric powder to importers, wholesalers and food manufacturers worldwide — sourced with care, packed for export, and backed by proper documentation.",
    longDescription: "Chronos lets musicians and sound designers patch virtual oscillators, low-pass filters, delay lines, and LFOs directly in the browser, accompanied by real-time reactive particle geometry.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-IRpTypsySCNpyBGAX2m4fVKkVHDgc93bX68HgBHjaQ&s=10",
    tags: ["WordPress", "css", "MySQL", "HTML"],
    githubUrl: "https://github.com/yourusername/chronos-synthesizer",
    liveUrl: "https://atollexports.com/",
    featured: false,
    metrics: [
      { label: "Audio Latency", value: "< 8ms" },
      { label: "Audio Nodes", value: "32 Polyphonic" },
      { label: "GitHub Stars", value: "1.2k" }
    ],
    technologies: ["Wordpress,Mysql"]
  },
  {
    id: "digital-marketing-expert-rakesh",
    title: "Digital Marketing Expert Rakesh",
    subtitle: "Digital Marketing Consultant | SEO & Performance Marketing Specialist",
    category: "Consulting",
    description: "With 13+ years of hands-on experience, I help businesses across Odisha and globally generate leads, improve visibility, and scale through SEO, Google Ads, Meta Ads, and conversion-focused websites.",
    longDescription: "Built for an international luxury hotel collective, Vanguard manages properties across 14 countries, offering contactless check-ins, localized reservations, and concierge chat.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiaitzgNkcMJcf8pw5C1qD8R1ILwPwvHgeQ7q_wCdHHw&s=10",
    tags: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/vanguard-hospitality-platform",
    liveUrl: "https://www.digitalmarketingexpertrakesh.com/",
    featured: false,
    metrics: [
      { label: "Gross Bookings", value: "$4.2M" },
      { label: "Global Regions", value: "14 Countries" },
      { label: "Check-in Time", value: "< 45s" }
    ],
    technologies: ["Wordpress", "HTML", "CSS", "JAVASCRIPT"]
  },
  {
    id: "pahadi-dhaba",
    title: "Pahadi Dhaba",
    subtitle: "Authentic Pahadi Food",
    category: "Restaurant",
    description: "Enjoy Healthy and Delicious Food in town",
    longDescription: "DevPulse cuts developer onboarding from days to minutes by containerizing complete distributed stacks with a single terminal command.",
    image: "https://pahadidhaba.com/wp-content/uploads/2026/07/best-seafood-restaurant-patharagadia-pahadi-dhaba.jpg-1024x683.png",
    tags: ["TypeScript", "Node.js", "Docker", "Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/devpulse-cloud-cli",
    liveUrl: "https://pahadidhaba.com/",
    featured: false,
    metrics: [
      { label: "CLI Downloads", value: "45,000+" },
      { label: "Setup Time Saved", value: "85%" },
      { label: "Weekly Active", value: "12k" }
    ],
    technologies: [" wordpress"]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Associate Software Engineer",
    company: "Conceptserve Technology",
    location: "Ahmedabad, Gujarat",
    period: "2023 — 2024",
    description:
      "Worked on developing and maintaining responsive web applications for clients, focusing on frontend development, reusable UI components, and cross-browser compatibility.",
    achievements: [
      "Developed responsive and user-friendly web interfaces using HTML, CSS, Bootstrap, and React.",
      "Built reusable React components and implemented responsive layouts for desktop, tablet, and mobile devices.",
      "Collaborated with designers and development teams to convert UI designs into functional web applications and resolve frontend issues."
    ],
    technologies: [
      "HTML",
      "CSS",
      "Bootstrap",
      "React",
      "Tailwind CSS"
    ]
  },

  {
    id: "exp-2",
    role: "Frontend Developer",
    company: "Connect Infosoft Technology",
    location: "Faridabad, Haryana",
    period: "2024 — 2025",
    description:
      "Focused on building modern, scalable, and interactive frontend applications using React and Next.js, while collaborating with teams throughout the development lifecycle.",
    achievements: [
      "Developed modern and responsive web applications using React, Next.js, TypeScript, and Tailwind CSS.",
      "Created reusable UI components, integrated REST APIs, and implemented interactive interfaces based on Figma designs.",
      "Worked with Git, GitHub, and Jira for version control, task management, collaboration, and delivering frontend features."
    ],
    technologies: [
      "React",
      "Next.js",
      "Three.js",
      "TypeScript",
      "MySQL",
      "Figma",
      "Git",
      "Jira",
      "GitHub"
    ]
  },

  {
    id: "exp-3",
    role: "Full Stack Developer",
    company: "Uniksquare Technology",
    location: "Bhubaneswar, Odisha",
    period: "2025 — 2026",
    description:
      "Worked across frontend and backend development to build, enhance, and maintain full-stack web applications, with a focus on scalable UI, API integration, and production-ready solutions.",
    achievements: [
      "Developed full-stack web applications using React, TypeScript, Tailwind CSS, Node.js, and REST APIs.",
      "Integrated frontend applications with backend services and APIs, handled application data, and implemented functional business features.",
      "Worked on website development, maintenance, debugging, performance improvements, and production issue resolution using Git and WordPress."
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "Node.js",
      "Git",
      "WordPress"
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    name: "Rakesh Mohanty",
    role: "Owner",
    company: "Digital Marketing Expert Rakesh",
    avatar: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnA5kvT1rbuFqurW0H0kH2QMiNpZu5e8tWvS8vGgqshUoWMyRakxN9LAKJX205mcUCDh9hB1-RZM4W2LoR94rUX3acg-VVVF0NgchBFPCJAn7lbbVf4QFOzus78BeSsubQG5xM2=s680-w680-h510-rw",
    quote: "Saroj is one of the rare full-stack developers who doesn't just write clean code — he truly understands product design, user psychology, and performance engineering. Our platform's speed and conversion jumped immediately after his overhaul.",
    relationship: "Collaborated on Nexus AI Workspace"
  },
  {
    id: "test-2",
    name: "Atul Chandra Dash",
    role: "CEO",
    company: "Atollexports",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhCh780N9jBEGnHd3Ui4NgrZtFTwzX3zLaVCacY6RJS2_O7Y3xwRFAR0lc&s=10",
    quote: "Working with Saroj felt effortless. His proficiency with Three.js and Next.js allowed us to build an industry-first 3D luxury store that loads in milliseconds. He hits deadlines consistently and communicates with crystal clarity.",
    relationship: "Client on Aetheria Commerce"
  },
  {
    id: "test-3",
    name: "Nirmalya Behera",
    role: "Co-Founder & Director",
    company: "Gargi Treasure",
    avatar: "/assets/GT-transparent-logo.png",
    quote: "Every single interaction Saroj touches feels deliberate and polished. He takes complex Figma design specs and turns them into living, breathing web experiences with mathematical precision.",
    relationship: "Agency Partner on Interactive UI Builds"
  }
];

export const GITHUB_MOCK_ACTIVITY = {
  totalContributions: 1482,
  currentStreak: 47,
  longestStreak: 112,
  contributionsByLevel: [
    // 52 weeks x 7 days will be dynamically simulated with realistic developer cadence
  ],
  pinnedRepos: [
    {
      name: "nexus-ai-workspace",
      description: "Autonomous multi-agent intelligence workspace with real-time streaming canvas.",
      language: "TypeScript",
      stars: 342,
      forks: 48,
      url: "https://github.com/yourusername/nexus-ai-workspace"
    },
    {
      name: "threejs-shader-forge",
      description: "Curated collection of high-performance WebGL shaders and procedural noise tools.",
      language: "GLSL / TypeScript",
      stars: 810,
      forks: 94,
      url: "https://github.com/yourusername/threejs-shader-forge"
    },
    {
      name: "next-saas-ultrastack",
      description: "Production-ready enterprise Next.js 15 starter with auth, billing, and edge caching.",
      language: "TypeScript",
      stars: 1240,
      forks: 185,
      url: "https://github.com/yourusername/next-saas-ultrastack"
    }
  ]
};
