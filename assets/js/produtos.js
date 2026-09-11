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
      { id: "porcelana", nome: "Porcelana", corHex: "#F1EEE4", borda: "#9B8D7E" },
      { id: "pink", nome: "Pink", corHex: "#EF2F5A" },
      { id: "rosa-algodao", nome: "Rosa Algodão", corHex: "#E7A5B7" },
      { id: "ferrugem", nome: "Ferrugem", corHex: "#D8733A" },
      { id: "preto", nome: "Preto", corHex: "#1D1C21" },
      { id: "lilas", nome: "Lilás", corHex: "#D8B9E6" },
      {
        id: "amarelo-bebe",
        nome: "Amarelo Bebê",
        corHex: "#FFF6D1",
        borda: "#9B8D7E",
      },
      { id: "amarelo-canario", nome: "Amarelo Canário", corHex: "#F5C542" },
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

const coresFioMalha = fiosDisponiveis.find((fio) => fio.id === "fio-malha").cores;
const coresFioNautico = fiosDisponiveis.find((fio) => fio.id === "fio-nautico").cores;

const produtos = [
  {
    id: 1,
    nome: "Bolsa Raíssa",
    imagemCapa: "./assets/img/bolsaRaissa/bolsa-raissa-porcelana.png",
    descricao:
      "Bolsa artesanal em fio de malha na cor Porcelana, com alça estruturada, corrente dourada e delicados pingentes.",
    descricaoDetalhada:
      "A nova Bolsa Raíssa une leveza, textura artesanal e detalhes dourados que deixam qualquer produção mais especial. O fio de malha na cor Porcelana cria um visual elegante e fácil de combinar, enquanto a alça estruturada e a corrente permitem diferentes formas de uso.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Destaque",
    preco: {
      promocaoAtiva: false,
      precoOriginal: "R$ 170,00",
      pix: "R$ 170,00",
      parcelado: "R$ 181,04",
      parcelas: 2,
      valorParcela: "R$ 90,52",
    },
    detalhes: {
      subtitulo:
        "Leve, elegante e cheia de detalhes que fazem a diferença.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio de Malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Produzida artesanalmente em fio de malha extra premium",
        "Alça estruturada revestida em crochê e corrente dourada",
        "Pingentes dourados que valorizam o acabamento",
        "Cor Porcelana: delicada, elegante e fácil de combinar",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/bolsaRaissa/bolsa-raissa-porcelana.png",
        legenda: "Bolsa Raíssa na cor Porcelana",
      },
    ],

    variantes: [
      {
        fioId: "fio-malha",
        corId: "porcelana",
        corHex: "#F1EEE4",
        corNome: "Porcelana",
        imagem: "./assets/img/bolsaRaissa/bolsa-raissa-porcelana.png",
      },
    ],

    opcoesProducao: [
      {
        fioId: "fio-malha",
        cores: coresFioMalha.map((cor) => ({
          corId: cor.id,
          disponivel: true,
          imagem: cor.id === "porcelana"
            ? "./assets/img/bolsaRaissa/bolsa-raissa-porcelana.png"
            : "",
        })),
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
    destaque: false,
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
    destaque: false,
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
    destaque: false,
    categoria: "Bolsas",
    badge: "Destaque",
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
      {
        imagem: "./assets/img/bolsaEliza/bolsa-eliza-4.jpeg",
        legenda: "Vista principal na cor Marsala",
      },

    ],
    variantes: [
      {
        fioId: "fio-malha",
        corId: "ferrugem",
        corHex: "#D8733A",
        cornome: "Ferrugem",
        imagem: "./assets/img/bolsaEliza/bolsa-eliza-3.jpeg",
      },
      {
        fioId: "fio-malha",
        corId: "marsala",
        corHex: "#A52122",
        cornome: "Marsala",
        imagem: "./assets/img/bolsaEliza/bolsa-eliza-4.jpeg",
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
  {
    id: 6,
    nome: "Bolsa Letícia",
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
      precoOriginal: "R$ 190,00",
      pix: "R$ 190,00",
      parcelado: "R$ 210,00",
      parcelas: 2,
      valorParcela: "R$ 105,00",
    },

    // true: exibe a área de medidas.
    // false: esconde completamente essa área.
    exibirDimensoes: false,

    // true: mostra o botão "Consultar medidas no WhatsApp".
    // false: mostra as dimensões cadastradas.
    // Mesmo em false, se alguma dimensão estiver ausente, o site
    // usa automaticamente a consulta pelo WhatsApp.
    dimensoesSobConsulta: false,

      tamanhos: [
      {
        id: "P",
        nome: "P",
        disponivel: false,

        imagem:
          "",

        legendaImagem: "",

        preco: {
          promocaoAtiva: false,
          pix: "R$ 170,00",
          parcelado: "R$ 180,00",
          parcelas: 2,
          valorParcela: "R$ 90,00",
        },
      },

      {
        id: "M",
        nome: "M",
        disponivel: true,

        imagem:
          "/assets/img/bolsaLeticia/bolsa-leticia-2.png",

        legendaImagem: "Bolsa Letícia no tamanho M",

        preco: {
          promocaoAtiva: false,
          pix: "R$ 190,00",
          parcelado: "R$ 202,33",
          parcelas: 2,
          valorParcela: "R$ 101,17",
        },
      },

      {
        id: "G",
        nome: "G",
        disponivel: true,

        imagem:
          "/assets/img/bolsaLeticia/bolsa-leticia-1.jpeg",

        legendaImagem: "Bolsa Letícia no tamanho G",

        preco: {
          promocaoAtiva: false,
          pix: "R$ 250,00",
          parcelado: "R$ 266,22",
          parcelas: 2,
          valorParcela: "R$ 133,11",
        },
      },
    ],

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
        corNome: "Preto",
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
  {
    id: 7,
    nome: "Bolsa Rita",
    imagemCapa: "./assets/img/bolsaRita/bolsa-rita-1.jpeg",
    descricao:
      "Bolsa infantil artesanal em fio de malha, em formato de raposa, delicada, divertida e cheia de personalidade.",
    descricaoDetalhada:
      "Encante as pequenas com esta linda bolsa infantil em formato de raposa. Combinando detalhes em rosa e preto, a Bolsa Rita cria um visual delicado, divertido e cheio de personalidade. O destaque fica por conta das orelhinhas e do rostinho da raposa, que deixam a peça ainda mais charmosa. Uma peça especial para passeios, festas, aniversários e momentos em que as pequenas querem levar seus acessórios favoritos com muito estilo.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Kids",
    preco: {
      promocaoAtiva: false,
      precoOriginal: "R$ 65,00",
      pix: "R$ 65,00",
      parcelado: "R$ 69,22",
      parcelas: 2,
      valorParcela: "R$ 34,61",
    },
    // A variação de cor da Rita corresponde somente à parte superior da bolsa.
    // Não significa que toda a peça mudará de cor.
    variacaoCor: {
      titulo: "Cor da parte superior",
      descricao:
        "A cor escolhida corresponde à parte superior da bolsa. A imagem de cada opção pode ser adicionada posteriormente.",
    },
    detalhes: {
      subtitulo: "Delicada, divertida e feita para as pequenas.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio de malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Formato de raposa com orelhinhas e rostinho delicado",
        "Peça artesanal feita em fio de malha",
        "Ideal para passeios, festas e aniversários",
        "A cor selecionada corresponde à parte superior da bolsa",
      ],
    },
     galeria: [
      {
        imagem: "./assets/img/bolsaRita/bolsa-rita-1.jpeg",
        legenda: "Vista principal na cor Rosa Algodão",
      },
      {
        imagem: "./assets/img/bolsaRita/bolsa-rita-amarelo-canario.png",
        legenda: "Bolsa Rita na cor Amarelo Canário",
      },
    ],
    variantes: [
      {
        fioId: "fio-malha",
        corId: "rosa-algodao",
        corHex: "#E7A5B7",
        corNome: "Rosa Algodão",
        imagem: "./assets/img/bolsaRita/bolsa-rita-1.jpeg",
      },
      {
        fioId: "fio-malha",
        corId: "amarelo-canario",
        corHex: "#F5C542",
        corNome: "Amarelo Canário",
        imagem: "./assets/img/bolsaRita/bolsa-rita-amarelo-canario.png",
      },
    ],
    opcoesProducao: [
      {
        fioId: "fio-malha",
        // A Rita usa o Fio de Malha e a cor escolhida altera somente a parte
        // superior da bolsa. Por isso, todas as cores cadastradas para o
        // Fio de Malha ficam disponíveis aqui. As imagens podem ser
        // adicionadas individualmente depois.
        cores: [
          { corId: "branco", disponivel: true, imagem: "" },
          { corId: "pink", disponivel: true, imagem: "" },
          { corId: "rosa-algodao", disponivel: true, imagem: "./assets/img/bolsaRita/bolsa-rita-1.jpeg" },
          { corId: "ferrugem", disponivel: true, imagem: "" },
          { corId: "preto", disponivel: true, imagem: "" },
          { corId: "lilas", disponivel: true, imagem: "" },
          { corId: "amarelo-bebe", disponivel: true, imagem: "" },
          { corId: "amarelo-canario", disponivel: true, imagem: "./assets/img/bolsaRita/bolsa-rita-amarelo-canario.png" },
          { corId: "mango", disponivel: true, imagem: "" },
          { corId: "marrom", disponivel: true, imagem: "" },
          { corId: "esmeralda", disponivel: true, imagem: "" },
          { corId: "marsala", disponivel: true, imagem: "" },
          { corId: "verde-hortela", disponivel: true, imagem: "" },
          { corId: "babaloo", disponivel: true, imagem: "" },
          { corId: "verde-musgo", disponivel: true, imagem: "" },
        ],
      },
    ],
  },
  {
    id: 8,
    nome: "Bolsa Aurora",
    imagemCapa: "./assets/img/bolsaAurora/bolsa-aurora-2.jpeg",
    descricao:
      "Bolsa infantil artesanal em fio de malha, delicada, divertida e cheia de charme, disponível nos tamanhos P e M.",
    descricaoDetalhada:
      "Delicada, divertida e cheia de charme! A Bolsa Aurora possui um acabamento estruturado em um lindo formato compacto, perfeito para deixar os looks das pequenas ainda mais encantadores.",
    destaque: false,
    categoria: "Bolsas",
    badge: "Kids",
    preco: {
      promocaoAtiva: false,
      precoOriginal: "R$ 50,00",
      pix: "R$ 50,00",
      parcelado: "R$ 53,25",
      parcelas: 2,
      valorParcela: "R$ 26,63",
    },
    // A Aurora trabalha com tamanho, mas não exibe uma área de medidas
    // neste momento. Se as medidas forem cadastradas futuramente, basta
    // alterar exibirDimensoes para true.
    exibirDimensoes: false,
    dimensoesSobConsulta: false,

    tamanhos: [
      {
        id: "P",
        nome: "P",
        disponivel: true,

        // Imagem do tamanho será adicionada posteriormente.
        imagem: "",
        legendaImagem: "Bolsa Aurora no tamanho P",

        // Preço inicial do tamanho. As configurações abaixo
        // substituem este valor quando o cliente escolhe a personalização.
        preco: {
          promocaoAtiva: false,
          pix: "R$ 50,00",
          parcelado: "R$ 53,25",
          parcelas: 2,
          valorParcela: "R$ 26,63",
        },
      },

      {
        id: "M",
        nome: "M",
        disponivel: true,

        // Imagem do tamanho será adicionada posteriormente.
        imagem: "",
        legendaImagem: "Bolsa Aurora no tamanho M",

        // Preço inicial do tamanho. As configurações abaixo
        // substituem este valor quando o cliente escolhe a personalização.
        preco: {
          promocaoAtiva: false,
          pix: "R$ 50,00",
          parcelado: "R$ 53,25",
          parcelas: 2,
          valorParcela: "R$ 26,63",
        },
      },
    ],
    opcoesConfiguracao: [
      {
        id: "personalizacao",
        nome: "Escolha a personalização",
        descricao: "Escolha a opção de pingentes da sua bolsa.",
        obrigatorio: true,
        opcoes: [
          { id: "3-pingentes", nome: "Com 3 pingentes" },
          { id: "2-pingentes-nome", nome: "Com até 2 pingentes e nome" },
        ],
      },
    ],
    configuracoes: [
      {
        tamanhoId: "P",
        personalizacaoId: "3-pingentes",
        preco: {
          promocaoAtiva: false,
          pix: "R$ 50,00",
          parcelado: "R$ 53,25",
          parcelas: 2,
          valorParcela: "R$ 26,63",
        },
      },
      {
        tamanhoId: "P",
        personalizacaoId: "2-pingentes-nome",
        preco: {
          promocaoAtiva: false,
          pix: "R$ 55,00",
          parcelado: "R$ 58,57",
          parcelas: 2,
          valorParcela: "R$ 29,29",
        },
      },
      {
        tamanhoId: "M",
        personalizacaoId: "3-pingentes",
        preco: {
          promocaoAtiva: false,
          pix: "R$ 60,00",
          parcelado: "R$ 63,89",
          parcelas: 2,
          valorParcela: "R$ 31,95",
        },
      },
      {
        tamanhoId: "M",
        personalizacaoId: "2-pingentes-nome",
        preco: {
          promocaoAtiva: false,
          pix: "R$ 65,00",
          parcelado: "R$ 69,22",
          parcelas: 2,
          valorParcela: "R$ 34,61",
        },
      },
    ],
    detalhes: {
      subtitulo: "Delicada, divertida e cheia de charme.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio de malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Acabamento estruturado em formato compacto",
        "Disponível nos tamanhos P e M",
        "Opção com 3 pingentes ou com até 2 pingentes e nome",
      ],
    },
     galeria: [
      {
        imagem: "./assets/img/bolsaAurora/bolsa-aurora-2.jpeg",
        legenda: "Vista principal na cor Rosa Algodão",
      },
       {
        imagem: "./assets/img/bolsaAurora/bolsa-aurora-1.jpeg",
        legenda: "Vista principal na cor Lilás",
      },
    ],
    variantes: [
      {
        fioId: "fio-malha",
        corId: "rosa-algodao",
        corHex: "#E7A5B7",
        corNome: "Rosa Algodão",
        imagem: "./assets/img/bolsaAurora/bolsa-aurora-2.jpeg",
      },
      {
        fioId: "fio-malha",
        corId: "lilas",
        corHex: "#D8B9E6",
        corNome: "Lilás",
        imagem: "./assets/img/bolsaAurora/bolsa-aurora-1.jpeg",
      },
    ],
    opcoesProducao: [
       {
        fioId: "fio-malha",
        cores: [
          { corId: "branco", disponivel: true },
          { corId: "pink", disponivel: true },
          { corId: "rosa-algodao", disponivel: true },
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
    id: 9,
    nome: "Bolsa Cherry",
    imagemCapa: "./assets/img/bolsaCherry/bolsa-cherry-marsala.png",
    descricao:
      "Bolsa artesanal em fio de malha, com design estruturado, alça de mão revestida em crochê e corrente dourada para levar elegância a qualquer produção.",
    descricaoDetalhada:
      "A Bolsa Cherry é para quem gosta de uma peça que transforma o look. O ponto artesanal valoriza a textura do fio de malha, enquanto a alça de mão e a corrente dourada permitem usar do seu jeito: mais clássica, mais prática ou mais marcante. A versão Marsala revela toda a sua personalidade, e as demais cores disponíveis deixam a sua Cherry ainda mais única.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      promocaoAtiva: false,
      precoOriginal: "R$ 170,00",
      pix: "R$ 170,00",
      parcelado: "R$ 181,04",
      parcelas: 2,
      valorParcela: "R$ 90,52",
    },
    detalhes: {
      subtitulo: "Uma bolsa marcante, elegante e feita para acompanhar seus melhores momentos.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio de malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Produzida artesanalmente em fio de malha",
        "Alça de mão e corrente dourada para diferentes formas de uso",
        "Cores de fio de malha disponíveis para personalizar a sua peça",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/bolsaCherry/bolsa-cherry-marsala.png",
        legenda: "Bolsa Cherry na cor Marsala",
      },
    ],
    variantes: [
      {
        fioId: "fio-malha",
        corId: "marsala",
        corHex: "#A52122",
        corNome: "Marsala",
        imagem: "./assets/img/bolsaCherry/bolsa-cherry-marsala.png",
      },
    ],
    opcoesProducao: [
      {
        fioId: "fio-malha",
        cores: [
          {
            corId: "marsala",
            disponivel: true,
            imagem: "./assets/img/bolsaCherry/bolsa-cherry-marsala.png",
          },
          { corId: "branco", disponivel: true, imagem: "" },
          { corId: "pink", disponivel: true, imagem: "" },
          { corId: "rosa-algodao", disponivel: true, imagem: "" },
          { corId: "ferrugem", disponivel: true, imagem: "" },
          { corId: "preto", disponivel: true, imagem: "" },
          { corId: "lilas", disponivel: true, imagem: "" },
          { corId: "amarelo-bebe", disponivel: true, imagem: "" },
          { corId: "amarelo-canario", disponivel: true, imagem: "" },
          { corId: "porcelana", disponivel: true, imagem: "" },
          { corId: "mango", disponivel: true, imagem: "" },
          { corId: "marrom", disponivel: true, imagem: "" },
          { corId: "esmeralda", disponivel: true, imagem: "" },
          { corId: "verde-hortela", disponivel: true, imagem: "" },
          { corId: "babaloo", disponivel: true, imagem: "" },
          { corId: "verde-musgo", disponivel: true, imagem: "" },
        ],
      },
    ],
  },
  {
    id: 10,
    nome: "Bolsa Íris",
    imagemCapa: "./assets/img/bolsaIris/bolsa-iris-pasteis.png",
    descricao:
      "Bolsa artesanal em fio de malha com um mix encantador de cores pastéis, alça trançada macia e corrente dourada para usar de diferentes maneiras.",
    descricaoDetalhada:
      "Leve, alegre e impossível de passar despercebida: a Bolsa Íris reúne tons pastéis em uma composição delicada que combina com momentos especiais e dias cheios de cor. Você escolhe de quatro a seis cores para criar um mix que tenha a sua cara; cada faixa é trabalhada à mão, resultando em uma peça única, divertida e cheia de afeto. A alça trançada traz conforto, enquanto a corrente dourada acrescenta um toque sofisticado ao acabamento.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      promocaoAtiva: false,
      precoOriginal: "R$ 70,00",
      pix: "R$ 70,00",
      parcelado: "R$ 74,54",
      parcelas: 2,
      valorParcela: "R$ 37,27",
    },
    detalhes: {
      subtitulo: "Cores suaves, acabamento artesanal e charme para iluminar qualquer look.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio de malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Produzida artesanalmente em fio de malha",
        "Mix exclusivo de cores pastéis que deixa cada peça especial",
        "Alça trançada confortável e corrente dourada para usar como preferir",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/bolsaIris/bolsa-iris-pasteis.png",
        legenda: "Bolsa Íris em mix de cores pastéis",
      },
    ],
    variantes: [],
    opcoesProducao: [],
    selecaoCores: {
      fioId: "fio-malha",
      titulo: "Monte seu mix de cores",
      descricao: "Escolha de 4 a 6 cores de fio de malha para compor a sua Bolsa Íris.",
      minimo: 4,
      maximo: 6,
    },
  },
  {
    id: 11,
    nome: "Bolsa Geane",
    imagemCapa: "./assets/img/bolsaGeane/bolsa-geane-01.jpeg",
    descricao:
      "Bolsa artesanal em fio de malha, leve, delicada e pronta para ganhar a cor que mais combina com você.",
    descricaoDetalhada:
      "A Bolsa Geane une o charme do crochê artesanal a um design delicado e versátil. Feita à mão, ela é aquela escolha especial para passeios, festas e presentes cheios de significado. Personalize na cor de fio de malha que mais combina com o estilo de quem vai usar e leve uma peça exclusiva, criada ponto a ponto.",
    destaque: false,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      promocaoAtiva: false,
      precoOriginal: "R$ 60,00",
      pix: "R$ 60,00",
      parcelado: "R$ 63,90",
      parcelas: 2,
      valorParcela: "R$ 31,95",
    },
    detalhes: {
      subtitulo: "Uma bolsa artesanal vibrante para levar cor aos seus momentos.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio de malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Produzida artesanalmente em fio de malha",
        "Todas as cores de fio de malha disponíveis para personalizar",
        "Peça leve e especial para diferentes ocasiões",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/bolsaGeane/bolsa-geane-01.jpeg",
        legenda: "Bolsa Geane na cor Pink",
      },
    ],
    variantes: [
      {
        fioId: "fio-malha",
        corId: "pink",
        corHex: "#EF2F5A",
        corNome: "Pink",
        imagem: "./assets/img/bolsaGeane/bolsa-geane-01.jpeg",
      },
    ],
    opcoesProducao: [
      {
        fioId: "fio-malha",
        cores: coresFioMalha.map((cor) => ({
          corId: cor.id,
          disponivel: true,
          imagem: cor.id === "pink" ? "./assets/img/bolsaGeane/bolsa-geane-01.jpeg" : "",
        })),
      },
    ],
  },
  {
    id: 12,
    nome: "Bolsa Dália",
    imagemCapa: "./assets/img/bolsaDalia/bolsa-dalia-01.jpeg",
    descricao:
      "Bolsa artesanal em fio náutico na cor Amora, com alça em madeira e fecho em zíper.",
    descricaoDetalhada:
      "A Bolsa Dália combina a estrutura sofisticada do fio náutico com a beleza natural da alça em madeira, criando uma presença elegante que valoriza qualquer produção. O fechamento em zíper traz praticidade e segurança para o dia a dia, enquanto a possibilidade de escolher a cor deixa a sua peça ainda mais exclusiva. É o encontro perfeito entre acabamento artesanal e estilo atemporal.",
    destaque: false,
    categoria: "Bolsas",
    badge: "Novo",
    preco: {
      promocaoAtiva: false,
      precoOriginal: "R$ 220,00",
      pix: "R$ 220,00",
      parcelado: "R$ 234,27",
      parcelas: 2,
      valorParcela: "R$ 117,14",
    },
    detalhes: {
      subtitulo: "Estruturada, sofisticada e feita para se destacar.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio Náutico",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Produzida artesanalmente em fio náutico",
        "Alça em madeira com acabamento natural",
        "Fechamento em zíper para mais segurança",
        "Cores de fio náutico disponíveis para personalizar a sua peça",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/bolsaDalia/bolsa-dalia-01.jpeg",
        legenda: "Bolsa Dália na cor Amora",
      },
    ],
    variantes: [
      {
        fioId: "fio-nautico",
        corId: "amora",
        corHex: "#7B2F4E",
        corNome: "Amora",
        imagem: "./assets/img/bolsaDalia/bolsa-dalia-01.jpeg",
      },
    ],
    opcoesProducao: [
      {
        fioId: "fio-nautico",
        cores: coresFioNautico.map((cor) => ({
          corId: cor.id,
          disponivel: true,
          imagem: cor.id === "amora" ? "./assets/img/bolsaDalia/bolsa-dalia-01.jpeg" : "",
        })),
      },
    ],
  },
  {
    id: 13,
    nome: "Bolsa Ana Liz",
    imagemCapa: "./assets/img/bolsaAnaLiz/bolsa-ana.jpeg",
    descricao:
      "Bolsa infantil artesanal em fio de malha, disponível nos designs Ana e Liz.",
    descricaoDetalhada:
      "A Bolsa Ana Liz foi pensada para transformar os pequenos detalhes em lembranças especiais. No Design Ana, você escolhe uma cor para uma versão delicada e encantadora. No Design Liz, combina duas cores e pode incluir o nome da criança, criando uma peça cheia de identidade para presentear, acompanhar passeios e guardar memórias felizes.",
    destaque: false,
    categoria: "Bolsas",
    badge: "Kids",
    preco: {
      promocaoAtiva: false,
      precoOriginal: "R$ 55,00",
      pix: "R$ 55,00",
      parcelado: "R$ 58,57",
      parcelas: 2,
      valorParcela: "R$ 29,29",
    },
    opcoesConfiguracao: [
      {
        id: "design",
        nome: "Escolha o design",
        descricao: "Selecione a versão que deseja encomendar.",
        obrigatorio: true,
        opcoes: [
          { id: "ana", nome: "Design Ana — uma cor" },
          { id: "liz", nome: "Design Liz — duas cores e nome opcional" },
        ],
      },
    ],
    configuracoes: [
      {
        designId: "ana",
        preco: {
          promocaoAtiva: false,
          pix: "R$ 55,00",
          parcelado: "R$ 58,57",
          parcelas: 2,
          valorParcela: "R$ 29,29",
        },
      },
      {
        designId: "liz",
        preco: {
          promocaoAtiva: false,
          pix: "R$ 65,00",
          parcelado: "R$ 69,22",
          parcelas: 2,
          valorParcela: "R$ 34,61",
        },
      },
    ],
    selecaoCores: {
      fioId: "fio-malha",
      titulo: "Escolha as cores do seu design",
      descricao: "Design Ana: escolha exatamente 1 cor. Design Liz: escolha exatamente 2 cores e, se quiser, informe o nome da criança pelo WhatsApp.",
      porConfiguracao: {
        design: {
          ana: { minimo: 1, maximo: 1 },
          liz: { minimo: 2, maximo: 2 },
        },
      },
    },
    detalhes: {
      subtitulo: "Duas versões delicadas para deixar a imaginação das pequenas florescer.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio de malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Disponível nos designs Ana e Liz",
        "Design Ana com uma opção de cor",
        "Design Liz com duas opções de cores e nome da criança opcional",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/bolsaAnaLiz/bolsa-ana.jpeg",
        legenda: "Bolsa Ana Liz — Design Ana",
      },
      {
        imagem: "./assets/img/bolsaAnaLiz/bolsa-liz.jpeg",
        legenda: "Bolsa Ana Liz — Design Liz",
      },
    ],
    variantes: [],
    opcoesProducao: [],
  },
  {
    id: 14,
    nome: "Bolsa Mi",
    imagemCapa: "./assets/img/bolsaMi/bolsa-mi.jpeg",
    descricao:
      "Bolsa artesanal em fio de malha, delicada, versátil e feita para ganhar a sua cor favorita.",
    descricaoDetalhada:
      "A Bolsa Mi traz a beleza do crochê feito à mão em uma peça leve, charmosa e fácil de combinar. Personalize entre todas as cores disponíveis de fio de malha e tenha uma bolsa criada especialmente para acompanhar os seus momentos, do passeio casual à ocasião especial.",
    destaque: false,
    categoria: "Bolsas",
    badge: "Kids",
    preco: {
      promocaoAtiva: false,
      precoOriginal: "R$ 65,00",
      pix: "R$ 65,00",
      parcelado: "R$ 69,22",
      parcelas: 2,
      valorParcela: "R$ 34,61",
    },
    detalhes: {
      subtitulo: "Uma bolsa leve e exclusiva, feita ponto a ponto para você.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio de malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Produzida artesanalmente em fio de malha",
        "Todas as cores de fio de malha disponíveis para personalizar",
        "Peça versátil para acompanhar diferentes ocasiões",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/bolsaMi/bolsa-mi.jpeg",
        legenda: "Bolsa Mi em fio de malha",
      },
    ],
    variantes: [],
    opcoesProducao: [
      {
        fioId: "fio-malha",
        cores: coresFioMalha.map((cor) => ({
          corId: cor.id,
          disponivel: true,
          imagem: "",
        })),
      },
    ],
  },
  {
    id: 15,
    nome: "Bolsa Kitty",
    imagemCapa: "./assets/img/bolsaKitty/bolsa-kitty.jpeg",
    descricao:
      "Bolsa infantil artesanal em fio de malha, delicada e personalizada com duas cores escolhidas por você.",
    descricaoDetalhada:
      "A Bolsa Kitty foi criada para encantar com um visual divertido, delicado e cheio de personalidade. Escolha duas cores de fio de malha para criar uma combinação única e transformar a peça em um presente especial para acompanhar os momentos mais felizes.",
    destaque: false,
    categoria: "Bolsas",
    badge: "Kids",
    preco: {
      promocaoAtiva: false,
      precoOriginal: "R$ 55,00",
      pix: "R$ 55,00",
      parcelado: "R$ 58,57",
      parcelas: 2,
      valorParcela: "R$ 29,29",
    },
    detalhes: {
      subtitulo: "Duas cores, muito encanto e uma peça feita especialmente para presentear.",
      medidas: "Medidas aproximadas sob consulta no WhatsApp",
      material: "Fio de malha",
      prazo: "Produção sob encomenda, conforme disponibilidade",
      diferenciais: [
        "Produzida artesanalmente em fio de malha",
        "Personalizada com exatamente duas cores escolhidas por você",
        "Uma peça divertida e especial para as pequenas",
      ],
    },
    galeria: [
      {
        imagem: "./assets/img/bolsaKitty/bolsa-kitty.jpeg",
        legenda: "Bolsa Kitty em fio de malha",
      },
    ],
    variantes: [],
    opcoesProducao: [],
    selecaoCores: {
      fioId: "fio-malha",
      titulo: "Escolha as duas cores da Bolsa Kitty",
      descricao: "Selecione exatamente 2 cores de fio de malha para personalizar a sua Bolsa Kitty.",
      minimo: 2,
      maximo: 2,
    },
  },
];

// Fallbacks por categoria
const fallbacks = {
  Bolsas: [
    "./assets/img/bolsaRyzia/bolsa-ryzia-4.png",
    "./assets/img/bolsaEliza/bolsa-eliza-4.jpeg",
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
