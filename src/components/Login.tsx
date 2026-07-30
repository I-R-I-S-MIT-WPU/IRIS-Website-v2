import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('All fields are required.'); return; }
    setLoading(true);
    setTimeout(() => {
      if (email === 'admin@iris.club' && password === 'iris2026') {
        localStorage.setItem('iris_auth', 'true');
        navigate('/dashboard');
      } else {
        setError('Invalid email or password.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black flex relative overflow-hidden">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
        {/* Glow */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/25 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 0.9, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-[300px] h-[300px] rounded-full bg-violet-500/20 blur-[100px] translate-x-20 translate-y-20"
        />

        <div className="relative z-10 text-center px-12">
          <img src="/logo.png" alt="IRIS" className="w-20 h-20 mx-auto mb-6" />
          <h2 className="font-funnel font-bold text-5xl text-white mb-3">I.R.I.S</h2>
          <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
            Internal portal for IRIS club members. Manage events, projects, and team operations.
          </p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <img src="/logo.png" alt="IRIS" className="w-10 h-10" />
            <span className="font-funnel font-bold text-xl text-white">I.R.I.S</span>
          </div>

          <h1 className="font-funnel font-bold text-3xl sm:text-4xl text-white mb-2">Welcome back</h1>
          <p className="text-gray-500 text-sm mb-8">Sign in to access the internal dashboard.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 focus:border-iris-purple rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 outline-none transition-colors"
                placeholder="you@iris.club"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 focus:border-iris-purple rounded-xl px-4 py-3.5 pr-11 text-white text-sm placeholder-gray-600 outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-iris-purple hover:bg-iris-purple/90 disabled:opacity-50 text-white font-medium py-3.5 rounded-xl transition-all cursor-pointer mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-gray-600 text-xs text-center mt-8">
            Access restricted to authorized IRIS members only.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
