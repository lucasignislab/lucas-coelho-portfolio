import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation, Trans } from 'react-i18next';

interface ProjectStaticData {
  id: string;
  key: string;
  image: string;
  technologies: string[];
  gallery: string[];
  projectUrl?: string;
}

const projectsStaticData: Record<string, ProjectStaticData> = {
  "website-ignis-lab": {
    id: "website-ignis-lab",
    key: "aero",
    image: "/lovable-uploads/aero-project-cover.png",
    technologies: ["Figma", "React", "TypeScript", "Tailwind CSS", "Vite"],
    gallery: [
      "/lovable-uploads/bb70c7b1-34a0-4b05-949e-ad3aad34069d.png",
      "/lovable-uploads/7707975d-161a-42b0-a77c-0f974ab20166.png",
      "/lovable-uploads/789e90e8-4107-4733-94f6-ecaa3c14e450.png"
    ],
    projectUrl: "https://ignislab.com.br"
  },
  "sistema-automacao-crm": {
    id: "sistema-automacao-crm",
    key: "dai",
    image: "/lovable-uploads/dai-xavier-cover.png",
    technologies: ["React", "Tailwind CSS", "Figma", "WhatsApp API Integration", "SEO Optimization"],
    gallery: [
      "/lovable-uploads/dai-xavier-cover.png",
      "/lovable-uploads/dai-xavier-gallery-1.png",
      "/lovable-uploads/dai-xavier-gallery-2.png"
    ],
    projectUrl: "https://daixavier.netlify.app"
  },
  "saas-content-planner": {
    id: "saas-content-planner",
    key: "nova_era",
    image: "/lovable-uploads/nova-era-cover.png",
    technologies: ["React", "Tailwind CSS", "Vite", "SEO Optimization"],
    gallery: [
      "/lovable-uploads/nova-era-cover.png",
      "/lovable-uploads/nova-era-gallery-1.png",
      "/lovable-uploads/nova-era-gallery-2.png"
    ],
    projectUrl: "https://novaeratransportesvinhedo.com.br"
  },
  "chatbot-inteligente": {
    id: "chatbot-inteligente",
    key: "chatbot",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=600&fit=crop",
    technologies: ["DialogFlow", "OpenAI API", "Node.js", "Webhook", "NLP", "ML"],
    gallery: [
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop"
    ]
  },
  "dashboard-analytics": {
    id: "dashboard-analytics",
    key: "dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    technologies: ["React", "D3.js", "Chart.js", "Figma", "Data Vis", "Responsive Design"],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
    ]
  }
};

const PortfolioProject = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const staticData = id ? projectsStaticData[id] : null;

  if (!staticData) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-tertiary mb-4">{t('common.project_not_found', 'Projeto não encontrado')}</h1>
          <Link to="/" className="text-brand-accent hover:text-brand-secondary">
            {t('common.back_to_home', 'Voltar ao início')}
          </Link>
        </div>
      </div>
    );
  }

  const projectKey = `portfolio.projects.${staticData.key}`;

  return (
    <div className="min-h-screen bg-brand-black">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-brand-dark">
          <div className="container-custom">
            <Link
              to="/#portfolio"
              className="inline-flex items-center text-brand-accent hover:text-brand-secondary mb-8 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('common.back_to_portfolio', 'Voltar ao Portfólio')}
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-2 bg-brand-accent/20 text-brand-accent rounded-full text-sm font-medium mb-4">
                  {t(`${projectKey}.category`)}
                </span>
                <h1 className="font-poppins font-bold text-4xl md:text-5xl bg-gradient-to-r from-brand-accent via-brand-tertiary to-brand-secondary bg-clip-text text-transparent mb-6">
                  {t(`${projectKey}.title`)}
                </h1>
                <p className="text-brand-tertiary text-lg leading-relaxed mb-8">
                  {t(`${projectKey}.fullDescription`)}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-brand-accent" />
                    <div>
                      <p className="text-sm text-brand-secondary">{t('contact.form.client', 'Cliente')}</p>
                      <p className="text-brand-tertiary font-medium">{t(`${projectKey}.client`)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-brand-accent" />
                    <div>
                      <p className="text-sm text-brand-secondary">{t('common.date', 'Data')}</p>
                      <p className="text-brand-tertiary font-medium">{t(`${projectKey}.date`)}</p>
                    </div>
                  </div>
                </div>

                <Button
                  asChild
                  className="bg-gradient-to-r from-brand-accent to-brand-secondary hover:from-brand-secondary hover:to-brand-accent"
                >
                  <a href={staticData.projectUrl || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <span>{t('common.view_online', 'Ver Projeto Online')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>

              <div className="relative">
                <img
                  src={staticData.image}
                  alt={t(`${projectKey}.title`)}
                  className="w-full rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16 bg-brand-black">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-3 space-y-12">
                {/* Challenge */}
                <div>
                  <h2 className="font-poppins font-bold text-2xl text-brand-tertiary mb-4">{t(`${projectKey}.challengeTitle`, t('common.challenge', 'Desafio'))}</h2>
                  <div className="text-brand-secondary leading-relaxed">
                    <p>{t(`${projectKey}.challenge`)}</p>
                  </div>
                </div>

                {/* Solution */}
                <div>
                  <h2 className="font-poppins font-bold text-2xl text-brand-tertiary mb-4">{t(`${projectKey}.solutionTitle`, t('common.solution', 'Solução'))}</h2>
                  <p className="text-brand-secondary leading-relaxed">{t(`${projectKey}.solution`)}</p>
                </div>

                {/* Results */}
                <div>
                  <h2 className="font-poppins font-bold text-2xl text-brand-tertiary mb-4">{t('common.results', 'Resultados')}</h2>
                  <ul className="space-y-3">
                    {(t(`${projectKey}.results`, { returnObjects: true }) as string[]).map((result, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-brand-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-brand-secondary">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gallery - Bento Grid */}
                <div>
                  <h2 className="font-poppins font-bold text-2xl text-brand-tertiary mb-6">{t('common.gallery', 'Galeria do Projeto')}</h2>
                  <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[500px]">
                    {/* Primeira imagem - ocupa 2 colunas */}
                    <div className="col-span-2 row-span-2 relative overflow-hidden rounded-xl bg-brand-dark/30 border border-brand-secondary/20 hover-lift">
                      <img
                        src={staticData.gallery[0] || staticData.image}
                        alt={`${t(`${projectKey}.title`)} - 1`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Segunda imagem - canto superior direito */}
                    <div className="col-span-2 row-span-1 relative overflow-hidden rounded-xl bg-brand-dark/30 border border-brand-secondary/20 hover-lift">
                      <img
                        src={staticData.gallery[1] || staticData.image}
                        alt={`${t(`${projectKey}.title`)} - 2`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Terceira imagem - canto inferior direito */}
                    <div className="col-span-2 row-span-1 relative overflow-hidden rounded-xl bg-brand-dark/30 border border-brand-secondary/20 hover-lift">
                      <img
                        src={staticData.gallery[2] || staticData.image}
                        alt={`${t(`${projectKey}.title`)} - 3`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioProject;
