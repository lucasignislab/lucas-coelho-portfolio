
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';

const flags = {
    pt: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 480" className="w-6 h-4">
            <rect width="720" height="480" fill="#009c3b" />
            <polygon points="360,60 684,240 360,420 36,240" fill="#ffdf00" />
            <circle cx="360" cy="240" r="126" fill="#002776" />
            <path d="M320,240 A126,126 0 0 1 650,240" fill="none" stroke="#fff" strokeWidth="20" />
        </svg>
    ),
    en: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1235 650" className="w-6 h-4">
            <rect width="1235" height="650" fill="#b22234" />
            <path d="M0,0H1235V50H0zM0,100H1235V150H0zM0,200H1235V250H0zM0,300H1235V350H0zM0,400H1235V450H0zM0,500H1235V550H0zM0,600H1235V650H0z" fill="#fff" />
            <rect width="1235" height="650" fill="#b22234" mask="url(#us-stripes)" />
            <rect width="494" height="350" fill="#3c3b6e" />
        </svg>
    ),
    es: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" className="w-6 h-4">
            <rect width="750" height="500" fill="#c60b1e" />
            <rect y="125" width="750" height="250" fill="#ffc400" />
        </svg>
    ),
    de: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="w-6 h-4">
            <rect width="5" height="3" y="0" x="0" fill="#000" />
            <rect width="5" height="2" y="1" x="0" fill="#d00" />
            <rect width="5" height="1" y="2" x="0" fill="#ffce00" />
        </svg>
    )
};

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const getShortLang = (lng: string) => lng.split('-')[0].toLowerCase();
    const currentLang = getShortLang(i18n.language);
    const currentFlag = flags[currentLang as keyof typeof flags] || flags['pt'];

    return (
        <div
            ref={containerRef}
            className="relative ml-4 z-50"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {currentFlag}
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 bg-brand-black border border-white/10 rounded-xl shadow-xl overflow-hidden min-w-[150px]">
                    <div className="py-2">
                        {[
                            { code: 'pt', label: 'Português', flag: flags.pt },
                            { code: 'en', label: 'English', flag: flags.en },
                            { code: 'es', label: 'Español', flag: flags.es },
                            { code: 'de', label: 'Deutsch', flag: flags.de }
                        ].map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-white/5 transition-colors cursor-pointer ${currentLang === lang.code ? 'text-brand-accent' : 'text-brand-text'
                                    }`}
                            >
                                <div className="w-5">{lang.flag}</div>
                                <span className="text-sm font-medium">{lang.label}</span>
                                {currentLang === lang.code && <Check size={14} className="ml-auto" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
