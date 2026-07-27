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
    <footer id="footer-section" className="bg-[#0a0a0c] pt-20 pb-8 px-6 lg:px-12 border-t border-transparent relative overflow-hidden text-left">
      {/* Radial purple glow from bottom - wide, flat, bright center */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -bottom-[200px] left-1/2 -translate-x-1/2 w-[1200px] h-[400px] rounded-full bg-[#6d28d9] opacity-80 blur-[120px]" />
        <div className="absolute -bottom-[180px] left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-[#c084fc] opacity-90 blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-16">

          {/* Left Block: Logo and SOCIAL links */}
          <div className="md:col-span-3 space-y-8">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="IRIS Logo" className="w-16 h-16 object-contain" />
            </div>

            <div className="space-y-3">
              <h5 className="font-sans text-xs font-bold text-white uppercase tracking-wider">SOCIAL</h5>
              <ul className="space-y-2 text-sm font-sans text-gray-400">
                <li>
                  <a href="#github" className="hover:text-iris-purple transition-colors">
                    GITHUB
                  </a>
                </li>
                <li>
                  <a href="#linkedin" className="hover:text-iris-purple transition-colors">
                    LINKEDIN
                  </a>
                </li>
                <li>
                  <a href="#instagram" className="hover:text-iris-purple transition-colors">
                    INSTAGRAM
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right side: Three columns */}
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-10">

            {/* EVENTS & CONTENT */}
            <div className="space-y-3">
              <h5 className="font-sans text-xs font-bold text-white uppercase tracking-wider">EVENTS & CONTENT</h5>
              <ul className="space-y-2.5 text-sm font-sans text-gray-400">
                <li>
                  <a
                    href="#events"
                    onClick={(e) => handleLinkClick('events', e)}
                    className="hover:text-iris-purple transition-colors"
                  >
                    Event Calendar
                  </a>
                </li>
                <li>
                  <a
                    href="#writers-hub"
                    onClick={(e) => handleLinkClick('writers-hub', e)}
                    className="hover:text-iris-purple transition-colors"
                  >
                    Blogs
                  </a>
                </li>
                <li>
                  <a
                    href="#writers-hub"
                    onClick={(e) => handleLinkClick('writers-hub', e)}
                    className="hover:text-iris-purple transition-colors"
                  >
                    Newsletter
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={(e) => handleLinkClick('projects', e)}
                    className="hover:text-iris-purple transition-colors"
                  >
                    Research Papers
                  </a>
                </li>
                <li>
                  <a
                    href="#about-us"
                    onClick={(e) => handleLinkClick('about-us', e)}
                    className="hover:text-iris-purple transition-colors"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* PROJECTS */}
            <div className="space-y-3">
              <h5 className="font-sans text-xs font-bold text-white uppercase tracking-wider">PROJECTS</h5>
              <ul className="space-y-2.5 text-sm font-sans text-gray-400">
                <li>
                  <a
                    href="#projects"
                    onClick={(e) => handleLinkClick('projects', e)}
                    className="hover:text-iris-purple transition-colors"
                  >
                    Soteria
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={(e) => handleLinkClick('projects', e)}
                    className="hover:text-iris-purple transition-colors"
                  >
                    Greenthink
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={(e) => handleLinkClick('projects', e)}
                    className="hover:text-iris-purple transition-colors"
                  >
                    Vyas Management Platform
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={(e) => handleLinkClick('projects', e)}
                    className="hover:text-iris-purple transition-colors"
                  >
                    Supremix
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={(e) => handleLinkClick('projects', e)}
                    className="hover:text-iris-purple transition-colors"
                  >
                    GRID
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={(e) => handleLinkClick('projects-all', e)}
                    className="hover:text-iris-purple transition-colors"
                  >
                    TARZAN
                  </a>
                </li>
              </ul>
            </div>

            {/* POLICIES */}
            <div className="space-y-3">
              <h5 className="font-sans text-xs font-bold text-white uppercase tracking-wider">POLICIES</h5>
              <ul className="space-y-2.5 text-sm font-sans text-gray-400">
                <li>
                  <a
                    href="#terms"
                    onClick={(e) => { e.preventDefault(); showToast('Terms & Conditions page under construction'); }}
                    className="hover:text-iris-purple transition-colors"
                  >
                    Terms & Condition
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy"
                    onClick={(e) => { e.preventDefault(); showToast('Privacy Policy page under construction'); }}
                    className="hover:text-iris-purple transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#refund"
                    onClick={(e) => { e.preventDefault(); showToast('Refund Policy page under construction'); }}
                    className="hover:text-iris-purple transition-colors"
                  >
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Far bottom elements with horizontal line */}
        <div className="relative">
          {/* Solid white line */}
          <div className="w-full h-[1px] bg-white/30 mb-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left side text */}
            <div className="text-sm font-sans text-gray-300 select-none">
              iris@mitwpu.edu.in
            </div>

            {/* Right side text */}
            <div className="text-sm font-sans text-gray-300 select-none">
              © IRIS MIT-WPU {currentYear}
            </div>
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
