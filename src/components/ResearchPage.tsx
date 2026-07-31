import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { BLOGS } from '../data/blogs';

export default function ResearchPage() {
  const tags = [...new Set(BLOGS.map(b => b.tag))];

  return (
    <section className="relative min-h-screen py-28 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[160px]" />
        <div className="absolute bottom-[15%] right-[-8%] w-[400px] h-[400px] rounded-full bg-purple-500/8 blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <p className="text-iris-purple text-xs font-semibold uppercase tracking-widest mb-3 font-sans">Publications & Papers</p>
          <h1 className="font-funnel font-bold text-6xl sm:text-7xl text-white tracking-tight mb-4">Research</h1>
          <p className="text-gray-400 text-base font-sans max-w-2xl">
            Our members publish research across AI, robotics, avionics, and systems engineering. Read our latest work below.
          </p>
        </motion.div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map(tag => (
            <span key={tag} className="text-xs font-medium text-iris-purple bg-iris-purple/10 border border-iris-purple/20 px-3 py-1.5 rounded-lg">
              {tag}
            </span>
          ))}
        </div>

        {/* Papers list */}
        <div className="space-y-6">
          {BLOGS.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
            >
              <Link
                to={`/blog/${blog.id}`}
                className="group flex flex-col sm:flex-row gap-6 bg-zinc-900/60 border border-white/5 hover:border-iris-purple/20 rounded-2xl p-6 transition-all"
              >
                <div className="sm:w-48 h-32 sm:h-auto rounded-xl overflow-hidden shrink-0">
                  <img src={blog.image} alt={blog.title} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-center flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] font-semibold text-iris-purple uppercase tracking-widest">{blog.tag}</span>
                    <span className="text-zinc-600 text-xs">•</span>
                    <span className="text-zinc-500 text-xs">{blog.date}</span>
                  </div>
                  <h3 className="font-sans font-semibold text-xl text-white mb-2 group-hover:text-iris-purple transition-colors leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-3">{blog.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{blog.author}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{blog.readTime}</span>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-iris-purple font-medium group-hover:gap-2 transition-all">
                      Read <ArrowRight className="w-4 h-4" />
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
