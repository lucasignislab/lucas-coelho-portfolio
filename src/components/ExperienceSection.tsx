import { useEffect, useRef, useState } from 'react';
import { Building2, Calendar } from 'lucide-react';
import { Timeline } from '@/components/ui/timeline';

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

const experiences: Experience[] = [
  {
    title: "Web Designer e Gestor de Automações",
    company: "Agência Ignis Lab",
    period: "Nov de 2024 - Atual",
    location: "Remoto",
    description: [
      "Desenvolvimento e otimização de interfaces e experiências digitais, com foco em UI/UX Design, utilizando Figma, Webflow, Framer e Lovable.dev para criar sites e  landing pages de alta conversão.",
      "Implementação e gestão de soluções de automação de processos com ferramentas como n8n e Make, e desenvolvimento de chatbots com Inteligência Artificial, resultando na otimização do atendimento ao cliente e fluxos de trabalho.",
      "Aplicação de estratégias de Otimização para Mecanismos de Busca (SEO) para aumentar a visibilidade e o tráfego orgânico dos projetos web.",
      "Colaboração em equipe multidisciplinar para entregar soluções web completas, integrando design, funcionalidade e automação alinhados aos objetivos de negócio."
    ]
  },
  {
    title: "Web Designer & Especialista em Automação",
    company: "Creis Consultoria",
    period: "Mai de 2024 – Set de 2024",
    location: "Campinas, São Paulo, Brasil",
    description: [
      "Desenvolvimento e otimização de interfaces e experiências digitais, com foco em UI/UX Design, utilizando Figma e WordPress (Elementor) para criar landing pages de alta conversão.",
      "Implementação e gestão de soluções de automação de processos com ferramentas como n8n e Make, e desenvolvimento de chatbots com Inteligência Artificial, resultando na otimização do atendimento ao cliente e fluxos de trabalho.",
      "Aplicação de estratégias de Otimização para Mecanismos de Busca (SEO) para aumentar a visibilidade e o tráfego orgânico dos projetos web.",
      "Colaboração em equipe multidisciplinar para entregar soluções web completas, integrando design, funcionalidade e automação alinhados aos objetivos de negócio."
    ]
  },
  {
    title: "Designer",
    company: "Full Cycle",
    period: "Maio de 2022 – Julho de 2023",
    location: "Campinas, São Paulo, Brasil",
    description: [
      "Atuação como Designer Gráfico e Motion Designer, desenvolvendo artes para redes sociais e edição de vídeos para diversas campanhas.",
      "Colaboração em projetos de UX/UI Design, contribuindo para a criação de interfaces mais intuitivas e com melhor experiência do usuário.",
      "Utilização de softwares como Adobe Photoshop, After Effects e Figma na criação e edição de peças visuais."
    ]
  },
  {
    title: "Designer Freelancer",
    company: "Freelancer",
    period: "Janeiro de 2015 – Março de 2022",
    location: "Remota",
    description: [
      "Gestão de portfólio de clientes, desenvolvendo projetos de design gráfico e motion design, incluindo ilustrações e edição de vídeos para redes sociais.",
      "Garantia da qualidade e satisfação do cliente, gerenciando projetos desde o briefing inicial até a entrega final."
    ]
  }
];

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const timelineData = experiences.map((exp) => ({
    title: exp.period,
    content: (
      <div className="glass-card p-6 hover-lift mb-8">
        <span className="inline-block px-7 py-3 bg-gradient-to-r from-brand-accent to-brand-secondary text-white rounded-full text-lg font-bold mb-3">
          {exp.title}
        </span>
        <h4 className="font-semibold text-lg text-brand-tertiary mb-2">
          {exp.company}
        </h4>
        <div className="flex items-center text-brand-secondary mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{exp.period}</span>
        </div>
        <p className="text-sm text-brand-secondary/80 mb-4">{exp.location}</p>
        
        <ul className="space-y-2">
          {exp.description.map((desc, descIndex) => (
            <li key={descIndex} className="text-brand-tertiary text-sm leading-relaxed flex items-start">
              <span className="w-2 h-2 bg-brand-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {desc}
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <section ref={sectionRef} id="experience" className="section-padding relative overflow-hidden" style={{ backgroundColor: '#18181b' }}>
      <div className="container-custom relative z-10">
        <h2 className={`font-poppins font-bold text-4xl md:text-5xl text-center bg-gradient-to-r from-brand-accent via-brand-tertiary to-brand-secondary bg-clip-text text-transparent mb-16 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          EXPERIÊNCIA PROFISSIONAL
        </h2>

        <div className={`${isVisible ? 'animate-slide-in-down animation-delay-400' : 'opacity-0'}`}>
          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
