import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { INITIAL_PROJECTS } from '../types';
import { getProjects } from '../lib/db';

interface ProjectRow {
  id: string;
  title: string;
  short_description: string;
  full_description: string;
  category: string;
  tech_stack: string[];
  status: string;
  lead: string;
  image: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);

  useEffect(() => {
    getProjects(true).then((data: ProjectRow[]) => {
      if (data?.length) {
        setProjects(data);
      } else {
        setProjects(INITIAL_PROJECTS.map(p => ({
          id: p.id, title: p.title, short_description: p.shortDescription, full_description: p.fullDescription,
          category: p.category, tech_stack: p.techStack, status: p.status, lead: p.lead, image: p.image,
        })));
      }
    }).catch(() => {
      setProjects(INITIAL_PROJECTS.map(p => ({
        id: p.id, title: p.title, short_description: p.shortDescription, full_description: p.fullDescription,
        category: p.category, tech_stack: p.techStack, status: p.status, lead: p.lead, image: p.image,
      })));
    });
  }, []);

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
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={idx === 0 ? 'md:col-span-2' : ''}
            >
              <Link
                to={`/projects/${project.id}`}
                className={`group relative rounded-2xl overflow-hidden block border border-white/5 hover:border-iris-purple/20 transition-all ${
                  idx === 0 ? 'h-[380px]' : 'h-[300px]'
                }`}
              >
                <img
                  src={project.image}
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
                  <p className="text-gray-300 text-sm leading-relaxed max-w-2xl line-clamp-2">{project.short_description}</p>
                  <div className="flex items-center gap-2 mt-4">
                    {project.tech_stack.slice(0, 4).map(tech => (
                      <span key={tech} className="text-[10px] text-gray-400 bg-white/5 border border-white/10 px-2 py-1 rounded font-mono">{tech}</span>
                    ))}
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
