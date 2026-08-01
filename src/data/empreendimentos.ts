import fachada from "@/assets/emp-fachada.jpg";
import piscina from "@/assets/emp-piscina.jpg";
import academia from "@/assets/emp-academia.jpg";
import interior from "@/assets/emp-interior.jpg";
import lazer from "@/assets/emp-lazer.jpg";

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

export const WHATSAPP = "5511999922344";

export const zap = (texto: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

export const fotos = [fachada, piscina, academia, interior, lazer];

const fotosBonfiglioli = [bonf1.url, bonf2.url, bonf3.url, bonf4.url, bonf5.url];
const fotosCampoLimpo = [camp3.url, camp2.url, camp4.url, camp5.url, camp1.url];
const fotosCidadeUniv = [univ5.url, univ4.url, univ2.url, univ3.url, univ1.url];
const fotosGiovanni = [gio3.url, gio2.url, gio1.url];

export type Empreendimento = {
  nome: string;
  destaque?: boolean;
  itens: string[];
  fotos: string[];
};

export const empreendimentos: Empreendimento[] = [
  {
    nome: "Vibra Jardim Bonfiglioli",
    destaque: true,
    itens: [
      "Lançamento Vibra Residencial",
      "1 e 2 quartos, com varanda",
      "Piscina, academia, brinquedoteca e mais",
      "Espaço gourmet e churrasqueira",
      "Condomínio fechado com segurança",
    ],
    fotos,
  },
  {
    nome: "Vibra Paes de Barros",
    destaque: true,
    itens: [
      "Lançamento Vibra Residencial",
      "1 e 2 quartos, com varanda",
      "Piscina, academia, coworking e mais",
      "Salão de festas, jogos e playground",
      "Condomínio fechado com segurança",
    ],
    fotos,
  },
  {
    nome: "Vibra Estação Campo Limpo",
    itens: [
      "Lançamento Vibra Residencial",
      "1 e 2 quartos, com varanda",
      "Piscina, academia e mais",
      "Condomínio fechado com segurança",
    ],
    fotos,
  },
  {
    nome: "Vibra Parque Cidade Universitária",
    itens: [
      "Lançamento Vibra Residencial",
      "1 e 2 quartos, com varanda",
      "Piscina, academia e mais",
      "Condomínio fechado com segurança",
    ],
    fotos,
  },
  {
    nome: "Vibra Parque Vila Sônia",
    itens: [
      "5 minutos de ônibus do Metrô Vila Sônia",
      "Perto do Parque Chácara do Jockey",
      "1 e 2 quartos, de 27m² a 41m²",
      "Mais de 10 espaços de lazer",
      "Condomínio fechado, portaria com clausura",
    ],
    fotos,
  },
  {
    nome: "Vibra João Dias",
    itens: [
      "7 min do Terminal João Dias, 3 min do Metrô Giovanni Gronchi",
      "Torre única, 358 unidades, condomínio fechado",
      "1 e 2 quartos, com opção de varanda",
      "Piscina, academia, coworking, espaço beleza e pet place",
      "Perto da Av. Giovanni Gronchi e Marginal Pinheiros",
    ],
    fotos,
  },
  {
    nome: "Vibra Estação Vila Sônia",
    itens: [
      "8 minutos a pé do Metrô Vila Sônia",
      "44º lançamento da Vibra na cidade",
      "Zona Oeste de São Paulo",
      "Churrasqueira, salão de festas, salão de jogos e sport bar",
      "Academia, brinquedoteca, playground e pet care",
    ],
    fotos,
  },
  {
    nome: "Vibra Estação Giovanni",
    itens: [
      "Perto das estações Giovanni Gronchi e Borba Gato (Linha 5-Lilás)",
      "Região do Brooklin / Campo Belo, zona sul de São Paulo",
      "Apartamentos de 1 e 2 quartos, de 26 m² a 42 m²",
      "Subsídio do governo de até R$ 55.000",
      "Financiamento em até 420 vezes, com uso do FGTS",
    ],
    fotos,
  },
];