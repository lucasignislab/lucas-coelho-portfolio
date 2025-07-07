
import { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Web Designer | Especialista em Automação (n8n, Make) | UX/UI | Otimização de Processos Digitais';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-brand-light via-brand-light to-brand-sage"
    >
      {/* Parallax Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-dark rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-20 h-20 bg-brand-teal rounded-full animate-float animation-delay-200"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-brand-dark rounded-full animate-float animation-delay-400"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-brand-teal rounded-full animate-float animation-delay-600"></div>
      </div>

      <div className="container-custom mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="font-poppins font-bold text-5xl md:text-7xl lg:text-8xl text-brand-dark mb-6 text-shadow">
            LUCAS COELHO
          </h1>
          
          <div className="h-20 mb-8">
            <p className="font-inter text-lg md:text-xl lg:text-2xl text-brand-dark/90 leading-relaxed max-w-4xl mx-auto">
              {displayedText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <p className="font-inter text-lg md:text-xl text-brand-dark/80 mb-12 max-w-2xl mx-auto animate-fade-in animation-delay-400">
            Transformando ideias em experiências digitais impactantes e eficientes
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in animation-delay-600">
            <Button
              onClick={() => scrollToSection('#portfolio')}
              size="lg"
              className="bg-brand-dark text-brand-light hover:bg-brand-teal hover:text-brand-dark font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 glow-effect"
            >
              Ver Portfólio
            </Button>
            <Button
              onClick={() => scrollToSection('#contact')}
              variant="outline"
              size="lg"
              className="border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-light font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
            >
              Entrar em Contato
            </Button>
          </div>

          <div className="flex justify-center space-x-6 animate-fade-in animation-delay-800">
            <a
              href="mailto:lucascoelho.cps@gmail.com"
              className="p-3 bg-brand-dark/20 rounded-full hover:bg-brand-dark/30 transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-6 h-6 text-brand-dark" />
            </a>
            <a
              href="tel:+5519992492409"
              className="p-3 bg-brand-dark/20 rounded-full hover:bg-brand-dark/30 transition-all duration-300 hover:scale-110"
            >
              <Phone className="w-6 h-6 text-brand-dark" />
            </a>
            <a
              href="https://www.behance.net/lucascoelho30"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-brand-dark/20 rounded-full hover:bg-brand-dark/30 transition-all duration-300 hover:scale-110"
            >
              <ExternalLink className="w-6 h-6 text-brand-dark" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-brand-dark/70" />
      </div>
    </section>
  );
};

export default HeroSection;
