"use client";

import { useState } from "react";
import { Calendar } from "iconoir-react";
import Image from "next/image";

import { EVENT } from "@/lib/event";

import LogoSvg from "./Logo.svg";

function Crowd() {
  // silhuetas de público e tendas no fundo do palco
  const heads = Array.from({ length: 42 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-40 w-full"
      aria-hidden="true"
    >
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
        <path
          d="M120 160 190 70 260 160Z M1180 160 1260 60 1340 160Z M640 160 700 84 760 160Z"
          fill="#0a1030"
        />
      </g>
    </svg>
  );
}

export default function Hero() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="top"
      className={`relative overflow-hidden ${paused ? "paused" : ""}`}
    >
      {/* Fundo: palco escuro (desktop) / gradiente da marca (mobile) */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(160deg,#DE0E7B 0%,#6B4AA4 55%,#00ACA8 100%)",
        }}
      />
      <div className="absolute inset-0 hidden bg-[#070b24] md:block">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 50% -5%, rgba(222,14,123,.75), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 45% at 50% 108%, rgba(0,172,168,.6), transparent 70%)",
          }}
        />
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

      <div className="container-cs relative grid gap-4 py-8 md:grid-cols-5 md:gap-5 md:py-14 lg:max-w-295">
        {/* Cartão vídeo (2/3) */}
        <div className="max-lg:hidden order-1 rounded-3xl border border-white/15 bg-nay/55 p-3 backdrop-blur-md lg:order-2 lg:col-span-3 bg-white flex justify-center items-center">
          <Image src={LogoSvg} alt="Camp Summit logo" />
        </div>

        {/* Cartão de texto (1/3) */}
        <div className="order-2 flex flex-col rounded-3xl border border-white/15 bg-navy/55 p-6 text-white backdrop-blur-md lg:order-1 md:p-7 col-span-5 lg:col-span-2">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-semibold uppercase tracking-[1.6px] min-[400px]:text-xl">
            <Calendar width={26} height={26} />
            {EVENT.city} • {EVENT.dateShort}
          </span>
          <h1 className="mt-6 text-[32px] font-bold leading-10 tracking-[0.1px]">
            O futuro começa aqui. <em className="font-light">Not there.</em>
          </h1>
          <p className="mt-4 body text-white/90">
            Do outro lado da rua, a grande cimeira tecnológica vende o futuro da
            cidade em pacotes premium. Debaixo do toldo do Pavilhão de Portugal,
            discutimos quem lá vai poder morar.
          </p>
          <p className="mt-3 body text-white/90">
            <strong className="font-semibold">
              {EVENT.weekday}, 12 de novembro, às {EVENT.time}.
            </strong>{" "}
            Debates, música e Assembleia Popular. Entrada livre. A renda,
            infelizmente, continua cara.
          </p>
          <div className="mt-auto flex flex-col gap-3 pt-7 items-center">
            <a
              href="#bilhete"
              className="btn-primary w-full md:w-fit lg:w-full"
            >
              Obter bilhete grátis
            </a>
            <a
              href="#programa"
              className="btn-secondary w-full md:w-fit lg:w-full"
            >
              Ver programa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
