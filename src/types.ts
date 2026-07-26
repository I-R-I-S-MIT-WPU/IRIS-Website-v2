export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  category: string;
  techStack: string[];
  status: 'Active' | 'Beta' | 'Completed';
  lead: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  speaker: string;
  spotsLeft: number;
}

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'soteria',
    title: 'SOTERIA',
    subtitle: 'Robotic Autonomous Defense Mesh',
    shortDescription: 'A fully integrated security system designed for advanced surveillance, facial recognition, and automated threat mitigation.',
    fullDescription: 'Soteria represents a paradigm shift in autonomous security. Powered by advanced edge-AI models, it coordinates a mesh network of stationary sensors, optical nodes, and mobile robotic units to monitor complex environments. Featuring ultra-low latency spatial mapping and robust human-in-the-loop validation protocol, Soteria is capable of zero-error threat verification.',
    image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=800&auto=format&fit=crop',
    category: 'Robotics & AI',
    techStack: ['C++', 'TensorFlow Edge', 'ROS 2', 'WebRTC', 'LIDAR Mesh'],
    status: 'Active',
    lead: 'Dr. Evelyn Vance'
  },
  {
    id: 'vyas',
    title: 'VYAS',
    subtitle: 'Neural-Relational DB Engine',
    shortDescription: 'A highly scalable database engine built for high-performance neural vector indexing and parallel querying.',
    fullDescription: 'Vyas bridge the gap between structured relational data and high-dimensional neural embeddings. Engineered on a custom Rust core, Vyas allows seamless mixed queries, enabling developers to search through structured records and semantic vector spaces concurrently at sub-millisecond speeds. Built-in consensus protocol ensures robust replication.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    category: 'Databases',
    techStack: ['Rust', 'gRPC', 'SIMD Assembly', 'Raft Consensus'],
    status: 'Beta',
    lead: 'Vikram Mehta'
  },
  {
    id: 'tarzan',
    title: 'TARZAN',
    subtitle: 'Autonomous Bio-inspired Drone Network',
    shortDescription: 'An autonomous aerial vehicle navigation system utilizing bio-mimetic vision and decentralized swarm coordination.',
    fullDescription: 'Tarzan is an advanced flight stack designed for dense canopy navigation and GPS-denied environments. Inspired by biological flight mechanics, Tarzan coordinates a swarm of lightweight drones utilizing optical flow, neural depth estimation, and localized RF-ranging, creating an ultra-robust mapping grid in real-time.',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=800&auto=format&fit=crop',
    category: 'Avionics',
    techStack: ['Python', 'PyTorch', 'PX4 Autopilot', 'SLAM', 'UWB Mesh'],
    status: 'Active',
    lead: 'Siddharth Roy'
  }
];

export const INITIAL_BLOGS: Blog[] = [
  {
    id: 'life-and-stuff-1',
    title: 'A Blog About Life And Stuff',
    excerpt: 'An introspective look into how artificial neural structures mimic biological neural loops, and what that tells us about learning.',
    content: 'The boundary between artificial and biological cognition continues to blur. In this first segment, we explore the structural parallels of synaptic pruning and artificial weight decay. How does a system decide what is worth remembering and what is noise? We dive deep into high-dimensional space representation, showing that cognitive models, whether built of carbon or silicon, converge on surprisingly similar geometric patterns when learning about our physical reality.',
    category: 'Philosophy & AI',
    author: {
      name: 'Dr. Sarah Connor',
      role: 'Cognitive Neuroscientist',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
    },
    date: 'July 12, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'life-and-stuff-2',
    title: 'A Day About Life and Real-world Tech',
    excerpt: 'Behind the scenes at the I.R.I.S. Lab, where high-voltage solder meets low-latency firmware compilation.',
    content: 'Building physical prototypes is a journey of patience. We outline a typical 24-hour cycle of rapid physical prototyping for the Soteria surveillance arm. From the initial carbon fiber chassis bake to tuning PID loops on brushless motors, we share our triumphs and our failures. Including a detailed breakdown of why standard stepper motors were replaced with custom direct-drive actuators to eliminate mechanical backlash.',
    category: 'Lab Notes',
    author: {
      name: 'Alex Rivera',
      role: 'Lead Hardware Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
    },
    date: 'July 10, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'life-and-stuff-3',
    title: 'A Magnificent Life And Stuff',
    excerpt: 'Exploring the mathematics of emergent swarms and how decentralized coordination solves complex routing.',
    content: 'Can individual simple agents solve planetary-scale logistical puzzles? Yes, by leveraging swarm intelligence. This paper breaks down the localized consensus algorithms used in Project Tarzan. We explain how individual drone nodes make macro-level path adjustments based strictly on local peer distance vectors, completely eliminating the need for a centralized controller or cloud connectivity.',
    category: 'Avionics & Swarms',
    author: {
      name: 'Elena Rostova',
      role: 'Research Fellow',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop'
    },
    date: 'July 05, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop'
  }
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'event-1',
    title: 'A.I. & M.L. Workshop',
    description: 'An intensive, hands-on session exploring transformer layers, vector search optimizations, and locally deployed LLM fine-tuning patterns.',
    date: 'July 24, 2026',
    time: '10:00 AM - 4:00 PM IST',
    location: 'I.R.I.S. Main Lab & Virtual Stream',
    speaker: 'Dr. Evelyn Vance & Guest Researchers',
    spotsLeft: 12
  },
  {
    id: 'event-2',
    title: 'Robotics Assembly Hackathon',
    description: 'Bring your soldering iron and firmware stacks. Participants will have 48 hours to assemble, calibrate, and program a bio-inspired quadruped scout.',
    date: 'August 08, 2026',
    time: '09:00 AM (Aug 08) - 06:00 PM (Aug 10) IST',
    location: 'Hardware Prototyping Bay',
    speaker: 'Alex Rivera, Lead Hardware Engineer',
    spotsLeft: 4
  },
  {
    id: 'event-3',
    title: 'Decentralized Avionics Symposium',
    description: 'Keynote talks and paper presentations exploring bio-mimetic flight mechanics, sensor-fusion under jamming conditions, and UWB mesh networks.',
    date: 'August 22, 2026',
    time: '1:00 PM - 7:00 PM IST',
    location: 'Auditorium C & Live stream',
    speaker: 'Siddharth Roy & Swarm Robotics Panel',
    spotsLeft: 45
  }
];
