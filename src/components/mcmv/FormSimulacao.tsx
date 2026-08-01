import { useState } from "react";
import { zap } from "@/data/empreendimentos";

const campo =
  "w-full rounded-[10px] border border-[#2a3550] bg-[#16213e] px-4 py-3.5 text-base text-[#eef2fb] outline-none placeholder:text-[#7e8aaa] focus:border-accent focus:ring-3 focus:ring-accent/25";

export function FormSimulacao() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [renda, setRenda] = useState("");
  const [fgts, setFgts] = useState("");
  const [planta, setPlanta] = useState("");

  let texto = `Olá, meu nome é ${nome}. Vi o site MCMV e quero saber mais.\nTelefone: ${telefone}\nFaixa de renda: ${renda}\nPossui FGTS: ${fgts}`;
  if (planta) texto += `\nPlanta de interesse: ${planta}`;

  return (
    <div
      id="simule"
      className="mx-auto w-full max-w-[460px] rounded-[20px] border border-[#1a2848] bg-[#0f1729] p-7 shadow-[0_15px_40px_rgba(0,0,0,.25)]"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = zap(texto);
        }}
        className="space-y-5"
      >
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

        <button
          type="submit"
          className="w-full rounded-[10px] bg-accent-dark p-4 text-base font-bold text-primary-foreground transition-colors hover:bg-accent"
        >
          Quero saber mais
        </button>
      </form>
    </div>
  );
}