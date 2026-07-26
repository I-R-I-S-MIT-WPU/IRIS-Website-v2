import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Info, X, ChevronRight, HardDrive, Cpu, Terminal } from 'lucide-react';

export default function AboutUs() {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  const teamMembers = [
    { name: 'Dr. Evelyn Vance', role: 'Head of AI & ML Cluster', bio: 'Former senior scientist at research lab, specializing in edge-compute vision architectures.', cluster: 'Software' },
    { name: 'Alex Rivera', role: 'Lead Robotics Architect', bio: 'Mechatronics specialist, coordinates the Soteria surveillance manipulator assemblies.', cluster: 'Hardware' },
    { name: 'Siddharth Roy', role: 'Director of Avionics', bio: 'UAV control systems developer, lead on Tarzan bio-inspired swarm optimization protocols.', cluster: 'Avionics' },
    { name: 'Vikram Mehta', role: 'Database Infrastructure Lead', bio: 'Systems programming enthusiast, author of the Vyas Relational-Vector database engine.', cluster: 'Software' },
  ];

  return (
    <section id="about-us" className="relative py-20 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden">
      {/* Background subtle elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[50%] left-[-10%] w-[300px] h-[300px] rounded-full bg-iris-purple/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Bento Frame with White to Light Lavender Gradient */}
        <div className="bg-gradient-to-b from-white via-[#E2E1F8] to-[#CBC9EE] rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 md:p-14 shadow-[0_24px_65px_rgba(0,0,0,0.35)] text-zinc-900 border border-white/20">
          
          {/* Main Title - ABOUT US using Hanson Font */}
          <div className="text-center mb-10 md:mb-14">
            <motion.h2
              id="about-us-title"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-hanson font-bold text-4xl sm:text-5xl md:text-6xl tracking-[0.06em] text-black uppercase"
            >
              ABOUT US
            </motion.h2>
          </div>

          {/* Bento Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Column - stacked cards (Vision, Mission, Team) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* OUR VISION */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-[#9481D5] to-[#806BBF] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col gap-3 text-white shadow-[0_10px_25px_rgba(128,107,191,0.25)] border border-white/10"
              >
                <h3 className="font-bebas font-bold text-2xl sm:text-3xl tracking-wide uppercase">
                  OUR VISION
                </h3>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-poppins font-light">
                  Our vision is to become a catalyst for innovation by creating technology that is intelligent, inclusive, and future-ready. We believe in pushing boundaries, embracing change, and building a smarter, more connected world.
                </p>
              </motion.div>

              {/* OUR MISSION */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-[#9481D5] to-[#806BBF] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col gap-3 text-white shadow-[0_10px_25px_rgba(128,107,191,0.25)] border border-white/10"
              >
                <h3 className="font-bebas font-bold text-2xl sm:text-3xl tracking-wide uppercase">
                  OUR MISSION
                </h3>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-poppins font-light">
                  Our mission is to create innovative digital experiences that solve real-world challenges through technology. We believe in building solutions that are intuitive, scalable, and impactful, while fostering a culture of creativity, collaboration, and continuous learning.
                </p>
              </motion.div>

              {/* Meet our Team */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-[#9481D5] to-[#806BBF] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-4 text-white shadow-[0_10px_25px_rgba(128,107,191,0.25)] border border-white/10 relative min-h-[190px]"
              >
                <div>
                  <h3 className="font-poppins font-extrabold text-xl sm:text-2xl tracking-wide text-white">
                    Meet our Team
                  </h3>
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-poppins font-light mt-3 pr-4 sm:pr-8">
                    Behind every successful initiative is a team driven by creativity, collaboration, and a shared vision. Our members bring together diverse skills and perspectives to transform ideas into impact experiences.
                  </p>
                </div>
                
                {/* Meet Team Button aligned to bottom right precisely */}
                <div className="flex justify-end mt-2">
                  <button
                    id="view-team-btn"
                    onClick={() => setIsTeamModalOpen(true)}
                    className="group bg-white hover:bg-zinc-100 text-black px-4 py-2 rounded-lg text-[11px] sm:text-xs font-bold font-poppins transition-all duration-200 cursor-pointer shadow-sm flex items-center gap-1 focus:outline-none"
                  >
                    Meet the Team
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>

            </div>

            {/* Right Column - tall card (What is IRIS, rotating seal) */}
            <div className="lg:col-span-5 h-full">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-[#9481D5] to-[#806BBF] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-white shadow-[0_10px_30px_rgba(128,107,191,0.25)] border border-white/10 h-full min-h-[460px] md:min-h-[500px]"
              >
                {/* Title */}
                <div>
                  <h3 className="font-poppins font-extrabold text-xl sm:text-2xl tracking-wide text-white">
                    What Is I.R.I.S?
                  </h3>
                </div>

                {/* Centered Rotating Circular Seal Logo matching the screenshot precisely */}
                <div className="my-8 flex items-center justify-center">
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
                    {/* Rotating text layer */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                      className="absolute inset-0"
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-300">
                        <path
                          id="aboutTextPath"
                          d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                          fill="none"
                        />
                        <text className="text-[5.5px] tracking-[0.11em] font-poppins font-extrabold uppercase fill-white/80">
                          <textPath href="#aboutTextPath" startOffset="0%">
                            INNOVATION • RESEARCH • INTELLIGENCE • SUPPORT •
                          </textPath>
                        </text>
                      </svg>
                    </motion.div>

                    {/* Central circular black seal with customized IRIS glyph details */}
                    <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.5)] border border-white/15 z-10">
                      <svg viewBox="0 0 100 100" className="w-16 h-16">
                        {/* Custom letters IR S */}
                        <text
                          x="32"
                          y="56"
                          className="fill-white font-extrabold font-poppins"
                          style={{ fontSize: '20px' }}
                        >
                          IR
                        </text>
                        {/* Custom Magnifying / S loop glyph resembling the screenshot */}
                        <path
                          d="M 68 45 A 9 9 0 1 0 68 63 A 9 9 0 1 0 68 45 Z"
                          fill="none"
                          stroke="white"
                          strokeWidth="3.5"
                        />
                        <path
                          d="M 68 63 L 78 73"
                          stroke="white"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bottom Paragraph & Button */}
                <div className="flex flex-col gap-4">
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-poppins font-light">
                    I.R.I.S (Innovation Research & Intelligence Support) is a tech club dedicated to fostering innovation and supporting research in the field of technology.
                  </p>
                  
                  {/* Know More Button aligned to bottom right precisely */}
                  <div className="flex justify-end">
                    <button
                      id="about-read-more-btn"
                      onClick={() => setIsReadMoreOpen(true)}
                      className="group bg-white hover:bg-zinc-100 text-black px-4 py-2 rounded-lg text-[11px] sm:text-xs font-bold font-poppins transition-all duration-200 cursor-pointer shadow-sm flex items-center gap-1 focus:outline-none"
                    >
                      Know More
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>

        </div>
      </div>

      {/* TEAM OVERLAY MODAL */}
      <AnimatePresence>
        {isTeamModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTeamModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-iris-purple/30 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                id="close-team-modal"
                onClick={() => setIsTeamModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <Users className="w-5 h-5 text-iris-purple" />
                <h3 className="font-poppins font-bold text-xl sm:text-2xl text-white tracking-wide uppercase">Core Research Cluster Leaders</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="bg-zinc-900/60 border border-white/5 p-4 rounded-xl flex flex-col justify-between hover:border-iris-purple/30 transition-all group">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-poppins font-semibold text-white group-hover:text-iris-purple transition-colors">{member.name}</span>
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-iris-purple/10 text-iris-purple border border-iris-purple/20">
                          {member.cluster}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 block mb-2">{member.role}</span>
                      <p className="text-xs text-gray-500 leading-relaxed font-poppins font-light">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                <button
                  id="close-team-modal-footer"
                  onClick={() => setIsTeamModalOpen(false)}
                  className="bg-iris-purple hover:bg-iris-purple/80 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* READ MORE OVERLAY MODAL */}
      <AnimatePresence>
        {isReadMoreOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReadMoreOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-iris-purple/30 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                id="close-read-modal"
                onClick={() => setIsReadMoreOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <Info className="w-5 h-5 text-iris-purple" />
                <h3 className="font-poppins font-bold text-xl sm:text-2xl text-white tracking-wide uppercase">Operational Framework of I.R.I.S.</h3>
              </div>

              <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-poppins font-light">
                <p>
                  Founded in 2024, the Innovation Research & Intelligence System (I.R.I.S.) functions as an advanced collaborative platform combining embedded physical machinery with high-level software clusters.
                </p>
                
                <div className="bg-zinc-900/60 border border-white/5 p-4 rounded-xl space-y-3">
                  <h4 className="font-poppins font-semibold text-white flex items-center gap-2 text-xs uppercase tracking-wider">
                    <HardDrive className="w-3.5 h-3.5 text-iris-purple" />
                    I. Hardware Fabrication cluster
                  </h4>
                  <p className="text-xs text-gray-400">
                    Designs custom physical chassis structures, mounts high-torque actuators, prints multilayer PCBs, and optimizes localized thermal heat dissipation meshes.
                  </p>
                </div>

                <div className="bg-zinc-900/60 border border-white/5 p-4 rounded-xl space-y-3">
                  <h4 className="font-poppins font-semibold text-white flex items-center gap-2 text-xs uppercase tracking-wider">
                    <Cpu className="w-3.5 h-3.5 text-iris-purple" />
                    II. Software & Embedded AI cluster
                  </h4>
                  <p className="text-xs text-gray-400">
                    Compiles low-latency ROS 2 navigation pipelines, optimizes quantized TensorFlow and PyTorch models on the edge, and structures low-level relational-neural databases.
                  </p>
                </div>

                <div className="bg-zinc-900/60 border border-white/5 p-4 rounded-xl space-y-3">
                  <h4 className="font-poppins font-semibold text-white flex items-center gap-2 text-xs uppercase tracking-wider">
                    <Terminal className="w-3.5 h-3.5 text-iris-purple" />
                    III. Flight Mechanics & Swarms cluster
                  </h4>
                  <p className="text-xs text-gray-400">
                    Develops optical flow tracking algorithms, coordinates PX4 flight control layers, and constructs localized RF-consensus swarming frameworks for dense obstacle environments.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                <button
                  id="close-read-modal-footer"
                  onClick={() => setIsReadMoreOpen(false)}
                  className="bg-iris-purple hover:bg-iris-purple/80 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer"
                >
                  Acknowledge
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
