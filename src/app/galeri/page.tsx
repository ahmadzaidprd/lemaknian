"use client";
import { useState } from "react";
import { galeriData } from "@/lib/utils";

const kategori = ["Semua", "pernikahan", "hajatan", "korporat", "personal"] as const;
type Kat = typeof kategori[number];

export default function GaleriPage() {
  const [aktif, setAktif] = useState<Kat>("Semua");
  const filtered = aktif === "Semua" ? galeriData : galeriData.filter((g) => g.kategori === aktif);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[#4a3a28] text-xs uppercase tracking-widest mb-3">Galeri event</div>
          <h1 className="text-4xl md:text-5xl font-medium text-[#f5efe6] mb-4">
            Bukti nyata, <span className="text-[#e8c87a]">bukan sekadar janji.</span>
          </h1>
          <p className="text-[#5a4a38] text-sm max-w-md mx-auto">
            1.200+ acara sukses. Dari pernikahan mewah hingga hajatan sederhana yang penuh kehangatan.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {kategori.map((k) => (
            <button
              key={k}
              onClick={() => setAktif(k)}
              className={`text-sm px-5 py-2 rounded-full border transition-all capitalize ${
                aktif === k
                  ? "bg-[#e8c87a] text-[#0d0a06] border-[#e8c87a] font-medium"
                  : "border-[#2a2218] text-[#5a4a38] hover:border-[#3a3228]"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div key={item.id} className="bg-[#1a1510] border border-[#2a2218] rounded-2xl overflow-hidden card-hover group">
              <div className="h-48 bg-[#1e1a08] flex items-center justify-center text-7xl group-hover:scale-105 transition-transform duration-500">
                {item.emoji}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[#d4c4a8] font-medium">{item.judul}</h3>
                  <span className="bg-[#141008] text-[#4a3a28] text-xs px-2.5 py-1 rounded-full border border-[#1e1810] capitalize flex-shrink-0 ml-2">
                    {item.kategori}
                  </span>
                </div>
                <p className="text-[#4a3a28] text-sm leading-relaxed mb-4">{item.deskripsi}</p>
                <div className="flex items-center gap-4 text-xs text-[#3a2a18]">
                  <span>👥 {item.pax} pax</span>
                  <span>📍 {item.lokasi}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
