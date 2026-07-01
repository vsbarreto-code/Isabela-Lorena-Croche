// ============================================================
// PRODUTOS — catálogo exclusivo de bolsas
// ============================================================
// Como usar a página individual:
// - Cada produto precisa ter um id único.
// - O botão "Ver detalhes" abre: produto.html?id=ID_DO_PRODUTO.
// - Para adicionar mais fotos na página individual, preencha o campo galeria.
// - O campo variantes continua sendo usado para trocar as cores nos cards.
// ============================================================
const whatsappNumber = "5579999999999";

const produtos = [
  {
    id: 1,
    nome: "Bolsa Raíssa",
    descricao:
      "Bolsa de ombro espaçosa com trama elegante. Ideal para o dia a dia, forrada e com acabamento artesanal.",
    descricaoDetalhada:
      "Uma bolsa artesanal pensada para acompanhar a rotina com elegância, leveza e presença. O modelo tem visual delicado, acabamento manual e combina muito bem com looks neutros, casuais e produções mais arrumadas.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      pix: "R$ 159,90",
      parcelado: "R$ 179,90",
      parcelas: 3,
      valorParcela: "R$ 59,97",
    },
    detalhes: {
      subtitulo: "Modelo espaçoso, delicado e perfeito para o dia a dia.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: " Fio de Malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Trama artesanal com acabamento cuidadoso",
        "Boa capacidade para itens essenciais do dia a dia",
        "Pode ser encomendada em outras cores disponíveis",
        "Atendimento local em Aracaju, SE",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/bolsa-amarelada.jpeg",
        legenda: "Vista principal da bolsa na cor Baunilha",
      },
      {
        imagem: "./assets/img/bolsa-vermelha-normal.jpeg",
        legenda: "Variação na cor Cereja",
      },
      // Para adicionar mais fotos desse produto, copie este formato:
      // { imagem: "./assets/img/nome-da-foto.jpeg", legenda: "Detalhe da alça" },
    ],
    variantes: [
      {
        corHex:
          "linear-gradient(135deg, #9A9B4F 0%, #F4E5A6 32%, #D60F3E 64%, #B8A7D9 100%)",
        corNome: "Mix",
        imagem: "/assets/img/conjunto-4-bolsas-coloridas.jpeg",
      },
      {
        corHex: "#F4E5B1",
        corNome: "Amarelo Bebê",
        imagem: "./assets/img/bolsa-amarelada.jpeg",
      },
      {
        corHex: "#D60F3E",
        corNome: "Pink",
        imagem: "./assets/img/bolsa-vermelha-normal.jpeg",
      },
    ],
  },
  {
    id: 2,
    nome: "Bolsa Ryzia",
    descricao:
      "Modelo versátil e delicado para compor looks leves. Produção manual com pontos firmes e acabamento cuidadoso.",
    descricaoDetalhada:
      "Uma opção elegante para quem gosta de uma bolsa com presença, mas sem perder a leveza artesanal. O design combina com produções casuais, passeios e ocasiões especiais.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      pix: "R$ 149,90",
      parcelado: "R$ 169,90",
      parcelas: 3,
      valorParcela: "R$ 56,63",
    },
    detalhes: {
      subtitulo: "Versátil, moderna e fácil de combinar.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Crochê artesanal com acabamento premium",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Modelo sofisticado para diferentes ocasiões",
        "Acabamento manual ponto a ponto",
        "Opções de cores para combinar com o seu estilo",
        "Ideal para presentear ou usar em ocasiões especiais",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/dupla-bolsa-chanel-preto-branco.jpeg",
        legenda: "Composição com duas opções de cor",
      },
      {
        imagem: "./assets/img/bolsa-chanel-branco.jpeg",
        legenda: "Modelo claro em tom Linho",
      },
      {
        imagem: "./assets/img/bolsa-preta-com-sapato.jpeg",
        legenda: "Versão Preto Noite em composição elegante",
      },
    ],
    variantes: [
      {
        corHex: "#D2CDC4",
        corNome: "Linho",
        imagem: "./assets/img/bolsa-chanel-branco.jpeg",
      },
      {
        corHex: "#151517",
        corNome: "Preto Noite",
        imagem: "./assets/img/bolsa-preta-com-sapato.jpeg",
      },
    ],
  },
  {
    id: 3,
    nome: "Bolsa Raimunda",
    descricao:
      "Bolsa compacta para passeios, eventos e composições elegantes. Feita em crochê com toque artesanal premium.",
    descricaoDetalhada:
      "Compacta, charmosa e elegante. Essa bolsa é ideal para quem quer carregar o essencial com estilo, valorizando uma peça artesanal com acabamento delicado.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      pix: "R$ 129,90",
      parcelado: "R$ 139,90",
      parcelas: 2,
      valorParcela: "R$ 69,95",
    },
    detalhes: {
      subtitulo:
        "Compacta e elegante para eventos, passeios e looks especiais.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio Náutico",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Tamanho prático para levar o essencial",
        "Visual elegante para composições mais arrumadas",
        "Peça artesanal com acabamento delicado",
        "Possibilidade de encomenda em outras cores",
      ],
    },
    galeria: [
      {
        imagem: "/assets/img/bolsa-marrom-designer-diferente-perto.jpeg",
        legenda: "Vista principal na cor Café",
      },
      {
        imagem: "/assets/img/bolsa-marrom-designer-diferente-costa.jpeg",
        legenda: "Vista principal na cor Café",
      },
    ],
    variantes: [
      {
        corHex: "#64370D",
        corNome: "Café",
        imagem: "/assets/img/bolsa-marrom-menor-designer-diferente.jpeg",
      },
    ],
  },
  {
    id: 4,
    nome: "Bolsa Mini 'Noite'",
    descricao:
      "Bolsa compacta para passeios, eventos e composições elegantes. Feita em crochê com toque artesanal premium.",
    descricaoDetalhada:
      "Um modelo compacto em tom escuro, com visual marcante e sofisticado. Ideal para quem busca uma bolsa artesanal discreta, elegante e fácil de usar em diferentes produções.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      pix: "R$ 129,90",
      parcelado: "R$ 139,90",
      parcelas: 2,
      valorParcela: "R$ 69,95",
    },
    detalhes: {
      subtitulo: "Clássica, compacta e sofisticada.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Crochê artesanal com estrutura firme",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Cor escura fácil de combinar",
        "Design compacto e elegante",
        "Acabamento artesanal feito com cuidado",
        "Boa escolha para eventos e uso casual chic",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/bolsa-preta-oval.jpeg",
        legenda: "Vista principal na cor Café Intenso",
      },
    ],
    variantes: [
      {
        corHex: "#14120F",
        corNome: "Café Intenso",
        imagem: "./assets/img/bolsa-preta-oval.jpeg",
      },
    ],
  },
  {
    id: 5,
    nome: "Bolsa Eliza",
    descricao:
      "Bolsa compacta para passeios, eventos e composições elegantes. Feita em crochê com toque artesanal premium.",
    descricaoDetalhada:
      "Um modelo compacto em tom escuro, com visual marcante e sofisticado. Ideal para quem busca uma bolsa artesanal discreta, elegante e fácil de usar em diferentes produções.",
    destaque: false,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      pix: "R$ 129,90",
      parcelado: "R$ 139,90",
      parcelas: 2,
      valorParcela: "R$ 69,95",
    },
    detalhes: {
      subtitulo: "Clássica, compacta e sofisticada.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Crochê artesanal com estrutura firme",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Cor escura fácil de combinar",
        "Design compacto e elegante",
        "Acabamento artesanal feito com cuidado",
        "Boa escolha para eventos e uso casual chic",
      ],
    },
    galeria: [
      {
        imagem: "/assets/img/bolsa-oval-lateral-vermelha.jpeg",
        legenda: "Vista principal na cor Café Intenso",
      },
    ],
    variantes: [
      {
        corHex: "#F17805",
        corNome: "Café Intenso",
        imagem: "/assets/img/bolsa-oval-lateral-laranja.jpeg",
      },
      {
        corHex: "#FB0046",
        corNome: "Café Intenso",
        imagem: "/assets/img/bolsa-oval-lateral-vermelha.jpeg",
      },
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
