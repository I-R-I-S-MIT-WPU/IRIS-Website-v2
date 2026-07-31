import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ChevronRight } from 'lucide-react';
import { INITIAL_PROJECTS, Project } from '../types';

const projectImages: Record<string, string> = {
  soteria: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?q=80&w=800&auto=format&fit=crop',
  vyas: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop',
  tarzan: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop',
};

export default function ProjectsPage() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section className="relative min-h-screen py-28 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[160px]" />
        <div className="absolute bottom-[10%] right-[-8%] w-[400px] h-[400px] rounded-full bg-fuchsia-500/8 blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="text-iris-purple text-xs font-semibold uppercase tracking-widest mb-3 font-sans">What we build</p>
          <h1 className="font-funnel font-bold text-6xl sm:text-7xl text-white tracking-tight mb-4">Projects</h1>
          <p className="text-gray-400 text-base font-sans max-w-2xl">
            From autonomous drones to AI-powered security systems, here's what we're building.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INITIAL_PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => setSelected(project)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-iris-purple/20 transition-all ${
                idx === 0 ? 'md:col-span-2 h-[380px]' : 'h-[300px]'
              }`}
            >
              <img
                src={projectImages[project.id] || projectImages.soteria}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover brightness-[0.3] group-hover:brightness-[0.4] group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] font-semibold text-iris-purple uppercase tracking-widest bg-iris-purple/10 px-2.5 py-1 rounded-lg border border-iris-purple/20">
                    {project.category}
                  </span>
                  <span className="text-[11px] text-gray-400 uppercase">{project.status}</span>
                </div>
                <h3 className="font-funnel font-bold text-3xl text-white mb-2 group-hover:text-iris-purple transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-2xl line-clamp-2">{project.shortDescription}</p>
                <div className="flex items-center gap-2 mt-4">
                  {project.techStack.slice(0, 4).map(tech => (
                    <span key={tech} className="text-[10px] text-gray-400 bg-white/5 border border-white/10 px-2 py-1 rounded font-mono">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="absolute inset-0 bg-black/85 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl p-8 z-10 max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
              <div className="mb-6">
                <span className="text-xs text-iris-purple font-semibold uppercase tracking-widest">{selected.category}</span>
                <h3 className="font-funnel font-bold text-3xl text-white mt-1">{selected.title}</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">{selected.fullDescription}</p>
              <div className="mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {selected.techStack.map(tech => (
                    <span key={tech} className="bg-zinc-900 border border-white/5 text-gray-400 px-3 py-1.5 rounded-lg text-xs font-mono">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Lead</p>
                  <p className="text-white text-sm font-medium mt-0.5">{selected.lead}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Status</p>
                  <p className="text-white text-sm font-medium mt-0.5">{selected.status}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
