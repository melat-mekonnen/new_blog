# template-repo
template for access
# Ethiopian Games Association - Blog System

A modern, responsive blog system built with Next.js 15, TypeScript, and Supabase. This is a plug-and-play solution that can be easily integrated into any Next.js project.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Database**: PostgreSQL via Supabase
- **Real-time Updates**: Live blog post management
- **Admin Panel**: Complete CRUD operations for posts and settings
- **Responsive Design**: Works perfectly on all devices
- **SEO Optimized**: Built-in Next.js optimizations
- **Type Safe**: Full TypeScript support

## 📋 Prerequisites

- Node.js 18+ 
- A Supabase account and project

## 🛠️ Installation

### 1. Clone or Install the Package

```bash
# If using as a template
git clone <repository-url>
cd ethiopian-games-blog

# Install dependencies
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to find your credentials
3. Create the following tables in your Supabase SQL editor:

```sql
-- Create blog_posts table
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(500) NOT NULL,
  date DATE NOT NULL,
  author VARCHAR(100) NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site_settings table
CREATE TABLE site_settings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT NOT NULL,
  mission TEXT NOT NULL,
  quote TEXT NOT NULL,
  hero_image VARCHAR(500) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (id, title, subtitle, mission, quote, hero_image) VALUES (
  1,
  'Ethiopian Games Association Blog',
  'Sharing stories, insights, and updates about games, gamification, and the community.',
  'Games and play are a language that the world can speak; through games you can create, connect and cultivate economy, culture, and values.',
  'Games teach resilience, discipline, and continuous growth — elevating us to become better humans through determination and excellence.',
  'https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=1600'
);

-- Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, content, image, date, author, published) VALUES 
(
  'How Gaming Builds Resilience and Discipline',
  'Explore how games teach valuable life skills like resilience and continuous growth.',
  'Gaming has evolved far beyond entertainment. Modern games challenge players to develop critical thinking, strategic planning, and emotional resilience. Through repeated failures and successes, gamers learn to adapt, persevere, and continuously improve their skills.',
  '/assets/images/events/mobile_legend_championship.webp',
  '2024-01-15',
  'EGA Team',
  true
),
(
  'Connecting Communities Through Games',
  'Discover how gaming brings people together to create culture and economy.',
  'Games serve as a universal language that transcends geographical and cultural boundaries. They create shared experiences, foster teamwork, and build lasting friendships. The gaming community in Ethiopia is growing rapidly, connecting young minds and creating opportunities.',
  '/assets/images/events/mobile_legend_championship.webp',
  '2024-01-10',
  'EGA Team',
  true
);
```

### 3. Environment Setup

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Replace the values with your actual Supabase credentials.

### 4. Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The application will be available at `http://localhost:3000/blog`

## 🎯 Usage

### Admin Access

1. Navigate to `/blog`
2. Scroll down and click "Admin Access"
3. Enter the admin password: `admin123`
4. You can now create, edit, and manage blog posts and site settings

### API Endpoints

The blog system provides RESTful API endpoints:

- `GET /api/blog/posts` - Get all posts (with optional query params: `published`, `search`)
- `POST /api/blog/posts` - Create a new post
- `GET /api/blog/posts/[id]` - Get a specific post
- `PUT /api/blog/posts/[id]` - Update a post
- `DELETE /api/blog/posts/[id]` - Delete a post
- `GET /api/blog/settings` - Get site settings
- `POST /api/blog/settings` - Update site settings

### Integration into Existing Projects

To integrate this blog system into your existing Next.js project:

1. Copy the following files/folders:
   - `src/app/api/blog/` (API routes)
   - `src/contexts/BlogContext.tsx`
   - `src/lib/supabase.ts`
   - `src/app/blog/` (blog pages)

2. Install dependencies:
   ```bash
   npm install @supabase/supabase-js
   ```

3. Add environment variables and set up Supabase tables as described above

4. Wrap your app with the BlogProvider:
   ```tsx
   import { BlogProvider } from '@/contexts/BlogContext'
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           <BlogProvider>
             {children}
           </BlogProvider>
         </body>
       </html>
     )
   }
   ```

## 🔧 Configuration

### Admin Password

Change the admin password in `src/contexts/BlogContext.tsx`:

```tsx
const adminPass = "your-secure-password"; // Change this!
```

### Styling

The blog uses Tailwind CSS with a custom design system. You can customize:

- Colors: Edit the color scheme in `tailwind.config.ts`
- Typography: Modify font settings in `src/app/globals.css`
- Layout: Update component styles in the blog page components

## 📁 File Structure

```
src/
├── app/
│   ├── api/blog/          # API routes
│   └── blog/              # Blog pages
├── contexts/
│   └── BlogContext.tsx    # State management
├── lib/
│   └── supabase.ts        # Database configuration
└── components/            # Reusable components
```

## 🚀 Deployment on Replit

This project is optimized for deployment on Replit:

1. Fork this Repl or import your code
2. Set up your environment variables in Replit's Secrets tab:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Run the project - it will automatically install dependencies
4. Deploy using Replit's deployment feature

## 🛡️ Security Considerations

- Change the default admin password
- Implement proper authentication for production use
- Use environment variables for sensitive data
- Enable Row Level Security (RLS) in Supabase for enhanced security
- Consider implementing JWT-based authentication for admin functions

## 📊 Database Schema

### blog_posts
- `id`: Primary key
- `title`: Post title
- `excerpt`: Short description
- `content`: Full post content
- `image`: Featured image URL
- `date`: Publication date
- `author`: Post author
- `published`: Publication status
- `created_at`/`updated_at`: Timestamps

### site_settings
- `id`: Primary key (always 1)
- `title`: Site title
- `subtitle`: Site subtitle
- `mission`: Mission statement
- `quote`: Featured quote
- `hero_image`: Hero background image
- `created_at`/`updated_at`: Timestamps

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the Ethiopian Games Association team

---
Wathcing this video
[![Watch the video](https://img.youtube.com/vi/BP2Ic0h0ufA/maxresdefault.jpg)](https://www.youtube.com/watch?v=BP2Ic0h0ufA)


Built with ❤️ by the Ethiopian Games Association
