import Link from "next/link";
import { paketData, formatRupiah, waLink } from "@/lib/utils";

export const metadata = { title: "Paket Catering — Bu Yati Catering Bengkulu" };

export default function PaketPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[#4a3a28] text-xs uppercase tracking-widest mb-3">Paket layanan</div>
          <h1 className="text-4xl md:text-5xl font-medium text-[#f5efe6] mb-4 leading-tight">
            Semua acara ada <span className="text-[#e8c87a]">paketnya.</span>
          </h1>
          <p className="text-[#5a4a38] text-sm max-w-md mx-auto">
            Harga transparan, kualitas terjaga. Dari arisan kecil sampai resepsi besar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-7">
          {paketData.map((p) => (
            <div
              key={p.id}
              className={`relative bg-[#1a1510] rounded-2xl p-8 flex flex-col card-hover transition-all ${
                p.popular ? "border-2 border-[#e8c87a]" : "border border-[#2a2218]"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-8 bg-[#e8c87a] text-[#0d0a06] text-xs font-semibold px-4 py-1 rounded-full">
                  Terlaris
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-[#f5efe6] text-xl font-medium mb-1">Paket {p.nama}</h2>
                  <div className="text-[#e8c87a] text-base">{formatRupiah(p.harga_per_pax)}/pax</div>
                </div>
                <div className="text-[#3a2a18] text-sm bg-[#141008] px-3 py-1.5 rounded-full border border-[#1e1810]">
                  Min. {p.min_pax} pax
                </div>
              </div>
              <p className="text-[#5a4a38] text-sm leading-relaxed mb-6">{p.deskripsi}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {p.fitur.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#6a5a48]">
                    <span className="text-[#e8c87a] flex-shrink-0 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <a
                  href={waLink(`Halo Bu Yati, saya tertarik dengan Paket ${p.nama}. Bisa info lebih lanjut?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 text-center text-sm font-medium py-3 rounded-full transition-colors ${
                    p.popular
                      ? "bg-[#e8c87a] text-[#0d0a06] hover:bg-[#f0d48a]"
                      : "bg-[#1e1a08] text-[#e8c87a] border border-[#2a2218] hover:bg-[#2a2218]"
                  }`}
                >
                  Konsultasi Paket Ini
                </a>
                <Link
                  href="/booking"
                  className="px-5 text-sm text-[#5a4a38] border border-[#2a2218] rounded-full hover:border-[#3a3228] hover:text-[#8a7a65] transition-colors flex items-center"
                >
                  Booking
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
