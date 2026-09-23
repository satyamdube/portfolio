/**
 * Knowledge Base Chunks for the RAG Vector Database
 * Each chunk represents an indexed document containing targeted semantic context,
 * metadata tags, and authoritative answers about Satyam Dubey's career and skills.
 */

export const ragKnowledgeBase = [
  {
    id: "bio-overview",
    title: "Satyam Dubey - Executive Summary & Profile",
    tags: ["bio", "summary", "experience", "profile", "overview", "fullstack"],
    content: `Satyam Dubey is a Senior Frontend & Fullstack Developer with over 7 years of professional experience building scalable, high-performance web applications and enterprise platforms. Based in Noida, India, he has a proven track record of delivering 30–40% performance improvements across high-traffic platforms in banking, travel, hospitality, and edtech. His core stack covers React.js, Next.js (App Router, SSR, SSG), TypeScript, Node.js, Express.js/NestJS, REST & GraphQL APIs, MySQL, MongoDB, and Redis caching.`
  },
  {
    id: "contact-info",
    title: "Contact & Professional Links",
    tags: ["contact", "email", "phone", "linkedin", "github", "hire", "location"],
    content: `Satyam Dubey is located in Noida, India. Contact details:
- Email: satyamdubey9450@gmail.com
- Phone / WhatsApp: +91 8586864294
- LinkedIn: https://linkedin.com/in/satyam8586864294
- Portfolio: https://portfolio-satyam-dubey.vercel.app/
He is actively open for Senior Frontend Developer, Lead UI Engineer, Fullstack Architect, and Technical Lead opportunities.`
  },
  {
    id: "exp-neosoft",
    title: "Current Role: Senior Frontend Developer at Neosoft Technologies",
    tags: ["neosoft", "experience", "current", "react", "nextjs", "performance", "design system", "shopify", "headless", "hydrogen"],
    content: `At Neosoft Technologies Pvt. Ltd. (Noida, Feb 2024 – Present), Satyam serves as Senior Frontend Developer:
- Built responsive, accessible, and highly interactive UIs using React.js and Next.js, improving application performance by 30%+ through Core Web Vitals optimization (SSR, SSG, image optimization, dynamic imports, and caching).
- Integrated front-end components with internal and third-party services via RESTful APIs and GraphQL, implementing efficient client-side state management with Context API, Redux Toolkit, Zustand, and React Query.
- Built reusable, highly configurable component libraries using advanced React patterns (compound components, render props, slots) with Storybook, Radix UI, and Tailwind UI.
- Developed and optimized headless e-commerce storefronts using React, Next.js, and Shopify Hydrogen, connecting securely via the Shopify Storefront API (GraphQL) for cart/checkout, product catalogs, collections, customer accounts, and metafields.
- Implemented OAuth/OIDC-based identity provider integrations with Shopify, applying modern web security practices (Next-Auth/Auth.js, JWT, CORS).
- Deployed and managed applications on GCP Cloud Run with CI/CD pipelines, including deployments to Shopify Oxygen; integrated headless CMS platforms (Contentful, Strapi, Sanity), SQL/NoSQL databases, and Prisma ORM within Nx/Turborepo monorepos.`
  },
  {
    id: "exp-wenidi",
    title: "Experience: Senior Frontend Developer at Wenidi Technology",
    tags: ["wenidi", "experience", "react", "nextjs", "vue", "redux", "state management"],
    content: `At Wenidi Technology Pvt. Ltd. (Noida, Apr 2023 – Jan 2024), Satyam worked as Senior Frontend Developer:
- Built responsive, cross-platform enterprise applications utilizing React.js, Next.js, and Vue.js.
- Significantly enhanced user experience and UI performance across desktop, tablet, and mobile devices.
- Architected centralized, predictable state management using Redux Toolkit and React Context API.
- Implemented unit testing pipelines with Jest and React Testing Library to ensure high code quality and zero-regression deployments.`
  },
  {
    id: "exp-reddoorz",
    title: "Experience: Senior Frontend Developer at RedDoorz",
    tags: ["reddoorz", "experience", "travel", "booking", "high traffic", "microservices", "scale"],
    content: `At RedDoorz (Remote / On-site, Feb 2021 – Apr 2023), Satyam was Senior Frontend Developer:
- Built and scaled the customer-facing hotel booking platform UI serving millions of users across Southeast Asia.
- Increased user engagement and booking conversions through UI/UX optimization, micro-interactions, and checkout friction removal.
- Translated complex hospitality business requirements (real-time room availability, dynamic surge pricing, multi-currency support) into scalable, zero-latency React interfaces.
- Delivered production-ready React applications capable of sustaining intense flash-sale traffic spikes.`
  },
  {
    id: "exp-gingerwebs",
    title: "Experience: UI Developer at GingerWebs & Award",
    tags: ["gingerwebs", "experience", "award", "outstanding performer", "pdf", "html", "css", "javascript"],
    content: `At GingerWebs Pvt. Ltd. (Noida, Jan 2017 – Jan 2021), Satyam served as UI Developer:
- Honored with the 'Outstanding Performer Award' in 2020 for exceptional delivery on high-priority client deadlines and technical excellence.
- Developed responsive, accessible web pages using HTML5, CSS3, and JavaScript (ES6+).
- Designed dynamic PDF-based solutions, admit card generators, and certificate engines for large-scale examination systems.
- Ensured comprehensive cross-browser compatibility and optimized client websites for sub-second rendering.`
  },
  {
    id: "fullstack-skills",
    title: "Fullstack Skills: Frontend, Backend & APIs",
    tags: ["fullstack", "react", "nextjs", "nodejs", "express", "nestjs", "typescript", "rest", "graphql"],
    content: `Satyam's fullstack engineering capabilities include:
- Frontend: React.js, Next.js (App Router, Server Components, SSR, SSG), TypeScript, JavaScript (ES6+), Redux Toolkit, RTK Query, Vue.js, Tailwind CSS, SCSS, Jest, React Testing Library.
- Backend: Node.js, Express.js, NestJS, RESTful API architecture, GraphQL APIs, WebSockets, JWT / OAuth authentication, middleware design, robust error handling pipelines.`
  },
  {
    id: "system-architecture",
    title: "System Architecture & Next.js App Router",
    tags: ["architecture", "nextjs", "system design", "ssr", "microservices", "streaming", "scalability"],
    content: `Satyam specializes in modern web system architecture:
- Next.js App Router, React Server Components (RSC), and edge-rendered streaming SSR for sub-second Initial Server Response and Time to First Byte (TTFB).
- Decoupled API architecture with API gateways, load balancing, rate limiting, and circuit breakers.
- Reusable, scalable Design Systems and component libraries ensuring WCAG 2.1 AA accessibility and cross-brand consistency.
- Micro-frontend and modular frontend structures enabling independent deployments for enterprise teams.`
  },
  {
    id: "database-devops",
    title: "Databases, Caching & DevOps",
    tags: ["databases", "mysql", "mongodb", "redis", "docker", "caching", "devops", "cloud", "nginx"],
    content: `Satyam's data and infrastructure skills:
- Databases: MySQL (relational schema design, SQL joins, indexes, transaction management, query optimization) and MongoDB (document modeling, aggregation pipelines).
- Caching: Redis for session management, API response caching, and distributed rate limiting.
- DevOps: Docker containerization, Git / GitHub CI/CD automated deployment pipelines, Azure & AWS basics, Linux command line, Nginx reverse proxy, and NPM package ecosystem.`
  },
  {
    id: "project-axis-edge",
    title: "Featured Project: Axis Edge Travel & Rewards",
    tags: ["project", "axis edge", "banking", "travel", "traveledge.axis.bank.in", "performance", "api"],
    content: `Project: Axis Edge Travel & Rewards (URL: https://traveledge.axis.bank.in/)
- Domain: Enterprise Banking & Travel Loyalty Rewards.
- Satyam's Role: Lead Frontend Architecture & API Integration.
- Achievements:
  * Built scalable frontend modules handling high-volume flight and hotel reward redemptions for millions of Axis Bank cardholders.
  * Improved page load times and UI responsiveness by 35% through bundle splitting, asset compression, and memoized rendering.
  * Implemented strict banking security compliance with authenticated token refreshes and encrypted payloads.`
  },
  {
    id: "project-bcg-udaan",
    title: "Featured Project: BCG UDAAN (Punjab National Bank)",
    tags: ["project", "udaan", "pnb", "bcg", "banking", "udaan.pnb.bank.in", "accessibility", "design system"],
    content: `Project: BCG UDAAN Project for Punjab National Bank (URL: https://udaan.pnb.bank.in/)
- Domain: Strategic Digital Banking Transformation.
- Satyam's Role: Senior Frontend Engineer on BCG & PNB initiative.
- Achievements:
  * Collaborated with Boston Consulting Group (BCG) and PNB on core digital banking workflows.
  * Architected a unified, reusable React component design system enforcing strict brand guidelines and WCAG accessibility across nationwide branches.
  * Optimized multi-step credit, loan, and account onboarding forms for maximum data integrity and low latency.`
  },
  {
    id: "project-reddoorz",
    title: "Featured Project: RedDoorz Hospitality Platform",
    tags: ["project", "reddoorz", "hospitality", "booking", "reddoorz.com", "concurrency", "conversion"],
    content: `Project: RedDoorz Hotel Booking Engine (URL: https://www.reddoorz.com/)
- Domain: High-Traffic Hospitality & Travel Tech.
- Satyam's Role: Senior Frontend Developer.
- Achievements:
  * Developed the high-concurrency booking platform UI serving millions of active monthly users across Southeast Asia.
  * Implemented interactive map-based search with real-time room availability and instant room selection.
  * Optimized conversion funnels and localized multi-currency checkout, resulting in higher transaction completion rates.`
  },
  {
    id: "project-vernost-icuracao",
    title: "Featured Project: Vernost iCuracao Travel Portal",
    tags: ["project", "vernost", "icuracao", "travel.icuracao.com", "travel", "nextjs", "react"],
    content: `Project: Vernost iCuracao Travel Project (URL: https://travel.icuracao.com/)
- Domain: Caribbean Destination & Travel Portal.
- Satyam's Role: Senior Frontend Developer.
- Achievements:
  * Engineered responsive React.js / Next.js modules powering package customization, hotels, flights, and activities.
  * Ensured seamless cross-device mobile responsiveness and implemented client-side caching to reduce server API roundtrips.
  * Handled multi-currency pricing and real-time checkout validations.`
  },
  {
    id: "project-sbi-card",
    title: "Featured Project: SBI Card Digital Architecture",
    tags: ["project", "sbi card", "banking", "security", "components", "ux"],
    content: `Project: SBI Card Platform
- Domain: Credit Card Services & Financial Tech.
- Satyam's Role: Frontend Architect & Component Engineer.
- Achievements:
  * Designed reusable component architecture used across SBI Card digital services.
  * Integrated financial REST APIs with strict error boundaries and real-time feedback.
  * Reduced UI latency by 40% on heavy account statement views and rewards catalogs.`
  },
  {
    id: "project-thinkexam",
    title: "Featured Project: ThinkExam Assessment Engine",
    tags: ["project", "thinkexam", "thinkexam.com", "edtech", "anti cheat", "websockets", "pdf"],
    content: `Project: ThinkExam Platform (URL: https://www.thinkexam.com/)
- Domain: Large-Scale Online Examination & Assessment.
- Satyam's Role: UI & Assessment Engine Developer.
- Achievements:
  * Developed the responsive test-taking interface with zero-latency question navigation.
  * Implemented secure anti-cheat mechanisms and real-time timer sync via WebSockets and local storage fallbacks.
  * Engineered automated admit card and certificate PDF generation pipelines.`
  },
  {
    id: "perf-optimization-playbook",
    title: "Performance Optimization Methodology (30-40% Gain)",
    tags: ["performance", "core web vitals", "lcp", "inp", "cls", "optimization", "speed", "caching"],
    content: `How Satyam achieves 30–40% performance gains across production applications:
1. Core Web Vitals Engineering: Target LCP under 1.8s, INP under 150ms, CLS < 0.05 through critical CSS inlining and modern AVIF/WebP image pipelines.
2. Code Splitting & Dynamic Imports: Route-level and interaction-level lazy loading to reduce initial JavaScript bundle sizes by 50%+.
3. Rendering Optimization: React.memo, useMemo, useCallback, and virtualized lists (react-window) for data-intensive views.
4. Intelligent Caching: HTTP Cache-Control headers, Service Worker caching for static assets, and Redis in-memory caching for API responses.`
  },
  {
    id: "education-credentials",
    title: "Education & Academic Background",
    tags: ["education", "degree", "bca", "diploma", "pcm", "academic"],
    content: `Satyam Dubey's educational credentials:
- Bachelor of Computer Applications (BCA) in Information Technology.
- Diploma in Information Technology.
- Senior Secondary (12th Standard) in Physics, Chemistry, and Mathematics (PCM).
Fluent in English and Hindi.`
  }
];
