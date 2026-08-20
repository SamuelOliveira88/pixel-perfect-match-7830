import { createFileRoute } from "@tanstack/react-router";
import { PaginaConteudo } from "@/components/mcmv/PaginaConteudo";

const titulo = "Sobre Nós | Villar Imóveis";
const descricao =
  "Conheça a Villar Imóveis e a corretora Simone Villar: assessoria completa em lançamentos Vibra pelo Minha Casa Minha Vida em São Paulo.";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <PaginaConteudo
      titulo="Sobre Nós"
      subtitulo="Assessoria imobiliária especializada em Minha Casa Minha Vida e lançamentos Vibra Residencial em São Paulo."
    >
      <p>
        A Villar Imóveis é conduzida pela corretora Simone Villar (CRECI 189.434-F 42581-J), com mais de 10 anos de
        experiência ajudando famílias a conquistarem o primeiro apartamento em São Paulo.
      </p>
      <h2>Como trabalhamos</h2>
      <ul>
        <li>Simulação gratuita e sem compromisso, com análise de renda, FGTS e subsídio do governo.</li>
        <li>Curadoria de empreendimentos por zona da cidade: Norte, Sul, Leste e Oeste.</li>
        <li>Acompanhamento do início da negociação até a entrega das chaves.</li>
      </ul>
      <h2>Por que Minha Casa Minha Vida</h2>
      <p>
        O programa permite usar o FGTS na entrada, somar a renda de até três pessoas da família e contar com subsídio
        conforme a faixa de renda — em muitos casos com parcela próxima ao valor de um aluguel.
      </p>
      <h2>Fale com a gente</h2>
      <p>
        Telefone e WhatsApp: (11) 9.9992-2344. Atendimento em toda a cidade de São Paulo.
      </p>
    </PaginaConteudo>
  );
}
