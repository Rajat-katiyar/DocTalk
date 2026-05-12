import connectToDatabase from '@/lib/mongodb'
import Blog from '@/models/Blog'

export async function GET() {
  try {
    await connectToDatabase()
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean()
    return new Response(JSON.stringify({ blogs }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('[GET /api/blogs] error', error)
    return new Response(JSON.stringify({ error: 'Unable to load blogs' }), { status: 500 })
  }
}
