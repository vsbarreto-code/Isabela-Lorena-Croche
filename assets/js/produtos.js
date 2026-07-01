// ============================================================
// PRODUTOS — catálogo exclusivo de bolsas
// Edite aqui os valores exibidos nos cards:
//   preco.pix            -> valor no Pix
//   preco.parcelado      -> valor total parcelado
//   preco.parcelas       -> quantidade de parcelas
//   preco.valorParcela   -> valor de cada parcela
// ============================================================
const whatsappNumber = "5579999999999";

const produtos = [
  {
    id: 1,
    nome: "Bolsa Amarelada",
    descricao:
      "Bolsa de ombro espaçosa com trama elegante. Ideal para o dia a dia, forrada e com acabamento artesanal.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      pix: "R$ 159,90",
      parcelado: "R$ 179,90",
      parcelas: 3,
      valorParcela: "R$ 59,97",
    },
    variantes: [
      {
        corHex: "#F4E5B1",
        corNome: "Café Escuro",
        imagem: "/assets/img/bolsa-amarelada.jpeg",
      },
      // {
      //   corHex: "#440512",
      //   corNome: "Vinho",
      //   imagem: "../img/bolsa-amarelada.jpeg",
      // },
    ],
  },
  {
    id: 2,
    nome: "Bolsa Shopper 'Areia'",
    descricao:
      "Modelo versátil e delicado para compor looks leves. Produção manual com pontos firmes e acabamento cuidadoso.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      pix: "R$ 149,90",
      parcelado: "R$ 169,90",
      parcelas: 3,
      valorParcela: "R$ 56,63",
    },
    variantes: [
      {
        // corHex: "#440512",
        // corNome: "Vinho",
        imagem: "/assets/img/dupla-bolsa-chanel-preto-branco.jpeg",
      },
      {
        corHex: "#D2CDC4",
        corNome: "Café Escuro",
        imagem: "/assets/img/bolsa-chanel-branco.jpeg",
      },
      {
        corHex: "#151517",
        corNome: "Vinho",
        imagem: "/assets/img/bolsa-preta-com-sapato.jpeg",
      },
    ],
  },
  {
    id: 3,
    nome: "Bolsa Mini 'Vinho'",
    descricao:
      "Bolsa compacta para passeios, eventos e composições elegantes. Feita em crochê com toque artesanal premium.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      pix: "R$ 129,90",
      parcelado: "R$ 139,90",
      parcelas: 2,
      valorParcela: "R$ 69,95",
    },
    variantes: [
      {
        corHex: "#64370D",
        corNome: "Vinho",
        imagem: "/assets/img/bolsa-marrom-menor-designer-diferente.jpeg",
      },
      // {
      //   corHex: "#D9CE9E",
      //   corNome: "Café Escuro",
      //   imagem: "./assets/img/bolsa-amarela.jpeg",
      // },
    ],
  },
  {
    id: 4,
    nome: "Bolsa Mini 'Vinho'",
    descricao:
      "Bolsa compacta para passeios, eventos e composições elegantes. Feita em crochê com toque artesanal premium.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      pix: "R$ 129,90",
      parcelado: "R$ 139,90",
      parcelas: 2,
      valorParcela: "R$ 69,95",
    },
    variantes: [
      {
        corHex: "#D60F3E",
        corNome: "Vinho",
        imagem: "/assets/img/bolsa-vermelha-normal.jpeg",
      },
      // {
      //   corHex: "#D9CE9E",
      //   corNome: "Café Escuro",
      //   imagem: "./assets/img/bolsa-amarela.jpeg",
      // },
    ],
  },
  {
    id: 5,
    nome: "Bolsa Mini 'Vinho'",
    descricao:
      "Bolsa compacta para passeios, eventos e composições elegantes. Feita em crochê com toque artesanal premium.",
    destaque: false,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      pix: "R$ 129,90",
      parcelado: "R$ 139,90",
      parcelas: 2,
      valorParcela: "R$ 69,95",
    },
    variantes: [
      {
        corHex: "#14120F",
        corNome: "Vinho",
        imagem: "/assets/img/bolsa-preta-oval.jpeg",
      },
      // {
      //   corHex: "#D9CE9E",
      //   corNome: "Café Escuro",
      //   imagem: "./assets/img/bolsa-amarela.jpeg",
      // },
    ],
  },
];

// Fallbacks por categoria
const fallbacks = {
  Bolsas: [
    "./assets/img/bolsa-amarela.jpeg",
    "./assets/img/bolsa-vermelha.jpeg",
  ],
};

let fallbackCounters = { Bolsas: 0 };

function setProductFallback(imgEl, categoria) {
  const list = fallbacks[categoria] || fallbacks.Bolsas;
  const idx = fallbackCounters[categoria] % list.length;
  fallbackCounters[categoria]++;
  imgEl.src = list[idx];
  imgEl.onerror = null;
}
