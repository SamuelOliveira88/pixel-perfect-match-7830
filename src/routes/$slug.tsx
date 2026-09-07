import { createFileRoute, notFound } from "@tanstack/react-router";
import { getEmpreendimentoPorSlugCurto, nomeExibicao } from "@/data/empreendimentos";
import { DetalheEmpreendimento, NaoEncontrado } from "@/components/mcmv/DetalheEmpreendimento";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const emp = getEmpreendimentoPorSlugCurto(params.slug);
    if (!emp) throw notFound();
    return { nome: nomeExibicao(emp.nome), zona: emp.zona, resumo: emp.itens[0] ?? "" };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Página não encontrada | Villar Imóveis" }, { name: "robots", content: "noindex" }] };
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
  component: PaginaEmpreendimento,
});

function PaginaEmpreendimento() {
  const { slug } = Route.useParams();
  const emp = getEmpreendimentoPorSlugCurto(slug);
  if (!emp) return <NaoEncontrado />;
  return <DetalheEmpreendimento emp={emp} />;
}
