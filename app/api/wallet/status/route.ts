import { NextResponse } from "next/server";
import { appleConfigured, googleConfigured } from "@/lib/wallet";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ apple: appleConfigured(), google: googleConfigured() });
}
