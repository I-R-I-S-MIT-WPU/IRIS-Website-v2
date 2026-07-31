import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogOut, Users, Calendar, FolderOpen, FileText, Plus, Pencil, Trash2, ChevronLeft, Upload, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';
import * as db from '../lib/db';

type Tab = 'overview' | 'blogs' | 'events' | 'projects' | 'members' | 'mentors' | 'applications';

export default function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('overview');

  useEffect(() => {
    if (!localStorage.getItem('iris_auth')) navigate('/login');
  }, [navigate]);

  const handleLogout = () => { localStorage.removeItem('iris_auth'); navigate('/login'); };

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: 'overview', label: 'Overview', icon: FolderOpen },
    { key: 'blogs', label: 'Blogs', icon: FileText },
    { key: 'events', label: 'Events', icon: Calendar },
    { key: 'projects', label: 'Projects', icon: FolderOpen },
    { key: 'members', label: 'Members', icon: Users },
    { key: 'mentors', label: 'Mentors', icon: Users },
    { key: 'applications', label: 'Applications', icon: FileText },
  ];

  return (
    <section className="min-h-screen bg-black px-4 sm:px-8 py-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[160px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-violet-500/8 blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="IRIS" className="w-10 h-10" />
            <div>
              <h1 className="font-funnel font-bold text-2xl text-white">Dashboard</h1>
              <p className="text-gray-500 text-xs">IRIS Internal</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-lg transition-all cursor-pointer">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                tab === t.key ? 'bg-iris-purple text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && <OverviewTab onNavigate={setTab} />}
        {tab === 'blogs' && <BlogsTab />}
        {tab === 'events' && <EventsTab />}
        {tab === 'projects' && <ProjectsTab />}
        {tab === 'members' && <MembersTab />}
        {tab === 'mentors' && <MentorsTab />}
        {tab === 'applications' && <ApplicationsTab />}
      </div>
    </section>
  );
}

// ─── Overview ────────────────────────────────────────────

function OverviewTab({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const [counts, setCounts] = useState({ blogs: 0, events: 0, projects: 0, members: 0, applications: 0 });

  useEffect(() => {
    Promise.all([db.getBlogs(), db.getEvents(), db.getProjects(), db.getMembers(), db.getApplications()])
      .then(([b, e, p, m, a]) => setCounts({
        blogs: b?.length || 0, events: e?.length || 0, projects: p?.length || 0, members: m?.length || 0, applications: a?.length || 0,
      })).catch(() => {});
  }, []);

  const stats = [
    { label: 'Blogs', value: counts.blogs, tab: 'blogs' as Tab },
    { label: 'Events', value: counts.events, tab: 'events' as Tab },
    { label: 'Projects', value: counts.projects, tab: 'projects' as Tab },
    { label: 'Members', value: counts.members, tab: 'members' as Tab },
    { label: 'Applications', value: counts.applications, tab: 'applications' as Tab },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((s, i) => (
        <motion.button
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onNavigate(s.tab)}
          className="bg-zinc-900/80 border border-white/5 hover:border-iris-purple/30 rounded-xl p-6 text-left cursor-pointer transition-all"
        >
          <p className="text-4xl font-bold text-white font-funnel mb-1">{s.value}</p>
          <p className="text-xs text-gray-500">{s.label}</p>
        </motion.button>
      ))}
    </div>
  );
}

// ─── Blogs Tab (custom form) ─────────────────────────────

const BLOG_TAGS = ['AI/ML', 'Robotics', 'Avionics', 'Security', 'Systems', 'Web', 'Design', 'General'];

