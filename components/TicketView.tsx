"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import QRCode from "qrcode";
import { Printer, AppleWallet, Google, CalendarPlus, Download, ShareIos, Check, ArrowLeft } from "iconoir-react";
import Logo, { LogoMark } from "./Logo";
import { EVENT, PROGRAM, INSTAGRAM } from "@/lib/event";
import { cleanName, formatNumber, personNumber, POPULATION, seatFor, TICKET_RE, ticketUrl } from "@/lib/ticket";

type Status = { apple: boolean; google: boolean };

function icsFile(name: string, id: string, url: string) {
  const stamp = (iso: string) => iso.replace(/[-:]/g, "").replace(/\.\d+/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Acampada de Lisboa//Camp Summit//PT",
    "BEGIN:VEVENT",
    `UID:${id}@campsummit`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(EVENT.startISO)}`,
    `DTEND:${stamp(EVENT.endISO)}`,
    "SUMMARY:Camp Summit 2026",
    `LOCATION:${EVENT.venue} (${EVENT.venueNote})\\, ${EVENT.address.replace(/,/g, "\\,")}`,
    `DESCRIPTION:Bilhete ${id} de ${name}.\\n${PROGRAM.map((p) => `${p.time} ${p.title}`).join("\\n")}\\n${url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function download(blob: Blob, filename: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

/** Desenha o bilhete numa imagem 1080x1920 para guardar na galeria (alternativa à Wallet). */
async function ticketPNG(name: string, id: string, url: string): Promise<Blob> {
  const W = 1080, H = 1920;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const g = c.getContext("2d")!;
  const font = getComputedStyle(document.body).fontFamily;
  await document.fonts.ready;

  g.fillStyle = "#0C1439"; g.fillRect(0, 0, W, H);
  const glow = g.createRadialGradient(W / 2, 0, 0, W / 2, 0, 900);
  glow.addColorStop(0, "rgba(222,14,123,.55)"); glow.addColorStop(1, "rgba(222,14,123,0)");
  g.fillStyle = glow; g.fillRect(0, 0, W, H);

  // faixa
  const grad = g.createLinearGradient(0, 0, W, 60);
  grad.addColorStop(0.016, "#DE0E7B"); grad.addColorStop(0.705, "#6B4AA4"); grad.addColorStop(0.954, "#00ACA8");
  g.fillStyle = grad; g.beginPath(); g.roundRect(60, 60, W - 120, 300, 40); g.fill();
  // marca
  const m = (x: number, y: number, s: number) => {
    const tri = (pts: number[][], col: string) => { g.fillStyle = col; g.beginPath(); g.moveTo(x + pts[0][0] * s, y + pts[0][1] * s); pts.slice(1).forEach((p) => g.lineTo(x + p[0] * s, y + p[1] * s)); g.closePath(); g.fill(); };
    tri([[24, 1], [47, 41], [1, 41]], "#ffffff");
    tri([[24, 22], [34, 41], [14, 41]], "#0C1439");
  };
  m(110, 110, 2.4);
  g.fillStyle = "#fff"; g.font = `700 64px ${font}`; g.fillText("camp summit", 250, 175);
  g.font = `600 26px ${font}`; g.fillText("LISBOA · 11 NOV 2026", 254, 222);
  g.font = `600 28px ${font}`; g.fillText("PASSE POVO · ACESSO TOTAL", 110, 310);

  const label = (t: string, x: number, y: number) => { g.fillStyle = "#00ACA8"; g.font = `600 26px ${font}`; g.fillText(t.toUpperCase(), x, y); };
  const value = (t: string, x: number, y: number, size = 44, weight = 700, col = "#fff") => { g.fillStyle = col; g.font = `${weight} ${size}px ${font}`; g.fillText(t, x, y); };

  label("Nome", 110, 470);
  let size = 88; g.font = `700 ${size}px ${font}`;
  while (g.measureText(name).width > W - 220 && size > 40) { size -= 4; g.font = `700 ${size}px ${font}`; }
  value(name, 110, 470 + size + 10, size);
  value(`Pessoa n.º ${formatNumber(personNumber(id))} de ${formatNumber(POPULATION)}`, 110, 640, 30, 400, "#b9bdd3");

  label("Data", 110, 760); value("11 nov 2026", 110, 815);
  label("Hora", 600, 760); value(EVENT.time, 600, 815);
  label("Local", 110, 910); value(EVENT.venue, 110, 965); value(`(${EVENT.venueNote})`, 110, 1010, 32, 400, "#b9bdd3");
  label("Lugar", 110, 1100); value(seatFor(id), 110, 1150, 36, 600);

  // picotado
  g.strokeStyle = "#2a3360"; g.lineWidth = 4; g.setLineDash([18, 14]);
  g.beginPath(); g.moveTo(60, 1230); g.lineTo(W - 60, 1230); g.stroke(); g.setLineDash([]);

  const qr = document.createElement("canvas");
  await QRCode.toCanvas(qr, url, { width: 460, margin: 2, color: { dark: "#0C1439", light: "#FFFFFF" } });
  g.fillStyle = "#fff"; g.beginPath(); g.roundRect(W / 2 - 250, 1290, 500, 500, 32); g.fill();
  g.drawImage(qr, W / 2 - 230, 1310, 460, 460);
  g.textAlign = "center";
  value(id, W / 2, 1860, 44, 700);
  return new Promise((res) => c.toBlob((b) => res(b!), "image/png"));
}

export default function TicketView() {
  const sp = useSearchParams();
  const name = cleanName(sp.get("n") || "");
  const id = (sp.get("i") || "").toUpperCase();
  const sent = sp.get("enviado") === "1";
  const valid = Boolean(name && TICKET_RE.test(id));

  const [origin, setOrigin] = useState("");
  const [qr, setQr] = useState("");
  const [status, setStatus] = useState<Status>({ apple: false, google: false });
  const [shared, setShared] = useState(false);
  const [busyPng, setBusyPng] = useState(false);

  useEffect(() => setOrigin(window.location.origin), []);
  const url = useMemo(() => (origin && valid ? ticketUrl(process.env.NEXT_PUBLIC_SITE_URL || origin, name, id) : ""), [origin, valid, name, id]);
  const q = useMemo(() => new URLSearchParams({ n: name, i: id }).toString(), [name, id]);

  useEffect(() => {
    if (!url) return;
    QRCode.toString(url, { type: "svg", margin: 1, color: { dark: "#0C1439", light: "#FFFFFF" } }).then(setQr);
    fetch("/api/wallet/status").then((r) => r.json()).then(setStatus).catch(() => {});
  }, [url]);

  if (!valid) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-navy px-4 text-center text-white">
        <Logo tone="light" />
        <h1 className="mt-10 text-[32px] font-bold leading-10">Este bilhete não existe (ainda).</h1>
        <p className="body mt-3 max-w-md text-white/80">Como as casas a preços decentes. A diferença é que este arranja-se em 10 segundos.</p>
        <a href="/#bilhete" className="btn-primary mt-8">Gerar o meu bilhete</a>
      </main>
    );
  }

  const person = formatNumber(personNumber(id));

  return (
    <main className="min-h-screen bg-navy pb-16 text-white print:bg-white print:pb-0">
      <div className="pointer-events-none fixed inset-0 print:hidden" style={{ background: "radial-gradient(60% 40% at 50% 0%, rgba(222,14,123,.45), transparent 70%), radial-gradient(50% 35% at 50% 100%, rgba(0,172,168,.35), transparent 70%)" }} />

      <header className="relative flex h-20 items-center justify-between px-4 sm:px-6 print:hidden">
        <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold"><ArrowLeft width={18} height={18} /> Voltar</a>
        <Logo tone="light" tagline={false} />
        <span className="w-16" />
      </header>

      <div className="relative mx-auto max-w-[440px] px-4 print:max-w-none print:px-0">
        {sent && (
          <p className="mb-4 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm print:hidden">
            <Check width={18} height={18} className="text-teal" /> Enviámos uma cópia para o teu email.
          </p>
        )}

        {/* BILHETE */}
        <article id="ticket" className="ticket overflow-hidden rounded-[24px] bg-[#111a45] shadow-[0_30px_80px_rgba(0,0,0,.45)] ring-1 ring-white/10 print:mx-auto print:w-[120mm] print:shadow-none">
          <div className="px-6 pb-6 pt-5" style={{ background: "var(--brand-gradient)" }}>
            <div className="flex items-center gap-2.5">
              <span className="rounded-md bg-white/15 p-1"><LogoMark className="h-7 w-8" /></span>
              <span className="text-xl font-bold tracking-[-0.5px]">camp summit</span>
              <span className="ml-auto text-xs font-semibold uppercase tracking-[1.4px] opacity-90">2026 · 1.ª ed.</span>
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[2px]">Passe povo · Acesso total</p>
            <p className="mt-1 text-2xl font-bold leading-7">O futuro começa aqui. <em className="font-light">Not there.</em></p>
          </div>

          <div className="px-6 pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-teal">Nome</p>
            <p className="break-words text-[30px] font-bold leading-9">{name}</p>
            <p className="mt-1 text-[13px] text-[#b9bdd3]">Pessoa n.º {person} de {formatNumber(POPULATION)}</p>

            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[1.6px] text-teal">Data</dt>
                <dd className="text-lg font-bold">11 nov 2026</dd>
                <dd className="text-[13px] text-[#b9bdd3]">{EVENT.weekday}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[1.6px] text-teal">Hora</dt>
                <dd className="text-lg font-bold">{EVENT.time}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[11px] font-semibold uppercase tracking-[1.6px] text-teal">Local</dt>
                <dd className="text-lg font-bold">{EVENT.venue}</dd>
                <dd className="text-[13px] text-[#b9bdd3]">({EVENT.venueNote}) · Parque das Nações</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[11px] font-semibold uppercase tracking-[1.6px] text-teal">Programa</dt>
                {PROGRAM.map((p) => (
                  <dd key={p.time} className="mt-1 flex gap-3 text-[15px]">
                    <span className="w-12 shrink-0 font-bold text-[#ff5aad]">{p.time.replace("h00", "h")}</span>
                    <span className="font-semibold">{p.title}</span>
                  </dd>
                ))}
              </div>
            </dl>
          </div>

          {/* picotado */}
          <div className="relative my-6 h-6">
            <span className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-navy print:bg-white" />
            <span className="absolute -right-3 top-0 h-6 w-6 rounded-full bg-navy print:bg-white" />
            <span className="absolute inset-x-6 top-1/2 border-t-2 border-dashed border-white/20" />
          </div>

          <div className="flex items-center gap-5 px-6 pb-7">
            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-white p-1.5 [&>svg]:h-full [&>svg]:w-full" aria-label={`Código QR do bilhete ${id}`} dangerouslySetInnerHTML={{ __html: qr }} />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-teal">Código</p>
              <p className="whitespace-nowrap font-mono text-base font-bold tracking-wide">{id}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[1.6px] text-teal">Lugar</p>
              <p className="text-sm font-semibold">{seatFor(id)}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[1.6px] text-teal">Preço</p>
              <p className="text-sm font-semibold">0 € <span className="font-normal text-[#b9bdd3]">(a renda é à parte)</span></p>
            </div>
          </div>
          <p className="border-t border-white/10 px-6 py-3 text-center text-[11px] text-[#b9bdd3]">
            Bilhete simbólico, entrada livre.<br />{INSTAGRAM.map((i) => i.label).join(" · ")}
          </p>
        </article>

        {/* AÇÕES */}
        <div className="mt-6 grid gap-3 print:hidden">
          {status.apple && (
            <a href={`/api/wallet/apple?${q}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-[60px] bg-black text-base font-bold text-white ring-1 ring-white/20 hover:bg-[#111]">
              <AppleWallet width={22} height={22} /> Adicionar à Apple Wallet
            </a>
          )}
          {status.google && (
            <a href={`/api/wallet/google?${q}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-[60px] bg-white text-base font-bold text-black hover:bg-white/90">
              <Google width={20} height={20} /> Guardar no Google Wallet
            </a>
          )}
          <button type="button" onClick={() => window.print()} className="btn-primary">
            <Printer width={20} height={20} /> Guardar em PDF
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={busyPng}
              onClick={async () => {
                setBusyPng(true);
                try {
                  download(await ticketPNG(name, id, url), `camp-summit-${id}.png`);
                } finally {
                  setBusyPng(false);
                }
              }}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[60px] bg-white/10 text-sm font-semibold ring-1 ring-white/20 hover:bg-white/15"
            >
              <Download width={18} height={18} /> {busyPng ? "A gerar…" : "Imagem"}
            </button>
            <button
              type="button"
              onClick={() => download(new Blob([icsFile(name, id, url)], { type: "text/calendar" }), "camp-summit-2026.ics")}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[60px] bg-white/10 text-sm font-semibold ring-1 ring-white/20 hover:bg-white/15"
            >
              <CalendarPlus width={18} height={18} /> Calendário
            </button>
          </div>
          <button
            type="button"
            onClick={async () => {
              const data = { title: "Camp Summit 2026", text: "Vou ao Camp Summit. 11 nov, 19h00, debaixo do toldo do Pavilhão de Portugal. Bilhete grátis:", url: `${origin}/` };
              try {
                if (navigator.share) await navigator.share(data);
                else {
                  await navigator.clipboard.writeText(`${data.text} ${data.url}`);
                  setShared(true);
                }
              } catch {}
            }}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[60px] text-sm font-semibold text-white/90 hover:text-white"
          >
            <ShareIos width={18} height={18} /> {shared ? "Link copiado" : "Convidar mais gente"}
          </button>
          {!status.apple && !status.google && (
            <p className="text-center text-[13px] text-white/70">
              No telemóvel, guarda a imagem na galeria ou o PDF nos ficheiros. Funciona como um passe.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
