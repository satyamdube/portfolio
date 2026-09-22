'use client';

import React, { useState } from 'react';
import { resumeData } from '../src/data/resumeData.js';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStatus({
        type: 'success',
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 700);
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          <h2 className="section-title" style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
            Get In Touch
          </h2>
          <p className="section-subtitle">
            Open for Sr. Frontend Developer, Full Stack Developer, and Technical Engineering roles.
          </p>
        </div>

        <div className="contact-layout">
          {/* Left Column: Direct Info */}
          <div className="contact-info-cards">
            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="contact-details">
                <span className="contact-label">Email</span>
                <a href={`mailto:${resumeData.personal.email}`} className="contact-value">
                  {resumeData.personal.email}
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="contact-details">
                <span className="contact-label">Phone / WhatsApp</span>
                <a href={`tel:${resumeData.personal.phone}`} className="contact-value">
                  {resumeData.personal.phone}
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-details">
                <span className="contact-label">Location</span>
                <span className="contact-value">
                  {resumeData.personal.location} (Open to Remote / Hybrid)
                </span>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <div className="contact-details">
                <span className="contact-label">LinkedIn</span>
                <a
                  href={resumeData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-value"
                >
                  linkedin.com/in/satyam8586864294
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="contact-form-wrapper">
            <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="form-name">Your Name</label>
                  <input
                    type="text"
                    id="form-name"
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-email">Your Email</label>
                  <input
                    type="email"
                    id="form-email"
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="form-subject">Subject / Role Opportunity</label>
                <input
                  type="text"
                  id="form-subject"
                  placeholder="Sr. Frontend Role / Full Stack Engineering"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="form-message">Message</label>
                <textarea
                  id="form-message"
                  rows={5}
                  placeholder="Hi Satyam, we came across your work on Axis Edge and high-traffic React platforms..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-glow w-100"
                id="form-submit-btn"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Sending Message...' : 'Send Direct Message'}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon-right">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>

              {status.type === 'success' && (
                <div className="form-status-msg success">
                  <strong>Thank you, {status.name}!</strong> Your message has been prepared. You can also send directly via email to{' '}
                  <a
                    href={`mailto:${resumeData.personal.email}?subject=${encodeURIComponent(status.subject)}&body=${encodeURIComponent(status.message + '\n\nFrom: ' + status.name + ' (' + status.email + ')')}`}
                    style={{ color: '#00f5a0', textDecoration: 'underline' }}
                  >
                    {resumeData.personal.email}
                  </a>.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
