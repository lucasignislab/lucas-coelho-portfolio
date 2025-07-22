import { Mail, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VortexDemo from '@/components/ui/vortex-demo';

const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-brand-black"
    >
      <VortexDemo />
      <div className="container-custom mx-auto px-4 text-center relative z-10 mt-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:lucascoelho.cps@gmail.com"
              className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-dark to-brand-accent shadow-lg hover:scale-110 transition-all duration-300"
            >
              <Mail className="w-7 h-7 text-white drop-shadow-md" />
            </a>
            <a
              href="tel:+5519992492409"
              className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-dark to-brand-accent shadow-lg hover:scale-110 transition-all duration-300"
            >
              <Phone className="w-7 h-7 text-white drop-shadow-md" />
            </a>
            <a
              href="https://www.behance.net/lucascoelho30"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-dark to-brand-accent shadow-lg hover:scale-110 transition-all duration-300"
            >
              <ExternalLink className="w-7 h-7 text-white drop-shadow-md" />
            </a>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => scrollToSection('#portfolio')}
              className="bg-[oklch(70.9%_0.01_56.259)] text-white hover:bg-[oklch(70.9%_0.01_56.259/0.9)] transition-all duration-300"
            >
              Ver Portfólio
            </Button>
            <Button
              onClick={() => scrollToSection('#contact')}
              variant="outline"
              className="border-[oklch(70.9%_0.01_56.259)] text-[oklch(70.9%_0.01_56.259)] hover:bg-[oklch(70.9%_0.01_56.259/0.1)] transition-all duration-300"
            >
              Entrar em Contato
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
