import { useEffect, useRef, useState } from 'react';
import { Building2, Calendar } from 'lucide-react';
import { Timeline } from '@/components/ui/timeline';
import { useTranslation } from 'react-i18next';

const ExperienceSection = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    { key: 'ignis' },
    { key: 'creis' },
    { key: 'full_cycle' },
    { key: 'freelancer' }
  ];

  const timelineData = experiences.map((exp) => ({
    title: t(`experience.items.${exp.key}.period`),
    content: (
      <div className="glass-card p-6 hover-lift mb-8">
        <span className="inline-block px-7 py-3 bg-gradient-to-r from-brand-accent to-brand-secondary text-white rounded-full text-lg font-bold mb-3">
          {t(`experience.items.${exp.key}.role`)}
        </span>
        <h4 className="font-semibold text-lg text-brand-tertiary mb-2">
          {t(`experience.items.${exp.key}.company`)}
        </h4>
        <div className="flex items-center text-brand-secondary mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{t(`experience.items.${exp.key}.period`)}</span>
        </div>
        <p className="text-sm text-brand-secondary/80 mb-4">{t(`experience.items.${exp.key}.location`)}</p>

        <ul className="space-y-2">
          {(t(`experience.items.${exp.key}.desc`, { returnObjects: true }) as string[]).map((desc, descIndex) => (
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
        <h2 className={`font-poppins font-bold text-4xl md:text-5xl text-center bg-gradient-to-r from-brand-accent via-brand-tertiary to-brand-secondary bg-clip-text text-transparent mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}>
          {t('experience.title')}
        </h2>

        <div className={`${isVisible ? 'animate-slide-in-down animation-delay-400' : 'opacity-0'}`}>
          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
