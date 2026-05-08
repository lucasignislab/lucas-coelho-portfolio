import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    slug: "aero",
    title: "AERO",
    subtitle: "Product Design",
    description: "Sistema de gestão de projetos keyboard-first focado em eliminar a fricção entre ideia e execução.",
    gradient: "from-ember/20 to-ember/5",
  },
  {
    slug: "dai-xavier",
    title: "Dra. Dai Xavier",
    subtitle: "Web Design",
    description: "Landing page premium para clínica de harmonização facial, focada em conversão e experiência do usuário.",
    gradient: "from-terracotta/20 to-terracotta/5",
  },
  {
    slug: "nova-era",
    title: "Nova Era Transportes",
    subtitle: "Web Design",
    description: "Website institucional moderno para empresa de logística e fretamento com 30 anos de tradição.",
    gradient: "from-slate/20 to-slate/5",
  },
];

export default function PortfolioPage() {
  const t = useTranslations("portfolio");

  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container-custom mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-parchment tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-slate max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}` as any}
              className="group relative block"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br border border-slate/10 transition-all duration-500 group-hover:border-ember/30 group-hover:scale-[1.02]">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`} />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-slate tracking-wider uppercase">
                      {project.subtitle}
                    </span>
                    <div className="p-2 rounded-full bg-parchment/5 border border-parchment/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <ArrowUpRight size={16} className="text-parchment" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-parchment mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-ember/5 to-transparent" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
