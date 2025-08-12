
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publishedOnly = searchParams.get('published') === 'true'
    const search = searchParams.get('search') || ''

    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false })

    if (publishedOnly) {
      query = query.eq('published', true)
    }

    if (search) {
      query = query.ilike('title', `%${search}%`)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        image: body.image,
        date: body.date,
        author: body.author,
        published: body.published || false
      }])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
