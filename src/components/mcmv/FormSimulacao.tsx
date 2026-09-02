import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";

const campo =
  "w-full rounded-[10px] border border-[#40507a] bg-[#27385f] px-4 py-3.5 text-base text-[#eef2fb] outline-none placeholder:text-[#7e8aaa] focus:border-accent focus:ring-3 focus:ring-accent/25";

const webhookUrl =
  "https://app.imobilead.me/integrate-api/integracoes/webhook/b4e6bc52719b82d65abba587573399ad/";

export function FormSimulacao() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [renda, setRenda] = useState("");
  const [fgts, setFgts] = useState("");
  const [planta, setPlanta] = useState("");
  const [consentimento, setConsentimento] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  async function enviarFormulario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consentimento) {
      setErro("É necessário aceitar a Política de Privacidade para enviar seus dados.");
      return;
    }
    setEnviando(true);
    setErro("");

    try {
      const resposta = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          telefone: telefone.trim(),
          email: email.trim(),
          renda_familiar: renda,
          fgts,
          planta_interesse: planta,
          consentimento_lgpd: true,
          consentimento_data: new Date().toISOString(),
        }),
      });

      if (!resposta.ok) {
        throw new Error("Não foi possível confirmar o envio.");
      }

      const googleTag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
      googleTag?.("event", "conversion", {
        send_to: "AW-18250677459/ZGpkCNCN-NEcENP5zP5D",
      });
      setEnviado(true);
    } catch {
      setErro("Não foi possível enviar seus dados agora. Tente novamente em instantes.");
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div
        id="simule"
        role="status"
        className="mx-auto w-full max-w-[460px] rounded-[20px] border border-[#33456f] bg-[#1d2b4a] p-7 text-center shadow-[0_15px_40px_rgba(0,0,0,.25)]"
      >
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-accent text-2xl font-bold text-accent-foreground">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h2 className="mb-2 text-xl font-bold text-[#f2f2f0]">Recebemos seus dados!</h2>
        <p className="text-sm leading-relaxed text-[#d5dbee]">
          Obrigado pelo contato. Nossa equipe analisará seu perfil e falará com você em breve.
        </p>
      </div>
    );
  }

  return (
    <div
      id="simule"
      className="mx-auto w-full max-w-[460px] rounded-[20px] border border-[#33456f] bg-[#1d2b4a] p-7 shadow-[0_15px_40px_rgba(0,0,0,.25)]"
    >
      <form onSubmit={enviarFormulario} className="space-y-5">
        <div>
          <label htmlFor="nome" className="mb-2.5 block text-sm font-semibold text-[#f2f2f0]">
            Nome completo <span className="text-[#d99a3d]">*</span>
          </label>
          <input
            id="nome"
            className={campo}
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="telefone" className="mb-2.5 block text-sm font-semibold text-[#f2f2f0]">
            Telefone / WhatsApp <span className="text-[#d99a3d]">*</span>
          </label>
          <input
            id="telefone"
            type="tel"
            placeholder="(11) 99999-9999"
            className={campo}
            required
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2.5 block text-sm font-semibold text-[#f2f2f0]">
            E-mail <span className="text-[#d99a3d]">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="voce@email.com"
            className={campo}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="renda" className="mb-2.5 block text-sm font-semibold text-[#f2f2f0]">
            Renda familiar <span className="text-[#d99a3d]">*</span>
          </label>
          <select
            id="renda"
            className={campo}
            required
            value={renda}
            onChange={(e) => setRenda(e.target.value)}
          >
            <option value="" disabled>
              Selecione a faixa
            </option>
            <option>Até R$ 2.850</option>
            <option>R$ 2.850 a R$ 4.700</option>
            <option>R$ 4.700 a R$ 8.600</option>
            <option>Acima de R$ 8.600</option>
          </select>
        </div>

        <div>
          <span className="mb-2.5 block text-sm font-semibold text-[#f2f2f0]">
            Possui FGTS? <span className="text-[#d99a3d]">*</span>
          </span>
          <div className="flex gap-7">
            {["Sim", "Não"].map((v) => (
              <label
                key={v}
                className="flex cursor-pointer items-center gap-2.5 text-base text-[#f2f2f0]"
              >
                <input
                  type="radio"
                  name="fgts"
                  value={v}
                  required
                  checked={fgts === v}
                  onChange={() => setFgts(v)}
                  className="size-5 accent-accent"
                />
                {v}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="planta" className="mb-2.5 block text-sm font-semibold text-[#f2f2f0]">
            Planta de interesse <span className="font-normal text-[#b9bdb8]">(opcional)</span>
          </label>
          <select
            id="planta"
            className={`${campo} border-[#d99a3d]`}
            value={planta}
            onChange={(e) => setPlanta(e.target.value)}
          >
            <option value="">Selecione uma metragem</option>
            <option>26 m² · 1 quarto com varanda</option>
            <option>34 m² · 2 quartos</option>
            <option>37 m² · 2 quartos com terraço</option>
            <option>39 m² · 2 quartos com varanda</option>
            <option>42 m² · 2 quartos com varanda</option>
          </select>
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#d5dbee]">
          <input
            type="checkbox"
            required
            checked={consentimento}
            onChange={(e) => setConsentimento(e.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-accent"
          />
          <span>
            Li e concordo com a{" "}
            <Link to="/politica-de-privacidade" className="font-semibold text-accent underline">
              Política de Privacidade
            </Link>{" "}
            e autorizo o uso dos meus dados para contato sobre este e outros imóveis.
          </span>
        </label>

        {erro && (
          <p role="alert" className="text-sm font-medium text-[#ffc8b8]">
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando || !consentimento}
          className="w-full rounded-[10px] bg-accent p-4 text-base font-bold text-accent-foreground transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {enviando ? "Enviando..." : "Quero saber mais"}
        </button>
      </form>
    </div>
  );
}
