
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET settings
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single()

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // If no settings exist, return default settings
    if (!data) {
      const defaultSettings = {
        title: "Ethiopian Games Association Blog",
        subtitle: "Sharing stories, insights, and updates about games, gamification, and the community.",
        mission: "Games and play are a language that the world can speak; through games you can create, connect and cultivate economy, culture, and values.",
        quote: "Games teach resilience, discipline, and continuous growth — elevating us to become better humans through determination and excellence.",
        hero_image: "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
      return NextResponse.json(defaultSettings)
    }

    return NextResponse.json({
      title: data.title,
      subtitle: data.subtitle,
      mission: data.mission,
      quote: data.quote,
      heroImage: data.hero_image
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST/PUT settings (upsert)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('site_settings')
      .upsert([{
        id: 1, // We'll only have one settings record
        title: body.title,
        subtitle: body.subtitle,
        mission: body.mission,
        quote: body.quote,
        hero_image: body.heroImage,
        updated_at: new Date().toISOString()
      }])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const responseData = {
      title: data[0].title,
      subtitle: data[0].subtitle,
      mission: data[0].mission,
      quote: data[0].quote,
      heroImage: data[0].hero_image
    }

    return NextResponse.json(responseData)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
