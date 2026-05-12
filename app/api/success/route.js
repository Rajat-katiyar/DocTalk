import connectToDatabase from '@/lib/mongodb'
import SuccessMetric from '@/models/SuccessMetric'

export async function GET() {
  try {
    await connectToDatabase()
    const successMetrics = await SuccessMetric.find().lean()
    return new Response(JSON.stringify({ successMetrics }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('[GET /api/success] error', error)
    return new Response(JSON.stringify({ error: 'Unable to load success metrics' }), { status: 500 })
  }
}
