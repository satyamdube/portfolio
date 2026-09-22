'use client';

import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenResume, onOpenChat }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const scrollPos = window.scrollY + 140;
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isDrawerOpen]);

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      <div
        id="nav-backdrop"
        className={`nav-backdrop ${isDrawerOpen ? 'active' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <a href="#home" className="brand-logo" aria-label="Satyam Dubey Home" onClick={closeDrawer}>
            <div className="logo-symbol">
              <span className="logo-text">SD</span>
            </div>
            <div className="brand-meta">
              <span className="brand-name">Satyam Dubey</span>
              <span className="brand-role">Sr. Frontend / Full Stack Developer</span>
            </div>
          </a>

          {/* Desktop & Mobile Nav Drawer Links */}
          <nav className={`nav-links ${isDrawerOpen ? 'open' : ''}`} id="nav-links">
            <div className="mobile-drawer-header">
              <div className="brand-logo">
                <div className="logo-symbol">
                  <span className="logo-text">SD</span>
                </div>
                <div className="brand-meta">
                  <span className="brand-name">Satyam Dubey</span>
                  <span className="brand-role">Sr. Frontend / Full Stack Developer</span>
                </div>
              </div>
              <button
                className="mobile-drawer-close"
                id="mobile-drawer-close"
                onClick={closeDrawer}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <div className="nav-links-list">
              {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((sec) => (
                <a
                  key={sec}
                  href={`#${sec}`}
                  className={`nav-link ${activeSection === sec ? 'active' : ''}`}
                  onClick={closeDrawer}
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </a>
              ))}
            </div>

            <div className="mobile-drawer-actions">
              <button
                id="mobile-resume-btn"
                className="btn btn-outline w-100"
                onClick={() => {
                  closeDrawer();
                  onOpenResume();
                }}
                aria-label="View Resume"
              >
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>Resume</span>
              </button>
              <button
                id="mobile-chat-trigger"
                className="btn btn-primary btn-glow w-100"
                onClick={() => {
                  closeDrawer();
                  onOpenChat();
                }}
                aria-label="Ask Satyam AI"
              >
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <circle cx="9" cy="10" r="1" fill="currentColor" />
                  <circle cx="15" cy="10" r="1" fill="currentColor" />
                </svg>
                <span>Ask Satyam AI</span>
                <span className="badge-mini">RAG</span>
              </button>
            </div>
          </nav>

          {/* Top Actions */}
          <div className="nav-actions">
            <button
              id="resume-btn"
              className="btn btn-outline btn-sm nav-desktop-action"
              onClick={onOpenResume}
              aria-label="View Resume"
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span>Resume</span>
            </button>
            <button
              id="nav-chat-trigger"
              className="btn btn-primary btn-sm btn-glow nav-desktop-action"
              onClick={() => onOpenChat()}
              aria-label="Ask Satyam AI"
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <circle cx="9" cy="10" r="1" fill="currentColor" />
                <circle cx="15" cy="10" r="1" fill="currentColor" />
              </svg>
              <span>Ask AI</span>
              <span className="badge-mini">RAG</span>
            </button>
            <button
              className={`mobile-toggle ${isDrawerOpen ? 'open' : ''}`}
              id="mobile-menu-btn"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isDrawerOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
