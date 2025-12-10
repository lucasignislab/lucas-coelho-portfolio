
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {
    ArrowRight,
    ArrowLeft,
    Layers,
    Zap,
    Command,
    Layout,
    Code,
    CheckCircle,
    User,
    Keyboard,
    MousePointer2,
    Maximize2,
    Terminal,
    Palette,
    Eye,
    Menu,
    X
} from 'lucide-react';

// --- Reusable Components ---

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => {
    return (
        <section id={id} className={`py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
            {children}
        </section>
    );
};

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' }> = ({ children, delay = 0, direction = 'up' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const directionOffset = direction === 'up' ? { y: 40 } : direction === 'left' ? { x: 40 } : { x: -40 };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...directionOffset }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
};

const Kbd: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <kbd className="px-2 py-1 text-xs font-mono text-aero-text bg-aero-surface border border-white/10 rounded-md shadow-sm mx-1 inline-flex items-center">
        {children}
    </kbd>
);

const Badge: React.FC<{ children: React.ReactNode; color?: 'blue' | 'purple' | 'red' }> = ({ children, color = 'blue' }) => {
    const colors = {
        blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        red: 'bg-red-500/10 text-red-400 border-red-500/20',
    };
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colors[color]} mb-4`}>
            {children}
        </span>
    );
};

const WindowFrame: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title = "AERO - Dashboard" }) => (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0A0B0E] shadow-2xl">
        <div className="bg-aero-surface/50 border-b border-white/5 p-3 flex items-center gap-4">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <div className="flex-1 text-center text-xs font-mono text-white/30">{title}</div>
            <div className="w-10" />
        </div>
        <div className="p-1 relative">
            {children}
        </div>
    </div>
);

// --- Main App Component ---

