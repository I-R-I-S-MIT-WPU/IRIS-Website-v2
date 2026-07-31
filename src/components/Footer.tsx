import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { X, Bell } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenProjects: () => void;
}

export default function Footer({ onScrollToSection, onOpenProjects }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <footer id="footer-section" className="bg-black pt-20 pb-8 px-6 lg:px-12 border-t border-transparent relative overflow-hidden text-left">
      {/* Animated radial purple glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute bottom-[-600px] left-1/2 -translate-x-1/2 w-[2000px] h-[700px] rounded-full bg-[#9333ea] opacity-90 blur-[100px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.9, 0.7, 0.9],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[-580px] left-1/2 -translate-x-1/2 w-[1000px] h-[650px] rounded-full bg-[#c084fc] opacity-80 blur-[80px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.8, 0.5, 0.8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-16">

          {/* Left Block: Logo and Social */}
          <div className="md:col-span-3 space-y-8">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="IRIS Logo" className="w-16 h-16 object-contain" />
            </div>

            <div className="space-y-3">
              <h5 className="font-sans text-xs font-bold text-white uppercase tracking-wider">SOCIAL</h5>
              <ul className="space-y-2 text-sm font-sans text-gray-400">
                <li>
                  <a href="https://github.com/I-R-I-S-MIT-WPU" target="_blank" rel="noopener noreferrer" className="hover:text-iris-purple transition-colors">
                    GITHUB
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/105128747" target="_blank" rel="noopener noreferrer" className="hover:text-iris-purple transition-colors">
                    LINKEDIN
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/iris_mitwpu/" target="_blank" rel="noopener noreferrer" className="hover:text-iris-purple transition-colors">
                    INSTAGRAM
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right side: Three columns */}
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-10">

            {/* EXPLORE */}
            <div className="space-y-3">
              <h5 className="font-sans text-xs font-bold text-white uppercase tracking-wider">EXPLORE</h5>
              <ul className="space-y-2.5 text-sm font-sans text-gray-400">
                <li>
                  <Link to="/events" className="hover:text-iris-purple transition-colors">Events</Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-iris-purple transition-colors">Blogs</Link>
                </li>
                <li>
                  <Link to="/research" className="hover:text-iris-purple transition-colors">Research</Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:text-iris-purple transition-colors">Projects</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-iris-purple transition-colors">About Us</Link>
                </li>
                <li>
                  <Link to="/recruitment" className="hover:text-iris-purple transition-colors">Join Us</Link>
                </li>
              </ul>
            </div>

            {/* QUICK LINKS */}
            <div className="space-y-3">
              <h5 className="font-sans text-xs font-bold text-white uppercase tracking-wider">QUICK LINKS</h5>
              <ul className="space-y-2.5 text-sm font-sans text-gray-400">
                <li>
                  <button onClick={() => { navigate('/'); setTimeout(() => onScrollToSection('projects'), 100); }} className="hover:text-iris-purple transition-colors text-left">
                    Our Projects
                  </button>
                </li>
                <li>
                  <button onClick={() => { navigate('/'); setTimeout(() => onScrollToSection('events'), 100); }} className="hover:text-iris-purple transition-colors text-left">
                    Upcoming Events
                  </button>
                </li>
                <li>
                  <button onClick={() => { navigate('/'); setTimeout(() => onScrollToSection('about-us'), 100); }} className="hover:text-iris-purple transition-colors text-left">
                    About IRIS
                  </button>
                </li>
                <li>
                  <button onClick={() => { navigate('/'); setTimeout(() => onScrollToSection('join-us-section'), 100); }} className="hover:text-iris-purple transition-colors text-left">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* POLICIES */}
            <div className="space-y-3">
              <h5 className="font-sans text-xs font-bold text-white uppercase tracking-wider">POLICIES</h5>
              <ul className="space-y-2.5 text-sm font-sans text-gray-400">
                <li>
                  <button onClick={() => showToast('Terms & Conditions page under construction')} className="hover:text-iris-purple transition-colors text-left">
                    Terms & Condition
                  </button>
                </li>
                <li>
                  <button onClick={() => showToast('Privacy Policy page under construction')} className="hover:text-iris-purple transition-colors text-left">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => showToast('Refund Policy page under construction')} className="hover:text-iris-purple transition-colors text-left">
                    Refund Policy
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="relative">
          <div className="w-full h-[1px] bg-white/30 mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm font-sans text-gray-300 select-none">
              iris@mitwpu.edu.in
            </div>
            <div className="text-sm font-sans text-gray-300 select-none">
              © IRIS MIT-WPU {currentYear}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
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
            <button onClick={() => setToastMessage(null)} className="p-1 text-gray-500 hover:text-white transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
