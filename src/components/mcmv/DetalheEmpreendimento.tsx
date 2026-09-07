import { Link } from "@tanstack/react-router";
import { nomeExibicao, zap, type Empreendimento } from "@/data/empreendimentos";
import { FormSimulacao } from "@/components/mcmv/FormSimulacao";
import { SiteHeader } from "@/components/mcmv/SiteHeader";
import { SiteFooter } from "@/components/mcmv/SiteFooter";
import { onClickWhatsApp } from "@/lib/leadWebhook";

export function NaoEncontrado() {
  return (
    <main className="mx-auto max-w-[900px] px-5 py-24 text-center">
      <h1 className="mb-3 text-3xl font-extrabold text-primary">Empreendimento não encontrado</h1>
      <p className="mb-6 text-muted-foreground">Confira a lista completa de empreendimentos disponíveis.</p>
      <Link to="/" className="btn-base bg-primary px-6 text-primary-foreground hover:bg-primary-dark">
        Voltar para a página inicial
      </Link>
    </main>
  );
}

const legendasLazer = ["Piscina", "Área de lazer"];

function FichaLinha({ rotulo, valor, zebra }: { rotulo: string; valor: string; zebra: boolean }) {
  return (
    <div
      className={`grid gap-1 px-5 py-3.5 sm:grid-cols-[220px_1fr] sm:items-center sm:gap-6 ${
        zebra ? "bg-muted" : "bg-card"
      }`}
    >
      <dt className="text-sm font-extrabold text-foreground">{rotulo}</dt>
      <dd className="text-sm font-semibold text-muted-foreground">{valor}</dd>
    </div>
  );
}

