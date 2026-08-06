import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Linkedin, Github, Instagram, X } from "lucide-react";
import { getMembers, getMentors } from "../lib/db";
import {
  MENTORS as FALLBACK_MENTORS,
  MEMBERS as FALLBACK_MEMBERS,
  LOCATIONS,
} from "../data/team";

interface MemberRow {
  id: string;
  name: string;
  position: string;
  domain: string;
  photo: string;
  bio: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

interface MentorRow {
  id: string;
  name: string;
  title: string;
  department: string;
  photo: string;
}

export default function AboutPage() {
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [mentors, setMentors] = useState<MentorRow[]>([]);
  const [selectedMember, setSelectedMember] = useState<MemberRow | null>(null);

  const CORE_TEAM_POSITIONS = [
    "President",
    "Vice President",
    "Technical Lead",
    "Design Lead",
    "Hardware Lead",
    "Events Head",
    "Content Lead",
  ];

  const coreTeamMembers = members.filter(
    (member) =>
      member.domain?.toLowerCase() === "core" ||
      CORE_TEAM_POSITIONS.includes(member.position),
  );
  const nonCoreMembers = members.filter(
    (member) => !coreTeamMembers.includes(member),
  );
  const techMembers = nonCoreMembers.filter(
    (member) => member.domain?.toLowerCase() !== "non-tech",
  );
  const nonTechMembers = nonCoreMembers.filter(
    (member) => member.domain?.toLowerCase() === "non-tech",
  );

  useEffect(() => {
    getMembers(true)
      .then((data) => {
        if (data?.length) {
          setMembers(data);
        } else {
          setMembers(FALLBACK_MEMBERS);
        }
      })
      .catch(() => {
        setMembers(FALLBACK_MEMBERS);
      });

    getMentors(true)
      .then((data) => {
        if (data?.length) {
          setMentors(data);
        } else {
          setMentors(FALLBACK_MENTORS);
        }
      })
      .catch(() => {
        setMentors(FALLBACK_MENTORS);
      });
  }, []);

  return (
    <section className='relative min-h-screen py-28 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden'>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[160px]' />
        <div className='absolute bottom-[20%] left-[-8%] w-[400px] h-[400px] rounded-full bg-violet-500/8 blur-[130px]' />
      </div>

      <div className='max-w-6xl mx-auto relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-16'>
          <p className='text-iris-purple text-xs font-semibold uppercase tracking-widest mb-3 font-sans'>
            Who we are
          </p>
          <h1 className='font-funnel font-bold text-6xl sm:text-7xl text-white tracking-tight mb-6'>
            About IRIS
          </h1>
          <p className='text-gray-400 text-base sm:text-lg leading-relaxed font-sans max-w-3xl'>
            I.R.I.S (Innovation, Research, Intelligence & Support) is a
            student-run technical club at MIT-WPU, Pune. We work across
            robotics, AI/ML, avionics, full-stack engineering, and design —
            shipping real products, not just prototypes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='mb-16'>
          <h2 className='font-funnel font-bold text-3xl text-white mb-6'>
            Our Mentors
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className='bg-zinc-900/80 border border-white/5 rounded-2xl p-6 flex items-center gap-4'>
                <img
                  src={mentor.photo}
                  alt={mentor.name}
                  referrerPolicy='no-referrer'
                  className='w-14 h-14 rounded-full object-cover'
                />
                <div>
                  <p className='text-white font-semibold text-sm'>
                    {mentor.name}
                  </p>
                  <p className='text-iris-purple text-xs font-medium'>
                    {mentor.title}
                  </p>
                  <p className='text-gray-500 text-xs'>{mentor.department}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          <h2 className='font-funnel font-bold text-3xl text-white mb-6'>
            Core Team
          </h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5'>
            {coreTeamMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className='group bg-zinc-900/80 border border-white/5 hover:border-iris-purple/30 rounded-2xl p-5 text-center cursor-pointer transition-all'>
                <img
                  src={member.photo}
                  alt={member.name}
                  referrerPolicy='no-referrer'
                  className='w-20 h-20 rounded-full object-cover mx-auto mb-3 group-hover:ring-2 group-hover:ring-iris-purple/50 transition-all'
                />
                <p className='text-white font-semibold text-sm mb-0.5'>
                  {member.name}
                </p>
                <p className='text-iris-purple text-xs font-medium mb-1'>
                  {member.position}
                </p>
                <p className='text-gray-600 text-[11px]'>{member.domain}</p>
              </div>
            ))}
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12'>
            <div>
              <h3 className='font-funnel font-bold text-2xl text-white mb-5'>
                Tech
              </h3>
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5'>
                {techMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className='group bg-zinc-900/80 border border-white/5 hover:border-iris-purple/30 rounded-2xl p-5 text-center cursor-pointer transition-all'>
                    <img
                      src={member.photo}
                      alt={member.name}
                      referrerPolicy='no-referrer'
                      className='w-20 h-20 rounded-full object-cover mx-auto mb-3 group-hover:ring-2 group-hover:ring-iris-purple/50 transition-all'
                    />
                    <p className='text-white font-semibold text-sm mb-0.5'>
                      {member.name}
                    </p>
                    <p className='text-iris-purple text-xs font-medium mb-1'>
                      {member.position}
                    </p>
                    <p className='text-gray-600 text-[11px]'>{member.domain}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className='font-funnel font-bold text-2xl text-white mb-5'>
                Non Tech
              </h3>
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5'>
                {nonTechMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className='group bg-zinc-900/80 border border-white/5 hover:border-iris-purple/30 rounded-2xl p-5 text-center cursor-pointer transition-all'>
                    <img
                      src={member.photo}
                      alt={member.name}
                      referrerPolicy='no-referrer'
                      className='w-20 h-20 rounded-full object-cover mx-auto mb-3 group-hover:ring-2 group-hover:ring-iris-purple/50 transition-all'
                    />
                    <p className='text-white font-semibold text-sm mb-0.5'>
                      {member.name}
                    </p>
                    <p className='text-iris-purple text-xs font-medium mb-1'>
                      {member.position}
                    </p>
                    <p className='text-gray-600 text-[11px]'>{member.domain}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className='absolute inset-0 bg-black/80 backdrop-blur-sm'
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className='relative w-full max-w-sm bg-zinc-950 border border-white/10 rounded-2xl p-8 text-center z-10'>
              <button
                onClick={() => setSelectedMember(null)}
                className='absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer'>
                <X className='w-5 h-5' />
              </button>
              <img
                src={selectedMember.photo}
                alt={selectedMember.name}
                referrerPolicy='no-referrer'
                className='w-24 h-24 rounded-full object-cover mx-auto mb-4'
              />
              <h3 className='text-white font-bold text-xl mb-1'>
                {selectedMember.name}
              </h3>
              <p className='text-iris-purple text-sm font-medium mb-1'>
                {selectedMember.position}
              </p>
              <p className='text-gray-500 text-xs mb-4'>
                {selectedMember.domain}
              </p>
              <p className='text-gray-300 text-sm leading-relaxed mb-6'>
                {selectedMember.bio}
              </p>
              <div className='flex items-center justify-center gap-3'>
                {selectedMember.linkedin && (
                  <a
                    href={selectedMember.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-iris-purple/40 transition-all'>
                    <Linkedin className='w-4 h-4' />
                  </a>
                )}
                {selectedMember.github && (
                  <a
                    href={selectedMember.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-iris-purple/40 transition-all'>
                    <Github className='w-4 h-4' />
                  </a>
                )}
                {selectedMember.instagram && (
                  <a
                    href={selectedMember.instagram}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-iris-purple/40 transition-all'>
                    <Instagram className='w-4 h-4' />
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
