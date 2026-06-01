import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'

const client = new Anthropic()

const SYSTEM_PROMPT = `You are Hana, the virtual host at Neon Kissa — a sleek cocktail bar in Shinjuku, Tokyo. Be warm, brief, and atmospheric. Keep replies to 1-2 sentences maximum. You speak both English and Japanese — respond in whatever language the guest uses.

The bar:
- Open daily 18:00 – 03:00
- Located in Shinjuku, Tokyo
- Specialises in Japanese-inspired cocktails
- Walk-ins welcome, reservations recommended

Cocktails: Neon Highball (whiskey, citrus, soda, smoked ice ¥1,200), Shinjuku Bloom (gin, yuzu, tonic, floral bitters ¥1,600), Midnight Ume (umeshu, plum, spice, lime ¥1,400), Cyber Espresso (vodka, coffee, cocoa, velvet foam ¥1,700).

Use correct spelling, grammar, and punctuation in every reply.`

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
    })
  ).max(20),
})

export async function POST(request: Request) {
  const body: unknown = await request.json()
  const parsed = chatSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 200,
    system: SYSTEM_PROMPT,
    messages: parsed.data.messages,
  })

  const text =
    response.content[0].type === 'text' ? response.content[0].text.trim() : ''

  return NextResponse.json({ message: text })
}
