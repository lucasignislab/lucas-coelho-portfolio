
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
    <section ref={sectionRef} id="contact" className="section-padding bg-gray-50">
      <div className="container-custom">
        <h2 className={`font-space font-bold text-4xl md:text-5xl text-center text-gradient mb-8 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          ENTRE EM CONTATO
        </h2>

        <p className={`text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto ${
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
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md hover-lift">
                <div className="w-12 h-12 bg-gradient-to-r from-brand-blue to-brand-purple rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <a href="mailto:lucascoelho.cps@gmail.com" className="text-brand-blue hover:text-brand-purple transition-colors duration-200">
                    lucascoelho.cps@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md hover-lift">
                <div className="w-12 h-12 bg-gradient-to-r from-brand-purple to-brand-indigo rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Telefone</h3>
                  <a href="tel:+5519992492409" className="text-brand-blue hover:text-brand-purple transition-colors duration-200">
                    +55 19 99249-2409
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md hover-lift">
                <div className="w-12 h-12 bg-gradient-to-r from-brand-indigo to-brand-cyan rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Localização</h3>
                  <p className="text-gray-600">Campinas, São Paulo, Brasil</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-space font-bold text-xl text-gray-800 mb-4">
                Vamos criar algo incrível?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Seja para um projeto de web design, automação de processos, ou desenvolvimento de chatbots com IA, estou pronto para transformar suas ideias em realidade digital.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${
            isVisible ? 'animate-slide-in-right animation-delay-600' : 'opacity-0'
          }`}>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Assunto
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  placeholder="Assunto da mensagem"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full"
                  placeholder="Conte-me mais sobre seu projeto..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-purple hover:to-brand-blue font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 glow-effect"
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Enviando...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>Enviar Mensagem</span>
                    <Send className="w-4 h-4" />
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
