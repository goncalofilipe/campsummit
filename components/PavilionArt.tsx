// Ilustração: a pala do Pavilhão de Portugal com tendas por baixo
export default function PavilionArt({ className = "" }: { className?: string }) {
  const tents = [
    { x: 150, w: 90, c: "#DE0E7B" },
    { x: 250, w: 70, c: "#00ACA8" },
    { x: 330, w: 100, c: "#6B4AA4" },
    { x: 440, w: 80, c: "#DE0E7B" },
    { x: 530, w: 90, c: "#00ACA8" },
  ];
  return (
    <svg viewBox="0 0 720 520" className={className} role="img" aria-label="Ilustração de tendas na Praça do Oriente, à noite">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0C1439" />
          <stop offset=".7" stopColor="#3b2a6e" />
          <stop offset="1" stopColor="#CB1977" />
        </linearGradient>
        <linearGradient id="river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#00ACA8" stopOpacity=".7" />
          <stop offset="1" stopColor="#0C1439" />
        </linearGradient>
      </defs>
      <rect width="720" height="520" fill="url(#sky)" />
      {Array.from({ length: 40 }, (_, i) => (
        <circle key={i} cx={(i * 97) % 720} cy={(i * 53) % 200} r={i % 3 ? 1 : 1.8} fill="#fff" opacity=".6" />
      ))}
      <rect y="440" width="720" height="80" fill="url(#river)" />
      {/* pórticos */}
      <rect x="40" y="170" width="70" height="280" fill="#d9d6e4" />
      <rect x="610" y="170" width="70" height="280" fill="#d9d6e4" />
      <rect x="40" y="170" width="70" height="280" fill="#0C1439" opacity=".15" />
      {/* pala em catenária */}
      <path d="M110 178 Q360 300 610 178 L610 192 Q360 314 110 192Z" fill="#eeeaf6" />
      {/* luzes */}
      <path d="M110 200 Q360 330 610 200" fill="none" stroke="#fff" strokeOpacity=".25" strokeDasharray="2 14" strokeWidth="5" strokeLinecap="round" />
      {/* chão */}
      <rect x="40" y="440" width="640" height="10" fill="#0C1439" />
      {tents.map((t) => (
        <g key={t.x}>
          <path d={`M${t.x} 440 L${t.x + t.w / 2} ${440 - t.w * 0.8} L${t.x + t.w} 440Z`} fill={t.c} />
          <path d={`M${t.x + t.w * 0.35} 440 L${t.x + t.w / 2} ${440 - t.w * 0.35} L${t.x + t.w * 0.65} 440Z`} fill="#0C1439" opacity=".55" />
        </g>
      ))}
      {/* pessoas */}
      {[130, 245, 320, 430, 520, 625].map((x, i) => (
        <g key={x} fill="#060a20">
          <circle cx={x} cy={392 - (i % 2) * 6} r="9" />
          <rect x={x - 11} y={402 - (i % 2) * 6} width="22" height={38 + (i % 2) * 6} rx="9" />
        </g>
      ))}
      <text x="360" y="96" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="28" opacity=".9">
        praça do oriente
      </text>
    </svg>
  );
}
