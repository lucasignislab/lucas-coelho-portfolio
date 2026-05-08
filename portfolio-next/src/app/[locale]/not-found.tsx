"use client";

import { Link } from "@/i18n/routing";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center pt-32">
      <div className="text-center">
        <div className="inline-flex p-6 rounded-2xl bg-ember/10 border border-ember/20 mb-8">
          <AlertTriangle size={48} className="text-ember" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-parchment mb-4">
          404
        </h1>
        <p className="text-xl text-slate mb-8">
          Página não encontrada
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ember text-parchment font-semibold rounded-full hover:bg-ember/90 transition-colors duration-300"
        >
          <Home size={18} />
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
