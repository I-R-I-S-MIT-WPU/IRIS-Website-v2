import { supabase } from './supabase';

// ─── BLOGS ───────────────────────────────────────────────

export async function getBlogs(visibleOnly = false) {
  let q = supabase.from('blogs').select('*').order('created_at', { ascending: false });
  if (visibleOnly) q = q.eq('visible', true);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function getBlogById(id: string) {
  const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function createBlog(blog: Record<string, any>) {
  const { data, error } = await supabase.from('blogs').insert(blog).select().single();
  if (error) throw error;
  return data;
}

export async function updateBlog(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase.from('blogs').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteBlog(id: string) {
  const { error } = await supabase.from('blogs').delete().eq('id', id);
  if (error) throw error;
}

// ─── EVENTS ──────────────────────────────────────────────

export async function getEvents(visibleOnly = false) {
  let q = supabase.from('events').select('*').order('created_at', { ascending: false });
  if (visibleOnly) q = q.eq('visible', true);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function createEvent(event: Record<string, any>) {
  const { data, error } = await supabase.from('events').insert(event).select().single();
  if (error) throw error;
  return data;
}

export async function updateEvent(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase.from('events').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteEvent(id: string) {
  const { error } = await supabase.from('events').delete().eq('id', id);
  if (error) throw error;
}

// ─── PROJECTS ────────────────────────────────────────────

export async function getProjects(visibleOnly = false) {
  let q = supabase.from('projects').select('*').order('created_at', { ascending: false });
  if (visibleOnly) q = q.eq('visible', true);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function createProject(project: Record<string, any>) {
  const { data, error } = await supabase.from('projects').insert(project).select().single();
  if (error) throw error;
  return data;
}

export async function updateProject(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}

// ─── MEMBERS ─────────────────────────────────────────────

export async function getMembers(visibleOnly = false) {
  let q = supabase.from('members').select('*').order('created_at', { ascending: false });
  if (visibleOnly) q = q.eq('visible', true);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function createMember(member: Record<string, any>) {
  const { data, error } = await supabase.from('members').insert(member).select().single();
  if (error) throw error;
  return data;
}

export async function updateMember(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase.from('members').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteMember(id: string) {
  const { error } = await supabase.from('members').delete().eq('id', id);
  if (error) throw error;
}

// ─── MENTORS ─────────────────────────────────────────────

export async function getMentors(visibleOnly = false) {
  let q = supabase.from('mentors').select('*').order('created_at', { ascending: false });
  if (visibleOnly) q = q.eq('visible', true);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function createMentor(mentor: Record<string, any>) {
  const { data, error } = await supabase.from('mentors').insert(mentor).select().single();
  if (error) throw error;
  return data;
}

export async function updateMentor(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase.from('mentors').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteMentor(id: string) {
  const { error } = await supabase.from('mentors').delete().eq('id', id);
  if (error) throw error;
}

// ─── APPLICATIONS ────────────────────────────────────────

export async function getApplications() {
  const { data, error } = await supabase.from('applications').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createApplication(app: Record<string, any>) {
  const { data, error } = await supabase.from('applications').insert(app).select().single();
  if (error) throw error;
  return data;
}

export async function updateApplication(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase.from('applications').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteApplication(id: string) {
  const { error } = await supabase.from('applications').delete().eq('id', id);
  if (error) throw error;
}

// ─── STORAGE ─────────────────────────────────────────────

export async function uploadFile(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
  if (error) throw error;
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return urlData.publicUrl;
}

export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}
