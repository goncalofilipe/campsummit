// Retrato ilustrado (sem fotografias de pessoas reais)
const BG = [
  ["#DE0E7B", "#6B4AA4"],
  ["#00ACA8", "#0C1439"],
  ["#6B4AA4", "#DE0E7B"],
  ["#0C1439", "#00ACA8"],
  ["#CB1977", "#0C1439"],
];
const SKIN = ["#F2C7A5", "#D9A27C", "#A86F4C", "#7A4B31", "#E8B896"];
const HAIR = ["#1d1d1f", "#4a2e1f", "#8a5a2b", "#c9c9c9", "#2b1a12"];

export default function Portrait({ seed, label }: { seed: number; label: string }) {
  const [a, b] = BG[seed % BG.length];
  const skin = SKIN[(seed * 3) % SKIN.length];
  const hair = HAIR[(seed * 7) % HAIR.length];
  const style = seed % 4;
  const shirt = ["#ffffff", "#0C1439", "#00ACA8", "#F6F6F7"][(seed * 5) % 4];
  const gid = `g${seed}`;
  return (
    <svg viewBox="0 0 175 220" className="h-full w-full" role="img" aria-label={label}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="175" height="220" fill={`url(#${gid})`} />
      <path d="M130 30 175 110V30Z" fill="#fff" opacity=".08" />
      <path d="M0 160 40 90 80 160Z" fill="#fff" opacity=".07" />
      {/* tronco */}
      <path d="M22 220c4-44 30-66 65-66s61 22 66 66Z" fill={shirt} />
      <rect x="76" y="128" width="22" height="30" rx="8" fill={skin} />
      {/* cabelo atrás */}
      {style === 1 && <path d="M50 92c0-40 75-40 75 0v60H50Z" fill={hair} />}
      {/* cabeça */}
      <ellipse cx="87.5" cy="98" rx="30" ry="36" fill={skin} />
      {/* cabelo à frente */}
      {style === 0 && <path d="M57 92c0-30 18-42 31-42s30 10 30 40c-10-14-30-18-61 2Z" fill={hair} />}
      {style === 1 && <path d="M58 90c2-26 18-38 30-38s28 12 30 38c-14-10-36-14-60 0Z" fill={hair} />}
      {style === 2 && <path d="M58 84c4-20 18-28 30-28s26 8 30 28c-20-8-40-8-60 0Z" fill={hair} />}
      {style === 3 && <path d="M60 80c6-18 16-24 28-24s22 6 27 24c-6-4-12-6-27-6s-22 2-28 6Z" fill={hair} opacity=".85" />}
      {seed % 5 === 2 && <rect x="64" y="94" width="47" height="10" rx="5" fill="none" stroke="#0C1439" strokeWidth="3" />}
    </svg>
  );
}
