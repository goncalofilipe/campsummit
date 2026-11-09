import { Instagram, Globe, ArrowUpRight } from "iconoir-react";
import Logo from "./Logo";
import { INSTAGRAM, LINKS } from "@/lib/event";

const COLS = [
  {
    title: "Acampada",
    links: [
      { label: "Quem somos", href: LINKS.site.href },
      { label: "Comunicado", href: "#comunicado" },
      { label: "Imprensa", href: "#imprensa" },
      { label: "Contactos", href: LINKS.igLisboa.href },
    ],
  },
  {
    title: "Eventos",
    links: [
      { label: "Camp Summit 2026", href: "#top" },
      { label: "Programa", href: "#programa" },
      { label: "Assembleia Popular", href: "#programa" },
      { label: "Bilhete grátis", href: "#bilhete" },
    ],
  },
  {
    title: "Links úteis",
    links: [
      { label: "Como chegar", href: LINKS.maps },
      { label: "Cartaz para imprimir", href: "#cartaz" },
      { label: "O meu bilhete", href: "/bilhete" },
      { label: "Perguntas frequentes", href: "#faq" },
    ],
  },
];

const SOCIAL = [
  ...INSTAGRAM.map((i) => ({ ...i, icon: Instagram, kicker: `Instagram · ${i.city}` })),
  { ...LINKS.site, icon: Globe, kicker: "Site" },
];

export default function Footer() {
  return (
    <footer className="bg-footer">
      {/* Acampada em destaque */}
      <div className="container-cs pt-16">
        <p className="text-center text-sm font-semibold uppercase tracking-[1.6px] text-muted">Segue as acampadas</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {SOCIAL.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener"
                className="group flex items-center gap-4 rounded-2xl bg-white p-5 transition hover:shadow-[0_10px_30px_rgba(12,20,57,.10)]"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "var(--brand-gradient)" }}>
                  <s.icon width={24} height={24} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold uppercase tracking-[1.2px] text-muted">{s.kicker}</span>
                  <span className="block truncate text-lg font-bold text-navy">{s.label}</span>
                </span>
                <ArrowUpRight width={20} height={20} className="text-navy transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-cs grid gap-10 py-16 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-[13px] text-muted">© 2026 Acampada de Lisboa</p>
          <p className="mt-2 text-[13px] leading-5 text-muted">
            Feito por voluntários, sem patrocínios e sem orçamento municipal.
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <p className="text-base font-semibold text-navy">{c.title}</p>
            <ul className="mt-4 space-y-3">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[13px] text-muted hover:text-navy">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div id="faq" className="container-cs border-t border-line py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            {SOCIAL.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener"
                aria-label={s.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy hover:bg-line"
              >
                <s.icon width={20} height={20} />
              </a>
            ))}
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted">
            <li id="termos"><a href="#satira" className="underline">Termos</a></li>
            <li id="privacidade"><a href="#satira" className="underline">Privacidade</a></li>
            <li><a href="#satira" className="underline">Isto é sátira</a></li>
          </ul>
        </div>
        <p id="satira" className="mt-6 max-w-3xl text-xs leading-5 text-muted">
          O Camp Summit é uma ação de sátira política da Acampada de Lisboa. Não tem qualquer ligação ao Web Summit nem às
          entidades referidas nesta página. As citações de governantes são reais e têm a fonte indicada. Os bilhetes são
          simbólicos: a entrada é livre e ninguém os vai verificar. Usamos o teu email só para enviar o bilhete.
        </p>
      </div>
    </footer>
  );
}
