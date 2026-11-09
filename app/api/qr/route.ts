import QRCode from "qrcode";

export async function GET(req: Request) {
  const d = new URL(req.url).searchParams.get("d") || "";
  if (!d || d.length > 400) return new Response("Bad request", { status: 400 });
  const png = await QRCode.toBuffer(d, {
    type: "png",
    width: 480,
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#0C1439", light: "#FFFFFF" },
  });
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
