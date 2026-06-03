"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Menunda render + hidrasi section sampai mendekati viewport.
// Tujuan: kurangi kerja main-thread saat load awal (penyebab NO_LCP & TBT
// tinggi di CPU mobile). rootMargin besar (600px) → section sudah ter-mount
// SEBELUM masuk layar, jadi tidak ada layout shift (CLS tetap ~0).
// `id` ditaruh di wrapper agar anchor link (#paket, #menu, dll) tetap bekerja
// walau section belum ter-mount.
export default function Lazy({
  children,
  id,
  minHeight = 600,
}: {
  children: ReactNode;
  id?: string;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} id={id} style={show ? undefined : { minHeight }}>
      {show ? children : null}
    </div>
  );
}
