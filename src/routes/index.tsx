import { createFileRoute } from "@tanstack/react-router";
import { Empreendimentos } from "@/components/mcmv/Empreendimentos";
import { FormSimulacao } from "@/components/mcmv/FormSimulacao";
import { Simulador } from "@/components/mcmv/Simulador";
import { SiteHeader } from "@/components/mcmv/SiteHeader";
import { SiteFooter } from "@/components/mcmv/SiteFooter";
import { zap } from "@/data/empreendimentos";
import { onClickWhatsApp } from "@/lib/leadWebhook";
import lazer from "@/assets/emp-lazer.jpg";
import heroPiscina from "@/assets/emp/hero-piscina-bonfiglioli.jpg.asset.json";
import mcmvFamilia from "@/assets/mcmv-familia.jpg";
import simone from "@/assets/simone.jpg";

const titulo = "MCMV São Paulo | Villar Imóveis";
const descricao =
  "Simule grátis seu apartamento pelo Minha Casa Minha Vida em São Paulo: subsídio do governo, FGTS na entrada e parcelas que cabem no bolso.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

const passos = [
  ["Simule", "Preencha seus dados e receba uma simulação gratuita e sem compromisso."],
  ["Receba a análise", "Nossa equipe analisa seu perfil e te diz quais imóveis cabem no seu bolso."],
  ["Escolha o imóvel", "Conheça os empreendimentos disponíveis e escolha o que combina com você."],
  ["Realize o sonho", "Assine o contrato e conquiste as chaves do seu apartamento próprio."],
];

const beneficios = [
  "Use seu FGTS para dar entrada no seu imóvel",
  "Combine a renda de até 3 pessoas da família para aumentar o crédito aprovado",
  "Parcelas que cabem no seu bolso, muitas vezes no valor de um aluguel",
  "Aprovação totalmente online em até 45 minutos",
  "Subsídio do governo de acordo com sua faixa de renda",
];


