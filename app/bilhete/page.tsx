import { Suspense } from "react";
import type { Metadata } from "next";
import TicketView from "@/components/TicketView";

export const metadata: Metadata = {
  title: "O meu bilhete · Camp Summit 2026",
  robots: { index: false },
};

export default function TicketPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-navy" />}>
      <TicketView />
    </Suspense>
  );
}
