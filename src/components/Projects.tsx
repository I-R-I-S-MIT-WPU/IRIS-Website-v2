import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Database, Drone, X, Cpu, ChevronRight } from 'lucide-react';
import { Project, INITIAL_PROJECTS } from '../types';

interface ProjectsProps {
  isOpenDirectly?: boolean;
  onCloseDirectly?: () => void;
}

export default function Projects({ isOpenDirectly = false, onCloseDirectly }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'soteria': return <ShieldCheck className="w-5 h-5 text-iris-purple" />;
      case 'vyas': return <Database className="w-5 h-5 text-iris-purple" />;
      case 'tarzan': return <Drone className="w-5 h-5 text-iris-purple" />;
      default: return <Cpu className="w-5 h-5 text-iris-purple" />;
    }
  };

  const projectImages: Record<string, string> = {
    soteria: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?q=80&w=1000&auto=format&fit=crop',
    vyas: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop',
    tarzan: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop',
  };

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-700/8 blur-[160px]" />
        <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-fuchsia-600/5 blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-iris-purple text-xs font-semibold uppercase tracking-widest mb-4 font-sans">What we build</p>
          <h2 className="font-funnel font-bold text-5xl sm:text-6xl md:text-7xl text-white tracking-tight">
            Projects
          </h2>
        </motion.div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {INITIAL_PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-white/5 hover:border-iris-purple/20 transition-all ${
                idx === 0 ? 'lg:col-span-2 h-[400px]' : 'h-[320px]'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={projectImages[project.id] || projectImages.soteria}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-[0.3] group-hover:brightness-[0.4] group-hover:scale-105 transition-all duration-700"
                />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 sm:p-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-semibold text-iris-purple uppercase tracking-widest font-sans bg-iris-purple/10 px-2.5 py-1 rounded-lg border border-iris-purple/20">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider font-sans">
                    {project.status}
                  </span>
                </div>

                <h3 className="font-funnel font-bold text-3xl sm:text-4xl text-white mb-3 group-hover:text-iris-purple transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed font-sans max-w-2xl line-clamp-2">
                  {project.fullDescription}
                </p>

                <div className="flex items-center justify-between mt-5">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] text-gray-400 bg-white/5 border border-white/10 px-2 py-1 rounded font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-white group-hover:text-iris-purple transition-colors">
                    Details <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
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
              className="relative w-full max-w-3xl bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 max-h-[92vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-iris-purple/15 border border-iris-purple/30 rounded-xl">
                  {getProjectIcon(selectedProject.id)}
                </div>
                <div>
                  <span className="text-[10px] text-iris-purple font-semibold uppercase tracking-widest font-sans">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-funnel font-bold text-2xl sm:text-3xl text-white">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="space-y-6">
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  {selectedProject.fullDescription}
                </p>

                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span key={tech} className="bg-zinc-900 border border-white/5 text-gray-400 px-3 py-1.5 rounded-lg text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Lead</span>
                    <p className="text-white text-sm font-medium mt-0.5">{selectedProject.lead}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Status</span>
                    <p className="text-white text-sm font-medium mt-0.5">{selectedProject.status}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
