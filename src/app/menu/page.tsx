"use client";
import { useState } from "react";
import { menuData, formatRupiah } from "@/lib/utils";

const kategoriList = ["Semua", "lauk", "sayur", "nasi", "dessert", "minuman", "snack"] as const;
type Kategori = typeof kategoriList[number];

export default function MenuPage() {
  const [aktif, setAktif] = useState<Kategori>("Semua");
  const filtered = aktif === "Semua" ? menuData : menuData.filter((m) => m.kategori === aktif);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[#4a3a28] text-xs uppercase tracking-widest mb-3">Menu kami</div>
          <h1 className="text-4xl md:text-5xl font-medium text-[#f5efe6] mb-4 leading-tight">
            Cita rasa Bengkulu,{" "}
            <span className="text-[#e8c87a]">dimasak dengan hati.</span>
          </h1>
          <p className="text-[#5a4a38] text-sm max-w-md mx-auto">
            Resep turun-temurun, bahan segar tiap hari. Ini yang bikin pelanggan balik terus.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {kategoriList.map((k) => (
            <button
              key={k}
              onClick={() => setAktif(k)}
              className={`text-sm px-5 py-2 rounded-full border transition-all duration-200 capitalize ${
                aktif === k
                  ? "bg-[#e8c87a] text-[#0d0a06] border-[#e8c87a] font-medium"
                  : "border-[#2a2218] text-[#5a4a38] hover:border-[#3a3228] hover:text-[#8a7a65]"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[#1a1510] border border-[#2a2218] rounded-2xl overflow-hidden card-hover group"
            >
              <div className="h-28 bg-[#1e1a08] flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
                {item.emoji}
              </div>
              <div className="p-5">
                <div className="text-[#c4b498] font-medium mb-1">{item.nama}</div>
                <div className="text-[#e8c87a] text-sm mb-3">{formatRupiah(item.harga)}/porsi</div>
                <p className="text-[#3a2a18] text-xs leading-relaxed">{item.deskripsi}</p>
                <div className="mt-3 inline-block bg-[#141008] text-[#4a3a28] text-xs px-3 py-1 rounded-full capitalize border border-[#1e1810]">
                  {item.kategori}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
