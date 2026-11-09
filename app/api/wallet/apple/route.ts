import { readFile } from "node:fs/promises";
import path from "node:path";
import { PKPass } from "passkit-generator";
import { EVENT, PROGRAM, LINKS, INSTAGRAM } from "@/lib/event";
import { formatNumber, personNumber, POPULATION, seatFor, ticketUrl } from "@/lib/ticket";
import { baseUrl, readTicketParams } from "@/lib/server";
import { appleCerts, appleConfigured } from "@/lib/wallet";

export const runtime = "nodejs";

const FILES = ["icon.png", "icon@2x.png", "icon@3x.png", "logo.png", "logo@2x.png", "logo@3x.png"];

export async function GET(req: Request) {
  if (!appleConfigured()) return new Response("Apple Wallet não configurado", { status: 501 });
  const t = readTicketParams(req);
  if (!t) return new Response("Bilhete inválido", { status: 400 });

  const dir = path.join(process.cwd(), "wallet");
  const buffers = Object.fromEntries(await Promise.all(FILES.map(async (f) => [f, await readFile(path.join(dir, f))] as const)));

  const pass = new PKPass(buffers, appleCerts(), {
    formatVersion: 1,
    passTypeIdentifier: process.env.APPLE_PASS_TYPE_ID!,
    teamIdentifier: process.env.APPLE_TEAM_ID!,
    serialNumber: t.id,
    organizationName: EVENT.organizer,
    description: "Bilhete Camp Summit 2026",
    logoText: "camp summit",
    backgroundColor: "rgb(12,20,57)",
    foregroundColor: "rgb(255,255,255)",
    labelColor: "rgb(0,172,168)",
  });
  pass.type = "eventTicket";

  pass.headerFields.push({ key: "date", label: "11 NOV", value: EVENT.time });
  pass.primaryFields.push({ key: "name", label: "PASSE POVO · ACESSO TOTAL", value: t.name });
  pass.secondaryFields.push(
    { key: "venue", label: "LOCAL", value: `${EVENT.venue} (${EVENT.venueNote})` },
  );
  pass.auxiliaryFields.push(
    { key: "seat", label: "LUGAR", value: seatFor(t.id) },
    { key: "price", label: "PREÇO", value: "0 €" },
  );
  pass.backFields.push(
    { key: "code", label: "Código", value: t.id },
    { key: "person", label: "Pessoa", value: `n.º ${formatNumber(personNumber(t.id))} de ${formatNumber(POPULATION)}` },
    { key: "program", label: "Programa", value: PROGRAM.map((p) => `${p.time} ${p.title}`).join("\n") },
    { key: "address", label: "Morada", value: EVENT.address },
    { key: "links", label: "Acampada", value: `${INSTAGRAM.map((i) => i.label).join(" · ")} · ${LINKS.site.href}` },
    { key: "note", label: "Nota", value: "Bilhete simbólico. Entrada livre. Sátira política da Acampada de Lisboa, sem ligação ao Web Summit." },
  );

  pass.setBarcodes({
    message: ticketUrl(baseUrl(req), t.name, t.id),
    format: "PKBarcodeFormatQR",
    messageEncoding: "iso-8859-1",
    altText: t.id,
  });
  pass.setRelevantDate(new Date(EVENT.startISO));
  pass.setLocations({ latitude: EVENT.lat, longitude: EVENT.lng, relevantText: "Camp Summit: é debaixo do toldo." });

  return new Response(new Uint8Array(pass.getAsBuffer()), {
    headers: {
      "Content-Type": "application/vnd.apple.pkpass",
      "Content-Disposition": `attachment; filename="camp-summit-${t.id}.pkpass"`,
    },
  });
}
