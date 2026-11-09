import type { ComponentType, SVGProps } from "react";
import { Shield, ShoppingBag, Bonfire, City, Journal, Bank, Building, Euro, Key, HomeAlt, Mail, Megaphone, Sofa, PiggyBank } from "iconoir-react";
import { LINKS } from "@/lib/event";

type Logo = { name: string; sub?: string; icon?: ComponentType<SVGProps<SVGSVGElement>>; serif?: boolean };
type Block = { id: string; title: string; intro: string; logos: Logo[]; cta: { label: string; href: string; external?: boolean } };

const BLOCKS: Block[] = [
  {
    id: "parceiros",
    title: "Já estiveram cá",
    intro: "Visitas que a acampada recebeu no Rossio desde 17 de outubro. Umas mais bem-vindas do que outras.",
    logos: [
      { name: "PSP", sub: "Corpo de Intervenção", icon: Shield },
      { name: "Mercado de Natal", sub: "do Rossio", icon: ShoppingBag },
      { name: "Decathlon", sub: "pelas tendas", icon: Bonfire },
      { name: "D. Pedro IV", sub: "lá em cima, a ver", icon: City },
      { name: "Despacho", sub: "da Câmara Municipal", icon: Journal },
      { name: "Tribunal", sub: "Administrativo de Lisboa", icon: Bank },
    ],
    cta: { label: "Acompanhar a acampada", href: LINKS.igLisboa.href, external: true },
  },
  {
    id: "imprensa",
    title: "Vieram como imprensa",
    intro: "Redações que já escreveram sobre as acampadas pela habitação.",
    logos: [
      { name: "Lusa" },
      { name: "RTP" },
      { name: "TSF" },
      { name: "ECO" },
      { name: "Observador", serif: true },
      { name: "Diário de Notícias", serif: true },
      { name: "JN" },
      { name: "Renascença" },
      { name: "Correio da Manhã", serif: true },
      { name: "TVI" },
      { name: "SOL", serif: true },
      { name: "EFE" },
    ],
    cta: { label: "Contactos para imprensa", href: LINKS.igLisboa.href, external: true },
  },
  {
    id: "investidores",
    title: "Vieram como investidores",
    intro: "Não vieram à acampada. Mas compraram o prédio ao lado.",
    logos: [
      { name: "Fundo Imobiliário", sub: "sede em parte incerta", icon: Building },
      { name: "Visto Gold", sub: "edição limitada", icon: Euro },
      { name: "Alojamento Local", sub: "& Filhos, Lda.", icon: Key },
      { name: "Senhorio", sub: "do 3.º Esquerdo", icon: HomeAlt },
      { name: "Hotel de Charme", sub: "ex-mercearia", icon: Sofa },
      { name: "Co-living", sub: "a 900 € a cama", icon: PiggyBank },
    ],
    cta: { label: "Quero investir (em habitação pública)", href: "#bilhete" },
  },
  {
    id: "governo",
    title: "Ficaram de vir",
    intro: "Convites enviados. Continuamos à espera de resposta.",
    logos: [
      { name: "Primeiro-Ministro", sub: "vai ouvir os partidos", icon: Megaphone },
      { name: "Ministro da Adm. Interna", sub: "mandou a PSP", icon: Shield },
      { name: "Presidente da Câmara", sub: "mandou um despacho", icon: Mail },
      { name: "Ministério da Habitação", sub: "convite por abrir", icon: HomeAlt },
      { name: "Comissão Europeia", sub: "ainda a ler o PRR", icon: Bank },
    ],
    cta: { label: "Enviar mais um convite", href: "#bilhete" },
  },
];

function LogoTile({ logo }: { logo: Logo }) {
  const Icon = logo.icon;
  return (
    <li className="flex min-h-24 flex-col items-center justify-center gap-1.5 rounded-lg px-2 py-4 text-center text-[#8b8b93] grayscale transition hover:text-navy">
      {Icon && <Icon width={26} height={26} className="shrink-0" />}
      <span className={`leading-tight ${logo.serif ? "font-serif text-lg italic" : "text-lg font-bold tracking-tight"}`}>{logo.name}</span>
      {logo.sub && <span className="text-[11px] font-medium uppercase leading-4 tracking-[0.8px]">{logo.sub}</span>}
    </li>
  );
}

export default function SocialProof() {
  return (
    <div className="bg-white">
      {BLOCKS.map((b, i) => (
        <section key={b.id} id={b.id} className={`py-16 md:py-20 ${i > 0 ? "border-t border-line" : ""}`}>
          <div className="container-cs">
            <h2 className="h2 text-center">{b.title}</h2>
            <p className="body mx-auto mt-3 max-w-xl text-center text-muted">{b.intro}</p>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 sm:grid-cols-3 md:grid-cols-6">
              {b.logos.map((l) => (
                <LogoTile key={l.name} logo={l} />
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <a
                href={b.cta.href}
                target={b.cta.external ? "_blank" : undefined}
                rel={b.cta.external ? "noopener" : undefined}
                className="btn-section"
              >
                {b.cta.label}
              </a>
            </div>
          </div>
        </section>
      ))}
      <p className="container-cs pb-10 text-center text-xs text-muted">
        Nomes usados para comentário e sátira. Nenhuma destas entidades apoia, patrocina ou sabe deste evento.
      </p>
    </div>
  );
}
