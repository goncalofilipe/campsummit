"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "iconoir-react";

type T = { name: string; role: string; initials: string; quote: string; note: string; source: string; date: string; href: string };

// Citações verbatim, com fonte. O comentário em "note" é nosso e está separado da citação.
const ITEMS: T[] = [
  {
    name: "Luís Neves",
    role: "Ministro da Administração Interna",
    initials: "LN",
    quote: "as acampadas, os acampamentos acabaram",
    note: "Vemo-nos dia 11.",
    source: "24 Notícias",
    date: "20 out 2026",
    href: "https://24noticias.sapo.pt/atualidade/artigos/luis-neves-garante-que-as-acampadas-os-acampamentos-acabaram",
  },
  {
    name: "Carlos Moedas",
    role: "Presidente da Câmara Municipal de Lisboa",
    initials: "CM",
    quote: "A ideologia não dá casa a ninguém.",
    note: "Vender 10 terrenos públicos também não.",
    source: "ECO",
    date: "20 out 2026",
    href: "https://eco.sapo.pt/2026/10/20/moedas-critica-vandalismo-e-defende-atuacao-da-policia-na-acampada-pela-habitacao/",
  },
  {
    name: "Luís Montenegro",
    role: "Primeiro-Ministro",
    initials: "LM",
    quote: "Não há razão em Portugal para se importarem modelos de protesto violentos",
    note: "De acordo. Importem antes modelos de habitação pública.",
    source: "ECO",
    date: "3 nov 2026",
    href: "https://eco.sapo.pt/2026/11/03/pelo-direito-ao-sossego-montenegro-pede-que-nao-se-importe-modelo-de-protestos-violentos/",
  },
  {
    name: "Luís Neves",
    role: "Ministro da Administração Interna",
    initials: "LN",
    quote: "Atuaram com todo o profissionalismo, todo o saber e com toda a calma",
    note: "No Rossio, a operação acabou com 55 pessoas detidas.",
    source: "24 Notícias",
    date: "20 out 2026",
    href: "https://24noticias.sapo.pt/atualidade/artigos/luis-neves-garante-que-as-acampadas-os-acampamentos-acabaram",
  },
  {
    name: "Carlos Moedas",
    role: "Presidente da Câmara Municipal de Lisboa",
    initials: "CM",
    quote: "É uma feira de Natal que é responsabilidade da nossa Associação da Baixa Pombalina",
    note: "As farturas têm prioridade.",
    source: "TVI / Lusa",
    date: "3 nov 2026",
    href: "https://tvi.iol.pt/noticias/habitacao/carlos-moedas/acampada-no-rossio-moedas-diz-que-decisoes-judiciais-sao-para-cumprir-mas-e-dificil-conciliar-com-mercado-de-natal/20261103/6ae9f991d34e5a653d7329fa",
  },
  {
    name: "Luís Montenegro",
    role: "Primeiro-Ministro",
    initials: "LM",
    quote: "Tenho o direito e tenho o dever de governar.",
    note: "Força. Estamos à espera desde 17 de outubro.",
    source: "ECO",
    date: "3 nov 2026",
    href: "https://eco.sapo.pt/2026/11/03/pelo-direito-ao-sossego-montenegro-pede-que-nao-se-importe-modelo-de-protestos-violentos/",
  },
  {
    name: "Luís Neves",
    role: "Ministro da Administração Interna",
    initials: "LN",
    quote: "O meu lugar está permanentemente à disponibilidade do sr. primeiro-ministro",
    note: "O nosso toldo também está disponível.",
    source: "SOL / Lusa",
    date: "1 nov 2026",
    href: "https://sol.iol.pt/sociedade/noticias/o-meu-lugar-esta-permanentemente-a-disponibilidade-do-sr-primeiro-ministro-luis-neves-diz-se-tranquilo-com-a-atuacao-da-psp/20261101/6ae750d60cf299bc295441b2",
  },
  {
    name: "Carlos Moedas",
    role: "Presidente da Câmara Municipal de Lisboa",
    initials: "CM",
    quote: "Aquilo que eu peço é calma e serenidade, calma e serenidade a todas as partes",
    note: "Os senhorios também estão incluídos?",
    source: "TVI / Lusa",
    date: "3 nov 2026",
    href: "https://tvi.iol.pt/noticias/habitacao/carlos-moedas/acampada-no-rossio-moedas-diz-que-decisoes-judiciais-sao-para-cumprir-mas-e-dificil-conciliar-com-mercado-de-natal/20261103/6ae9f991d34e5a653d7329fa",
  },
  {
    name: "Luís Montenegro",
    role: "Primeiro-Ministro",
    initials: "LM",
    quote: "É injusta a crítica de que há silêncio",
    note: "Ouvimos. Agora queremos casas.",
    source: "24 Notícias",
    date: "3 nov 2026",
    href: "https://24noticias.sapo.pt/atualidade/artigos/primeiro-ministro-fala-ao-pais-acompanhe-aqui",
  },
];

