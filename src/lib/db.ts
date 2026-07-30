import { supabase } from './supabase';

// ─── BLOGS ───────────────────────────────────────────────

export async function getBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getBlogById(id: string) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function createBlog(blog: {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tag: string;
  image: string;
  read_time: string;
}) {
  const { data, error } = await supabase
    .from('blogs')
    .insert(blog)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateBlog(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase
    .from('blogs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteBlog(id: string) {
  const { error } = await supabase.from('blogs').delete().eq('id', id);
  if (error) throw error;
}

// ─── EVENTS ──────────────────────────────────────────────

export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createEvent(event: {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  speaker: string;
  spots_left: number;
}) {
  const { data, error } = await supabase
    .from('events')
    .insert(event)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateEvent(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteEvent(id: string) {
  const { error } = await supabase.from('events').delete().eq('id', id);
  if (error) throw error;
}

// ─── PROJECTS ────────────────────────────────────────────

export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createProject(project: {
  title: string;
  short_description: string;
  full_description: string;
  category: string;
  tech_stack: string[];
  status: string;
  lead: string;
  image: string;
}) {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProject(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}

// ─── RECRUITMENT APPLICATIONS ────────────────────────────

export async function getApplications() {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createApplication(app: {
  name: string;
  prn: string;
  email: string;
  phone: string;
  branch: string;
  year: string;
  domains: string[];
  resume_url?: string;
  interests?: string;
  experience?: string;
  why?: string;
}) {
  const { data, error } = await supabase
    .from('applications')
    .insert(app)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateApplication(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase
    .from('applications')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteApplication(id: string) {
  const { error } = await supabase.from('applications').delete().eq('id', id);
  if (error) throw error;
}

// ─── MEMBERS ─────────────────────────────────────────────

export async function getMembers() {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createMember(member: {
  name: string;
  email: string;
  role: string;
  domain: string;
  avatar_url?: string;
}) {
  const { data, error } = await supabase
    .from('members')
    .insert(member)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateMember(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase
    .from('members')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteMember(id: string) {
  const { error } = await supabase.from('members').delete().eq('id', id);
  if (error) throw error;
}

// ─── STORAGE (file uploads) ──────────────────────────────

export async function uploadFile(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true });
  if (error) throw error;
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return urlData.publicUrl;
}

export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}
