import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Orbit } from 'lucide-react';

interface HeroProps {
  onJoinClick: () => void;
}

export default function Hero({ onJoinClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-black flex flex-col justify-between overflow-hidden pt-36 pb-28 z-10"
    >
      {/* Background Glowing Spotlight Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Central glowing spotlight behind system core */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] md:w-[750px] h-[280px] sm:h-[500px] md:h-[750px] rounded-full bg-iris-purple/15 blur-[90px] sm:blur-[130px] opacity-80" />
        {/* Subtle secondary left glow */}
        <div className="absolute top-[20%] left-[10%] w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] rounded-full bg-violet-600/10 blur-[100px]" />
        {/* Subtle secondary right glow */}
        <div className="absolute bottom-[20%] right-[10%] w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      {/* Abstract 3D gyroscopic orbits rotating slowly in the background behind texts */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-40">
        <div className="relative w-[340px] sm:w-[450px] md:w-[600px] h-[340px] sm:h-[450px] md:h-[600px] flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-dashed border-iris-purple/20 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-5/6 h-5/6 border border-zinc-900 rounded-full"
          />
          <motion.div
            animate={{ rotate: 180 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-2/3 h-2/3 border border-dashed border-violet-500/10 rounded-full"
          />
          
          {/* Pulsing center glow core (Completely Non-Robot) */}
          <div className="absolute w-28 h-28 bg-iris-purple/10 rounded-full filter blur-xl animate-pulse" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-20 flex-grow flex flex-col justify-center items-center">
        {/* Big Hanson Title */}
        <div className="w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-hanson font-bold text-[14vw] sm:text-[13vw] md:text-[12vw] leading-none tracking-tight uppercase select-none text-center bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent filter drop-shadow-[0_12px_40px_rgba(255,255,255,0.04)]"
          >
            I.R.I.S.
          </motion.h1>
        </div>

        {/* Info Grid - Slogan on Left, Button on Right */}
        <div className="w-full max-w-6xl mx-auto mt-10 sm:mt-16 md:mt-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 sm:gap-12 md:gap-6">
          {/* Left Column Slogan - Poppins Font */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="text-left font-poppins"
          >
            <p className="font-extrabold uppercase tracking-[0.24em] text-[11px] sm:text-xs md:text-sm text-white/95 leading-none">
              INNOVATION &nbsp;&nbsp;&nbsp;&nbsp; RESEARCH
            </p>
            <p className="font-extrabold uppercase tracking-[0.24em] text-[11px] sm:text-xs md:text-sm text-white/95 leading-none mt-3">
              INTELLIGENCE &nbsp;&nbsp;&nbsp;&nbsp; SUPPORT
            </p>
          </motion.div>

          {/* Right Column Action button - Poppins Font */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <button
              onClick={() => {
                const target = document.getElementById('about-us');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-zinc-100 text-black rounded-full text-xs sm:text-sm font-bold font-poppins transition-all duration-300 shadow-[0_4px_15px_rgba(255,255,255,0.12)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.22)] hover:scale-[1.03] cursor-pointer"
            >
              Read More
              <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Corner Overlays matching precisely the provided screenshot */}
      <div className="absolute bottom-8 left-6 sm:left-12 lg:left-20 text-left z-20 pointer-events-auto">
        <p className="font-poppins text-[10px] sm:text-xs text-zinc-500 font-medium uppercase tracking-widest leading-none">
          Created By
        </p>
        <p className="font-poppins text-xs sm:text-sm text-zinc-300 font-bold tracking-wide mt-1.5">
          IRIS Website Team
        </p>
      </div>

      <div className="absolute bottom-8 right-6 sm:right-12 lg:right-20 text-right z-20 pointer-events-auto">
        <button
          onClick={() => {
            const target = document.getElementById('about-us');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }}
          className="font-poppins text-xs sm:text-sm text-zinc-400 hover:text-white font-semibold tracking-wide flex items-center gap-2 transition-colors cursor-pointer focus:outline-none"
        >
          Scroll to explore
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="inline-block"
          >
            ↓
          </motion.span>
        </button>
      </div>
    </section>
  );
}
