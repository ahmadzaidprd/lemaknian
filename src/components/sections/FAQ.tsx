"use client";

import { useState } from "react";
import { Reveal, SplitText } from "@/components/animations";
import { faqData, waLink } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="faq" style={{ padding: "120px 28px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <Reveal>
            <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
              · Pertanyaan umum ·
            </div>
          </Reveal>
          <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 500, lineHeight: 1.04, marginBottom: 16, color: "var(--text-primary)", letterSpacing: "-0.025em" }}>
            <SplitText text="Yang sering" stagger={60} />{" "}
            <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
              <SplitText text="ditanyakan." stagger={60} delay={250} />
            </span>
          </h2>
          <Reveal delay={400}>
            <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
              Belum nemu jawabannya?{" "}
              <a href={waLink("Halo Bu Yati, saya ingin tanya tentang catering.")} target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)" }}>
                Tanya langsung via WhatsApp
              </a>.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div>
            {faqData.map((item, i) => (
              <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
                <div className="faq-question" onClick={() => setOpen(open === i ? -1 : i)}>
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-icon">+</span>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-inner">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
