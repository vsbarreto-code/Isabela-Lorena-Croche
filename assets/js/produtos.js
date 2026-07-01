// ============================================================
// PRODUTOS — troque as URLs por "./assets/images/..." quando
// for usar fotos locais na Vercel.
// ============================================================
const whatsappNumber = "5579999999999";

const produtos = [
  {
    id: 1,
    nome: "Bolsa Tote 'Aurora'",
    descricao:
      "Bolsa de ombro espaçosa com trama elegante. Ideal para o dia a dia. Forrada e com fecho.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    variantes: [
      {
        corHex: "#D9CE9E",
        corNome: "Café Escuro",
        imagem: "/assets/img/bolsa-amarela.jpeg",
      },
      {
        corHex: "#440512",
        corNome: "Vinho",
        imagem: "/assets/img/bolsa-vermelha.jpeg",
      },
    ],
  },
  {
    id: 2,
    nome: "Bolsa Tote 'Aurora'",
    descricao:
      "Bolsa de ombro espaçosa com trama elegante. Ideal para o dia a dia. Forrada e com fecho.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    variantes: [
      {
        corHex: "#fb01ff",
        corNome: "Café Escuro",
        imagem: "/assets/img/download (1).jpg",
      },
      {
        corHex: "#fe0404f1",
        corNome: "Vinho",
        imagem: "/assets/img/download (2).jpg",
      },
      {
        corHex: "#ffaa00",
        corNome: "Areia",
        imagem: "/assets/img/download.jpg",
      },
    ],
  },
  {
    id: 3,
    nome: "Bolsa Tote 'Aurora'",
    descricao:
      "Bolsa de ombro espaçosa com trama elegante. Ideal para o dia a dia. Forrada e com fecho.",
    destaque: true,
    categoria: "Bolsas",
    badge: "Novo",
    variantes: [
      {
        corHex: "#0aec19",
        corNome: "Café Escuro",
        imagem: "/assets/img/download (1).jpg",
      },
      {
        corHex: "#121111",
        corNome: "Vinho",
        imagem: "/assets/img/download (2).jpg",
      },
      {
        corHex: "#e19d16",
        corNome: "Areia",
        imagem: "/assets/img/download.jpg",
      },
    ],
  },
  {
    id: 5,
    nome: "Vestido Longo 'Sereia'",
    descricao:
      "Vestido deslumbrante todo feito à mão em pontos detalhados. Acompanha forro interno.",
    destaque: true,
    categoria: "Vestidos",
    badge: "Exclusivo",
    variantes: [
      {
        corHex: "#FAFAFA",
        corNome: "Branco Off",
        imagem:
          "https://i.pinimg.com/736x/5a/8c/bd/5a8cbd2d5e2d1b5e9c2f8a6b7e3d4c1a.jpg",
      },
      {
        corHex: "#C5A880",
        corNome: "Dourado",
        imagem:
          "https://i.pinimg.com/736x/d4/c8/2a/d4c82a3f9b1e5c7d8e2f4a6b8c0d2e4f.jpg",
      },
    ],
  },
  {
    id: 6,
    nome: "Vestido Curto 'Verão'",
    descricao:
      "Vestido leve, ideal para dias quentes. Tramas bem estruturadas que abraçam a silhueta.",
    destaque: true,
    categoria: "Vestidos",
    badge: "20% OFF",
    variantes: [
      {
        corHex: "#42A5B3",
        corNome: "Turquesa",
        imagem:
          "https://i.pinimg.com/736x/1b/3c/5e/1b3c5e7f9d2a4b6c8e0f2d4a6b8c0d2e.jpg",
      },
    ],
  },
  {
    id: 7,
    nome: "Saída de Praia 'Boho'",
    descricao:
      "Estilo despojado com detalhes em franjas. A sobreposição perfeita para looks praianos.",
    destaque: true,
    categoria: "Vestidos",
    badge: "Novo",
    variantes: [
      {
        corHex: "#F4F1E1",
        corNome: "Cru",
        imagem:
          "https://img.elo7.com.br/product/zoom/2C8DBC5/saia-saida-de-praia-de-croche-vazada-com-franja-cru-saia-de-croche.jpg",
      },
    ],
  },
  {
    id: 8,
    nome: "Cesto Organizador 'Canto'",
    descricao:
      "Cesto grosso e firme, excelente para plantas de interior ou organização de revistas.",
    destaque: true,
    categoria: "Decoração",
    badge: "Mais Vendido",
    variantes: [
      {
        corHex: "#EAD994",
        corNome: "Amarelo Claro",
        imagem:
          "https://img.elo7.com.br/product/zoom/3B9F1A3/cesto-organizador-de-croche-de-fio-de-malha-cesto-organizador.jpg",
      },
      {
        corHex: "#8C6C52",
        corNome: "Marrom",
        imagem:
          "https://img.elo7.com.br/product/zoom/2B98E8A/cesto-organizador-de-croche-em-fio-de-malha-d25xa18cm-cesto-organizador.jpg",
      },
    ],
  },
  {
    id: 9,
    nome: "Sousplat 'Requinte' (Kit 4)",
    descricao:
      "Conjunto para mesa posta com lindo acabamento. Traz elegância inigualável nas refeições.",
    destaque: false,
    categoria: "Decoração",
    badge: "10% OFF",
    variantes: [
      {
        corHex: "#F2EDDF",
        corNome: "Cru",
        imagem:
          "https://img.elo7.com.br/product/zoom/3E5C9A2/kit-sousplat-turco-luxo-croche-mesa-posta-sousplat.jpg",
      },
    ],
  },
  {
    id: 10,
    nome: "Tapete 'Mandala'",
    descricao:
      "Tapete redondo detalhado que se torna a peça central da decoração do quarto ou sala.",
    destaque: true,
    categoria: "Decoração",
    badge: "Lançamento",
    variantes: [
      {
        corHex: "#EAE1D3",
        corNome: "Cru",
        imagem:
          "https://img.elo7.com.br/product/zoom/3E5C1B4/tapete-de-croche-redondo-para-decoracao-sala-quarto-140cm-tapete-de-croche.jpg",
      },
    ],
  },
];

// Fallbacks Unsplash por categoria
const fallbacks = {
  // Bolsas: [
  //   "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
  //   "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=600&q=80",
  //   "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80",
  //   "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=600&q=80",
  // ],
  Vestidos: [
    "https://images.unsplash.com/photo-1515347619362-e5fdff07d1bd?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",
  ],
  Decoração: [
    "https://images.unsplash.com/photo-1610444315234-9725f190eec2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1601000676451-bdfc91db05a4?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1628045974751-68b20a3b0404?auto=format&fit=crop&w=600&q=80",
  ],
};

let fallbackCounters = { Bolsas: 0, Vestidos: 0, Decoração: 0 };

function setFallback(imgEl, categoria) {
  const list = fallbacks[categoria] || fallbacks["Bolsas"];
  const idx = fallbackCounters[categoria] % list.length;
  fallbackCounters[categoria]++;
  imgEl.src = list[idx];
  imgEl.onerror = null;
}
