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
const fiosDisponiveis = [
  {
    id: "fio-nautico",
    nome: "Fio Náutico",
    cores: [
      { id: "chocolate", nome: "Chocolate", corHex: "#4F3736" },
      { id: "rosa-bebe", nome: "Rosa Bebê", corHex: "#DD7298" },
      { id: "verde-jade", nome: "Verde Jade", corHex: "#238E8E" },
      { id: "champagne", nome: "Champagne", corHex: "#E3BA4C" },
      { id: "rose-gold", nome: "Rose Gold", corHex: "#E8C6AD" },
      { id: "amora", nome: "Amora", corHex: "#7B2F4E" },
      { id: "verde-bandeira", nome: "Verde Bandeira", corHex: "#1F765F" },
      { id: "caqui", nome: "Caqui", corHex: "#756354" },
      { id: "azul-marinho", nome: "Azul Marinho", corHex: "#173B83" },
      { id: "colorau", nome: "Colorau", corHex: "#94312B" },
      { id: "lilas", nome: "Lilás", corHex: "#C587E6" },
      { id: "sangria", nome: "Sangria", corHex: "#B42A24" },
      { id: "ferrugem", nome: "Ferrugem", corHex: "#D8733A" },
    ],
  },
  {
    id: "fio-malha",
    nome: "Fio de Malha",
    cores: [
      {
        id: "branco",
        nome: "Branco",
        corHex: "#F8F8F4",
        borda: "#9B8D7E",
      },
      { id: "pink", nome: "Pink", corHex: "#EF2F5A" },
      { id: "ferrugem", nome: "Ferrugem", corHex: "#D8733A" },
      { id: "preto", nome: "Preto", corHex: "#1D1C21" },
      { id: "lilas", nome: "Lilás", corHex: "#D8B9E6" },
      {
        id: "amarelo-bebe",
        nome: "Amarelo Bebê",
        corHex: "#FFF6D1",
        borda: "#9B8D7E",
      },
      { id: "mango", nome: "Mango", corHex: "#FFA33C" },
      { id: "marrom", nome: "Marrom", corHex: "#865448" },
      { id: "esmeralda", nome: "Esmeralda", corHex: "#0B6763" },
      { id: "marsala", nome: "Marsala", corHex: "#A52122" },
      {
        id: "verde-hortela",
        nome: "Verde Hortelã",
        corHex: "#D5E8DE",
        borda: "#9B8D7E",
      },
      { id: "babaloo", nome: "Babaloo", corHex: "#F15288" },
      { id: "verde-musgo", nome: "Verde Musgo", corHex: "#43451E" },
    ],
  },
];

