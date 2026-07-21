export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface Challenge {
  icon: string
  title: string
  description: string
}

export interface MockupImage {
  src: string
  label?: string
  large?: boolean
}

/**
 * Captured screenshots of the real product, shown in device frames so visitors can
 * explore the design without leaving the site. These are snapshots, not a live embed —
 * re-run the capture script whenever the live design changes.
 */
export interface Showcase {
  /** Full-page desktop capture, taken at 1440px wide. */
  desktop: string
  /** Full-page mobile capture, taken at 390px wide. */
  mobile: string
  /** Hostname rendered in the mock browser address bar. */
  siteLabel: string
}

export interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  tags: string[]
  category: string
  type: string
  timeline: string
  stats: { value: string; label: string }[]
  heroImage: string
  overviewDescription: string
  skills: string[]
  challengeIntro: string
  challenges: Challenge[]
  processTitle: string
  processSubtitle: string
  processSteps: ProcessStep[]
  mockupsTitle: string
  mockups: MockupImage[]
  prevProject?: { slug: string; name: string }
  nextProject?: { slug: string; name: string }
  liveUrl?: string
  /** When present, the "View Live Product" button opens an in-site showcase instead of a new tab. */
  showcase?: Showcase
  /** When present, the hero h1 renders these as separate lines instead of project.name. */
  heroTitleLines?: [string, string]
  portfolioImage: string
  portfolioCategory: string
  portfolioDate: string
  portfolioTag: string
}

