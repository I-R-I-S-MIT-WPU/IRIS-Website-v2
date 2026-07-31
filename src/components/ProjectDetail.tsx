import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, User, Cpu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { INITIAL_PROJECTS } from '../types';
import { supabase } from '../lib/supabase';

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
  gallery?: string[];
  team_members?: string[];
}

interface MemberRow {
  id: string;
  name: string;
  position: string;
  domain: string;
  photo: string;
}

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectRow | null>(() => {
    const local = INITIAL_PROJECTS.find(p => p.id === id);
    if (local) return {
      id: local.id, title: local.title, short_description: local.shortDescription,
      full_description: local.fullDescription, category: local.category, tech_stack: local.techStack,
      status: local.status, lead: local.lead, image: local.image, gallery: [], team_members: [],
    };
    return null;
  });
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      supabase.from('projects').select('*').eq('id', id).single()
        .then(({ data }) => { if (data) setProject(data); });
    }
  }, [id]);

  useEffect(() => {
    if (project?.team_members?.length) {
      supabase.from('members').select('id, name, position, domain, photo')
        .in('id', project.team_members)
        .then(({ data }) => { if (data) setMembers(data); });
    }
  }, [project?.team_members]);

  if (!project) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-funnel font-bold text-4xl text-white mb-3">Project not found</h1>
          <Link to="/projects" className="text-iris-purple text-sm hover:underline">Back to projects</Link>
        </div>
      </section>
    );
  }

  const gallery = project.gallery?.filter(Boolean) || [];

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Hero */}
      <div className="relative w-full h-[350px] sm:h-[450px]">
        <img src={project.image} alt={project.title} referrerPolicy="no-referrer" className="w-full h-full object-cover brightness-[0.4]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" /> All Projects
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-semibold text-iris-purple uppercase tracking-widest bg-iris-purple/10 px-2.5 py-1 rounded-lg border border-iris-purple/20">
                {project.category}
              </span>
              <span className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-lg border ${
                project.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                project.status === 'Beta' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' :
                'text-gray-400 bg-white/5 border-white/10'
              }`}>
                {project.status}
              </span>
            </div>
            <h1 className="font-funnel font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 sm:px-12 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {/* Info bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 p-6 bg-zinc-900/60 border border-white/5 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-iris-purple/10 border border-iris-purple/20 flex items-center justify-center">
                <User className="w-5 h-5 text-iris-purple" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Project Lead</p>
                <p className="text-white text-sm font-medium">{project.lead}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-iris-purple/10 border border-iris-purple/20 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-iris-purple" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Category</p>
                <p className="text-white text-sm font-medium">{project.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-iris-purple/10 border border-iris-purple/20 flex items-center justify-center">
                <span className="text-iris-purple text-xs font-bold">{project.tech_stack.length}</span>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Technologies</p>
                <p className="text-white text-sm font-medium">{project.tech_stack.length} tools</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-12">
            <h2 className="font-funnel font-bold text-2xl text-white mb-4">Overview</h2>
            <p className="text-gray-400 text-base leading-relaxed mb-4">{project.short_description}</p>
            <div className="space-y-4">
              {project.full_description.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-300 text-sm leading-relaxed">{para}</p>
              ))}
            </div>
          </div>

          {/* Gallery */}
          {gallery.length > 0 && (
            <div className="mb-12">
              <h2 className="font-funnel font-bold text-2xl text-white mb-4">Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxIdx(idx)}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5 hover:border-iris-purple/30 transition-all cursor-pointer group"
                  >
                    <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Team Members */}
          {members.length > 0 && (
            <div className="mb-12">
              <h2 className="font-funnel font-bold text-2xl text-white mb-4">Team</h2>
              <div className="flex flex-wrap gap-4">
                {members.map(m => (
                  <Link
                    key={m.id}
                    to="/about"
                    className="flex items-center gap-3 bg-zinc-900/80 border border-white/5 hover:border-iris-purple/30 rounded-xl px-4 py-3 transition-all"
                  >
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} referrerPolicy="no-referrer" className="w-9 h-9 rounded-full object-cover" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">
                        {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                    <div>
                      <p className="text-white text-sm font-medium">{m.name}</p>
                      <p className="text-gray-500 text-xs">{m.position} &middot; {m.domain}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div className="mb-12">
            <h2 className="font-funnel font-bold text-2xl text-white mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.tech_stack.map(tech => (
                <span key={tech} className="bg-zinc-900 border border-white/10 text-gray-300 px-4 py-2.5 rounded-xl text-sm font-mono hover:border-iris-purple/30 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom nav */}
          <div className="pt-8 border-t border-white/10 pb-12">
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-iris-purple hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to all projects
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && gallery.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxIdx(null)} className="absolute inset-0 bg-black/95" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative z-10 max-w-4xl w-full mx-4">
              <button onClick={() => setLightboxIdx(null)} className="absolute -top-12 right-0 text-gray-400 hover:text-white cursor-pointer">
                <X className="w-6 h-6" />
              </button>
              <img src={gallery[lightboxIdx]} alt="" referrerPolicy="no-referrer" className="w-full max-h-[80vh] object-contain rounded-xl" />
              {gallery.length > 1 && (
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
                  <button
                    onClick={e => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + gallery.length) % gallery.length); }}
                    className="w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 cursor-pointer pointer-events-auto"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % gallery.length); }}
                    className="w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 cursor-pointer pointer-events-auto"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
              <p className="text-center text-gray-500 text-xs mt-3">{lightboxIdx + 1} / {gallery.length}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
