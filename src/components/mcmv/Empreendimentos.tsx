import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { empreendimentos, nomeExibicao, slugify, zap, ZONAS, type Empreendimento, type Zona } from "@/data/empreendimentos";
import { onClickWhatsApp } from "@/lib/leadWebhook";


function Card({ emp, abrir }: { emp: Empreendimento; abrir: (foto: number) => void }) {
  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-[18px] bg-card shadow-[0_10px_30px_rgba(0,0,0,.08)] transition-transform hover:-translate-y-1.5 ${
        emp.destaque ? "border-[3px] border-accent shadow-[0_12px_34px_rgba(40,80,180,.35)]" : ""
      }`}
    >
      {emp.destaque && (
        <span className="absolute top-3.5 left-3.5 z-2 rounded-full bg-accent px-3.5 py-1.5 text-xs font-extrabold text-accent-foreground">
          ⭐ Destaque
        </span>
      )}
      <img
        src={emp.fotos[0]}
        alt={nomeExibicao(emp.nome)}
        width={1024}
        height={768}
        loading="lazy"
        decoding="async"
        onClick={() => abrir(0)}
        className="h-55 w-full cursor-pointer object-cover"
      />
      <div className="flex gap-1.5 overflow-x-auto bg-secondary px-3 py-2">
        {emp.fotos.slice(1).map((f, i) => (
          <img
            key={f + i}
            src={f}
            alt={`${nomeExibicao(emp.nome)} - foto ${i + 2}`}
            width={104}
            height={104}
            loading="lazy"
            decoding="async"
            onClick={() => abrir(i + 1)}
            className="size-13 shrink-0 cursor-pointer rounded-lg border-2 border-transparent object-cover hover:border-primary"
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col px-5 pt-5 pb-6">
        <h3 className="text-xl font-bold text-primary">{nomeExibicao(emp.nome)}</h3>
        <div className="mb-1 font-extrabold text-accent-dark">Minha Casa Minha Vida · HIS</div>
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/70">{emp.zona}</div>
        <ul className="mb-5 flex-1 space-y-1">
          {emp.itens.map((i) => (
            <li key={i} className="relative pl-6 text-sm text-muted-foreground">
              <span className="absolute left-0 font-extrabold text-accent"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
              {i}
            </li>
          ))}
        </ul>
        <Link
          className="btn-base mb-2.5 w-full border-2 border-primary bg-card text-primary hover:bg-primary hover:text-primary-foreground"
          to="/empreendimento/$slug"
          params={{ slug: slugify(emp.nome) }}
        >
          VER BOOK COMPLETO
        </Link>

        <a
          className="btn-base w-full bg-primary text-primary-foreground hover:bg-primary-dark"
          target="_blank"
          rel="noopener noreferrer"
          href={zap(`Olá, visitei o site MCMV e quero fazer uma simulação do ${nomeExibicao(emp.nome)}.`)}
          onClick={onClickWhatsApp(
            zap(`Olá, visitei o site MCMV e quero fazer uma simulação do ${nomeExibicao(emp.nome)}.`),
            `SIMULAÇÃO GRÁTIS - ${emp.nome}`,
          )}
        >
          SIMULAÇÃO GRÁTIS
        </a>
      </div>
    </article>
  );
}

export function Empreendimentos() {
  const [book, setBook] = useState<{ emp: number; foto: number } | null>(null);
  const [aba, setAba] = useState<"Todos" | Zona>("Todos");

  const mover = useCallback((passo: number) => {
    setBook((b) => {
      if (!b) return b;
      const total = empreendimentos[b.emp]?.fotos.length ?? 1;
      return { ...b, foto: (b.foto + passo + total) % total };
    });
  }, []);

  useEffect(() => {
    const onZona = (e: Event) => {
      const detalhe = (e as CustomEvent<string>).detail;
      if (detalhe === "Todos" || (ZONAS as readonly string[]).includes(detalhe)) {
        setAba(detalhe as "Todos" | Zona);
      }
    };
    window.addEventListener("mcmv:zona", onZona);
    return () => window.removeEventListener("mcmv:zona", onZona);
  }, []);

  useEffect(() => {
    if (!book) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBook(null);
      if (e.key === "ArrowLeft") mover(-1);
      if (e.key === "ArrowRight") mover(1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [book, mover]);

  const visiveis = empreendimentos.filter((e) => aba === "Todos" || e.zona === aba);
  const destaques = visiveis.filter((e) => e.destaque);
  const demais = visiveis.filter((e) => !e.destaque);
  const zonasComCards = ZONAS
    .map((zona) => ({ zona, lista: demais.filter((e) => e.zona === zona) }))
    .filter((z) => z.lista.length > 0);
  const atual = book ? empreendimentos[book.emp] : null;

  return (
    <section id="imoveis" className="py-16">
      <div className="mx-auto max-w-[1100px] px-5">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-3 inline-flex rounded-full bg-accent/15 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-accent-dark">
            Encontre seu novo lar
          </span>
          <h2 className="mb-2.5 text-3xl font-extrabold text-primary">
            Conheça os empreendimentos disponíveis
          </h2>
          <p className="text-muted-foreground">
            Selecionamos os melhores lançamentos MCMV da região para você
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          {(["Todos", ...ZONAS] as const).map((z) => {
            const ativo = aba === z;
            const total = z === "Todos" ? empreendimentos.length : empreendimentos.filter((e) => e.zona === z).length;
            return (
              <button
                key={z}
                type="button"
                onClick={() => setAba(z)}
                aria-pressed={ativo}
                className={`rounded-full border-2 px-5 py-2 text-sm font-extrabold transition-colors ${
                  ativo
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-primary hover:border-primary"
                }`}
              >
                {z}
                <span className={`ml-2 text-xs ${ativo ? "opacity-80" : "text-muted-foreground"}`}>{total}</span>
              </button>
            );
          })}
        </div>

        {visiveis.length === 0 && (
          <p className="mb-4 rounded-2xl bg-secondary px-6 py-10 text-center text-muted-foreground">
            Ainda não temos empreendimentos cadastrados nesta zona. Fale com a Simone no WhatsApp para receber as
            novidades assim que forem lançadas.
          </p>
        )}

        {destaques.length > 0 && (
          <div className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <h3 className="text-center text-lg font-extrabold uppercase tracking-[0.1em] text-primary">
                Em destaque
              </h3>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className={`grid gap-7 ${destaques.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-2xl"}`}>
              {destaques.map((emp) => (
                <Card
                  key={emp.nome}
                  emp={emp}
                  abrir={(foto) => setBook({ emp: empreendimentos.indexOf(emp), foto })}
                />
              ))}
            </div>
          </div>
        )}

        {zonasComCards.length > 0 && (
          <div>
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <h3 className="text-center text-lg font-extrabold uppercase tracking-[0.1em] text-primary">
                Mais opções por região
              </h3>
              <span className="h-px flex-1 bg-border" />
            </div>
            {zonasComCards.map(({ zona, lista }) => (
              <div key={zona} className="mb-9 last:mb-0">
                <h4 className="mb-5 border-l-4 border-accent pl-3 text-xl font-extrabold text-primary">{zona}</h4>
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                  {lista.map((emp) => (
                    <Card
                      key={emp.nome}
                      emp={emp}
                      abrir={(foto) => setBook({ emp: empreendimentos.indexOf(emp), foto })}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {book && atual && (
        <div
          className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-black/95 p-4"
          onClick={(e) => e.target === e.currentTarget && setBook(null)}
        >
          <div className="absolute top-0 right-0 left-0 z-2 flex items-center justify-between px-6 py-4 text-primary-foreground">
            <span className="font-extrabold">{nomeExibicao(atual.nome)}</span>
            <span className="text-sm opacity-80">
              {book.foto + 1} / {atual.fotos.length}
            </span>
            <button
              type="button"
              aria-label="Fechar"
              onClick={() => setBook(null)}
              className="text-2xl leading-none"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={() => mover(-1)}
            className="absolute left-4 z-2 flex size-13 items-center justify-center rounded-full border border-primary-foreground/40 bg-primary-foreground/15 text-3xl text-primary-foreground hover:bg-primary"
          >
            ‹
          </button>
          <img
            src={atual.fotos[book.foto]}
            alt={`${nomeExibicao(atual.nome)} - foto ${book.foto + 1}`}
            className="max-h-[70vh] max-w-[88vw] rounded-xl object-contain"
          />
          <button
            type="button"
            aria-label="Próxima foto"
            onClick={() => mover(1)}
            className="absolute right-4 z-2 flex size-13 items-center justify-center rounded-full border border-primary-foreground/40 bg-primary-foreground/15 text-3xl text-primary-foreground hover:bg-primary"
          >
            ›
          </button>
          <div className="mt-5 flex max-w-[90vw] gap-2 overflow-x-auto p-1">
            {atual.fotos.map((f, i) => (
              <img
                key={f + i}
                src={f}
                alt=""
                loading="lazy"
                decoding="async"
                onClick={() => setBook({ ...book, foto: i })}
                className={`size-15 shrink-0 cursor-pointer rounded-lg border-2 object-cover ${
                  i === book.foto ? "border-primary opacity-100" : "border-transparent opacity-55"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}