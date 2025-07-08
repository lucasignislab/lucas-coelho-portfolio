
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  fullDescription: string;
  technologies: string[];
  client: string;
  date: string;
  duration: string;
  challenge: string;
  solution: string;
  results: string[];
  gallery: string[];
}

const projectsData: Record<string, ProjectData> = {
  "landing-page-ecommerce": {
    id: "landing-page-ecommerce",
    title: "Landing Page E-commerce",
    description: "Design e desenvolvimento de landing page de alta conversão para e-commerce de moda",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    fullDescription: "Desenvolvimento completo de uma landing page otimizada para conversão, focada em vendas de produtos de moda feminina. O projeto incluiu pesquisa de usuário, análise de concorrência, wireframes, design visual e implementação técnica.",
    technologies: ["Figma", "WordPress", "Elementor", "CSS", "JavaScript", "Google Analytics"],
    client: "Boutique Fashion Store",
    date: "Março 2024",
    duration: "3 semanas",
    challenge: "Criar uma experiência de compra intuitiva que convertesse visitantes em clientes, com foco na apresentação dos produtos e facilidade de navegação.",
    solution: "Implementei um design limpo e moderno, com seções estratégicamente posicionadas para guiar o usuário através do funil de vendas, incluindo depoimentos, garantias e call-to-actions persuasivos.",
    results: [
      "Aumento de 45% na taxa de conversão",
      "Redução de 30% na taxa de rejeição",
      "Aumento de 60% no tempo médio de permanência na página",
      "Crescimento de 25% nas vendas online no primeiro mês"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
    ]
  },
  "sistema-automacao-crm": {
    id: "sistema-automacao-crm",
    title: "Sistema de Automação CRM",
    description: "Implementação de automação completa para gestão de leads e relacionamento com clientes",
    category: "Automação",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    fullDescription: "Desenvolvimento de sistema completo de automação para CRM, integrando múltiplas plataformas e criando fluxos automatizados para nutrição de leads e gestão de relacionamento com clientes.",
    technologies: ["n8n", "Make", "HubSpot", "Zapier", "API Integration", "Webhooks"],
    client: "Tech Solutions Inc.",
    date: "Junho 2024",
    duration: "4 semanas",
    challenge: "Automatizar processos manuais de vendas e marketing, criando um fluxo eficiente desde a captura de leads até o fechamento de negócios.",
    solution: "Criei uma arquitetura de automação robusta conectando formulários web, email marketing, CRM e ferramentas de comunicação, com triggers inteligentes e segmentação avançada.",
    results: [
      "Redução de 70% no tempo de resposta aos leads",
      "Aumento de 40% na taxa de qualificação de leads",
      "Economia de 20 horas semanais da equipe de vendas",
      "Crescimento de 35% na pipeline de vendas"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop"
    ]
  },
  "app-mobile-ui-ux": {
    id: "app-mobile-ui-ux",
    title: "App Mobile UI/UX",
    description: "Design de interface e experiência do usuário para aplicativo de finanças pessoais",
    category: "UX/UI Design",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=600&fit=crop",
    fullDescription: "Projeto completo de UX/UI para aplicativo mobile de controle financeiro pessoal, desde a pesquisa de usuário até o design final das interfaces e prototipagem interativa.",
    technologies: ["Figma", "Adobe XD", "Principle", "InVision", "User Research", "Prototyping"],
    client: "FinTech Startup",
    date: "Agosto 2024",
    duration: "6 semanas",
    challenge: "Criar uma interface intuitiva para gestão financeira que fosse acessível para usuários com diferentes níveis de conhecimento financeiro.",
    solution: "Desenvolvi um sistema de design consistente com hierarquia visual clara, utilizando cores e iconografia que facilitam a compreensão de informações complexas.",
    results: [
      "Aumento de 80% na satisfação do usuário (NPS)",
      "Redução de 50% nas dúvidas de suporte",
      "Crescimento de 65% no engajamento diário",
      "Melhoria de 40% na taxa de retenção de usuários"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=600&fit=crop"
    ]
  },
  "chatbot-inteligente": {
    id: "chatbot-inteligente",
    title: "Chatbot Inteligente",
    description: "Desenvolvimento de chatbot com IA para atendimento automatizado 24/7",
    category: "IA & Chatbots",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=600&fit=crop",
    fullDescription: "Criação de chatbot inteligente com processamento de linguagem natural para automatizar o atendimento ao cliente, capaz de resolver 80% das dúvidas comuns e encaminhar casos complexos para humanos.",
    technologies: ["DialogFlow", "OpenAI API", "Node.js", "Webhook", "Natural Language Processing", "Machine Learning"],
    client: "E-commerce Platform",
    date: "Setembro 2024",
    duration: "5 semanas",
    challenge: "Desenvolver um assistente virtual capaz de entender contexto e fornecer respostas precisas, mantendo um tom de voz consistente com a marca.",
    solution: "Implementei um sistema híbrido combinando regras pré-definidas com IA generativa, treinado com dados específicos da empresa e integrado aos sistemas existentes.",
    results: [
      "Redução de 60% no volume de tickets de suporte",
      "Disponibilidade 24/7 de atendimento",
      "Tempo médio de resposta de 2 segundos",
      "Satisfação do cliente de 92% nas interações"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop"
    ]
  },
  "identidade-visual-corporativa": {
    id: "identidade-visual-corporativa",
    title: "Identidade Visual Corporativa",
    description: "Criação completa de identidade visual para startup de tecnologia",
    category: "Design Gráfico",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=600&fit=crop",
    fullDescription: "Desenvolvimento completo de identidade visual corporativa, incluindo logotipo, paleta de cores, tipografia, papelaria e manual de marca para startup de tecnologia.",
    technologies: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "Figma", "Brand Strategy"],
    client: "TechStart Innovation",
    date: "Julho 2024",
    duration: "4 semanas",
    challenge: "Criar uma identidade visual que transmitisse inovação e confiabilidade, diferenciando a empresa em um mercado competitivo.",
    solution: "Desenvolvi uma identidade moderna e versátil, com elementos que remetem à tecnologia mas mantêm a acessibilidade e profissionalismo.",
    results: [
      "Aumento de 50% no reconhecimento da marca",
      "Melhoria de 40% na percepção de profissionalismo",
      "Crescimento de 30% em leads qualificados",
      "Implementação consistente em todos os pontos de contato"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop"
    ]
  },
  "dashboard-analytics": {
    id: "dashboard-analytics",
    title: "Dashboard Analytics",
    description: "Interface de dashboard para análise de dados e métricas de performance",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    fullDescription: "Design e desenvolvimento de dashboard interativo para visualização de dados complexos, permitindo análise em tempo real de métricas de negócio e KPIs importantes.",
    technologies: ["React", "D3.js", "Chart.js", "Figma", "Data Visualization", "Responsive Design"],
    client: "Analytics Corp",
    date: "Outubro 2024",
    duration: "5 semanas",
    challenge: "Transformar dados complexos em visualizações intuitivas que facilitassem a tomada de decisões estratégicas.",
    solution: "Criei um sistema de dashboard modular com diferentes tipos de gráficos, filtros avançados e drill-down capabilities para análise detalhada.",
    results: [
      "Redução de 70% no tempo de análise de dados",
      "Aumento de 85% na utilização de dados para decisões",
      "Melhoria de 60% na identificação de trends",
      "Interface 100% responsiva para acesso mobile"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
    ]
  }
};

