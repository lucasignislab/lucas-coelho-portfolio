import { useEffect, useRef, useState } from 'react';
import { BackgroundBeams } from './ui/background-beams';
import { useTranslation, Trans } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding bg-black relative overflow-hidden">
      {/* Background Beams */}
      <BackgroundBeams />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <h2 className="font-poppins font-bold text-4xl md:text-5xl bg-gradient-to-r from-brand-accent via-brand-tertiary to-brand-secondary bg-clip-text text-transparent mb-8">
              {t('about.title')}
            </h2>

            <div className="space-y-6 text-brand-tertiary leading-relaxed">
              <p className="text-lg">
                <Trans i18nKey="about.p1">
                  Olá! Sou <strong className="text-brand-accent">Lucas</strong>, um Web Designer apaixonado por transformar ideias em experiências digitais impactantes e eficientes. Com graduação em <strong className="text-brand-accent">Design Gráfico</strong>, pós-graduação em <strong className="text-brand-accent">Design UX/UI</strong> e um <strong className="text-brand-accent">MBA em Marketing Digital</strong>, minha expertise se estende à Gestão de Automações e Desenvolvimento de Chatbots com Inteligência Artificial, com proficiência em plataformas líderes como n8n e Make.
                </Trans>
              </p>

              <p className="text-lg">
                <Trans i18nKey="about.p2">
                  Minha missão é criar soluções web que não apenas encantam visualmente, mas que também otimizam processos, geram resultados tangíveis e potencializam a eficiência das empresas. Mergulho de cabeça em cada projeto, da concepção de interfaces intuitivas (UI) à otimização para mecanismos de busca (SEO), sempre buscando a inovação e as últimas tendências do mercado para entregar soluções robustas e funcionais.
                </Trans>
              </p>

              <p className="text-lg">
                {t('about.p3')}
              </p>
            </div>
          </div>

          <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="relative">
              <div className="w-full max-w-sm mx-auto">
                <div className="aspect-square rounded-full bg-gradient-to-br from-brand-accent to-brand-secondary p-2">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src="/lovable-uploads/eu2.png"
                      alt="Lucas Coelho - Web Designer"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-brand-accent rounded-full animate-float opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-brand-secondary rounded-full animate-float animation-delay-400 opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
