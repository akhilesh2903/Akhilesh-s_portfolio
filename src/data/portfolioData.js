// ============================================================
//  PORTFOLIO DATA — Single source of truth
//  Edit this file to update all content without touching components
// ============================================================

export const personalInfo = {
  name: "Akhilesh Bhat",
  tagline: "Computer Science / Information Science Engineering Student",
  subtitle: "Full-Stack Developer | AI & ML Enthusiast",
  bio: "Building intelligent digital experiences at the intersection of software engineering, AI, and immersive web technologies.",
  about: `I am Akhilesh Bhat, an engineering student pursuing Bachelor of Engineering at Alva's Institute of Engineering and Technology, with a strong interest in full-stack development, artificial intelligence, deep learning, and modern web technologies. I enjoy building practical digital products and experimenting with emerging technologies.`,
  email: "akhileshbhat13@gmail.com",
  phone: "+91 8618473440",
  location: "Moodbidri, Karnataka, India",
  availableForOpportunities: true, // Set to false to hide the availability badge
};

export const socialLinks = {
  linkedin: "https://linkedin.com/in/akhilesh292005",
  github: "https://github.com/akhilesh2903",
  leetcode: "https://leetcode.com/u/akhilesh2903",
  codechef: "https://codechef.com/users/akhilesh2903",
};

export const education = {
  degree: "Bachelor of Engineering",
  institution: "Alva's Institute of Engineering and Technology",
  duration: "2023 – 2027",
  cgpa: "8.86",
  cgpaMax: "10",
  coursework: [
    "Data Structures & Algorithms",
    "Operating Systems",
    "Database Management Systems",
    "Computer Networks",
  ],
};

export const skills = {
  Programming: ["Python", "Java", "JavaScript"],
  "Web Development": ["HTML5", "CSS3", "React.js", "Node.js", "Next.js"],
  Databases: ["MySQL", "MongoDB"],
  Tools: ["Git", "GitHub", "VS Code", "Figma", "FileZilla"],
  "Areas of Interest": [
    "Artificial Intelligence",
    "Deep Learning",
    "Medical Image Processing",
    "Generative AI",
    "Explainable AI",
    "Prompt Engineering",
    "REST APIs",
    "Full-Stack Development",
  ],
};

export const projects = [
  {
    id: "01",
    title: "Daily Stock Market Email Alerts System",
    shortTitle: "Stock Alerts",
    description:
      "Developed a Daily Stock Market Email Alerts System that automatically sends users personalized email updates about stock price movements and market trends. The React frontend provides user interaction while Node.js handles data processing and automation. SQL stores user preferences and stock details. The system fetches real-time market data and delivers customized email alerts.",
    tech: ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL"],
    github: "https://github.com/akhilesh2903",
    demo: null,
    type: "standard",
    visual: "stockmarket",
  },
  {
    id: "02",
    title: "Institutional Website Development & Deployment",
    shortTitle: "Institutional Websites",
    description:
      "Developed and managed multiple institutional websites including Alva's Institute of Engineering and Technology, Alva's Institute of Medical Sciences and Research Centre, Alva's Homeopathy, and Alva's Pragati Portal. Responsibilities included website development, UI improvements, responsive design, bug fixing, hosting, deployment, DNS configuration, and security configuration.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    github: "https://github.com/akhilesh2903",
    demo: null,
    type: "standard",
    institutions: [
      { name: "Alva's Institute of Engineering & Technology", url: "https://new.aiet.org.in", label: "new.aiet.org.in" },
      { name: "Alva's Institute of Medical Sciences & Research Centre", url: "https://aimsarc.org", label: "aimsarc.org" },
      { name: "Alva's Homeopathy", url: "https://alvashomoeopathy.com", label: "alvashomoeopathy.com" },
      { name: "Alva's Pragati Portal", url: "https://alvaspragati.com", label: "alvaspragati.com" },
    ],
    visual: "network",
  },
  {
    id: "03",
    title: "AI-Powered Ultrasound Analysis",
    shortTitle: "AI Ultrasound",
    description:
      "Developing a Deep Learning-based Ultrasound Image Analysis system for early detection of fetal growth abnormalities. The system integrates U-Net segmentation, CNN classification, Retrieval-Augmented Generation (RAG) for report generation, and Explainable AI for transparent clinical decision support.",
    tech: ["React", "Flask", "MongoDB", "Python", "U-Net", "CNN", "RAG", "XAI"],
    github: "https://github.com/akhilesh2903",
    demo: null,
    type: "featured",
    visual: "medical",
    highlights: [
      "U-Net Segmentation",
      "CNN Classification",
      "RAG Report Generation",
      "Explainable AI",
      "Medical Image Processing",
    ],
  },
];

export const experience = [
  {
    title: "Website Development & Deployment",
    organization: "Alva's Institute of Engineering and Technology",
    duration: "2023 – Present",
    responsibilities: [
      "Frontend development and UI responsiveness",
      "Bug resolution and performance optimisation",
      "Hosting and deployment management",
      "DNS configuration and security hardening",
      "Website maintenance and content updates",
      "Cross-browser compatibility testing",
    ],
  },
];

export const achievements = {
  certifications: {
    udemy: 10,
    coursera: 8,
    others: [
      "Google Cloud",
      "Infosys Springboard",
      "NPTEL",
    ],
    areas: [
      "Programming",
      "Full-Stack Development",
      "Artificial Intelligence",
      "Web Development",
      "Cloud Computing",
    ],
  },
  research: {
    title: "Review Paper on Generative AI",
    description:
      "Published a comprehensive review paper covering the landscape, applications, challenges, and future directions of Generative AI technologies.",
    status: "Published",
    link: "https://ijrpr.com/uploads/V5ISSUE12/IJRPR36575.pdf",
  },
};

export const currentlyBuilding = {
  mainProject: {
    title: "Deep Learning-based Ultrasound Image Analysis",
    status: "IN PROGRESS",
    progress: 60,
  },
  exploring: [
    "Deep Learning",
    "Medical Image Processing",
    "Explainable AI",
    "Generative AI",
    "Prompt Engineering",
    "REST APIs",
    "Database Management",
    "Scalable Web Applications",
  ],
};

export const codingProfiles = [
  {
    platform: "LinkedIn",
    handle: "akhilesh292005",
    url: socialLinks.linkedin,
    description: "Professional network & career updates",
    color: "#0A66C2",
  },
  {
    platform: "GitHub",
    handle: "akhilesh2903",
    url: socialLinks.github,
    description: "Open source projects & code repositories",
    color: "var(--white)",
  },
  {
    platform: "LeetCode",
    handle: "akhilesh2903",
    url: socialLinks.leetcode,
    description: "Algorithms, data structures & problem solving",
    color: "#FFA116",
  },
  {
    platform: "CodeChef",
    handle: "akhilesh2903",
    url: socialLinks.codechef,
    description: "Competitive programming & coding contests",
    color: "#5B4638",
  },
];
