import { Link } from "@tanstack/react-router";
import { zap } from "@/data/empreendimentos";
import { onClickWhatsApp } from "@/lib/leadWebhook";

const msg = "Olá, vim pelo site da Villar Imóveis e gostaria de mais informações.";

export function SiteFooter() {
  const linkZap = zap(msg);

  return (
    <footer id="contato" className="bg-primary-dark pt-14 pb-6 text-primary-foreground">
      <div className="mx-auto max-w-[1180px] px-5">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr_.9fr]">
          <div>
            <span className="text-2xl leading-tight font-extrabold tracking-tight">
              Villar
              <span className="block text-[11px] font-semibold tracking-[0.25em] opacity-80">IMÓVEIS</span>
            </span>
            <p className="mt-4 text-sm font-bold">Simone Villar — Corretora responsável</p>
            <p className="text-sm opacity-85">CRECI 189.434-F 42581-J</p>
            <p className="mt-3 text-sm opacity-85">
              <a href="tel:+5511999922344" className="hover:underline">
                (11) 9.9992-2344
              </a>
            </p>
            <p className="text-sm opacity-85">
              <a
                href={linkZap}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClickWhatsApp(linkZap, "Rodapé - WhatsApp")}
                className="hover:underline"
              >
                WhatsApp (11) 9.9992-2344
              </a>
            </p>
            <p className="mt-3 text-sm opacity-85">
              Estrada São Francisco, 2008 — São Paulo/SP
            </p>
          </div>

          <div>
            <h3 className="mb-3.5 font-bold">Sobre a Villar / Vibra</h3>
            <p className="text-sm leading-relaxed opacity-85">
              Assessoria especializada em lançamentos Vibra Residencial pelo programa Minha Casa Minha Vida em São
              Paulo. Cuidamos de toda a jornada: simulação gratuita, análise de subsídio e FGTS, escolha do
              empreendimento por zona da cidade e acompanhamento até a entrega das chaves. Atendimento humano,
              transparente e sem compromisso.
            </p>
          </div>

          <div>
            <h3 className="mb-3.5 font-bold">Conheça minhas redes</h3>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/villarcorretoradeimoveis"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                f
              </a>
              <a
                href="https://www.instagram.com/simonevillarimob/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                ◎
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-primary-foreground/15 pt-5 text-sm">
          <Link to="/sobre" className="opacity-85 hover:underline">
            Sobre Nós
          </Link>
          <Link to="/politica-de-privacidade" className="opacity-85 hover:underline">
            Política de Privacidade
          </Link>
          <Link to="/termos" className="opacity-85 hover:underline">
            Termos e Condições
          </Link>
          <Link to="/" hash="simulador" className="opacity-85 hover:underline">
            Cadastro de interesse
          </Link>
          <a
            href={linkZap}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClickWhatsApp(linkZap, "Rodapé - barra de links WhatsApp")}
            className="opacity-85 hover:underline"
          >
            WhatsApp
          </a>
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed opacity-70">
          © 2026 Villar Imóveis — Todos os direitos reservados. As imagens, plantas e perspectivas são meramente
          ilustrativas e podem sofrer alterações. Valores, condições de financiamento, subsídios e parcelas são
          estimativas sujeitas a análise e aprovação de crédito pela instituição financeira, às regras vigentes do
          programa Minha Casa Minha Vida e à disponibilidade de unidades. Este site não constitui oferta ou promessa de
          venda.
        </p>
      </div>
    </footer>
  );
}
