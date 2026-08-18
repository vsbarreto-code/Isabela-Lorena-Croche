// ============================================================
// CARDS — geração de HTML, variantes, preços, tamanhos e WhatsApp
// ============================================================

function getTamanhosDisponiveis(produto) {
  if (!Array.isArray(produto?.tamanhos)) return [];

  return produto.tamanhos.filter((tamanho) => {
    if (!tamanho || tamanho.disponivel === false) return false;
    if (tamanho.preco) return true;

    return getConfiguracoesValidas(produto, tamanho.id).length > 0;
  });
}

function produtoTemTamanhos(produto) {
  return getTamanhosDisponiveis(produto).length > 0;
}

function moedaParaNumero(valor) {
  if (typeof valor === "number") return valor;
  if (!valor) return Number.POSITIVE_INFINITY;

  const normalizado = String(valor)
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const numero = Number(normalizado);
  return Number.isFinite(numero) ? numero : Number.POSITIVE_INFINITY;
}

function getTamanhoPorId(produto, tamanhoId) {
  return getTamanhosDisponiveis(produto).find(
    (tamanho) => String(tamanho.id) === String(tamanhoId),
  );
}

function getTamanhoMaisBarato(produto) {
  const tamanhos = getTamanhosDisponiveis(produto);
  if (!tamanhos.length) return null;

  return tamanhos.reduce((menor, atual) => {
    const precoMenor = moedaParaNumero(menor?.preco?.pix);
    const precoAtual = moedaParaNumero(atual?.preco?.pix);

    return precoAtual < precoMenor ? atual : menor;
  });
}

function getOpcoesConfiguracaoDisponiveis(produto) {
  return Array.isArray(produto?.opcoesConfiguracao)
    ? produto.opcoesConfiguracao.filter((opcao) => opcao && opcao.id && Array.isArray(opcao.opcoes))
    : [];
}

function getConfiguracoesValidas(produto, tamanhoId = null) {
  if (!Array.isArray(produto?.configuracoes)) return [];

  return produto.configuracoes.filter((config) => {
    if (!config?.preco) return false;
    if (tamanhoId && String(config.tamanhoId) !== String(tamanhoId)) return false;
    return true;
  });
}

function getPrecoProduto(produto, tamanhoId = null, opcoesSelecionadas = {}) {
  if (!produto) return null;

  const configuracoes = getConfiguracoesValidas(produto, tamanhoId);

  if (configuracoes.length) {
    const selecionadas = opcoesSelecionadas || {};
    const configuracaoExata = configuracoes.find((config) =>
      Object.entries(selecionadas).every(
        ([opcaoId, valorId]) => String(config[`${opcaoId}Id`] || "") === String(valorId),
      ),
    );

    if (configuracaoExata) return configuracaoExata.preco;

    return configuracoes.reduce((menor, atual) => {
      const precoMenor = moedaParaNumero(menor?.preco?.pix);
      const precoAtual = moedaParaNumero(atual?.preco?.pix);
      return precoAtual < precoMenor ? atual : menor;
    }, configuracoes[0])?.preco || produto.preco || null;
  }

  if (produtoTemTamanhos(produto)) {
    const tamanho = tamanhoId
      ? getTamanhoPorId(produto, tamanhoId)
      : getTamanhoMaisBarato(produto);

    return tamanho?.preco || produto.preco || null;
  }

  return produto.preco || null;
}

function getPrecoTexto(produto, tamanhoId = null, opcoesSelecionadas = {}) {
  const preco = getPrecoProduto(produto, tamanhoId, opcoesSelecionadas);
  if (!preco) return "";

  const partes = [];
  if (preco.pix) partes.push(`Pix ${preco.pix}`);
  if (preco.parcelas && preco.valorParcela) {
    partes.push(`${preco.parcelas}x de ${preco.valorParcela} no cartão`);
  }

  return partes.join(" ou ");
}

