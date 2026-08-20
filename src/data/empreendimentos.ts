import fachadaBonfiglioli from "@/assets/emp/fachada-bonfiglioli-anexo.jpg.asset.json";
import bonf1 from "@/assets/emp/bonfiglioli-1_1.jpg.asset.json";
import bonf2 from "@/assets/emp/bonfiglioli-2_1.jpg.asset.json";
import bonf3 from "@/assets/emp/bonfiglioli-3_1.jpg.asset.json";
import bonf4 from "@/assets/emp/bonfiglioli-4_1.jpg.asset.json";
import bonf5 from "@/assets/emp/bonfiglioli-5_1.jpg.asset.json";
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
const fotosCidadeUniv = [univ5.url, univ4.url, univ2.url, univ3.url, univ1.url];
const fotosGiovanni = [gio3.url, gio4.url, gio5.url, gio2.url, gio1.url];
const fotosParqueVilaSonia = [vs2.url, vs3.url, vs4.url, vs5.url, vs1.url];
const fotosEstacaoVilaSonia = [ev3.url, ev4.url, ev5.url, ev2.url, ev1.url];

const drive = (ids: string[]) => ids.map((id) => `https://lh3.googleusercontent.com/d/${id}`);


export const ZONAS = ["Zona Norte", "Zona Sul", "Zona Leste", "Zona Oeste"] as const;
export type Zona = (typeof ZONAS)[number];

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
      "Ao lado do Metrô Campo Limpo e do Shopping Campo Limpo",
      "1 e 2 quartos, com opção de varanda",
      "Piscina, academia, playground e minimercado",
      "Renda até R$ 8 mil e subsídio de até R$ 55.000",
      "Financiamento Caixa em até 420x, com uso do FGTS",
    ],
    fotos: drive([
      "1FBCJQN_sDa2Syu_iKsuIe661Lt1cBLyK",
      "1hT35S7yiEaIiaPHkg2iPCOXr-aKM2dr7",
      "1fJUeTM7xFjYmqL442Ob3lqIdffe-yfdk",
      "1YnW-3T-OEkjmHymMW9AN4BT1Nzhnautt",
      "1KzfPxS-7fiWbkjAeucTDhJjq6-tdR6sV",
    ]),
  },
  {
    nome: "Vibra Sabará",
    zona: "Zona Sul",
    itens: [
      "Zona sul de São Paulo",
      "1 e 2 quartos, com opção de varanda",
      "Piscina, academia e salão de jogos",
      "Renda até R$ 8 mil e subsídio de até R$ 55.000",
      "Financiamento Caixa em até 420x, com uso do FGTS",
    ],
    fotos: drive([
      "11Moj8Axi_Oj-c3flnb-F7vtybXYfNDhY",
      "18Ei6FJYG1CRORVd4SDV56VG-pzTlKOkm",
      "1Wjhq5kzhmJKWHgvq9yRFLsnTQl3jTfC6",
      "1XyFFJtSdGYJ2Bpm5qkCQeU14pcDdZZze",
      "1u7750UcSvyLv8_UTJBXhvOpKIljgDboh",
    ]),
  },
  {
    nome: "Vibra Rio Bonito",
    zona: "Zona Sul",
    itens: [
      "Zona sul de São Paulo",
      "1 e 2 quartos, com opção de varanda",
      "Piscina, academia e salão de festas",
      "Renda até R$ 8 mil e subsídio de até R$ 55.000",
      "Financiamento Caixa em até 420x, com uso do FGTS",
    ],
    fotos: drive([
      "157oXd7NIrrA2dAsQa9UHmsmcZgXyQI12",
      "1x0JaQIJWUhiUq1kNrgnEMMtjrMushqym",
      "1UDDvWsz5PE5L0kB-ZD3pjCMYfrCBJXed",
      "11CYSHrad7zqXxv7FxtcfT9YfDcrsMJaf",
      "18RVAMsmkSsWJO1DgyIEuMLhotol9E6DI",
    ]),
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
    fotos: drive([
      "1CZON3e50yHiI2ZnKBmcyMi0SrSOkJPAM",
      "1Gc21FCmNUiK16mju6hlVUsEpeF_6OSZl",
      "1ZXvY94wvds2EzW_zl6-2GazBKnziDjWv",
      "1RQmWEqiCJZ1eDoiNEh6Aid7mgZPylt0-",
      "1cfk3S2IovzfomLHGCXT8Kv81k6-kRG_X",
    ]),
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
    fotos: drive([
      "1k-dbU7hkw1LQfi79qkd5inDSUWw1pm53",
      "1UiHbEVsnRQpLNv6CYwBS5dsE4UNpRzvn",
      "1v-db6U7xRF0leQqf76EzhwGme1Q81uub",
      "10A-cDzoHTo9qvVyipt1RXP8HMqKyXyBL",
      "1NhsUOqdQeKkAg9khGcpYdoFu59IW44S_",
    ]),
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
    fotos: drive([
      "1M42_liHFkAVRbcPqkM__caGpRpA1LzER",
      "13bVgUKdIe1JC-L2Wm1MMXC64FoCT5TLl",
      "1_p-uu8bmEm_8IbSMXagc6kRkorUJJdY-",
      "15V-F7cGtpTkMCKiuH6zbZKfQjONeSmep",
      "1SifrNaCiTlCF0Tuc4GLFRyP9XZLo3l-G",
    ]),
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
    fotos: drive([
      "1Gx0ko_lrcFPHsoTxQaOF_P3rI2sZhl7R",
      "1XelJXtE75Ete627ozmWXHaaOE7Q7o7EK",
      "1Oso49XoNm9t5b8DFYutVhWl9GMy5_diX",
      "1Gc0UCK_C8lRZa9ZE8MqBhi90Sk148p-E",
      "1wibV7E757Hdjd_420LAjjjmajArsQMXr",
    ]),
  },
  {
    nome: "Vibra Vista Butantã",
    zona: "Zona Oeste",
    itens: [
      "Bairro Butantã, Zona Oeste de São Paulo",
      "1 e 2 quartos, com opção de varanda",
      "Piscina, espaço fitness e salão de festas",
      "Renda até R$ 8 mil e subsídio de até R$ 55.000",
      "Financiamento Caixa em até 420x, com uso do FGTS",
    ],
    fotos: drive([
      "135_DOacO0PoVcZI5RCg5KDowyZHb2HgT",
      "182XIDUGw9eUhxPz4ikGQLXYZjQ_--QeQ",
      "1FrbU04BybmSEWIL-5QqoeopfpCIUlvST",
      "1VUaSicvCK_2RsTMIEeSwnodoS-XM4ptw",
      "16m79k2ebw4Pm_04_98q_JG2_xf0K5kYm",
    ]),
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
      "Vila Formosa, zona leste de São Paulo",
      "1 e 2 quartos, de 26m² a 44m², com varanda",
      "Piscina, academia e salão de festas",
      "Renda até R$ 8 mil e subsídio de até R$ 55.000",
      "Financiamento Caixa em até 420x, com uso do FGTS",
    ],
    fotos: drive([
      "1LpkbZKlGipc_t7sNqmsc63gUQtWWwYs0",
      "1y6z_WYFRGqHkQdyMhoEzfWeNV2Z0YW6x",
      "1b4mBAVFzgmVEGF0oti-1GOr98myr5EVs",
      "1QlPlhQYtBrvUZGmvzJpg_yekrqrL1nRa",
      "1oYy_13pwZ9HBR6Mnm5n1DxGGxQxCvqET",
    ]),
  },
  {
    nome: "Vibra Belenzinho",
    zona: "Zona Leste",
    itens: [
      "No Belenzinho, zona leste de São Paulo",
      "1 e 2 quartos, opção de 2 dorms com 45m²",
      "Piscina, academia e salão de festas",
      "Renda até R$ 8 mil e subsídio de até R$ 55.000",
      "Financiamento Caixa em até 420x, com uso do FGTS",
    ],
    fotos: drive([
      "1Orob85GGLtJJXjjcj2spcStlTYp-6oY0",
      "1oTZAirc3FgJ9ZwtGdf09P1NI6sq8z4qP",
      "1Uy_9BcYf749PqljQHOZpisDgxuGTLk-3",
      "1tYDXN9W6NKtMvE28INByT3LtqFHgoKnA",
      "1GLN3pZyRA4H-ELsuu2-hKzUg_vqLewbk",
    ]),
  },
  {
    nome: "Vibra Mooca",
    zona: "Zona Leste",
    itens: [
      "No bairro da Mooca, zona leste de São Paulo",
      "1 e 2 quartos, com opção de varanda",
      "Piscina, fitness e salão de festas",
      "Renda até R$ 8 mil e subsídio de até R$ 55.000",
      "Financiamento Caixa em até 420x, com uso do FGTS",
    ],
    fotos: drive([
      "1LCi7NusBdEqRTMY-qkSIYnmBsmQhdpPz",
      "1MLvdXFoV2lsiEZnXzGGsauJsvILpzxDJ",
      "1hy6H_Gxpz1-IiTNqP_CD9ro5FJT8zAcy",
      "136D4neHNLHkuLdAKQ7ReS_9uuOwpGlQr",
      "1UIo7PkfNLD5GKL3fEL6Z3tsijLVM3b9S",
    ]),
  },
  {
    nome: "Vibra Conselheiro Carrão",
    zona: "Zona Leste",
    itens: [
      "Vila Carrão, zona leste de São Paulo",
      "1 e 2 quartos, com opção de varanda",
      "Piscina, fitness e salão de festas",
      "Renda até R$ 8 mil e subsídio de até R$ 55.000",
      "Financiamento Caixa em até 420x, com uso do FGTS",
    ],
    fotos: drive([
      "1A3vJl_MDTrMFhjfaPnBNiprjckIFdgec",
      "19bqNrdoDDiMCz4rUgw_y_QBW6PMFrdO5",
      "17mDGg7eNWRvyOqgqDUJf5zhB-EfO8pRc",
      "1Og0i6zLdWt1pEV1QHii4VRPOyuEHfqQ6",
      "1d1js7aHORl9oKyrUZYlx6C1ctRYJAb8G",
    ]),
  },
  {
    nome: "Vibra Parque Vila Prudente",
    zona: "Zona Leste",
    itens: [
      "Vila Prudente, zona leste de São Paulo",
      "1 e 2 quartos, com opção de varanda",
      "Piscina, academia e salão de festas",
      "Renda até R$ 8 mil e subsídio de até R$ 55.000",
      "Financiamento Caixa em até 420x, com uso do FGTS",
    ],
    fotos: drive([
      "1DOO8vYXX7QfKrHk5jId6u_MxodyqkRhz",
      "1rUt6F9zN9YfD5wB35RWlVammsBV64mKE",
      "1EoMDEy9RXNs4Psu-KDd9eZUhf-DjWn5n",
      "10QW0IRZnqEKISvWDQr2THbTHx3PqcMjL",
      "1VTRmtRRPf56Uvq71wN8iY8ickGh0wBsU",
    ]),
  },
  {
    nome: "Vibra Estação Vila Prudente",
    zona: "Zona Leste",
    itens: [
      "Vila Prudente, pertinho do metrô",
      "1 e 2 quartos, com opção de varanda",
      "Piscina, fitness e salão de festas",
      "Renda até R$ 8 mil e subsídio de até R$ 55.000",
      "Financiamento Caixa em até 420x, com uso do FGTS",
    ],
    fotos: drive([
      "1_Vd0qKmaW05yAQ1J9TrIuCGqjy9gIUTd",
      "1914JcATEBQF9i-jPjMgOf4e-wQ2KJYub",
      "1aECuB01GvkC8saTwfPTvlo2i03n9vBQR",
      "1yaua8F18_eGwrKBM9Dl1NzC-wxekYPiO",
      "1g8pAwN6BxKNKPVLU--LAcT7dzpYE0Fcl",
    ]),
  },
];

