import React from 'react';
import { resumeData } from '../src/data/resumeData.js';

export default function ExperienceSection() {
  return (
    <section className="section timeline-section" id="experience">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
            Experience
          </h2>
          <p className="section-subtitle">
            My professional journey and track record of building production applications.
          </p>
        </div>

        <div className="timeline-container" id="timeline-container">
          {resumeData.experience.map((exp, idx) => (
            <div key={idx} className="timeline-item">
              <div className={`timeline-node ${idx % 2 === 1 ? 'purple' : ''}`} />
              <div className="timeline-card">
                <div className="timeline-card-header">
                  <div>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <div className="timeline-company">{exp.company}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.15rem' }}>
                      {exp.type}
                    </div>
                  </div>
                  <span className="timeline-period-badge">{exp.period}</span>
                </div>
                <ul className="timeline-highlights">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
                <div className="timeline-tech-tags">
                  {exp.technologies.map((t, tIdx) => (
                    <span key={tIdx} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