function getWhatsappLink(produto, cor = null) {
  const nome = typeof produto === "string" ? produto : produto.nome;

  let mensagem = `Olá! Estava navegando no site do Atelier e me interessei pela bolsa: *${nome}*.`;

  if (cor) {
    mensagem = `Olá! Estava navegando no site do Atelier e me interessei pela bolsa: *${nome}* na cor *${cor}*.`;
  }

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
}

// Fallback SVG embutido em base64 — ícone genérico de produto
const FALLBACK_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0ebe1'/%3E%3Cpath d='M35 65 L50 35 L65 65 Z' fill='%23c5a880' opacity='0.4'/%3E%3Ccircle cx='50' cy='42' r='6' fill='%23c5a880' opacity='0.4'/%3E%3C/svg%3E`;

const FALLBACK_POR_CATEGORIA = {
  Bolsas: FALLBACK_SVG,
};

function setFallback(imgEl, categoria) {
  imgEl.src = FALLBACK_POR_CATEGORIA[categoria] || FALLBACK_SVG;
  imgEl.setAttribute("data-error", "true");
  imgEl.classList.add("img-error");
  const wrap = imgEl.closest(".product-image-wrap");
  if (wrap) wrap.classList.add("img-loaded");
}

function onImageLoad(imgEl) {
  imgEl.classList.add("loaded");
  const wrap = imgEl.closest(".product-image-wrap");
  if (wrap) wrap.classList.add("img-loaded");
}

function changeProductVariant(
  produtoId,
  prefix,
  imagemUrl,
  btnElement,
  corNome,
  categoria,
) {
  const imgEl = document.getElementById(`img-${prefix}-${produtoId}`);

  if (imgEl && imagemUrl) {
    const wrap = imgEl.closest(".product-image-wrap");
    if (wrap) wrap.classList.remove("img-loaded");

    imgEl.style.opacity = "0";
    imgEl.classList.remove("loaded");

    setTimeout(() => {
      imgEl.src = imagemUrl;
      imgEl.onload = () => {
        imgEl.style.opacity = "1";
        onImageLoad(imgEl);
      };
      imgEl.onerror = () => {
        imgEl.style.opacity = "1";
        setFallback(imgEl, categoria);
      };
    }, 150);
  }

  btnElement
    .closest(".product-card")
    .querySelectorAll(".variant-btn")
    .forEach((button) => button.classList.remove("active"));

  btnElement.classList.add("active");

  const waBtn = document.getElementById(`wa-${prefix}-${produtoId}`);
  const produto = produtos.find((item) => item.id === produtoId);

  if (waBtn && produto) {
    waBtn.href = getWhatsappLink(produto, corNome);
  }
}

