export interface Member {
  id: string;
  name: string;
  position: string;
  domain: string;
  photo: string;
  bio: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  department: string;
  photo: string;
}

export const MENTORS: Mentor[] = [
  {
    id: 'mentor-1',
    name: 'Dr. Rajesh Kumar',
    title: 'Faculty Advisor',
    department: 'Computer Science & Engineering',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'mentor-2',
    name: 'Prof. Anita Deshmukh',
    title: 'Technical Mentor',
    department: 'Electronics & Telecommunication',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'mentor-3',
    name: 'Dr. Sanjay Patil',
    title: 'Research Advisor',
    department: 'Artificial Intelligence & Data Science',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
  },
];

export const MEMBERS: Member[] = [
  {
    id: 'member-1',
    name: 'Arjun Mehta',
    position: 'President',
    domain: 'Software',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
    bio: 'Full-stack developer passionate about building scalable systems.',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    id: 'member-2',
    name: 'Priya Sharma',
    position: 'Vice President',
    domain: 'Hardware',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    bio: 'Embedded systems engineer with a love for robotics.',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    id: 'member-3',
    name: 'Siddharth Roy',
    position: 'Technical Lead',
    domain: 'Software',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    bio: 'AI/ML researcher focused on edge inference and autonomous systems.',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    id: 'member-4',
    name: 'Ananya Kulkarni',
    position: 'Design Lead',
    domain: 'Non-Tech',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    bio: 'UI/UX designer who believes in minimal, functional design.',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
  },
  {
    id: 'member-5',
    name: 'Vikram Nair',
    position: 'Hardware Lead',
    domain: 'Hardware',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
    bio: 'PCB design, drone assembly, and flight controller firmware.',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    id: 'member-6',
    name: 'Neha Joshi',
    position: 'Content Lead',
    domain: 'Non-Tech',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    bio: 'Technical writer and content strategist for IRIS publications.',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
  },
  {
    id: 'member-7',
    name: 'Rohan Desai',
    position: 'Events Head',
    domain: 'Non-Tech',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    bio: 'Organizing hackathons, workshops, and campus tech events.',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'member-8',
    name: 'Kavya Patil',
    position: 'ML Engineer',
    domain: 'Software',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    bio: 'Computer vision and NLP. Currently working on Soteria.',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
];

export const LOCATIONS = [
  { name: 'Main Lab', description: 'Hardware prototyping, soldering stations, 3D printers', building: 'Block C, Room 204' },
  { name: 'Software Den', description: 'Development workspace with high-perf machines', building: 'Block A, Room 312' },
  { name: 'Testing Ground', description: 'Outdoor drone testing and robotics trials', building: 'Behind Block D' },
];
