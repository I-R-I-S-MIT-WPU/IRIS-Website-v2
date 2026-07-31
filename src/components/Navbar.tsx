import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenProjects: () => void;
}

export default function Navbar({ onScrollToSection, onOpenProjects }: NavbarProps) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Research', path: '/research' },
    { label: 'Blogs', path: '/blog' },
    { label: 'Projects', path: '/projects' },
    { label: 'About Us', path: '/about' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="navbar-header"
        className="fixed left-0 right-0 z-50 px-4 sm:px-6 md:px-10 lg:px-14 pointer-events-none top-4"
      >
        <div className="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-between pointer-events-auto px-5 py-3 shadow-[0_12px_35px_rgba(0,0,0,0.15)] border border-white/40">

          {/* Logo - bigger */}
          <button
            id="nav-logo-btn"
            onClick={() => navigate('/')}
            className="group cursor-pointer focus:outline-none flex-shrink-0"
          >
            <img
              src="/logo.png"
              alt="IRIS Logo"
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
            />
          </button>

          {/* Desktop Nav Links - text below each item always visible */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className="text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer focus:outline-none text-[13px] font-medium font-sans"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center">
            <button
              id="ongoing-projects-nav-btn"
              onClick={() => handleNavClick('/events')}
              className="group flex items-center gap-2 bg-zinc-900 hover:bg-black text-white rounded-xl px-5 py-2.5 text-[13px] font-medium cursor-pointer focus:outline-none shadow-sm font-sans transition-all"
            >
              Events
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 text-zinc-800 hover:text-black transition-colors cursor-pointer focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-24 z-40 bg-white rounded-2xl p-6 md:hidden flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-zinc-100"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="text-left text-zinc-700 hover:text-black hover:pl-2 text-sm font-medium transition-all py-3 border-b border-zinc-100 font-sans focus:outline-none"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleNavClick('/events')}
              className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-black text-white w-full py-3 rounded-xl text-sm font-medium transition-all font-sans"
            >
              Events
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
