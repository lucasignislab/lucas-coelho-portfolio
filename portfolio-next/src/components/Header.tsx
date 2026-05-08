"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { Link, routing } from "@/i18n/routing";
import { Menu, X } from "lucide-react";

export function Header() {
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { label: "Work", href: "#portfolio" },
    { label: "About", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 50);

    if (currentScrollY < lastScrollY || currentScrollY < 100) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    const path = window.location.pathname.replace(`/${locale}`, `/${newLocale}`);
    window.location.href = path || `/${newLocale}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        ${isScrolled ? "bg-void/90 backdrop-blur-xl" : "bg-transparent"}
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-[family-name:var(--font-sora)] font-bold text-lg tracking-tight text-parchment hover:text-ember transition-colors duration-300"
        >
          Lucas Coelho
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-slate hover:text-parchment transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}

          {/* Language */}
          <div className="flex items-center gap-2 pl-6 border-l border-slate/20">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`text-xs uppercase tracking-wider transition-colors duration-300
                  ${locale === loc ? "text-ember font-semibold" : "text-slate/50 hover:text-slate"}
                `}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-parchment"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-void/95 backdrop-blur-xl border-t border-slate/10 transition-all duration-500 overflow-hidden
          ${isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block py-3 text-lg text-parchment/80 hover:text-parchment border-b border-slate/5"
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-4">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`px-3 py-1.5 text-sm uppercase tracking-wider rounded-md transition-colors
                  ${locale === loc ? "text-ember font-semibold" : "text-slate"}
                `}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
