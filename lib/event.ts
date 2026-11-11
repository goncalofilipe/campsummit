export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const EVENT = {
  name: "Camp Summit",
  edition: "2026 | 1.ª edição",
  city: "Lisboa",
  dateLong: "12 de novembro de 2026",
  dateShort: "12 NOV 2026",
  weekday: "Quinta-feira",
  time: "17h30",
  // Concentração (https://maps.app.goo.gl/RP3gF9VMU39CB83d8)
  meet: {
    time: "17h30",
    hours: "17h30 às 19h",
    place: "Alameda dos Oceanos",
    note: "em frente ao Centro Comercial Vasco da Gama",
    lat: 38.766837,
    lng: -9.095697,
  },
  // Iniciativa pública de conversa (https://maps.app.goo.gl/gtdGicKuE7B4b53x7)
  venue: "Praça do Oriente",
  venueLabel: "Conversa pública",
  venueHours: "19h às 00h30",
  venueNote: "debates às 19h, Assembleia Popular às 21h",
  venueLat: 38.767767,
  venueLng: -9.098221,
  address: "Parque das Nações, Lisboa",
  // Lisboa em novembro está em UTC+0
  startISO: "2026-11-12T17:30:00Z",
  endISO: "2026-11-13T00:30:00Z",
  lat: 38.767767,
  lng: -9.098221,
  organizer: "Acampada de Lisboa",
};

export type Speaker = { name: string; org?: string };
export type ProgramItem = {
  time: string;
  kind?: string;
  title: string;
  desc: string;
  speakers?: Speaker[];
};

export const PROGRAM: ProgramItem[] = [
  {
    time: "17h30",
    title: "Concentração",
    desc: "Na Alameda dos Oceanos, em frente ao Centro Comercial Vasco da Gama, até às 19h. Depois seguimos para a conversa pública na Praça do Oriente.",
  },
  {
    time: "19h00",
    kind: "Conversa",
    title: "Cidade para quem nela vive",
    desc: "Debate sobre o direito à cidade, na Praça do Oriente.",
    speakers: [
      { name: "Jéssica Ribeiro" },
      { name: "Rui Estrela" },
      { name: "Rita Silva" },
      { name: "Bárbara Cruzeiro" },
    ],
  },
  {
    time: "20h00",
    kind: "Conversa",
    title: "Cooperativas de habitação em propriedade coletiva",
    desc: "Uma alternativa ao modelo neoliberal da habitação.",
    speakers: [
      { name: "Augusto Sousa", org: "cooperativa Brejos Faria" },
      { name: "Carmo Gregório", org: "Ecobairros de Futuro" },
      { name: "Judit Morello", org: "cooperativa Aldrava" },
      { name: "Bárbara Cruzeiro", org: "cooperativa Habirizoma" },
    ],
  },
  {
    time: "20h00",
    kind: "Conversa",
    title: "Democracy and Tech",
    desc: "Debate sobre como escapar ao autoritarismo tecnológico.",
    speakers: [{ name: "Filipe Medeiros" }],
  },
  {
    time: "21h00",
    title: "Assembleia Popular",
    desc: "A assembleia da Acampada de Lisboa. Fala quem cá está. A conversa na praça continua até às 00h30.",
  },
];

// "Com A, B (org) e C"
export function speakersLine(p: ProgramItem): string {
  if (!p.speakers?.length) return "";
  const names = p.speakers.map((s) => (s.org ? `${s.name} (${s.org})` : s.name));
  const list = names.length > 1 ? `${names.slice(0, -1).join(", ")} e ${names[names.length - 1]}` : names[0];
  return `Com ${list}`;
}

const ig = (handle: string, city: string) => ({
  label: `@${handle}`,
  href: `https://instagram.com/${handle}`,
  city,
});

export const INSTAGRAM = [
  ig("acampada.lisboa", "Lisboa"),
  ig("acampadaporto", "Porto"),
  ig("acampada.evora", "Évora"),
  ig("acampadabraga", "Braga"),
  ig("acampada.faro", "Faro"),
];

export const LINKS = {
  igLisboa: INSTAGRAM[0],
  site: { label: "acampada.tech", href: "https://acampada.tech" },
  maps: "https://maps.app.goo.gl/gtdGicKuE7B4b53x7",
  mapsMeet: "https://maps.app.goo.gl/RP3gF9VMU39CB83d8",
};

// As duas informações que aparecem sempre juntas
export const WHERE = {
  meet: `Das ${EVENT.meet.hours}: concentração na ${EVENT.meet.place}, ${EVENT.meet.note}`,
  venue: `Das ${EVENT.venueHours}: iniciativa pública de conversa na ${EVENT.venue}`,
};
export const WHERE_LINE = `Concentração na ${EVENT.meet.place}, ${EVENT.meet.note}, das ${EVENT.meet.hours}. Iniciativa pública de conversa na ${EVENT.venue}, das ${EVENT.venueHours}.`;
