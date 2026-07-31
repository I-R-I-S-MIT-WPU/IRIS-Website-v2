import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Database, Drone, Cpu, ChevronRight } from 'lucide-react';
import { Project, INITIAL_PROJECTS } from '../types';
import { getProjects } from '../lib/db';

interface ProjectsProps {
  isOpenDirectly?: boolean;
  onCloseDirectly?: () => void;
}

export default function Projects({ isOpenDirectly = false, onCloseDirectly }: ProjectsProps) {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

  useEffect(() => {
    getProjects(true).then((data: any[]) => {
      if (data?.length) {
        setProjects(data.map(p => ({
          id: p.id,
          title: p.title,
          subtitle: '',
          shortDescription: p.short_description,
          fullDescription: p.full_description,
          image: p.image,
          category: p.category,
          techStack: p.tech_stack,
          status: p.status,
          lead: p.lead,
        })));
      }
    }).catch(() => {});
  }, []);

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
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={idx === 0 ? 'lg:col-span-2' : ''}
            >
              <Link
                to={`/projects/${project.id}`}
                className={`group relative rounded-3xl overflow-hidden block border border-white/5 hover:border-iris-purple/20 transition-all ${
                  idx === 0 ? 'h-[400px]' : 'h-[320px]'
                }`}
              >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={project.image}
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
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
