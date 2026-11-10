import { NextResponse } from "next/server";
import { cleanName, ticketIdFromEmail, ticketUrl } from "@/lib/ticket";
import { renderTicketEmail } from "@/lib/email";
import { baseUrl } from "@/lib/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  // let body: { name?: string; email?: string };
  let body: { name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido" }, { status: 400 });
  }
  const name = cleanName(body.name || "");
  // const email = (body.email || "").trim();
  // if (!name || !EMAIL_RE.test(email) || email.length > 200) {
  if (!name) {
    // return NextResponse.json({ error: "Nome e email são obrigatórios" }, { status: 400 });
    return NextResponse.json({ error: "Nome" }, { status: 400 });
  }

  // const id = await ticketIdFromEmail(email);
  const id = await ticketIdFromEmail(name);
  const site = baseUrl(req);
  const url = ticketUrl(site, name, id);

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ id, url, sent: false });

  // const { subject, html, text } = renderTicketEmail({ name, id, ticketUrl: url, siteUrl: site });
  // try {
  //   const r = await fetch("https://api.resend.com/emails", {
  //     method: "POST",
  //     headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       from: process.env.EMAIL_FROM || "Camp Summit <bilhetes@campsummit.pt>",
  //       to: [email],
  //       subject,
  //       html,
  //       text,
  //     }),
  //   });
  //   if (!r.ok) console.error("Resend:", r.status, await r.text());
  //   return NextResponse.json({ id, url, sent: r.ok });
  // } catch (e) {
  //   console.error("Resend:", e);
  //   return NextResponse.json({ id, url, sent: false });
  // }
}