const PROJECTS: Project[] = [
  {
    slug: 'darsly',
    name: 'Darsly',
    tagline: 'A modern educational platform designed to simplify online learning, course management, and student engagement.',
    description: 'A modern educational platform designed to simplify online learning, course management, and student engagement.',
    tags: ['Edtech', 'SaaS', '24+ Users'],
    category: 'Education / EdTech',
    type: 'Web Platform',
    timeline: '6–12 Weeks',
    stats: [
      { value: '03', label: 'Projects Led' },
      { value: '8+', label: 'Courses Built' },
      { value: '100%', label: 'Satisfaction' },
      { value: '4.9★', label: 'App Rating' },
    ],
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
    overviewDescription:
      'Darsly is a next-generation digital platform built to help students, teachers, and administrators manage the learning process in one place. It lets learners access courses, track progress, manage lessons, submit assignments, and connect with their educators.',
    skills: [
      'UI/UX Design',
      'Frontend Development',
      'Backend Development',
      'React / React Native',
      'UX Management',
      'Content Management System',
    ],
    challengeIntro:
      'Education is one of the most complex sectors to digitize. Students, courses, and instructors were spread across multiple disconnected tools, leading to friction and poor retention.',
    challenges: [
      {
        icon: 'users',
        title: 'Manual Student Management',
        description: 'Tracking students manually led to confusion, missed assignments, and duplicated efforts across departments.',
      },
      {
        icon: 'book-open',
        title: 'No Centralized Course System',
        description: 'Courses were scattered and instructors had no unified platform to host, update, or monitor course materials.',
      },
      {
        icon: 'bar-chart-2',
        title: 'Poor Progress Tracking',
        description: 'There was no reliable way to track student completion rates, quiz scores, or engagement in real time.',
      },
      {
        icon: 'message-circle',
        title: 'Complicated Communication',
        description: 'Students and teachers relied on email threads and third-party tools, causing delays and lost context.',
      },
    ],
    processTitle: 'How we built Darsly.',
    processSubtitle:
      'We followed a structured discovery-to-launch process — from mapping the problems. We built the platform forward from there.',
    processSteps: [
      {
        number: '01',
        title: 'Research',
        description: 'Stakeholder interviews, review of existing tools, and competitor analysis to understand real user pain points with the EdTech space.',
      },
      {
        number: '02',
        title: 'UX Structure',
        description: 'User flows, page architecture, and site maps for student, instructor, and admin roles. We built a clear information architecture.',
      },
      {
        number: '03',
        title: 'UI Design',
        description: 'Design system creation, high-fidelity mockups of the interface including dashboard, course pages, and student profiles.',
      },
      {
        number: '04',
        title: 'Development',
        description: 'Frontend, backend, and database setup built with React, Node.js, and PostgreSQL — scalable and production-ready architecture.',
      },
      {
        number: '05',
        title: 'Testing',
        description: 'End-to-end test flows, identifying edge cases, performance benchmarks, and fixing accessibility and system issues.',
      },
      {
        number: '06',
        title: 'Launch',
        description: 'Deployment to production, onboarding setup, documentation, and preparation for the first wave of incoming users.',
      },
    ],
    mockupsTitle: 'A look inside the platform.',
    mockups: [
      {
        src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80',
        large: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
        label: 'Student Dashboard',
      },
      {
        src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
        label: 'Course Page',
      },
    ],
    prevProject: { slug: 'sonicmeditate', name: 'SonicMeditate' },
    nextProject: { slug: 'nextway', name: 'NextWay App' },
    liveUrl: 'https://darsly.uz/ru',
    showcase: {
      desktop: '/showcase/darsly-desktop.webp',
      mobile: '/showcase/darsly-mobile.jpg',
      siteLabel: 'darsly.uz',
    },
    portfolioImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
    portfolioCategory: 'Education / EdTech',
    portfolioDate: 'Nov 2024',
    portfolioTag: 'SaaS',
  },
  {
    slug: 'sonicmeditate',
    name: 'SonicMeditate',
    tagline: 'A mindful sound experience app that guides users through meditation with AI-generated soundscapes and structured sessions.',
    description: 'A mindful sound experience app that guides users through meditation with AI-generated soundscapes and structured sessions.',
    tags: ['Mobile', 'Wellness', 'AI Audio'],
    category: 'Mobile / Wellness',
    type: 'Mobile App',
    timeline: '8–10 Weeks',
    stats: [
      { value: '12K+', label: 'Active Users' },
      { value: '4.8★', label: 'App Store' },
      { value: '96%', label: 'Retention' },
      { value: '200+', label: 'Sessions' },
    ],
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80',
    overviewDescription:
      'SonicMeditate is a cross-platform mobile app that delivers structured meditation sessions backed by AI-generated soundscapes. Users can select session length, mood, and focus area — and receive a fully tailored audio meditation experience.',
    skills: [
      'Mobile UI/UX Design',
      'React Native',
      'AI Audio Integration',
      'Motion Design',
      'App Store Optimization',
      'User Research',
    ],
    challengeIntro:
      'Meditation apps exist in an overcrowded market. The challenge was to build something that felt genuinely different — calm, intelligent, and personally responsive to each user.',
    challenges: [
      {
        icon: 'sliders-horizontal',
        title: 'Generic One-Size Sessions',
        description: 'Existing apps served static sessions with no personalization, leading to low engagement after the first week.',
      },
      {
        icon: 'music',
        title: 'Poor Audio Quality',
        description: 'Most competitors used royalty-free loops that felt repetitive and broke immersion during longer sessions.',
      },
      {
        icon: 'layers',
        title: 'Cluttered Interfaces',
        description: 'The abundance of menus, settings, and categories in competing apps created cognitive load right before meditation.',
      },
      {
        icon: 'timer',
        title: 'Inconsistent Habit Building',
        description: 'No smart reminders or streak systems to maintain consistent daily practice for most users.',
      },
    ],
    processTitle: 'How we built SonicMeditate.',
    processSubtitle:
      'Calm was non-negotiable. Every design and development decision was measured against whether it reduced friction and encouraged stillness.',
    processSteps: [
      { number: '01', title: 'Research', description: 'Competitor analysis, user interviews with regular meditators, and content audits across 12 wellness apps.' },
      { number: '02', title: 'Concept', description: 'Defining the minimal-UI philosophy — one screen at a time, gesture-driven navigation, and no visible distractions.' },
      { number: '03', title: 'UI Design', description: 'Full design system built around stillness: muted palettes, generous spacing, and motion that breathes.' },
      { number: '04', title: 'Audio Engine', description: 'Integration of AI-generated soundscape pipeline, layered ambience, and session-responsive binaural audio.' },
      { number: '05', title: 'Build & Test', description: 'React Native development, real-device testing across 8 device profiles, and accessibility review.' },
      { number: '06', title: 'Launch', description: 'App Store and Play Store submissions, onboarding flow, push notification setup, and first cohort activation.' },
    ],
    mockupsTitle: 'Calm, by design.',
    mockups: [
      { src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1400&q=80', large: true },
      { src: 'https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=800&q=80', label: 'Session Screen' },
      { src: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=800&q=80', label: 'Sound Library' },
    ],
    prevProject: undefined,
    nextProject: { slug: 'darsly', name: 'Darsly' },
    portfolioImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80',
    portfolioCategory: 'Wellness / Mobile',
    portfolioDate: 'Sep 2024',
    portfolioTag: 'Mobile',
  },
  {
    slug: 'nextway',
    name: 'NextWay App',
    tagline: 'A real-time navigation and route planning app built for urban commuters who need smarter, faster, and cleaner directions.',
    description: 'A real-time navigation and route planning app built for urban commuters who need smarter, faster, and cleaner directions.',
    tags: ['Mobile', 'Maps', 'SaaS'],
    category: 'Navigation / Mobile',
    type: 'Mobile App',
    timeline: '10–14 Weeks',
    stats: [
      { value: '30K+', label: 'Daily Routes' },
      { value: '98%', label: 'Accuracy' },
      { value: '4.7★', label: 'Rating' },
      { value: '3s', label: 'Avg Load' },
    ],
    heroImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80',
    overviewDescription:
      'NextWay is an urban navigation app designed for daily commuters. It aggregates public transit, ride-share, and walking data to generate optimized multi-modal routes with real-time delay alerts and crowd intelligence.',
    skills: [
      'Mobile UI/UX Design',
      'React Native',
      'Maps API Integration',
      'Real-Time Data',
      'Performance Engineering',
      'User Testing',
    ],
    challengeIntro:
      'Urban commuters are overwhelmed with fragmented transit data. Most navigation apps treat the city as a static map — NextWay needed to treat it as a living system.',
    challenges: [
      {
        icon: 'map',
        title: 'Fragmented Transit Data',
        description: 'No single source combined metro, bus, ride-share, and bike data into unified, reliable route options.',
      },
      {
        icon: 'zap',
        title: 'Slow Route Recalculation',
        description: 'When delays occur, competing apps took 5–8 seconds to reroute. Users needed instant alternatives.',
      },
      {
        icon: 'wifi-off',
        title: 'Poor Offline Support',
        description: 'Most navigation apps fail in low-connectivity areas like underground metros or tunnels.',
      },
      {
        icon: 'eye-off',
        title: 'Cluttered Map UI',
        description: 'Too much information at once made maps feel overwhelming, especially during complex multi-leg journeys.',
      },
    ],
    processTitle: 'How we built NextWay.',
    processSubtitle:
      'Speed and clarity were the two pillars. We designed for the person who has 30 seconds to decide which platform to run to.',
    processSteps: [
      { number: '01', title: 'Discovery', description: 'Shadowing commuters in 3 cities, mapping pain points across transit systems, and auditing 6 competitor apps.' },
      { number: '02', title: 'Architecture', description: 'Designing the multi-modal data aggregation layer, caching strategy, and offline-first routing logic.' },
      { number: '03', title: 'UI Design', description: 'Minimal map interface, progressive disclosure of route details, and color-coded transport modes.' },
      { number: '04', title: 'Development', description: 'Native map rendering, transit API integrations, real-time websocket connections for live delay data.' },
      { number: '05', title: 'QA & Performance', description: 'Load testing at peak commuter hours, sub-2s route recalculation benchmarks, and accessibility audit.' },
      { number: '06', title: 'Launch', description: 'Staged city rollout, onboarding flow with commute setup wizard, and feedback collection pipeline.' },
    ],
    mockupsTitle: 'Navigate smarter.',
    mockups: [
      { src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1400&q=80', large: true },
      { src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80', label: 'Route View' },
      { src: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=800&q=80', label: 'Live Alerts' },
    ],
    prevProject: { slug: 'darsly', name: 'Darsly' },
    nextProject: { slug: 'education-platform', name: 'Education Platform' },
    portfolioImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80',
    portfolioCategory: 'Navigation / Mobile',
    portfolioDate: 'Jan 2025',
    portfolioTag: 'Mobile',
  },
  {
    slug: 'education-platform',
    name: 'Education Platform',
    tagline: 'A full-featured e-commerce learning platform connecting students with premium courses and digital resources.',
    description: 'A full-featured e-commerce learning platform connecting students with premium courses and digital resources.',
    tags: ['E-Commerce', 'EdTech', 'Web'],
    category: 'E-Commerce / EdTech',
    type: 'Web Platform',
    timeline: '8–12 Weeks',
    stats: [
      { value: '5K+', label: 'Students' },
      { value: '120+', label: 'Courses' },
      { value: '98%', label: 'Satisfaction' },
      { value: '4.8★', label: 'Rating' },
    ],
    heroImage: 'https://images.unsplash.com/photo-1767449280971-46e438b1ce4a?w=1200&q=80',
    overviewDescription:
      'The Education Platform is a comprehensive e-commerce solution for digital learning. It lets instructors publish and sell courses while giving students a seamless browsing, purchasing, and learning experience — all in one place.',
    skills: [
      'UI/UX Design',
      'Frontend Development',
      'E-Commerce Integration',
      'Payment Gateway',
      'Content Management',
      'SEO Optimization',
    ],
    challengeIntro:
      'Combining education and e-commerce in one product is a balancing act. The checkout experience had to feel as smooth as any retail site, while the learning experience had to feel structured and motivating.',
    challenges: [
      {
        icon: 'shopping-cart',
        title: 'Friction at Checkout',
        description: 'Students abandoned carts frequently due to complex multi-step checkout flows and limited payment options.',
      },
      {
        icon: 'play-circle',
        title: 'No Unified Course Player',
        description: 'Video lessons, PDFs, and quizzes lived in separate tools with no single cohesive learning interface.',
      },
      {
        icon: 'trending-down',
        title: 'No Instructor Analytics',
        description: 'Instructors had no visibility into how students engaged with their content or where they dropped off.',
      },
      {
        icon: 'shield-off',
        title: 'Weak Access Control',
        description: 'Purchased courses were not properly gated, allowing content sharing and revenue leakage.',
      },
    ],
    processTitle: 'How we built the platform.',
    processSubtitle:
      'We merged e-commerce best practices with learning science — every design decision was tested against both conversion and comprehension goals.',
    processSteps: [
      { number: '01', title: 'Discovery', description: 'Interviews with 20+ instructors and students to map friction points across the purchase and learning journey.' },
      { number: '02', title: 'Architecture', description: 'Designed the course catalogue, user role system (student, instructor, admin), and payment integration architecture.' },
      { number: '03', title: 'UI Design', description: 'Built a clean, conversion-optimised storefront and a distraction-free course player with progress tracking.' },
      { number: '04', title: 'Development', description: 'Full-stack build with Next.js, Stripe for payments, and a custom video player with DRM for content protection.' },
      { number: '05', title: 'QA & Testing', description: 'End-to-end purchase flow testing, access control verification, cross-browser and mobile QA pass.' },
      { number: '06', title: 'Launch', description: 'Phased rollout with first 10 instructors, live analytics dashboard, and onboarding documentation.' },
    ],
    mockupsTitle: 'Learning, beautifully delivered.',
    mockups: [
      { src: 'https://images.unsplash.com/photo-1767449280971-46e438b1ce4a?w=1400&q=80', large: true },
      { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', label: 'Course Page' },
      { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80', label: 'Student Dashboard' },
    ],
    prevProject: { slug: 'nextway', name: 'NextWay App' },
    nextProject: { slug: 'healthcare-website', name: 'Healthcare Website' },
    liveUrl: 'https://darsly.uz/en/partners',
    showcase: {
      desktop: '/showcase/education-platform-desktop.webp',
      mobile: '/showcase/education-platform-mobile.jpg',
      siteLabel: 'darsly.uz/en/partners',
    },
    portfolioImage: 'https://images.unsplash.com/photo-1767449280971-46e438b1ce4a?w=1200&q=80',
    portfolioCategory: 'E-Commerce / EdTech',
    portfolioDate: 'Sep 2024',
    portfolioTag: 'E-Com',
  },
  {
    slug: 'healthcare-website',
    name: 'Healthcare Website',
    tagline: 'A trust-first healthcare web presence designed to convert patient inquiries into booked appointments.',
    description: 'A trust-first healthcare web presence designed to convert patient inquiries into booked appointments.',
    tags: ['Healthcare', 'Web', 'UX'],
    category: 'Healthcare',
    type: 'Marketing Website',
    timeline: '4–6 Weeks',
    stats: [
      { value: '3×', label: 'More Bookings' },
      { value: '60%', label: 'Lower Bounce' },
      { value: '99%', label: 'Uptime' },
      { value: '4.9★', label: 'Patient Rating' },
    ],
    heroImage: 'https://images.unsplash.com/photo-1613191413911-1032184f4035?w=1200&q=80',
    overviewDescription:
      'The Healthcare Website was redesigned from the ground up to establish trust with prospective patients and streamline the path to booking. The result is a clean, accessible, and HIPAA-aware web presence that works as hard as the clinical team behind it.',
    skills: [
      'UX Research',
      'Web Design',
      'Accessibility (WCAG)',
      'Frontend Development',
      'Performance Optimization',
      'CMS Integration',
    ],
    challengeIntro:
      'Healthcare websites carry the highest stakes of any content category. A confusing layout or slow load time does not just cost a conversion — it can cost a patient the care they need.',
    challenges: [
      {
        icon: 'palette',
        title: 'Outdated Visual Identity',
        description: 'The existing site looked clinical and cold, eroding patient trust before they even read the first sentence.',
      },
      {
        icon: 'calendar',
        title: 'Broken Booking Flow',
        description: 'Appointment booking required 7+ steps and a phone call, causing most patients to abandon and go elsewhere.',
      },
      {
        icon: 'eye',
        title: 'Accessibility Gaps',
        description: 'The previous site failed WCAG 2.1 AA on contrast, keyboard navigation, and screen reader compatibility.',
      },
      {
        icon: 'gauge',
        title: 'Poor Page Speed',
        description: 'Mobile load times averaged 8 seconds, violating Google Core Web Vitals and losing organic traffic.',
      },
    ],
    processTitle: 'How we built it.',
    processSubtitle:
      'Every decision was measured against two questions: does it build trust, and does it remove friction? Nothing else made it in.',
    processSteps: [
      { number: '01', title: 'Audit', description: 'Full accessibility, performance, and conversion audit of the existing site against WCAG 2.1 and Core Web Vitals.' },
      { number: '02', title: 'Strategy', description: 'Content hierarchy redesign — mapping what patients need to see first, second, and what drives them to book.' },
      { number: '03', title: 'UI Design', description: 'Warm, approachable design system with accessible color ratios, readable typography, and calming imagery.' },
      { number: '04', title: 'Development', description: 'Next.js static site with inline booking widget integration, lazy-loaded images, and perfect Lighthouse scores.' },
      { number: '05', title: 'Accessibility QA', description: 'Manual screen reader testing with NVDA and VoiceOver, keyboard-only navigation pass, and contrast verification.' },
      { number: '06', title: 'Launch', description: 'Zero-downtime deployment, Google Search Console setup, and staff training on the new CMS.' },
    ],
    mockupsTitle: 'Care, communicated clearly.',
    mockups: [
      { src: 'https://images.unsplash.com/photo-1613191413911-1032184f4035?w=1400&q=80', large: true },
      { src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80', label: 'Services Page' },
      { src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', label: 'Booking Flow' },
    ],
    prevProject: { slug: 'education-platform', name: 'Education Platform' },
    nextProject: { slug: 'mobile-application', name: 'Mobile Application' },
    liveUrl: 'https://nanomedicalclinic.com/',
    portfolioImage: 'https://images.unsplash.com/photo-1613191413911-1032184f4035?w=1200&q=80',
    portfolioCategory: 'Healthcare',
    portfolioDate: 'Feb 2025',
    portfolioTag: 'Web',
  },
  {
    slug: 'mobile-application',
    name: 'Mobile Application',
    tagline: 'A high-performance cross-platform mobile app with a premium UI and real-time data capabilities.',
    description: 'A high-performance cross-platform mobile app with a premium UI and real-time data capabilities.',
    tags: ['Mobile', 'React Native', 'Real-Time'],
    category: 'Mobile App',
    type: 'Mobile App',
    timeline: '10–14 Weeks',
    stats: [
      { value: '50K+', label: 'Downloads' },
      { value: '4.7★', label: 'App Store' },
      { value: '85%', label: 'D30 Retention' },
      { value: '<2s', label: 'Load Time' },
    ],
    heroImage: 'https://images.unsplash.com/photo-1700667282848-994df515c0d7?w=1200&q=80',
    overviewDescription:
      'This mobile application was built for speed and delight. Combining real-time data sync, smooth 60fps animations, and a premium design system, it raises the bar for what a cross-platform mobile product can feel like on both iOS and Android.',
    skills: [
      'Mobile UI/UX Design',
      'React Native',
      'Real-Time Data Sync',
      'Push Notifications',
      'Performance Engineering',
      'App Store Optimization',
    ],
    challengeIntro:
      'The client needed a mobile product that felt truly native — not a wrapped website. Every interaction needed to be fast, responsive, and satisfying, with live data that never felt stale.',
    challenges: [
      {
        icon: 'gauge',
        title: 'Sluggish Competitors',
        description: 'Existing solutions in the category loaded slowly and felt unresponsive, training users to have low expectations.',
      },
      {
        icon: 'refresh-cw',
        title: 'Stale Data Problem',
        description: 'Users needed live updates without manually refreshing — a pull-to-refresh pattern was no longer acceptable.',
      },
      {
        icon: 'paintbrush',
        title: 'Generic Visual Design',
        description: 'Most mobile apps in the category used default components with no visual identity or differentiation.',
      },
      {
        icon: 'smartphone',
        title: 'Poor Onboarding',
        description: 'First-session drop-off was high because onboarding was complex and failed to demonstrate core value quickly.',
      },
    ],
    processTitle: 'How we built the app.',
    processSubtitle:
      'Performance was non-negotiable. We profiled every screen, eliminated every jank, and only shipped when it felt native.',
    processSteps: [
      { number: '01', title: 'Research', description: 'Competitive teardowns, user interviews, and session recording analysis to define what "premium" means in this category.' },
      { number: '02', title: 'Prototyping', description: 'Interactive Figma prototype validated with real users before a single line of code was written.' },
      { number: '03', title: 'Design System', description: 'Custom component library for React Native: tokens, animations, haptics, and dark/light mode support.' },
      { number: '04', title: 'Development', description: 'React Native build with WebSocket real-time sync, optimistic UI updates, and Hermes JS engine tuning.' },
      { number: '05', title: 'Performance QA', description: 'Profiling with Flipper, 60fps animation audit, memory leak checks, and cold-start time optimization.' },
      { number: '06', title: 'Launch', description: 'App Store and Google Play submission, ASO keyword research, push notification setup, and day-one monitoring.' },
    ],
    mockupsTitle: 'Native feel, everywhere.',
    mockups: [
      { src: 'https://images.unsplash.com/photo-1700667282848-994df515c0d7?w=1400&q=80', large: true },
      { src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80', label: 'Home Screen' },
      { src: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80', label: 'Detail View' },
    ],
    prevProject: { slug: 'healthcare-website', name: 'Healthcare Website' },
    nextProject: { slug: 'brand-identity', name: 'Brand Identity System' },
    // No live site yet — CaseStudyPage hides the button when liveUrl is absent.
    portfolioImage: 'https://images.unsplash.com/photo-1700667282848-994df515c0d7?w=1200&q=80',
    portfolioCategory: 'Mobile App',
    portfolioDate: 'Apr 2025',
    portfolioTag: 'Mobile',
  },
  {
    slug: 'brand-identity',
    name: 'Brand Identity System',
    heroTitleLines: ['Brand Identity', 'System'],
    tagline: 'A complete visual identity built from scratch — logo, typography, color, and a full brand guidelines document.',
    description: 'A complete visual identity built from scratch — logo, typography, color, and a full brand guidelines document.',
    tags: ['Branding', 'Design', 'Identity'],
    category: 'Brand Design',
    type: 'Brand Identity',
    timeline: '3–5 Weeks',
    stats: [
      { value: '100%', label: 'Brand Refresh' },
      { value: '40+', label: 'Assets' },
      { value: '3', label: 'Concepts' },
      { value: '1', label: 'Winner' },
    ],
    heroImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    overviewDescription:
      'This brand identity project delivered a complete visual system — from initial strategy through final assets. The client received a logo suite, typography pairing, color palette, icon set, and a living brand guidelines document ready for their design and marketing teams.',
    skills: [
      'Brand Strategy',
      'Logo Design',
      'Typography',
      'Color Theory',
      'Brand Guidelines',
      'Asset Production',
    ],
    challengeIntro:
      'The client had grown rapidly but still looked like a startup. Their visuals were inconsistent across channels — the brand needed to grow up without losing the personality that made them distinct.',
    challenges: [
      {
        icon: 'layout-grid',
        title: 'Inconsistent Visual Voice',
        description: 'Social media, pitch decks, and the website all looked like they came from different companies.',
      },
      {
        icon: 'type',
        title: 'No Typography System',
        description: 'Mixed font choices across touchpoints created visual noise and signalled lack of polish to enterprise buyers.',
      },
      {
        icon: 'palette',
        title: 'Undefined Color Palette',
        description: 'Different shades of the "brand color" appeared across materials with no documented standards.',
      },
      {
        icon: 'ruler',
        title: 'No Logo Variants',
        description: 'A single logo file was stretched, recolored, and misused across formats with no guidelines to prevent it.',
      },
    ],
    processTitle: 'How we built the brand.',
    processSubtitle:
      'Good brand design is 70% strategy. We spent the first half of the project understanding who they are before drawing a single mark.',
    processSteps: [
      { number: '01', title: 'Discovery', description: 'Brand workshops with leadership to define personality, positioning, target audience, and competitive differentiation.' },
      { number: '02', title: 'Moodboarding', description: 'Three distinct visual directions presented — each with a clear strategic rationale and emotional tone.' },
      { number: '03', title: 'Logo Design', description: 'From sketches to refined vector marks: primary logo, wordmark, icon, and lockup variations.' },
      { number: '04', title: 'System Design', description: 'Typography scale, color palette with accessible ratios, iconography style, and photography direction.' },
      { number: '05', title: 'Guidelines', description: 'A comprehensive brand guidelines PDF and Figma library covering every use case, do, and don\'t.' },
      { number: '06', title: 'Handoff', description: 'Full asset package in AI, SVG, PNG, and PDF formats, plus a team walkthrough and Q&A session.' },
    ],
    mockupsTitle: 'A system, not just a logo.',
    mockups: [
      { src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&q=80', large: true },
      { src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80', label: 'Color System' },
      { src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80', label: 'Brand in Use' },
    ],
    prevProject: { slug: 'mobile-application', name: 'Mobile Application' },
    nextProject: { slug: 'ai-workflow-platform', name: 'AI Workflow Platform' },
    portfolioImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    portfolioCategory: 'Brand Design',
    portfolioDate: 'Dec 2024',
    portfolioTag: 'Branding',
  },

  /*
   * TODO(content): The three projects below back the remaining "Our Work" cards.
   * Every narrative field and every figure in `stats` is placeholder copy written
   * to fill the case-study layout — none of it is verified. Replace with real
   * project data before this goes to production. `liveUrl` values are confirmed.
   */
  {
    slug: 'ai-workflow-platform',
    name: 'AI Workflow Platform',
    tagline: 'An AI-native workspace that turns repetitive business processes into automated, reviewable workflows.',
    description: 'An AI-native workspace that turns repetitive business processes into automated, reviewable workflows.',
    tags: ['SaaS', 'AI', 'Automation'],
    category: 'SaaS Platform',
    type: 'Web Platform',
    timeline: '12–16 Weeks',
    stats: [
      { value: '10×', label: 'Faster Cycles' },
      { value: '40+', label: 'Integrations' },
      { value: '99.9%', label: 'Uptime' },
      { value: '<1s', label: 'Step Latency' },
    ],
    heroImage: 'https://images.unsplash.com/photo-1707332287886-84315bbb04bb?w=1200&q=80',
    overviewDescription:
      'The AI Workflow Platform lets teams describe a process once and hand the repetitive parts to AI. Each workflow is composed of steps that can be automated, reviewed by a human, or branched conditionally — with a full audit trail of every decision the model made.',
    skills: [
      'Product Design',
      'Frontend Development',
      'Backend Development',
      'LLM Orchestration',
      'Workflow Engine',
      'Observability',
    ],
    challengeIntro:
      'Automation tools ask teams to choose between rigid rule builders and unpredictable AI. The platform had to deliver the reliability of the former with the flexibility of the latter.',
    challenges: [
      {
        icon: 'repeat',
        title: 'Repetitive Manual Work',
        description: 'Teams re-ran the same multi-step process by hand every day, losing hours and introducing inconsistent results.',
      },
      {
        icon: 'unlink',
        title: 'Disconnected Tools',
        description: 'Data had to be copied between systems manually because nothing spoke to anything else across the stack.',
      },
      {
        icon: 'file-search',
        title: 'No Audit Trail',
        description: 'When an automated step produced a wrong result, there was no way to trace which input or model decision caused it.',
      },
      {
        icon: 'toggle-left',
        title: 'All-or-Nothing Automation',
        description: 'Existing tools forced full automation or none, with no way to keep a human reviewer in the loop on risky steps.',
      },
    ],
    processTitle: 'How we built the platform.',
    processSubtitle:
      'We treated trust as the core feature. Every automated step had to be inspectable, reversible, and explainable before we shipped it.',
    processSteps: [
      { number: '01', title: 'Discovery', description: 'Mapped real operational processes with the client team to find which steps were safe to automate and which needed review.' },
      { number: '02', title: 'Architecture', description: 'Designed the workflow engine, step execution model, retry semantics, and the audit log that records every model call.' },
      { number: '03', title: 'UI Design', description: 'Built a canvas for composing workflows, plus a review queue where humans approve or correct AI output inline.' },
      { number: '04', title: 'Development', description: 'Full-stack build with a queue-backed execution engine, provider-agnostic LLM layer, and typed integration connectors.' },
      { number: '05', title: 'Evaluation', description: 'Golden-set testing on each automated step, latency budgets per node, and failure-mode review before enabling in production.' },
      { number: '06', title: 'Launch', description: 'Staged rollout behind feature flags, live monitoring dashboards, and onboarding for the first operations team.' },
    ],
    mockupsTitle: 'Automation you can audit.',
    mockups: [
      { src: 'https://images.unsplash.com/photo-1707332287886-84315bbb04bb?w=1400&q=80', large: true },
      { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', label: 'Workflow Canvas' },
      { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', label: 'Review Queue' },
    ],
    prevProject: { slug: 'brand-identity', name: 'Brand Identity System' },
    nextProject: { slug: 'logistics-management', name: 'Logistics Management' },
    // No live site yet — CaseStudyPage hides the button when liveUrl is absent.
    portfolioImage: 'https://images.unsplash.com/photo-1707332287886-84315bbb04bb?w=1200&q=80',
    portfolioCategory: 'SaaS Platform',
    portfolioDate: 'Jan 2025',
    portfolioTag: 'SaaS',
  },
  {
    slug: 'logistics-management',
    name: 'Logistics Management',
    tagline: 'A logistics operations platform that gives dispatchers a single live view of fleets, orders, and delivery status.',
    description: 'A logistics operations platform that gives dispatchers a single live view of fleets, orders, and delivery status.',
    tags: ['Web App', 'Logistics', 'Real-Time'],
    category: 'Web App',
    type: 'Web Platform',
    timeline: '10–14 Weeks',
    stats: [
      { value: '2×', label: 'Dispatch Speed' },
      { value: '100%', label: 'Order Visibility' },
      { value: '30%', label: 'Fewer Delays' },
      { value: '24/7', label: 'Live Tracking' },
    ],
    heroImage: 'https://images.unsplash.com/photo-1692384359344-42fd4a15603c?w=1200&q=80',
    overviewDescription:
      'Logistics Management replaces the spreadsheets and phone calls that most dispatch teams still run on. Orders, vehicles, drivers, and delivery status live in one real-time interface, so a dispatcher can see the state of the entire operation at a glance.',
    skills: [
      'UI/UX Design',
      'Frontend Development',
      'Backend Development',
      'Real-Time Data',
      'Mapping & Geolocation',
      'Role-Based Access',
    ],
    challengeIntro:
      'Dispatch is a real-time job run on tools that are not real-time. The platform had to surface the right information fast enough to act on, without overwhelming the operator.',
    challenges: [
      {
        icon: 'clipboard-list',
        title: 'Spreadsheet Operations',
        description: 'Orders and vehicle assignments were tracked in shared spreadsheets that went stale the moment anyone edited them.',
      },
      {
        icon: 'radio',
        title: 'No Live Vehicle Status',
        description: 'Dispatchers had to call drivers to learn where a shipment was, which cost time and produced unreliable answers.',
      },
      {
        icon: 'alert-triangle',
        title: 'Late Delay Detection',
        description: 'Delays surfaced only after a customer complained, leaving no window to reroute or notify anyone in advance.',
      },
      {
        icon: 'key',
        title: 'Flat Permissions',
        description: 'Everyone saw everything, so drivers, dispatchers, and managers shared one cluttered and risky view of the data.',
      },
    ],
    processTitle: 'How we built the system.',
    processSubtitle:
      'A dispatcher glances at the screen between phone calls. Every layout decision was tested against that five-second glance.',
    processSteps: [
      { number: '01', title: 'Discovery', description: 'Sat with dispatchers through live shifts to record what they check, in what order, and what they had to phone someone for.' },
      { number: '02', title: 'Architecture', description: 'Designed the order lifecycle, vehicle telemetry ingestion, and the role model separating driver, dispatcher, and manager.' },
      { number: '03', title: 'UI Design', description: 'A dense operations dashboard with map, order queue, and status columns readable at a glance without scrolling.' },
      { number: '04', title: 'Development', description: 'Full-stack build with websocket-driven live updates, map rendering, and an optimistic order-assignment flow.' },
      { number: '05', title: 'QA & Testing', description: 'Load testing against peak dispatch volume, offline and reconnect behaviour, and permission boundary verification.' },
      { number: '06', title: 'Launch', description: 'Rolled out to one depot first, ran both systems in parallel for two weeks, then migrated the remaining fleet.' },
    ],
    mockupsTitle: 'The whole operation, one screen.',
    mockups: [
      { src: 'https://images.unsplash.com/photo-1692384359344-42fd4a15603c?w=1400&q=80', large: true },
      { src: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80', label: 'Dispatch Board' },
      { src: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80', label: 'Fleet Map' },
    ],
    prevProject: { slug: 'ai-workflow-platform', name: 'AI Workflow Platform' },
    nextProject: { slug: 'real-estate-platform', name: 'Real Estate Platform' },
    liveUrl: 'https://softms.io/',
    showcase: {
      desktop: '/showcase/logistics-management-desktop.webp',
      mobile: '/showcase/logistics-management-mobile.jpg',
      siteLabel: 'softms.io',
    },
    portfolioImage: 'https://images.unsplash.com/photo-1692384359344-42fd4a15603c?w=1200&q=80',
    portfolioCategory: 'Web App',
    portfolioDate: 'Mar 2024',
    portfolioTag: 'Web',
  },
  {
    slug: 'real-estate-platform',
    name: 'UZAUTO Motors',
    tagline: 'A vehicle showroom platform built to turn browsing into qualified enquiries.',
    description: 'A vehicle showroom platform built to turn browsing into qualified enquiries.',
    tags: ['Website Design', 'Automotive', 'Web'],
    category: 'Website Design',
    type: 'Marketing Website',
    timeline: '6–8 Weeks',
    stats: [
      { value: '2×', label: 'More Enquiries' },
      { value: '45%', label: 'Lower Bounce' },
      { value: '90+', label: 'Lighthouse' },
      { value: '3s', label: 'Time to Interactive' },
    ],
    heroImage: '/showcase/real-estate-platform-desktop.webp',
    overviewDescription:
      'UZAUTO Motors presents a large vehicle catalogue without making it feel large. Filtering, comparison, and a media-rich detail view guide a visitor from casual browsing to a submitted enquiry in as few steps as possible.',
    skills: [
      'UX Research',
      'Web Design',
      'Frontend Development',
      'Search & Filtering',
      'Performance Optimization',
      'CMS Integration',
    ],
    challengeIntro:
      'A catalogue site lives or dies on how quickly a visitor can narrow it down. The old experience made people scroll instead of decide.',
    challenges: [
      {
        icon: 'filter',
        title: 'Unusable Filtering',
        description: 'Visitors could not narrow the catalogue by the attributes they actually cared about, so most gave up browsing.',
      },
      {
        icon: 'image',
        title: 'Weak Media Presentation',
        description: 'Low-resolution images in a cramped gallery failed to convey the quality of what was being sold.',
      },
      {
        icon: 'file-text',
        title: 'Buried Enquiry Form',
        description: 'The contact form sat at the bottom of a long page, so interested visitors rarely reached it before leaving.',
      },
      {
        icon: 'smartphone',
        title: 'Poor Mobile Layout',
        description: 'Most traffic arrived on mobile, where the desktop-first grid collapsed into an unreadable single column.',
      },
    ],
    processTitle: 'How we built it.',
    processSubtitle:
      'Every screen was judged on one question: does this move the visitor closer to an enquiry, or does it just look good?',
    processSteps: [
      { number: '01', title: 'Audit', description: 'Analysed traffic and drop-off on the existing catalogue to find where visitors abandoned the journey.' },
      { number: '02', title: 'Strategy', description: 'Defined the filter taxonomy and the information hierarchy of a listing detail page around what buyers ask first.' },
      { number: '03', title: 'UI Design', description: 'A media-forward design system with a responsive grid, comparison view, and a persistent enquiry call to action.' },
      { number: '04', title: 'Development', description: 'Next.js build with server-side filtering, responsive image pipeline, and a CMS the client team can update themselves.' },
      { number: '05', title: 'QA & Testing', description: 'Cross-browser and real-device mobile testing, Core Web Vitals tuning, and enquiry funnel verification end to end.' },
      { number: '06', title: 'Launch', description: 'Zero-downtime deployment with redirects from the old URLs, analytics instrumentation, and CMS training for the team.' },
    ],
    mockupsTitle: 'Browse less, decide faster.',
    mockups: [
      { src: 'https://images.unsplash.com/photo-1585164216355-cfe3ca9c961d?w=1400&q=80', large: true },
      { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', label: 'Catalogue Grid' },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', label: 'Listing Detail' },
    ],
    prevProject: { slug: 'logistics-management', name: 'Logistics Management' },
    nextProject: undefined,
    liveUrl: 'https://uzautomotors.com/',
    showcase: {
      desktop: '/showcase/real-estate-platform-desktop.webp',
      mobile: '/showcase/real-estate-platform-mobile.jpg',
      siteLabel: 'uzautomotors.com',
    },
    portfolioImage: 'https://images.unsplash.com/photo-1585164216355-cfe3ca9c961d?w=1200&q=80',
    portfolioCategory: 'Website Design',
    portfolioDate: 'Jun 2024',
    portfolioTag: 'Web',
  },
]

export function getAllProjects(): Project[] {
  return PROJECTS
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return PROJECTS.map((p) => p.slug)
}
