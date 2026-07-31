import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Linkedin, Github, Instagram, X, ExternalLink } from 'lucide-react';
import { MENTORS, MEMBERS, LOCATIONS, Member } from '../data/team';

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <section className="relative min-h-screen py-28 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[160px]" />
        <div className="absolute bottom-[20%] left-[-8%] w-[400px] h-[400px] rounded-full bg-violet-500/8 blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <p className="text-iris-purple text-xs font-semibold uppercase tracking-widest mb-3 font-sans">Who we are</p>
          <h1 className="font-funnel font-bold text-6xl sm:text-7xl text-white tracking-tight mb-6">About IRIS</h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-sans max-w-3xl">
            I.R.I.S (Innovation, Research, Intelligence & Support) is a student-run technical club at MIT-WPU, Pune. We work across robotics, AI/ML, avionics, full-stack engineering, and design — shipping real products, not just prototypes. Founded with the mission to bridge the gap between academic learning and real-world engineering, we've grown to 50+ members across multiple domains.
          </p>
        </motion.div>

        {/* Mentors */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-16">
          <h2 className="font-funnel font-bold text-3xl text-white mb-6">Our Mentors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {MENTORS.map(mentor => (
              <div key={mentor.id} className="bg-zinc-900/80 border border-white/5 rounded-2xl p-6 flex items-center gap-4">
                <img src={mentor.photo} alt={mentor.name} referrerPolicy="no-referrer" className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <p className="text-white font-semibold text-sm">{mentor.name}</p>
                  <p className="text-iris-purple text-xs font-medium">{mentor.title}</p>
                  <p className="text-gray-500 text-xs">{mentor.department}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Locations */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-16">
          <h2 className="font-funnel font-bold text-3xl text-white mb-6">Our Spaces</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {LOCATIONS.map(loc => (
              <div key={loc.name} className="bg-zinc-900/80 border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-iris-purple" />
                  <p className="text-white font-semibold text-sm">{loc.name}</p>
                </div>
                <p className="text-gray-400 text-sm mb-2">{loc.description}</p>
                <p className="text-gray-600 text-xs">{loc.building}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="font-funnel font-bold text-3xl text-white mb-6">The Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {MEMBERS.map(member => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="group bg-zinc-900/80 border border-white/5 hover:border-iris-purple/30 rounded-2xl p-5 text-center cursor-pointer transition-all"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3 group-hover:ring-2 group-hover:ring-iris-purple/50 transition-all"
                />
                <p className="text-white font-semibold text-sm mb-0.5">{member.name}</p>
                <p className="text-iris-purple text-xs font-medium mb-1">{member.position}</p>
                <p className="text-gray-600 text-[11px]">{member.domain}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Member detail modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-zinc-950 border border-white/10 rounded-2xl p-8 text-center z-10"
            >
              <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
              <img src={selectedMember.photo} alt={selectedMember.name} referrerPolicy="no-referrer" className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-1">{selectedMember.name}</h3>
              <p className="text-iris-purple text-sm font-medium mb-1">{selectedMember.position}</p>
              <p className="text-gray-500 text-xs mb-4">{selectedMember.domain}</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">{selectedMember.bio}</p>
              <div className="flex items-center justify-center gap-3">
                {selectedMember.linkedin && (
                  <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-iris-purple/40 transition-all">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {selectedMember.github && (
                  <a href={selectedMember.github} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-iris-purple/40 transition-all">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {selectedMember.instagram && (
                  <a href={selectedMember.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-iris-purple/40 transition-all">
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
