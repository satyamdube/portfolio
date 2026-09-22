'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ProjectModal from '../components/ProjectModal';
import ResumeModal from '../components/ResumeModal';
import ChatWidget from '../components/ChatWidget';

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Navigation Header */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        <HeroSection
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenChat={() => setIsChatOpen(true)}
        />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection
          onOpenCaseStudy={(project) => setSelectedProject(project)}
        />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Floating In-Browser RAG Vector AI Copilot */}
      <ChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </>
  );
}
