/**
 * Resume Preview & Print Controller
 */

import { resumeData } from "../data/resumeData.js";

export function initResumeModal() {
  const resumeBtn = document.getElementById("resume-btn");
  const modal = document.getElementById("resume-modal");
  const closeBtn = document.getElementById("resume-close-btn");
  const printBtn = document.getElementById("print-resume-btn");
  const contentArea = document.getElementById("resume-content-area");

  if (!modal || !contentArea) return;

  function renderResumeContent() {
    contentArea.innerHTML = `
      <div class="resume-sheet">
        <header class="resume-header" style="display: flex; gap: 1.5rem; align-items: center; margin-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 1rem;">
          <img src="/satyam-dubey.jpg" alt="Satyam Dubey" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid #2563eb; flex-shrink: 0;" />
          <div>
            <h1 style="margin: 0; font-size: 1.85rem; color: #0f172a;">${resumeData.personal.name}</h1>
            <div class="resume-title" style="font-size: 1.05rem; font-weight: 600; color: #2563eb; margin: 0.2rem 0;">
              ${resumeData.personal.title} · ${resumeData.personal.experience}
            </div>
            <div class="resume-contact-line" style="margin: 0; font-size: 0.85rem; color: #64748b;">
              ${resumeData.personal.location} | Phone: <a href="tel:${resumeData.personal.phone}">${resumeData.personal.phone}</a> | 
              Email: <a href="mailto:${resumeData.personal.email}">${resumeData.personal.email}</a> | 
              LinkedIn: <a href="${resumeData.personal.linkedin}" target="_blank">linkedin.com/in/satyam8586864294</a> | 
              Portfolio: <a href="${resumeData.personal.githubPortfolio}" target="_blank">satyamdube.github.io/portfolio</a>
            </div>
          </div>
        </header>

        <h2>Professional Summary</h2>
        <p>${resumeData.summary}</p>

        <h2>Core Skills</h2>
        <p><strong>Frontend:</strong> React.js, Next.js, TypeScript, JavaScript (ES6+), Vue.js, Redux Toolkit / RTK Query, HTML5, CSS3, Tailwind CSS, SCSS, Responsive Design, Performance Optimization, Accessibility, Jest, React Testing Library</p>
        <p><strong>Backend:</strong> Node.js, Express.js, NestJS, REST APIs, GraphQL, Authentication &amp; Authorization (JWT/OAuth), Middleware, WebSockets</p>
        <p><strong>System Architecture:</strong> Microservices &amp; Distributed Systems, Next.js App Router &amp; Server-Side Streaming (SSR), Component Design Systems, Load Balancing, Rate Limiting, API Gateways</p>
        <p><strong>Databases:</strong> MySQL, MongoDB, Redis (Caching &amp; Rate Limiting), SQL Indexing, Query Optimization</p>
        <p><strong>System Design &amp; DevOps:</strong> API Architecture, Microservices Basics, Load Balancing, Docker, Git/GitHub CI/CD, Azure/AWS Basics, Nginx, Linux</p>
        <p><strong>E-Commerce Fundamentals:</strong> Core Web Vitals (30-40% boost), SEO, Conversion Optimization, GA4/GTM Analytics</p>

        <h2>Professional Experience</h2>
        ${resumeData.experience.map(exp => `
          <div style="margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; font-weight: 700; color: #0f172a;">
              <span>${exp.role} — ${exp.company}</span>
              <span style="font-weight: 500; color: #64748b;">${exp.period}</span>
            </div>
            <ul>
              ${exp.highlights.map(h => `<li>${h}</li>`).join("")}
            </ul>
          </div>
        `).join("")}

        <h2>Key Flagship Projects</h2>
        <ul>
          <li><strong>Axis Edge Project</strong> (traveledge.axis.bank.in): Scalable travel &amp; rewards platform for Axis Bank, API integration, 35% load time boost.</li>
          <li><strong>BCG UDAAN Project</strong> (Punjab National Bank - udaan.pnb.bank.in): Enterprise digital banking transformation with Boston Consulting Group, reusable component architecture.</li>
          <li><strong>RedDoorz Platform</strong> (reddoorz.com): High-traffic hospitality platform serving millions of users across Southeast Asia, dynamic room booking and high concurrency.</li>
          <li><strong>Vernost iCuracao Travel Project</strong> (travel.icuracao.com): Responsive travel booking portal built with React.js &amp; Next.js.</li>
          <li><strong>SBI Card Project</strong>: Reusable component architecture, high security, API integrations, and UX latency reduction.</li>
          <li><strong>ThinkExam Platform</strong> (thinkexam.com): Online assessment platform with zero-latency test taking, WebSocket sync, and anti-cheat capabilities.</li>
        </ul>

        <h2>Education &amp; Awards</h2>
        <p><strong>Education:</strong> BCA (Information Technology) · Diploma in IT · 12th (PCM)</p>
        <p><strong>Awards:</strong> Outstanding Performer Award — GingerWebs Pvt. Ltd. (2020)</p>
      </div>
    `;
  }

  function openModal() {
    renderResumeContent();
    modal.classList.remove("hidden");
  }

  function closeModal() {
    modal.classList.add("hidden");
  }

  const heroResumeBtn = document.getElementById("hero-resume-btn");
  resumeBtn?.addEventListener("click", openModal);
  heroResumeBtn?.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  printBtn?.addEventListener("click", () => {
    window.print();
  });
}
