import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about-us" className="relative py-28 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Top row: big intro card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#f5f3ff] to-white rounded-3xl p-10 sm:p-14 mb-6"
        >
          <div className="max-w-3xl">
            <p className="text-iris-purple text-xs font-semibold uppercase tracking-widest mb-4 font-sans">Who we are</p>
            <h2 className="font-funnel font-bold text-4xl sm:text-5xl md:text-6xl text-zinc-900 tracking-tight leading-tight mb-6">
              We build things<br />that matter.
            </h2>
            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed font-sans max-w-2xl">
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
