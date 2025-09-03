# 📋 Domore - Advanced Task Management Platform

A modern, feature-rich task management application built with Next.js 15, TypeScript, and Supabase. Domore helps you organize, prioritize, and track your tasks with powerful analytics and an intuitive user interface.

![Domore Dashboard](/demoimage.png
)
![Domore Callender](/demoimage2.png
)![Domore Analytics](/demoimage3.png
)
## ✨ Features

### 🎯 Core Task Management
- **Create & Edit Tasks** - Simple task creation with rich descriptions
- **Priority System** - Three-tier priority levels (High, Medium, Low) with color coding
- **Due Date Management** - Set and track task deadlines
- **Task Status** - Mark tasks as pending or completed
- **Search & Filter** - Find tasks quickly by title, description, status, or priority

### 📊 Analytics & Insights
- **Completion Rates** - Track your productivity over time
- **Priority Distribution** - Visualize task distribution by priority
- **Progress Charts** - Monitor your task completion trends
- **Productivity Metrics** - Understand your work patterns

### 📅 Calendar View
- **Monthly Calendar** - See tasks organized by due dates
- **Task Overview** - Visual representation of your schedule
- **Date-based Planning** - Plan your work around deadlines

### 🔐 Authentication & Security
- **Secure Login** - Email/password authentication via Supabase
- **GitHub OAuth** - Quick login with GitHub integration
- **Password Reset** - Secure password recovery system
- **Protected Routes** - Authenticated access to dashboard features

### 🎨 Modern UI/UX
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Dark/Light Theme** - Toggle between themes for comfort
- **Smooth Animations** - Framer Motion powered interactions
- **Skeleton Loading** - Enhanced loading states for better UX
- **Gradient Styling** - Modern visual design with gradients

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.2** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Shadcn/ui** - Reusable component library
- **Lucide React** - Beautiful icon set

### Backend & Database
- **Supabase** - Backend as a Service
- **PostgreSQL** - Robust relational database
- **Row Level Security** - Secure data access policies

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundler for development

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vishal-770/domore.git
   cd domore
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   Run the following SQL in your Supabase SQL editor:
   ```sql
   -- Create tasks table
   CREATE TABLE tasks (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
     completed BOOLEAN DEFAULT false,
     due_date TIMESTAMPTZ,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Enable RLS
   ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Users can view own tasks" ON tasks
     FOR SELECT USING (auth.uid() = user_id);

   CREATE POLICY "Users can create own tasks" ON tasks
     FOR INSERT WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can update own tasks" ON tasks
     FOR UPDATE USING (auth.uid() = user_id);

   CREATE POLICY "Users can delete own tasks" ON tasks
     FOR DELETE USING (auth.uid() = user_id);
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Getting Started
1. **Register/Login** - Create an account or sign in
2. **Create Tasks** - Click "New Task" to add your first task
3. **Set Priorities** - Assign priority levels to organize your work
4. **Track Progress** - Mark tasks as complete when finished
5. **Analyze Performance** - Visit the analytics dashboard for insights

### Key Features Guide

#### Task Management
- Use the search bar to find specific tasks
- Filter by status (pending/completed) or priority level
- Click on any task to edit its details
- Use the completion checkbox to mark tasks as done

#### Analytics Dashboard
- View completion rates over time
- See task distribution by priority
- Monitor productivity trends
- Access detailed progress charts

#### Calendar View
- Switch to calendar mode to see tasks by date
- Plan your schedule around due dates
- Get an overview of upcoming deadlines

## 🏗️ Project Structure

```
domore/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (website)/         # Public pages
│   │   ├── dashboard/         # Protected dashboard
│   │   └── api/              # API routes
│   ├── components/            # Reusable components
│   │   ├── ui/               # Shadcn UI components
│   │   └── ...               # Custom components
│   ├── lib/                  # Utilities
│   └── utils/                # Helper functions
├── public/                   # Static assets
└── ...                      # Config files
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Implement proper error handling
- Write clean, readable code with comments

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Docker containers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - Component library
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## 📞 Support

If you have any questions or need help getting started:

- 📧 Email: support@domore.com
- 💬 Feedback: feedback@domore.com
- 📱 Phone: +1 (555) 123-4567

---

**Built with ❤️ by [Vishal](https://github.com/Vishal-770)**
