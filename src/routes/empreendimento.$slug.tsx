import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getEmpreendimentoPorSlug, zap } from "@/data/empreendimentos";
import { FormSimulacao } from "@/components/mcmv/FormSimulacao";
import { onClickWhatsApp } from "@/lib/leadWebhook";

export const Route = createFileRoute("/empreendimento/$slug")({
  loader: ({ params }) => {
    const emp = getEmpreendimentoPorSlug(params.slug);
    if (!emp) throw notFound();
    return { nome: emp.nome, zona: emp.zona, resumo: emp.itens[0] ?? "" };
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

function DetalheEmpreendimento() {
  const { slug } = Route.useParams();
  const emp = getEmpreendimentoPorSlug(slug);
  if (!emp) return <NaoEncontrado />;

  const fachada = emp.fotos[0];
  const lazer = emp.fotos.slice(1, 3);
  const planta = emp.fotos.length > 3 ? emp.fotos[emp.fotos.length - 1] : undefined;
  const temPlanta = emp.itens.some((i) => /planta/i.test(i));
  const mensagem = `Olá, visitei o site MCMV e quero fazer uma simulação do ${emp.nome}.`;
  const condicoes = emp.itens.filter((i) => /(renda|subsídio|subsidio|financiamento|fgts|420)/i.test(i));
  const sobre = emp.itens.filter((i) => !condicoes.includes(i));

  return (
    <main>
      <section className="relative">
        {fachada && (
          <img
            src={fachada}
            alt={`Fachada do ${emp.nome}`}
            className="h-[46vh] min-h-[280px] w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1100px] px-5 pb-8">
          <span className="mb-3 inline-flex rounded-full bg-accent px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-accent-foreground">
            {emp.zona}
          </span>
          <h1 className="text-3xl font-extrabold text-white md:text-4xl">{emp.nome}</h1>
          <p className="mt-1 font-bold text-white/85">Minha Casa Minha Vida · HIS</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1100px] space-y-14 px-5 py-14">
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

        {lazer.length > 0 && (
          <section>
            <h2 className="mb-4 text-2xl font-extrabold text-primary">Lazer</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {lazer.map((f, i) => (
                <figure key={f} className="overflow-hidden rounded-[18px] bg-card shadow-[0_10px_30px_rgba(0,0,0,.08)]">
                  <img
                    src={f}
                    alt={`${emp.nome} - ${legendasLazer[i] ?? "Lazer"}`}
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
          </section>
        )}

        {planta && (
          <section>
            <h2 className="mb-4 text-2xl font-extrabold text-primary">Plantas</h2>
            <figure className="mx-auto max-w-2xl overflow-hidden rounded-[18px] bg-card shadow-[0_10px_30px_rgba(0,0,0,.08)]">
              <img
                src={planta}
                alt={`${emp.nome} - ${temPlanta ? "planta" : "ambientes"}`}
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

        {condicoes.length > 0 && (
          <section className="rounded-[18px] bg-secondary px-6 py-8">
            <h2 className="mb-4 text-2xl font-extrabold text-primary">Condições Minha Casa Minha Vida</h2>
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
              Preencha seus dados e a corretora Simone Villar retorna com a simulação do {emp.nome}.
            </p>
            <a
              className="btn-base w-full bg-primary text-primary-foreground hover:bg-primary-dark sm:w-auto sm:px-8"
              target="_blank"
              rel="noopener noreferrer"
              href={zap(mensagem)}
              onClick={onClickWhatsApp(zap(mensagem), `PÁGINA DETALHE - ${emp.nome}`)}
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
  );
}
