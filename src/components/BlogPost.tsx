import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { BLOGS } from '../data/blogs';
import { getBlogById } from '../lib/db';

export default function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(BLOGS.find(b => b.id === id));

  useEffect(() => {
    if (id) {
      getBlogById(id).then(data => { if (data) setBlog({ ...data, readTime: data.read_time }); }).catch(() => {});
    }
  }, [id]);

  if (!blog) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-funnel font-bold text-4xl text-white mb-3">Post not found</h1>
          <Link to="/blog" className="text-iris-purple text-sm hover:underline">Back to all posts</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-600/8 blur-[150px]" />
        <div className="absolute bottom-[20%] left-[-8%] w-[350px] h-[350px] rounded-full bg-violet-500/6 blur-[120px]" />
      </div>

      {/* Hero image */}
      <div className="relative w-full h-[300px] sm:h-[400px]">
        <img
          src={blog.image}
          alt={blog.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-8 relative z-10 -mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All posts
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-iris-purple uppercase tracking-widest">{blog.tag}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500 text-xs">{blog.date}</span>
          </div>

          {/* Title */}
          <h1 className="font-funnel font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Author bar */}
          <div className="flex items-center gap-4 pb-8 mb-8 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{blog.author}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="prose-custom">
            {blog.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-gray-300 text-base leading-relaxed mb-5 font-sans">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="mt-12 pt-8 border-t border-white/10 pb-20">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-iris-purple hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all posts
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
