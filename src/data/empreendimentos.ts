import fachadaBonfiglioli from "@/assets/emp/fachada-bonfiglioli-anexo.jpg.asset.json";
import bonf1 from "@/assets/emp/bonfiglioli-1_1.jpg.asset.json";
import bonf2 from "@/assets/emp/bonfiglioli-2_1.jpg.asset.json";
import bonf3 from "@/assets/emp/bonfiglioli-3_1.jpg.asset.json";
import bonf4 from "@/assets/emp/bonfiglioli-4_1.jpg.asset.json";
import bonf5 from "@/assets/emp/bonfiglioli-5_1.jpg.asset.json";

export const WHATSAPP = "5511999922344";

export const zap = (texto: string) => `whatsapp://send?phone=${WHATSAPP}&text=${encodeURIComponent(texto)}`;

const bookBonfiglioliMods = import.meta.glob<{ default: { url: string } }>(
  "../assets/book/*.asset.json",
  { eager: true },
);
const bookBonfiglioli = Object.keys(bookBonfiglioliMods)
  .sort()
  .map((k) => bookBonfiglioliMods[k]?.default.url)
  .filter((url): url is string => Boolean(url));

const fotosBonfiglioli = [
  fachadaBonfiglioli.url,
  ...bookBonfiglioli,
  bonf1.url,
  bonf2.url,
  bonf3.url,
  bonf4.url,
  bonf5.url,
];

export type Empreendimento = {
  nome: string;
  destaque?: boolean;
  zona: "Zona Sul" | "Zona Oeste" | "Zona Leste";
  itens: string[];
  fotos: string[];
};

export const empreendimentos: Empreendimento[] = [
  {
    nome: "Vibra Jardim Bonfiglioli",
    destaque: true,
    zona: "Zona Oeste",
    itens: [
      "Lançamento Vibra Residencial",
      "1 e 2 quartos, com varanda",
      "Piscina, academia, brinquedoteca e mais",
      "Espaço gourmet e churrasqueira",
      "Condomínio fechado com segurança",
    ],
    fotos: fotosBonfiglioli,
  },
];
