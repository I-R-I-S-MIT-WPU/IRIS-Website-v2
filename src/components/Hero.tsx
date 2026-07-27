import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import Spline from '@splinetool/react-spline';

interface HeroProps {
  onJoinClick: () => void;
}

export default function Hero({ onJoinClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-black flex flex-col justify-between overflow-hidden pt-36 pb-28 z-10"
    >
      {/* Background Glowing Spotlight Blobs - animated & scattered */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, -30, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[40%] w-[300px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[500px] md:h-[700px] rounded-full bg-iris-purple/25 blur-[120px] sm:blur-[160px]"
        />
        <motion.div
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-violet-600/15 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, 30, -40, 0], y: [0, -50, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] right-[5%] w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full bg-indigo-500/15 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -20, 50, 0], y: [0, 30, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[55%] right-[25%] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full bg-purple-500/10 blur-[90px]"
        />
      </div>

      {/* IRIS text - behind the Spline scene, bigger and shifted up */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none -translate-y-[8%]">
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-hanson font-bold text-[22vw] sm:text-[20vw] md:text-[18vw] leading-none tracking-tight uppercase select-none text-center bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent"
        >
          I.R.I.S.
        </motion.h1>
      </div>

      {/* Spline 3D scene - in front of text */}
      <div className="absolute inset-0 z-20">
        <Spline scene="https://prod.spline.design/EQThF8nDrvGZcz3o/scene.splinecode" />
      </div>

      {/* Slogan and button - behind the bot (same z as IRIS text) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6 mt-[28vh]">
          {/* Left Column Slogan */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="text-left font-poppins pointer-events-auto"
          >
            <p className="font-extrabold uppercase tracking-[0.24em] text-[11px] sm:text-xs md:text-sm text-white/95 leading-none">
              INNOVATION &nbsp;&nbsp;&nbsp;&nbsp; RESEARCH
            </p>
            <p className="font-extrabold uppercase tracking-[0.24em] text-[11px] sm:text-xs md:text-sm text-white/95 leading-none mt-3">
              INTELLIGENCE &nbsp;&nbsp;&nbsp;&nbsp; SUPPORT
            </p>
          </motion.div>

          {/* Right Column Action button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="flex-shrink-0 pointer-events-auto"
          >
            <button
              onClick={() => {
                const target = document.getElementById('about-us');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-zinc-100 text-black rounded-xl text-xs sm:text-sm font-bold font-poppins transition-all duration-300 shadow-[0_4px_15px_rgba(255,255,255,0.12)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.22)] hover:scale-[1.03] cursor-pointer"
            >
              Read More
              <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-[300px] z-25 pointer-events-none bg-gradient-to-t from-black to-transparent" />

      {/* Bottom Corner Overlays */}
      <div className="absolute bottom-8 left-6 sm:left-12 lg:left-20 text-left z-30 pointer-events-auto">
        <p className="font-poppins text-[10px] sm:text-xs text-zinc-500 font-medium uppercase tracking-widest leading-none">
          Created By
        </p>
        <p className="font-poppins text-xs sm:text-sm text-zinc-300 font-bold tracking-wide mt-1.5">
          IRIS Website Team
        </p>
      </div>

      <div className="absolute bottom-8 right-6 sm:right-12 lg:right-20 text-right z-30 pointer-events-auto">
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
