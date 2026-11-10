import { Calendar, Clock, MapPin, ArrowRight } from "iconoir-react";
import { EVENT, PROGRAM, LINKS } from "@/lib/event";

export default function Program() {
  const facts = [
    {
      icon: Calendar,
      label: "Data",
      value: "12 nov 2026",
      note: EVENT.weekday,
    },
    {
      icon: Clock,
      label: "Início",
      value: EVENT.time,
      note: "até ao fim da assembleia",
    },
    {
      icon: MapPin,
      label: "Local",
      value: EVENT.venue,
      note: `(${EVENT.venueNote})`,
      href: LINKS.maps,
    },
  ];
  return (
    <section id="programa" className="section">
      <div className="container-cs">
        <div className="grid gap-4 md:grid-cols-3">
          {facts.map(({ icon: Icon, label, value, note, href }) => {
            const inner = (
              <>
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white"
                  style={{ background: "var(--brand-gradient)" }}
                >
                  <Icon width={22} height={22} />
                </span>
                <span className="mt-5 block text-xs font-semibold uppercase tracking-[1.6px] text-muted">
                  {label}
                </span>
                <span className="mt-1 block text-[28px] font-bold leading-tight text-navy">
                  {value}
                </span>
                <span className="mt-1 block text-base text-muted">{note}</span>
              </>
            );
            return href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                className="group rounded-2xl border border-line p-6 transition hover:border-navy"
              >
                {inner}
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal-dark">
                  Ver no mapa{" "}
                  <ArrowRight
                    width={16}
                    height={16}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </a>
            ) : (
              <div key={label} className="rounded-2xl border border-line p-6">
                {inner}
              </div>
            );
          })}
        </div>

        <h2 className="h2 mt-20 text-center">Programa</h2>
        <p className="body mx-auto mt-3 max-w-xl text-center text-muted">
          Três conversas livres, sem patrocínios nem barreiras à participação.
        </p>
        <ol className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {PROGRAM.map((p, i) => (
            <li
              key={p.time}
              className="grid gap-2 p-6 sm:grid-cols-[140px_1fr] sm:items-center md:p-8"
            >
              <span className="text-[28px] font-bold leading-none text-magenta md:text-[32px]">
                {p.time}
              </span>
              <div>
                <p className="text-xl font-semibold text-navy md:text-2xl">
                  {p.title}
                </p>
                <p className="body mt-1 text-muted">{p.desc}</p>
              </div>
              {i === 2 && (
                <span className="sr-only">Último ponto do programa</span>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-10 flex justify-center">
          <a href="#bilhete" className="btn-section">
            Reservar o meu lugar no chão
          </a>
        </div>
      </div>
    </section>
  );
}
