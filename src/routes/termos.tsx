import { createFileRoute } from "@tanstack/react-router";
import { PaginaConteudo } from "@/components/mcmv/PaginaConteudo";

const titulo = "Termos e Condições | Villar Imóveis";
const descricao =
  "Condições de uso do site da Villar Imóveis, natureza das simulações apresentadas e caráter ilustrativo das imagens.";

export const Route = createFileRoute("/termos")({
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
  component: Termos,
});

function Termos() {
  return (
    <PaginaConteudo
      titulo="Termos e Condições"
      subtitulo="Regras de uso do site e limites das informações aqui apresentadas."
    >
      <h2>Uso do site</h2>
      <p>
        O conteúdo deste site tem finalidade informativa e publicitária sobre empreendimentos imobiliários
        intermediados pela Villar Imóveis.
      </p>
      <h2>Simulações</h2>
      <p>
        Os valores exibidos no simulador são estimativas calculadas a partir dos dados informados pelo visitante. Não
        constituem proposta de crédito. Parcelas, taxas, subsídios e prazos dependem de análise e aprovação da
        instituição financeira e das regras vigentes do programa Minha Casa Minha Vida.
      </p>
      <h2>Imagens e informações dos empreendimentos</h2>
      <p>
        Perspectivas, plantas, metragens e itens de lazer são ilustrativos e podem sofrer alterações pela
        incorporadora. A disponibilidade de unidades está sujeita a confirmação.
      </p>
      <h2>Contato</h2>
      <p>Dúvidas sobre estes termos: (11) 9.9992-2344.</p>
    </PaginaConteudo>
  );
}
