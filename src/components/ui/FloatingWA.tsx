"use client";

import { waLink } from "@/lib/data";

export function FloatingWA() {
  return (
    <a className="wa-float"
      href={waLink("Halo Bu Yati, saya ingin konsultasi catering.")}
      target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.5-.5-.5-.7-.5h-.5c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.2 3.3 1.4 3.6.2.2 2.5 3.8 6 5.3.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
      </svg>
    </a>
  );
}

export function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  // Kept for backwards-compat with any existing imports; thin wrapper around the new Reveal.
  // (See components/animations for the canonical version.)
  return <div className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