function BlogsTab() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);

  const load = () => { db.getBlogs().then(d => { setRows(d || []); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    await db.deleteBlog(id);
    load();
  };

  const handleSave = async (data: Record<string, any>) => {
    if (editing) await db.updateBlog(editing.id, data);
    else await db.createBlog(data);
    setEditing(null);
    setCreating(false);
    load();
  };

  if (creating || editing) {
    return <BlogEditor initial={editing} onSave={handleSave} onCancel={() => { setEditing(null); setCreating(false); }} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-semibold text-lg">Blogs</h2>
        <button onClick={() => setCreating(true)} className="flex items-center gap-2 bg-iris-purple hover:bg-iris-purple/80 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>
      {loading ? <p className="text-gray-500 text-sm">Loading...</p> : rows.length === 0 ? (
        <p className="text-gray-500 text-sm">No blog posts yet.</p>
      ) : (
        <div className="space-y-3">
          {rows.map(row => (
            <div key={row.id} className={`flex items-center gap-4 bg-zinc-900/80 border border-white/5 rounded-xl p-4 ${row.visible === false ? 'opacity-50' : ''}`}>
              {row.image && <img src={row.image} alt="" referrerPolicy="no-referrer" className="w-16 h-12 rounded-lg object-cover shrink-0" />}
              <div className="flex-grow min-w-0">
                <p className="text-white font-medium text-sm truncate">{row.title}</p>
                <p className="text-gray-500 text-xs">{row.author} &middot; {row.tag} &middot; {row.date || '—'}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={async () => { await db.updateBlog(row.id, { visible: !row.visible }); load(); }} className={`p-2 cursor-pointer ${row.visible === false ? 'text-gray-600 hover:text-white' : 'text-emerald-400 hover:text-emerald-300'}`} title={row.visible === false ? 'Hidden — click to show' : 'Visible — click to hide'}>
                  {row.visible === false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button onClick={() => setEditing(row)} className="text-gray-400 hover:text-white p-2 cursor-pointer"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(row.id)} className="text-gray-400 hover:text-red-400 p-2 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BlogEditor({ initial, onSave, onCancel }: { initial: any; onSave: (d: Record<string, any>) => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    excerpt: initial?.excerpt || '',
    content: initial?.content || '',
    author: initial?.author || '',
    tag: initial?.tag || BLOG_TAGS[0],
    image: initial?.image || '',
    read_time: initial?.read_time || '',
    date: initial?.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(initial?.image || '');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const path = `blog/${Date.now()}_${file.name}`;
      const url = await db.uploadFile('images', path, file);
      setForm(p => ({ ...p, image: url }));
      setImagePreview(url);
    } catch { alert('Upload failed'); }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content || !form.author) { alert('Title, content, and author are required'); return; }
    setSaving(true);
    try { await onSave(form); } catch { alert('Error saving'); }
    setSaving(false);
  };

  const estimateReadTime = () => {
    const words = form.content.split(/\s+/).length;
    const mins = Math.max(1, Math.round(words / 200));
    setForm(p => ({ ...p, read_time: `${mins} min read` }));
  };

  const inputClass = "w-full bg-zinc-900 border border-white/10 focus:border-iris-purple/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors";

  return (
    <div>
      <button onClick={onCancel} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 cursor-pointer">
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      <h2 className="text-white font-semibold text-lg mb-6">{initial ? 'Edit Post' : 'New Blog Post'}</h2>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Title */}
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Title *</label>
          <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className={inputClass} placeholder="Post title" />
        </div>

        {/* Cover Image */}
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Cover Image</label>
          <div className="flex items-start gap-4">
            <div className="flex-grow">
              <input type="text" value={form.image} onChange={e => { setForm(p => ({ ...p, image: e.target.value })); setImagePreview(e.target.value); }} className={inputClass} placeholder="Image URL or upload below" />
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="mt-2 flex items-center gap-2 text-sm text-iris-purple hover:text-white border border-iris-purple/30 hover:border-iris-purple px-4 py-2 rounded-lg cursor-pointer transition-all disabled:opacity-50"
              >
                <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </div>
            {imagePreview && (
              <img src={imagePreview} alt="Preview" referrerPolicy="no-referrer" className="w-24 h-16 rounded-lg object-cover border border-white/10 shrink-0" />
            )}
          </div>
        </div>

        {/* Author + Tag + Date row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Author *</label>
            <input type="text" value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} className={inputClass} placeholder="Author name" />
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Tag</label>
            <select value={form.tag} onChange={e => setForm(p => ({ ...p, tag: e.target.value }))} className={`${inputClass} cursor-pointer`}>
              {BLOG_TAGS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Date</label>
            <input type="date" value={toInputDate(form.date)} onChange={e => setForm(p => ({ ...p, date: formatDate(e.target.value) }))} className={`${inputClass} cursor-pointer`} />
          </div>
        </div>

        {/* Read time */}
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Read Time</label>
          <div className="flex items-center gap-3">
            <input type="text" value={form.read_time} onChange={e => setForm(p => ({ ...p, read_time: e.target.value }))} className={`${inputClass} max-w-[200px]`} placeholder="e.g. 5 min read" />
            <button type="button" onClick={estimateReadTime} className="text-xs text-iris-purple hover:text-white border border-iris-purple/30 px-3 py-2 rounded-lg cursor-pointer transition-all">
              Auto-estimate
            </button>
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Excerpt</label>
          <textarea value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} rows={2} className={`${inputClass} resize-y`} placeholder="Short summary shown in cards" />
        </div>

        {/* Content */}
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Content *</label>
          <p className="text-gray-600 text-[11px] mb-2">Separate paragraphs with blank lines. Content will be rendered as paragraphs.</p>
          <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} rows={14} className={`${inputClass} resize-y font-mono text-xs leading-relaxed`} placeholder="Write your blog post content here..." />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-iris-purple hover:bg-iris-purple/80 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all">
            {saving ? 'Publishing...' : initial ? 'Update Post' : 'Publish Post'}
          </button>
          <button type="button" onClick={onCancel} className="text-gray-400 hover:text-white px-4 py-2.5 text-sm cursor-pointer">Cancel</button>
        </div>
      </form>
    </div>
  );
}

// ─── Events Tab (custom form) ────────────────────────────

function EventsTab() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);

  const load = () => { db.getEvents().then(d => { setRows(d || []); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    await db.deleteEvent(id);
    load();
  };

  const handleSave = async (data: Record<string, any>) => {
    if (editing) await db.updateEvent(editing.id, data);
    else await db.createEvent(data);
    setEditing(null);
    setCreating(false);
    load();
  };

  if (creating || editing) {
    return <EventEditor initial={editing} onSave={handleSave} onCancel={() => { setEditing(null); setCreating(false); }} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-semibold text-lg">Events</h2>
        <button onClick={() => setCreating(true)} className="flex items-center gap-2 bg-iris-purple hover:bg-iris-purple/80 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all">
          <Plus className="w-4 h-4" /> New Event
        </button>
      </div>
      {loading ? <p className="text-gray-500 text-sm">Loading...</p> : rows.length === 0 ? (
        <p className="text-gray-500 text-sm">No events yet.</p>
      ) : (
        <div className="space-y-3">
          {rows.map(row => (
            <div key={row.id} className={`flex items-center gap-4 bg-zinc-900/80 border border-white/5 rounded-xl p-4 ${row.visible === false ? 'opacity-50' : ''}`}>
              <div className="flex-grow min-w-0">
                <p className="text-white font-medium text-sm truncate">{row.title}</p>
                <p className="text-gray-500 text-xs">{row.date} &middot; {row.location} &middot; {row.spots_left} spots left</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={async () => { await db.updateEvent(row.id, { visible: !row.visible }); load(); }} className={`p-2 cursor-pointer ${row.visible === false ? 'text-gray-600 hover:text-white' : 'text-emerald-400 hover:text-emerald-300'}`} title={row.visible === false ? 'Hidden' : 'Visible'}>
                  {row.visible === false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button onClick={() => setEditing(row)} className="text-gray-400 hover:text-white p-2 cursor-pointer"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(row.id)} className="text-gray-400 hover:text-red-400 p-2 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EventEditor({ initial, onSave, onCancel }: { initial: any; onSave: (d: Record<string, any>) => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    date: initial?.date || '',
    time: initial?.time || '',
    location: initial?.location || '',
    speaker: initial?.speaker || '',
    spots_left: initial?.spots_left?.toString() || '50',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date) { alert('Title and date are required'); return; }
    setSaving(true);
    try { await onSave({ ...form, spots_left: parseInt(form.spots_left) || 0 }); } catch { alert('Error saving'); }
    setSaving(false);
  };

  const inputClass = "w-full bg-zinc-900 border border-white/10 focus:border-iris-purple/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors";

  return (
    <div>
      <button onClick={onCancel} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 cursor-pointer">
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      <h2 className="text-white font-semibold text-lg mb-6">{initial ? 'Edit Event' : 'New Event'}</h2>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Title *</label>
          <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className={inputClass} placeholder="Event title" />
        </div>
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Description</label>
          <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className={`${inputClass} resize-y`} placeholder="What's this event about?" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Date *</label>
            <input type="date" value={toInputDate(form.date)} onChange={e => setForm(p => ({ ...p, date: formatDate(e.target.value) }))} className={`${inputClass} cursor-pointer`} />
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Time</label>
            <input type="text" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} className={inputClass} placeholder="e.g. 10:00 AM - 4:00 PM IST" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Location</label>
            <input type="text" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} className={inputClass} placeholder="Venue" />
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Speaker</label>
            <input type="text" value={form.speaker} onChange={e => setForm(p => ({ ...p, speaker: e.target.value }))} className={inputClass} placeholder="Speaker name" />
          </div>
        </div>
        <div className="max-w-[200px]">
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Spots Available</label>
          <input type="number" min="0" value={form.spots_left} onChange={e => setForm(p => ({ ...p, spots_left: e.target.value }))} className={inputClass} />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-iris-purple hover:bg-iris-purple/80 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all">
            {saving ? 'Saving...' : initial ? 'Update Event' : 'Create Event'}
          </button>
          <button type="button" onClick={onCancel} className="text-gray-400 hover:text-white px-4 py-2.5 text-sm cursor-pointer">Cancel</button>
        </div>
      </form>
    </div>
  );
}

// ─── Projects Tab ────────────────────────────────────────

const PROJECT_STATUSES = ['Active', 'Beta', 'Completed', 'Paused'];
const PROJECT_CATEGORIES = ['Robotics & AI', 'Databases', 'Avionics', 'Security', 'Web', 'Systems', 'Other'];

function ProjectsTab() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);

  const load = () => { db.getProjects().then(d => { setRows(d || []); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await db.deleteProject(id);
    load();
  };

  const handleSave = async (data: Record<string, any>) => {
    if (editing) await db.updateProject(editing.id, data);
    else await db.createProject(data);
    setEditing(null);
    setCreating(false);
    load();
  };

  if (creating || editing) {
    return <ProjectEditor initial={editing} onSave={handleSave} onCancel={() => { setEditing(null); setCreating(false); }} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-semibold text-lg">Projects</h2>
        <button onClick={() => setCreating(true)} className="flex items-center gap-2 bg-iris-purple hover:bg-iris-purple/80 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>
      {loading ? <p className="text-gray-500 text-sm">Loading...</p> : rows.length === 0 ? (
        <p className="text-gray-500 text-sm">No projects yet.</p>
      ) : (
        <div className="space-y-3">
          {rows.map(row => (
            <div key={row.id} className={`flex items-center gap-4 bg-zinc-900/80 border border-white/5 rounded-xl p-4 ${row.visible === false ? 'opacity-50' : ''}`}>
              {row.image && <img src={row.image} alt="" referrerPolicy="no-referrer" className="w-16 h-12 rounded-lg object-cover shrink-0" />}
              <div className="flex-grow min-w-0">
                <p className="text-white font-medium text-sm truncate">{row.title}</p>
                <p className="text-gray-500 text-xs">{row.category} &middot; {row.status} &middot; Lead: {row.lead || '—'}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={async () => { await db.updateProject(row.id, { visible: !row.visible }); load(); }} className={`p-2 cursor-pointer ${row.visible === false ? 'text-gray-600 hover:text-white' : 'text-emerald-400 hover:text-emerald-300'}`} title={row.visible === false ? 'Hidden' : 'Visible'}>
                  {row.visible === false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button onClick={() => setEditing(row)} className="text-gray-400 hover:text-white p-2 cursor-pointer"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(row.id)} className="text-gray-400 hover:text-red-400 p-2 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectEditor({ initial, onSave, onCancel }: { initial: any; onSave: (d: Record<string, any>) => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    short_description: initial?.short_description || '',
    full_description: initial?.full_description || '',
    category: initial?.category || PROJECT_CATEGORIES[0],
    tech_stack: Array.isArray(initial?.tech_stack) ? initial.tech_stack.join(', ') : (initial?.tech_stack || ''),
    status: initial?.status || 'Active',
    lead: initial?.lead || '',
    image: initial?.image || '',
  });
  const [gallery, setGallery] = useState<string[]>(initial?.gallery || []);
  const [teamMembers, setTeamMembers] = useState<string[]>(initial?.team_members || []);
  const [allMembers, setAllMembers] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(initial?.image || '');
  const fileRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    db.getMembers().then(d => { if (d) setAllMembers(d); }).catch(() => {});
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const path = `projects/${Date.now()}_${file.name}`;
      const url = await db.uploadFile('images', path, file);
      setForm(p => ({ ...p, image: url }));
      setImagePreview(url);
    } catch { alert('Upload failed'); }
    setUploading(false);
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setGalleryUploading(true);
    const newUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const path = `projects/gallery/${Date.now()}_${files[i].name}`;
        const url = await db.uploadFile('images', path, files[i]);
        newUrls.push(url);
      } catch { /* skip failed */ }
    }
    setGallery(prev => [...prev, ...newUrls]);
    setGalleryUploading(false);
    if (galleryRef.current) galleryRef.current.value = '';
  };

  const removeGalleryImage = (idx: number) => {
    setGallery(prev => prev.filter((_, i) => i !== idx));
  };

  const toggleMember = (memberId: string) => {
    setTeamMembers(prev => prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) { alert('Title is required'); return; }
    setSaving(true);
    try {
      await onSave({
        ...form,
        tech_stack: form.tech_stack.split(',').map(s => s.trim()).filter(Boolean),
        gallery,
        team_members: teamMembers,
      });
    } catch { alert('Error saving'); }
    setSaving(false);
  };

  const inputClass = "w-full bg-zinc-900 border border-white/10 focus:border-iris-purple/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors";

  return (
    <div>
      <button onClick={onCancel} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 cursor-pointer">
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      <h2 className="text-white font-semibold text-lg mb-6">{initial ? 'Edit Project' : 'New Project'}</h2>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Title *</label>
          <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className={inputClass} placeholder="Project name" />
        </div>

        {/* Cover Image */}
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Cover Image</label>
          <div className="flex items-start gap-4">
            <div className="flex-grow">
              <input type="text" value={form.image} onChange={e => { setForm(p => ({ ...p, image: e.target.value })); setImagePreview(e.target.value); }} className={inputClass} placeholder="Image URL or upload" />
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="mt-2 flex items-center gap-2 text-sm text-iris-purple hover:text-white border border-iris-purple/30 hover:border-iris-purple px-4 py-2 rounded-lg cursor-pointer transition-all disabled:opacity-50">
                <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </div>
            {imagePreview && <img src={imagePreview} alt="Preview" referrerPolicy="no-referrer" className="w-24 h-16 rounded-lg object-cover border border-white/10 shrink-0" />}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Category</label>
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className={`${inputClass} cursor-pointer`}>
              {PROJECT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Status</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className={`${inputClass} cursor-pointer`}>
              {PROJECT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Lead</label>
            <input type="text" value={form.lead} onChange={e => setForm(p => ({ ...p, lead: e.target.value }))} className={inputClass} placeholder="Project lead" />
          </div>
        </div>

        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Tech Stack</label>
          <input type="text" value={form.tech_stack} onChange={e => setForm(p => ({ ...p, tech_stack: e.target.value }))} className={inputClass} placeholder="Comma-separated, e.g. Python, TensorFlow, ROS 2" />
          <p className="text-gray-600 text-[11px] mt-1">Separate technologies with commas</p>
        </div>

        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Short Description</label>
          <textarea value={form.short_description} onChange={e => setForm(p => ({ ...p, short_description: e.target.value }))} rows={2} className={`${inputClass} resize-y`} placeholder="One-liner shown on cards" />
        </div>

        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Full Description</label>
          <textarea value={form.full_description} onChange={e => setForm(p => ({ ...p, full_description: e.target.value }))} rows={6} className={`${inputClass} resize-y`} placeholder="Detailed project description" />
        </div>

        {/* Gallery */}
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Gallery</label>
          <p className="text-gray-600 text-[11px] mb-3">Upload images to show in the project detail page gallery</p>
          {gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mb-3">
              {gallery.map((img, idx) => (
                <div key={idx} className="relative group aspect-[4/3] rounded-lg overflow-hidden border border-white/10">
                  <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <input ref={galleryRef} type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
          <button
            type="button"
            onClick={() => galleryRef.current?.click()}
            disabled={galleryUploading}
            className="flex items-center gap-2 text-sm text-iris-purple hover:text-white border border-iris-purple/30 hover:border-iris-purple px-4 py-2 rounded-lg cursor-pointer transition-all disabled:opacity-50"
          >
            <ImageIcon className="w-4 h-4" /> {galleryUploading ? 'Uploading...' : 'Add Gallery Images'}
          </button>
        </div>

        {/* Team Members */}
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Team Members</label>
          <p className="text-gray-600 text-[11px] mb-3">Select members working on this project</p>
          {allMembers.length === 0 ? (
            <p className="text-gray-500 text-xs">No members in database yet. Add members first.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[240px] overflow-y-auto pr-2">
              {allMembers.map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => toggleMember(m.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left cursor-pointer transition-all ${
                    teamMembers.includes(m.id)
                      ? 'bg-iris-purple/15 border border-iris-purple/40'
                      : 'bg-zinc-900/80 border border-white/5 hover:border-white/10'
                  }`}
                >
                  {m.photo ? (
                    <img src={m.photo} alt="" referrerPolicy="no-referrer" className="w-8 h-8 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                      {m.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-white text-xs font-medium truncate">{m.name}</p>
                    <p className="text-gray-500 text-[10px] truncate">{m.position || m.domain}</p>
                  </div>
                  {teamMembers.includes(m.id) && (
                    <span className="ml-auto text-iris-purple text-xs font-bold shrink-0">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
          {teamMembers.length > 0 && (
            <p className="text-gray-500 text-[11px] mt-2">{teamMembers.length} member{teamMembers.length > 1 ? 's' : ''} selected</p>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-iris-purple hover:bg-iris-purple/80 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all">
            {saving ? 'Saving...' : initial ? 'Update Project' : 'Create Project'}
          </button>
          <button type="button" onClick={onCancel} className="text-gray-400 hover:text-white px-4 py-2.5 text-sm cursor-pointer">Cancel</button>
        </div>
      </form>
    </div>
  );
}

// ─── Members Tab ─────────────────────────────────────────

const MEMBER_DOMAINS = ['Software', 'Hardware', 'Non-Tech'];

function MembersTab() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);

  const load = () => { db.getMembers().then(d => { setRows(d || []); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this member?')) return;
    await db.deleteMember(id);
    load();
  };

  const handleSave = async (data: Record<string, any>) => {
    if (editing) await db.updateMember(editing.id, data);
    else await db.createMember(data);
    setEditing(null);
    setCreating(false);
    load();
  };

  if (creating || editing) {
    return <MemberEditor initial={editing} onSave={handleSave} onCancel={() => { setEditing(null); setCreating(false); }} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-semibold text-lg">Members</h2>
        <button onClick={() => setCreating(true)} className="flex items-center gap-2 bg-iris-purple hover:bg-iris-purple/80 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>
      {loading ? <p className="text-gray-500 text-sm">Loading...</p> : rows.length === 0 ? (
        <p className="text-gray-500 text-sm">No members yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {rows.map(row => (
            <div key={row.id} className={`bg-zinc-900/80 border border-white/5 rounded-xl p-4 flex items-center gap-3 ${row.visible === false ? 'opacity-50' : ''}`}>
              {row.photo ? (
                <img src={row.photo} alt="" referrerPolicy="no-referrer" className="w-11 h-11 rounded-full object-cover shrink-0" />
              ) : (
                <div className="w-11 h-11 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {row.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </div>
              )}
              <div className="flex-grow min-w-0">
                <p className="text-white font-medium text-sm truncate">{row.name}</p>
                <p className="text-gray-500 text-xs truncate">{row.position} &middot; {row.domain}</p>
              </div>
              <div className="flex items-center gap-0.5 shrink-0">
                <button onClick={async () => { await db.updateMember(row.id, { visible: !row.visible }); load(); }} className={`p-1.5 cursor-pointer ${row.visible === false ? 'text-gray-600 hover:text-white' : 'text-emerald-400 hover:text-emerald-300'}`} title={row.visible === false ? 'Hidden' : 'Visible'}>
                  {row.visible === false ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => setEditing(row)} className="text-gray-400 hover:text-white p-1.5 cursor-pointer"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(row.id)} className="text-gray-400 hover:text-red-400 p-1.5 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MemberEditor({ initial, onSave, onCancel }: { initial: any; onSave: (d: Record<string, any>) => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    name: initial?.name || '',
    position: initial?.position || '',
    domain: initial?.domain || MEMBER_DOMAINS[0],
    photo: initial?.photo || '',
    bio: initial?.bio || '',
    linkedin: initial?.linkedin || '',
    github: initial?.github || '',
    instagram: initial?.instagram || '',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(initial?.photo || '');
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const path = `members/${Date.now()}_${file.name}`;
      const url = await db.uploadFile('images', path, file);
      setForm(p => ({ ...p, photo: url }));
      setPhotoPreview(url);
    } catch { alert('Upload failed'); }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) { alert('Name is required'); return; }
    setSaving(true);
    try { await onSave(form); } catch { alert('Error saving'); }
    setSaving(false);
  };

  const inputClass = "w-full bg-zinc-900 border border-white/10 focus:border-iris-purple/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors";

  return (
    <div>
      <button onClick={onCancel} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 cursor-pointer">
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      <h2 className="text-white font-semibold text-lg mb-6">{initial ? 'Edit Member' : 'Add Member'}</h2>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        {/* Photo */}
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Photo</label>
          <div className="flex items-center gap-4">
            {photoPreview ? (
              <img src={photoPreview} alt="" referrerPolicy="no-referrer" className="w-16 h-16 rounded-full object-cover border border-white/10 shrink-0" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
            )}
            <div>
              <input type="text" value={form.photo} onChange={e => { setForm(p => ({ ...p, photo: e.target.value })); setPhotoPreview(e.target.value); }} className={`${inputClass} mb-2`} placeholder="Photo URL or upload" />
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 text-sm text-iris-purple hover:text-white border border-iris-purple/30 hover:border-iris-purple px-4 py-2 rounded-lg cursor-pointer transition-all disabled:opacity-50">
                <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload Photo'}
              </button>
            </div>
          </div>
        </div>

        {/* Name + Position + Domain */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Name *</label>
            <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={inputClass} placeholder="Full name" />
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Position</label>
            <input type="text" value={form.position} onChange={e => setForm(p => ({ ...p, position: e.target.value }))} className={inputClass} placeholder="e.g. Technical Lead" />
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Domain</label>
            <select value={form.domain} onChange={e => setForm(p => ({ ...p, domain: e.target.value }))} className={`${inputClass} cursor-pointer`}>
              {MEMBER_DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Bio</label>
          <textarea value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} rows={3} className={`${inputClass} resize-y`} placeholder="Short bio or tagline" />
        </div>

        {/* Social Links */}
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-3">Social Links</label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xs w-20 shrink-0">LinkedIn</span>
              <input type="url" value={form.linkedin} onChange={e => setForm(p => ({ ...p, linkedin: e.target.value }))} className={inputClass} placeholder="https://linkedin.com/in/..." />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xs w-20 shrink-0">GitHub</span>
              <input type="url" value={form.github} onChange={e => setForm(p => ({ ...p, github: e.target.value }))} className={inputClass} placeholder="https://github.com/..." />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xs w-20 shrink-0">Instagram</span>
              <input type="url" value={form.instagram} onChange={e => setForm(p => ({ ...p, instagram: e.target.value }))} className={inputClass} placeholder="https://instagram.com/..." />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-iris-purple hover:bg-iris-purple/80 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all">
            {saving ? 'Saving...' : initial ? 'Update Member' : 'Add Member'}
          </button>
          <button type="button" onClick={onCancel} className="text-gray-400 hover:text-white px-4 py-2.5 text-sm cursor-pointer">Cancel</button>
        </div>
      </form>
    </div>
  );
}

// ─── Mentors Tab ─────────────────────────────────────────

function MentorsTab() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);

  const load = () => { db.getMentors().then(d => { setRows(d || []); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this mentor?')) return;
    await db.deleteMentor(id);
    load();
  };

  const handleSave = async (data: Record<string, any>) => {
    if (editing) await db.updateMentor(editing.id, data);
    else await db.createMentor(data);
    setEditing(null);
    setCreating(false);
    load();
  };

  if (creating || editing) {
    return <MentorEditor initial={editing} onSave={handleSave} onCancel={() => { setEditing(null); setCreating(false); }} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-semibold text-lg">Mentors</h2>
        <button onClick={() => setCreating(true)} className="flex items-center gap-2 bg-iris-purple hover:bg-iris-purple/80 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all">
          <Plus className="w-4 h-4" /> Add Mentor
        </button>
      </div>
      {loading ? <p className="text-gray-500 text-sm">Loading...</p> : rows.length === 0 ? (
        <p className="text-gray-500 text-sm">No mentors yet.</p>
      ) : (
        <div className="space-y-3">
          {rows.map(row => (
            <div key={row.id} className={`flex items-center gap-4 bg-zinc-900/80 border border-white/5 rounded-xl p-4 ${row.visible === false ? 'opacity-50' : ''}`}>
              {row.photo ? (
                <img src={row.photo} alt="" referrerPolicy="no-referrer" className="w-12 h-12 rounded-full object-cover shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {row.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </div>
              )}
              <div className="flex-grow min-w-0">
                <p className="text-white font-medium text-sm truncate">{row.name}</p>
                <p className="text-gray-500 text-xs">{row.title} &middot; {row.department}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={async () => { await db.updateMentor(row.id, { visible: !row.visible }); load(); }} className={`p-2 cursor-pointer ${row.visible === false ? 'text-gray-600 hover:text-white' : 'text-emerald-400 hover:text-emerald-300'}`} title={row.visible === false ? 'Hidden' : 'Visible'}>
                  {row.visible === false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button onClick={() => setEditing(row)} className="text-gray-400 hover:text-white p-2 cursor-pointer"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(row.id)} className="text-gray-400 hover:text-red-400 p-2 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MentorEditor({ initial, onSave, onCancel }: { initial: any; onSave: (d: Record<string, any>) => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    name: initial?.name || '',
    title: initial?.title || '',
    department: initial?.department || '',
    photo: initial?.photo || '',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(initial?.photo || '');
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const path = `mentors/${Date.now()}_${file.name}`;
      const url = await db.uploadFile('images', path, file);
      setForm(p => ({ ...p, photo: url }));
      setPhotoPreview(url);
    } catch { alert('Upload failed'); }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) { alert('Name is required'); return; }
    setSaving(true);
    try { await onSave(form); } catch { alert('Error saving'); }
    setSaving(false);
  };

  const inputClass = "w-full bg-zinc-900 border border-white/10 focus:border-iris-purple/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors";

  return (
    <div>
      <button onClick={onCancel} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 cursor-pointer">
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      <h2 className="text-white font-semibold text-lg mb-6">{initial ? 'Edit Mentor' : 'Add Mentor'}</h2>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        {/* Photo */}
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Photo</label>
          <div className="flex items-center gap-4">
            {photoPreview ? (
              <img src={photoPreview} alt="" referrerPolicy="no-referrer" className="w-16 h-16 rounded-full object-cover border border-white/10 shrink-0" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
            )}
            <div>
              <input type="text" value={form.photo} onChange={e => { setForm(p => ({ ...p, photo: e.target.value })); setPhotoPreview(e.target.value); }} className={`${inputClass} mb-2`} placeholder="Photo URL or upload" />
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 text-sm text-iris-purple hover:text-white border border-iris-purple/30 hover:border-iris-purple px-4 py-2 rounded-lg cursor-pointer transition-all disabled:opacity-50">
                <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload Photo'}
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Name *</label>
          <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={inputClass} placeholder="Full name" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Title</label>
            <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className={inputClass} placeholder="e.g. Faculty Advisor" />
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Department</label>
            <input type="text" value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} className={inputClass} placeholder="e.g. Computer Science" />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-iris-purple hover:bg-iris-purple/80 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all">
            {saving ? 'Saving...' : initial ? 'Update Mentor' : 'Add Mentor'}
          </button>
          <button type="button" onClick={onCancel} className="text-gray-400 hover:text-white px-4 py-2.5 text-sm cursor-pointer">Cancel</button>
        </div>
      </form>
    </div>
  );
}

// ─── Generic CRUD (fallback) ─────────────────────────────

function CrudTable({ table, columns, formFields }: { table: string; columns: string[]; formFields: string[] }) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);

  const load = () => {
    setLoading(true);
    const fn = (db as any)[`get${table.charAt(0).toUpperCase() + table.slice(1)}`];
    fn().then((d: any) => { setRows(d || []); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(load, [table]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    const fn = (db as any)[`delete${table.charAt(0).toUpperCase() + table.slice(1).replace(/s$/, '')}`];
    await fn(id);
    load();
  };

  const handleSave = async (data: Record<string, any>) => {
    const entity = table.charAt(0).toUpperCase() + table.slice(1).replace(/s$/, '');
    if (editing) await (db as any)[`update${entity}`](editing.id, data);
    else await (db as any)[`create${entity}`](data);
    setEditing(null);
    setCreating(false);
    load();
  };

  if (creating || editing) {
    return <FormEditor fields={formFields} initial={editing} onSave={handleSave} onCancel={() => { setEditing(null); setCreating(false); }} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-semibold text-lg capitalize">{table}</h2>
        <button onClick={() => setCreating(true)} className="flex items-center gap-2 bg-iris-purple hover:bg-iris-purple/80 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all">
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>
      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : rows.length === 0 ? (
        <p className="text-gray-500 text-sm">No items yet. Add one to get started.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {columns.map(c => <th key={c} className="text-left text-gray-500 text-xs uppercase tracking-wider py-3 px-3">{c.replace(/_/g, ' ')}</th>)}
                <th className="text-right py-3 px-3 text-gray-500 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  {columns.map(c => <td key={c} className="py-3 px-3 text-gray-300 max-w-[200px] truncate">{Array.isArray(row[c]) ? row[c].join(', ') : (row[c] || '—')}</td>)}
                  <td className="py-3 px-3 text-right">
                    <button onClick={() => setEditing(row)} className="text-gray-400 hover:text-white p-1.5 cursor-pointer"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(row.id)} className="text-gray-400 hover:text-red-400 p-1.5 cursor-pointer ml-1"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FormEditor({ fields, initial, onSave, onCancel }: { fields: string[]; initial: any; onSave: (d: Record<string, any>) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Record<string, any>>(() => {
    if (initial) return { ...initial };
    return fields.reduce((acc, f) => ({ ...acc, [f]: '' }), {});
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const imageFields = ['image', 'photo'];
  const isImageField = (f: string) => imageFields.includes(f);

  const handleImageUpload = async (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const path = `${field}/${Date.now()}_${file.name}`;
      const url = await db.uploadFile('images', path, file);
      setForm(p => ({ ...p, [field]: url }));
    } catch { alert('Upload failed'); }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data: Record<string, any> = {};
    fields.forEach(f => {
      if (f === 'tech_stack' || f === 'domains') {
        data[f] = typeof form[f] === 'string' ? form[f].split(',').map((s: string) => s.trim()).filter(Boolean) : form[f];
      } else if (f === 'spots_left') {
        data[f] = parseInt(form[f]) || 0;
      } else {
        data[f] = form[f] || '';
      }
    });
    try { await onSave(data); } catch { alert('Error saving'); }
    setSaving(false);
  };

  const inputClass = "w-full bg-zinc-900 border border-white/10 focus:border-iris-purple/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors";

  return (
    <div>
      <button onClick={onCancel} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 cursor-pointer">
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      <h2 className="text-white font-semibold text-lg mb-6">{initial ? 'Edit' : 'Create New'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        {fields.map(f => (
          <div key={f}>
            <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">{f.replace(/_/g, ' ')}</label>
            {(f === 'content' || f === 'full_description' || f === 'description' || f === 'bio') ? (
              <textarea value={form[f] || ''} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} rows={5} className={`${inputClass} resize-y`} />
            ) : isImageField(f) ? (
              <div className="flex items-start gap-3">
                <div className="flex-grow">
                  <input type="text" value={form[f] || ''} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} className={inputClass} placeholder="URL or upload" />
                  <input ref={fileRef} type="file" accept="image/*" onChange={e => handleImageUpload(f, e)} className="hidden" />
                  <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="mt-2 flex items-center gap-2 text-xs text-iris-purple hover:text-white border border-iris-purple/30 px-3 py-1.5 rounded-lg cursor-pointer transition-all disabled:opacity-50">
                    <Upload className="w-3.5 h-3.5" /> {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
                {form[f] && <img src={form[f]} alt="" referrerPolicy="no-referrer" className="w-14 h-14 rounded-lg object-cover border border-white/10 shrink-0" />}
              </div>
            ) : (
              <input
                type="text"
                value={Array.isArray(form[f]) ? form[f].join(', ') : (form[f] || '')}
                onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                className={inputClass}
                placeholder={f === 'tech_stack' ? 'Comma-separated values' : ''}
              />
            )}
          </div>
        ))}
        <div className="flex items-center gap-3 pt-4">
          <button type="submit" disabled={saving} className="bg-iris-purple hover:bg-iris-purple/80 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all">
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={onCancel} className="text-gray-400 hover:text-white px-4 py-2.5 text-sm cursor-pointer">Cancel</button>
        </div>
      </form>
    </div>
  );
}

// ─── Applications Tab ────────────────────────────────────

function ApplicationsTab() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    db.getApplications().then(d => { setApps(d || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this application?')) return;
    await db.deleteApplication(id);
    setApps(prev => prev.filter(a => a.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const handleStatus = async (id: string, status: string) => {
    await db.updateApplication(id, { status });
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  if (loading) return <p className="text-gray-500 text-sm">Loading...</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h2 className="text-white font-semibold text-lg mb-6">Applications ({apps.length})</h2>
        {apps.length === 0 ? (
          <p className="text-gray-500 text-sm">No applications yet.</p>
        ) : (
          <div className="space-y-3">
            {apps.map(app => (
              <div
                key={app.id}
                onClick={() => setSelected(app)}
                className={`bg-zinc-900/80 border rounded-xl p-4 cursor-pointer transition-all ${
                  selected?.id === app.id ? 'border-iris-purple/50' : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-sm">{app.name}</p>
                    <p className="text-gray-500 text-xs">{app.email} &middot; {app.branch} &middot; Year {app.year}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                      app.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400' :
                      app.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>{app.status}</span>
                    <button onClick={e => { e.stopPropagation(); handleDelete(app.id); }} className="text-gray-500 hover:text-red-400 p-1 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-zinc-900/80 border border-white/5 rounded-xl p-6 h-fit sticky top-8">
        {selected ? (
          <div>
            <h3 className="text-white font-semibold mb-4">{selected.name}</h3>
            <div className="space-y-3 text-sm">
              <div><span className="text-gray-500">PRN:</span> <span className="text-white ml-2">{selected.prn}</span></div>
              <div><span className="text-gray-500">Email:</span> <span className="text-white ml-2">{selected.email}</span></div>
              <div><span className="text-gray-500">Phone:</span> <span className="text-white ml-2">{selected.phone}</span></div>
              <div><span className="text-gray-500">Branch:</span> <span className="text-white ml-2">{selected.branch}</span></div>
              <div><span className="text-gray-500">Year:</span> <span className="text-white ml-2">{selected.year}</span></div>
              <div><span className="text-gray-500">Domains:</span> <span className="text-white ml-2">{(selected.domains || []).join(', ')}</span></div>
              {selected.interests && <div><span className="text-gray-500">Interests:</span> <span className="text-gray-300 ml-2">{selected.interests}</span></div>}
              {selected.experience && <div><span className="text-gray-500">Experience:</span> <span className="text-gray-300 ml-2">{selected.experience}</span></div>}
              {selected.why && <div><span className="text-gray-500">Why IRIS:</span> <span className="text-gray-300 ml-2">{selected.why}</span></div>}
              {selected.resume_url && <a href={selected.resume_url} target="_blank" rel="noopener noreferrer" className="text-iris-purple text-xs hover:underline block mt-2">View Resume</a>}
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => handleStatus(selected.id, 'accepted')} className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-lg cursor-pointer">Accept</button>
              <button onClick={() => handleStatus(selected.id, 'rejected')} className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg cursor-pointer">Reject</button>
              <button onClick={() => handleStatus(selected.id, 'pending')} className="bg-zinc-700 hover:bg-zinc-600 text-white text-xs px-3 py-1.5 rounded-lg cursor-pointer">Pending</button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center py-8">Select an application to view details</p>
        )}
      </div>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────

function toInputDate(dateStr: string): string {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0];
}

function formatDate(isoDate: string): string {
  if (!isoDate) return '';
  const d = new Date(isoDate + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
