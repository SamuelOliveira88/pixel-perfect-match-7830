import { createFileRoute } from "@tanstack/react-router";
import { Empreendimentos } from "@/components/mcmv/Empreendimentos";
import { FormSimulacao } from "@/components/mcmv/FormSimulacao";
import { Simulador } from "@/components/mcmv/Simulador";
import { zap } from "@/data/empreendimentos";
import fachada from "@/assets/emp-fachada.jpg";
import videoPaesDeBarros from "@/assets/paes-de-barros.mp4.asset.json";
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

function Index() {
  const msgZap = "Olá, visitei o site MCMV e quero fazer uma simulação grátis.";
  const linkZap = zap(msgZap);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card shadow-[0_2px_10px_rgba(0,0,0,.06)]">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-5 px-5 py-3.5">
          <span className="text-xl leading-tight font-extrabold tracking-tight text-primary">
            Villar
            <span className="block text-xs font-semibold tracking-[0.25em] text-accent-dark">
              IMÓVEIS
            </span>
          </span>
          <div className="min-w-[220px] flex-1 text-center text-lg font-extrabold text-primary">
            Saia do aluguel com o Minha Casa Minha Vida
          </div>
          <a
            href="#simulador"
            className="btn-base bg-brand-blue text-primary-foreground hover:bg-brand-blue-dark"
          >
            SIMULAR AGORA
          </a>
          <a
            href={linkZap}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base bg-whatsapp text-primary-foreground hover:bg-whatsapp-dark"
          >
            SIMULAÇÃO GRATUITA
          </a>
        </div>
      </header>

      <section className="bg-gradient-to-br from-primary to-primary-dark py-6 pb-8">
        <div className="mx-auto max-w-[1100px] px-5">
          <div className="mx-auto max-w-[900px] rounded-[22px] bg-card p-4 pb-5 shadow-[0_18px_40px_rgba(0,0,0,.25)]">
            <div className="mb-3.5 flex items-center justify-center gap-2.5 text-center font-extrabold text-primary">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-accent-foreground">
                🔥 Lançamento
              </span>
              Conheça o Vibra Paes de Barros
            </div>
            <video
              src={videoPaesDeBarros.url}
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
              Realize o sonho da casa própria com os benefícios do Minha Casa Minha Vida. Subsídio,
              FGTS na entrada e financiamento de acordo com sua renda.
            </p>
            <div className="flex flex-wrap gap-3.5">
              {["💰 Subsídio do governo", "🏦 Use seu FGTS na entrada", "📆 Parcela que cabe no seu bolso"].map(
                (b) => (
                  <span
                    key={b}
                    className="rounded-full border border-primary-foreground/50 bg-accent px-4 py-2 text-sm font-bold"
                  >
                    {b}
                  </span>
                ),
              )}
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
              <div
                key={t}
                className="rounded-2xl bg-card p-7 text-center shadow-[0_8px_24px_rgba(0,0,0,.06)]"
              >
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
          <h2 className="mb-10 text-center text-3xl font-extrabold text-primary">
            Minha Casa Minha Vida
          </h2>
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
                Corretora de imóveis com mais de 10 anos de experiência ajudando famílias a
                conquistarem a casa própria em São Paulo e região. Atendimento próximo, transparente
                e personalizado do início ao fim da sua jornada até as chaves do seu apartamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="simulador" className="bg-secondary py-16">
        <div className="mx-auto max-w-[1100px] px-5">
          <h2 className="mb-2.5 text-center text-3xl font-extrabold text-primary">
            Simule seu financiamento
          </h2>
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
            className="btn-base bg-whatsapp text-primary-foreground hover:bg-whatsapp-dark"
          >
            CONHEÇA AGORA
          </a>
        </div>
      </section>

      <footer className="bg-primary-dark py-12 pb-6 text-primary-foreground">
        <div className="mx-auto max-w-[1100px] px-5">
          <div className="mb-7 grid gap-7 sm:grid-cols-3">
            <div>
              <h3 className="mb-3.5 font-bold">Endereço</h3>
              <p className="text-sm opacity-85">
                Estrada São Francisco, 2008
                <br />
                São Paulo – SP
              </p>
            </div>
            <div>
              <h3 className="mb-3.5 font-bold">Contato</h3>
              <p className="text-sm opacity-85">📞 (11) 9.9992-2344</p>
              <p className="text-sm opacity-85">CRECI 189.434-F 42581-J</p>
            </div>
            <div>
              <h3 className="mb-3.5 font-bold">Conheça minhas redes</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/villarcorretoradeimoveis"
                  target="_blank"
                  rel="noopener"
                  aria-label="Facebook"
                  className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/15"
                >
                  f
                </a>
                <a
                  href="https://www.instagram.com/simonevillarimob/"
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                  className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/15"
                >
                  ◎
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/15 pt-5 text-center text-xs opacity-75">
            © 2026 Villar Imóveis — Todos os direitos reservados.
          </div>
        </div>
      </footer>

      <a
        href={linkZap}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="animate-zap-pulse fixed right-6 bottom-6 z-100 flex size-15 items-center justify-center rounded-full bg-whatsapp text-3xl text-primary-foreground"
      >
        ☎
      </a>
    </div>
  );
}
