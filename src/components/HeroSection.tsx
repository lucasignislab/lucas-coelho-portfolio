import { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Vortex } from './ui/vortex';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const [displayedText, setDisplayedText] = useState('');
  const fullText = t('hero.role');

  useEffect(() => {
    setDisplayedText(''); // Reset text when language changes
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
  }, [fullText, i18n.language]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden"
    >
      <Vortex
        backgroundColor="#000000"
        baseHue={260}
        particleCount={300}
        rangeSpeed={1}
        baseRadius={1}
        rangeRadius={1.5}
        className="flex items-center justify-center min-h-screen"
      >
        <div className="container-custom mx-auto px-4 text-center">
          <div>
            <h1 className="font-poppins font-bold text-5xl md:text-7xl lg:text-8xl text-brand-tertiary mb-6 text-shadow">
              {t('hero.greeting')}
            </h1>
            <div className="h-20 mb-8">
              <p className="font-inter text-lg md:text-xl lg:text-2xl text-brand-accent leading-relaxed max-w-4xl mx-auto font-semibold typewriter">
                {displayedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
            <p className="font-inter text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto font-semibold drop-shadow-lg shadow-black">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={() => scrollToSection('#portfolio')}
                size="lg"
                className="bg-brand-tertiary text-brand-dark hover:bg-brand-accent hover:text-brand-tertiary font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 glow-effect"
              >
                {t('hero.cta_portfolio')}
              </Button>
              <Button
                onClick={() => scrollToSection('#contact')}
                variant="outline"
                size="lg"
                className="border-2 border-brand-tertiary text-brand-tertiary hover:bg-brand-tertiary hover:text-brand-dark font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              >
                {t('hero.cta_contact')}
              </Button>
            </div>
            <div className="flex justify-center space-x-8">
              <a
                href="mailto:lucascoelho.cps@gmail.com"
                className="w-20 h-20 flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-dark to-brand-accent shadow-lg hover:scale-110 transition-all duration-300"
              >
                <Mail className="w-10 h-10 text-white" />
              </a>
              <a
                href="tel:+5519992492409"
                className="w-20 h-20 flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-dark to-brand-accent shadow-lg hover:scale-110 transition-all duration-300"
              >
                <Phone className="w-10 h-10 text-white" />
              </a>
            </div>
          </div>
        </div>
      </Vortex>
    </section>
  );
};

export default HeroSection;
