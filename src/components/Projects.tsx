import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Database, Drone, X, Terminal, Cpu, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { Project, INITIAL_PROJECTS } from '../types';

interface ProjectsProps {
  isOpenDirectly?: boolean;
  onCloseDirectly?: () => void;
}

export default function Projects({ isOpenDirectly = false, onCloseDirectly }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // We can map project ID to corresponding lucide icons
  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'soteria':
        return <ShieldCheck className="w-5 h-5 text-iris-purple" />;
      case 'vyas':
        return <Database className="w-5 h-5 text-iris-purple" />;
      case 'tarzan':
        return <Drone className="w-5 h-5 text-iris-purple" />;
      default:
        return <Cpu className="w-5 h-5 text-iris-purple" />;
    }
  };

  const SOTERIA_DESC = "This paper presents a multi-task reinforcement learning framework optimized for bipedal robotics locomotion. Presenting a reward-shaping formulation based on dynamic phase-space planners, the agent synthesizes robust walking gaits across granular, slippery, and uneven terrains. Rigorous experimental verification yields a 42% decrease in balance loss compared to isolated-task baseline agents.";
  
  const VYAS_DESC = "This paper presents a multi-task reinforcement learning framework optimized for bipedal robotics locomotion. Presenting a reward-shaping formulation based on dynamic phase-space planners.";
  
  const TARZAN_DESC = "This paper presents a multi-task reinforcement learning framework optimized for bipedal robotics locomotion. Presenting a reward-shaping formulation based on dynamic phase-space planners.";

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden">
      {/* Background subtle elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[30%] left-[40%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-iris-purple/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Bento Frame with White to Light Lavender Gradient */}
        <div className="bg-gradient-to-b from-white via-[#E2E1F8] to-[#CBC9EE] rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 md:p-14 shadow-[0_24px_65px_rgba(0,0,0,0.35)] text-zinc-900 border border-white/20">
          
          {/* Main Title - OUR PROJECTS using Hanson Font */}
          <div className="text-left mb-10 md:mb-12">
            <motion.h2
              id="projects-title"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-hanson font-bold text-4xl sm:text-5xl md:text-6xl tracking-[0.06em] text-black uppercase"
            >
              OUR PROJECTS
            </motion.h2>
            <p className="text-zinc-800 text-xs sm:text-sm md:text-base leading-relaxed font-poppins font-light mt-3">
              Inspect our active code reserves, physical designs,<br className="hidden sm:inline" />and cyber-physical machinery prototypes.
            </p>
          </div>

          {/* Bento Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Column - SOTERIA (Large Featured Project, occupies 7 columns) */}
            <motion.div
              id="soteria-card-container"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 flex flex-col justify-between"
            >
              {INITIAL_PROJECTS.filter(p => p.id === 'soteria').map((project) => (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  className="group relative h-[480px] sm:h-[520px] lg:h-full rounded-3xl overflow-hidden bg-black flex flex-col justify-end p-6 sm:p-8 md:p-10 shadow-[0_12px_35px_rgba(0,0,0,0.25)] border border-white/10 hover:border-white/20 hover:shadow-[0_20px_45px_rgba(144,97,249,0.15)] transition-all duration-500 cursor-pointer"
                >
                  {/* Background Full Cover Image (Crocodile head) */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src="https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?q=80&w=1000&auto=format&fit=crop"
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale brightness-50 contrast-[1.1] transition-transform duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                    {/* Glowing neon green & orange effects to match the reference image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-orange-500/20 mix-blend-screen pointer-events-none" />
                    <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-[80px] mix-blend-color-dodge pointer-events-none" />
                    
                    {/* Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                  </div>

                  {/* Faded background quote overlay: "never prayed on my downfall" */}
                  <div className="absolute left-6 sm:left-8 md:left-10 bottom-[220px] select-none opacity-[0.22] pointer-events-none z-10 font-serif text-2xl sm:text-3xl md:text-[36px] font-semibold tracking-wider text-white text-left lowercase leading-tight">
                    never prayed on my<br />downfall
                  </div>

                  {/* Content Container (z-20 relative) */}
                  <div className="relative z-20 text-left">
                    {/* SOTERIA Title with faded II next to it */}
                    <h3 className="font-hanson font-bold text-3xl sm:text-4xl text-white tracking-wide uppercase mb-4 flex items-baseline gap-2">
                      SOTERIA <span className="text-white/40 font-bold">II</span>
                    </h3>
                    
                    {/* SOTERIA Exact Description from the image */}
                    <p className="text-white/90 text-xs leading-relaxed font-poppins font-light mb-6 max-w-xl">
                      {SOTERIA_DESC}
                    </p>

                    {/* Capsule See More button at bottom-right */}
                    <div className="flex justify-end">
                      <button
                        id="soteria-see-more-btn"
                        className="group/btn bg-white hover:bg-zinc-100 text-black px-5 py-2.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 shadow-md cursor-pointer focus:outline-none"
                      >
                        See More
                        <ChevronRight className="w-3.5 h-3.5 text-black group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Right Column - VYAS & TARZAN (Two Stacked Smaller Cards, occupies 5 columns) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* VYAS PROJECT */}
              {INITIAL_PROJECTS.filter(p => p.id === 'vyas').map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative h-[218px] sm:h-[238px] lg:h-1/2 rounded-3xl overflow-hidden bg-zinc-950 flex flex-col justify-end p-6 sm:p-8 shadow-[0_12px_35px_rgba(0,0,0,0.25)] border border-white/10 hover:border-white/20 hover:shadow-[0_20px_45px_rgba(144,97,249,0.15)] transition-all duration-500 cursor-pointer"
                >
                  {/* Subtle red spotlight glow overlay and grain texture */}
                  <div className="absolute inset-0 z-0">
                    {/* Deep red/charcoal paper texture feel */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#141216] via-[#1C1820] to-[#2E181C]" />
                    <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-rose-500/10 blur-[50px] mix-blend-color-dodge pointer-events-none" />
                    
                    {/* Horizontal split overlay effect */}
                    <div className="absolute inset-0 bg-black/40" />
                  </div>

                  {/* Content Container (z-10 relative) */}
                  <div className="relative z-10 text-left">
                    {/* Title */}
                    <h3 className="font-hanson font-bold text-2xl sm:text-3xl text-white tracking-wide uppercase mb-3">
                      {project.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/80 text-[11px] leading-relaxed font-poppins font-light mb-4 max-w-md">
                      {VYAS_DESC}
                    </p>

                    {/* Capsule See More button at bottom-right */}
                    <div className="flex justify-end">
                      <button
                        id="vyas-see-more-btn"
                        className="group/btn bg-white hover:bg-zinc-100 text-black px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 shadow-md cursor-pointer focus:outline-none"
                      >
                        See More
                        <ChevronRight className="w-3 h-3 text-black group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* TARZAN PROJECT */}
              {INITIAL_PROJECTS.filter(p => p.id === 'tarzan').map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative h-[218px] sm:h-[238px] lg:h-1/2 rounded-3xl overflow-hidden bg-black flex flex-col justify-end p-6 sm:p-8 shadow-[0_12px_35px_rgba(0,0,0,0.25)] border border-white/10 hover:border-white/20 hover:shadow-[0_20px_45px_rgba(144,97,249,0.15)] transition-all duration-500 cursor-pointer"
                >
                  {/* Background Full Cover Image (Sunset multi-copters/lines) */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=800&auto=format&fit=crop"
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale brightness-50 contrast-125 transition-transform duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                    {/* Warm orange dawn lighting overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                    <div className="absolute inset-0 bg-orange-950/20 mix-blend-color-dodge opacity-60 z-10" />
                  </div>

                  {/* Content Container (z-10 relative) */}
                  <div className="relative z-10 text-left">
                    {/* Title */}
                    <h3 className="font-hanson font-bold text-2xl sm:text-3xl text-white tracking-wide uppercase mb-3">
                      {project.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/80 text-[11px] leading-relaxed font-poppins font-light mb-4 max-w-md">
                      {TARZAN_DESC}
                    </p>

                    {/* Capsule See More button at bottom-right */}
                    <div className="flex justify-end">
                      <button
                        id="tarzan-see-more-btn"
                        className="group/btn bg-white hover:bg-zinc-100 text-black px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 shadow-md cursor-pointer focus:outline-none"
                      >
                        See More
                        <ChevronRight className="w-3 h-3 text-black group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

            </div>

          </div>

          {/* Centered Black Pill Action Button - More Projects From IRIS > */}
          <div className="flex justify-center mt-10 sm:mt-12">
            <button
              onClick={() => {
                const target = document.getElementById('events');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-2.5 bg-black hover:bg-zinc-900 text-white px-7 py-3.5 rounded-full text-xs font-extrabold tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.25)] hover:scale-[1.02] cursor-pointer focus:outline-none font-poppins"
            >
              More Projects From IRIS
              <ChevronRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {/* DETAILED PROJECT SPECIFICATIONS MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-zinc-950 border border-iris-purple/30 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 max-h-[92vh] overflow-y-auto flex flex-col"
            >
              {/* Close Button */}
              <button
                id="close-project-modal"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer z-20"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header block */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-iris-purple/15 border border-iris-purple/30 rounded-xl">
                    {getProjectIcon(selectedProject.id)}
                  </div>
                  <div className="text-left">
                    <span className="font-mono text-[9px] text-iris-purple font-bold uppercase tracking-[0.2em] block mb-0.5">
                      {selectedProject.category}
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-wide">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-gray-400">Status:</span>
                  <span className="font-mono text-xs font-semibold px-3 py-1 rounded bg-zinc-900 text-white border border-white/10 uppercase">
                    {selectedProject.status}
                  </span>
                </div>
              </div>

              {/* Main Content Body inside Modal */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
                {/* Details Section */}
                <div className="md:col-span-7 space-y-4">
                  <h4 className="font-display font-semibold text-white uppercase text-xs tracking-wider">I. Architectural Overview</h4>
                  <p className="text-gray-300 text-sm leading-relaxed font-sans">{selectedProject.fullDescription}</p>
                  
                  <h4 className="font-display font-semibold text-white uppercase text-xs tracking-wider pt-2">II. Tech Stack Integration</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span key={tech} className="bg-zinc-900 border border-white/5 text-gray-400 px-3 py-1.5 rounded-lg text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specs / Meta Sidebar */}
                <div className="md:col-span-5 space-y-4 bg-zinc-900/60 border border-white/5 rounded-xl p-4 sm:p-5 font-mono text-xs">
                  <h4 className="font-display font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2">
                    System Parameters
                  </h4>
                  <div className="space-y-2.5 text-gray-400">
                    <div className="flex justify-between">
                      <span>Lead Architect:</span>
                      <span className="text-white font-medium">{selectedProject.lead}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Engine Core:</span>
                      <span className="text-white">v2.4.9 Stable</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thread Sched:</span>
                      <span className="text-white">Low Latency POSIX</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security Grade:</span>
                      <span className="text-iris-purple font-semibold">Military Mesh S3</span>
                    </div>
                  </div>

                  {/* Clean project progress grid */}
                  <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-zinc-400 leading-snug space-y-1.5">
                    <p className="text-iris-purple font-bold tracking-wide uppercase font-display mb-1">Development Milestones</p>
                    <div className="flex justify-between items-center text-[10px]">
                      <span>Phases Completed:</span>
                      <span className="text-white">4 of 5</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span>Next Assessment:</span>
                      <span className="text-white">Q3 Review</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span>Distribution:</span>
                      <span className="text-white">Open Source Core</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close footer button */}
              <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
                <button
                  id="close-project-modal-footer"
                  onClick={() => setSelectedProject(null)}
                  className="bg-iris-purple hover:bg-iris-purple/80 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
