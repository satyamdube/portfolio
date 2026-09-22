import React from 'react';
import { resumeData } from '../src/data/resumeData.js';

export default function SkillsSection() {
  const categories = [
    { title: 'FRONTEND', list: resumeData.skills.frontend },
    { title: 'STATE MANAGEMENT', list: resumeData.skills.stateManagement },
    { title: 'BACKEND & APIS', list: resumeData.skills.backend },
    { title: 'DATABASES & CACHING', list: resumeData.skills.databases },
    { title: 'TESTING', list: resumeData.skills.testing },
    { title: 'DEVOPS & TOOLS', list: resumeData.skills.devops }
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          <h2 className="section-title" style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
            Technical Skills
          </h2>
          <p className="section-subtitle">
            Technologies I've worked with in production environments.
          </p>
        </div>

        <div className="skills-categories-grid" id="skills-grid">
          {categories.map((cat, idx) => (
            <div key={idx} className="skill-category-box">
              <h3 className="skill-category-title">{cat.title}</h3>
              <div className="skill-chips-wrap">
                {cat.list.map((item, itemIdx) => (
                  <div key={itemIdx} className="skill-pill">
                    <span className="skill-avatar-letter">{item.letter}</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
