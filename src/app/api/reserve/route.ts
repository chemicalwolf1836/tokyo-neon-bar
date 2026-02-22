import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs"; // important: Resend needs Node runtime

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const date = String(body?.date ?? "").trim();
    const time = String(body?.time ?? "").trim();
    const guests = String(body?.guests ?? "").trim();
    const message = String(body?.message ?? "").trim();

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