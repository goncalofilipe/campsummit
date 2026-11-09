// Bilhete ficcional: o código é derivado do email, por isso é sempre o mesmo para a mesma pessoa.
// Funciona no browser e no servidor (Web Crypto).

const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // sem 0/O/1/I
export const POPULATION = 10_639_726; // INE, estimativa 2024

export const TICKET_RE = /^CS26-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}$/;

async function sha256(input: string): Promise<Uint8Array> {
  const data = new TextEncoder().encode(input);
  return new Uint8Array(await crypto.subtle.digest("SHA-256", data));
}

export async function ticketIdFromEmail(email: string): Promise<string> {
  const bytes = await sha256("campsummit-2026:" + email.trim().toLowerCase());
  const chars = Array.from(bytes.slice(0, 8), (b) => ALPHABET[b % 32]).join("");
  return `CS26-${chars.slice(0, 4)}-${chars.slice(4, 8)}`;
}

/** "Pessoa n.º X de 10 639 726": número estável derivado do código. */
export function personNumber(id: string): number {
  let h = 2166136261;
  for (const c of id) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  return (h % POPULATION) + 1;
}

export function formatNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/** Lugar ficcional, também derivado do código. */
export function seatFor(id: string): string {
  const n = personNumber(id);
  const row = "ABCDEFGHJKLMNPQRSTUV"[n % 20];
  return `Toldo · Fila ${row} · Chão ${(n % 89) + 1}`;
}

export function ticketUrl(base: string, name: string, id: string): string {
  const q = new URLSearchParams({ n: name, i: id });
  return `${base}/bilhete?${q.toString()}`;
}

export function cleanName(raw: string): string {
  return raw.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 60);
}