function generatePriceHTML(produto, tamanhoId = null, opcoesSelecionadas = {}) {
  const temTamanhos = produtoTemTamanhos(produto);
  const tamanho = temTamanhos
    ? tamanhoId
      ? getTamanhoPorId(produto, tamanhoId)
      : getTamanhoMaisBarato(produto)
    : null;

  const configuracoes = getConfiguracoesValidas(produto, tamanhoId);
  const preco = getPrecoProduto(produto, tamanhoId, opcoesSelecionadas);
  if (!preco) return "";

  const {
    promocaoAtiva = false,
    precoOriginal = "",
    pix = "",
    parcelado = "",
    parcelas = "",
    valorParcela = "",
  } = preco;

  const temPromocao = promocaoAtiva === true && Boolean(precoOriginal);
  const temPix = Boolean(pix);
  const temCartao = Boolean(parcelas && valorParcela);
  const mostrarApartir =
    (getTamanhosDisponiveis(produto).length > 1 && !tamanhoId) ||
    (configuracoes.length > 1 && Object.keys(opcoesSelecionadas || {}).length === 0);
  const nomeTamanho = tamanho?.nome || tamanho?.id || "";

  const badgeNormal = mostrarApartir
    ? "A partir de"
    : nomeTamanho && tamanhoId
      ? `Tamanho ${nomeTamanho}`
      : "Preço";

  return `
    <div
      class="price-box ${temPromocao ? "price-box--promo" : "price-box--normal"}"
      aria-label="Preço da ${produto.nome}${nomeTamanho ? `, tamanho ${nomeTamanho}` : ""}"
    >
      <div class="price-box__top">
        ${
          temPromocao
            ? `
              <span class="price-box__badge price-box__badge--promo">
                Promoção
              </span>

              <span class="price-box__old">
                De <strong>${precoOriginal}</strong>
              </span>
            `
            : `
              <span class="price-box__badge price-box__badge--normal">
                ${badgeNormal}
              </span>

              <span class="price-box__old price-box__old--empty" aria-hidden="true">
                Sem preço antigo
              </span>
            `
        }
      </div>

      ${
        temPix
          ? `
            <div class="price-box__main">
              ${
                mostrarApartir && temPromocao
                  ? `<span class="price-box__from">A partir de</span>`
                  : ""
              }
              <strong>${pix}</strong>
              <span>no Pix</span>
            </div>
          `
          : ""
      }

      ${
        temCartao
          ? `
            <div class="price-box__installment">
              ou <strong>${parcelas}x de ${valorParcela}</strong> no cartão
            </div>
          `
          : ""
      }

      ${
        parcelado
          ? `
            <small class="price-box__total">
              Total no cartão: ${parcelado}
            </small>
          `
          : ""
      }

    </div>
  `;
}

function jsParam(value) {
  return JSON.stringify(String(value || ""));
}

function generateCardHTML(produto, prefix) {
  const variantes = Array.isArray(produto.variantes) ? produto.variantes : [];
  const primeiraVariante = variantes[0] || {};
  const primeiraGaleria = Array.isArray(produto.galeria)
    ? produto.galeria[0]
    : null;

  const imagemCard =
    produto.imagemCapa ||
    primeiraGaleria?.imagem ||
    primeiraVariante.imagem ||
    FALLBACK_SVG;

  const detalhesLink = produto.detalheUrl || `produto.html?id=${produto.id}`;

  return `
    <article class="product-card product-card-simple">
      <a
        class="product-image-wrap"
        href="${detalhesLink}"
        aria-label="Ver detalhes da ${produto.nome}"
      >
        <img
          id="img-${prefix}-${produto.id}"
          src="${imagemCard}"
          alt="${produto.nome}"
          class="product-img"
          loading="lazy"
          decoding="async"
          onload="onImageLoad(this)"
          onerror="setFallback(this,'${produto.categoria}')"
        />

        ${produto.badge ? `<span class="product-badge">${produto.badge}</span>` : ""}
      </a>

      <div class="content">
        <h3>${produto.nome}</h3>

        ${generatePriceHTML(produto)}


        <div class="product-actions">
          <a href="${detalhesLink}" class="btn-details">
            <i class="fa-regular fa-images"></i>
            Ver mais detalhes
          </a>
        </div>
      </div>
    </article>
  `;
}

// Expõe globalmente para uso em outros arquivos e eventos inline
window.setFallback = setFallback;
window.onImageLoad = onImageLoad;
window.changeProductVariant = changeProductVariant;
window.getWhatsappLink = getWhatsappLink;
window.generatePriceHTML = generatePriceHTML;
window.getTamanhosDisponiveis = getTamanhosDisponiveis;
window.produtoTemTamanhos = produtoTemTamanhos;
window.getTamanhoPorId = getTamanhoPorId;
window.getTamanhoMaisBarato = getTamanhoMaisBarato;
window.getPrecoProduto = getPrecoProduto;
window.getOpcoesConfiguracaoDisponiveis = getOpcoesConfiguracaoDisponiveis;
window.getConfiguracoesValidas = getConfiguracoesValidas;
