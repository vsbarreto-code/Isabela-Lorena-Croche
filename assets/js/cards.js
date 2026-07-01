// ============================================================
// CARDS — geração de HTML, troca de variantes, preços e WhatsApp
// ============================================================

function getPrecoTexto(produto) {
  if (!produto.preco) return "";

  const partes = [];
  if (produto.preco.pix) partes.push(`Pix ${produto.preco.pix}`);
  if (produto.preco.parcelas && produto.preco.valorParcela) {
    partes.push(
      `${produto.preco.parcelas}x de ${produto.preco.valorParcela} no cartão`,
    );
  }
  return partes.join(" ou ");
}

function getWhatsappLink(produto, cor = null) {
  const nome = typeof produto === "string" ? produto : produto.nome;
  const precoTexto = typeof produto === "string" ? "" : getPrecoTexto(produto);

  let m = `Olá! Estava navegando no site do Atelier e me interessei pela bolsa: *${nome}*.`;
  if (cor) {
    m = `Olá! Estava navegando no site do Atelier e me interessei pela bolsa: *${nome}* na cor *${cor}*.`;
  }

  if (precoTexto) {
    m += ` Vi no site o valor: ${precoTexto}.`;
  }

  m += ` Gostaria de saber disponibilidade e prazo de confecção.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(m)}`;
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

// Marca o wrap como carregado (remove skeleton)
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
  if (imgEl) {
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
    .forEach((b) => b.classList.remove("active"));

  btnElement.classList.add("active");

  const waBtn = document.getElementById(`wa-${prefix}-${produtoId}`);
  const produto = produtos.find((p) => p.id === produtoId);
  if (waBtn && produto) {
    waBtn.href = getWhatsappLink(produto, corNome);
  }
}

function generatePriceHTML(produto) {
  if (!produto.preco) return "";

  const pix = produto.preco.pix
    ? `<div class="price-line price-pix"><span>Pix</span><strong>${produto.preco.pix}</strong></div>`
    : "";

  const parcelado =
    produto.preco.parcelas && produto.preco.valorParcela
      ? `<div class="price-line price-installment"><span>Cartão</span><strong>${produto.preco.parcelas}x de ${produto.preco.valorParcela}</strong></div>`
      : "";

  const totalParcelado = produto.preco.parcelado
    ? `<small>Total parcelado: ${produto.preco.parcelado}</small>`
    : "";

  return `
    <div class="product-price" aria-label="Preço da ${produto.nome}">
      ${pix}
      ${parcelado}
      ${totalParcelado}
    </div>
  `;
}

function generateCardHTML(produto, prefix) {
  const defaultImagem = produto.variantes[0].imagem;
  const defaultCor = produto.variantes[0].corNome;
  const waLink = getWhatsappLink(produto, defaultCor);

  let coresHTML = `<div class="variants">`;
  produto.variantes.forEach((v, i) => {
    coresHTML += `
      <button
        onmouseenter="changeProductVariant(
          ${produto.id},
          '${prefix}',
          '${v.imagem}',
          this,
          '${v.corNome}',
          '${produto.categoria}'
        )"
        class="variant-btn ${i === 0 ? "active" : ""}"
        style="background:${v.corHex}"
        title="${v.corNome}"
        aria-label="Ver variante ${v.corNome}"
      ></button>
    `;
  });
  coresHTML += `</div>`;

  return `
    <div class="product-card">
      <div class="product-image-wrap">
        <img
          id="img-${prefix}-${produto.id}"
          src="${defaultImagem}"
          alt="${produto.nome}"
          class="product-img"
          loading="lazy"
          decoding="async"
          onload="onImageLoad(this)"
          onerror="setFallback(this,'${produto.categoria}')"
        />
        <span class="product-badge">${produto.badge}</span>
      </div>

      <div class="content">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>

        ${generatePriceHTML(produto)}
        ${coresHTML}

        <a
          id="wa-${prefix}-${produto.id}"
          data-nome="${produto.nome}"
          href="${waLink}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-whatsapp"
        >
          <i class="fa-brands fa-whatsapp"></i>
          Consultar / Encomendar
        </a>
      </div>
    </div>
  `;
}

// Expõe globalmente para uso inline (onerror/onload nos imgs)
window.setFallback = setFallback;
window.onImageLoad = onImageLoad;
window.changeProductVariant = changeProductVariant;
