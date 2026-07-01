// ============================================================
// CARDS — geração de HTML, troca de variantes e lazy loading
// ============================================================

function getWhatsappLink(productName, cor = null) {
  let m = `Olá! Estava navegando no site do Atelier e me apaixonei pela peça: *${productName}*.`;
  if (cor)
    m = `Olá! Estava navegando no site do Atelier e me apaixonei pela peça: *${productName}* na cor *${cor}*.`;
  m += ` Gostaria de saber detalhes como valor e prazo de confecção.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(m)}`;
}

// Fallback SVG embutido em base64 — ícone genérico de produto
const FALLBACK_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0ebe1'/%3E%3Cpath d='M35 65 L50 35 L65 65 Z' fill='%23c5a880' opacity='0.4'/%3E%3Ccircle cx='50' cy='42' r='6' fill='%23c5a880' opacity='0.4'/%3E%3C/svg%3E`;

const FALLBACK_POR_CATEGORIA = {
  Bolsas: FALLBACK_SVG,
  Vestidos: FALLBACK_SVG,
  Decoração: FALLBACK_SVG,
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
  if (waBtn)
    waBtn.href = getWhatsappLink(waBtn.getAttribute("data-nome"), corNome);
}

function generateCardHTML(produto, prefix) {
  const defaultImagem = produto.variantes[0].imagem;
  const defaultCor = produto.variantes[0].corNome;
  const waLink = getWhatsappLink(produto.nome, defaultCor);

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
