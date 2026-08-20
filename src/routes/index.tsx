import { createFileRoute } from "@tanstack/react-router";
import { Empreendimentos } from "@/components/mcmv/Empreendimentos";
import { FormSimulacao } from "@/components/mcmv/FormSimulacao";
import { Simulador } from "@/components/mcmv/Simulador";
import { SiteHeader } from "@/components/mcmv/SiteHeader";
import { SiteFooter } from "@/components/mcmv/SiteFooter";
import { zap } from "@/data/empreendimentos";
import { onClickWhatsApp } from "@/lib/leadWebhook";
import fachada from "@/assets/emp-fachada.jpg";
import videoBonfiglioli from "@/assets/jd-bonfiglioli.mp4.asset.json";
import lazer from "@/assets/emp-lazer.jpg";
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

function abrirLink(url: string) {
  const w = window.open(url, "_blank", "noopener,noreferrer");
  if (!w) {
    try {
      (window.top ?? window).location.href = url;
    } catch {
      window.location.href = url;
    }
  }
}

function Index() {
  const msgZap = "Olá, visitei o site MCMV e quero fazer uma simulação grátis.";
  const linkZap = zap(msgZap);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-gradient-to-br from-primary to-primary-dark py-6 pb-8">
        <div className="mx-auto max-w-[1100px] px-5">
          <div className="mx-auto max-w-[900px] rounded-[22px] bg-card p-4 pb-5 shadow-[0_18px_40px_rgba(0,0,0,.25)]">
            <div className="mb-3.5 flex items-center justify-center gap-2.5 text-center font-extrabold text-primary">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-accent-foreground">
                🔥 Lançamento
              </span>
              Conheça o Vibra Jardim Bonfiglioli
            </div>
            <video
              src={videoBonfiglioli.url}
              poster={fachada}
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="max-h-[520px] w-full rounded-xl bg-black object-cover"
            />
            <div className="mt-3 text-center text-sm text-muted-foreground">
              Veja o empreendimento e agende sua visita
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary py-15 text-primary-foreground">
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
          <FormSimulacao />
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

      <section className="bg-secondary py-16">
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
          <h2 className="mb-2.5 text-center text-3xl font-extrabold text-primary">Simule seu financiamento</h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-muted-foreground">
            Arraste as barras e veja uma estimativa da sua parcela na hora
          </p>
          <Simulador />
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
        className="animate-zap-pulse fixed right-6 bottom-6 z-100 flex size-15 items-center justify-center rounded-full bg-primary text-3xl text-primary-foreground"
      >
        <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
          <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.386.7 4.607 1.905 6.474L4 29l7.72-1.855A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm6.98 17.02c-.29.816-1.44 1.494-2.36 1.69-.63.133-1.454.24-4.227-.907-3.548-1.466-5.833-5.06-6.012-5.297-.176-.238-1.437-1.914-1.437-3.65s.912-2.59 1.235-2.946c.29-.32.63-.4.84-.4.21 0 .42.002.605.011.194.01.454-.073.71.542.264.635.897 2.19.976 2.35.079.16.132.348.026.56-.106.212-.16.344-.317.53-.158.185-.332.413-.475.556-.158.158-.322.33-.138.647.184.317.816 1.35 1.752 2.187 1.203 1.075 2.219 1.408 2.535 1.567.317.158.502.132.688-.08.185-.211.79-.92.999-1.236.211-.317.422-.264.712-.158.291.106 1.847.872 2.164 1.03.317.159.528.238.607.37.079.132.079.766-.211 1.581Z" />
        </svg>
      </a>
    </div>
  );
}