export function DetalheEmpreendimento({ emp }: { emp: Empreendimento }) {
  const fachada = emp.fotos[0];
  const lazer = emp.fotos.slice(1, 3);
  const planta = emp.fotos.length > 3 ? emp.fotos[emp.fotos.length - 1] : undefined;
  const temPlanta = emp.itens.some((i) => /planta/i.test(i));
  const exibicao = nomeExibicao(emp.nome);
  const mensagem = `Olá, visitei o site MCMV e quero fazer uma simulação do ${exibicao}.`;
  const condicoes = emp.itens.filter((i) => /(renda|subsídio|subsidio|financiamento|fgts|420)/i.test(i));
  const sobre = emp.itens.filter((i) => !condicoes.includes(i));

  const ficha: Array<[string, string | undefined]> = [
    ["Endereço", emp.endereco],
    ["Status da obra", emp.statusObra],
    ["Torres", emp.torres ? String(emp.torres) : undefined],
    ["Unidades totais", emp.unidadesTotais ? String(emp.unidadesTotais) : undefined],
    ["Tipologias e metragens", emp.tipologiasMetragens],
    ["Vagas de garagem", emp.vagasGaragem],
    ["Transporte", emp.transporte],
  ];
  const fichaItens = ficha.filter((f): f is [string, string] => Boolean(f[1]));
  const linkZapFlutuante = zap("Olá, visitei o site Villar Imóveis e quero falar com um consultor.");

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative flex min-h-[60vh] items-center">
          {fachada && (
            <img
              src={fachada}
              alt={`Fachada do ${exibicao}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative mx-auto w-full max-w-[1100px] px-5 py-24">
            <span className="mb-4 inline-flex rounded-full bg-accent px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-accent-foreground">
              {emp.zona} · São Paulo
            </span>
            <h1 className="max-w-2xl text-3xl font-extrabold uppercase leading-tight text-white md:text-5xl">
              {exibicao}
            </h1>
            <p className="mt-3 max-w-xl font-semibold text-white/85">
              {emp.tipologiasMetragens ?? "Apartamentos Minha Casa Minha Vida"}
            </p>
            <p className="mt-1 text-sm font-bold text-white/70">Minha Casa Minha Vida · HIS</p>
            <a
              className="btn-base mt-7 inline-flex bg-whatsapp px-8 text-white hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
              href={zap(mensagem)}
              onClick={onClickWhatsApp(zap(mensagem), `HERO DETALHE - ${exibicao}`)}
            >
              Falar no WhatsApp
            </a>
          </div>
        </section>

        <div className="mx-auto max-w-[1100px] space-y-14 px-5 py-14">
          {emp.tourVirtualUrl && (
            <a
              href={emp.tourVirtualUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base inline-flex bg-accent px-7 text-accent-foreground hover:opacity-90"
            >
              Tour Virtual 360°
            </a>
          )}

          <section>
            <h2 className="mb-4 text-2xl font-extrabold text-primary">Sobre o empreendimento</h2>
            <ul className="space-y-2">
              {sobre.map((i) => (
                <li key={i} className="relative pl-6 text-muted-foreground">
                  <span className="absolute left-0 font-extrabold text-accent"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                  {i}
                </li>
              ))}
            </ul>
          </section>

          {fichaItens.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-extrabold text-primary">
                Informações do empreendimento
              </h2>
              {emp.endereco && (
                <p className="mb-4 text-sm font-semibold text-muted-foreground">{emp.endereco}</p>
              )}
              <dl className="divide-y divide-border overflow-hidden rounded-[14px] border border-border">
                {fichaItens.map(([rotulo, valor], i) => (
                  <FichaLinha key={rotulo} rotulo={rotulo} valor={valor} zebra={i % 2 === 0} />
                ))}
              </dl>
            </section>
          )}

          {(emp.lazerCompleto?.length || lazer.length > 0) && (
            <section>
              <h2 className="mb-4 text-2xl font-extrabold text-primary">Lazer</h2>
              {emp.lazerCompleto?.length ? (
                <ul className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {emp.lazerCompleto.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 rounded-[14px] bg-secondary px-4 py-3 text-sm font-semibold text-muted-foreground"
                    >
                      <span className="font-extrabold text-accent"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {lazer.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {lazer.map((f, i) => (
                    <figure key={f} className="overflow-hidden rounded-[18px] bg-card shadow-[0_10px_30px_rgba(0,0,0,.08)]">
                      <img
                        src={f}
                        alt={`${exibicao} - ${legendasLazer[i] ?? "Lazer"}`}
                        loading="lazy"
                        decoding="async"
                        className="h-64 w-full object-cover"
                      />
                      <figcaption className="px-5 py-3 text-sm font-semibold text-muted-foreground">
                        {legendasLazer[i] ?? "Espaço de lazer"}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </section>
          )}

          {planta && (
            <section>
              <h2 className="mb-4 text-2xl font-extrabold text-primary">Plantas</h2>
              <figure className="mx-auto max-w-2xl overflow-hidden rounded-[18px] bg-card shadow-[0_10px_30px_rgba(0,0,0,.08)]">
                <img
                  src={planta}
                  alt={`${exibicao} - ${temPlanta ? "planta" : "ambientes"}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-contain"
                />
                <figcaption className="px-5 py-3 text-sm font-semibold text-muted-foreground">
                  {temPlanta ? "Planta das unidades" : "Conheça os ambientes"}
                </figcaption>
              </figure>
            </section>
          )}

          {(condicoes.length > 0 || emp.precoAPartirDe || emp.faixasMCMV) && (
            <section className="rounded-[18px] bg-secondary px-6 py-8">
              <h2 className="mb-4 text-2xl font-extrabold text-primary">Condições Minha Casa Minha Vida</h2>
              {emp.precoAPartirDe && (
                <p className="mb-3 text-lg font-extrabold text-primary">
                  A partir de <span className="text-accent">{emp.precoAPartirDe}</span>
                </p>
              )}
              {emp.faixasMCMV && (
                <p className="mb-4 text-sm font-semibold text-muted-foreground">{emp.faixasMCMV}</p>
              )}
              <ul className="space-y-2">
                {condicoes.map((i) => (
                  <li key={i} className="relative pl-6 text-muted-foreground">
                    <span className="absolute left-0 font-extrabold text-accent"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                    {i}
                  </li>
                ))}
              </ul>
            </section>
          )}


          {emp.fotos.length > 1 && (
            <section>
              <h2 className="mb-4 text-2xl font-extrabold text-primary">Galeria</h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Imagens preliminares do projeto, sujeitas a alteração.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {emp.fotos.map((f, i) => (
                  <figure key={f + i} className="overflow-hidden rounded-[18px] bg-card shadow-[0_10px_30px_rgba(0,0,0,.08)]">
                    <img
                      src={f}
                      alt={`${exibicao} - foto ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="h-56 w-full object-cover"
                    />
                    <figcaption className="px-5 py-3 text-sm font-semibold text-muted-foreground">
                      {i === 0 ? "Fachada" : `${exibicao} — foto ${i + 1}`}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          <section className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-3 text-2xl font-extrabold text-primary">Faça sua simulação grátis</h2>
              <p className="mb-6 text-muted-foreground">
                Preencha seus dados e a corretora Simone Villar retorna com a simulação do {exibicao}.
              </p>
              <a
                className="btn-base w-full bg-primary text-primary-foreground hover:bg-primary-dark sm:w-auto sm:px-8"
                target="_blank"
                rel="noopener noreferrer"
                href={zap(mensagem)}
                onClick={onClickWhatsApp(zap(mensagem), `PÁGINA DETALHE - ${exibicao}`)}
              >
                Falar no WhatsApp
              </a>
            </div>
            <FormSimulacao />
          </section>

          <div>
            <Link to="/" hash="imoveis" className="text-sm font-bold text-primary underline">
              ← Ver todos os empreendimentos
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
      <a
        href={linkZapFlutuante}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClickWhatsApp(linkZapFlutuante, "Botão flutuante WhatsApp - Página de detalhe")}
        aria-label="Falar no WhatsApp"
        className="animate-zap-pulse fixed right-6 bottom-6 z-100 flex size-15 items-center justify-center rounded-full bg-primary text-3xl text-primary-foreground"
      >
        <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
          <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.386.7 4.607 1.905 6.474L4 29l7.72-1.855A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm6.98 17.02c-.29.816-1.44 1.494-2.36 1.69-.63.133-1.454.24-4.227-.907-3.548-1.466-5.833-5.06-6.012-5.297-.176-.238-1.437-1.914-1.437-3.65s.912-2.59 1.235-2.946c.29-.32.63-.4.84-.4.21 0 .42.002.605.011.194.01.454-.073.71.542.264.635.897 2.19.976 2.35.079.16.132.348.026.56-.106.212-.16.344-.317.53-.158.185-.332.413-.475.556-.158.158-.322.33-.138.647.184.317.816 1.35 1.752 2.187 1.203 1.075 2.219 1.408 2.535 1.567.317.158.502.132.688-.08.185-.211.79-.92.999-1.236.211-.317.422-.264.712-.158.291.106 1.847.872 2.164 1.03.317.159.528.238.607.37.079.132.079.766-.211 1.581Z" />
        </svg>
      </a>
    </div>
  );
}
