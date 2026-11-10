import LogoSvg from "./Logo.svg";
import Image from "next/image";

type Props = { className?: string; tone?: "dark" | "light"; tagline?: boolean };

export function LogoMark({ className = "h-9 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 42" className={className} aria-hidden="true">
      <path d="M24 1 47 41H1Z" fill="#DE0E7B" />
      <path d="M34 15 47 41H21Z" fill="#6B4AA4" opacity=".9" />
      <path d="M24 22 34 41H14Z" fill="#00ACA8" />
    </svg>
  );
}

export default function Logo({
  className = "",
  tone = "dark",
  tagline = true,
}: Props) {
  const text = tone === "dark" ? "text-navy" : "text-white";
  return <Image src={LogoSvg} alt="Camp Summit logo" width={100} />;
}
