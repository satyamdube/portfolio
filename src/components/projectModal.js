/**
 * Project Grid & Case Study Modal Controller
 */

import { resumeData } from "../data/resumeData.js";

export function initProjects() {
  const grid = document.getElementById("projects-grid");
  const filters = document.getElementById("project-filters");
  const modal = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close-btn");
  const modalTitle = document.getElementById("modal-title");
  const modalCategory = document.getElementById("modal-category");
  const modalBody = document.getElementById("modal-body");
  const modalFooter = document.getElementById("modal-footer");

  if (!grid) return;

  function renderProjects(filter = "all") {
    grid.innerHTML = "";

    const filtered = filter === "all" 
      ? resumeData.projects 
      : resumeData.projects.filter(p => p.category === filter);

    filtered.forEach(project => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.setAttribute("data-id", project.id);

      card.innerHTML = `
        <div>
          <div class="project-card-top">
            <span class="project-category-badge ${project.category}">${project.categoryLabel}</span>
            <div class="project-live-indicator">
              <span class="project-live-dot"></span>
              <span>Production</span>
            </div>
          </div>
          <h3 class="project-title">${project.title}</h3>
          <div class="project-role">${project.role}</div>
          <p class="project-summary">${project.summary}</p>
          <div class="project-metric-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span>${project.metrics}</span>
          </div>
          <div class="project-tech-tags">
            ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join("")}
          </div>
        </div>
        <div class="project-actions">
          <button class="btn btn-primary btn-sm btn-deep-dive" data-id="${project.id}">
            <span>Case Study</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
          <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            <span>Live Site</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      `;

      grid.appendChild(card);
    });

    // Attach click events to "Case Study" buttons
    grid.querySelectorAll(".btn-deep-dive").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = e.currentTarget.getAttribute("data-id");
        openProjectModal(id);
      });
    });
  }

  function openProjectModal(projectId) {
    const project = resumeData.projects.find(p => p.id === projectId);
    if (!project || !modal) return;

    modalTitle.textContent = project.title;
    modalCategory.textContent = project.categoryLabel;

    modalBody.innerHTML = `
      <h4>Project Architecture &amp; Overview</h4>
      <p>${project.details}</p>
      
      <h4>Key Engineering Contributions</h4>
      <ul>
        ${project.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>

      <h4>Performance &amp; Scale Metrics</h4>
      <p><strong>Impact:</strong> ${project.metrics}</p>

      <h4>Technology Stack</h4>
      <div class="project-tech-tags" style="margin-top: 0.5rem;">
        ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join("")}
      </div>
    `;

    modalFooter.innerHTML = `
      <button class="btn btn-outline" id="modal-inner-close">Close</button>
      <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <span>Visit Production Application</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    `;

    modal.classList.remove("hidden");
    document.getElementById("modal-inner-close")?.addEventListener("click", closeModal);
  }

  function closeModal() {
    if (modal) modal.classList.add("hidden");
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // Filter Buttons
  if (filters) {
    filters.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        filters.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.getAttribute("data-filter");
        renderProjects(category);
      });
    });
  }

  // Initial render
  renderProjects("all");
}
