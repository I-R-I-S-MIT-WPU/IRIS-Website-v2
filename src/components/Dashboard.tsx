import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogOut, Users, Calendar, FolderOpen, FileText, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('iris_auth')) {
      navigate('/login');
      return;
    }
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('iris_auth');
    navigate('/login');
  };

  const stats = [
    { label: 'Members', value: '54', icon: Users, change: '+3 this month' },
    { label: 'Events', value: '12', icon: Calendar, change: '2 upcoming' },
    { label: 'Projects', value: '6', icon: FolderOpen, change: '3 active' },
    { label: 'Applications', value: '28', icon: FileText, change: '12 pending' },
  ];

  const recentActivity = [
    { text: 'New recruitment application from Arjun M.', time: '2 hours ago' },
    { text: 'Event "AI Workshop" registration opened', time: '5 hours ago' },
    { text: 'Project Soteria milestone completed', time: '1 day ago' },
    { text: 'New blog post published by Siddharth R.', time: '2 days ago' },
    { text: 'Team meeting notes uploaded', time: '3 days ago' },
  ];

  return (
    <section className="min-h-screen bg-black px-4 sm:px-8 py-8 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[160px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-violet-500/8 blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="IRIS" className="w-10 h-10" />
            <div>
              <h1 className="font-funnel font-bold text-2xl text-white">{greeting}, Admin</h1>
              <p className="text-gray-500 text-xs">IRIS Internal Dashboard</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-lg transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-zinc-900/80 border border-white/5 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-5 h-5 text-iris-purple" />
                <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-white font-funnel">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-zinc-900/80 border border-white/5 rounded-xl p-6"
          >
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Recent Activity</h2>
            <div className="space-y-0">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start justify-between py-3 border-b border-white/5 last:border-0">
                  <p className="text-gray-300 text-sm">{item.text}</p>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-4">{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900/80 border border-white/5 rounded-xl p-6"
          >
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full text-left bg-black/40 border border-white/5 hover:border-iris-purple/30 rounded-lg px-4 py-3 text-sm text-gray-300 hover:text-white transition-all cursor-pointer">
                View Applications
              </button>
              <button className="w-full text-left bg-black/40 border border-white/5 hover:border-iris-purple/30 rounded-lg px-4 py-3 text-sm text-gray-300 hover:text-white transition-all cursor-pointer">
                Create Event
              </button>
              <button className="w-full text-left bg-black/40 border border-white/5 hover:border-iris-purple/30 rounded-lg px-4 py-3 text-sm text-gray-300 hover:text-white transition-all cursor-pointer">
                Manage Members
              </button>
              <button className="w-full text-left bg-black/40 border border-white/5 hover:border-iris-purple/30 rounded-lg px-4 py-3 text-sm text-gray-300 hover:text-white transition-all cursor-pointer">
                Publish Blog Post
              </button>
              <button className="w-full text-left bg-black/40 border border-white/5 hover:border-iris-purple/30 rounded-lg px-4 py-3 text-sm text-gray-300 hover:text-white transition-all cursor-pointer">
                Update Project Status
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
