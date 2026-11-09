"use client";

import { useState } from "react";
import { Calendar, Pause, Play } from "iconoir-react";
import { EVENT } from "@/lib/event";

function Crowd() {
  // silhuetas de público e tendas no fundo do palco
  const heads = Array.from({ length: 42 }, (_, i) => i);
  return (
    <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-40 w-full" aria-hidden="true">
      <g fill="#060a20" opacity=".9">
        {heads.map((i) => {
          const x = i * 35 + (i % 3) * 6;
          const y = 92 + ((i * 37) % 22);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={11 + (i % 4)} />
              <rect x={x - 20} y={y + 10} width={40} height={80} rx={18} />
            </g>
          );
        })}
        <path d="M120 160 190 70 260 160Z M1180 160 1260 60 1340 160Z M640 160 700 84 760 160Z" fill="#0a1030" />
      </g>
    </svg>
  );
}

export default function Hero() {
  const [paused, setPaused] = useState(false);

  return (
    <section id="top" className={`relative overflow-hidden ${paused ? "paused" : ""}`}>
      {/* Fundo: palco escuro (desktop) / gradiente da marca (mobile) */}
      <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(160deg,#DE0E7B 0%,#6B4AA4 55%,#00ACA8 100%)" }} />
      <div className="absolute inset-0 hidden bg-[#070b24] md:block">
        <div className="absolute inset-0" style={{ background: "radial-gradient(70% 55% at 50% -5%, rgba(222,14,123,.75), transparent 70%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(60% 45% at 50% 108%, rgba(0,172,168,.6), transparent 70%)" }} />
        {[12, 32, 68, 88].map((left, i) => (
          <div
            key={left}
            className="beam absolute top-0 h-[120%] w-40"
            style={{
              left: `${left}%`,
              animationDelay: `${i * -2.2}s`,
              background: `linear-gradient(180deg, ${i % 2 ? "rgba(0,172,168,.35)" : "rgba(222,14,123,.35)"}, transparent 75%)`,
              clipPath: "polygon(45% 0, 55% 0, 100% 100%, 0 100%)",
              filter: "blur(6px)",
            }}
          />
        ))}
        <Crowd />
      </div>

      <div className="container-cs relative grid gap-4 py-8 md:grid-cols-3 md:gap-5 md:py-14 lg:max-w-[1180px]">
        {/* Cartão vídeo (2/3) */}
        <div className="order-2 rounded-[24px] border border-white/15 bg-[#0C1439]/55 p-3 backdrop-blur-md md:order-1 md:col-span-2">
          <div className="relative aspect-[16/11] overflow-hidden rounded-[16px] md:aspect-auto md:h-full md:min-h-[440px]">
            <div
              className="absolute inset-0 scale-125 bg-cover bg-center opacity-70 blur-2xl"
              style={{ backgroundImage: "url(/rollup.png)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C1439]/80 via-transparent to-[#0C1439]/80" />
            <div
              role="img"
              aria-label="Cartaz do Camp Summit: Contra-Web Summit, 11 novembro 2026, 19h00, Pavilhão de Portugal (debaixo do toldo)"
              className="pan absolute inset-y-0 left-1/2 w-[46%] max-w-[300px] -translate-x-1/2 bg-no-repeat shadow-2xl md:w-[38%]"
              style={{ backgroundImage: "url(/rollup.png)", backgroundSize: "100% auto" }}
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[1.5px] text-white backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-magenta" />
              Em direto do toldo
            </span>
            <button
              type="button"
              onClick={() => setPaused(!paused)}
              aria-label={paused ? "Retomar" : "Pausar"}
              className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-navy transition hover:bg-white"
            >
              {paused ? <Play width={20} height={20} /> : <Pause width={20} height={20} />}
            </button>
          </div>
        </div>

        {/* Cartão de texto (1/3) */}
        <div className="order-1 flex flex-col rounded-[24px] border border-white/15 bg-[#0C1439]/55 p-6 text-white backdrop-blur-md md:order-2 md:p-7">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[13px] font-semibold uppercase tracking-[1.6px]">
            <Calendar width={16} height={16} />
            {EVENT.city} • {EVENT.dateShort}
          </span>
          <h1 className="mt-6 text-[32px] font-bold leading-[40px] tracking-[0.1px]">
            O futuro começa aqui. <em className="font-light">Not there.</em>
          </h1>
          <p className="mt-4 body text-white/90">
            Do outro lado da rua, a grande cimeira tecnológica vende o futuro da cidade em pacotes premium. Debaixo do toldo
            do Pavilhão de Portugal, discutimos quem lá vai poder morar.
          </p>
          <p className="mt-3 body text-white/90">
            <strong className="font-semibold">{EVENT.weekday}, 11 de novembro, às {EVENT.time}.</strong> Debates, música e
            Assembleia Popular. Entrada livre. A renda, infelizmente, continua cara.
          </p>
          <div className="mt-auto flex flex-col gap-3 pt-7">
            <a href="#bilhete" className="btn-primary w-full">Obter bilhete grátis</a>
            <a href="#programa" className="btn-secondary w-full">Ver programa</a>
          </div>
        </div>
      </div>
    </section>
  );
}
