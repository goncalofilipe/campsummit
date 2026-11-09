import { createSign } from "node:crypto";
import { EVENT, PROGRAM } from "@/lib/event";
import { seatFor, ticketUrl } from "@/lib/ticket";
import { baseUrl, pem, readTicketParams } from "@/lib/server";
import { googleConfigured } from "@/lib/wallet";

export const runtime = "nodejs";

const b64url = (s: string | Buffer) => Buffer.from(s).toString("base64url");
const t = (value: string) => ({ defaultValue: { language: "pt-PT", value } });

export async function GET(req: Request) {
  if (!googleConfigured()) return new Response("Google Wallet não configurado", { status: 501 });
  const p = readTicketParams(req);
  if (!p) return new Response("Bilhete inválido", { status: 400 });

  const issuer = process.env.GOOGLE_WALLET_ISSUER_ID!;
  const site = baseUrl(req);
  const classId = `${issuer}.camp_summit_2026`;
  const objectId = `${issuer}.${p.id.replace(/-/g, "_")}`;

  const payload = {
    iss: process.env.GOOGLE_WALLET_SA_EMAIL,
    aud: "google",
    typ: "savetowallet",
    iat: Math.floor(Date.now() / 1000),
    origins: [site],
    payload: {
      genericClasses: [{ id: classId }],
      genericObjects: [
        {
          id: objectId,
          classId,
          state: "ACTIVE",
          hexBackgroundColor: "#0C1439",
          logo: { sourceUri: { uri: `${site}/wallet-logo.png` }, contentDescription: t("Camp Summit") },
          cardTitle: t("camp summit · 11 nov 2026"),
          subheader: t("Passe povo · Acesso total"),
          header: t(p.name),
          textModulesData: [
            { id: "when", header: "Data e hora", body: `${EVENT.weekday}, ${EVENT.dateLong}, ${EVENT.time}` },
            { id: "where", header: "Local", body: `${EVENT.venue} (${EVENT.venueNote})` },
            { id: "seat", header: "Lugar", body: seatFor(p.id) },
            { id: "program", header: "Programa", body: PROGRAM.map((x) => `${x.time} ${x.title}`).join("\n") },
          ],
          barcode: { type: "QR_CODE", value: ticketUrl(site, p.name, p.id), alternateText: p.id },
          validTimeInterval: { start: { date: EVENT.startISO }, end: { date: EVENT.endISO } },
        },
      ],
    },
  };

  const header = { alg: "RS256", typ: "JWT" };
  const unsigned = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(pem(process.env.GOOGLE_WALLET_SA_PRIVATE_KEY)!);
  const jwt = `${unsigned}.${b64url(signature)}`;

  return Response.redirect(`https://pay.google.com/gp/v/save/${jwt}`, 302);
}
