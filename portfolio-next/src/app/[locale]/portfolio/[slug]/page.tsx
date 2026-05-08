import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const projectData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  liveUrl?: string;
}> = {
  aero: {
    title: "AERO",
    subtitle: "Product Design & Full Stack Development",
    description: "Um ecossistema de gestão de projetos keyboard-first focado em eliminar a fricção entre a ideia e a execução.",
    challenge: "Criar uma ferramenta que não fosse apenas mais um gerenciador de projetos, mas um 'Sistema Operacional' para o trabalho, onde a interface desaparece e resta apenas a execução.",
    solution: "Design limpo e moderno com navegação por command menu, drawer lateral para manter contexto, e semântica visual que reduz carga cognitiva.",
    results: [
      "Interface keyboard-first com atalhos globais",
      "Drawer lateral para manter contexto visual",
      "Command menu para navegação instantânea",
      "Design system completo documentado",
    ],
    liveUrl: "https://aeroprojectmanager.netlify.app",
  },
  "dai-xavier": {
    title: "Dra. Dai Xavier",
    subtitle: "Web Design & Landing Page",
    description: "Landing page premium para clínica de harmonização facial, focada em converter visitantes em pacientes.",
    challenge: "Criar uma landing page que fugisse do visual genérico de clínicas, transmitindo autoridade e refinamento técnico mantendo uma abordagem acolhedora.",
    solution: "Design exclusivo com neurodesign e psicologia das cores, fluxo de conversão otimizado desde o primeiro impacto até o agendamento via WhatsApp.",
    results: [
      "Aumento de 50% na taxa de agendamentos online",
      "100% de pontuação no Lighthouse mobile",
      "Redução de dúvidas recorrentes de pacientes",
      "Fortalecimento da marca pessoal premium",
    ],
    liveUrl: "https://daixavier.netlify.app",
  },
  "nova-era": {
    title: "Nova Era Transportes",
    subtitle: "Web Design & Institucional",
    description: "Website institucional estratégico para empresa de logística e fretamento com quase 30 anos de tradição.",
    challenge: "Digitalizar uma empresa tradicional, criando uma ponte entre sua história sólida e as expectativas do mercado corporativo moderno.",
    solution: "Plataforma focada em usabilidade e performance, com arquitetura de informação que destaca diferenciais da frota e funil de conversão direto para WhatsApp.",
    results: [
      "Aumento significativo em leads corporativos",
      "Redução no tempo de resposta para orçamentos",
      "100% de responsividade em dispositivos móveis",
      "Melhoria no rankeamento orgânico regional",
    ],
    liveUrl: "https://novaeratransportesvinhedo.com.br",
  },
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectData[slug];

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container-custom mx-auto px-4">
        {/* Back link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-slate hover:text-parchment transition-colors duration-300 mb-12"
        >
          <ArrowLeft size={18} />
          <span>Voltar ao portfólio</span>
        </Link>

        {/* Hero */}
        <div className="mb-16">
          <span className="text-sm text-ember tracking-widest uppercase font-medium">
            {project.subtitle}
          </span>
          <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl font-bold text-parchment tracking-tight">
            {project.title}
          </h1>
          <p className="mt-6 text-xl text-slate max-w-3xl leading-relaxed">
            {project.description}
          </p>
          
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-ember text-parchment font-semibold rounded-full hover:bg-ember/90 transition-colors duration-300"
            >
              <ExternalLink size={18} />
              Ver projeto online
            </a>
          )}
        </div>

        {/* Project Image Placeholder */}
        <div className="aspect-video rounded-2xl bg-gradient-to-br from-slate/10 to-terracotta/5 border border-slate/10 mb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-slate/10 flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-parchment/30">{project.title[0]}</span>
            </div>
            <p className="text-sm text-slate/60">Preview em breve</p>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold text-parchment mb-4">O Desafio</h2>
            <p className="text-slate leading-relaxed">{project.challenge}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-parchment mb-4">A Solução</h2>
            <p className="text-slate leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Results */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-parchment mb-6">Resultados</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.results.map((result, index) => (
              <div
                key={index}
                className="p-6 rounded-xl glass-card"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-ember">{index + 1}</span>
                  </div>
                  <p className="text-parchment/90">{result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
