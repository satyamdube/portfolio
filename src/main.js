/**
 * SATYAM DUBEY PORTFOLIO - MAIN CLIENT APPLICATION
 * Clean Software Engineer Profile modeled after modern industry standards
 */

// Stylesheets
import "./styles/main.css";
import "./styles/hero.css";
import "./styles/about.css";
import "./styles/skills.css";
import "./styles/projects.css";
import "./styles/timeline.css";
import "./styles/performance.css";
import "./styles/chatbot.css";
import "./styles/contact.css";

// Data & Components
import { resumeData } from "./data/resumeData.js";
import { initParticleCanvas } from "./components/particleCanvas.js";
import { initProjects } from "./components/projectModal.js";
import { initChatWidget } from "./components/chatWidget.js";
import { initResumeModal } from "./components/resumeModal.js";
import { initContactHandler } from "./components/contactHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Neural Particle Background
  initParticleCanvas();

  // 2. Initialize Interactive Components
  initProjects();
  initChatWidget();
  initResumeModal();
  initContactHandler();

  // 3. Populate Technical Skills Matrix
  renderSkillsMatrix();

  // 4. Populate Experience Timeline
  renderExperienceTimeline();

  // 5. Navigation Scroll & Active Section Highlighting
  initNavigation();
});

/**
 * Render Technical Skills Matrix with letter avatar chips
 */
function renderSkillsMatrix() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  const categories = [
    { title: "FRONTEND", list: resumeData.skills.frontend },
    { title: "STATE MANAGEMENT", list: resumeData.skills.stateManagement },
    { title: "BACKEND & APIS", list: resumeData.skills.backend },
    { title: "DATABASES & CACHING", list: resumeData.skills.databases },
    { title: "TESTING", list: resumeData.skills.testing },
    { title: "DEVOPS & TOOLS", list: resumeData.skills.devops }
  ];

  grid.innerHTML = categories
    .map(cat => `
      <div class="skill-category-box">
        <h3 class="skill-category-title">${cat.title}</h3>
        <div class="skill-chips-wrap">
          ${cat.list
            .map(item => `
              <div class="skill-pill">
                <span class="skill-avatar-letter">${item.letter}</span>
                <span>${item.name}</span>
              </div>
            `)
            .join("")}
        </div>
      </div>
    `)
    .join("");
}

/**
 * Render Career History Timeline dynamically
 */
function renderExperienceTimeline() {
  const container = document.getElementById("timeline-container");
  if (!container) return;

  container.innerHTML = resumeData.experience
    .map((exp, idx) => `
      <div class="timeline-item">
        <div class="timeline-node ${idx % 2 === 1 ? 'purple' : ''}"></div>
        <div class="timeline-card">
          <div class="timeline-card-header">
            <div>
              <h3 class="timeline-role">${exp.role}</h3>
              <div class="timeline-company">${exp.company}</div>
              <div style="font-size: 0.8rem; color: #64748b; margin-top: 0.15rem;">${exp.type}</div>
            </div>
            <span class="timeline-period-badge">${exp.period}</span>
          </div>
          <ul class="timeline-highlights">
            ${exp.highlights.map(h => `<li>${h}</li>`).join("")}
          </ul>
          <div class="timeline-tech-tags">
            ${exp.technologies.map(t => `<span class="tech-tag">${t}</span>`).join("")}
          </div>
        </div>
      </div>
    `)
    .join("");
}

/**
 * Navbar Scroll, Mobile Drawer, and Active Section Tracker
 */
function initNavigation() {
  const header = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const navLinksContainer = document.getElementById("nav-links");
  const backdrop = document.getElementById("nav-backdrop");
  const drawerCloseBtn = document.getElementById("mobile-drawer-close");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }

    // Active link highlighting
    const scrollPos = window.scrollY + 140;
    document.querySelectorAll("section[id]").forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  });

  function openDrawer() {
    navLinksContainer?.classList.add("open");
    mobileBtn?.classList.add("open");
    mobileBtn?.setAttribute("aria-expanded", "true");
    backdrop?.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    navLinksContainer?.classList.remove("open");
    mobileBtn?.classList.remove("open");
    mobileBtn?.setAttribute("aria-expanded", "false");
    backdrop?.classList.remove("active");
    document.body.style.overflow = "";
  }

  function toggleDrawer() {
    if (navLinksContainer?.classList.contains("open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  mobileBtn?.addEventListener("click", toggleDrawer);
  drawerCloseBtn?.addEventListener("click", closeDrawer);
  backdrop?.addEventListener("click", closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && navLinksContainer?.classList.contains("open")) {
      closeDrawer();
    }
  });

  // Export closeDrawer globally so modal triggers inside drawer can dismiss drawer
  window.__closeNavDrawer = closeDrawer;
}
