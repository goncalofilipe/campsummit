"use client";

import { useState } from "react";
import { Download } from "iconoir-react";

export default function DownloadStrip() {
  const [done, setDone] = useState(false);
  return (
    <section id="cartaz" className="bg-magenta-bg py-20 text-white md:py-24">
      <div className="container-cs grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-[32px] font-semibold leading-[40px] tracking-[0.25px] md:text-[40px] md:leading-[48px]">
            Descarrega o cartaz e cola-o no elevador do teu prédio.
          </h2>
          <p className="body mt-4 max-w-md text-white/85">
            Roll-up em alta resolução para imprimir, partilhar nas stories ou deixar na caixa de correio do senhorio.
          </p>
        </div>
        <form
          className="space-y-4 flex flex-col items-center"
          onSubmit={(e) => {
            e.preventDefault();
            const a = document.createElement("a");
            a.href = "/rollup.png";
            a.download = "camp-summit-2026-cartaz.png";
            a.click();
            setDone(true);
          }}
        >
          {/*<div>
            <label htmlFor="dl-email" className="field-label">Email <span aria-hidden="true">*</span></label>
            <input id="dl-email" type="email" required placeholder="o.teu@email.pt" className="field" autoComplete="email" />
          </div>*/}
          {/*<div>
            <label htmlFor="dl-name" className="field-label">Nome próprio <span aria-hidden="true">*</span></label>
            <input id="dl-name" type="text" required placeholder="Como te tratamos" className="field" autoComplete="given-name" />
          </div>*/}
          <button type="submit" className="btn-light gap-2">
            <Download width={18} height={18} />
            {done ? "Descarregar outra vez" : "Descarregar cartaz"}
          </button>
        </form>
      </div>
    </section>
  );
}