const AeroCaseStudy: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);

    // Simulation of Command+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsCommandMenuOpen((open) => !open);
            }
        }
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <div className="min-h-screen bg-aero-bg text-aero-text font-sans selection:bg-aero-brand selection:text-white overflow-x-hidden">

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-aero-brand origin-left z-50"
                style={{ scaleX }}
            />

            {/* Floating Header */}
            <header className="fixed top-6 left-0 right-0 z-40 px-6 pointer-events-none">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link
                            to="/#portfolio"
                            className="pointer-events-auto backdrop-blur-md bg-aero-surface/80 hover:bg-aero-surface border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 text-aero-text transition-colors"
                        >
                            <ArrowLeft size={14} />
                            <span className="font-mono text-sm font-bold tracking-tight">Voltar ao Portfólio</span>
                        </Link>
                    </motion.div>
                    <motion.button
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="pointer-events-auto backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        Download PRD <ArrowRight size={14} />
                    </motion.button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-aero-brand/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

                <div className="max-w-5xl mx-auto text-center relative z-10">


                    <FadeIn delay={0.1}>
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                            Planejamento na<br />
                            Velocidade do Pensamento
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <p className="text-xl md:text-2xl text-aero-muted max-w-2xl mx-auto leading-relaxed mb-10">
                            Como projetei e desenvolvi um ecossistema de gestão de projetos <span className="text-aero-text font-medium">keyboard-first</span> focado em eliminar a fricção entre a ideia e a execução.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-mono text-aero-muted">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5">
                                <User size={16} />
                                <span>Product Designer & Full Stack Dev</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5">
                                <Keyboard size={16} />
                                <span>2 Meses de Desenvolvimento</span>
                            </div>
                        </div>
                    </FadeIn>
                </div>


            </section>

            {/* The Challenge */}
            <Section className="relative">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <FadeIn direction='right'>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">O Desafio</h2>
                        <div className="space-y-6 text-lg text-aero-muted">
                            <p>
                                <strong className="text-white">"Por que o mundo precisa de mais um gerenciador de projetos?"</strong>
                            </p>
                            <p>
                                Essa foi a pergunta que guiou o início do AERO. Notei um padrão frustrante nas ferramentas de mercado:
                                elas são lentas, inchadas e exigem muitos cliques para ações simples.
                            </p>
                            <p>
                                Para equipes de alta performance, cada segundo de carregamento e cada troca de contexto (mouse vs. teclado)
                                é uma quebra no "Estado de Fluxo".
                            </p>

                            <div className="pt-6">
                                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                                    <Zap className="text-yellow-400" size={20} /> Minha Missão
                                </h3>
                                <p className="pl-7 border-l-2 border-white/10">
                                    Criar não apenas uma ferramenta, mas um "Sistema Operacional" para o trabalho,
                                    onde a interface desaparece e resta apenas a execução.
                                </p>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn direction='left' delay={0.2}>
                        <div className="bg-aero-surface border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-32 bg-aero-brand/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-aero-brand/10 transition-colors" />
                            <div className="relative z-10 grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <div className="text-4xl font-bold text-white">2</div>
                                    <div className="text-sm text-aero-muted font-mono">Meses de Projeto</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-4xl font-bold text-white">4</div>
                                    <div className="text-sm text-aero-muted font-mono">Papéis Atuados</div>
                                </div>
                                <div className="col-span-2 pt-6 border-t border-white/5">
                                    <div className="text-sm text-aero-muted mb-2 font-mono uppercase tracking-wider">Atuação End-to-End</div>
                                    <div className="flex flex-wrap gap-2">
                                        {['Product Strategy', 'UX Research', 'UI Design', 'React/Tailwind'].map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white border border-white/10">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </Section>

            {/* Discovery */}
            <Section className="bg-gradient-to-b from-transparent to-aero-surface/30 rounded-3xl">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Imersão e Descoberta</h2>
                        <p className="text-aero-muted">
                            Para definir o produto, mapeei as necessidades das duas personas críticas em times de software,
                            identificando seus modelos mentais e dores latentes.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Persona 1 */}
                    <FadeIn delay={0.1}>
                        <div className="bg-[#0A0B0E] p-8 rounded-2xl border border-white/5 hover:border-aero-brand/30 transition-colors h-full">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-xl font-bold">O</div>
                                <div>
                                    <h3 className="text-xl font-bold">Odair</h3>
                                    <p className="text-sm text-aero-muted font-mono">O Desenvolvedor "Hacker"</p>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <div className="mt-1 p-1 bg-red-500/10 rounded text-red-400"><X size={14} /></div>
                                    <p className="text-sm text-aero-muted"><span className="text-white font-medium">Dor:</span> Odeia tirar a mão do teclado. Sente que formulários visuais são lentos.</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="mt-1 p-1 bg-green-500/10 rounded text-green-400"><CheckCircle size={14} /></div>
                                    <p className="text-sm text-aero-muted"><span className="text-white font-medium">Necessidade:</span> Velocidade instantânea (&lt;100ms), atalhos globais e modo escuro.</p>
                                </li>
                            </ul>
                        </div>
                    </FadeIn>

                    {/* Persona 2 */}
                    <FadeIn delay={0.2}>
                        <div className="bg-[#0A0B0E] p-8 rounded-2xl border border-white/5 hover:border-aero-brand/30 transition-colors h-full">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-xl font-bold">M</div>
                                <div>
                                    <h3 className="text-xl font-bold">Mariana</h3>
                                    <p className="text-sm text-aero-muted font-mono">A Gerente de Produto (PM)</p>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <div className="mt-1 p-1 bg-red-500/10 rounded text-red-400"><X size={14} /></div>
                                    <p className="text-sm text-aero-muted"><span className="text-white font-medium">Dor:</span> Perde o contexto macro ao mergulhar nos detalhes de uma tarefa.</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="mt-1 p-1 bg-green-500/10 rounded text-green-400"><CheckCircle size={14} /></div>
                                    <p className="text-sm text-aero-muted"><span className="text-white font-medium">Necessidade:</span> Visão sistêmica (Kanban) sem perder a capacidade de documentar especificações complexas.</p>
                                </li>
                            </ul>
                        </div>
                    </FadeIn>
                </div>

                <FadeIn delay={0.3}>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        {[
                            { title: 'Fricção Zero', desc: 'Ideia -> Registro < 1s' },
                            { title: 'Densidade Útil', desc: 'Informação > Espaço em branco' },
                            { title: 'Keyboard-First', desc: 'Mouse é secundário' }
                        ].map((principle, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-white/5 border border-white/5">
                                <h4 className="font-bold text-lg text-white mb-2">{principle.title}</h4>
                                <p className="text-sm text-aero-muted font-mono">{principle.desc}</p>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </Section>

            {/* Solution / UX */}
            <Section>
                <div className="mb-16">
                    <Badge color="purple">The Blueprint</Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">Solução de Design & UX</h2>
                </div>

                {/* Command Menu Feature */}
                <div className="grid lg:grid-cols-12 gap-12 items-center mb-24">
                    <div className="lg:col-span-5 order-2 lg:order-1">
                        <FadeIn>
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Command className="text-aero-brand" /> Command Menu
                            </h3>
                            <p className="text-aero-muted mb-6">
                                O desafio era unir gestão de tarefas (estruturada) com documentação (livre).
                                Criei uma navegação onde o menu atua como um "teletransporte".
                                O usuário não navega hierarquicamente; ele salta diretamente para onde precisa.
                            </p>
                            <div className="flex items-center gap-4 text-sm text-aero-muted bg-aero-surface p-4 rounded-lg border border-white/5">
                                <span>Try pressing:</span>
                                <div className="flex gap-1">
                                    <Kbd>Cmd</Kbd> + <Kbd>K</Kbd>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <FadeIn delay={0.2} direction="right">
                            <WindowFrame title="AERO - Global Search">
                                <div className="aspect-[4/3] bg-[#0A0B0E] p-8 flex items-center justify-center relative">
                                    {/* Abstract Command Menu UI */}
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        className="w-full max-w-md bg-aero-surface border border-white/20 rounded-xl shadow-2xl overflow-hidden"
                                    >
                                        <div className="p-4 border-b border-white/10 flex items-center gap-3">
                                            <Command size={18} className="text-aero-muted" />
                                            <span className="text-aero-muted">Type a command or search...</span>
                                            <span className="ml-auto text-xs bg-white/10 px-2 py-1 rounded text-aero-muted">ESC</span>
                                        </div>
                                        <div className="p-2 space-y-1">
                                            <div className="flex items-center gap-3 p-3 bg-aero-brand/10 text-aero-brand rounded-lg border border-aero-brand/20">
                                                <Zap size={16} />
                                                <span className="font-medium">Create New Issue</span>
                                                <span className="ml-auto text-xs font-mono opacity-70">C</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 text-aero-muted hover:bg-white/5 rounded-lg">
                                                <Layout size={16} />
                                                <span>Go to Board</span>
                                                <span className="ml-auto text-xs font-mono opacity-70">G B</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </WindowFrame>
                        </FadeIn>
                    </div>
                </div>

                {/* Design Decisions: Drawer vs Page */}
                <div className="grid lg:grid-cols-2 gap-12 mb-24">
                    <FadeIn>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold">O Dilema do Contexto</h3>
                            <div className="flex gap-4 p-4 bg-red-500/5 border border-red-500/10 rounded-lg">
                                <Maximize2 className="text-red-400 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-red-200 text-sm mb-1">Problema (Página Nova)</h4>
                                    <p className="text-xs text-red-200/70">Ao clicar em um card, ir para uma nova página fazia o usuário perder a noção do "todo" (o Sprint).</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 bg-green-500/5 border border-green-500/10 rounded-lg">
                                <Layout className="text-green-400 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-green-200 text-sm mb-1">Solução (Drawer Lateral)</h4>
                                    <p className="text-xs text-green-200/70">Implementei um Drawer. O PM pode ler a spec à direita enquanto ainda visualiza o gargalo da coluna "In Progress" à esquerda.</p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        {/* Visualizing the Drawer Concept */}
                        <div className="relative aspect-video bg-[#0A0B0E] rounded-xl border border-white/10 overflow-hidden flex">
                            {/* Background Board */}
                            <div className="flex-1 p-4 grid grid-cols-3 gap-4 opacity-50">
                                {[1, 2, 3].map(col => (
                                    <div key={col} className="bg-white/5 rounded-lg h-full p-2 space-y-2">
                                        <div className="h-4 w-20 bg-white/10 rounded mb-4" />
                                        {[1, 2].map(card => (
                                            <div key={card} className="h-20 bg-aero-surface rounded border border-white/5" />
                                        ))}
                                    </div>
                                ))}
                            </div>
                            {/* Drawer Overlay */}
                            <motion.div
                                initial={{ x: "100%" }}
                                whileInView={{ x: 0 }}
                                transition={{ type: "spring", bounce: 0, duration: 0.8 }}
                                className="absolute right-0 top-0 bottom-0 w-2/3 bg-aero-surface border-l border-white/10 shadow-2xl p-6"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="h-6 w-3/4 bg-white/10 rounded animate-pulse" />
                                    <div className="h-6 w-6 bg-white/5 rounded" />
                                </div>
                                <div className="space-y-4">
                                    <div className="h-32 bg-black/20 rounded border border-white/5" />
                                    <div className="h-4 w-1/2 bg-white/5 rounded" />
                                    <div className="h-4 w-1/3 bg-white/5 rounded" />
                                </div>
                            </motion.div>
                        </div>
                    </FadeIn>
                </div>

                {/* Color Palette */}
                <FadeIn>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Palette size={20} /> Semântica Visual</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-6 rounded-xl bg-aero-surface border border-white/10 flex flex-col justify-between h-32">
                            <span className="text-xs font-mono text-aero-muted">Surface</span>
                            <span className="font-mono">#24262F</span>
                        </div>
                        <div className="p-6 rounded-xl bg-[#101115] border border-white/10 flex flex-col justify-between h-32">
                            <span className="text-xs font-mono text-aero-muted">Background</span>
                            <span className="font-mono">#101115</span>
                        </div>
                        <div className="p-6 rounded-xl bg-[#388cfa] flex flex-col justify-between h-32 text-white">
                            <span className="text-xs font-mono opacity-80">Action / Brand</span>
                            <span className="font-mono">#388cfa</span>
                        </div>
                        <div className="p-6 rounded-xl bg-[#911756] flex flex-col justify-between h-32 text-white">
                            <span className="text-xs font-mono opacity-80">Destructive</span>
                            <span className="font-mono">#911756</span>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-aero-muted max-w-2xl">
                        Ferramentas coloridas demais competem pela atenção. No AERO, a cor é usada apenas para sinalização.
                        Isso reduz a carga cognitiva, permitindo que o cérebro ignore o que é estrutura e foque no conteúdo.
                    </p>
                </FadeIn>
            </Section>

            {/* Engineering */}
            <Section className="bg-[#050505] border-y border-white/5">
                <div className="grid lg:grid-cols-2 gap-16">
                    <FadeIn>
                        <Badge color="blue">High Fidelity</Badge>
                        <h2 className="text-3xl font-bold mt-4 mb-6">Engenharia & Implementação</h2>
                        <p className="text-aero-muted mb-8">
                            Como "Product Engineer", não parei no protótipo. Levei o AERO para a produção usando uma stack moderna.
                        </p>

                        <div className="space-y-8">
                            <div>
                                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                                    <Terminal size={18} /> Tech Stack
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {['React 18', 'TypeScript', 'Tailwind CSS', 'Tiptap', 'Framer Motion'].map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-[#1A1C24] text-xs font-mono text-blue-300 border border-blue-500/20 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                                    <Code size={18} /> Desafio: Bubble Menu
                                </h4>
                                <p className="text-sm text-aero-muted mb-4">
                                    Implementar o menu flutuante no editor de texto. Calculei coordenadas relativas
                                    à seleção de texto do usuário para renderizar o menu contextualmente.
                                </p>
                                {/* Simulated Code Block */}
                                <div className="bg-[#101115] p-4 rounded-lg border border-white/5 font-mono text-xs overflow-x-auto">
                                    <div className="text-gray-500">// Calculating bubble menu position</div>
                                    <div className="text-purple-400">const</div> <div className="text-blue-300 inline">getBubblePos</div> = (selection) <span className="text-purple-400">=&gt;</span> {'{'}
                                    <div className="pl-4">
                                        <span className="text-purple-400">const</span> {'{'} from, to {'}'} = selection;
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-purple-400">const</span> start = view.coordsAtPos(from);
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-purple-400">const</span> end = view.coordsAtPos(to);
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-purple-400">return</span> {'{'}
                                        left: (start.left + end.left) / 2,
                                        top: start.top - 40
                                        {'}'};
                                    </div>
                                    {'}'}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                                    <Eye size={18} /> Acessibilidade (A11y)
                                </h4>
                                <p className="text-sm text-aero-muted">
                                    Garanti Focus Rings visíveis e contraste WCAG AAA (Ratio 13.6:1) para texto (`#f5f5f5` sobre `#1D1F26`).
                                </p>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3} direction="left">
                        <div className="h-full flex flex-col gap-6">
                            {/* Visual Representation of Editor */}
                            <WindowFrame title="AERO - Rich Text Editor">
                                <div className="bg-[#1D1F26] p-8 min-h-[400px] font-sans text-[#f5f5f5] leading-relaxed relative selection:bg-aero-brand/30">
                                    <h1 className="text-3xl font-bold mb-4">Q3 Product Roadmap</h1>
                                    <p className="mb-4 text-white/80">
                                        Focar na redução de latência é a nossa prioridade número um. <span className="bg-aero-brand/20 text-blue-200 px-1 rounded relative">Precisamos otimizar
                                            {/* Bubble Menu Mockup */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black border border-white/20 rounded shadow-xl flex items-center p-1 gap-1 whitespace-nowrap z-20"
                                            >
                                                <div className="p-1 hover:bg-white/10 rounded cursor-pointer"><span className="font-bold px-1">B</span></div>
                                                <div className="p-1 hover:bg-white/10 rounded cursor-pointer"><span className="italic px-1 font-serif">I</span></div>
                                                <div className="w-px h-4 bg-white/20 mx-1"></div>
                                                <div className="p-1 hover:bg-white/10 rounded cursor-pointer text-xs">Link</div>
                                            </motion.div>
                                        </span> o banco de dados.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2 text-white/80">
                                        <li>Implementar caching layer</li>
                                        <li>Refatorar queries do Dashboard</li>
                                    </ul>
                                </div>
                            </WindowFrame>

                            <div className="p-6 bg-[#1A1C24] rounded-xl border border-white/5 flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-aero-muted uppercase tracking-wider mb-1">Contrast Ratio</div>
                                    <div className="text-2xl font-bold font-mono text-green-400">13.6 : 1</div>
                                    <div className="text-xs text-green-400/70">WCAG AAA Pass</div>
                                </div>
                                <div className="text-4xl font-bold text-white/10">Aa</div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </Section>

            {/* Results */}
            <Section className="mb-20">
                <div className="max-w-4xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Resultados e Aprendizados</h2>

                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            <div className="bg-aero-surface p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                                <div className="text-4xl mb-4">📄</div>
                                <h3 className="text-xl font-bold mb-3">Documentação é Vida</h3>
                                <p className="text-aero-muted text-sm leading-relaxed">
                                    Criar o PRD e o Design System antes de codar economizou semanas de refatoração.
                                    A clareza do "o que construir" permitiu que o "como construir" fluísse.
                                </p>
                            </div>
                            <div className="bg-aero-surface p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                                <div className="text-4xl mb-4">🪄</div>
                                <h3 className="text-xl font-bold mb-3">Complexidade do Simples</h3>
                                <p className="text-aero-muted text-sm leading-relaxed">
                                    Fazer um input de texto parecer "simples" e "mágico" exige uma engenharia complexa de
                                    <i>states</i> e <i>events</i> por trás. A simplicidade é a sofisticação final.
                                </p>
                            </div>
                        </div>

                        <div className="text-center p-12 bg-gradient-to-r from-aero-brand/10 to-purple-500/10 rounded-3xl border border-white/10">
                            <p className="text-lg md:text-xl font-medium mb-8">
                                "O AERO é a prova de que ferramentas de trabalho não precisam ser chatas ou lentas."
                            </p>
                            <Link to="/#portfolio" className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 inline-block">
                                Ver próximo projeto
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </Section>

            {/* Footer */}


            {/* Command Menu Modal Overlay (Functional Mockup) */}
            {isCommandMenuOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsCommandMenuOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="w-full max-w-lg bg-[#141419] border border-white/10 rounded-xl shadow-2xl overflow-hidden relative z-10"
                    >
                        <div className="p-4 border-b border-white/10 flex items-center gap-3">
                            <Command className="text-aero-muted w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Type a command..."
                                className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-600"
                                autoFocus
                            />
                            <div className="flex gap-1">
                                <button onClick={() => setIsCommandMenuOpen(false)} className="p-1 hover:bg-white/10 rounded">
                                    <X size={16} className="text-gray-500" />
                                </button>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="px-3 py-2 text-xs font-mono text-gray-500 uppercase">Suggestions</div>
                            <div className="flex items-center gap-3 p-3 hover:bg-aero-brand/20 rounded-lg cursor-pointer text-white group">
                                <Layout size={18} className="text-gray-400 group-hover:text-aero-brand" />
                                <span>Go to Dashboard</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 hover:bg-aero-brand/20 rounded-lg cursor-pointer text-white group">
                                <Palette size={18} className="text-gray-400 group-hover:text-aero-brand" />
                                <span>Change Theme</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 hover:bg-aero-brand/20 rounded-lg cursor-pointer text-white group">
                                <User size={18} className="text-gray-400 group-hover:text-aero-brand" />
                                <span>Contact Me</span>
                            </div>
                        </div>
                        <div className="bg-white/5 p-2 text-center text-xs text-gray-500 border-t border-white/5">
                            <span className="font-mono">Open Command Menu</span> <Kbd>Cmd</Kbd> <Kbd>K</Kbd>
                        </div>
                    </motion.div>
                </div>
            )}

        </div>
    );
};

export default AeroCaseStudy;
