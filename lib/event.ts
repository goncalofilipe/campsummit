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
  // 1.º momento: concentração
  meet: {
    time: "17h30",
    place: "Alameda dos Oceanos",
    note: "em frente à entrada da Web Summit",
  },
  // 2.º momento: debates e Assembleia Popular
  venue: "Praça do Oriente",
  venueTime: "19h00",
  venueNote: "debates e Assembleia Popular",
  address: "Parque das Nações, Lisboa",
  // Lisboa em novembro está em UTC+0
  startISO: "2026-11-12T17:30:00Z",
  endISO: "2026-11-12T23:00:00Z",
  // ponto aproximado entre a Alameda dos Oceanos e a Praça do Oriente
  lat: 38.7679,
  lng: -9.0937,
  organizer: "Acampada de Lisboa",
};

export const PROGRAM = [
  {
    time: "17h30",
    title: "Concentração",
    desc: "Na Alameda dos Oceanos, em frente à entrada da Web Summit.",
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
    desc: "A assembleia da Acampada de Lisboa. Fala quem cá está.",
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
  maps: "https://maps.google.com/?q=Pra%C3%A7a+do+Oriente%2C+Lisboa",
  mapsMeet: "https://maps.google.com/?q=Alameda+dos+Oceanos%2C+Lisboa",
};

// As duas informações que aparecem sempre juntas
export const WHERE = {
  meet: `${EVENT.meet.time}: concentração na ${EVENT.meet.place}, ${EVENT.meet.note}`,
  venue: `${EVENT.venueTime}: debates na ${EVENT.venue}`,
};
export const WHERE_LINE = `Concentração às ${EVENT.meet.time} na ${EVENT.meet.place}, ${EVENT.meet.note}. Debates às ${EVENT.venueTime.replace("h00", "h")} na ${EVENT.venue}.`;
