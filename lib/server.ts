import { SITE_URL } from "./event";
import { cleanName, TICKET_RE } from "./ticket";

/** URL base: variável de ambiente, ou o host do pedido em desenvolvimento. */
export function baseUrl(req: Request): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return SITE_URL;
  const u = new URL(req.url);
  return `${u.protocol}//${u.host}`;
}

export function readTicketParams(req: Request): { name: string; id: string } | null {
  const u = new URL(req.url);
  const name = cleanName(u.searchParams.get("n") || "");
  const id = (u.searchParams.get("i") || "").toUpperCase();
  if (!name || !TICKET_RE.test(id)) return null;
  return { name, id };
}

/** Aceita PEM em texto (com \n escapados) ou em base64. */
export function pem(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const v = value.includes("-----BEGIN") ? value : Buffer.from(value, "base64").toString("utf8");
  return v.replace(/\\n/g, "\n");
}