const PortfolioProject = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectsData[id] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-tertiary mb-4">Projeto não encontrado</h1>
          <Link to="/" className="text-brand-accent hover:text-brand-secondary">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

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
              Voltar ao Portfólio
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-2 bg-brand-accent/20 text-brand-accent rounded-full text-sm font-medium mb-4">
                  {project.category}
                </span>
                <h1 className="font-poppins font-bold text-4xl md:text-5xl bg-gradient-to-r from-brand-accent via-brand-tertiary to-brand-secondary bg-clip-text text-transparent mb-6">
                  {project.title}
                </h1>
                <p className="text-brand-tertiary text-lg leading-relaxed mb-8">
                  {project.fullDescription}
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-brand-accent" />
                    <div>
                      <p className="text-sm text-brand-secondary">Cliente</p>
                      <p className="text-brand-tertiary font-medium">{project.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-brand-accent" />
                    <div>
                      <p className="text-sm text-brand-secondary">Data</p>
                      <p className="text-brand-tertiary font-medium">{project.date}</p>
                    </div>
                  </div>
                </div>
                
                <Button
                  asChild
                  className="bg-gradient-to-r from-brand-accent to-brand-secondary hover:from-brand-secondary hover:to-brand-accent"
                >
                  <a href="#" className="flex items-center space-x-2">
                    <span>Ver Projeto Online</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
              
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
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
              <div className="lg:col-span-2 space-y-12">
                {/* Challenge */}
                <div>
                  <h2 className="font-poppins font-bold text-2xl text-brand-tertiary mb-4">Desafio</h2>
                  <p className="text-brand-secondary leading-relaxed">{project.challenge}</p>
                </div>
                
                {/* Solution */}
                <div>
                  <h2 className="font-poppins font-bold text-2xl text-brand-tertiary mb-4">Solução</h2>
                  <p className="text-brand-secondary leading-relaxed">{project.solution}</p>
                </div>
                
                {/* Results */}
                <div>
                  <h2 className="font-poppins font-bold text-2xl text-brand-tertiary mb-4">Resultados</h2>
                  <ul className="space-y-3">
                    {project.results.map((result, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-brand-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-brand-secondary">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Gallery */}
                <div>
                  <h2 className="font-poppins font-bold text-2xl text-brand-tertiary mb-6">Galeria do Projeto</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {project.gallery.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${project.title} - Imagem ${index + 1}`}
                        className="w-full rounded-lg shadow-lg hover-lift"
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-8">
                {/* Project Info */}
                <div className="bg-brand-dark/50 backdrop-blur-sm rounded-xl p-6 border border-brand-secondary/20">
                  <h3 className="font-poppins font-bold text-xl text-brand-tertiary mb-4">Informações do Projeto</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-brand-secondary mb-1">Duração</p>
                      <p className="text-brand-tertiary font-medium">{project.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-brand-secondary mb-1">Categoria</p>
                      <span className="inline-block px-3 py-1 bg-brand-accent/20 text-brand-accent rounded-full text-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Technologies */}
                <div className="bg-brand-dark/50 backdrop-blur-sm rounded-xl p-6 border border-brand-secondary/20">
                  <h3 className="font-poppins font-bold text-xl text-brand-tertiary mb-4">Tecnologias Utilizadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-brand-secondary/20 text-brand-secondary rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* CTA */}
                <div className="bg-gradient-to-r from-brand-accent/20 to-brand-secondary/20 rounded-xl p-6 border border-brand-accent/30">
                  <h3 className="font-poppins font-bold text-lg text-brand-tertiary mb-3">
                    Gostou do projeto?
                  </h3>
                  <p className="text-brand-secondary text-sm mb-4">
                    Vamos conversar sobre como posso ajudar seu negócio.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-brand-accent to-brand-secondary hover:from-brand-secondary hover:to-brand-accent"
                  >
                    <Link to="/#contact">Entrar em Contato</Link>
                  </Button>
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
