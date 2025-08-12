
-- Ethiopian Games Association Blog System
-- Supabase Database Setup Script

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
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
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT NOT NULL,
  mission TEXT NOT NULL,
  quote TEXT NOT NULL,
  hero_image VARCHAR(500) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings (if not exists)
INSERT INTO site_settings (id, title, subtitle, mission, quote, hero_image) 
SELECT 1, 
  'Ethiopian Games Association Blog',
  'Sharing stories, insights, and updates about games, gamification, and the community.',
  'Games and play are a language that the world can speak; through games you can create, connect and cultivate economy, culture, and values.',
  'Games teach resilience, discipline, and continuous growth — elevating us to become better humans through determination and excellence.',
  'https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=1600'
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE id = 1);

-- Insert sample blog posts (if table is empty)
INSERT INTO blog_posts (title, excerpt, content, image, date, author, published) 
SELECT * FROM (VALUES 
  (
    'How Gaming Builds Resilience and Discipline',
    'Explore how games teach valuable life skills like resilience and continuous growth.',
    'Gaming has evolved far beyond entertainment. Modern games challenge players to develop critical thinking, strategic planning, and emotional resilience. Through repeated failures and successes, gamers learn to adapt, persevere, and continuously improve their skills. This resilience translates directly into real-world applications, helping gamers tackle challenges with determination and strategic thinking.',
    '/assets/images/events/mobile_legend_championship.webp',
    '2024-01-15',
    'EGA Team',
    true
  ),
  (
    'Connecting Communities Through Games',
    'Discover how gaming brings people together to create culture and economy.',
    'Games serve as a universal language that transcends geographical and cultural boundaries. They create shared experiences, foster teamwork, and build lasting friendships. The gaming community in Ethiopia is growing rapidly, connecting young minds and creating opportunities for collaboration, learning, and economic growth through esports and game development.',
    '/assets/images/events/mobile_legend_championship.webp',
    '2024-01-10',
    'EGA Team',
    true
  ),
  (
    'The Future of Ethiopian Game Development',
    'Exploring the potential of game development in Ethiopia and how we can nurture local talent.',
    'Ethiopia has a rich cultural heritage and storytelling tradition that can be beautifully translated into interactive gaming experiences. With the rise of mobile gaming and increasing internet penetration, there is unprecedented opportunity for Ethiopian developers to create games that reflect our culture while competing globally.',
    '/assets/images/events/mobile_legend_championship.webp',
    '2024-01-05',
    'EGA Team',
    false
  )
) AS sample_data(title, excerpt, content, image, date, author, published)
WHERE NOT EXISTS (SELECT 1 FROM blog_posts LIMIT 1);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_title ON blog_posts(title);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (optional - for enhanced security)
-- ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
-- CREATE POLICY "Allow public read access to published posts" ON blog_posts
--     FOR SELECT USING (published = true);

-- CREATE POLICY "Allow public read access to settings" ON site_settings
--     FOR SELECT USING (true);

COMMENT ON TABLE blog_posts IS 'Stores blog posts for the Ethiopian Games Association website';
COMMENT ON TABLE site_settings IS 'Stores site-wide settings and configuration';
