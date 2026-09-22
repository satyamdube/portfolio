'use client';

import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenResume, onOpenChat }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState('dark');

  // Initialize and synchronize theme (Dark theme is active by default)
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
      setTheme('light');
      applyTheme('light');
    } else {
      // Default is always dark theme
      setTheme('dark');
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
    applyTheme(nextTheme);
  };

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
              <span className="brand-role">Full Stack Developer</span>
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
                  <span className="brand-role">Portfolio</span>
                </div>
              </div>
            </div>

            {/* Navigation List */}
            <ul className="nav-links-list margin-left">
              {[
                { href: '#home', label: 'Home', id: 'home' },
                { href: '#about', label: 'About', id: 'about' },
                { href: '#skills', label: 'Skills', id: 'skills' },
                { href: '#experience', label: 'Experience', id: 'experience' },
                { href: '#projects', label: 'Projects', id: 'projects' },
                { href: '#contact', label: 'Contact', id: 'contact' }
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={closeDrawer}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Drawer Footer Actions & Theme Switch */}
            <div className="mobile-drawer-actions">
              {/* Mobile Theme Switcher */}
              <div className="mobile-theme-row">
                <span className="mobile-theme-label">Appearance</span>
                <div className="theme-pill-switch">
                  <button
                    className={`theme-pill-opt ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => {
                      if (theme !== 'dark') toggleTheme();
                    }}
                    aria-label="Switch to Dark Mode"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                    <span>Dark</span>
                  </button>
                  <button
                    className={`theme-pill-opt ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => {
                      if (theme !== 'light') toggleTheme();
                    }}
                    aria-label="Switch to Light Mode"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                    <span>Light</span>
                  </button>
                </div>
              </div>

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
                <span>View Resume / CV</span>
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
            {/* Theme Toggle Button (Light/Dark Mode) */}
            <button
              id="theme-toggle-btn"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                // Sun icon when in dark mode to indicate switching to light mode
                <svg
                  className="theme-toggle-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: '#f59e0b' }}
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                // Moon icon when in light mode to indicate switching to dark mode
                <svg
                  className="theme-toggle-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: '#6366f1' }}
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

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
