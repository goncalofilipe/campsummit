export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const EVENT = {
  name: "Camp Summit",
  edition: "2026 | 1.ª edição",
  city: "Lisboa",
  dateLong: "11 de novembro de 2026",
  dateShort: "11 NOV 2026",
  weekday: "Quarta-feira",
  time: "19h00",
  venue: "Pavilhão de Portugal",
  venueNote: "debaixo do toldo",
  address: "Alameda dos Oceanos, Parque das Nações, Lisboa",
  // Lisboa em novembro está em UTC+0
  startISO: "2026-11-11T19:00:00Z",
  endISO: "2026-11-11T23:00:00Z",
  lat: 38.7679,
  lng: -9.0937,
  organizer: "Acampada de Lisboa",
};

export const PROGRAM = [
  { time: "19h00", title: "Cidade para quem nela vive", desc: "Debate sobre o direito à cidade." },
  { time: "20h00", title: "Democracy and Tech", desc: "Debate sobre como escapar ao autoritarismo tecnológico." },
  { time: "21h00", title: "Assembleia Popular", desc: "A assembleia da Acampada de Lisboa. Fala quem cá está." },
];

const ig = (handle: string, city: string) => ({ label: `@${handle}`, href: `https://instagram.com/${handle}`, city });

export const INSTAGRAM = [
  ig("acampada.lisboa", "Lisboa"),
  ig("acampada.porto", "Porto"),
  ig("acampada.evora", "Évora"),
  ig("acampada.braga", "Braga"),
  ig("acampada.faro", "Faro"),
];

export const LINKS = {
  igLisboa: INSTAGRAM[0],
  site: { label: "acampada.tech", href: "https://acampada.tech" },
  maps: "https://maps.google.com/?q=Pavilh%C3%A3o+de+Portugal+Lisboa",
};
