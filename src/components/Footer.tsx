import React, { useState } from 'react';
import { Github, Mail, Globe, Cpu, Award, X, Bell } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenProjects: () => void;
}

export default function Footer({ onScrollToSection, onOpenProjects }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (id === 'projects-all') {
      onOpenProjects();
    } else {
      onScrollToSection(id);
    }
  };

  return (
    <footer id="footer-section" className="bg-[#050507] pt-20 pb-8 px-6 lg:px-12 border-t border-white/[0.02] relative overflow-hidden text-left">
      {/* Background glow shadow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full bg-iris-purple/10 blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-16">
          
          {/* Left Block: Logo, description, address coordinates */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center">
                <span className="text-[10px] font-display font-light text-white lowercase">iris</span>
              </div>
              <span className="font-display font-bold tracking-widest text-white text-sm">I.R.I.S.</span>
            </div>

            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-sm font-sans">
              Decentralized hardware engineering, low-latency spatial mechanics, and neural database systems. Shaping tech development under a secure research core.
            </p>

            <div className="text-xs font-mono text-gray-600 space-y-1 pt-2">
              <p>PHYSICAL LAB: Sector 7, Robotics Research Bay</p>
              <p>LOCATIVE COORDS: 12.9716° N, 77.5946° E</p>
              <p>SECURE EMAIL: contact@iris-intelligence-system.org</p>
            </div>
          </div>

          {/* Spacer block */}
          <div className="hidden md:block md:col-span-1" />

          {/* Middle links sections */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Useful Links */}
            <div className="space-y-4">
              <h5 className="font-mono text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">USEFUL LINKS</h5>
              <ul className="space-y-2.5 text-xs font-sans text-gray-500">
                <li>
                  <a
                    href="#about-us"
                    onClick={(e) => handleLinkClick('about-us', e)}
                    className="hover:text-iris-purple hover:pl-1 transition-all"
                  >
                    About Cluster
                  </a>
                </li>
                <li>
                  <a
                    href="#writers-hub"
                    onClick={(e) => handleLinkClick('writers-hub', e)}
                    className="hover:text-iris-purple hover:pl-1 transition-all"
                  >
                    Research Hub
                  </a>
                </li>
                <li>
                  <a
                    href="#events"
                    onClick={(e) => handleLinkClick('events', e)}
                    className="hover:text-iris-purple hover:pl-1 transition-all"
                  >
                    Active Seminars
                  </a>
                </li>
              </ul>
            </div>

            {/* Projects list */}
            <div className="space-y-4">
              <h5 className="font-mono text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">PROJECTS</h5>
              <ul className="space-y-2.5 text-xs font-sans text-gray-500">
                <li>
                  <a
                    href="#projects"
                    onClick={(e) => handleLinkClick('projects', e)}
                    className="hover:text-iris-purple hover:pl-1 transition-all"
                  >
                    Soteria Defense
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={(e) => handleLinkClick('projects', e)}
                    className="hover:text-iris-purple hover:pl-1 transition-all"
                  >
                    Vyas Relational
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={(e) => handleLinkClick('projects', e)}
                    className="hover:text-iris-purple hover:pl-1 transition-all"
                  >
                    Tarzan Swarm
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources list */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h5 className="font-mono text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">RESOURCES</h5>
              <ul className="space-y-2.5 text-xs font-sans text-gray-500">
                <li>
                  <a
                    href="#api"
                    onClick={(e) => { e.preventDefault(); showToast('I.R.I.S. Core API Specification is restricted to authenticated researchers.'); }}
                    className="hover:text-iris-purple hover:pl-1 transition-all"
                  >
                    API Spec Sheets
                  </a>
                </li>
                <li>
                  <a
                    href="#github"
                    onClick={(e) => { e.preventDefault(); showToast('Core repositories are stored on encrypted offline servers.'); }}
                    className="hover:text-iris-purple hover:pl-1 transition-all"
                  >
                    Encrypted Repos
                  </a>
                </li>
                <li>
                  <a
                    href="#whitepaper"
                    onClick={(e) => { e.preventDefault(); showToast('Whitepaper is available inside the Writers Hub.'); }}
                    className="hover:text-iris-purple hover:pl-1 transition-all"
                  >
                    Lab Whitepapers
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Far bottom elements matching the screenshot precisamente */}
        <div className="pt-8 border-t border-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-4 relative">
          
          {/* Subtle line styling with bright violet neon highlights */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-iris-purple/30 to-transparent" />

          {/* Copyright description */}
          <div className="text-[10px] font-mono text-zinc-600 select-none">
            &copy; {currentYear} I.R.I.S. LAB. ALL RIGHTS RESERVED. UNRESTRICTED ACCESS IN PREVIEW_OS.
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4 text-zinc-600">
            <a href="#github" className="hover:text-white transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="#mail" className="hover:text-white transition-colors" aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
            <a href="#web" className="hover:text-white transition-colors" aria-label="Web">
              <Globe className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>

      {/* Modern Stateful Toast Notification Overlay */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
          <div className="bg-zinc-950 border border-iris-purple/40 text-white rounded-xl px-4 py-3.5 shadow-2xl flex items-center gap-3 max-w-sm backdrop-blur-md">
            <div className="p-1.5 bg-iris-purple/15 border border-iris-purple/30 rounded-lg">
              <Bell className="w-4 h-4 text-iris-purple animate-pulse" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-none mb-1">SYSTEM_NOTICE</p>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">{toastMessage}</p>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="p-1 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
