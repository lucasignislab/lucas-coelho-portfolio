import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Send, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Mensagem enviada!",
      description: "Obrigado pelo contato. Retornarei em breve!",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section ref={sectionRef} id="contact" className="section-padding bg-brand-black">
      <div className="container-custom">
        <h2 className={`font-poppins font-bold text-4xl md:text-5xl text-center bg-gradient-to-r from-brand-accent via-brand-tertiary to-brand-secondary bg-clip-text text-transparent mb-8 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          ENTRE EM CONTATO
        </h2>

        <p className={`text-center text-brand-tertiary text-lg mb-16 max-w-2xl mx-auto ${
          isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'
        }`}>
          Vamos conversar sobre seu próximo projeto? Estou sempre aberto para discutir ideias inovadoras e criar soluções incríveis juntos!
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`space-y-8 ${
            isVisible ? 'animate-slide-in-left animation-delay-400' : 'opacity-0'
          }`}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 glass-card hover-lift">
                <div className="w-12 h-12 bg-gradient-to-r from-brand-accent to-brand-secondary rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-tertiary">Email</h3>
                  <a href="mailto:lucascoelho.cps@gmail.com" className="text-white hover:text-brand-secondary transition-colors duration-200">
                    lucascoelho.cps@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 glass-card hover-lift">
                <div className="w-12 h-12 bg-gradient-to-r from-brand-secondary to-brand-accent rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-tertiary">Telefone</h3>
                  <a href="tel:+5519992492409" className="text-white hover:text-brand-secondary transition-colors duration-200">
                    +55 19 99249-2409
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 glass-card hover-lift">
                <div className="w-12 h-12 bg-gradient-to-r from-brand-accent to-brand-tertiary rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-tertiary">Localização</h3>
                  <p className="text-white">Campinas, São Paulo, Brasil</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-poppins font-bold text-xl text-brand-tertiary mb-4">
                Vamos criar algo incrível?
              </h3>
              <p className="text-brand-secondary leading-relaxed">
                Seja para um projeto de web design, automação de processos, ou desenvolvimento de chatbots com IA, estou pronto para transformar suas ideias em realidade digital.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${
            isVisible ? 'animate-slide-in-right animation-delay-600' : 'opacity-0'
          }`}>
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-brand-tertiary mb-3">
                    Nome
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-brand-black/50 border-brand-secondary/40 text-brand-tertiary placeholder:text-brand-secondary/60 focus:border-brand-accent focus:ring-brand-accent/20 h-12 text-base"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-brand-tertiary mb-3">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-brand-black/50 border-brand-secondary/40 text-brand-tertiary placeholder:text-brand-secondary/60 focus:border-brand-accent focus:ring-brand-accent/20 h-12 text-base"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-brand-tertiary mb-3">
                  Assunto
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-brand-black/50 border-brand-secondary/40 text-brand-tertiary placeholder:text-brand-secondary/60 focus:border-brand-accent focus:ring-brand-accent/20 h-12 text-base"
                  placeholder="Assunto da mensagem"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-brand-tertiary mb-3">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full bg-brand-black/50 border-brand-secondary/40 text-brand-tertiary placeholder:text-brand-secondary/60 focus:border-brand-accent focus:ring-brand-accent/20 text-base leading-relaxed"
                  placeholder="Conte-me mais sobre seu projeto..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-brand-accent to-brand-secondary hover:from-brand-secondary hover:to-brand-accent font-semibold py-4 h-14 text-base rounded-lg transition-all duration-300 hover:scale-105 glow-effect shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Enviando...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>Enviar Mensagem</span>
                    <Send className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
