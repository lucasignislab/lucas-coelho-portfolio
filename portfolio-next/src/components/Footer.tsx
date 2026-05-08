"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate/10 bg-void">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <Link
            href="/"
            className="font-[family-name:var(--font-sora)] font-bold text-xl text-parchment hover:text-ember transition-colors duration-300"
          >
            Lucas Coelho
          </Link>

          {/* Copyright */}
          <p className="text-sm text-slate/50">
            {t("copyright", { year })}
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-slate hover:text-parchment transition-colors duration-300"
          >
            <span>{t("back_to_top")}</span>
            <span className="p-2 rounded-full border border-slate/20 group-hover:border-ember/50 transition-all duration-300">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
