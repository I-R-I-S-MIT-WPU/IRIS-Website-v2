import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Search } from 'lucide-react';
import { BLOGS } from '../data/blogs';
import { getBlogs } from '../lib/db';

interface BlogRow {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tag: string;
  image: string;
  date: string;
  read_time: string;
}

export default function BlogsPage() {
  const [query, setQuery] = useState('');
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    getBlogs(true).then((data: BlogRow[]) => {
      if (data?.length) {
        setBlogs(data.map(b => ({ ...b, readTime: b.read_time || b.read_time })));
      } else {
        // Fallback to hardcoded if DB is empty
        setBlogs(BLOGS.map(b => ({ ...b, read_time: b.readTime })));
      }
    }).catch(() => {
      // On error, use hardcoded
      setBlogs(BLOGS.map(b => ({ ...b, read_time: b.readTime })));
    });
  }, []);

  const filtered = blogs.filter((b: any) =>
    b.title.toLowerCase().includes(query.toLowerCase()) ||
    (b.tag || '').toLowerCase().includes(query.toLowerCase()) ||
    b.author.toLowerCase().includes(query.toLowerCase())
  );

  const featured = blogs[0];
  const rest = query ? filtered : filtered.slice(1);

  return (
    <section className="relative min-h-screen py-28 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[160px]" />
        <div className="absolute bottom-[15%] left-[-8%] w-[400px] h-[400px] rounded-full bg-violet-500/8 blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header + Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <p className="text-iris-purple text-xs font-semibold uppercase tracking-widest mb-3 font-sans">Research & Writing</p>
          <h1 className="font-funnel font-bold text-6xl sm:text-7xl md:text-8xl text-white tracking-tight mb-8">
            Blog
          </h1>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search posts by title, tag, or author..."
              className="w-full bg-zinc-900 border border-white/10 focus:border-iris-purple/50 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-gray-500 outline-none transition-colors"
            />
          </div>
        </motion.div>

        {/* Featured - only show when not searching */}
        {!query && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-4">Featured</p>
            <Link
              to={`/blog/${featured.id}`}
              className="group block rounded-2xl overflow-hidden border border-white/5 hover:border-iris-purple/20 transition-all"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 h-[240px] lg:h-[360px] overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center bg-zinc-950">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold text-iris-purple uppercase tracking-widest bg-iris-purple/10 px-2.5 py-1 rounded-lg">{featured.tag}</span>
                    <span className="text-zinc-500 text-xs">{featured.date}</span>
                  </div>
                  <h2 className="font-funnel font-bold text-3xl sm:text-4xl text-white mb-4 leading-tight group-hover:text-iris-purple transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">
                        {featured.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{featured.author}</p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{(featured as any).readTime || (featured as any).read_time}</span>
                        </div>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-iris-purple group-hover:gap-2 transition-all">
                      Read <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Grid */}
        {!query && <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-5">All Posts</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.04 }}
            >
              <Link
                to={`/blog/${blog.id}`}
                className="group block rounded-2xl overflow-hidden border border-white/5 hover:border-iris-purple/20 transition-all h-full"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 bg-zinc-950">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-semibold text-iris-purple uppercase tracking-widest">{blog.tag}</span>
                    <span className="text-zinc-700 text-xs">•</span>
                    <span className="text-zinc-500 text-xs">{blog.date}</span>
                  </div>
                  <h3 className="font-sans font-semibold text-white text-lg mb-2 leading-tight group-hover:text-iris-purple transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-5">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-white">
                        {blog.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-white text-xs font-medium">{blog.author}</p>
                        <p className="text-gray-600 text-[10px]">{(blog as any).readTime || (blog as any).read_time}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-iris-purple transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {query && rest.length === 0 && (
          <p className="text-gray-500 text-sm text-center mt-12">No posts found matching "{query}"</p>
        )}
      </div>
    </section>
  );
}
