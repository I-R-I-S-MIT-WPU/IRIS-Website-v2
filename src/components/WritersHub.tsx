import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { getBlogs } from '../lib/db';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tag: string;
  image: string;
}

const HARDCODED_BLOGS: Blog[] = [
    {
      id: 'autonomous-nav',
      title: 'Autonomous Navigation in Dense Urban Environments',
      excerpt: 'Exploring how SLAM-based systems handle real-time obstacle detection and path planning in crowded spaces using optical flow and LiDAR fusion.',
      content: 'This paper explores the intricate mechanisms of autonomous navigation using simultaneous localization and mapping (SLAM). In rapidly evolving urban environments, our drones must handle dynamic obstacles, GPS-denied zones, and real-time replanning. We detail our approach using optical flow sensors paired with LiDAR point clouds to achieve centimeter-level accuracy in positioning.',
      author: 'Siddharth Roy',
      tag: 'Avionics',
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'edge-ai',
      title: 'Edge AI: Running Inference on Microcontrollers',
      excerpt: 'How we deploy quantized neural networks on resource-constrained hardware for real-time decision making on STM32 and ESP32.',
      content: 'Deploying AI models at the edge presents unique challenges — limited memory, power constraints, and the need for real-time inference. This article covers our pipeline for quantizing PyTorch models to INT8, optimizing them with TensorFlow Lite Micro, and deploying on STM32 and ESP32 platforms for our robotics projects.',
      author: 'Vikram Mehta',
      tag: 'AI/ML',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'swarm-comms',
      title: 'Decentralized Swarm Communication Protocols',
      excerpt: 'Building RF-consensus frameworks that allow drone swarms to coordinate without a central controller through emergent behavior.',
      content: 'Traditional multi-agent systems rely on a central coordinator — a single point of failure. Our Tarzan project implements a fully decentralized consensus protocol using low-power RF mesh networks. Each agent broadcasts its state vector and receives neighbor states, achieving emergent coordination through simple local rules that produce complex global behavior.',
      author: 'Alex Rivera',
      tag: 'Robotics',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    },
  ];

export default function WritersHub() {
  const [blogs, setBlogs] = useState<Blog[]>(HARDCODED_BLOGS);

  useEffect(() => {
    getBlogs(true).then((data: any[]) => {
      if (data?.length) {
        setBlogs(data.slice(0, 3).map(b => ({
          id: b.id,
          title: b.title,
          excerpt: b.excerpt,
          content: b.content,
          author: b.author,
          tag: b.tag,
          image: b.image,
        })));
      }
    }).catch(() => {});
  }, []);

  return (
    <section id="writers-hub" className="relative py-28 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[30%] left-[-8%] w-[450px] h-[450px] rounded-full bg-violet-600/8 blur-[140px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[350px] h-[350px] rounded-full bg-blue-600/6 blur-[120px]" />
      </div>
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
            >
              <Link
                to={`/blog/${blog.id}`}
                className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden flex flex-col group hover:border-iris-purple/20 transition-all block h-full"
              >
              {/* Image */}
              <div className="h-44 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-iris-purple uppercase tracking-widest font-sans">{blog.tag}</span>
                  <h3 className="font-sans font-semibold text-white text-lg mt-2 mb-3 leading-tight group-hover:text-iris-purple transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-sans line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-sans">By {blog.author}</span>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-iris-purple group-hover:text-white transition-colors">
                    Read More
                    <ArrowRight className="w-3.5 h-3.5" />
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
