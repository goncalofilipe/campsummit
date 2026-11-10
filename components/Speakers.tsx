import Portrait from "./Portrait";

const SPEAKERS = [
  { name: "Maria", role: "Enfermeira", org: "Renda: 60% do salário" },
  { name: "João", role: "Estafeta", org: "Divide um T2 com mais cinco" },
  { name: "Sr. António", role: "Reformado", org: "Despejado ao fim de 40 anos no bairro" },
  { name: "Inês", role: "Estudante", org: "Quarto sem janela a 550 €" },
  { name: "Rui", role: "Programador", org: "Trabalha para a cimeira ao lado" },
  { name: "Fátima", role: "Empregada de limpeza", org: "Limpa os alojamentos locais da própria rua" },
  { name: "Diogo", role: "32 anos", org: "Ainda em casa dos pais" },
  { name: "Sónia", role: "Mãe e cuidadora", org: "À espera de casa municipal desde 2014" },
  { name: "Dona Lurdes", role: "Vizinha", org: "Única residente que resta no prédio" },
  { name: "Tu", role: "Inquilino ou inquilina", org: "Lugar reservado debaixo do toldo" },
];

export default function Speakers() {
  return (
    <section id="oradores" className="section bg-white pt-0 md:pt-0">
      <div className="container-cs">
        <h2 className="h2 text-center">Oradores: o povo que vive em Portugal</h2>
        <p className="body mx-auto mt-3 max-w-2xl text-center text-muted">
          Desta vez quem fala é quem vive na cidade, com o esforço do seu trabalho, seja lá qual for a sua nacionalidade,
          profissão, género ou sotaque.
        </p>

        <ul className="no-scrollbar -mx-4 mt-10 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 md:grid-cols-5">
          {SPEAKERS.map((s, i) => (
            <li key={s.name} className="w-[160px] shrink-0 snap-start sm:w-auto">
              <div className="aspect-[175/220] overflow-hidden rounded-t-[14px] rounded-b-[8px] border border-line">
                <Portrait seed={i} label={`Ilustração de ${s.name}`} />
              </div>
              <p className="mt-3 truncate text-[13px] font-bold text-navy">{s.name}</p>
              <p className="truncate text-[13px] text-muted">{s.role}</p>
              <p className="line-clamp-2 text-[13px] leading-[18px] text-navy/80">{s.org}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-xs text-muted">
          Personagens compostas. Qualquer semelhança com a tua vida não é coincidência.
        </p>
        <div className="mt-8 flex justify-center">
          <a href="#bilhete" className="btn-section">Ver todos os oradores (somos mais de 11 milhões)</a>
        </div>
      </div>
    </section>
  );
}
