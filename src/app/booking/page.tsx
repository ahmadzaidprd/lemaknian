"use client";
import { useState } from "react";
import { paketData, waLink } from "@/lib/utils";

export default function BookingPage() {
  const [form, setForm] = useState({
    nama: "", wa: "", email: "", jenis_acara: "", jumlah_tamu: "",
    tanggal: "", lokasi: "", paket: "", catatan: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pesan = `Halo Bu Yati! Saya ingin booking catering.

*Data Pemesanan:*
Nama: ${form.nama}
WhatsApp: ${form.wa}
Jenis Acara: ${form.jenis_acara}
Jumlah Tamu: ${form.jumlah_tamu} orang
Tanggal: ${form.tanggal}
Lokasi: ${form.lokasi}
Paket: ${form.paket}
${form.catatan ? `Catatan: ${form.catatan}` : ""}

Mohon konfirmasi ketersediaan. Terima kasih!`;
    window.open(waLink(pesan), "_blank");
  };

  const inputClass = "input-gold";
  const labelClass = "block text-[#5a4a38] text-xs mb-2";

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[#4a3a28] text-xs uppercase tracking-widest mb-3">Booking</div>
          <h1 className="text-4xl font-medium text-[#f5efe6] mb-3">
            Yuk, <span className="text-[#e8c87a]">pesan sekarang.</span>
          </h1>
          <p className="text-[#5a4a38] text-sm">
            Isi form di bawah, tim Bu Yati akan menghubungi dalam 1 jam.
          </p>
        </div>

        <div className="bg-[#1a1510] border border-[#2a2218] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Nama lengkap *</label>
                <input name="nama" value={form.nama} onChange={handleChange} required placeholder="Nama Anda" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>No. WhatsApp *</label>
                <input name="wa" value={form.wa} onChange={handleChange} required placeholder="08xx-xxxx-xxxx" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Email (opsional)</label>
              <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="email@contoh.com" className={inputClass} />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Jenis acara *</label>
                <select name="jenis_acara" value={form.jenis_acara} onChange={handleChange} required className={inputClass}>
                  <option value="">Pilih jenis acara</option>
                  <option>Pernikahan / Resepsi</option>
                  <option>Hajatan / Khitanan</option>
                  <option>Rapat / Seminar</option>
                  <option>Arisan / Syukuran</option>
                  <option>Ulang Tahun</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Jumlah tamu *</label>
                <input name="jumlah_tamu" value={form.jumlah_tamu} onChange={handleChange} required type="number" placeholder="cth: 200" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Tanggal acara *</label>
                <input name="tanggal" value={form.tanggal} onChange={handleChange} required type="date" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Pilih paket *</label>
                <select name="paket" value={form.paket} onChange={handleChange} required className={inputClass}>
                  <option value="">Pilih paket</option>
                  {paketData.map((p) => (
                    <option key={p.id} value={p.nama}>
                      Paket {p.nama} — Rp {p.harga_per_pax.toLocaleString("id-ID")}/pax
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Lokasi acara *</label>
              <input name="lokasi" value={form.lokasi} onChange={handleChange} required placeholder="Nama gedung / kecamatan / kota" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Catatan tambahan</label>
              <textarea name="catatan" value={form.catatan} onChange={handleChange} rows={3} placeholder="Menu khusus, permintaan tertentu, dll..." className={`${inputClass} resize-none`} />
            </div>

            <button type="submit" className="w-full bg-[#e8c87a] text-[#0d0a06] font-semibold py-4 rounded-full hover:bg-[#f0d48a] transition-colors text-sm mt-2">
              Kirim via WhatsApp — Respon 1 Jam
            </button>
            <p className="text-center text-[#2a2018] text-xs">
              Data kamu aman. Tidak ada spam, tidak ada kewajiban pesan.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
