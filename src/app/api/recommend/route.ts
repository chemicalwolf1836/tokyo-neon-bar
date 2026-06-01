import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { MENU_ITEMS } from '@/app/data/menu'

const client = new Anthropic()

const requestSchema = z.object({
  prompt: z.string().min(1).max(500),
})

export async function POST(request: Request) {
  const body: unknown = await request.json()
  const parsed = requestSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { prompt } = parsed.data

  const menuList = MENU_ITEMS.map(
    (c) => `- ${c.name.en} (${c.base}, ${c.sweetness}): ${c.description.en}`
  ).join('\n')

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 200,
    messages: [
      {
        role: 'user',
        content: `You are the bartender at Neon Kissa, a Tokyo cocktail bar. Based on the customer's preferences, recommend ONE cocktail from the menu.

Menu:
${menuList}

Customer preference: "${prompt}"

Reply with ONLY valid JSON: {"cocktail":"exact name from menu","reason":"one short sentence why it fits"}`,
      },
    ],
  })

  const raw = response.content[0].type === 'text' ? response.content[0].text : ''
  const text = raw.replace(/^```(?:json)?\s*/m, '').replace(/\s*```\s*$/m, '').trim()

  try {
    return NextResponse.json(JSON.parse(text))
  } catch {
    return NextResponse.json({ error: 'Failed to get recommendation' }, { status: 500 })
  }
}
