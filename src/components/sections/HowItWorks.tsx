"use client";

import { Reveal, SplitText, TiltCard, CountStat } from "@/components/animations";
import { statsData } from "@/lib/data";

const STEPS = [
  { num: "01", title: "Hitung estimasi", icon: "🧮", desc: "Masukkan jumlah tamu & pilih paket — estimasi harga keluar otomatis, transparan, tanpa biaya tersembunyi." },
  { num: "02", title: "Konfirmasi via WA", icon: "💬", desc: "Tim Bu Yati respon dalam 1 jam. Diskusi menu, lokasi, dan detail acara langsung via WhatsApp." },
  { num: "03", title: "Hari H, tinggal tunggu", icon: "🚚", desc: "Tim datang tepat waktu, setup lengkap, makanan disajikan panas. Anda fokus nikmati acara." },
];

export default function HowItWorks() {
  return (
    <section id="cara-pesan" style={{ background: "var(--bg-dark)", padding: "120px 28px", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "20%", right: "-10%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(var(--accent-rgb),0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <Reveal>
          <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
            · Cara pesan ·
          </div>
        </Reveal>
        <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 500, lineHeight: 1.05, marginBottom: 16, color: "var(--text-primary)", letterSpacing: "-0.025em", maxWidth: 900 }}>
          <SplitText text="3 langkah doang." stagger={60} />
          <br />
          <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
            <SplitText text="Makanan datang, acara lancar." stagger={50} delay={300} />
          </span>
        </h2>
        <Reveal delay={500}>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 520, marginBottom: 64 }}>
            Gak perlu telepon bolak-balik. Semua bisa dari website, dari rumah.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, position: "relative" }}>
          <div className="hidden-mobile" style={{
            position: "absolute", top: 80, left: "8%", right: "8%", height: 1,
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
            opacity: 0.3, pointerEvents: "none",
          }} />
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 140}>
              <TiltCard className="card" max={6} style={{ padding: 32, height: "100%", minHeight: 280, position: "relative" }}>
                <div className="font-display" style={{ color: "rgba(var(--accent-rgb),0.18)", fontSize: 96, fontWeight: 500, lineHeight: 1, marginBottom: -20, letterSpacing: "-0.04em" }}>
                  {s.num}
                </div>
                <div style={{ fontSize: 40, marginBottom: 20 }}>{s.icon}</div>
                <div style={{ color: "var(--text-primary)", fontSize: 20, fontWeight: 500, marginBottom: 10 }}>{s.title}</div>
                <div style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <div style={{ marginTop: 96, padding: "40px 0", borderTop: "1px solid var(--border-light)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32 }}>
          {statsData.map((s, i) => (
            <CountStat key={s.label} {...s} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
