"use client";

import { useState } from "react";
import { Check } from "iconoir-react";
import { LINKS } from "@/lib/event";

export default function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="py-20 text-white md:py-24" style={{ background: "linear-gradient(180deg,#0C1439 0%,#654DA0 100%)" }}>
      <div className="container-cs grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-[32px] font-semibold leading-[40px] tracking-[0.25px] md:text-[40px] md:leading-[48px]">
            Recebe as notícias
            <br />
            que o teu senhorio
            <br />
            não quer que leias.
          </h2>
          <p className="body mt-5 max-w-md text-white/85">
            Convocatórias, assembleias e o que acontece na acampada. Sem spam, sem patrocínios de imobiliárias.
          </p>
        </div>

        {done ? (
          <div className="rounded-xl bg-white/10 p-6">
            <Check width={28} height={28} className="text-teal" />
            <p className="mt-3 text-lg font-semibold">Estás na lista.</p>
            <p className="body mt-1 text-white/85">
              Enquanto isso, segue a{" "}
              <a className="underline" href={LINKS.igLisboa.href} target="_blank" rel="noopener">
                {LINKS.igLisboa.label}
              </a>{" "}
              para as convocatórias de última hora.
            </p>
          </div>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <div>
              <label htmlFor="nl-email" className="field-label">Email <span aria-hidden="true">*</span></label>
              <input id="nl-email" type="email" required placeholder="o.teu@email.pt" className="field" autoComplete="email" />
            </div>
            <div>
              <label htmlFor="nl-name" className="field-label">Nome próprio <span aria-hidden="true">*</span></label>
              <input id="nl-name" type="text" required placeholder="Como te tratamos" className="field" autoComplete="given-name" />
            </div>
            <p className="text-[13px] leading-5 text-white/75">
              Ao subscrever aceitas receber emails da Acampada de Lisboa. Podes sair quando quiseres. Lê a{" "}
              <a href="#privacidade" className="underline">política de privacidade</a> e os{" "}
              <a href="#termos" className="underline">termos</a> (cabem num post-it).
            </p>
            <button type="submit" className="btn-light">Subscrever</button>
          </form>
        )}
      </div>
    </section>
  );
}
