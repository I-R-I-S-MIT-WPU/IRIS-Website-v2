import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[150px]"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/15 blur-[120px]"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <motion.img
            src="/logo.png"
            alt="IRIS Logo"
            className="w-32 h-32 mx-auto mb-8"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="font-funnel font-bold text-[120px] sm:text-[180px] leading-none text-transparent bg-clip-text bg-gradient-to-br from-iris-purple via-purple-400 to-violet-600 mb-4"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            404
          </motion.div>

          <h1 className="font-funnel font-bold text-4xl sm:text-5xl text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-sans mb-8 max-w-md mx-auto">
            Looks like this route doesn't exist in our neural network. Let's get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="group flex items-center gap-2 bg-iris-purple hover:bg-iris-purple/80 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-iris-purple/40 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/5"
        >
          <p className="text-gray-600 text-xs font-mono uppercase tracking-wider">
            IRIS // MIT-WPU // SYSTEM_ERROR_404
          </p>
        </motion.div>
      </div>
    </section>
  );
}
