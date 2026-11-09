import { renderTicketEmail } from "@/lib/email";
import { ticketIdFromEmail, ticketUrl, cleanName } from "@/lib/ticket";
import { baseUrl } from "@/lib/server";

// Pré-visualização do email: /api/email-preview?n=Maria&e=maria@exemplo.pt
export async function GET(req: Request) {
  const u = new URL(req.url);
  const name = cleanName(u.searchParams.get("n") || "Maria Silva");
  const id = await ticketIdFromEmail(u.searchParams.get("e") || "maria@exemplo.pt");
  const site = baseUrl(req);
  const { html } = renderTicketEmail({ name, id, ticketUrl: ticketUrl(site, name, id), siteUrl: site });
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
