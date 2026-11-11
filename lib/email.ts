import { EVENT, PROGRAM, LINKS, INSTAGRAM, WHERE, WHERE_LINE, speakersLine } from "./event";
import { formatNumber, personNumber, POPULATION, seatFor } from "./ticket";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

type Args = { name: string; id: string; ticketUrl: string; siteUrl: string };

/** Email do bilhete: HTML em tabelas e estilos inline, para funcionar no Gmail, Outlook e Apple Mail. */
export function renderTicketEmail({ name, id, ticketUrl, siteUrl }: Args) {
  const n = esc(name);
  const qr = `${siteUrl}/api/qr?d=${encodeURIComponent(ticketUrl)}`;
  const person = formatNumber(personNumber(id));
  const seat = esc(seatFor(id));
  const font = "Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

  const program = PROGRAM.map(
    (p) => `
      <tr>
        <td width="72" valign="top" style="padding:8px 0;font:700 15px/22px ${font};color:#DE0E7B;">${p.time}</td>
        <td valign="top" style="padding:8px 0;font:600 15px/22px ${font};color:#0C1439;">${esc(p.title)}
          <div style="font:400 13px/20px ${font};color:#646464;">${esc(p.desc)}</div>${p.speakers ? `
          <div style="font:600 13px/20px ${font};color:#0C1439;margin-top:2px;">${esc(speakersLine(p))}</div>` : ""}</td>
      </tr>`,
  ).join("");

  const html = `<!doctype html>
<html lang="pt-PT">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<title>O teu bilhete para o Camp Summit</title>
</head>
<body style="margin:0;padding:0;background:#F6F6F7;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${n}, o teu lugar está garantido. 12 nov: ${WHERE_LINE}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F6F6F7" style="background:#F6F6F7;">
<tr><td align="center" style="padding:32px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">

    <!-- cabeçalho -->
    <tr><td style="padding:0 8px 20px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td valign="middle"><img src="${siteUrl}/email/mark.png" width="40" height="40" alt="" style="display:block;border:0;"></td>
        <td valign="middle" style="padding-left:10px;font:700 22px/24px ${font};color:#0C1439;letter-spacing:-0.5px;">camp summit
          <div style="font:600 10px/14px ${font};color:#646464;letter-spacing:1.6px;text-transform:uppercase;">Lisboa · 12 nov 2026</div></td>
      </tr></table>
    </td></tr>

    <!-- bilhete -->
    <tr><td bgcolor="#0C1439" style="background:#0C1439;border-radius:20px;overflow:hidden;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td bgcolor="#CB1977" style="background:#CB1977;background-image:linear-gradient(93deg,#DE0E7B 1.6%,#6B4AA4 70.5%,#00ACA8 95.4%);border-radius:20px 20px 0 0;padding:22px 28px;">
          <div style="font:600 12px/16px ${font};color:#ffffff;letter-spacing:2px;text-transform:uppercase;">Passe povo · Acesso total</div>
          <div style="font:700 26px/32px ${font};color:#ffffff;margin-top:6px;">O futuro começa aqui. <span style="font-weight:300;font-style:italic;">Not there.</span></div>
        </td></tr>
        <tr><td style="padding:26px 28px 6px;">
          <div style="font:600 11px/16px ${font};color:#00ACA8;letter-spacing:1.6px;text-transform:uppercase;">Nome</div>
          <div style="font:700 30px/36px ${font};color:#ffffff;">${n}</div>
          <div style="font:400 13px/20px ${font};color:#b9bdd3;margin-top:4px;">Pessoa n.º ${person} de ${formatNumber(POPULATION)}</div>
        </td></tr>
        <tr><td style="padding:16px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td width="33%" valign="top" style="padding-right:8px;">
              <div style="font:600 11px/16px ${font};color:#00ACA8;letter-spacing:1.6px;text-transform:uppercase;">Data</div>
              <div style="font:700 17px/24px ${font};color:#ffffff;">12 nov 2026</div>
              <div style="font:400 13px/18px ${font};color:#b9bdd3;">${EVENT.weekday}</div></td>
            <td width="67%" valign="top">
              <div style="font:600 11px/16px ${font};color:#00ACA8;letter-spacing:1.6px;text-transform:uppercase;">Concentração · ${EVENT.meet.hours}</div>
              <div style="font:700 17px/24px ${font};color:#ffffff;">${EVENT.meet.place}</div>
              <div style="font:400 13px/18px ${font};color:#b9bdd3;">${EVENT.meet.note}</div>
              <div style="font:600 11px/16px ${font};color:#00ACA8;letter-spacing:1.6px;text-transform:uppercase;margin-top:12px;">${EVENT.venueLabel} · ${EVENT.venueHours}</div>
              <div style="font:700 17px/24px ${font};color:#ffffff;">${EVENT.venue}</div>
              <div style="font:400 13px/18px ${font};color:#b9bdd3;">${EVENT.venueNote}</div></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:0 28px;"><div style="border-top:2px dashed #2a3360;height:1px;line-height:1px;font-size:1px;">&nbsp;</div></td></tr>
        <tr><td style="padding:22px 28px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td width="150" valign="top">
              <img src="${qr}" width="140" height="140" alt="Código QR do bilhete ${id}" style="display:block;border:0;border-radius:10px;background:#ffffff;">
            </td>
            <td valign="top" style="padding-left:18px;">
              <div style="font:600 11px/16px ${font};color:#00ACA8;letter-spacing:1.6px;text-transform:uppercase;">Código</div>
              <div style="font:700 18px/26px 'SFMono-Regular', Menlo, Consolas, monospace;color:#ffffff;letter-spacing:1px;">${id}</div>
              <div style="font:600 11px/16px ${font};color:#00ACA8;letter-spacing:1.6px;text-transform:uppercase;margin-top:12px;">Lugar</div>
              <div style="font:600 15px/22px ${font};color:#ffffff;">${seat}</div>
              <div style="font:600 11px/16px ${font};color:#00ACA8;letter-spacing:1.6px;text-transform:uppercase;margin-top:12px;">Preço</div>
              <div style="font:600 15px/22px ${font};color:#ffffff;">0 €</div>
            </td>
          </tr></table>
        </td></tr>
      </table>
    </td></tr>

    <!-- botão -->
    <tr><td align="center" style="padding:28px 8px 8px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td bgcolor="#DE0E7B" style="border-radius:60px;background:#DE0E7B;background-image:linear-gradient(93deg,#DE0E7B 1.6%,#6B4AA4 70.5%,#00ACA8 95.4%);">
          <a href="${esc(ticketUrl)}" style="display:inline-block;padding:14px 32px;font:700 16px/20px ${font};color:#ffffff;text-decoration:none;border-radius:60px;">Abrir o bilhete (PDF e Wallet)</a>
        </td>
      </tr></table>
    </td></tr>

    <!-- texto -->
    <tr><td style="padding:24px 8px 0;font:400 16px/24px ${font};color:#0C1439;">
      <p style="margin:0 0 14px;">Olá ${n},</p>
      <p style="margin:0 0 14px;">O teu lugar está garantido. ${WHERE_LINE}</p>
      <p style="margin:0 0 14px;">Na cimeira ao lado, um passe custa centenas de euros. Este custa zero e não levou um cêntimo dos cofres da câmara.</p>
      <p style="margin:0 0 14px;">O bilhete é simbólico: a entrada é livre e ninguém o vai pedir à porta. Traz o bilhete, traz amigos e traz o que tens para dizer na Assembleia Popular.</p>
    </td></tr>

    <!-- programa -->
    <tr><td style="padding:12px 8px 0;">
      <div style="font:600 18px/26px ${font};color:#0C1439;margin-bottom:4px;">Programa</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${program}</table>
    </td></tr>

    <!-- rodapé -->
    <tr><td style="padding:32px 8px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="background:#ffffff;border-radius:12px;">
        <tr><td style="padding:18px 20px;font:600 14px/22px ${font};color:#0C1439;">
          Segue as acampadas:<br>
          ${INSTAGRAM.map((i) => `<a href="${i.href}" style="color:#DE0E7B;text-decoration:none;">${i.label}</a>`).join(" · ")}<br>
          <a href="${LINKS.site.href}" style="color:#008484;text-decoration:none;">${LINKS.site.label}</a>
        </td></tr>
      </table>
      <p style="margin:16px 0 0;font:400 12px/18px ${font};color:#646464;">
        Recebeste este email porque pediste um bilhete em <a href="${siteUrl}" style="color:#646464;">${siteUrl.replace(/^https?:\/\//, "")}</a>.
        O Camp Summit é uma ação de sátira política da Acampada de Lisboa, sem qualquer ligação ao Web Summit.
      </p>
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`;

  const text = `Olá ${name},

O teu lugar está garantido.

CAMP SUMMIT 2026
${EVENT.weekday}, 12 de novembro de 2026
${WHERE.meet}
${WHERE.venue}

Código: ${id}
Lugar: ${seatFor(id)}
Preço: 0 €

Programa:
${PROGRAM.map((p) => `${p.time}  ${p.title}: ${p.desc}${p.speakers ? ` ${speakersLine(p)}.` : ""}`).join("\n")}

Abrir o bilhete (PDF e Wallet): ${ticketUrl}

Segue as acampadas: ${INSTAGRAM.map((i) => i.label).join(" · ")} · ${LINKS.site.href}

Bilhete simbólico, entrada livre. Sátira política da Acampada de Lisboa, sem ligação ao Web Summit.`;

  return {
    subject: `${name}, o teu bilhete para o Camp Summit (12 nov, 17h30)`,
    html,
    text,
  };
}