const produtos = [
  {
    id: 1,
    nome: "Bolsa Raíssa",
    imagemCapa: "./assets/img/bolsaRaissa/bolsa-raissa-capa.jpeg",
    descricao:
      "Bolsa artesanal em crochê com alça estruturada, corrente dourada e acabamento delicado.",
    descricaoDetalhada:
      "A Bolsa Raíssa foi criada para quem gosta de unir delicadeza, presença e praticidade em uma única peça.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      promocaoAtiva: false,
      precoOriginal: "R$ 150,00",
      pix: "R$ 150,00",
      parcelado: "R$ 159,73",
      parcelas: 2,
      valorParcela: "R$ 79,86",
    },
    detalhes: {
      subtitulo:
        "Uma bolsa artesanal marcante, delicada no visual e cheia de charme nos detalhes.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio de Malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Produzida artesanalmente em crochê com fio de malha extra premium",
        "Possui duas alças, permitindo versatilidade no uso",
        "Você pode escolher entre dois designs (corrente frontal ou lateral)",
        "Tamanho ideal para carregar itens essenciais",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/bolsaRaissa/bolsa-raissa-2.jpeg",
        legenda: "Bolsa Raíssa na cor Amarelo Bebê",
      },
      {
        imagem: "./assets/img/bolsaRaissa/bolsa-raissa-3.jpeg",
        legenda: "Bolsa Raíssa na cor Pink",
      },
      {
        imagem: "./assets/img/bolsaRaissa/bolsa-raissa-1.jpeg",
        legenda: "Bolsa Raíssa na cor Verde Musgo",
      },
    ],

    variantes: [
      {
        fioId: "fio-malha",
        corId: "amarelo-bebe",
        corHex: "#FFF6D1",
        corNome: "Amarelo Bebê",
        imagem: "./assets/img/bolsaRaissa/bolsa-raissa-2.jpeg",
      },
      {
        fioId: "fio-malha",
        corId: "pink",
        corHex: "#EF2F5A",
        cornome: "Pink",
        imagem: "./assets/img/bolsaRaissa/bolsa-raissa-3.jpeg",
      },
      {
        fioId: "fio-malha",
        corId: "verde-musgo",
        corHex: "#43451E",
        cornome: "Verde Musgo",
        imagem: "./assets/img/bolsaRaissa/bolsa-raissa-1.jpeg",
      },
    ],

    opcoesProducao: [
      {
        fioId: "fio-malha",
        cores: [
          {
            corId: "branco",
            disponivel: true,
          },
          {
            corId: "pink",
            disponivel: true,
          },
          {
            corId: "ferrugem",
            disponivel: true,
          },
          {
            corId: "preto",
            disponivel: true,
          },
          {
            corId: "lilas",
            disponivel: true,
          },
          {
            corId: "amarelo-bebe",
            disponivel: true,
          },
          {
            corId: "mango",
            disponivel: true,
          },
          {
            corId: "marrom",
            disponivel: true,
          },
          {
            corId: "esmeralda",
            disponivel: true,
          },
          {
            corId: "marsala",
            disponivel: true,
          },
          {
            corId: "verde-hortela",
            disponivel: true,
          },
          {
            corId: "babaloo",
            disponivel: true,
          },
          {
            corId: "verde-musgo",
            disponivel: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    nome: "Bolsa Ryzia",
    imagemCapa: "./assets/img/bolsaRyzia/bolsa-ryzia-4.png",
    descricao:
      "Bolsa artesanal em crochê com design estruturado, alça de mão e corrente. Elegante, versátil e perfeita para compor looks casuais ou mais sofisticados.",
    descricaoDetalhada:
      "A Bolsa Ryzia une o charme do crochê artesanal com um visual moderno e marcante. Seu formato estruturado traz presença ao look, enquanto a corrente dourada adiciona um toque delicado de sofisticação. É uma peça versátil, ideal para usar em passeios, encontros, eventos leves ou produções mais elegantes.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Destaque",
    preco: {
      promocaoAtiva: false,
      precoOriginal: "R$ 170,00",
      pix: "R$ 170,00",
      parcelado: "R$ 181,03",
      parcelas: 2,
      valorParcela: "R$ 90,52",
    },
    detalhes: {
      subtitulo:
        "Uma bolsa artesanal moderna, estruturada e fácil de combinar.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio de Malha",
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
        imagem: "./assets/img/bolsaRyzia/bolsa-ryzia-3.jpeg",
        legenda: "Ryzia em duas versões clássicas",
      },
      {
        imagem: "./assets/img/bolsaRyzia/bolsa-ryzia-1.jpeg",
        legenda: "Versão Branco para produções leves",
      },
      {
        imagem: "./assets/img/bolsaRyzia/bolsa-ryzia-4.png",
        legenda: "Versão Branco para produções leves",
      },
    ],
    variantes: [
      {
        fioId: "fio-malha",
        corId: "branco",
        corHex: "#F8F8F4",
        corNome: "Branco",
        imagem: "./assets/img/bolsaRyzia/bolsa-ryzia-4.png",
      },
      // {
      //   fioId: "fio-malha",
      //   corId: "preto",
      //   corHex: "#1D1C21",
      //   cornome: "Preto",
      //   imagem: "./assets/img/bolsaRyzia/bolsa-ryzia-2.jpeg",
      // },
    ],
    opcoesProducao: [
      {
        fioId: "fio-malha",
        cores: [
          { corId: "branco", disponivel: true },
          { corId: "pink", disponivel: true },
          { corId: "ferrugem", disponivel: true },
          { corId: "preto", disponivel: true },
          { corId: "lilas", disponivel: true },
          { corId: "amarelo-bebe", disponivel: true },
          { corId: "mango", disponivel: true },
          { corId: "marrom", disponivel: true },
          { corId: "esmeralda", disponivel: true },
          { corId: "marsala", disponivel: true },
          { corId: "verde-hortela", disponivel: true },
          { corId: "babaloo", disponivel: true },
          {
            corId: "verde-musgo",
            disponivel: true,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    nome: "Bolsa Raimunda",
    imagemCapa: "./assets/img/bolsaRaimunda/bolsa-raimunda-4.jpeg",
    descricao:
      "Bolsa compacta para passeios, eventos e composições elegantes. Feita em crochê com toque artesanal premium.",
    descricaoDetalhada:
      "Compacta, charmosa e elegante. Essa bolsa é ideal para quem quer carregar o essencial com estilo, valorizando uma peça artesanal com acabamento delicado.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      promocaoAtiva: false,
      precoOriginal: "R$ 160,00",
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
        imagem: "./assets/img/bolsaRaimunda/bolsa-raimunda-2.jpeg",
        legenda: "Raimunda em tom Ferrugem",
      },
      {
        imagem: "./assets/img/bolsaRaimunda/bolsa-raimunda-1.jpeg",
        legenda: "Detalhe da textura artesanal",
      },
    ],
    variantes: [
      {
        fioId: "fio-nautico",
        corId: "ferrugem",
        corHex: "#D8733A",
        cornome: "Ferrugem",
        imagem: "./assets/img/bolsaRaimunda/bolsa-raimunda-2.jpeg",
      },
    ],
    opcoesProducao: [
      {
        fioId: "fio-nautico",
        cores: [
          { corId: "chocolate", disponivel: true },
          { corId: "rosa-bebe", disponivel: true },
          { corId: "verde-jade", disponivel: true },
          { corId: "champagne", disponivel: true },
          { corId: "rose-gold", disponivel: true },
          { corId: "amora", disponivel: true },
          { corId: "verde-bandeira", disponivel: true },
          { corId: "caqui", disponivel: true },
          { corId: "azul-marinho", disponivel: true },
          { corId: "colorau", disponivel: true },
          { corId: "lilas", disponivel: true },
          { corId: "sangria", disponivel: true },
          { corId: "ferrugem", disponivel: true },
        ],
      },
    ],
  },
  {
    id: 4,
    nome: "Bolsa Inês",
    imagemCapa: "./assets/img/bolsaInes/bolsa-ines-1.jpeg",
    descricao:
      "Bolsa compacta para passeios, eventos e composições elegantes. Feita em crochê com toque artesanal premium.",
    descricaoDetalhada:
      "Modelo compacto e com visual marcante, a Bolsa Inês é a escolha ideal para quem busca garantir uma ótima primeira impressão ao chegar nos lugares. Com seu design trançado e sua versatilidade em ser produzida tanto em fio náutico como em fio de malha, o cliente escolhe a opção que melhor se adequa ao seu gosto.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      promocaoAtiva: false,
      precoOriginal: "R$ 145,00",
      pix: "R$ 145,00",
      parcelado: "R$ 154,41",
      parcelas: 2,
      valorParcela: "R$ 77,20",
    },
    detalhes: {
      subtitulo: "Clássica, compacta e sofisticada.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio Náutico ou Fio de Malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Produzida artesanalmente em crochê com fio náutico e fio de malha premium",
        "Design trançado traz um toque de elegância",
        "Tamanho prático para levar o essencial",
        "Cores podem ser personalizadas ao seu gosto (Verificar disponibilidade)",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/bolsaInes/bolsa-ines-2.jpeg",
        legenda: "Bolsa em fio náutico",
      },
      {
        imagem: "./assets/img/bolsaInes/bolsa-ines-1.jpeg",
        legenda: "Bolsa em fio de malha",
      },
    ],
    variantes: [
      {
        fioId: "fio-malha",
        corId: "preto",
        corHex: "#1D1C21",
        cornome: "Preto",
        imagem: "./assets/img/bolsaInes/bolsa-ines-2.jpeg",
      },
    ],
    opcoesProducao: [
      {
        fioId: "fio-malha",
        cores: [
          { corId: "branco", disponivel: true },
          { corId: "pink", disponivel: true },
          { corId: "ferrugem", disponivel: true },
          { corId: "preto", disponivel: true },
          { corId: "lilas", disponivel: true },
          { corId: "amarelo-bebe", disponivel: true },
          { corId: "mango", disponivel: true },
          { corId: "marrom", disponivel: true },
          { corId: "esmeralda", disponivel: true },
          { corId: "marsala", disponivel: true },
          { corId: "verde-hortela", disponivel: true },
          { corId: "babaloo", disponivel: true },
          {
            corId: "verde-musgo",
            disponivel: true,
          },
        ],
      },
      {
        fioId: "fio-nautico",
        cores: [
          { corId: "chocolate", disponivel: true },
          { corId: "rosa-bebe", disponivel: true },
          { corId: "verde-jade", disponivel: true },
          { corId: "champagne", disponivel: true },
          { corId: "rose-gold", disponivel: true },
          { corId: "amora", disponivel: true },
          { corId: "verde-bandeira", disponivel: true },
          { corId: "caqui", disponivel: true },
          { corId: "azul-marinho", disponivel: true },
          { corId: "colorau", disponivel: true },
          { corId: "lilas", disponivel: true },
          { corId: "sangria", disponivel: true },
          { corId: "ferrugem", disponivel: true },
        ],
      },
    ],
  },
  {
    id: 5,
    nome: "Bolsa Eliza",
    imagemCapa: "./assets/img/bolsaEliza/bolsa-eliza-4.jpeg",
    descricao:
      "Bolsa compacta para passeios, eventos e composições elegantes. Feita em crochê com toque artesanal premium.",
    descricaoDetalhada:
      "A Bolsa Eliza foi criada para mulheres que valorizam elegância sem abrir mão da versatilidade. Seu design trançado combinado com a delicadeza da alça em corrente conferem um acabamento moderno e refinado. É aquela bolsa que acompanha você em todos os momentos: do casamento ao jantar, do shopping ao happy hour. Um modelo atemporal que complementa diferentes estilos e ocasiões com a mesma elegância.",
    destaque: false,
    categoria: "Bolsas",
    badge: "Destaque",
    preco: {
      promocaoAtiva: false,
      precoOriginal: "R$ 160,00",
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
        imagem: "./assets/img/bolsaEliza/bolsa-eliza-3.jpeg",
        legenda: "Vista principal na cor Ferrugem",
      },
      // {
      //   imagem: "./assets/img/bolsaEliza/bolsa-eliza-4.jpeg",
      //   legenda: "Vista principal na cor Pink",
      // },

    ],
    variantes: [
      {
        fioId: "fio-malha",
        corId: "ferrugem",
        corHex: "#D8733A",
        cornome: "Ferrugem",
        imagem: "./assets/img/bolsaEliza/bolsa-eliza-3.jpeg",
      },
      // {
      //   fioId: "fio-malha",
      //   corId: "pink",
      //   corHex: "#EF2F5A",
      //   cornome: "Pink",
      //   imagem: "./assets/img/bolsaEliza/bolsa-eliza-4.jpeg",
      // },
    ],
    opcoesProducao: [
      {
        fioId: "fio-malha",
        cores: [
          { corId: "branco", disponivel: true },
          { corId: "pink", disponivel: true },
          { corId: "ferrugem", disponivel: true },
          { corId: "preto", disponivel: true },
          { corId: "lilas", disponivel: true },
          { corId: "amarelo-bebe", disponivel: true },
          { corId: "mango", disponivel: true },
          { corId: "marrom", disponivel: true },
          { corId: "esmeralda", disponivel: true },
          { corId: "marsala", disponivel: true },
          { corId: "verde-hortela", disponivel: true },
          { corId: "babaloo", disponivel: true },
          {
            corId: "verde-musgo",
            disponivel: true,
          },
        ],
      },
    ],
  },
  // {
  //   id: 6,
  //   nome: "Bolsa Aurora",
  //   imagemCapa: "./assets/img/bolsaAurora/bolsa-aurora-1.jpeg",
  //   descricao:
  //     "Bolsa artesanal em crochê com alça estruturada, corrente dourada e acabamento delicado. Um modelo elegante para usar do dia a dia aos momentos especiais.",
  //   descricaoDetalhada:
  //     "Mais do que uma bolsa, a Bolsa Aurora é um acessório que transforma qualquer produção. Seu design minimalista, combinado à alça de mão geométrica em metal e à corrente delicada, resulta em uma peça sofisticada, moderna e versátil, perfeita para acompanhar você dos momentos especiais ao dia a dia com elegância.",
  //   destaque: false,
  //   categoria: "Bolsas",
  //   badge: "Novo",
  //   preco: {
  //     promocaoAtiva: true,
  //     precoOriginal: "R$ 145,00",
  //     pix: "R$ 135,00",
  //     parcelado: "R$ 143,76",
  //     parcelas: 2,
  //     valorParcela: "R$ 71,88",
  //   },
  //   detalhes: {
  //     subtitulo: "Clássica, compacta e sofisticada.",
  //     medidas: "Medidas aproximadas sob consulta no WhatsApp",
  //     material: "Fio de malha",
  //     prazo: "Produção sob encomenda, conforme disponibilidade",
  //     diferenciais: [
  //       "Produzida artesanalmente em crochê com fio de malha extra premium",
  //       "Possui duas alças, permitindo versatilidade e sofisticação no uso (Podendo ser alteradas para cor prata)",
  //       "Corrente que traz um toque sofisticado",
  //       "Tamanho ideal para carregar itens essenciais",
  //       "Cores podem ser personalizadas ao seu gosto (Verificar disponibilidade)",
  //     ],
  //   },
  //   galeria: [
  //     {
  //       imagem: "./assets/img/bolsaAurora/bolsa-aurora-1.jpeg",
  //       legenda: "Vista principal na cor Lilas",
  //     },
  //   ],
  //   variantes: [
  //     {
  //       fioId: "fio-malha",
  //       corId: "lilas",
  //       corHex: "#A98BDA",
  //       cornome: "Lilás",
  //       imagem: "./assets/img/bolsaAurora/bolsa-aurora-1.jpeg",
  //     },
  //   ],
  //   opcoesProducao: [
  //     {
  //       fioId: "fio-malha",
  //       cores: [
  //         { corId: "branco", disponivel: true },
  //         { corId: "pink", disponivel: true },
  //         { corId: "ferrugem", disponivel: true },
  //         { corId: "preto", disponivel: true },
  //         { corId: "lilas", disponivel: true },
  //         { corId: "amarelo-bebe", disponivel: true },
  //         { corId: "mango", disponivel: true },
  //         { corId: "marrom", disponivel: true },
  //         { corId: "esmeralda", disponivel: true },
  //         { corId: "marsala", disponivel: true },
  //         { corId: "verde-hortela", disponivel: true },
  //         { corId: "babaloo", disponivel: true },
  //         {
  //           corId: "verde-musgo",
  //           disponivel: true,
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    id: 6,
    nome: "Bolsa Leticia",
    imagemCapa: "./assets/img/bolsaLeticia/bolsa-leticia-1.jpeg",
    descricao:
      "Bolsa artesanal em crochê com alça estruturada, corrente dourada e acabamento delicado. Um modelo elegante para usar do dia a dia aos momentos especiais.",
    descricaoDetalhada:
      "Com exclusivo ponto em espinha de peixe, a Bolsa Letícia é uma bolsa resistente e espaçosa, perfeita para o uso diário. Seu design versátil combina a alça de mão revestida em crochê com a alça em corrente, proporcionando diferentes formas de uso, unindo conforto e requinte. O tassel lateral acrescenta um toque de charme e exclusividade ao acabamento.",
    destaque: false,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      promocaoAtiva: false,
      precoOriginal: "R$ 250,00",
      pix: "R$ 250,00",
      parcelado: "R$ 261,00",
      parcelas: 2,
      valorParcela: "R$ 130,50",
    },
    detalhes: {
      subtitulo: "Clássica, compacta e sofisticada.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio de malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Ponto espinha de peixe",
        "Fechamento em zíper",
        "Duas alças sendo uma em corrente e outra revestida em crochê",
        "Tassel decorativo",
        "Interior amplo para acomodar seus itens essenciais.",
        "Cores podem ser personalizadas ao seu gosto (Verificar disponibilidade)",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/bolsaLeticia/bolsa-leticia-1.jpeg",
        legenda: "Vista principal na cor Preta",
      },
    ],
    variantes: [
      {
        fioId: "fio-malha",
        corId: "preto",
        corHex: "#1D1C21",
        cornome: "Preto",
        imagem: "./assets/img/bolsaLeticia/bolsa-leticia-1.jpeg",
      },
    ],
    opcoesProducao: [
      {
        fioId: "fio-malha",
        cores: [
          { corId: "branco", disponivel: true },
          { corId: "pink", disponivel: true },
          { corId: "ferrugem", disponivel: true },
          { corId: "preto", disponivel: true },
          { corId: "lilas", disponivel: true },
          { corId: "amarelo-bebe", disponivel: true },
          { corId: "mango", disponivel: true },
          { corId: "marrom", disponivel: true },
          { corId: "esmeralda", disponivel: true },
          { corId: "marsala", disponivel: true },
          { corId: "verde-hortela", disponivel: true },
          { corId: "babaloo", disponivel: true },
          {
            corId: "verde-musgo",
            disponivel: true,
          },
        ],
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
