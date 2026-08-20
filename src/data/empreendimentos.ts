import fachadaBonfiglioli from "@/assets/emp/fachada-bonfiglioli-anexo.jpg.asset.json";
import bonf1 from "@/assets/emp/bonfiglioli-1_1.jpg.asset.json";
import bonf2 from "@/assets/emp/bonfiglioli-2_1.jpg.asset.json";
import bonf3 from "@/assets/emp/bonfiglioli-3_1.jpg.asset.json";
import bonf4 from "@/assets/emp/bonfiglioli-4_1.jpg.asset.json";
import bonf5 from "@/assets/emp/bonfiglioli-5_1.jpg.asset.json";
import camp1 from "@/assets/emp/campolimpo-1_1.jpg.asset.json";
import camp2 from "@/assets/emp/campolimpo-2_1.jpg.asset.json";
import camp3 from "@/assets/emp/campolimpo-3.jpg.asset.json";
import camp4 from "@/assets/emp/campolimpo-4_1.jpg.asset.json";
import camp5 from "@/assets/emp/campolimpo-5_1.jpg.asset.json";
import univ1 from "@/assets/emp/cidadeuniv-1_1.jpg.asset.json";
import univ2 from "@/assets/emp/cidadeuniv-2_1.jpg.asset.json";
import univ3 from "@/assets/emp/cidadeuniv-3_1.jpg.asset.json";
import univ4 from "@/assets/emp/cidadeuniv-4_1.jpg.asset.json";
import univ5 from "@/assets/emp/cidadeuniv-5_1.jpg.asset.json";
import gio1 from "@/assets/emp/giovanni-1_1.jpg.asset.json";
import gio2 from "@/assets/emp/giovanni-2_1.jpg.asset.json";
import gio3 from "@/assets/emp/giovanni-3_1.jpg.asset.json";
import gio4 from "@/assets/emp/giovanni-4_1.jpg.asset.json";
import gio5 from "@/assets/emp/giovanni-5_1.jpg.asset.json";
import jd1 from "@/assets/emp/joaodias-1_1.jpg.asset.json";
import jd2 from "@/assets/emp/joaodias-2_1.jpg.asset.json";
import jd3 from "@/assets/emp/joaodias-3_1.jpg.asset.json";
import jd4 from "@/assets/emp/joaodias-4_1.jpg.asset.json";
import jd5 from "@/assets/emp/joaodias-5_1.jpg.asset.json";
import vs1 from "@/assets/emp/vilasonia-1_1.jpg.asset.json";
import vs2 from "@/assets/emp/vilasonia-2_1.jpg.asset.json";
import vs3 from "@/assets/emp/vilasonia-3_1.jpg.asset.json";
import vs4 from "@/assets/emp/vilasonia-4_1.jpg.asset.json";
import vs5 from "@/assets/emp/vilasonia-5_1.jpg.asset.json";
import ev1 from "@/assets/emp/vilasoniaestacao-1_1.jpg.asset.json";
import ev2 from "@/assets/emp/vilasoniaestacao-2_1.jpg.asset.json";
import ev3 from "@/assets/emp/vilasoniaestacao-3_1.jpg.asset.json";
import ev4 from "@/assets/emp/vilasoniaestacao-4_1.jpg.asset.json";
import ev5 from "@/assets/emp/vilasoniaestacao-5_1.jpg.asset.json";

export const WHATSAPP = "5511999922344";

export const zap = (texto: string) => `whatsapp://send?phone=${WHATSAPP}&text=${encodeURIComponent(texto)}`;

function urlsFromGlob(modules: Record<string, { default?: { url?: string } }>) {
  return Object.keys(modules)
    .sort()
    .map((key) => modules[key]?.default?.url)
    .filter((url): url is string => Boolean(url));
}

const bookBonfiglioliMods = import.meta.glob<{ default: { url: string } }>(
  "../assets/book/*.asset.json",
  { eager: true },
);
const bookBonfiglioli = urlsFromGlob(bookBonfiglioliMods);

const fotosBonfiglioli = [
  fachadaBonfiglioli.url,
  ...bookBonfiglioli,
  bonf1.url,
  bonf2.url,
  bonf3.url,
  bonf4.url,
  bonf5.url,
];
const fotosCampoLimpo = [camp3.url, camp2.url, camp4.url, camp5.url, camp1.url];
const fotosCidadeUniv = [univ5.url, univ4.url, univ2.url, univ3.url, univ1.url];
const fotosGiovanni = [gio3.url, gio4.url, gio5.url, gio2.url, gio1.url];
const fotosJoaoDias = [jd3.url, jd4.url, jd5.url, jd2.url, jd1.url];
const fotosParqueVilaSonia = [vs2.url, vs3.url, vs4.url, vs5.url, vs1.url];
const fotosEstacaoVilaSonia = [ev3.url, ev4.url, ev5.url, ev2.url, ev1.url];