function Index() {
  const msgZap = "Olá, visitei o site MCMV e quero fazer uma simulação grátis.";
  const linkZap = zap(msgZap);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section
        id="destaque"
        className="relative flex min-h-[92vh] items-center justify-center bg-primary bg-cover bg-center py-16 text-center"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.62),rgba(0,0,0,.62)), url(${heroPiscina.url})` }}
      >
        <div className="mx-auto max-w-[760px] px-5">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-5 py-2 text-xs font-extrabold tracking-[0.25em] text-primary-foreground uppercase backdrop-blur-sm">
            <span className="inline-block size-2 rounded-full bg-cyan-accent" />
            Villar Imóveis
          </span>
          <h2 className="text-3xl leading-tight font-extrabold text-primary-foreground md:text-5xl">
            Com apenas <span className="text-primary">R$ 800</span> de entrada, você já pode conquistar o seu
            primeiro apê pelo Minha Casa Minha Vida 🏡✨
          </h2>
          <a
            href={linkZap}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClickWhatsApp(linkZap, "Hero - QUERO SIMULAR AGORA")}
            className="btn-base mt-7 bg-whatsapp text-lg text-primary-foreground shadow-lg hover:brightness-110"
          >
            QUERO SIMULAR AGORA!
          </a>
          <p className="mx-auto mt-7 max-w-xl text-lg text-primary-foreground/90">
            Achou que morar num condomínio estilo clube com piscina, academia e salão de festas{" "}
            <strong className="text-primary">era um sonho impossível?</strong> A Villar Imóveis coloca essa{" "}
            <strong className="text-primary">conquista</strong> ao seu alcance, entrada de apenas{" "}
            <strong className="text-primary">R$ 800,00</strong> com{" "}
            <strong className="text-primary">parcelas que cabem no seu bolso</strong> e zero burocracia.
          </p>
        </div>
      </section>

      <section id="simulacao" className="relative overflow-hidden bg-primary py-15 text-primary-foreground">
        <div className="mx-auto grid max-w-[1100px] items-start gap-12 px-5 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <h1 className="mb-4.5 text-3xl leading-tight font-extrabold uppercase md:text-4xl">
              Seu apartamento pelo Minha Casa Minha Vida está mais perto do que você imagina
            </h1>
            <p className="mb-7 max-w-lg opacity-95">
              Realize o sonho da casa própria com os benefícios do Minha Casa Minha Vida. Subsídio, FGTS na entrada e
              financiamento de acordo com sua renda.
            </p>
            <div className="flex flex-wrap gap-3.5">
              {["💰 Subsídio do governo", "🏦 Use seu FGTS na entrada", "📆 Parcela que cabe no seu bolso"].map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-primary-foreground/35 bg-accent/35 px-4 py-2 text-sm font-semibold backdrop-blur-sm"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-extrabold uppercase">Simule seu financiamento</h2>
            <Simulador />
          </div>
        </div>
      </section>

      <Empreendimentos />

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-[1100px] px-5">
          <h2 className="mb-2.5 text-center text-3xl font-extrabold text-primary">
            Comprar seu imóvel pode ser mais simples do que você imagina
          </h2>
          <p className="mb-10 text-center text-muted-foreground">Como funciona:</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {passos.map(([t, d], i) => (
              <div key={t} className="rounded-2xl bg-card p-7 text-center shadow-[0_8px_24px_rgba(0,0,0,.06)]">
                <div className="mx-auto mb-3.5 flex size-11 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-primary-foreground">
                  {i + 1}
                </div>
                <h3 className="mb-2 font-bold text-primary">{t}</h3>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1100px] px-5">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-primary">Minha Casa Minha Vida</h2>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <img
              src={mcmvFamilia}
              alt="Programa Minha Casa Minha Vida"
              width={1024}
              height={1024}
              loading="lazy"
              className="rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,.15)]"
            />
            <ul className="space-y-4.5">
              {beneficios.map((b) => (
                <li key={b} className="flex items-start gap-3.5 text-base">
                  <span className="flex size-7.5 shrink-0 items-center justify-center rounded-full bg-accent font-extrabold text-accent-foreground">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="sobre" className="bg-secondary py-16">
        <div className="mx-auto max-w-[1100px] px-5">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-primary">Quem sou eu?</h2>
          <div className="grid items-center gap-10 rounded-3xl bg-gradient-to-br from-card to-secondary p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,.06)] md:grid-cols-[220px_1fr] md:text-left">
            <img
              src={simone}
              alt="Simone Villar, corretora de imóveis"
              width={1024}
              height={1024}
              loading="lazy"
              className="mx-auto size-50 rounded-full border-6 border-primary object-cover"
            />
            <div>
              <h3 className="mb-2.5 text-xl font-bold text-primary">Simone Villar</h3>
              <p className="text-muted-foreground">
                Corretora de imóveis com mais de 10 anos de experiência ajudando famílias a conquistarem a casa própria
                em São Paulo e região. Atendimento próximo, transparente e personalizado do início ao fim da sua jornada
                até as chaves do seu apartamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="simulador" className="bg-secondary py-16">
        <div className="mx-auto max-w-[1100px] px-5">
          <h2 className="mb-2.5 text-center text-3xl font-extrabold text-primary">Simulação grátis</h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-muted-foreground">
            Preencha seus dados e receba uma análise do seu perfil sem compromisso
          </p>
          <FormSimulacao />
        </div>
      </section>

      <section
        className="relative bg-primary bg-cover bg-center py-16 text-center text-primary-foreground"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)), url(${lazer})` }}
      >
        <div className="mx-auto max-w-[1100px] px-5">
          <h2 className="mb-3.5 text-3xl font-extrabold uppercase">Simule já</h2>
          <p className="mb-7 text-lg opacity-95">Descubra qual imóvel combina com seu perfil</p>
          <a
            href={linkZap}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClickWhatsApp(linkZap, "Simule já - CONHEÇA AGORA")}
            className="btn-base bg-primary-dark text-primary-foreground shadow-lg hover:bg-primary"
          >
            CONHEÇA AGORA
          </a>
        </div>
      </section>

      <SiteFooter />

      <a
        href={linkZap}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClickWhatsApp(linkZap, "Botão flutuante WhatsApp")}
        aria-label="Falar no WhatsApp"
        className="animate-zap-pulse fixed right-6 bottom-6 z-100 flex size-15 items-center justify-center rounded-full bg-whatsapp text-3xl text-primary-foreground"
      >
        <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
          <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.386.7 4.607 1.905 6.474L4 29l7.72-1.855A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm6.98 17.02c-.29.816-1.44 1.494-2.36 1.69-.63.133-1.454.24-4.227-.907-3.548-1.466-5.833-5.06-6.012-5.297-.176-.238-1.437-1.914-1.437-3.65s.912-2.59 1.235-2.946c.29-.32.63-.4.84-.4.21 0 .42.002.605.011.194.01.454-.073.71.542.264.635.897 2.19.976 2.35.079.16.132.348.026.56-.106.212-.16.344-.317.53-.158.185-.332.413-.475.556-.158.158-.322.33-.138.647.184.317.816 1.35 1.752 2.187 1.203 1.075 2.219 1.408 2.535 1.567.317.158.502.132.688-.08.185-.211.79-.92.999-1.236.211-.317.422-.264.712-.158.291.106 1.847.872 2.164 1.03.317.159.528.238.607.37.079.132.079.766-.211 1.581Z" />
        </svg>
      </a>
    </div>
  );
}
