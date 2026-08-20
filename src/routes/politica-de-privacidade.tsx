import { createFileRoute } from "@tanstack/react-router";
import { PaginaConteudo } from "@/components/mcmv/PaginaConteudo";

const titulo = "Política de Privacidade e LGPD | Villar Imóveis";
const descricao =
  "Como a Villar Imóveis coleta, usa, compartilha e protege seus dados pessoais, e como exercer seus direitos previstos na LGPD.";

export const Route = createFileRoute("/politica-de-privacidade")({
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
  component: PoliticaPrivacidade,
});

function PoliticaPrivacidade() {
  return (
    <PaginaConteudo
      titulo="Política de Privacidade"
      subtitulo="Tratamento de dados pessoais conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018)."
    >
      <h2>Quais dados coletamos</h2>
      <p>
        Coletamos apenas os dados que você informa voluntariamente no formulário de Simulação Grátis e nos contatos
        pelo WhatsApp:
      </p>
      <ul>
        <li>Nome completo</li>
        <li>Telefone / WhatsApp</li>
        <li>E-mail</li>
        <li>Faixa de renda familiar</li>
        <li>Se possui FGTS</li>
        <li>Planta (metragem) de interesse</li>
      </ul>

      <h2>Para que usamos</h2>
      <p>
        Utilizamos esses dados para contato comercial e para elaborar a simulação de financiamento pelo programa Minha
        Casa Minha Vida, incluindo o envio de informações sobre este e outros empreendimentos compatíveis com o seu
        perfil. A base legal é o seu consentimento, coletado no próprio formulário.
      </p>

      <h2>Com quem compartilhamos</h2>
      <p>
        Os dados são registrados no nosso CRM imobiliário (Imobilead), utilizado exclusivamente para gestão do
        atendimento, e são acessados pela corretora responsável, Simone Villar (CRECI 189.434-F). Não vendemos seus
        dados nem os compartilhamos com terceiros para finalidades diferentes das descritas aqui. Quando necessário
        para dar andamento a uma proposta, os dados podem ser encaminhados à instituição financeira ou à
        incorporadora envolvida na negociação, mediante sua ciência.
      </p>

      <h2>Por quanto tempo guardamos</h2>
      <p>
        Mantemos seus dados enquanto durar o relacionamento comercial e por até 24 meses após o último contato, prazo
        após o qual são excluídos ou anonimizados — salvo quando a guarda por prazo maior for exigida por obrigação
        legal ou regulatória. Você pode solicitar a exclusão antes desse prazo a qualquer momento.
      </p>

      <h2>Seus direitos como titular</h2>
      <p>Pela LGPD, você pode a qualquer momento solicitar:</p>
      <ul>
        <li>Acesso aos dados que temos sobre você</li>
        <li>Correção de dados incompletos, inexatos ou desatualizados</li>
        <li>Exclusão dos dados tratados com base no consentimento</li>
        <li>Revogação do consentimento, sem custo</li>
        <li>Portabilidade dos dados a outro fornecedor</li>
        <li>Informação sobre com quem compartilhamos seus dados</li>
      </ul>

      <h2>Como exercer seus direitos</h2>
      <p>
        Envie sua solicitação para o WhatsApp/telefone (11) 9.9992-2344 ou para o e-mail de contato informado no
        atendimento. Responderemos no menor prazo possível, respeitando os limites da legislação. Basta pedir
        "descadastro" para revogar o consentimento e interromper os contatos.
      </p>

      <h2>Segurança</h2>
      <p>
        Adotamos medidas técnicas e administrativas razoáveis para proteger seus dados contra acessos não autorizados,
        perda ou uso indevido, incluindo transmissão criptografada e acesso restrito ao CRM.
      </p>

      <h2>Aviso importante</h2>
      <p>
        Este é um texto padrão, disponibilizado apenas a título informativo. Ele não constitui aconselhamento
        jurídico. Recomendamos a revisão por um advogado antes de considerá-lo plenamente adequado à sua operação e às
        exigências da LGPD.
      </p>
    </PaginaConteudo>
  );
}
