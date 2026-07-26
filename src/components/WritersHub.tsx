import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
}

export default function WritersHub() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [likedBlogs, setLikedBlogs] = useState<Record<string, boolean>>({});

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedBlogs({ ...likedBlogs, [id]: !likedBlogs[id] });
  };

  // Sample articles matching titles, author, and description content
  const blogs: Blog[] = [
    {
      id: 'life-and-stuff-1',
      title: 'A Blog About Life And Stuff',
      excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1500, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1514 Cicero translation and scrambled it to",
      content: "This blog explores the intricate mechanisms of daily learning and technological progress. In our rapidly changing ecosystem, finding a balance between robust logical development and creative software patterns is essential. Here, we delve into how we structure our lives around constant refinement, looking at lessons learned from physical mechatronics assemblies, dense drone flight paths, and how our day-to-day reflections feed directly back into our research outcomes at the I.R.I.S. Lab.",
      author: 'By: Nishtha and Payal',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'life-and-stuff-2',
      title: 'A Blog About Life And Stuff ig',
      excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1500, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1514 Cicero translation and scrambled it to",
      content: "A more candid take on building systems under pressure. This section covers our real-time software diagnostics, physical chassis adjustments, and spontaneous late-night team breakrooms. We realize that the most sustainable innovations emerge from a supportive, collaborative, and creative workspace atmosphere where developers are encouraged to cross-train on completely foreign clusters.",
      author: 'By: Nishtha and Payal',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'life-and-stuff-3',
      title: 'A Blog About Life And Stuff',
      excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1500, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1514 Cicero translation and scrambled it to",
      content: "The final part of our collaborative logbook. We synthesize the conceptual frameworks behind Project Tarzan, Project Soteria, and the Vyas database core, framing them not merely as technical components, but as tools that expand the cognitive abilities of research labs worldwide. Join us in shaping tomorrow's connected networks.",
      author: 'By: Nishtha and Payal',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=800&auto=format&fit=crop'
    }
  ];

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    if (scrollContainerRef.current) {
      const cardWidth = 360;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const cardWidth = 340;
      const nearestIndex = Math.round(scrollLeft / cardWidth);
      if (nearestIndex >= 0 && nearestIndex < blogs.length && nearestIndex !== activeIndex) {
        setActiveIndex(nearestIndex);
      }
    }
  };

  return (
    <section
      id="writers-hub"
      className="relative py-28 bg-black overflow-hidden flex flex-col justify-center"
    >
      {/* Background Glowing Spotlight Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] md:w-[900px] h-[300px] sm:h-[600px] md:h-[900px] rounded-full bg-iris-purple/20 blur-[100px] sm:blur-[140px] opacity-75" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
        
        {/* Header Grid - Title on Left, Avatar on Right */}
        <div className="w-full flex items-start justify-between gap-6 mb-12">
          {/* Title */}
          <div className="text-left">
            <motion.h2
              id="writters-hub-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-hanson font-black text-[10vw] sm:text-[6vw] md:text-[5vw] leading-[0.95] tracking-[0.02em] text-white uppercase select-none"
            >
              WRITTERS<br />HUB
            </motion.h2>
          </div>

          {/* Right Side Avatar speech bubble */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <div className="relative p-2.5 sm:p-3.5 bg-zinc-900/90 border border-white/10 rounded-[28px] rounded-bl-sm shadow-[0_12px_30px_rgba(0,0,0,0.4)] flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/10 p-0.5 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
                  alt="Writer Profile"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -bottom-2 left-3 w-4 h-4 bg-zinc-900 border-r border-b border-white/10 rotate-45" style={{ borderLeft: 'none', borderTop: 'none' }} />
            </div>
          </motion.div>
        </div>

        {/* Carousel Outer Container with Left / Right Arrows */}
        <div className="relative group/carousel w-full">
          
          {/* Left Navigation Arrow */}
          <button
            onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="absolute left-[-15px] sm:left-[-35px] top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-zinc-900/90 border border-white/20 text-white hover:bg-iris-purple hover:border-iris-purple hover:scale-110 transition-all duration-300 disabled:opacity-20 disabled:pointer-events-none cursor-pointer shadow-2xl flex items-center justify-center"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Right Navigation Arrow */}
          <button
            onClick={() => scrollToCard(Math.min(blogs.length - 1, activeIndex + 1))}
            disabled={activeIndex === blogs.length - 1}
            className="absolute right-[-15px] sm:right-[-35px] top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-zinc-900/90 border border-white/20 text-white hover:bg-iris-purple hover:border-iris-purple hover:scale-110 transition-all duration-300 disabled:opacity-20 disabled:pointer-events-none cursor-pointer shadow-2xl flex items-center justify-center"
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Sliding Track with Card Focus Highlighting */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="w-full flex items-center gap-6 sm:gap-10 overflow-x-auto snap-x snap-mandatory no-scrollbar py-10 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {blogs.map((blog, idx) => {
              const isActive = idx === activeIndex;

              return (
                <motion.div
                  key={blog.id}
                  onClick={() => scrollToCard(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`w-[290px] sm:w-[350px] md:w-[380px] flex-shrink-0 snap-center rounded-2xl transition-all duration-500 ease-out cursor-pointer flex flex-col overflow-hidden relative ${
                    isActive
                      ? 'scale-100 sm:scale-105 opacity-100 z-30 bg-white border-2 border-zinc-900 shadow-[0_25px_60px_rgba(144,97,249,0.3)]'
                      : 'scale-90 opacity-50 z-10 bg-white/90 border border-zinc-300 shadow-md brightness-75 contrast-90 filter hover:opacity-80'
                  }`}
                >
                  {/* Top image cover */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-black flex-shrink-0">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        isActive ? 'scale-105' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/10 to-black/30" />
                    
                    {/* Active Badge indicator */}
                    {isActive && (
                      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-white border border-white/20 text-[9px] font-mono px-2.5 py-1 rounded-full tracking-widest uppercase">
                        FEATURED
                      </div>
                    )}
                  </div>

                  {/* Body card content */}
                  <div className="p-6 md:p-8 flex-grow flex flex-col justify-between bg-white text-black min-h-[280px]">
                    <div>
                      <h3 className={`font-poppins font-extrabold text-base sm:text-lg md:text-xl leading-tight text-left tracking-tight mb-3 transition-colors ${
                        isActive ? 'text-black' : 'text-zinc-800'
                      }`}>
                        {blog.title}
                      </h3>
                      <p className="text-zinc-600 text-[10px] sm:text-[11px] leading-relaxed text-left font-poppins font-light line-clamp-6">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="mt-6">
                      <p className="text-right font-poppins font-extrabold text-[11px] sm:text-xs text-black mb-5 tracking-tight">
                        {blog.author}
                      </p>

                      <div className="w-full flex justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBlog(blog);
                          }}
                          className={`group/btn text-[10px] uppercase font-extrabold tracking-widest px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                            isActive
                              ? 'bg-black hover:bg-iris-purple text-white shadow-[0_6px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_25px_rgba(144,97,249,0.4)] scale-100'
                              : 'bg-zinc-800 text-zinc-200 hover:bg-black'
                          }`}
                        >
                          Read More
                          <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dots Indicator Switcher */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {blogs.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToCard(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? 'w-8 h-2 bg-iris-purple shadow-[0_0_12px_rgba(144,97,249,0.6)]'
                    : 'w-2 h-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Centered White Pill Action Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              const target = document.getElementById('projects');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center gap-2.5 bg-white hover:bg-zinc-100 text-black px-7 py-3.5 rounded-full text-xs font-extrabold tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.22)] hover:scale-[1.02] cursor-pointer focus:outline-none font-poppins"
          >
            See More Papers From IRIS
            <ChevronRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* READ MORE ARTICLE MODAL POPUP */}
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
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="overflow-y-auto flex-grow">
                <div className="relative h-56 sm:h-72 w-full">
                  <img
                    src={selectedBlog.image}
                    alt={selectedBlog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                </div>

                <div className="p-6 sm:p-10 text-left">
                  <h3 className="font-poppins font-extrabold text-2xl sm:text-3xl text-white mb-4 leading-tight">
                    {selectedBlog.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400 border-b border-white/5 pb-4 mb-6">
                    <span className="text-iris-purple font-semibold">{selectedBlog.author}</span>
                    <span>•</span>
                    <span>Published in I.R.I.S. Research Journal</span>
                  </div>

                  <p className="text-zinc-300 font-poppins font-light leading-relaxed text-sm sm:text-base space-y-6">
                    <span className="font-semibold text-white block mb-4 border-l-2 border-iris-purple pl-4">
                      {selectedBlog.excerpt}
                    </span>
                    {selectedBlog.content}
                  </p>

                  <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => handleLike(selectedBlog.id, e)}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-xs font-bold text-gray-300 transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${likedBlogs[selectedBlog.id] ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
                        <span>{likedBlogs[selectedBlog.id] ? 'Liked!' : 'Like'}</span>
                      </button>
                    </div>

                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-xs font-bold text-gray-300 transition-all cursor-pointer"
                    >
                      <Share2 className={`w-4 h-4 ${copied ? 'text-emerald-400' : 'text-gray-400'}`} />
                      <span>{copied ? 'Copied!' : 'Share'}</span>
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
