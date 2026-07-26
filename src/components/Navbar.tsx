import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenProjects: () => void;
}

export default function Navbar({ onScrollToSection, onOpenProjects }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Research', id: 'writers-hub' },
    { label: 'Gallery', id: 'events' },
    { label: 'Projects', id: 'projects' },
    { label: 'About Us', id: 'about-us' },
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed left-0 right-0 z-50 px-4 sm:px-6 md:px-10 lg:px-14 pointer-events-none transition-all duration-300 ${
          isScrolled ? 'top-3 sm:top-4' : 'top-6'
        }`}
      >
        <div 
          className={`w-full max-w-7xl mx-auto bg-white rounded-full flex items-center justify-between pointer-events-auto transition-all duration-300 border border-white/40 ${
            isScrolled 
              ? 'p-1.5 sm:p-2 shadow-[0_15px_40px_rgba(0,0,0,0.22)] bg-white/95 backdrop-blur-md max-w-5xl' 
              : 'p-2.5 sm:p-3 shadow-[0_12px_35px_rgba(0,0,0,0.15)] md:shadow-[0_18px_45px_rgba(0,0,0,0.22)]'
          }`}
        >
          {/* Logo - Black Circular Seal with White Circular Text */}
          <button
            id="nav-logo-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none ml-1 flex-shrink-0"
          >
            <div className={`relative flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
              isScrolled ? 'w-9 h-9 sm:w-10 sm:h-10' : 'w-11 h-11 sm:w-12 sm:h-12'
            }`}>
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Black solid backing */}
                <circle cx="50" cy="50" r="48" fill="#000000" />
                {/* Thin white design line */}
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" strokeDasharray="3,3" />
                
                {/* Text rotation path */}
                <path
                  id="logo-circular-text-path"
                  d="M 50, 14 A 36, 36 0 1, 1 49.9, 14"
                  fill="none"
                />
                
                {/* Circular text using Poppins font style */}
                <text className="text-[5.5px] fill-zinc-400 uppercase tracking-[0.14em]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  <textPath href="#logo-circular-text-path" startOffset="0%">
                    INNOVATION • RESEARCH • INTELLIGENCE • SUPPORT •
                  </textPath>
                </text>
                
                {/* Center IRIS in Hanson-inspired style */}
                <text
                  x="50"
                  y="55"
                  textAnchor="middle"
                  className="fill-white font-black tracking-widest uppercase font-hanson"
                  style={{ fontSize: '13px' }}
                >
                  iris
                </text>
              </svg>
            </div>
          </button>

          {/* Desktop Nav Links - Poppins Font as requested */}
          <nav id="desktop-nav" className={`hidden md:flex items-center transition-all duration-300 ${
            isScrolled ? 'gap-6 lg:gap-8' : 'gap-8 lg:gap-10'
          }`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-zinc-600 hover:text-black font-medium tracking-wide transition-all duration-200 cursor-pointer relative py-1 font-poppins focus:outline-none group ${
                  isScrolled ? 'text-[13px]' : 'text-sm'
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-4/5" />
              </button>
            ))}
          </nav>

          {/* Action Button - Check Our Events pill */}
          <div className="hidden md:flex items-center mr-1">
            <button
              id="ongoing-projects-nav-btn"
              onClick={() => handleNavClick('events')}
              className={`group flex items-center transition-all duration-300 bg-black hover:bg-zinc-900 text-white rounded-full font-semibold tracking-wide cursor-pointer focus:outline-none shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.25)] font-poppins ${
                isScrolled ? 'px-4.5 py-2 text-[11px] gap-1.5' : 'px-6 py-3 text-xs gap-2.5'
              }`}
            >
              Check Our Events
              <ChevronRight className={`transition-transform duration-300 group-hover:translate-x-0.5 ${isScrolled ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 text-zinc-800 hover:text-black transition-colors cursor-pointer focus:outline-none mr-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu - Styled with premium white backing matching the theme */}
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
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className="text-left text-zinc-700 hover:text-black hover:pl-2 text-base font-semibold tracking-wide transition-all py-3 border-b border-zinc-100 font-poppins focus:outline-none"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              id="mobile-ongoing-projects-btn"
              onClick={() => {
                handleNavClick('events');
              }}
              className="flex items-center justify-center gap-2 bg-black hover:bg-zinc-900 text-white w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200 font-poppins"
            >
              Check Our Events
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
