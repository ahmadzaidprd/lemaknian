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

export default function Home() {
  return (
    <>
      <Hero variant="bigType" />
      <HowItWorks />
      <Story />
      <Calculator />
      <Packages />
      <MenuPreview />
      <Gallery />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
