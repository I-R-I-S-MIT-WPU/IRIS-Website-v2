-- Run this in your Supabase SQL editor to set up the tables

-- Blogs
create table if not exists blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  content text not null,
  author text not null,
  tag text,
  image text,
  read_time text,
  date text,
  visible boolean default true,
  pinned boolean default false,
  created_at timestamptz default now()
);

-- Events
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  date text not null,
  time text,
  location text,
  speaker text,
  spots_left int default 50,
  visible boolean default true,
  created_at timestamptz default now()
);

-- Projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  short_description text,
  full_description text,
  category text,
  tech_stack text[] default '{}',
  status text default 'Active',
  lead text,
  image text,
  gallery text[] default '{}',
  team_members uuid[] default '{}',
  visible boolean default true,
  pinned boolean default false,
  created_at timestamptz default now()
);

-- Members
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text,
  domain text,
  photo text,
  bio text,
  linkedin text,
  github text,
  instagram text,
  visible boolean default true,
  pinned boolean default false,
  created_at timestamptz default now()
);

-- Mentors
create table if not exists mentors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text,
  department text,
  photo text,
  visible boolean default true,
  created_at timestamptz default now()
);

-- Gallery (About Us section)
create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  image text not null,
  visible boolean default true,
  created_at timestamptz default now()
);

-- Recruitment Applications
create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  prn text not null,
  email text not null,
  phone text not null,
  branch text not null,
  year text not null,
  domains text[] default '{}',
  resume_url text,
  interests text,
  experience text,
  why text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Enable RLS but allow public read on content tables
alter table blogs enable row level security;
alter table events enable row level security;
alter table projects enable row level security;
alter table members enable row level security;
alter table mentors enable row level security;
alter table gallery enable row level security;
alter table applications enable row level security;

-- Public read policies
create policy "Public read blogs" on blogs for select using (true);
create policy "Public read events" on events for select using (true);
create policy "Public read projects" on projects for select using (true);
create policy "Public read members" on members for select using (true);
create policy "Public read mentors" on mentors for select using (true);
create policy "Public read gallery" on gallery for select using (true);

-- Anon insert for applications (recruitment form)
create policy "Anon insert applications" on applications for insert with check (true);

-- Anon full access for dashboard (since we use localStorage auth, not Supabase auth)
create policy "Anon manage blogs" on blogs for all using (true) with check (true);
create policy "Anon manage events" on events for all using (true) with check (true);
create policy "Anon manage projects" on projects for all using (true) with check (true);
create policy "Anon manage members" on members for all using (true) with check (true);
create policy "Anon manage mentors" on mentors for all using (true) with check (true);
create policy "Anon manage gallery" on gallery for all using (true) with check (true);
create policy "Anon manage applications" on applications for all using (true) with check (true);
