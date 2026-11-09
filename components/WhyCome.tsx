import PavilionArt from "./PavilionArt";

export default function WhyCome() {
  return (
    <section id="porque" className="section">
      <div className="container-cs grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
        <div>
          <h2 className="h2">Porquê vir?</h2>
          <p className="body mt-6 text-navy/90">
            Porque na mesma semana a Câmara Municipal de Lisboa anunciou a intenção de vender 10 terrenos públicos por 60
            milhões de euros, <q className="font-semibold">cerca do mesmo valor já dispensado pelo executivo de Carlos Moedas
            para o Web Summit</q>. A conta faz-se sozinha. A casa, essa, não aparece.
          </p>
          <p className="body mt-4 text-navy/90">
            Porque a cidade está a ser desenhada como <q className="font-semibold">uma montra de luxo à beira-mar plantada,
            onde as pessoas que vivem do seu salário não conseguem pagar a renda da sua casa</q>. Vem quem participa no
            movimento pela habitação, quem simpatiza com ele e quem tem crachá da cimeira ao lado. Há lugar para todos.
          </p>
          <p className="mt-3 text-sm text-muted">Citações do comunicado da Acampada de Lisboa.</p>
          <a href="#comunicado" className="btn-section-teal mt-8">Ler o comunicado</a>
        </div>
        <div className="overflow-hidden rounded-[16px]">
          <PavilionArt className="h-auto w-full" />
        </div>
      </div>
    </section>
  );
}
