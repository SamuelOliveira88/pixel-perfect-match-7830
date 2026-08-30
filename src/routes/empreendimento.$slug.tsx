import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getEmpreendimentoPorSlug, nomeExibicao, zap } from "@/data/empreendimentos";
import { FormSimulacao } from "@/components/mcmv/FormSimulacao";
import { SiteHeader } from "@/components/mcmv/SiteHeader";
import { SiteFooter } from "@/components/mcmv/SiteFooter";
import { onClickWhatsApp } from "@/lib/leadWebhook";

export const Route = createFileRoute("/empreendimento/$slug")({
  loader: ({ params }) => {
    const emp = getEmpreendimentoPorSlug(params.slug);
    if (!emp) throw notFound();
    return { nome: nomeExibicao(emp.nome), zona: emp.zona, resumo: emp.itens[0] ?? "" };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Empreendimento não encontrado | Villar Imóveis" }, { name: "robots", content: "noindex" }] };
    }
    const titulo = `${loaderData.nome} | Villar Imóveis`;
    const descricao = `${loaderData.nome} — ${loaderData.zona} de São Paulo. ${loaderData.resumo} Minha Casa Minha Vida com subsídio e financiamento Caixa.`;
    return {
      meta: [
        { title: titulo },
        { name: "description", content: descricao },
        { property: "og:title", content: titulo },
        { property: "og:description", content: descricao },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: NaoEncontrado,
  component: DetalheEmpreendimento,
});

function NaoEncontrado() {
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

function FichaLinha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-[14px] bg-card p-4 shadow-[0_6px_20px_rgba(0,0,0,.06)]">
      <dt className="text-xs font-extrabold uppercase tracking-[0.1em] text-accent">{rotulo}</dt>
      <dd className="mt-1 text-sm font-semibold text-muted-foreground">{valor}</dd>
    </div>
  );
}

function DetalheEmpreendimento() {
  const { slug } = Route.useParams();
  const emp = getEmpreendimentoPorSlug(slug);
  if (!emp) return <NaoEncontrado />;

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
        <section className="relative">
          {fachada && (
            <img
              src={fachada}
              alt={`Fachada do ${exibicao}`}
              className="h-[46vh] min-h-[280px] w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1100px] px-5 pb-8">
            <span className="mb-3 inline-flex rounded-full bg-accent px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-accent-foreground">
              {emp.zona}
            </span>
            <h1 className="text-3xl font-extrabold text-white md:text-4xl">{exibicao}</h1>
            <p className="mt-1 font-bold text-white/85">Minha Casa Minha Vida · HIS</p>
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
                  <span className="absolute left-0 font-extrabold text-accent">✓</span>
                  {i}
                </li>
              ))}
            </ul>
          </section>

          {fichaItens.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-extrabold text-primary">Ficha técnica</h2>
              <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {fichaItens.map(([rotulo, valor]) => (
                  <FichaLinha key={rotulo} rotulo={rotulo} valor={valor} />
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
                      <span className="font-extrabold text-accent">✓</span>
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
                    <span className="absolute left-0 font-extrabold text-accent">✓</span>
                    {i}
                  </li>
                ))}
              </ul>
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
