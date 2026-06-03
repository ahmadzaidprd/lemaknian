import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Story from "@/components/sections/Story";
import Calculator from "@/components/sections/Calculator";
import Packages from "@/components/sections/Packages";
import MenuPreview from "@/components/sections/MenuPreview";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Lazy from "@/components/ui/Lazy";

export default function Home() {
  return (
    <>
      {/* Above-the-fold + dekat fold: render langsung (eager) */}
      <Hero variant="bigType" />
      <HowItWorks />
      <Story />
      <Calculator />

      {/* Below-the-fold: ditunda agar main-thread saat load lega.
          id ditaruh di wrapper supaya anchor link tetap jalan. */}
      <Lazy id="paket" minHeight={900}><Packages /></Lazy>
      <Lazy id="menu" minHeight={900}><MenuPreview /></Lazy>
      <Lazy id="galeri" minHeight={700}><Gallery /></Lazy>
      <Lazy id="testimoni" minHeight={800}><Testimonials /></Lazy>
      <Lazy minHeight={700}><FAQ /></Lazy>
      <Lazy minHeight={500}><CTA /></Lazy>
    </>
  );
}
