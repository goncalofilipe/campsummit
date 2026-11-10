"use client";

import { useEffect, useRef, useState } from "react";
import { NavArrowDown, Menu, Xmark, User, HandCard } from "iconoir-react";
import Logo from "./Logo";
import { INSTAGRAM, LINKS } from "@/lib/event";

const NAV: {
  label: string;
  items: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    label: "Evento",
    items: [
      { label: "Data, hora e local", href: "#programa" },
      { label: "Porquê vir?", href: "#porque" },
      { label: "Bilhete grátis", href: "#bilhete" },
    ],
  },
  {
    label: "Programa",
    items: [
      { label: "17h30 · Cidade para quem nela vive", href: "#programa" },
      { label: "20h00 · Democracy and Tech", href: "#programa" },
      { label: "21h00 · Assembleia Popular", href: "#programa" },
    ],
  },
  {
    label: "Oradores",
    items: [
      { label: "O povo português", href: "#oradores" },
      { label: "Quero falar na assembleia", href: "#bilhete" },
    ],
  },
  {
    label: "Parceiros",
    items: [
      { label: "Já estiveram cá", href: "#parceiros" },
      { label: "Vieram como imprensa", href: "#imprensa" },
      { label: "Vieram como investidores", href: "#investidores" },
    ],
  },
  {
    label: "Imprensa",
    items: [
      { label: "Comunicado", href: "#comunicado" },
      { label: "O que dizem de nós", href: "#testemunhos" },
      { label: "Cartaz", href: "#cartaz" },
    ],
  },
  {
    label: "Acampada",
    items: [
      ...INSTAGRAM.map((i) => ({
        label: i.label,
        href: i.href,
        external: true,
      })),
      { label: LINKS.site.label, href: LINKS.site.href, external: true },
    ],
  },
];

export default function Header() {
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    const esc = (e: KeyboardEvent) =>
      e.key === "Escape" && (setOpen(null), setMobile(false));
    document.addEventListener("click", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  return (
    <header ref={ref} className="sticky top-0 z-50 h-20 bg-white">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" aria-label="Camp Summit, início">
          <Logo />
        </a>

        <nav className="hidden lg:block" aria-label="Principal">
          <ul className="flex items-center gap-1">
            {NAV.map((group, i) => (
              <li key={group.label} className="relative">
                <button
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold tracking-[0.5px] text-navy hover:bg-iconbtn"
                >
                  {group.label}
                  <NavArrowDown
                    width={16}
                    height={16}
                    className={`transition ${open === i ? "rotate-180" : ""}`}
                  />
                </button>
                {open === i && (
                  <div className="absolute left-0 top-full mt-2 min-w-[260px] rounded-xl border border-line bg-white p-2 shadow-[0_12px_32px_rgba(12,20,57,0.12)]">
                    {group.items.map((it) => (
                      <a
                        key={it.label}
                        href={it.href}
                        target={it.external ? "_blank" : undefined}
                        rel={it.external ? "noopener" : undefined}
                        onClick={() => setOpen(null)}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-navy hover:bg-iconbtn"
                      >
                        {it.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#bilhete"
            className="btn-nav hidden md:inline-flex"
            style={{ background: "var(--brand-gradient)" }}
          >
            <HandCard width={18} height={18} />
            Bilhete grátis
          </a>
          <a
            href="#bilhete"
            aria-label="Bilhete grátis"
            className="inline-flex h-11 w-[68px] items-center justify-center rounded-[24px] text-white md:hidden"
            style={{ background: "var(--brand-gradient)" }}
          >
            <HandCard width={22} height={22} />
          </a>
          <a href="#programa" className="btn-nav hidden bg-teal md:inline-flex">
            Programa
          </a>
          <a
            href="#bilhete"
            aria-label="O meu bilhete"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-iconbtn text-navy hover:bg-line md:inline-flex"
          >
            <User width={20} height={20} />
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy lg:hidden"
            aria-label={mobile ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? (
              <Xmark width={26} height={26} />
            ) : (
              <Menu width={26} height={26} />
            )}
          </button>
        </div>
      </div>

      {mobile && (
        <div className="fixed inset-x-0 bottom-0 top-20 overflow-y-auto bg-white px-4 pb-10 lg:hidden">
          {NAV.map((group) => (
            <div key={group.label} className="border-b border-line py-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[1.5px] text-muted">
                {group.label}
              </p>
              {group.items.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  target={it.external ? "_blank" : undefined}
                  rel={it.external ? "noopener" : undefined}
                  onClick={() => setMobile(false)}
                  className="block py-2 text-base font-semibold text-navy"
                >
                  {it.label}
                </a>
              ))}
            </div>
          ))}
          <a
            href="#bilhete"
            onClick={() => setMobile(false)}
            className="btn-primary mt-6 w-full"
          >
            Obter bilhete grátis
          </a>
        </div>
      )}
    </header>
  );
}
