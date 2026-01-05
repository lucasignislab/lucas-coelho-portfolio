
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.portfolio'), href: '#portfolio' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="font-space font-bold text-2xl text-gradient">
              Lucas Coelho
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:lucascoelho.cps@gmail.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-brand-blue transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="tel:+5519992492409"
                className="p-2 bg-gray-800 rounded-full hover:bg-brand-purple transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://www.behance.net/lucascoelho30"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-brand-indigo transition-colors duration-300"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-space font-semibold text-lg">{t('footer.nav_title')}</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-space font-semibold text-lg">{t('footer.contact_title')}</h4>
            <div className="space-y-2 text-gray-300">
              <p>
                <a
                  href="mailto:lucascoelho.cps@gmail.com"
                  className="hover:text-white transition-colors duration-200"
                >
                  lucascoelho.cps@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+5519992492409"
                  className="hover:text-white transition-colors duration-200"
                >
                  +55 19 99249-2409
                </a>
              </p>
              <p>{t('contact.info.location_value')}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            {t('footer.copyright', { year: currentYear })}
            <br />
            {t('footer.made_with')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
