const QUOTES = [
  {
    quote: "Não ouvimos do primeiro-ministro nenhuma razão para desmobilizar.",
    pub: "TSF",
    date: "3 nov 2026",
    href: "https://www.tsf.pt/sociedade/artigo/nao-ouvimos-do-primeiro-ministro-nenhuma-razao-para-desmobilizar-acampada-de-lisboa-mantem-se-na-luta-pela-habitacao/18144246",
    pos: "md:mr-auto",
  },
  {
    quote: "La acampada persiste y resiste",
    pub: "Infobae / EFE",
    date: "9 nov 2026",
    href: "https://www.infobae.com/america/agencias/2026/11/09/la-acampada-persiste-y-resiste-activistas-de-lisboa-mantienen-su-lucha-por-la-vivienda/",
    pos: "md:ml-auto",
  },
  {
    quote: "Podia ter sido um email",
    pub: "ZAP",
    date: "3 nov 2026",
    href: "https://zap.aeiou.pt/montenegro-declaracao-habitacao-773236",
    pos: "md:mx-auto",
  },
];

export default function PressRelease() {
  return (
    <section
      id="comunicado"
      className="py-20 md:py-[120px]"
      style={{
        background:
          "linear-gradient(180deg,#FFFFFF 0%,rgba(0,132,132,.5) 50%,#CB1977 100%)",
      }}
    >
      <div className="container-cs">
        <h2 className="h2 text-center">Comunicado de imprensa</h2>
        <p className="mt-2 text-center text-sm font-semibold uppercase tracking-[1.5px] text-teal-dark">
          Acampada de Lisboa · para divulgação imediata
        </p>

        <article className="mx-auto mt-10 max-w-[720px] rounded-[12px] bg-white p-6 shadow-[0_8px_30px_rgba(12,20,57,.08)] md:p-10">
          <h3 className="text-2xl font-bold leading-8 text-navy">
            Acampada de Lisboa apresenta o Camp Summit no Pavilhão de Portugal a
            12 de novembro
          </h3>
          <div className="body mt-5 space-y-4 text-navy/90">
            <p>
              A Acampada de Lisboa pelo direito à habitação apresenta, no dia 12
              de novembro, quinta-feira, o Camp Summit no Pavilhão de Portugal.
            </p>
            <p>
              Na semana em que foi anunciada a intenção de venda de 10 terrenos
              públicos por parte da Câmara Municipal de Lisboa por 60 milhões de
              euros, cerca do mesmo valor já dispensado pelo executivo de Carlos
              Moedas para o Web Summit, a acampada convida todas as pessoas que
              participam e simpatizam com o movimento da habitação a juntar-se.
              Incluindo todos os participantes do evento Web Summit.
            </p>
            <p>
              O Web Summit, sobretudo desde o mandato de Carlos Moedas, tem sido
              um instrumento político que configura de forma inequívoca a visão
              que a elite financeira portuguesa tem para as cidades do nosso
              país: uma montra de luxo à beira-mar plantada, onde as pessoas que
              vivem do seu salário não conseguem pagar a renda da sua casa, não
              conseguem aceder a um crédito que seja suficiente para comprar uma
              casa perto do seu local de trabalho, num país que não investiu em
              habitação pública nem cooperativa.
            </p>
            <p>
              O evento da acampada sobre Democracia e Tecnologia vai acontecer
              debaixo da pala do Pavilhão de Portugal a partir das 17h30 e vai
              contar com debates sobre o direito à cidade e tecnologias digitais
              ao serviço da democracia.
            </p>
            <p>
              A partir das 21h, no mesmo lugar, será realizada a Assembleia
              Popular da Acampada de Lisboa.
            </p>
          </div>
        </article>

        <div className="mx-auto mt-16 flex max-w-[860px] flex-col gap-6">
          {QUOTES.map((q) => (
            <figure
              key={q.pub}
              className={`w-full rounded-[12px] bg-white p-7 shadow-[0_8px_30px_rgba(12,20,57,.10)] md:w-[62%] md:p-9 ${q.pos}`}
            >
              <blockquote className="text-[24px] font-bold leading-[32px] text-navy md:text-[28px] md:leading-[36px]">
                «{q.quote}»
              </blockquote>
              <figcaption className="mt-4 font-serif text-lg italic text-muted">
                <a
                  href={q.href}
                  target="_blank"
                  rel="noopener"
                  className="hover:underline"
                >
                  {q.pub}
                </a>
                <span className="not-italic text-sm">, {q.date}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
