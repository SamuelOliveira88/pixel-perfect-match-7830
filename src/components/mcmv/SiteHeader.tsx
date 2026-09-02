import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ZONAS, zap } from "@/data/empreendimentos";
import { onClickWhatsApp } from "@/lib/leadWebhook";

const msgZap = "Olá, visitei o site da Villar Imóveis e quero fazer uma simulação grátis.";

export function SiteHeader() {
  const [aberto, setAberto] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const naHome = pathname === "/";
  const linkZap = zap(msgZap);

  const irParaZona = (zona: string) => {
    setAberto(false);
    if (!naHome) {
      window.location.href = `/#imoveis`;
      return;
    }
    window.dispatchEvent(new CustomEvent("mcmv:zona", { detail: zona }));
    document.getElementById("imoveis")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="shrink-0 text-xl leading-tight font-extrabold tracking-tight text-primary">
          Villar
          <span className="block text-[10px] font-semibold tracking-[0.25em] text-accent-dark">IMÓVEIS</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {(["Todos", ...ZONAS] as const).map((z) => (
            <button
              key={z}
              type="button"
              onClick={() => irParaZona(z)}
              className="rounded-full px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
            >
              {z === "Todos" ? "Empreendimentos" : z}
            </button>
          ))}
          <Link
            to="/sobre"
            className="rounded-full px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
          >
            Sobre
          </Link>
          <a
            href="#contato"
            className="rounded-full px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
          >
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={linkZap}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClickWhatsApp(linkZap, "Header - SIMULAÇÃO GRATUITA")}
            className="btn-base hidden bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:bg-primary-dark sm:inline-flex"
          >
            SIMULAÇÃO GRATUITA
          </a>
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={aberto}
            onClick={() => setAberto((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full border border-border text-primary lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        </div>
      </div>

      {aberto && (
        <div className="border-t border-border bg-card px-5 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {(["Todos", ...ZONAS] as const).map((z) => (
              <button
                key={z}
                type="button"
                onClick={() => irParaZona(z)}
                className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-foreground/80 hover:bg-secondary"
              >
                {z === "Todos" ? "Empreendimentos" : z}
              </button>
            ))}
            <Link
              to="/sobre"
              onClick={() => setAberto(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary"
            >
              Sobre
            </Link>
            <a
              href="#contato"
              onClick={() => setAberto(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary"
            >
              Contato
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
