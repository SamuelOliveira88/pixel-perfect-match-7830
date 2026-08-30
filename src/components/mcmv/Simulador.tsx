import { useMemo, useState } from "react";
import { zap } from "@/data/empreendimentos";
import { onClickWhatsApp } from "@/lib/leadWebhook";

const PRAZO_MESES = 360;
const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function Slider({
  label,
  valor,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  valor: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="mb-7">
      <div className="mb-2.5 text-base">
        {label} <b className="text-brand-blue">{valor}</b>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-brand-blue"
        aria-label={label}
      />
    </div>
  );
}

export function Simulador() {
  const [imovel, setImovel] = useState(220000);
  const [entrada, setEntrada] = useState(34200);
  const [fgts, setFgts] = useState(71000);
  const [taxa, setTaxa] = useState(8);

  const { financiado, parcela, entradaAjustada } = useMemo(() => {
    let en = entrada;
    let fg = fgts;
    if (en + fg > imovel) en = Math.max(0, en - (en + fg - imovel));
    const fin = Math.max(0, imovel - en - fg);
    const i = taxa / 100 / 12;
    const p = i === 0 ? fin / PRAZO_MESES : (fin * i) / (1 - Math.pow(1 + i, -PRAZO_MESES));
    return { financiado: fin, parcela: p, entradaAjustada: en };
  }, [imovel, entrada, fgts, taxa]);

  return (
    <div className="grid overflow-hidden rounded-[20px] bg-card shadow-[0_15px_40px_rgba(0,0,0,.12)] md:grid-cols-[1.3fr_1fr]">
      <div className="p-8 md:p-10">
        <Slider
          label="Valor do imóvel:"
          valor={fmt(imovel)}
          min={100000}
          max={500000}
          step={5000}
          onChange={setImovel}
        />
        <Slider
          label="Entrada:"
          valor={fmt(entradaAjustada)}
          min={0}
          max={200000}
          step={500}
          onChange={setEntrada}
        />
        <Slider
          label="FGTS disponível:"
          valor={fmt(fgts)}
          min={0}
          max={150000}
          step={500}
          onChange={setFgts}
        />
        <Slider
          label="Taxa de juros estimada:"
          valor={`${taxa.toFixed(2)}% a.a.`}
          min={6}
          max={12}
          step={0.1}
          onChange={setTaxa}
        />
      </div>

      <div className="flex flex-col bg-brand-blue p-8 text-primary-foreground md:p-9">
        <div className="mb-2 text-xs tracking-[1.5px] text-primary-foreground/70">
          PARCELA ESTIMADA
        </div>
        <p className="mb-1 text-[2.6rem] leading-none font-extrabold">
          {fmt(Math.round(parcela))}
        </p>
        <div className="mb-5 text-xs text-primary-foreground/70">Sujeito a Análise de Crédito</div>

        {[
          ["Valor financiado", fmt(financiado)],
          ["Entrada", fmt(entradaAjustada)],
          ["FGTS", fmt(fgts)],
          ["Taxa de juros", `${taxa.toFixed(2)}% a.a.`],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex items-center justify-between border-t border-primary-foreground/20 py-3 text-sm"
          >
            <span className="text-primary-foreground/70">{k}</span>
            <span className="font-bold">{v}</span>
          </div>
        ))}

        <a
          className="btn-base mt-6 w-full bg-primary font-bold text-primary-foreground hover:-translate-y-0.5"
          target="_blank"
          rel="noopener"
          href={zap("Olá, fiz uma simulação no site e quero falar com um consultor.")}
          onClick={onClickWhatsApp(
            zap("Olá, fiz uma simulação no site e quero falar com um consultor."),
            "Simulador - Falar com consultor",
          )}
        >
          Falar com consultor
        </a>
      </div>
    </div>
  );
}