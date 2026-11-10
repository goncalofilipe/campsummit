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
  time: "17h00",
  // Concentração (https://maps.app.goo.gl/RP3gF9VMU39CB83d8)
  meet: {
    time: "17h00",
    hours: "17h às 19h",
    place: "Alameda dos Oceanos",
    note: "em frente ao Centro Comercial Vasco da Gama",
    lat: 38.766837,
    lng: -9.095697,
  },
  // Iniciativa pública de conversa (https://maps.app.goo.gl/gtdGicKuE7B4b53x7)
  venue: "Praça do Oriente",
  venueLabel: "Conversa pública",
  venueHours: "17h às 00h30",
  venueNote: "debates às 19h, Assembleia Popular às 21h",
  venueLat: 38.767767,
  venueLng: -9.098221,
  address: "Parque das Nações, Lisboa",
  // Lisboa em novembro está em UTC+0
  startISO: "2026-11-12T17:00:00Z",
  endISO: "2026-11-13T00:30:00Z",
  lat: 38.767767,
  lng: -9.098221,
  organizer: "Acampada de Lisboa",
};

export const PROGRAM = [
  {
    time: "17h00",
    title: "Concentração",
    desc: "Na Alameda dos Oceanos, em frente ao Centro Comercial Vasco da Gama, até às 19h. À mesma hora começa a conversa pública na Praça do Oriente.",
  },
  {
    time: "19h00",
    title: "Cidade para quem nela vive",
    desc: "Debate sobre o direito à cidade, na Praça do Oriente.",
  },
  {
    time: "20h00",
    title: "Democracy and Tech",
    desc: "Debate sobre como escapar ao autoritarismo tecnológico.",
  },
  {
    time: "21h00",
    title: "Assembleia Popular",
    desc: "A assembleia da Acampada de Lisboa. Fala quem cá está. A conversa na praça continua até às 00h30.",
  },
];

const ig = (handle: string, city: string) => ({
  label: `@${handle}`,
  href: `https://instagram.com/${handle}`,
  city,
});

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
  maps: "https://maps.app.goo.gl/gtdGicKuE7B4b53x7",
  mapsMeet: "https://maps.app.goo.gl/RP3gF9VMU39CB83d8",
};

// As duas informações que aparecem sempre juntas
export const WHERE = {
  meet: `Das ${EVENT.meet.hours}: concentração na ${EVENT.meet.place}, ${EVENT.meet.note}`,
  venue: `Das ${EVENT.venueHours}: iniciativa pública de conversa na ${EVENT.venue}`,
};
export const WHERE_LINE = `Concentração na ${EVENT.meet.place}, ${EVENT.meet.note}, das ${EVENT.meet.hours}. Iniciativa pública de conversa na ${EVENT.venue}, das ${EVENT.venueHours}.`;
