// ============================================================
// PRODUTOS — catálogo exclusivo de bolsas
// ============================================================
// Como usar a página individual:
// - Cada produto precisa ter um id único.
// - O botão "Ver detalhes" abre: produto.html?id=ID_DO_PRODUTO.
// - imagemCapa aparece apenas nos cards da home/catálogo.
// - galeria aparece apenas na página individual do produto.
// - variantes continua sendo usado para trocar as cores nos cards e na página individual.
// ============================================================
const whatsappNumber = "5579999802943";

const produtos = [
  {
    id: 1,
    nome: "Bolsa Raíssa",
    imagemCapa: "./assets/img/conjunto-4-bolsas-coloridas.jpeg",
    descricao:
      "Bolsa artesanal em crochê com alça estruturada, corrente dourada e acabamento delicado. Um modelo elegante para usar do dia a dia aos momentos especiais.",
    descricaoDetalhada:
      "A Bolsa Raíssa foi criada para quem gosta de unir delicadeza, presença e praticidade em uma única peça. Feita artesanalmente em fio de malha, ela tem trama encorpada, visual sofisticado e detalhes dourados que valorizam o acabamento. É uma bolsa versátil, perfeita para compor looks leves, casuais ou mais arrumados, mantendo o charme do feito à mão.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      pix: "R$ 150,00",
      parcelado: "R$ 159,73",
      parcelas: 2,
      valorParcela: "R$ 79,86",
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
    ],
    variantes: [
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
    imagemCapa: "./assets/img/bolsa-preta-com-sapato.jpeg",
    descricao:
      "Bolsa artesanal em crochê com design estruturado, alça de mão e corrente. Elegante, versátil e perfeita para compor looks casuais ou mais sofisticados.",
    descricaoDetalhada:
      "A Bolsa Ryzia une o charme do crochê artesanal com um visual moderno e marcante. Seu formato estruturado traz presença ao look, enquanto a corrente dourada adiciona um toque delicado de sofisticação. É uma peça versátil, ideal para usar em passeios, encontros, eventos leves ou produções mais elegantes.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      pix: "R$ 170,00",
      parcelado: "R$ 181,03",
      parcelas: 2,
      valorParcela: "R$ 90,52",
    },
    detalhes: {
      subtitulo:
        "Uma bolsa artesanal moderna, estruturada e fácil de combinar.",
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
        legenda: "Ryzia em duas versões clássicas",
      },
      {
        imagem: "./assets/img/bolsa-chanel-branco.jpeg",
        legenda: "Versão Branco para produções leves",
      },
      {
        imagem: "./assets/img/bolsa-preta-com-sapato.jpeg",
        legenda: "Versão Preto em look elegante",
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
    imagemCapa: "./assets/img/bolsa-marrom-menor-designer-diferente.jpeg",
    descricao:
      "Bolsa compacta para passeios, eventos e composições elegantes. Feita em crochê com toque artesanal premium.",
    descricaoDetalhada:
      "Compacta, charmosa e elegante. Essa bolsa é ideal para quem quer carregar o essencial com estilo, valorizando uma peça artesanal com acabamento delicado.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      pix: "R$ 160,00",
      parcelado: "R$ 170,38",
      parcelas: 2,
      valorParcela: "R$ 85,19",
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
        legenda: "Raimunda em tom Ferrugem",
      },
      {
        imagem: "./assets/img/bolsa-marrom-designer-diferente-costa.jpeg",
        legenda: "Detalhe da textura artesanal",
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
    nome: "Bolsa Inês",
    imagemCapa: "./assets/img/bolsa-preta-oval.jpeg",
    descricao:
      "Bolsa compacta para passeios, eventos e composições elegantes. Feita em crochê com toque artesanal premium.",
    descricaoDetalhada:
      "Um modelo compacto em tom escuro, com visual marcante e sofisticado. Ideal para quem busca uma bolsa artesanal discreta, elegante e fácil de usar em diferentes produções.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      pix: "R$ 145,90",
      parcelado: "R$ 154,41",
      parcelas: 2,
      valorParcela: "R$ 77,20",
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
        legenda: "Vista principal na cor Preta",
      },
      {
        imagem: "/assets/img/bolsa-preta-oval-2.jpeg",
        legenda: "Bolsa Raimunda Preta em composição lifestyle",
      },
      {
        imagem: "/assets/img/bolsa-preta-oval-3.jpeg",
        legenda: "Vista frontal da Bolsa Raimunda na cor Preta",
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
    imagemCapa: "./assets/img/bolsa-oval-lateral-laranja.jpeg",
    descricao:
      "Bolsa compacta para passeios, eventos e composições elegantes. Feita em crochê com toque artesanal premium.",
    descricaoDetalhada:
      "Um modelo compacto em tom escuro, com visual marcante e sofisticado. Ideal para quem busca uma bolsa artesanal discreta, elegante e fácil de usar em diferentes produções.",
    destaque: false,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      pix: "R$ 160,00",
      parcelado: "R$ 170,38",
      parcelas: 2,
      valorParcela: "R$ 85,19",
    },
    detalhes: {
      subtitulo: "Clássica, compacta e sofisticada.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio de malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Produzida com fio de malha extra premium",
        "Design trançado combina perfeitamente o sofisticado com o moderno",
        "Correntes podem ser personalizadas (Dourado ou prata)",
        "Cores podem ser personalizadas ao seu gosto (Verificar disponibilidade)",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/bolsa-oval-lateral-vermelha.jpeg",
        legenda: "Vista principal na cor Pink",
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
  {
    id: 6,
    nome: "Bolsa Aurora",
    imagemCapa: "/assets/img/bolsa-aurora.jpeg",
    descricao:
      "Bolsa artesanal em crochê com alça estruturada, corrente dourada e acabamento delicado. Um modelo elegante para usar do dia a dia aos momentos especiais.",
    descricaoDetalhada:
      "A Bolsa Raíssa foi criada para quem gosta de unir delicadeza, presença e praticidade em uma única peça. Feita artesanalmente em fio de malha, ela tem trama encorpada, visual sofisticado e detalhes dourados que valorizam o acabamento. É uma bolsa versátil, perfeita para compor looks leves, casuais ou mais arrumados, mantendo o charme do feito à mão.",
    destaque: false,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      pix: "R$ 145,00",
      parcelado: "R$ 154,41",
      parcelas: 2,
      valorParcela: "R$ 77,20",
    },
    detalhes: {
      subtitulo: "Clássica, compacta e sofisticada.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio de malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Produzida artesanalmente em crochê com fio de malha extra premium",
        "Possui duas alças, permitindo versatilidade e sofisticação no uso (Podendo ser alteradas para cor prata)",
        "Corrente que traz um toque sofisticado",
        "Tamanho ideal para carregar itens essenciais",
        "Cores podem ser personalizadas ao seu gosto (Verificar disponibilidade)",
      ],
    },
    galeria: [
      {
        imagem: "/assets/img/bolsa-aurora.jpeg",
        legenda: "Vista principal na cor Lilas",
      },
    ],
    variantes: [
      {
        corHex: "#A98BDA",
        corNome: "Lilás",
        imagem: "/assets/img/bolsa-aurora.jpeg",
      },
      // {
      //   corHex: "#FB0046",
      //   corNome: "Pink",
      //   imagem: "./assets/img/bolsa-oval-lateral-vermelha.jpeg",
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
