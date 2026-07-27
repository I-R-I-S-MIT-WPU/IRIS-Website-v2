import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tag: string;
}

export default function WritersHub() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const blogs: Blog[] = [
    {
      id: 'autonomous-nav',
      title: 'Autonomous Navigation in Dense Urban Environments',
      excerpt: 'Exploring how SLAM-based systems handle real-time obstacle detection and path planning in crowded spaces using optical flow and LiDAR fusion.',
      content: 'This paper explores the intricate mechanisms of autonomous navigation using simultaneous localization and mapping (SLAM). In rapidly evolving urban environments, our drones must handle dynamic obstacles, GPS-denied zones, and real-time replanning. We detail our approach using optical flow sensors paired with LiDAR point clouds to achieve centimeter-level accuracy in positioning.',
      author: 'Siddharth Roy',
      tag: 'Avionics',
    },
    {
      id: 'edge-ai',
      title: 'Edge AI: Running Inference on Microcontrollers',
      excerpt: 'How we deploy quantized neural networks on resource-constrained hardware for real-time decision making on STM32 and ESP32.',
      content: 'Deploying AI models at the edge presents unique challenges — limited memory, power constraints, and the need for real-time inference. This article covers our pipeline for quantizing PyTorch models to INT8, optimizing them with TensorFlow Lite Micro, and deploying on STM32 and ESP32 platforms for our robotics projects.',
      author: 'Vikram Mehta',
      tag: 'AI/ML',
    },
    {
      id: 'swarm-comms',
      title: 'Decentralized Swarm Communication Protocols',
      excerpt: 'Building RF-consensus frameworks that allow drone swarms to coordinate without a central controller through emergent behavior.',
      content: 'Traditional multi-agent systems rely on a central coordinator — a single point of failure. Our Tarzan project implements a fully decentralized consensus protocol using low-power RF mesh networks. Each agent broadcasts its state vector and receives neighbor states, achieving emergent coordination through simple local rules that produce complex global behavior.',
      author: 'Alex Rivera',
      tag: 'Robotics',
    },
  ];

  return (
    <section id="writers-hub" className="relative py-28 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-iris-purple text-xs font-semibold uppercase tracking-widest mb-4 font-sans">Research & Writing</p>
          <h2 className="font-funnel font-bold text-5xl sm:text-6xl md:text-7xl text-white tracking-tight">
            Writers Hub
          </h2>
        </motion.div>

        {/* Grid of consistent cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-[#f5f3ff] to-white rounded-3xl p-7 flex flex-col justify-between group"
            >
              <div>
                <span className="text-[11px] font-semibold text-iris-purple uppercase tracking-widest font-sans">{blog.tag}</span>
                <h3 className="font-sans font-semibold text-zinc-900 text-lg mt-3 mb-3 leading-tight">
                  {blog.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-sans">
                  {blog.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-sans">By {blog.author}</span>
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="flex items-center gap-1.5 text-sm font-medium text-zinc-900 hover:text-iris-purple transition-colors cursor-pointer"
                >
                  Read More
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer z-20 border border-white/5"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="overflow-y-auto flex-grow p-8 sm:p-10">
                <span className="text-xs font-semibold text-iris-purple uppercase tracking-widest font-sans">
                  {selectedBlog.tag}
                </span>
                <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white mt-3 mb-2 leading-tight">
                  {selectedBlog.title}
                </h3>
                <p className="text-sm text-gray-400 mb-8 font-sans">By {selectedBlog.author}</p>
                <p className="text-zinc-300 font-sans leading-relaxed text-base">
                  {selectedBlog.content}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
