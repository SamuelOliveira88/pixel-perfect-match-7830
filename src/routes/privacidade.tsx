import { createFileRoute } from "@tanstack/react-router";
import { PaginaConteudo } from "@/components/mcmv/PaginaConteudo";

const titulo = "Política de Privacidade | Villar Imóveis";
const descricao =
  "Saiba como a Villar Imóveis coleta, utiliza e protege os dados pessoais informados nos formulários e contatos do site.";

export const Route = createFileRoute("/privacidade")({
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
  component: Privacidade,
});

function Privacidade() {
  return (
    <PaginaConteudo
      titulo="Política de Privacidade"
      subtitulo="Transparência sobre os dados que coletamos e como eles são utilizados."
    >
      <h2>Dados coletados</h2>
      <p>
        Coletamos apenas os dados que você informa voluntariamente nos formulários de simulação e nos contatos por
        WhatsApp: nome, telefone, e-mail e informações sobre renda, FGTS e planta de interesse.
      </p>
      <h2>Finalidade</h2>
      <ul>
        <li>Realizar a simulação de financiamento solicitada.</li>
        <li>Entrar em contato para apresentar empreendimentos e condições.</li>
        <li>Encaminhar a proposta às instituições financeiras e construtoras parceiras, quando necessário.</li>
      </ul>
      <h2>Compartilhamento</h2>
      <p>
        Os dados podem ser processados por ferramentas de gestão de leads e mensuração de campanhas utilizadas pela
        Villar Imóveis. Não vendemos dados pessoais a terceiros.
      </p>
      <h2>Cookies e mensuração</h2>
      <p>
        O site utiliza tecnologias de mensuração de anúncios para entender o desempenho das campanhas. Você pode
        desativar cookies nas configurações do seu navegador.
      </p>
      <h2>Seus direitos (LGPD)</h2>
      <p>
        Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento pelo telefone/WhatsApp
        (11) 9.9992-2344.
      </p>
    </PaginaConteudo>
  );
}
