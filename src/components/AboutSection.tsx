
import { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
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
    <section ref={sectionRef} id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <h2 className="font-space font-bold text-4xl md:text-5xl text-gradient mb-8">
              SOBRE MIM
            </h2>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Olá! Sou <strong className="text-brand-blue">Lucas</strong>, um Web Designer apaixonado por transformar ideias em experiências digitais impactantes e eficientes. Com uma sólida formação em Design de Produtos Digitais (UX/UI) e Marketing Digital, minha expertise se estende à Gestão de Automações e Desenvolvimento de Chatbots com Inteligência Artificial, com proficiência em plataformas líderes como n8n e Make.
              </p>
              
              <p className="text-lg">
                Minha missão é criar soluções web que não apenas encantam visualmente, mas que também otimizam processos, geram resultados tangíveis e potencializam a eficiência das empresas. Mergulho de cabeça em cada projeto, da concepção de interfaces intuitivas (UI) à otimização para mecanismos de busca (SEO), sempre buscando a inovação e as últimas tendências do mercado para entregar soluções robustas e funcionais.
              </p>
              
              <p className="text-lg">
                Estou sempre aberto para trocar ideias, discutir projetos emocionantes e, quem sabe, criar algo incrível juntos!
              </p>
            </div>
          </div>

          <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="relative">
              <div className="w-full max-w-md mx-auto">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple p-1">
                  <div className="w-full h-full rounded-2xl bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-300"></div>
                      <p className="font-medium">Foto Profissional</p>
                      <p className="text-sm">Lucas Coelho</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-brand-cyan rounded-full animate-float opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-brand-purple rounded-full animate-float animation-delay-400 opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
