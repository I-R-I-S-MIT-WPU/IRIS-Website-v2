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
  created_at timestamptz default now()
);

-- Events
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  date date not null,
  time text,
  location text,
  speaker text,
  spots_left int default 50,
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

-- Members
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  role text,
  domain text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Storage buckets (run these separately or create via Supabase dashboard):
-- 1. "resumes" - for recruitment CV uploads
-- 2. "images" - for blog/project/event images
