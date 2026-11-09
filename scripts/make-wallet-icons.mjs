// Gera os PNG da marca (triângulos) sem dependências: ícones do Apple Wallet e imagem do email.
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
};
function png(w, h, px) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0;
    px.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const inTri = (x, y, [a, b, c]) => {
  const s = (p1, p2) => (x - p2[0]) * (p1[1] - p2[1]) - (p1[0] - p2[0]) * (y - p2[1]);
  const d1 = s(a, b), d2 = s(b, c), d3 = s(c, a);
  return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
};
// mesmo desenho do LogoMark (viewBox 48x42)
const SHAPES = [
  { tri: [[24, 1], [47, 41], [1, 41]], col: hex("#DE0E7B"), a: 1 },
  { tri: [[34, 15], [47, 41], [21, 41]], col: hex("#6B4AA4"), a: 0.9 },
  { tri: [[24, 22], [34, 41], [14, 41]], col: hex("#00ACA8"), a: 1 },
];
function render(size, { bg = null, pad = 0.12 } = {}) {
  const w = size, h = size, px = Buffer.alloc(w * h * 4);
  const S = 4; // supersampling
  const scale = (w * (1 - pad * 2)) / 48, ox = w * pad, oy = (h - 42 * scale) / 2;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let r = 0, g = 0, b = 0, a = 0;
    for (let sy = 0; sy < S; sy++) for (let sx = 0; sx < S; sx++) {
      const X = (x + (sx + 0.5) / S - ox) / scale, Y = (y + (sy + 0.5) / S - oy) / scale;
      let cr = bg ? bg[0] : 0, cg = bg ? bg[1] : 0, cb = bg ? bg[2] : 0, ca = bg ? 1 : 0;
      for (const sh of SHAPES) if (inTri(X, Y, sh.tri)) {
        cr = sh.col[0] * sh.a + cr * (1 - sh.a); cg = sh.col[1] * sh.a + cg * (1 - sh.a); cb = sh.col[2] * sh.a + cb * (1 - sh.a);
        ca = sh.a + ca * (1 - sh.a);
      }
      r += cr * ca; g += cg * ca; b += cb * ca; a += ca;
    }
    const i = (y * w + x) * 4;
    px[i + 3] = Math.round((a / (S * S)) * 255);
    if (a > 0) { px[i] = Math.round(r / a); px[i + 1] = Math.round(g / a); px[i + 2] = Math.round(b / a); }
  }
  return png(w, h, px);
}
mkdirSync("wallet", { recursive: true });
mkdirSync("public/email", { recursive: true });
const navy = hex("#0C1439");
writeFileSync("wallet/icon.png", render(29, { bg: navy }));
writeFileSync("wallet/icon@2x.png", render(58, { bg: navy }));
writeFileSync("wallet/icon@3x.png", render(87, { bg: navy }));
writeFileSync("wallet/logo.png", render(50, { pad: 0.04 }));
writeFileSync("wallet/logo@2x.png", render(100, { pad: 0.04 }));
writeFileSync("wallet/logo@3x.png", render(150, { pad: 0.04 }));
writeFileSync("public/email/mark.png", render(96, { pad: 0.04 }));
writeFileSync("public/wallet-logo.png", render(660, { bg: navy, pad: 0.2 }));
console.log("ícones gerados");