const bookPaesMods = import.meta.glob<{ default: { url: string } }>(
  "../assets/bookpb/*.asset.json",
  { eager: true },
);
const fotosPaesDeBarros = urlsFromGlob(bookPaesMods);

const bookBelenzinhoMods = import.meta.glob<{ default: { url: string } }>(
  "../assets/bookbz/*.asset.json",
  { eager: true },
);
const fotosBelenzinho = urlsFromGlob(bookBelenzinhoMods);

export type Empreendimento = {
  nome: string;
  destaque?: boolean;
  zona: Zona;
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
  {
    nome: "Vibra Estação Campo Limpo",
    zona: "Zona Sul",
    itens: [
      "Lançamento Vibra Residencial",
      "1 e 2 quartos, com varanda",
      "Piscina, academia e mais",
      "Condomínio fechado com segurança",
    ],
    fotos: fotosCampoLimpo,
  },
  {
    nome: "Vibra Parque Cidade Universitária",
    zona: "Zona Oeste",
    itens: [
      "Lançamento Vibra Residencial",
      "1 e 2 quartos, com varanda",
      "Piscina, academia e mais",
      "Condomínio fechado com segurança",
    ],
    fotos: fotosCidadeUniv,
  },
  {
    nome: "Vibra Parque Vila Sônia",
    zona: "Zona Oeste",
    itens: [
      "5 minutos de ônibus do Metrô Vila Sônia",
      "Perto do Parque Chácara do Jockey",
      "1 e 2 quartos, de 27m² a 41m²",
      "Mais de 10 espaços de lazer",
      "Condomínio fechado, portaria com clausura",
    ],
    fotos: fotosParqueVilaSonia,
  },
  {
    nome: "Vibra João Dias",
    zona: "Zona Sul",
    itens: [
      "7 min do Terminal João Dias, 3 min do Metrô Giovanni Gronchi",
      "Torre única, 358 unidades, condomínio fechado",
      "1 e 2 quartos, com opção de varanda",
      "Piscina, academia, coworking, espaço beleza e pet place",
      "Perto da Av. Giovanni Gronchi e Marginal Pinheiros",
    ],
    fotos: fotosJoaoDias,
  },
  {
    nome: "Vibra Estação Vila Sônia",
    zona: "Zona Oeste",
    itens: [
      "8 minutos a pé do Metrô Vila Sônia",
      "44º lançamento da Vibra na cidade",
      "Zona Oeste de São Paulo",
      "Churrasqueira, salão de festas, salão de jogos e sport bar",
      "Academia, brinquedoteca, playground e pet care",
    ],
    fotos: fotosEstacaoVilaSonia,
  },
  {
    nome: "Vibra Estação Giovanni",
    zona: "Zona Sul",
    itens: [
      "Perto das estações Giovanni Gronchi e Borba Gato (Linha 5-Lilás)",
      "Região do Brooklin / Campo Belo, zona sul de São Paulo",
      "Apartamentos de 1 e 2 quartos, de 26 m² a 42 m²",
      "Subsídio do governo de até R$ 55.000",
      "Financiamento em até 420 vezes, com uso do FGTS",
    ],
    fotos: fotosGiovanni,
  },
  {
    nome: "Vibra Paes de Barros",
    zona: "Zona Leste",
    itens: [
      "No coração da Mooca, na Av. Paes de Barros",
      "1 e 2 quartos, de 26m² a 44m², com varanda",
      "A 7 min da Estação Vila Prudente",
      "Piscina, academia, salão de festas e minimercado",
      "Unidades HIS: ITBI e Registro grátis",
    ],
    fotos: fotosPaesDeBarros,
  },
  {
    nome: "Vibra Belenzinho",
    zona: "Zona Leste",
    itens: [
      "No Belenzinho, zona leste de São Paulo",
      "1 e 2 quartos, com opção de varanda",
      "Perto de metrô, comércio e serviços",
      "Piscina, academia, salão de festas e coworking",
      "Condomínio fechado com segurança",
    ],
    fotos: fotosBelenzinho,
  },
];
