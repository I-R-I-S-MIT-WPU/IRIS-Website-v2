import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import WritersHub from './components/WritersHub';
import Projects from './components/Projects';
import Events from './components/Events';
import JoinUs from './components/JoinUs';
import Recruitments from './components/Recruitments';
import BlogsPage from './components/BlogsPage';
import BlogPost from './components/BlogPost';
import AboutPage from './components/AboutPage';
import ProjectsPage from './components/ProjectsPage';
import ResearchPage from './components/ResearchPage';
import EventsPage from './components/EventsPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { Project, INITIAL_PROJECTS } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Database, Drone, Cpu, ArrowUpRight } from 'lucide-react';

function HomePage() {
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [detailedProject, setDetailedProject] = useState<Project | null>(null);

  const handleScrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'soteria': return <ShieldCheck className="w-5 h-5 text-iris-purple" />;
      case 'vyas': return <Database className="w-5 h-5 text-iris-purple" />;
      case 'tarzan': return <Drone className="w-5 h-5 text-iris-purple" />;
      default: return <Cpu className="w-5 h-5 text-iris-purple" />;
    }
  };

  return (
    <>
      <Navbar
        onScrollToSection={handleScrollToSection}
        onOpenProjects={() => setIsProjectsModalOpen(true)}
      />
      <Hero onJoinClick={() => handleScrollToSection('join-us-section')} />
      <AboutUs />
      <WritersHub />
      <Projects />
      <Events />
      <JoinUs />
      <Footer
        onScrollToSection={handleScrollToSection}
        onOpenProjects={() => setIsProjectsModalOpen(true)}
      />

      <AnimatePresence>
        {isProjectsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProjectsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-iris-purple/30 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsProjectsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-left mb-6 border-b border-white/5 pb-4">
                <span className="font-mono text-[9px] text-iris-purple font-bold tracking-[0.2em] uppercase block mb-1">
                  CORE_DATABASE_STACK // ALL_ONGOING_PROJECTS
                </span>
                <h3 className="font-display font-bold text-xl sm:text-3xl text-white tracking-wide uppercase">
                  ACTIVE RESEARCH STACKS
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INITIAL_PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => setDetailedProject(proj)}
                    className="bg-zinc-900/40 border border-white/5 hover:border-iris-purple/40 p-5 rounded-xl flex flex-col justify-between group cursor-pointer transition-all hover:shadow-[0_4px_20px_rgba(144,97,249,0.1)] text-left"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-zinc-950 border border-white/5 rounded-lg group-hover:border-iris-purple/40 transition-colors">
                          {getProjectIcon(proj.id)}
                        </div>
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-iris-purple/10 text-iris-purple font-semibold border border-iris-purple/20">
                          {proj.status}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-lg text-white mb-2 tracking-wide group-hover:text-iris-purple transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed font-sans line-clamp-3 mb-4">
                        {proj.shortDescription}
                      </p>
                    </div>
                    <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[10px] font-mono text-gray-500">
                      <span>LEAD: {proj.lead}</span>
                      <span className="text-iris-purple font-bold flex items-center gap-1 group-hover:text-white transition-colors">
                        Specs
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setIsProjectsModalOpen(false)}
                  className="bg-iris-purple hover:bg-iris-purple/80 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                  Close Archive
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {detailedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-iris-purple/30 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setDetailedProject(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-iris-purple/15 border border-iris-purple/30 rounded-xl">
                    {getProjectIcon(detailedProject.id)}
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-iris-purple font-bold uppercase tracking-[0.2em] block mb-0.5">
                      {detailedProject.category} // ARCHIVE_DIAGNOSTICS
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-wide">
                      {detailedProject.title}
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-xs font-semibold px-3 py-1 rounded bg-zinc-900 text-white border border-white/10 uppercase self-start sm:self-center">
                  {detailedProject.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
                <div className="md:col-span-7 space-y-4">
                  <h4 className="font-display font-semibold text-white uppercase text-xs tracking-wider">I. Architectural Overview</h4>
                  <p className="text-gray-300 text-sm leading-relaxed font-sans">{detailedProject.fullDescription}</p>
                  <h4 className="font-display font-semibold text-white uppercase text-xs tracking-wider pt-2">II. Tech Stack Integration</h4>
                  <div className="flex flex-wrap gap-2">
                    {detailedProject.techStack.map((tech) => (
                      <span key={tech} className="bg-zinc-900 border border-white/5 text-gray-400 px-3 py-1.5 rounded-lg text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-5 space-y-4 bg-zinc-900/60 border border-white/5 rounded-xl p-4 sm:p-5 font-mono text-xs">
                  <h4 className="font-display font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2">
                    System Parameters
                  </h4>
                  <div className="space-y-2.5 text-gray-400">
                    <div className="flex justify-between"><span>Lead Architect:</span><span className="text-white font-medium">{detailedProject.lead}</span></div>
                    <div className="flex justify-between"><span>Engine Core:</span><span className="text-white">v2.4.9 Stable</span></div>
                    <div className="flex justify-between"><span>Thread Sched:</span><span className="text-white">Low Latency POSIX</span></div>
                    <div className="flex justify-between"><span>Security Grade:</span><span className="text-iris-purple font-semibold">Military Mesh S3</span></div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-zinc-500 leading-snug space-y-1">
                    <p className="text-iris-purple font-bold"># DIAGNOSTIC LOGS_ACTIVE</p>
                    <p>&gt; sys_init: kernel compiled successfully.</p>
                    <p>&gt; core_temp: 34.2 C (Passive cool active)</p>
                    <p>&gt; network_latency: 0.14ms avg mesh peer</p>
                    <p>&gt; status: listening on port 3000</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setDetailedProject(null)}
                  className="bg-iris-purple hover:bg-iris-purple/80 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                  Return to Archive
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const handleScrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Navbar onScrollToSection={handleScrollToSection} onOpenProjects={() => {}} />
      <div className="pt-24">{children}</div>
      <Footer onScrollToSection={handleScrollToSection} onOpenProjects={() => {}} />
    </>
  );
}

function BlogListPage() {
  const handleScrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Navbar onScrollToSection={handleScrollToSection} onOpenProjects={() => {}} />
      <div className="pt-24">
        <BlogsPage />
      </div>
      <Footer onScrollToSection={handleScrollToSection} onOpenProjects={() => {}} />
    </>
  );
}

function BlogDetailPage() {
  const handleScrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Navbar onScrollToSection={handleScrollToSection} onOpenProjects={() => {}} />
      <BlogPost />
      <Footer onScrollToSection={handleScrollToSection} onOpenProjects={() => {}} />
    </>
  );
}

function RecruitmentPage() {
  const handleScrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Navbar
        onScrollToSection={handleScrollToSection}
        onOpenProjects={() => {}}
      />
      <div className="pt-24">
        <Recruitments />
      </div>
      <Footer
        onScrollToSection={handleScrollToSection}
        onOpenProjects={() => {}}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div id="iris-app-root" className="min-h-screen bg-black text-white selection:bg-iris-purple/30 selection:text-white relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recruitment" element={<RecruitmentPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
          <Route path="/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
          <Route path="/research" element={<PageWrapper><ResearchPage /></PageWrapper>} />
          <Route path="/events" element={<PageWrapper><EventsPage /></PageWrapper>} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
