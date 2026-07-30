import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop',
];

export default function AboutUs() {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg(prev => (prev + 1) % GALLERY_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about-us" className="relative py-28 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/8 blur-[150px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-purple-600/6 blur-[130px]" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Top row: big intro card with gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#f5f3ff] to-white rounded-3xl mb-6 overflow-hidden relative"
        >
          <div className="flex flex-col lg:flex-row relative">
            {/* Left: text */}
            <div className="relative z-10 lg:w-1/2 p-10 sm:p-14">
              <p className="text-iris-purple text-xs font-semibold uppercase tracking-widest mb-4 font-sans">Who we are</p>
              <h2 className="font-funnel font-bold text-4xl sm:text-5xl md:text-6xl text-zinc-900 tracking-tight leading-tight mb-6">
                We build things<br />that matter.
              </h2>
              <p className="text-zinc-600 text-base sm:text-lg leading-relaxed font-sans">
                I.R.I.S is a student-run tech club at MIT-WPU. We work across robotics, AI, avionics, and full-stack engineering — shipping real products, not just prototypes.
              </p>
              <button
                onClick={() => {
                  const target = document.getElementById('projects');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-center gap-2 mt-8 bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer"
              >
                See our work
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Progress bar */}
              <div className="flex gap-2 mt-8">
                {GALLERY_IMAGES.map((_, i) => (
                  <div key={i} className="flex-1 h-1 rounded-full bg-zinc-300/50 overflow-hidden">
                    <motion.div
                      className="h-full bg-iris-purple rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: i === currentImg ? '100%' : i < currentImg ? '100%' : '0%' }}
                      transition={{ duration: i === currentImg ? 3 : 0.3, ease: 'linear' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: gallery flush to edges */}
            <div className="relative lg:w-1/2 h-[280px] lg:h-auto min-h-[280px]">
              {GALLERY_IMAGES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt="IRIS gallery"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                  style={{ opacity: i === currentImg ? 1 : 0 }}
                />
              ))}
              {/* Fade to left - always on top */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#f5f3ff] via-[#f5f3ff]/70 to-transparent pointer-events-none z-10" style={{ width: '40%' }} />
            </div>
          </div>
        </motion.div>

        {/* Bottom row: 3 equal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 rounded-3xl p-8 border border-white/5"
          >
            <div className="w-10 h-10 rounded-xl bg-iris-purple/15 flex items-center justify-center mb-5">
              <span className="text-iris-purple text-lg font-bold">01</span>
            </div>
            <h3 className="font-sans font-semibold text-white text-xl mb-3">Vision</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-sans">
              To become a catalyst for innovation — creating technology that is intelligent, inclusive, and future-ready.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900 rounded-3xl p-8 border border-white/5"
          >
            <div className="w-10 h-10 rounded-xl bg-iris-purple/15 flex items-center justify-center mb-5">
              <span className="text-iris-purple text-lg font-bold">02</span>
            </div>
            <h3 className="font-sans font-semibold text-white text-xl mb-3">Mission</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-sans">
              Solve real-world challenges through technology while fostering creativity, collaboration, and continuous learning.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900 rounded-3xl p-8 border border-white/5"
          >
            <div className="w-10 h-10 rounded-xl bg-iris-purple/15 flex items-center justify-center mb-5">
              <span className="text-iris-purple text-lg font-bold">03</span>
            </div>
            <h3 className="font-sans font-semibold text-white text-xl mb-3">Team</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-sans">
              50+ members across hardware, software, AI/ML, avionics, and design — turning ambitious ideas into shipped products.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
