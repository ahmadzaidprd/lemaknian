"use client";

import { useEffect, useState } from "react";
import { liveOrders } from "@/lib/data";

export default function LiveTicker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 2500);
    const iv = setInterval(() => setIdx((i) => (i + 1) % liveOrders.length), 4500);
    return () => { clearTimeout(t1); clearInterval(iv); };
  }, []);

  if (closed) return null;
  const o = liveOrders[idx];

  return (
    <div className={`ticker-card ${visible ? "" : "hidden"}`}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#7ec87a", boxShadow: "0 0 0 4px rgba(126,200,122,0.18)",
            animation: "waPulse 1.6s ease-in-out infinite",
          }} />
          <span style={{ color: "var(--text-secondary)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", fontWeight: 500 }}>
            Pesanan baru masuk
          </span>
        </div>
        <button onClick={() => setClosed(true)} aria-label="close"
          style={{ background: "none", border: 0, color: "var(--text-muted)", cursor: "pointer", padding: 4, fontSize: 14, lineHeight: 1 }}>✕</button>
      </div>
      <div key={`${o.nama}${idx}`} style={{ animation: "fadeUpTicker 0.5s cubic-bezier(0.22,1,0.36,1)" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
          <span style={{ color: "var(--text-primary)", fontSize: 14, fontWeight: 500 }}>{o.nama}</span>
          <span style={{ color: "var(--text-muted)", fontSize: 12 }}>· {o.kota}</span>
        </div>
        <div style={{ color: "var(--text-secondary)", fontSize: 13, marginBottom: 8 }}>
          Booking paket <span style={{ color: "var(--accent)" }}>{o.paket}</span> · {o.pax} pax
        </div>
        <div style={{ color: "var(--text-faint)", fontSize: 11 }}>{o.ago}</div>
      </div>
      <style jsx>{`
        @keyframes fadeUpTicker {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
