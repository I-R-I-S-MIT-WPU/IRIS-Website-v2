# IRIS MIT-WPU Website

<div align="center">
  <img src="public/logo.png" alt="IRIS Logo" width="200" />
  
  **Innovation · Research · Intelligence · Support**
  
  Official website for IRIS, the premier technical club at MIT-WPU, Pune.
  
  [![Website](https://img.shields.io/badge/website-live-brightgreen)](https://iris-mitwpu.vercel.app)
  [![GitHub](https://img.shields.io/badge/github-IRIS--MITWPU-blue)](https://github.com/IRIS-MITWPU)
</div>

---

## 🚀 About IRIS

IRIS (Innovation, Research, Intelligence & Support) is a student-run technical club at MIT-WPU working across:
- 🤖 Robotics & Avionics
- 🧠 AI/ML & Computer Vision
- 💻 Full-stack Engineering
- 🎨 Design & Content Creation

We ship real products, not just prototypes.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Email**: EmailJS
- **Routing**: React Router v6
- **Deployment**: Vercel

---

## 📁 Project Structure

```
src/
├── components/        # React components
│   ├── Hero.tsx
│   ├── AboutUs.tsx
│   ├── Projects.tsx
│   ├── BlogsPage.tsx
│   ├── Dashboard.tsx  # Admin panel
│   └── ...
├── lib/              # Utilities & services
│   ├── db.ts         # Supabase queries
│   ├── supabase.ts   # Supabase client
│   └── emailjs.ts    # Email service
├── data/             # Static data & constants
├── types/            # TypeScript types
└── App.tsx           # Routes & layout
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- EmailJS account (for recruitment emails)

### 1. Clone the repository
```bash
git clone https://github.com/IRIS-MITWPU/IRIS-Website-v2.git
cd IRIS-Website-v2
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
Run the SQL in `src/lib/schema.sql` in your Supabase SQL editor to create tables:
- `blogs` - Blog posts
- `events` - Events & workshops
- `projects` - Project showcase
- `members` - Team members
- `mentors` - Faculty mentors
- `gallery` - About Us gallery images
- `applications` - Recruitment applications

### 5. Email Setup (Optional)
Configure EmailJS in `src/lib/emailjs.ts`:
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create a service & template
3. Update the config with your credentials

### 6. Run the development server
```bash
npm run dev
```

Visit `http://localhost:5173`

---

## 🔐 Admin Dashboard

Access the dashboard at `/dashboard` with credentials stored in `localStorage`:
- Username: `admin`
- Password: `iris@2025`

**Features:**
- ✏️ Manage blogs, events, projects
- 👥 Manage team members & mentors
- 🖼️ Control gallery images
- 📝 Review recruitment applications
- 👁️ Show/hide content visibility

---

## 📦 Build & Deploy

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/IRIS-MITWPU/IRIS-Website-v2)

---

## 🎨 Features

### Public Pages
- 🏠 **Landing Page** - Hero, About, Projects, Events, Blogs
- 📝 **Blog** - Research articles with search & filtering
- 📚 **Research** - Published papers & publications
- 🚀 **Projects** - Detailed project pages with galleries
- 🎪 **Events** - Event listings with registration
- 👥 **About** - Team members, mentors, spaces
- 📬 **Recruitment** - Multi-step application form

### Admin Features
- 📊 Overview dashboard with stats
- 🖼️ Image uploads to Supabase Storage
- 📅 Date pickers for events/blogs
- 🏷️ Tag & domain droppers
- 👁️ Visibility toggles
- 🗑️ CRUD operations

### UI/UX
- 🌑 Dark mode design
- ✨ Smooth animations
- 📱 Fully responsive
- ♿ Accessible
- 🎭 Animated glows & gradients

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

- **Email**: iris@mitwpu.edu.in
- **Instagram**: [@iris_mitwpu](https://www.instagram.com/iris_mitwpu/)
- **LinkedIn**: [IRIS MIT-WPU](https://www.linkedin.com/company/105128747)
- **GitHub**: [@IRIS-MITWPU](https://github.com/IRIS-MITWPU)

---

<div align="center">
  Made with ❤️ by IRIS Team
  
  **© IRIS MIT-WPU 2025**
</div>