// Fotografias do Wikimedia Commons, recortadas. Licenças e autores no crédito por baixo do carrossel.
const PHOTOS: Record<string, { src: string; author: string; license: string; licenseHref: string; file: string }> = {
  "Luís Montenegro": {
    src: "/testemunhos/montenegro.jpg",
    author: "Goncalo Shox",
    license: "CC0",
    licenseHref: "https://creativecommons.org/publicdomain/zero/1.0/",
    file: "https://commons.wikimedia.org/wiki/File:Lu%C3%ADs_Montenegro_2024.jpg",
  },
  "Luís Neves": {
    src: "/testemunhos/neves.jpg",
    author: "Agência Lusa",
    license: "CC BY 3.0",
    licenseHref: "https://creativecommons.org/licenses/by/3.0/",
    file: "https://commons.wikimedia.org/wiki/File:Lu%C3%ADs_Neves,_Director_Nacional_da_Pol%C3%ADcia_Judici%C3%A1ria_(cropped).png",
  },
  "Carlos Moedas": {
    src: "/testemunhos/moedas.jpg",
    author: "Comissão Europeia",
    license: "CC BY 4.0",
    licenseHref: "https://creativecommons.org/licenses/by/4.0/",
    file: "https://commons.wikimedia.org/wiki/File:Visit_of_Carlos_Moedas,_Mayor_of_Lisbon,_to_the_EC_(P-066307-00-02).jpg",
  },
};

export default function Testimonials() {
  const track = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(3);

  // cartões por página (1 no telemóvel, 3 no desktop)
  const perPage = (el: HTMLUListElement) => {
    const card = el.children[0] as HTMLElement | undefined;
    return card ? Math.max(1, Math.round(el.clientWidth / card.offsetWidth)) : 1;
  };

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const per = perPage(el);
    const p = Math.ceil(el.children.length / per);
    const cards = Array.from(el.children) as HTMLElement[];
    const first = cards.findIndex((c) => c.offsetLeft - el.offsetLeft >= el.scrollLeft - 4);
    setPages(p);
    setPage(Math.min(p - 1, Math.ceil(Math.max(0, first) / per)));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const go = (p: number) => {
    const el = track.current;
    if (!el) return;
    const next = (p + pages) % pages;
    const card = el.children[next * perPage(el)] as HTMLElement | undefined;
    el.scrollTo({ left: card ? card.offsetLeft - el.offsetLeft : 0, behavior: "smooth" });
  };

  return (
    <section id="testemunhos" className="section">
      <div className="container-cs">
        <h2 className="h2 text-center">O que dizem de nós</h2>
        <p className="body mx-auto mt-3 max-w-xl text-center text-muted">
          Citações reais, com fonte. A frase a cinzento por baixo de cada uma é comentário nosso.
        </p>

        <div className="relative mt-10">
          <button
            type="button"
            onClick={() => go(page - 1)}
            aria-label="Anteriores"
            className="absolute -left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-iconbtn text-navy hover:bg-line md:-left-14 md:inline-flex"
          >
            <ArrowLeft width={20} height={20} />
          </button>
          <ul
            ref={track}
            onScroll={measure}
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth"
          >
            {ITEMS.map((t, i) => (
              <li
                key={i}
                className="flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-[12px] border-2 border-navy md:w-[calc((100%-40px)/3)]"
              >
                <div className="relative h-20" style={{ background: "linear-gradient(90deg,#0C1439 0%,#6B4AA4 55%,#DE0E7B 100%)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PHOTOS[t.name]?.src}
                    alt={`Fotografia de ${t.name}`}
                    width={80}
                    height={80}
                    loading="lazy"
                    className="absolute left-1/2 top-full h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-navy object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col items-center px-6 pb-6 pt-14 text-center">
                  <p className="font-bold text-navy">{t.name}</p>
                  <p className="text-[13px] text-muted">{t.role}</p>
                  <blockquote className="mt-4 flex-1 text-lg font-semibold leading-7 text-navy">«{t.quote}»</blockquote>
                  <p className="mt-4 text-sm italic text-muted">{t.note}</p>
                  <a href={t.href} target="_blank" rel="noopener" className="mt-4 text-xs font-semibold text-teal-dark underline">
                    {t.source}, {t.date}
                  </a>
                </div>
              </li>
            ))}
          </ul>
          {/*<button
            type="button"
            onClick={() => go(page + 1)}
            aria-label="Seguintes"
            className="absolute -right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-iconbtn text-navy hover:bg-line md:-right-14 md:inline-flex"
          >
            <ArrowRight width={20} height={20} />
          </button>*/}
        </div>

        <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Páginas">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === page}
              aria-label={`Página ${i + 1}`}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full transition-all ${i === page ? "w-7 bg-navy" : "w-2.5 bg-line"}`}
            />
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-[11px] leading-4 text-muted">
          Fotografias recortadas, via Wikimedia Commons:{" "}
          {Object.entries(PHOTOS).map(([name, p], i, arr) => (
            <span key={name}>
              <a href={p.file} target="_blank" rel="noopener" className="underline">{name}</a>, por {p.author} (
              <a href={p.licenseHref} target="_blank" rel="noopener" className="underline">{p.license}</a>)
              {i < arr.length - 1 ? "; " : "."}
            </span>
          ))}
        </p>

        <div className="mt-10 flex justify-center">
          <a href="#programa" className="btn-section">Responder na Assembleia Popular</a>
        </div>
      </div>
    </section>
  );
}
