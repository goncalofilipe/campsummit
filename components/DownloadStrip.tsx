import { Download, Page } from "iconoir-react";

export default function DownloadStrip() {
  return (
    <section id="cartaz" className="bg-magenta-bg py-20 text-white md:py-24">
      <div className="container-cs grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-[32px] font-semibold leading-[40px] tracking-[0.25px] md:text-[40px] md:leading-[48px]">
            Descarrega o cartaz e cola-o no elevador do teu prédio.
          </h2>
          <p className="body mt-4 max-w-md text-white/85">
            Cartaz A3 para imprimir, partilhar nas stories ou deixar na caixa de correio do senhorio.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/cartaz-a3.pdf" download="camp-summit-2026-cartaz-a3.pdf" className="btn-light gap-2">
              <Download width={18} height={18} />
              PDF A3 para imprimir
            </a>
            <a
              href="/cartaz.png"
              download="camp-summit-2026-cartaz.png"
              className="inline-flex h-12 items-center gap-2 rounded-[4px] border-2 border-white px-6 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Page width={18} height={18} />
              Imagem para partilhar
            </a>
          </div>
        </div>
        <a href="/cartaz-a3.pdf" target="_blank" rel="noopener" className="mx-auto block w-full max-w-[380px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cartaz-preview.png"
            alt="Cartaz do Camp Summit: quinta-feira, 12 de novembro, concentração na Alameda dos Oceanos e Camp Summit na Praça do Oriente"
            width={720}
            height={1018}
            loading="lazy"
            className="h-auto w-full rounded-[8px] shadow-[0_24px_60px_rgba(12,20,57,.35)] transition hover:-translate-y-1"
          />
        </a>
      </div>
    </section>
  );
}
