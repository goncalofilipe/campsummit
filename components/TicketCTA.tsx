"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "iconoir-react";
import { cleanName, ticketIdFromEmail } from "@/lib/ticket";
import { WHERE_LINE } from "@/lib/event";

const STORE_KEY = "campsummit-ticket";

export default function TicketCTA() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState<{ n: string; i: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = cleanName(String(fd.get("name") || ""));
    // const email = String(fd.get("email") || "").trim();
    // if (!name || !email) return;
    if (!name) return;
    setBusy(true);
    // const id = await ticketIdFromEmail(email);
    const id = await ticketIdFromEmail(name);
    let sent = false;
    try {
      const r = await fetch("/api/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ name, email }),
        body: JSON.stringify({ name }),
      });
      if (r.ok) sent = Boolean((await r.json()).sent);
    } catch {}
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ n: name, i: id }));
    } catch {}
    const q = new URLSearchParams({ n: name, i: id });
    if (sent) q.set("enviado", "1");
    router.push(`/bilhete?${q.toString()}`);
  }

  return (
    <section id="bilhete" className="section">
      <div className="container-cs">
        <div className="relative overflow-hidden rounded-2xl px-5 py-14 text-white md:px-16 md:py-20">
          {/* gradiente de malha desfocado */}
          <div className="absolute inset-0 bg-navy" />
          <div className="absolute -left-20 -top-24 h-96 w-96 rounded-full bg-violet blur-[90px]" />
          <div className="absolute -right-10 top-10 h-96 w-md rounded-full bg-magenta opacity-80 blur-[100px]" />
          <div className="absolute left-1/3 top-1/2 h-72 w-72 rounded-full bg-[#3c2a7a] blur-[80px]" />
          <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#2fe6e0] opacity-70 blur-[90px]" />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-[32px] font-bold leading-10 tracking-[0.1px] md:text-[40px] md:leading-12">
              Garante o teu lugar na Praça do Oriente
            </h2>
            <p className="body mt-4 text-white/90">
              Bilhete grátis, único e com o teu nome. Sem lista de espera, ao
              contrário da habitação municipal.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-2.5">
              <span className="rounded-[160px] border-2 border-white bg-magenta px-5 py-1 text-xl font-medium md:text-2xl">
                12 nov
              </span>
              <span className="rounded-[160px] bg-navy px-5 py-1 text-xl font-medium md:text-2xl">
                17h30
              </span>
              <span className="rounded-[160px] bg-white/20 px-5 py-1 text-xl font-medium md:text-2xl">
                0 €
              </span>
            </div>
            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-6 text-white/90">
              {WHERE_LINE}
            </p>

            <form
              onSubmit={onSubmit}
              className="mx-auto mt-10 grid max-w-xl gap-y-4 text-left grid-cols-1"
            >
              <div>
                <label htmlFor="t-name" className="field-label">
                  Nome no bilhete <span aria-hidden="true">*</span>
                </label>
                <input
                  id="t-name"
                  name="name"
                  required
                  maxLength={60}
                  placeholder="Ex.: Maria Silva"
                  className="field"
                  autoComplete="name"
                />
              </div>
              {/*<div>
                <label htmlFor="t-email" className="field-label">Email <span aria-hidden="true">*</span></label>
                <input id="t-email" name="email" type="email" required placeholder="o.teu@email.pt" className="field" autoComplete="email" />
              </div>*/}
              <button
                type="submit"
                disabled={busy}
                className="btn-primary sm:col-span-2 disabled:opacity-70"
              >
                {busy ? "A imprimir o teu bilhete…" : "Gerar o meu bilhete"}
                {!busy && <ArrowRight width={20} height={20} />}
              </button>
              <p className="text-center text-[13px] text-white/75 sm:col-span-2">
                {/*O email serve para te enviarmos o bilhete e para o código ser sempre o mesmo.*/}
                Não vendemos a tua informação a ninguém. Nem a fundos
                imobiliários. O bilhete é simbólico: não precisas dele para
                participar.
              </p>
            </form>

            {saved && (
              <p className="mt-6 text-sm text-white/90">
                Já tens bilhete, {saved.n}.{" "}
                <a
                  className="font-semibold underline"
                  href={`/bilhete?${new URLSearchParams(saved).toString()}`}
                >
                  Abrir o meu bilhete
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
