import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { ProcessSection } from "@/sections/ProcessSection";
import { PortfolioSection } from "@/sections/PortfolioSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { ContactSection } from "@/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProcessSection />
      <PortfolioSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
