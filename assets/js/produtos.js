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
      "Bolsa artesanal em crochê com alça estruturada, corrente dourada e acabamento delicado. Um modelo elegante para usar do dia a dia aos momentos especiais.",
    descricaoDetalhada:
      "A Bolsa Raíssa foi criada para quem gosta de unir delicadeza, presença e praticidade em uma única peça. Feita artesanalmente em fio de malha, ela tem trama encorpada, visual sofisticado e detalhes dourados que valorizam o acabamento. É uma bolsa versátil, perfeita para compor looks leves, casuais ou mais arrumados, mantendo o charme do feito à mão.",
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
      subtitulo:
        "Uma bolsa artesanal marcante, delicada no visual e cheia de charme nos detalhes.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: " Fio de Malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Produzida artesanalmente em crochê com fio de malha extra premium",
        "Possui duas alças, permitindo versatilidade no uso",
        "Corrente frontal que traz um toque sofisticado (Podendo ser alterado para cor prata)",
        "Tamanho ideal para carregar itens essenciais ",
        "Cores podem ser personalizadas ao seu gosto (Verificar disponibilidade)",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/bolsa-amarelada.jpeg",
        legenda: "Bolsa Raíssa na cor Amarelo Bebê",
      },
      {
        imagem: "./assets/img/bolsa-vermelha-normal.jpeg",
        legenda: "Bolsa Raíssa na cor Pink",
      },
      {
        imagem: "./assets/img/conjunto-4-bolsas-coloridas.jpeg",
        legenda: "Opções de cores disponíveis para encomenda",
      },
    ],
    variantes: [
      {
        corHex:
          "linear-gradient(135deg, #9A9B4F 0%, #F4E5A6 32%, #D60F3E 64%, #B8A7D9 100%)",
        corNome: "Mix",
        imagem: "./assets/img/conjunto-4-bolsas-coloridas.jpeg",
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
        "Produzida artesanalmente em crochê com fio de malha extra premium",
        "Possui duas alças, permitindo versatilidade no uso",
        "Corrente que traz um toque sofisticado (Podendo ser alterado para cor prata)",
        "Tamanho ideal para carregar itens essenciais ",
        "Cores podem ser personalizadas ao seu gosto (Verificar disponibilidade)",
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
        corNome: "Branco",
        imagem: "./assets/img/bolsa-chanel-branco.jpeg",
      },
      {
        corHex: "#151517",
        corNome: "Preto",
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
        "Produzida artesanalmente em crochê com fio náutico",
        "Possui alça em corrente, trazendo um toque de sofisticação e delicadeza (Podendo ser alterado para cor prata)",
        "Tamanho prático para levar o essencial",
        "Cores podem ser personalizadas ao seu gosto (Verificar disponibilidade)",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/bolsa-marrom-designer-diferente-perto.jpeg",
        legenda: "Vista principal na cor Café",
      },
      {
        imagem: "./assets/img/bolsa-marrom-designer-diferente-costa.jpeg",
        legenda: "Vista principal na cor Café",
      },
    ],
    variantes: [
      {
        corHex: "#64370D",
        corNome: "Ferrugem",
        imagem: "./assets/img/bolsa-marrom-menor-designer-diferente.jpeg",
      },
    ],
  },
  {
    id: 4,
    nome: "Bolsa Ines",
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
      material: "Fio de Malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Produzida artesanalmente em crochê com fio de malha extra premium",
        "Design trançado traz um toque de elegância",
        "Tamanho prático para levar o essencial",
        "Cores podem ser personalizadas ao seu gosto (Verificar disponibilidade)",
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
        corNome: "Preto",
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
      material: "Fio de malha",
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
        imagem: "//assets/img/bolsa-oval-lateral-vermelha.jpeg",
        legenda: "Vista principal na cor Café Intenso",
      },
    ],
    variantes: [
      {
        corHex: "#F17805",
        corNome: "Ferrugem",
        imagem: "./assets/img/bolsa-oval-lateral-laranja.jpeg",
      },
      {
        corHex: "#FB0046",
        corNome: "Pink",
        imagem: "./assets/img/bolsa-oval-lateral-vermelha.jpeg",
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
