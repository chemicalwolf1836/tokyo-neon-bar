import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs"; // important: Resend needs Node runtime

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory store for rate limiting (IP → { count, timestamp })
const ipStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5; // max requests
const WINDOW_MS = 60 * 1000; // per minute

// Basic HTML escaping to prevent injection in emails
function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {

    // Rate Limiting
    // ----------------------------
   const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const cfConnectingIp = req.headers.get("cf-connecting-ip");
    const ip =
    cfConnectingIp ||
    realIp ||
    forwardedFor?.split(",")[0]?.trim() ||
    "unknown";

    const now = Date.now();
    const record = ipStore.get(ip);

    if (record) {
      if (now - record.timestamp < WINDOW_MS) {
        if (record.count >= RATE_LIMIT) {
          return NextResponse.json(
            { ok: false, error: "Too many requests. Please try again later." },
            { status: 429 }
          );
        }
        record.count += 1;
        ipStore.set(ip, record);
      } else {
        ipStore.set(ip, { count: 1, timestamp: now });
      }
    } else {
      ipStore.set(ip, { count: 1, timestamp: now });
    }

    // Now continue normally
    const body = await req.json();


    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const date = String(body?.date ?? "").trim();
    const time = String(body?.time ?? "").trim();
    const guests = String(body?.guests ?? "").trim();
    const message = String(body?.message ?? "").trim();
    const company = String(body?.company ?? "").trim();

// Honeypot triggered → silently accept (prevents bots learning)
   if (company) {
    return NextResponse.json({ ok: true });
   }

    // Basic validation
    if (!name || !email || !date || !time || !guests) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "RESEND_API_KEY is not set." },
        { status: 500 }
      );
    }

    const toEmail = process.env.RESERVE_TO_EMAIL;
    const fromEmail = process.env.RESERVE_FROM_EMAIL || "onboarding@resend.dev";

    if (!toEmail) {
      return NextResponse.json(
        { ok: false, error: "RESERVE_TO_EMAIL is not set." },
        { status: 500 }
      );
    }

    const subject = `New reservation request — ${name} (${guests} guests)`;

    const html = `
      <div style="font-family: ui-sans-serif, system-ui; line-height: 1.5;">
        <h2>New Reservation Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Date:</strong> ${escapeHtml(date)}</p>
        <p><strong>Time:</strong> ${escapeHtml(time)}</p>
        <p><strong>Guests:</strong> ${escapeHtml(guests)}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message || "(none)")}</p>
        <hr/>
        <p style="color:#666;">Sent from Tokyo Neon Bar reservation form.</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email, // so you can just hit "Reply"
      subject,
      html,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message || "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error." },
      { status: 500 }
    );
  }
}