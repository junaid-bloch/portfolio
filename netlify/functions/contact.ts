import type { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' }
export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' }
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) }
  try {
    const body = JSON.parse(event.body || '{}') as { email?: string; message?: string; website?: string }
    if (body.website) return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) }
    const email = (body.email || '').trim().slice(0, 254)
    const message = (body.message || '').trim().slice(0, 5000)
    if (!/^\S+@\S+\.\S+$/.test(email) || message.length < 8) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Please provide a valid email and message.' }) }
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return { statusCode: 503, headers, body: JSON.stringify({ error: 'Contact service is not configured.' }) }
    const supabase = createClient(url, key, { auth: { persistSession: false } })
    const { error } = await supabase.from('messages').insert({ email, message })
    if (error) throw error
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) }
  } catch {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Unable to send your message right now.' }) }
  }
}
